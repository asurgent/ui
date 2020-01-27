import { useState, useEffect } from 'react';

const useLayout = ({ navigationList, user, avaliableLanguages }) => {
  const [layoutData, setLayoutData] = useState({
    navigationList,
    avaliableLanguages,
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
    parentReady: () => { setIsMounted(true); },
  };
};

export default useLayout;
