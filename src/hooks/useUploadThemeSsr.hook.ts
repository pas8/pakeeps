import { useEffect } from 'react';

export const useUploadThemeSsr = () => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (!!jssStyles?.parentElement) jssStyles.parentElement.removeChild(jssStyles);
  }, []);
};
