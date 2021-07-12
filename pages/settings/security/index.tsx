import { Grid, IconButton, InputAdornment, makeStyles, Typography, TextField } from '@material-ui/core';
import FieldSetContainer from 'components/FieldSetContainer';
import { capitalize, mapValues, values } from 'lodash';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { ChangeEventHandler, FC, KeyboardEventHandler, MouseEvent, useState } from 'react';
import { INPUT_MARGIN_BOTTOMVALUE } from '../account';

const useStyles = makeStyles(({ spacing, palette, breakpoints, shape: { borderRadius } }) => ({
  container: {},
  visibilityButton: {
    color: palette.text.secondary
  },
  inputContainer: {
    marginBottom: spacing(INPUT_MARGIN_BOTTOMVALUE)
  }
}));

const Security: FC = () => {
  const classes = useStyles();

  const nameDenotationOfPasswordChanger = {
    OLD_PASSWORD: 'Old_Password',
    NEW_PASSWORD: 'New_Password'
  };



  
  const nulittyOfinputsStateOfPasswordChanger = mapValues(
    {
      [nameDenotationOfPasswordChanger.OLD_PASSWORD]: {
        isPasswordVisible: false,
        value: '',
        isValid: true,
        validationFunc: (value: string) => {
          return value.length >= 6;
        }
      },
      [nameDenotationOfPasswordChanger.NEW_PASSWORD]: {
        value: '',
        isValid: true,
        isPasswordVisible: false,
        validationFunc: (value: string) => {
          return value.length >= 6;
        }
      }
    },
    (value, name) => ({ ...value, name })
  );

  const [inputsStateOfPasswordChanger, setInputsStateOfPasswordChanger] = useState(
    nulittyOfinputsStateOfPasswordChanger
  );

  const valuesOfInputsStateOfPasswordChanger = values(inputsStateOfPasswordChanger);

  const onInputChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value, name } }) => {
    const isValid = inputsStateOfPasswordChanger[name].validationFunc(value);

    setInputsStateOfPasswordChanger(state => ({ ...state, [name]: { ...state[name], value, isValid } }));
  };

  const handleChangePasswordVisiblilittyStatus = () => {};
  return (
    <Grid container justify={'center'}>
      <Grid container lg={6} xl={5} md={8} xs={12} sm={12} item className={classes.container}>
        <FieldSetContainer title={'Change password'} isOnlyTop>
          {valuesOfInputsStateOfPasswordChanger.map(({ name }, idx) => {
            const label = capitalize(name);

            // console.log(formState[name]);

            const onKeyPress: KeyboardEventHandler<HTMLInputElement> = ({ code }) => {
              idx + 1 === valuesOfInputsStateOfPasswordChanger.length &&
                code === 'Enter' &&
                console.log('fuck this this ');
            };

            const handleMouseDownPassword = (e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
            };

            const isPasswordVisible = inputsStateOfPasswordChanger[name].isPasswordVisible;

            return (
              <Grid className={classes.inputContainer} container>
                <TextField
                  label={label}
                  variant={'outlined'}
                  key={`authFormaNames-${idx}-${name}`}
                  onKeyPress={onKeyPress}
                  type={isPasswordVisible ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position={'end'}>
                        <IconButton
                          className={classes.visibilityButton}
                          aria-label={'toggle password visibility'}
                          onClick={handleChangePasswordVisiblilittyStatus}
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
                  value={inputsStateOfPasswordChanger[name].value}
                  name={name}
                  error={!inputsStateOfPasswordChanger[name].isValid}
                  required
                />
              </Grid>
            );
          })}
        </FieldSetContainer>
      </Grid>
    </Grid>
  );
};

export default Security;
