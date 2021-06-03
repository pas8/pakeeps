import { Grid } from '@material-ui/core';

const CenteredGrid = ({ children }) => {

  return (
    <Grid container justify={'center'} alignItems={'center'} style={{height:'100%', width:'100%'}}>
      {children}
    </Grid>
  );
};

export default CenteredGrid;
