import { Button, Container, Grid, IconButton, makeStyles, Typography, Box ,Divider} from '@material-ui/core';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic';
import { SnackbarProvider } from 'notistack';
import { Alert } from '@material-ui/lab';
import PakeepList from 'components/PakeepList';
import NewPakeep from 'components/NewPakeep';
import IconButtonByPas from 'components/IconButton';

const Pakeeps = ({ data }) => {
  const snackbarProviderProps = {
    maxSnack:4,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right'
    },
    content: (
      key,
      { message, severity = 'success', buttonText = false, onClick = null, iconButton = false, icon: Icon }
    ) => (
      <Alert
        variant={'outlined'}
        severity={severity}
        action={
          buttonText ? (
            <Box  pr={1}>
              <Button color={'inherit'} size={'small'} onClick={onClick} startIcon={Icon ? <Icon /> : null}>
                {buttonText}
              </Button>
            </Box>
          ) : (
            iconButton && <IconButtonByPas onClick={onClick} icon={Icon} size={'small'} />
          )
        }
      >
        <Box borderRight={buttonText && 1} pr={ buttonText &&2.4}>
          {message}
          <Divider orientation="vertical" flexItem />
        </Box>
      </Alert>
    )
  };

  return (
    <SnackbarProvider {...snackbarProviderProps}>
      <Grid container justify={'center'} alignItems={'center'}>
        <NewPakeep />
      </Grid>
      <PakeepList />
    </SnackbarProvider>
  );
};

const mapStateToProps = ({ app: { data } }) => ({ data });

export default connect(mapStateToProps, null)(Pakeeps);
