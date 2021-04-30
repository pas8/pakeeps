import { breakpoints } from 'components/theme';
import { useEffect, useState } from 'react';
import { useMedia, useMouse, useWindowSize } from 'react-use';

export const takeCurrentCursorPositionOfCorectHalfOfScreen = (ref,anchorEl) => {
  const [state, setState] = useState(1);
  const { posX, } = useMouse(ref);
  const { width } = useWindowSize();


  useEffect(() => {
    
// width / 2 > posX ? 
console.log(width,posX)

  }, [anchorEl]);

  return state;
};
