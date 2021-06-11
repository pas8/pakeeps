import React, { FC, ReactElement, ReactNode } from 'react';
import { Color } from '@material-ui/lab';

export type SnackbarProviderContentType = {
  message: string;
  severity?: Color;
  buttonText?: string;
  onClick?: any;
  iconButton?: boolean;
  icon?: FC;
};
