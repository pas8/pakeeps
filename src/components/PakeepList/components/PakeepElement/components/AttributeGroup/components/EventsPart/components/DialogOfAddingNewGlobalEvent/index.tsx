import { CircularProgress } from '@material-ui/core';
import dynamic from 'next/dynamic';

export const DialogOfAddingNewGlobalEvent = dynamic(() => import('./components/ForLazyLoading'), {
  loading: () => <CircularProgress />
});
