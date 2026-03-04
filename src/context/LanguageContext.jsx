import React, { createContext, useContext, useState } from 'react';
import translations from '../i18n/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  const t = (key) => {
    return translations[lang]?.[key] ?? translations.en[key] ?? key;
  };

  const toggle = () => setLang((l) => (l === 'en' ? 'ka' : 'en'));

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
