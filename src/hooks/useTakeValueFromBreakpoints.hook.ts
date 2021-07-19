import { useTheme } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMedia, useWindowSize } from 'react-use';
import { getColor } from 'store/modules/Color/hooks';
import { $Values } from 'utility-types';

export const useTakeValueFromBreakpoints = (values: any[] = ['xl', 'lg', 'md', 'sm', 'xs']) => {
  const { breakpointsValues } = useSelector(getColor);

  const { xs, sm, md, lg, xl } = breakpointsValues;
  const breakpointsArr = [xl, lg, md, sm, xs];

  const [state, setState] = useState(values[0]);
  const { width } = useWindowSize();

  useEffect(() => {
    if (!breakpointsArr) return;
    for (let i = 0; i < breakpointsArr.length; i++) {
      if (width > breakpointsArr[0]) setState(values[0]);
      else if (width > breakpointsArr[i] && width < breakpointsArr[i - 1]) setState(values[i]);
    }
  }, [width]);

  return state;
};
