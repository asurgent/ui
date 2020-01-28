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

  const [layoutData] = useState({
    user,
    navigationList,
    avaliableLanguages,
    currentLanguage,
  });

  return {
    getUser: () => layoutData.user,
    getNavigationItems: () => layoutData.navigationList,
    getAvaliableLanguages: () => layoutData.avaliableLanguages || [],
    getCurrentLanguage: () => layoutData.currentLanguage || '',
    onLogout: (onLogout || (() => {})),
    onChangeLanguage: (onChangeLanguage || (() => {})),
  };
};

export default useLayout;
