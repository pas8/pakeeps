import { Grid, TextField, makeStyles, Button, Typography } from '@material-ui/core';
import { capitalize, mapValues, values } from 'lodash';
import { useSnackbar } from 'notistack';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useDispatch } from 'react-redux';
import { errorMessages, NEW_USER_URL, SIGN_IN_URL } from 'models/denotation';
import {
  ChangeEventHandler,
  FC,
  KeyboardEventHandler,
  MouseEvent,
  useState,
  MouseEventHandler,
  useEffect
} from 'react';
import { useRouter } from 'next/dist/client/router';

import { operateToHandleRegister, operateToHandleSignIn } from 'store/modules/Auth/operations';
import { SnackbarSeverityNames } from 'models/unums';
import { toChangeAnonymousStatus } from 'store/modules/Auth/actions';
import { AuthFormPropsType } from './types';
import { AUTH_FORGET_PASSWORD_URL } from '../../layouts/RouterLayout/denotation';
import InputVisibilityAdornment from 'components/InputVisibilityAdornment';

const useStyles = makeStyles(({ spacing, shape: { borderRadius }, palette, breakpoints }) => ({
  '@global': {
    //     '#rc-anchor-container':{

    // background:'red !important'
    //     },
    ' #recaptcha': {
      // marginTop: spacing(1.8)
      // '&  div,.rc-anchor .rc-anchor-normal .rc-anchor-dark,iframe': {
      //   width: '100% !important'
      // },
      // '& .rc-anchor-logo-img-portrait,.rc-anchor-logo-text': {
      //   opacity: `0 !important`
      // },
      // '& .rc-anchor-dark': {
      //   background: 'red !important'
      // }
    }
  },
  footerButton: {
    width: '48%'
    // '& > div': {
    //   height: spacing(6)
    // }
  },


  container: {
    '& .MuiIconButton-edgeEnd':{
      marginBottom:'0 !important'
    },
    '& button,a': {
      width: '32%',
      [breakpoints.down('xs')]: {
        width: '100%',

        marginBottom: spacing(1.4),
        height: spacing(6)
      }
    },

    '& .containerOfForgetPassword': {
      position: 'relative',
      paddingBottom: spacing(1),

      '& a': {
        width: '80%'
      },

      [breakpoints.down('xs')]: {
        '& a': {
          height: spacing(3.6)
        },
        paddingBottom: spacing(0)
      }
    }
  },
  mainButtonContainer: {
    width: '100%',
    marginBottom: spacing(1.4),
    '& > div': {
      height: spacing(6)
    }
  },
  inputContainer: {
    marginBottom: spacing(1.4)
  }
}));

