import { Grid, TextField, makeStyles, Button, InputAdornment, IconButton } from '@material-ui/core';
import ButtonOfSignInProvider from 'components/ButtonOfSignInProvider';
import { useAlpha } from 'hooks/useAlpha.hook';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import firebase from 'firebase';
import { NEW_USER_URL, SIGN_IN_URL } from 'models/denotation';
import { ChangeEventHandler, FC, MouseEvent, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { AuthFormPropsType } from './types';
import { capitalize, mapValues, values } from 'lodash';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { operateToHandleRegister } from 'store/modules/Auth/operations';
import { toChangeAnonymousStatus } from 'store/modules/Auth/actions';
const useStyles = makeStyles(({ spacing, shape: { borderRadius }, palette }) => ({
  footerButton: {
    width: '48%'
    // '& > div': {
    //   height: spacing(6)
    // }
  },
  container: {
    '& button': {
      width: '32%'
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
  },
  visibilityButton: {
    color: palette.text.secondary
  }
}));

const AuthForm: FC<AuthFormPropsType> = ({ isPageIsRegisted = false }) => {
  const classes = useStyles();

  const [primary, secondary] = useThemeColors();
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const authFormaNames = {
    EMAIL: 'email',
    PASSWORD: 'password'
  };

  const dispatch = useDispatch();

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const handleClickShowPassword = () => {
    setIsPasswordVisible(prev => !prev);
  };
  const [formState, setFormState] = useState({
    [authFormaNames.PASSWORD]: {
      value: '',
      isValid: !false,
      validationFunc: (value: string) => {
        return value.length >= 6;
      }
    },

    [authFormaNames.EMAIL]: {
      value: '',
      isValid: !false,
      validationFunc: (value: string) => {
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValid = re.test(String(value).toLowerCase());
        return isValid;
      }
    }
  });

  const handleRegistred = () => {
    dispatch(
      operateToHandleRegister({ email: formState.email.value, password: formState.password.value, enqueueSnackbar })
    )
    // router.push(SIGN_IN_URL);

    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(formState.email.value, formState.password.value)
    //   .then(result => {
    //     enqueueSnackbar({ message: 'You successfully creataed an acount' });

    //     firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
    //       email: formState.email.value,
    //       avatar: 'none'
    //     });
    //   })

    //   .catch(error => {
    //     enqueueSnackbar({ message: error.message || 'Something went wrong', severity: 'error' });
    //   });
  };

  const handleSignIn = () => {
    dispatch(
      operateToHandleRegister({ email: formState.email.value, password: formState.password.value, enqueueSnackbar })
    );

    router.push('/');
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
    dispatch(toChangeAnonymousStatus({ isAnonymous: true }));
  };

  const onClickOfNavigationButton = () => {
    router.push(isPageIsRegisted ? SIGN_IN_URL : NEW_USER_URL);
  };

  const onInputChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value, name } }) => {
    const isValid = formState[name].validationFunc(value);

    setFormState(state => ({ ...state, [name]: { ...state[name], value, isValid } }));
  };

  const handleMouseDownPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <Grid className={classes.container} container>
      <Grid container item component={'form'}>
        {values(authFormaNames).map(name => {
          const label = capitalize(name);

          // console.log(formState[name]);
          const isInputIsPassword = name === authFormaNames.PASSWORD;
          return (
            <Grid className={classes.inputContainer} container>
              <TextField
                label={label}
                variant={'outlined'}
                key={name}
                type={isInputIsPassword ? (isPasswordVisible ? 'text' : 'password') : 'email'}
                InputProps={{
                  endAdornment: isInputIsPassword && (
                    <InputAdornment position={'end'}>
                      <IconButton
                        className={classes.visibilityButton}
                        aria-label={'toggle password visibility'}
                        onClick={handleClickShowPassword}
                        style={{ width: 48, marginRight: -8 }}
                        onMouseDown={handleMouseDownPassword}
                        edge={'end'}
                      >
                        {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                placeholder={label}
                onChange={onInputChange}
                fullWidth
                value={formState[name].value}
                name={name}
                error={!formState[name].isValid}
                required
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid container item justify={'space-between'}>
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

        <Button variant={'outlined'} onClick={onClickOfNavigationButton} color={'secondary'}>
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
    </Grid>
  );
};

export default AuthForm;
