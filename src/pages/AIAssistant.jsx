import { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const SYSTEM_PROMPT = `You are an eco-assistant for Eco Setu, a climate action app for Bengaluru, India. 
Help users with climate tips, carbon footprint reduction, local environmental issues (water scarcity, air quality, metro usage, rainwater harvesting), and eco actions.
Keep responses concise (2-3 sentences max). Be friendly and encouraging.
Reply in the same language the user writes in. Support English, Hindi, and Kannada.`;

export default function AIAssistant() {
  const { currentLanguage, t } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingEnabled, setIsSpeakingEnabled] = useState(true);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    setMessages([{ id: 1, sender: 'bot', text: t('bot_hello') }]);
  }, [currentLanguage, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'kn' ? 'kn-IN' : 'en-US';
      recognitionRef.current.onresult = (e) => setInput(e.results[0][0].transcript);
      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
    return () => {
      recognitionRef.current?.stop();
      window.speechSynthesis?.cancel();
    };
  }, [currentLanguage]);

  const toggleListen = () => {
    if (!recognitionRef.current) return alert("Speech recognition not supported. Use Chrome or Safari.");
    if (isListening) { recognitionRef.current.stop(); setIsListening(false); }
    else { recognitionRef.current.start(); setIsListening(true); }
  };

  const speakText = (text) => {
    if (isSpeakingEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'kn' ? 'kn-IN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = async (textToSend = input) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg = { id: Date.now(), sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    recognitionRef.current?.stop();
    setIsListening(false);

    // Build conversation history for the API (exclude the initial bot greeting)
    const history = messages
      .filter(m => m.id !== 1)
      .map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text }));

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [...history, { role: 'user', content: textToSend }],
        }),
      });

      const data = await response.json();
      const botResponse = data.content?.[0]?.text || "Sorry, I couldn't get a response. Please try again.";

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botResponse }]);
      speakText(botResponse);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: "Network error. Please check your connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-text-main">{t('ai_title')}</h2>
        <button
          onClick={() => setIsSpeakingEnabled(!isSpeakingEnabled)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${isSpeakingEnabled ? 'bg-brand-green-light text-brand-green-dark' : 'bg-gray-100 text-text-muted'}`}
        >
          {isSpeakingEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          <span className="text-sm font-medium">{isSpeakingEnabled ? t('voice_on') : t('voice_muted')}</span>
        </button>
      </div>

      <div className="dashboard-card flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map(msg => (
            <div key={msg.id} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-brand-green text-white' : 'bg-brand-green-light text-brand-green-dark'}`}>
                {msg.sender === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={`p-4 rounded-2xl max-w-[80%] ${msg.sender === 'user' ? 'bg-brand-green text-white rounded-tr-none' : 'bg-gray-100 text-text-main rounded-tl-none'}`}>
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-brand-green-light text-brand-green-dark">
                <Bot size={20} />
              </div>
              <div className="p-4 rounded-2xl bg-gray-100 rounded-tl-none flex gap-1 items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-100 flex gap-3">
          <button
            onClick={toggleListen}
            className={`p-3 rounded-full transition-all flex items-center justify-center w-12 h-12 ${isListening ? 'bg-red-500 text-white animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-gray-100 text-text-muted hover:bg-gray-200'}`}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          <input
            type="text"
            className="flex-1 bg-bg-light border border-gray-200 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green"
            placeholder={isListening ? t('listening') : t('type_question')}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            disabled={isLoading}
          />
          <button
            onClick={() => handleSend(input)}
            disabled={isLoading || !input.trim()}
            className="bg-brand-green hover:bg-brand-green-dark disabled:opacity-50 text-white p-3 rounded-full transition-colors flex items-center justify-center w-12 h-12"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}