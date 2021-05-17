import { useWindowScroll, usePrevious } from 'react-use';
import { useEffect } from 'react';

export const useSetScrollName = setScrollNameFunc => {
  const { y } = useWindowScroll();
  const previousYscrollValue = usePrevious(y);
  
  useEffect(() => {
    const isUp = y === 0 || y < previousYscrollValue
    const scrollName = isUp ? 'up' : 'down';
    setScrollNameFunc(scrollName);

  }, [y, previousYscrollValue, setScrollNameFunc]);
};
