import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic';
import { SnackbarProvider } from 'notistack';
import { Alert } from '@material-ui/lab';
import PakeepList from 'components/PakeepList';
import NewPakeep from 'components/NewPakeep';

const Pakeeps = ({ data }) => {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      content={(key,{message,severity = 'success'}) => (
        <Alert variant={'outlined'} severity={severity}>
          {message}
        </Alert>
      )}
    >
      <Grid container justify={'center'} alignItems={'center'}>
        <NewPakeep />
      </Grid>
      <PakeepList />
    </SnackbarProvider>
  );
};

const mapStateToProps = ({ app: { data } }) => ({ data });

export default connect(mapStateToProps, null)(Pakeeps);
