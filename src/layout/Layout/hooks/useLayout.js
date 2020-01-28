import { useState } from 'react';

const useLayout = (config) => {
  const {
    user,
    navigationList,
    avaliableLanguages,
    currentLanguage,
    onLogout,
    onChangeLanguage,
  } = config;

  const [layoutData, setLayoutData] = useState({
    user,
    navigationList,
    avaliableLanguages,
    currentLanguage,
  });

  return {
    getUser: () => layoutData.user,
    setUser: (name, email) => setLayoutData({ ...layoutData, user: { name, email } }),
    getNavigationItems: () => layoutData.navigationList,
    getAvaliableLanguages: () => layoutData.avaliableLanguages || [],
    setCurrentLanguage: (lang) => setLayoutData({ ...layoutData, currentLanguage: lang }),
    getCurrentLanguage: () => layoutData.currentLanguage || '',
    onLogout: (onLogout || (() => {})),
    onChangeLanguage: (onChangeLanguage || (() => {})),
  };
};

export default useLayout;
