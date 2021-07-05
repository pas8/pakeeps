import { useWindowScroll, usePrevious } from 'react-use';

export const useSetScrollName = setScrollNameFunc => {
  const { y } = useWindowScroll();
  const previousYscrollValue = usePrevious(y);
  const isUp = y === 0 || y < previousYscrollValue;
  const scrollName = isUp ? 'up' : 'down';

  return scrollName;
};
