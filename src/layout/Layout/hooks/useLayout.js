import { useState } from 'react';

const useLayout = (config) => {
  const {
    translator,
    avaliableLanguagesConstructor,
    onLogout,
    onChangeLanguage,
  } = config;

  const [userState, setUserState] = useState({
    name: '', email: '', imageLink: '', isAdmin: false,
  });
  const [navigationList, setNavigationList] = useState([]);
  const [createList, setCreateList] = useState([]);
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
    getNavigationItems: () => navigationList,
    setNavigationList: (list) => setNavigationList(list),
    getAvaliableLanguages: () => avaliableLanguagesConstructor(translator, selectedLanguageState),
    setCreateList: (list) => setCreateList(list),
    getCreateList: () => createList,
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
