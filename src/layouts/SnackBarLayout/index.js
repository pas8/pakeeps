import PropTypes from 'prop-types';
import { Button, Box, Divider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { Alert } from '@material-ui/lab';
import IconButtonByPas from 'components/IconButton';
import { connect } from 'react-redux';

const SnackBarLayout = ({ children, maxSnack }) => {
  const snackbarProviderProps = {
    maxSnack,
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
            <Box pr={1}>
              <Button color={'inherit'} size={'small'} onClick={onClick} startIcon={Icon ? <Icon /> : null}>
                {buttonText}
              </Button>
            </Box>
          ) : (
            iconButton && <IconButtonByPas onClick={onClick} icon={Icon} size={'small'} />
          )
        }
      >
        <Box borderRight={buttonText && 1} pr={buttonText && 2.4}>
          {message}
          <Divider orientation="vertical" flexItem />
        </Box>
      </Alert>
    )
  };

  return <SnackbarProvider {...snackbarProviderProps}>{children} </SnackbarProvider>;
};

SnackBarLayout.propTypes = {
  children: PropTypes.node
};

const mapStateToProps = ({ settings: { maxSnack } }) => ({ maxSnack });

export default connect(mapStateToProps, null)(SnackBarLayout);
