import { useRouter } from 'next/dist/client/router';
import { useState, useEffect } from 'react';

export const useLoading = () => {
  const router = useRouter();

  const [loadingState, setLoading] = useState({ isLoading: false, loadingValue: 0 });

  // useEffect(() => {
  //   if (loadingState.loadingValue === 99.9) return;
  //   const handleStart = (url: string) => url !== router.asPath && setLoading({ isLoading: true, loadingValue: 0 });
  //   const handleComplete = (url: string) => {
  //     if (url !== router.asPath) return;
  //     setTimeout(() => {
  //       setLoading({ isLoading: true, loadingValue: 99.8 });
  //     }, 92);

  //     setTimeout(() => {
  //       setLoading({ isLoading: false, loadingValue: 99.9 });
  //     }, 800);
  //   };
  //   router.events.on('routeChangeStart', handleStart);
  //   router.events.on('routeChangeComplete', handleComplete);
  //   router.events.on('routeChangeError', handleComplete);

  //   const timer = setInterval(() => {
  //     setLoading(({ loadingValue, ...state }) => {
  //       if (loadingValue === 100) return { ...state, loadingValue: 0 };

  //       const diff = Math.random() * 10;
  //       return { ...state, loadingValue: Math.min(loadingValue + diff, 100) };
  //     });
  //   }, 500);

  //   return () => {
  //     router.events.off('routeChangeStart', handleStart);
  //     router.events.off('routeChangeComplete', handleComplete);
  //     router.events.off('routeChangeError', handleComplete);
  //     clearInterval(timer);
  //   };
  // }, [router.events]);

  return loadingState;
};
