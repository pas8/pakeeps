import { useCustomBreakpoint } from './useCustomBreakpoint';

export const useBreakpointNames: () => {
  isSizeBig: boolean;
  isSizeMedium: boolean;
  isSizeSmall: boolean;
  isSiveIsSm: boolean;
  isSiveIsXs: boolean;
  isSiveIsMd: boolean;
  isSiveIsLg: boolean;
  isSiveIsXl: boolean;
} = () => {
  const [br] = useCustomBreakpoint();

  const isSiveIsSm = br === 'sm';
  const isSiveIsXs = br === 'xs';
  const isSiveIsMd = br === 'md';
  const isSiveIsLg = br === 'lg';
  const isSiveIsXl = br === 'xl';

  const isSizeSmall = isSiveIsSm || isSiveIsXs;
  const isSizeMedium = isSiveIsMd;
  const isSizeBig = isSiveIsLg || isSiveIsXl;

  return {
    isSizeBig,
    isSizeMedium,
    isSizeSmall,
    isSiveIsSm,
    isSiveIsXs,
    isSiveIsMd,
    isSiveIsLg,
    isSiveIsXl
  };
};
