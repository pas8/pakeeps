import { useTheme } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useMedia, useWindowSize } from 'react-use';

export const useTakeValueFromBreakpoints = (values = ['xl', 'lg', 'md', 'sm', 'xs']) => {
  const { breakpointsArr } = useTheme();
  const [state, setState] = useState(values);
  const { width } = useWindowSize();

  useEffect(() => {
    for (let i = 0; i < breakpointsArr.length; i++) {
      if (width > breakpointsArr[0]) setState(values[0]);
      else if (width > breakpointsArr[i] && width < breakpointsArr[i - 1]) setState(values[i]);
    }
  }, [width]);

  return state;
};
