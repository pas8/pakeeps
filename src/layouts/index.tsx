import { FC, ReactNode } from 'react';

const { isEmpty, reverse } = require('lodash');

export const ComposeLayouts: FC<any> = ({ layouts, children, ...layoutProps }) => {
  if (isEmpty(layouts)) return children;

  return reverse(layouts).reduce((acc: any, Layout: any) => <Layout {...layoutProps}>{acc}</Layout>, children);
};
