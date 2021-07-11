import { Grid, makeStyles, Typography } from '@material-ui/core';
import FieldSetContainer from 'components/FieldSetContainer';
import { capitalize, values } from 'lodash';
import { FC, KeyboardEventHandler, useState } from 'react';

const useStyles = makeStyles(({ spacing, palette, breakpoints, shape: { borderRadius } }) => ({
  container: {}
}));

const Security: FC = () => {
  const classes = useStyles();

  const nulittyOfinputsStateOfPasswordChanger = {
    oldPassword: {
      name: 'oldPassword',
      value: '',
      validationFunc: (value: string) => {
        return value.length >= 6;
      }
    },
    newPassword: {
      name: 'newPassword',
      value: '',

      validationFunc: (value: string) => {
        return value.length >= 6;
      }
    },
  };

  const [inputsStateOfPasswordChanger, setInputsStateOfPasswordChanger] = useState(
    nulittyOfinputsStateOfPasswordChanger
  );


const valuesOfInputsStateOfPasswordChanger= values(inputsStateOfPasswordChanger)


  return (
    <Grid container justify={'center'}>
      <Grid container lg={6} xl={5} md={8} xs={12} sm={12} item className={classes.container}>
        <FieldSetContainer title={'Change password'}>


        {valuesOfInputsStateOfPasswordChanger.map(({name}, idx) => {
          const label = capitalize(name);

          // console.log(formState[name]);

          const onKeyPress: KeyboardEventHandler<HTMLInputElement> = ({ code }) => {
            idx + 1 === valuesOfInputsStateOfPasswordChanger.length && code === 'Enter' && console.log('fuck this this ');
          };

          return (
            <Grid className={classes.inputContainer} container>
              <TextField
                label={label}
                variant={'outlined'}
                key={`authFormaNames-idx-${name}`}
                onKeyPress={onKeyPress}
                type={ isPasswordVisible ? 'text' : 'password'}
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

        </FieldSetContainer>
      </Grid>
    </Grid>
  );
};

export default Security;
