import { useState, useEffect } from 'react';

const useLayout = (config) => {
  const {
    translator,
    navigationListConstructor,
    avaliableLanguagesConstructor,
    createListConstructor,
    onLogout,
    onChangeLanguage,
  } = config;

  const [userState, setUserState] = useState({
    name: '', email: '', imageLink: '', isAdmin: false,
  });
  const [customerIdState, setCustomerIdState] = useState('');
  const [customerNameState, setCustomerNameState] = useState('');
  const [selectedLanguageState, setSelectedLanguageState] = useState(config.currentLanguage || '');

  return {
    setUser: ({
      name, email, imageLink, isAdmin,
    }) => setUserState({
      name, email, imageLink, isAdmin,
    }),
    setCurrentLanguage: (language) => setSelectedLanguageState(language),
    setCustomerId: (customerId) => setCustomerIdState(customerId),
    setCustomerName: (customerName) => setCustomerNameState(customerName),
    getUser: () => userState,
    getNavigationItems: () => navigationListConstructor(translator, customerIdState),
    getAvaliableLanguages: () => avaliableLanguagesConstructor(translator, selectedLanguageState),
    getCreateList: () => createListConstructor(translator),
    getMenuTranslations: () => ({
      create: translator('menuCreate'),
      languageSelector: translator('menuLanguageSelector'),
      logout: translator('menuButtonLogout'),
      menu: translator('menuButtonMenu'),
      settings: translator('menuButtonSettings'),
    }),
    getCurrentLanguage: () => selectedLanguageState,
    getCustomerId: () => customerIdState,
    getCustomerName: () => customerNameState,
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
