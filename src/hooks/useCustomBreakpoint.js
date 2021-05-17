import { createBreakpoint } from 'react-use';
import { breakpointsObj } from 'components/theme';

export const useCustomBreakpoint = () => {
  const useBreakpoint = createBreakpoint(breakpointsObj);
  const breakpoint = useBreakpoint();

  return [breakpoint];
};
