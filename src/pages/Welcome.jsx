import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const { currentLanguage, setCurrentLanguage, t } = useLanguage();
  const { completeOnboarding } = useAppContext();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (name.trim()) {
      completeOnboarding(name);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-bg-light flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-green-light rounded-full mix-blend-multiply filter blur-3xl opacity-70"
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-accent-blue/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
        animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <motion.div 
        className="dashboard-card max-w-lg w-full z-10 p-10 flex flex-col items-center text-center shadow-2xl border-white/50 bg-white/80 backdrop-blur-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <div className="flex items-center gap-2 mb-8">
          <span className="text-4xl">🌱</span>
          <span className="text-3xl font-bold text-text-main">Eco <span className="text-brand-green">Setu</span></span>
        </div>

        <h1 className="text-3xl font-bold text-text-main mb-4 leading-tight">
          {t('welcome_title')}
        </h1>
        <p className="text-text-muted mb-8">
          {t('welcome_subtitle')}
        </p>

        <div className="w-full space-y-6">
          <div className="text-left">
            <label className="block text-sm font-medium text-text-main mb-2">{t('enter_name')}</label>
            <input 
              type="text" 
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul"
            />
          </div>

          <div className="text-left">
            <label className="block text-sm font-medium text-text-main mb-2">{t('select_lang')}</label>
            <div className="grid grid-cols-3 gap-3">
              {['en', 'hi', 'kn'].map(lang => (
                <button
                  key={lang}
                  onClick={() => setCurrentLanguage(lang)}
                  className={`py-2 rounded-lg font-medium transition-colors border ${currentLanguage === lang ? 'bg-brand-green-light border-brand-green text-brand-green-dark' : 'bg-white border-gray-200 text-text-muted hover:border-brand-green'}`}
                >
                  {lang === 'en' ? 'English' : lang === 'hi' ? 'हिंदी' : 'ಕನ್ನಡ'}
                </button>
              ))}
            </div>
          </div>

          <motion.button 
            onClick={handleStart}
            disabled={!name.trim()}
            className="w-full bg-brand-green hover:bg-brand-green-dark disabled:opacity-50 disabled:hover:bg-brand-green text-white font-bold py-4 rounded-xl transition-colors mt-4 text-lg shadow-lg shadow-brand-green/30"
            whileHover={{ scale: name.trim() ? 1.02 : 1 }}
            whileTap={{ scale: name.trim() ? 0.98 : 1 }}
          >
            {t('start_journey')}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
