import firebase from 'firebase/app';
import 'firebase/auth';
import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import PageCenteredContainer from 'components/PageCenteredContainer';
import { useFromNameToText } from 'hooks/useFromNameToText.hook';
import { ChangeEventHandler, FC, KeyboardEventHandler, useState } from 'react';
import AuthFieldSetContainer from 'components/AuthFieldSetContainer';
import { values } from 'lodash';
import InputVisibilityAdornment from 'components/InputVisibilityAdornment';

const useStyles = makeStyles(({ spacing, shape: { borderRadius }, palette }) => ({
  inputContainer: {
    marginBottom: spacing(0.4),
    '& > div':{

      marginBottom: spacing(2.4),


    }
  },
  submitButton: {
    width: '100%'
  }
}));

const ForgetPassword: FC = () => {
  const classes = useStyles();

  const forgetPasswordNames = {
    VERIFICATION_CODE: 'verificationCode',
    NEW_PASSWORD: 'newPassword'
  };

  const [formState, setFormState] = useState({
    [forgetPasswordNames.VERIFICATION_CODE]: {
      value: '',
      isValid: false,
      validationFunc: (value: string) => {
        return value.length >= 4;
      }
    },

    [forgetPasswordNames.NEW_PASSWORD]: {
      value: '',
      isValid: false,
      validationFunc: (value: string) => {
        return value.length >= 6;
      }
    }
  });

  // const handleVerifyPasswordResetCode = () => {
  //   // firebase.auth().verifyPasswordResetCode(value);
  // };

  const handleConfirmPasswordReset = () => {
    firebase
      .auth()
      .confirmPasswordReset(
        formState[forgetPasswordNames.VERIFICATION_CODE].value,
        formState[forgetPasswordNames.NEW_PASSWORD].value
      );
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const handleChangeVisibilityStatus = () => {
    setIsPasswordVisible(prev => !prev);
  };


  return (
  <></>
    // <PageCenteredContainer>
    //   <AuthFieldSetContainer title={'Changing old password to new'}>
    //     <Grid className={classes.inputContainer} container>
    //       {values(forgetPasswordNames).map((name, idx) => {
    //         const label = useFromNameToText(name);

    //         const isInputIsNewPassword = name === forgetPasswordNames.NEW_PASSWORD;
    //         const onKeyPress: KeyboardEventHandler<HTMLInputElement> = ({ code }) => {
    //           isInputIsNewPassword && code === 'Enter' && handleConfirmPasswordReset();
    //         };

    //         const onInputChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value, name } }) => {
    //           const isValid = formState[name].validationFunc(value);

    //           setFormState(state => ({ ...state, [name]: { ...state[name], value, isValid } }));
    //         };

    //         return (
    //           <Grid container>
    //           <TextField
    //             label={label}
    //             variant={'outlined'}
    //             onKeyPress={onKeyPress}
    //             key={`authFormaNames-${idx}-${name}`}
    //             InputProps={{
    //               endAdornment: isInputIsNewPassword && (
    //                 <InputVisibilityAdornment
    //                   isPasswordVisible={isPasswordVisible}
    //                   onClick={handleChangeVisibilityStatus}
    //                 />
    //               )
    //             }}
    //             type={isInputIsNewPassword && !isPasswordVisible  ? 'password' :  'text'}
    //             placeholder={label}
    //             onChange={onInputChange}
    //             fullWidth
    //             value={formState[name].value}
    //             name={name}
    //             error={!formState[name].isValid && formState[name].value.length > 0}
    //             required
    //           />
    //     </Grid>

    //         );
    //       })}
    //     </Grid>
    //     <Button onClick={handleConfirmPasswordReset} color={'primary'} variant={'outlined'} className={classes.submitButton}>Submit</Button>
    //   </AuthFieldSetContainer>
    // </PageCenteredContainer>
  );
};

export default ForgetPassword;
