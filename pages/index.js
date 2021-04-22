import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic';
import { SnackbarProvider } from 'notistack';
import { Alert } from '@material-ui/lab';

//! workaround
const DynamicComponentWithNoSSR = dynamic(() => import('components/NewPakeep'), {
  ssr: false
});
const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    placeItems: 'center'
  }
}));

const Pakeeps = ({ data }) => {
  console.log(data);

  const classes = useStyles();

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      content={(key, message) => (
        <Alert variant={'outlined'} severity={'success'}>
          {message}
        </Alert>
      )}
    >
      {/* <Container className={classes.container}> */}
      <Grid container justify={'center'} alignItems={'center'}>
        <DynamicComponentWithNoSSR />
        {/* <Typography variant={'h1'}>pakeep</Typography> */}
      </Grid>
      {/* </Container> */}
    </SnackbarProvider>
  );
};

const mapStateToProps = ({ app: { data } }) => ({ data });

// const mapDispatchToProps = dispatch => ({ setData: data => dispatch(setData(data)) });

export default connect(mapStateToProps, null)(Pakeeps);
