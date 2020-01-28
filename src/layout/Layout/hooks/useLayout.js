import { useState, useEffect } from 'react';

const useLayout = ({
  navigationList, user, avaliableLanguages, onLogout, onChangeLanguage, currentLanguage,
}) => {
  const [layoutData, setLayoutData] = useState({
    navigationList,
    avaliableLanguages,
    currentLanguage,
    user,
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted) {
      console.log('ready');
    }
  }, [isMounted, layoutData]);


  return {
    getUser: () => layoutData.user,
    getNavigationItems: () => layoutData.navigationList,
    getAvaliableLanguages: () => layoutData.avaliableLanguages || [],
    getCurrentLanguage: () => layoutData.currentLanguage || '',
    parentReady: () => { setIsMounted(true); },
    onLogout: (onLogout || (() => {})),
    onChangeLanguage: (onChangeLanguage || (() => {})),
  };
};

export default useLayout;
