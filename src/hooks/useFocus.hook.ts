import { Ref, useRef } from 'react';

export const useFocus = (): [Ref<HTMLDivElement>, () => void] => {
  const htmlElRef = useRef<HTMLDivElement>(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};
