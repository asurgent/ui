import { useState, useEffect } from 'react';

const useLayout = (config) => {
  const {
    translator,
    navigationListConstructor,
    avaliableLanguagesConstructor,
    onLogout,
    onChangeLanguage,
  } = config;

  const [userState, setUserState] = useState({ name: '', email: '', imageLink: '' });
  const [customerIdState, setCustomerIdState] = useState('');
  const [selectedLanguageState, setSelectedLanguageState] = useState(config.currentLanguage || '');

  return {
    setUser: ({ name, email, imageLink }) => setUserState({ name, email, imageLink }),
    setCurrentLanguage: (language) => setSelectedLanguageState(language),
    setCustomerId: (customerId) => setCustomerIdState(customerId),
    getUser: () => userState,
    getNavigationItems: () => navigationListConstructor(translator, customerIdState),
    getAvaliableLanguages: () => avaliableLanguagesConstructor(translator, selectedLanguageState),
    getMenuTranslations: () => ({
      languageSelector: translator('menuLanguageSelector'),
      logout: translator('menuButtonLogout'),
      menu: translator('menuButtonMenu'),
      settings: translator('menuButtonSettings'),
    }),
    getCurrentLanguage: () => selectedLanguageState,
    getCustomerId: () => customerIdState,
    onLogout: (onLogout || (() => {})),
    onChangeLanguage: (language) => {
      if (onChangeLanguage) {
        onChangeLanguage(language);
      }
      setSelectedLanguageState(language);
    },
  };
};

export default useLayout;
