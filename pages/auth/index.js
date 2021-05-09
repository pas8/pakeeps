import { Grid, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100vh',
  }
}));

const Auth = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.container} container alignItems={'center'} justify={'center'}>
      <Grid item>
        fdefhwjvewf fdefhwjvewf fdefhwjvewf fdefhwjvewf fdefhwjvewf fdefhwjvewf fdefhwjvewf fdefhwjvewf fdefhwjvewf
        fdefhwjvewf
      </Grid>
    </Grid>
  );
};

Auth.propTypes = {};

export default Auth;
