import { Button, Box, Divider } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { SnackbarProvider } from 'notistack';
import IconButtonByPas from 'components/IconButton';
import { LayoutChildrenType } from 'models/types';
import { SnackbarProviderContentType } from './types';

const SnackBarLayout = ({ children }: LayoutChildrenType) => {
  const maxSnack = 4;

  const content = (
    key: never,
    {
      message,
      severity = 'success',
      buttonText = '',
      onClick,
      iconButton = false,
      icon: Icon
    }: SnackbarProviderContentType
  ) => (
    <Alert
      variant={'outlined'}
      severity={severity}
      action={
        !!buttonText ? (
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
        <Divider orientation={'vertical'} flexItem />
      </Box>
    </Alert>
  );
  const snackbarProviderProps = { maxSnack, content };
  return (
    <SnackbarProvider {...snackbarProviderProps} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
      {children}
    </SnackbarProvider>
  );
};

// const mapStateToProps = ({ settings: { maxSnack } }) => ({ maxSnack });

// export default connect(mapStateToProps, null)(SnackBarLayout);
export default SnackBarLayout;
