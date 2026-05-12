import { useEffect, useState } from 'react';
import { Sun, Cloud, CloudRain, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAppContext } from '../../context/AppContext';

export default function TopBar() {
  const { currentLanguage, setCurrentLanguage, t } = useLanguage();
  const { userName } = useAppContext();
  const [weather, setWeather] = useState({ temp: '--', condition: 0 }); 

  useEffect(() => {
    // Fetch live weather for Bengaluru
    fetch('https://api.open-meteo.com/v1/forecast?latitude=12.9716&longitude=77.5946&current_weather=true')
      .then(res => res.json())
      .then(data => {
        if (data.current_weather) {
          setWeather({
            temp: Math.round(data.current_weather.temperature),
            condition: data.current_weather.weathercode
          });
        }
      })
      .catch(err => console.error("Weather fetch failed:", err));
  }, []);

  const WeatherIcon = () => {
    if (weather.condition <= 3) return <Sun className="text-accent-yellow fill-accent-yellow w-5 h-5" />;
    if (weather.condition <= 48) return <Cloud className="text-gray-400 fill-gray-200 w-5 h-5" />;
    return <CloudRain className="text-accent-blue fill-accent-blue w-5 h-5" />;
  };

  return (
    <header className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-3xl font-bold text-text-main flex items-center gap-2">
          {t('welcome_back')} {userName}! <span className="text-brand-green">🌱</span>
        </h1>
        <p className="text-text-muted mt-1">{t('overview_text')}</p>
      </div>
      
      <div className="flex items-center gap-4 lg:gap-6">
        <div className="relative group z-50">
          <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors text-text-muted">
            <Globe size={20} />
            <span className="font-medium uppercase">{currentLanguage}</span>
          </button>
          <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            <button onClick={() => setCurrentLanguage('en')} className={`w-full text-left px-4 py-2 hover:bg-brand-green-light hover:text-brand-green-dark rounded-t-xl ${currentLanguage === 'en' ? 'font-bold text-brand-green' : ''}`}>English</button>
            <button onClick={() => setCurrentLanguage('hi')} className={`w-full text-left px-4 py-2 hover:bg-brand-green-light hover:text-brand-green-dark ${currentLanguage === 'hi' ? 'font-bold text-brand-green' : ''}`}>हिंदी</button>
            <button onClick={() => setCurrentLanguage('kn')} className={`w-full text-left px-4 py-2 hover:bg-brand-green-light hover:text-brand-green-dark rounded-b-xl ${currentLanguage === 'kn' ? 'font-bold text-brand-green' : ''}`}>ಕನ್ನಡ</button>
          </div>
        </div>

        <div className="hidden sm:flex flex-col items-end">
          <span className="text-sm text-text-muted">{t('location')}</span>
          <div className="flex items-center gap-1 font-bold text-lg">
            {weather.temp}°C <WeatherIcon />
          </div>
        </div>
        <img 
          src={`https://ui-avatars.com/api/?name=${userName || 'User'}&background=10b981&color=fff`} 
          alt="User Profile" 
          className="w-12 h-12 rounded-full shadow-sm border border-gray-200"
        />
      </div>
    </header>
  );
}
