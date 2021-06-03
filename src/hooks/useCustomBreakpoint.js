import { createBreakpoint } from 'react-use';
import { useTheme } from '@material-ui/core';

export const useCustomBreakpoint = () => {
  const {
    breakpoints: { values }
  } = useTheme();
  const useBreakpoint = createBreakpoint(values);
  const breakpoint = useBreakpoint();

  return [breakpoint];
};
