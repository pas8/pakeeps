const { isEmpty, reverse } = require('lodash');

export const ComposeLayouts = ({ layouts, children, ...layoutProps }) => {
  if (isEmpty(layouts)) return children;

  return reverse(layouts).reduce((acc, Layout) => <Layout {...layoutProps}>{acc}</Layout>, children);
};