export const emailRgEx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const AuthForm: FC<AuthFormPropsType> = ({ isPageIsRegisted = false }) => {
  const classes = useStyles();
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const authFormaNames = {
    EMAIL: 'email',
    PASSWORD: 'password'
  };

  const dispatch = useDispatch();

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const handleChangeVisibilityStatus = () => {
    setIsPasswordVisible(prev => !prev);
  };
  const [formState, setFormState] = useState({
    [authFormaNames.PASSWORD]: {
      value: '',
      isValid: false,
      validationFunc: (value: string) => {
        return value.length >= 6;
      }
    },

    [authFormaNames.EMAIL]: {
      value: '',
      isValid: false,
      validationFunc: (value: string) => {
        const isValid = emailRgEx.test(String(value).toLowerCase());
        return isValid;
      }
    }
  });

  const handleRegistred = () => {
    dispatch(operateToHandleRegister({ email: formState.email.value, password: formState.password.value }));
  };

  const useTakeRechanpchaProvider = () => {
    const provider = new firebase.auth.RecaptchaVerifier('recaptcha', { theme: 'dark' });

    return provider;
  };

  const handleSignIn = () => {
    const provider = useTakeRechanpchaProvider();
    provider.render();

    provider
      .verify()
      .then(result => {
        if (!result) return;
        provider.clear();
        dispatch(operateToHandleSignIn({ email: formState.email.value, password: formState.password.value }));
      })
      .catch(error =>
        enqueueSnackbar({
          message: error.message || 'You are the fucking robot, baby',
          severity: SnackbarSeverityNames.ERROR
        })
      );
  };

  const authFormDenotation = {
    LOGIN: 'login',
    ANONYMOUS: 'Anonymous',
    REGISTER: 'Register'
  };

  const onClickOfMainButton = () => {
    isPageIsRegisted ? handleRegistred() : handleSignIn();
  };

  const onClickOfAnonymousButton = () => {
    const provider = useTakeRechanpchaProvider();
    provider.render();

    provider
      .verify()
      .then(result => {
        if (!result) return;
        provider.clear();
        firebase.auth().signInAnonymously();
      })
      .catch(error =>
        enqueueSnackbar({
          message: error.message || 'You are the fucking robot, baby',
          severity: SnackbarSeverityNames.ERROR
        })
      );
  };

  const onClickOfNavigationButton: MouseEventHandler = e => {
    e.preventDefault();
    router.push(isPageIsRegisted ? SIGN_IN_URL : NEW_USER_URL);
  };

  const onInputChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value, name } }) => {
    const isValid = formState[name].validationFunc(value);

    setFormState(state => ({ ...state, [name]: { ...state[name], value, isValid } }));
  };

  const handleResetPassword = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!formState[authFormaNames.EMAIL].isValid)
      return enqueueSnackbar({
        message: 'Email is not correct',
        severity: SnackbarSeverityNames.ERROR
      });

    // firebase
    // .auth()
    // .applyActionCode('code2')
    // .then(result => {
    //   console.log(result)
    // })

    firebase
      .auth()
      .sendPasswordResetEmail(formState[authFormaNames.EMAIL].value)
      .then(result => {
        router.push(AUTH_FORGET_PASSWORD_URL);
      })
      .catch(error => {
        enqueueSnackbar({
          message: error.message || errorMessages.SOMETHING_WENT_WRONG,
          severity: SnackbarSeverityNames.ERROR
        });
      });
  };

  return (
    <Grid className={classes.container} container>
      <Grid container item>
        {values(authFormaNames).map((name, idx) => {
          const label = capitalize(name);

          // console.log(formState[name]);

          const onKeyPress: KeyboardEventHandler<HTMLInputElement> = ({ code }) => {
            isInputIsPassword && code === 'Enter' && onClickOfMainButton();
          };

          const isInputIsPassword = name === authFormaNames.PASSWORD;
          return (
            <Grid className={classes.inputContainer} container key={`${name}_${idx}`}>
              <TextField
                label={label}
                variant={'outlined'}
                key={`authFormaNames-idx-${name}`}
                onKeyPress={onKeyPress}
                type={isInputIsPassword ? (isPasswordVisible ? 'text' : 'password') : 'email'}
                InputProps={{
                  endAdornment: isInputIsPassword && (
                    <InputVisibilityAdornment
                      isPasswordVisible={isPasswordVisible}
                      onClick={handleChangeVisibilityStatus}
                    />
                  )
                }}
                placeholder={label}
                onChange={onInputChange}
                fullWidth
                value={formState[name].value}
                name={name}
                error={!formState[name].isValid && formState[name].value.length > 0}
                required
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid container>
        {!isPageIsRegisted && (
          <Grid container className={'containerOfForgetPassword'}>
            <Typography
              color={'textSecondary'}
              variant={'subtitle1'}
              component={'a'}
              href={AUTH_FORGET_PASSWORD_URL}
              onClick={handleResetPassword}
            >
              Forget password?
            </Typography>
          </Grid>
        )}
      </Grid>
      <Grid container item justify={'space-between'} style={{ marginBottom: 16 }}>
        {/* <Grid className={classes.mainButtonConendAdornmentiner}> */}
        <Button variant={'outlined'} onClick={onClickOfAnonymousButton} aria-label={'Anonymous button'}>
          Anonymous
        </Button>

        {/* <ButtonOfSignInProvider
            onClick={onClickOfMainButton}
            name={}
            color={primary!}
            isProvider={false}
          /> */}
        {/* </Grid> */}

        {/* <Grid className={classes.footerButton}>
          <ButtonOfSignInProvider
            onClick={onClickOfAnonymousButton}
            name={'Anonymous'}
            color={'#929292'}
            isProvider={false}
          />
        </Grid> */}

        <Button
          variant={'outlined'}
          onClick={onClickOfNavigationButton}
          color={'secondary'}
          href={isPageIsRegisted ? SIGN_IN_URL : NEW_USER_URL}
        >
          {`to ${!isPageIsRegisted ? authFormDenotation.REGISTER : authFormDenotation.LOGIN}`}
        </Button>
        <Button color={'primary'} variant={'outlined'} onClick={onClickOfMainButton} type={'submit'}>
          {isPageIsRegisted ? authFormDenotation.REGISTER : authFormDenotation.LOGIN}
        </Button>

        {/* <Grid className={classes.footerButton}>
          <ButtonOfSignInProvider
            onClick={onClickOfLastButton}
            name={`to ${!isPageIsRegisted ? authFormDenotation.REGISTER : authFormDenotation.LOGIN}`}
            color={secondary!}
            isProvider={false}
          />
        </Grid> */}
      </Grid>
      <Grid id={'recaptcha'} container></Grid>
    </Grid>
  );
};

export default AuthForm;
