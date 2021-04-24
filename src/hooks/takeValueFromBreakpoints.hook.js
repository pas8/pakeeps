import { breakpoints } from 'components/theme';
import { useEffect, useState } from 'react';
import { useMedia, useWindowSize } from 'react-use';

export const takeValueFromBreakpoints = (values= [1,2,3,4,5]) => {
  const [state, setState] = useState();
  const { width } = useWindowSize();

  useEffect(() => {
    for (let i = 0; i < breakpoints.length; i++) {
      if(width > breakpoints[0])  setState(values[0]);
      else if(width > breakpoints[i] && width < breakpoints[i - 1]) setState(values[i])      
    }
  }, [width]);

  return state;
};
