import { Grid, GridProps } from '@material-ui/core';
import { FC } from 'react';

const SettingContainer: FC<{} & GridProps> = ({ children, ...props }) => {
  return (
    <Grid item container xs={12} sm={11} md={10} lg={8} xl={6} {...props}>
      {children}
    </Grid>
  );
};

export default SettingContainer;
