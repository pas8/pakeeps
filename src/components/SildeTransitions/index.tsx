import { Slide } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { forwardRef } from 'react';

export const DownSildeTransition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction={'down'} ref={ref} {...props} />;
});
export const UpSildeTransition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction={'up'} ref={ref} {...props} />;
});
