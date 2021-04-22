import { useEffect, useState } from 'react';
import { useMedia, useWindowSize } from 'react-use';

export const takePercentage = (percentage = 16, scale = 8) => {
  const [state, setState] = useState(1920);
  const { width } = useWindowSize();
  // const breakpoints = { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 };
  // const { xs, sm, md, lg, xl } = breakpoints;
  const breakpoints = [1920, 1280, 960, 600, 0];
  const func = i => {
    if (breakpoints[i] > width) setState(width / percentage + scale * i);
    return;
    console.log(breakpoints[i]);
  };

  useEffect(() => {
    for (let i = 0; i < breakpoints.length; ) {
      func(i);
    }
  }, [width]);
  console.log(state);

  // if (width > xl) return setState(width / percentage + scale * 0);
  // if (width > lg) return setState(width / percentage + scale * 1);
  // if (width > md) return setState(width / percentage + scale * 2);
  // if (width > sm) return setState(width / percentage + scale * 3);
  // if (width > xs) return setState(width / percentage + scale * 4);

  return state;
};
