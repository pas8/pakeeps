import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { FC } from 'react';
import { getHeaderHeight } from 'store/modules/App/selectors';

const PageCenteredContainer: FC = ({ children }) => {
  const headerHeight = useSelector(getHeaderHeight);

  return (
    <Grid
      style={{ height: `calc(92vh - ${headerHeight}px)` }}
      container
      justify={'center'}
      alignItems={'center'}
    >{children}</Grid>
  );
};

export default PageCenteredContainer;
