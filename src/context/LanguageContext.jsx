import { createContext, useContext, useState, useCallback } from 'react';
import en from '../locales/en';
import hi from '../locales/hi';
import kn from '../locales/kn';

const dictionaries = { en, hi, kn };
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const t = useCallback((key) => {
    return dictionaries[currentLanguage][key] || key;
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
