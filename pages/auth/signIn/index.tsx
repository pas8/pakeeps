import { Grid, makeStyles, Typography, useTheme, Button, TextField } from '@material-ui/core';
import ButtonOfSignInProvider from 'components/ButtonOfSignInProvider';
import { useAlpha } from 'hooks/useAlpha.hook';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useRouter } from 'next/dist/client/router';
import { errorMessages } from 'models/denotation';
import FieldSetContainer from 'components/FieldSetContainer';
import { getHeaderHeight } from 'store/modules/App/selectors';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import AuthForm from 'components/AuthForm';
import { useSnackbar } from 'notistack';
import { SnackbarSeverityNames } from 'models/unums';

const useStyles = makeStyles(({ spacing, shape: { borderRadius }, palette, breakpoints }) => ({
  container: {
    padding: spacing(0.4, 1.4, 0.2, 1.4),

    width: '100%'
  },

  buttonProvidersContainer: {
    borderRadius,
    borderColor: useAlpha(palette.text.primary, 0.2),
    width: '100%',
    // height: spacing(30),

    '& >  legend': {
      padding: spacing(0, 0.8)
    }
  },
  footerButtons: {
    width: '48%',
    '& > div': {
      height: spacing(8)
    }
  },
  authContainer: {
    borderRadius,
    borderColor: useAlpha(palette.text.primary, 0.2),
    // height: spacing(26),

    // [breakpoints.down('xs')]: {
    //   height: spacing(42)
    // },

    '& > legend': {
      padding: spacing(0, 0.8)
    }
  },
  border: {
    margin: spacing(4.2, 0, 3.2),

    borderBottom: `1px solid ${useAlpha(palette.text.primary, 0.2)}`
  }
}));

const Auth: FC<any> = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();
  const handleSignInWithGoogleProvider = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {})
      .catch(error => {
        enqueueSnackbar({
          message: error.message || errorMessages.SOMETHING_WENT_WRONG,
          severity: SnackbarSeverityNames.ERROR
        });
      });
  };

  const handleSignInWithFacebookProvider = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {})
      .catch(error => {
        enqueueSnackbar({
          message: error.message || errorMessages.SOMETHING_WENT_WRONG,
          severity: SnackbarSeverityNames.ERROR
        });
      });
  };

  const handleSignInWithGitHubProvider = () => {
    const provider = new firebase.auth.GithubAuthProvider();

    provider.addScope('repo');
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        const user = result.user;
      })
      .catch(function (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/account-exists-with-different-credential') {
          enqueueSnackbar({
            message: error.message || errorMessages.YOU_HAVE_SIGNED_UP_WITH_A_DIFFERENT_PROVIDER_FOR_THAT_EMAIL,
            severity: SnackbarSeverityNames.ERROR
          });

          alert('');
        } else {
          enqueueSnackbar({
            message: errorMessage,
            severity: SnackbarSeverityNames.ERROR
          });
        }
      });
  };

  const providersArr = [
    {
      name: 'Google',
      color: '#0f9d58',
      onClick: handleSignInWithGoogleProvider
    },
    {
      name: 'GitHub',
      color: '#999999',
      onClick: handleSignInWithGitHubProvider
    },
    {
      name: 'Facebook',
      color: '#4267B2',
      onClick: handleSignInWithFacebookProvider
    }

    // GitLab: '#df6d2c'
  ];

  const headerHeight = useSelector(getHeaderHeight);

  const isProvidersButtonHaveCustomView = false;
  return (
    <Grid
      alignItems={'center'}
      justify={'center'}
      container
      className={classes.container}
      style={{ height: `calc(92vh - ${headerHeight}px)` }}
    >
      <FieldSetContainer lg={4} xl={3} md={5} sm={8} xs={12} container title={'Sign In'}>
        <Grid
          xs={12}
          container
          item
          className={classes.authContainer}
          component={isProvidersButtonHaveCustomView ? 'fieldset' : 'div'}
        >
          {isProvidersButtonHaveCustomView && (
            <legend>
              <Typography color={'textSecondary'} variant={'subtitle1'}>
                Auth
              </Typography>
            </legend>
          )}
          <AuthForm />
        </Grid>
        <Grid className={classes.border} container />
        <Grid
          xs={12}
          // item
          container
          item
          className={classes.buttonProvidersContainer}
          component={isProvidersButtonHaveCustomView ? 'fieldset' : 'div'}
        >
          {isProvidersButtonHaveCustomView && (
            <legend>
              <Typography color={'textSecondary'} variant={'subtitle1'}>
                With Providers
              </Typography>
            </legend>
          )}

          {providersArr.map(({ name, color, onClick }, idx) => (
            <ButtonOfSignInProvider
              key={`ButtonOfSignInProvider_${name}_${idx}`}
              onClick={onClick}
              name={name}
              //@ts-ignore
              color={color}
              isProvidersButtonHaveCustomView={isProvidersButtonHaveCustomView}
            />
          ))}
        </Grid>
        <Grid container justify={'center'} xs={12}></Grid>
      </FieldSetContainer>
    </Grid>
  );
};

export default Auth;
