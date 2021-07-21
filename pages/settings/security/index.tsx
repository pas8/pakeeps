import { Grid, IconButton, InputAdornment, makeStyles, TextField, Button, GridSize } from '@material-ui/core';
import dynamic from 'next/dynamic';
import { ChangeEventHandler, FC, KeyboardEventHandler, MouseEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { capitalize, mapValues, values } from 'lodash';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import FieldSetContainer from 'components/FieldSetContainer';
import SwitchByPas from 'components/Switch';
import { getUserData } from 'store/modules/App/selectors';
import { NONE } from 'models/denotation';
import { toChangeUserData } from 'store/modules/App/actions';
import SettingContainer from 'components/SettingContainer';
import { DialogLoadingComponent } from 'layouts/DialogsLayout';
import { INPUT_MARGIN_BOTTOMVALUE } from '../account';

const DialogOfAddingNewPinCode = dynamic(() => import('components/DialogOfAddingNewPinCode'), {
  loading: () => <DialogLoadingComponent />
});

const useStyles = makeStyles(({ spacing, palette, breakpoints, shape: { borderRadius } }) => ({
  container: {
    '& .changePinCodeButtonContainer': {
      '& button': {
        marginTop: spacing(1),
        width: '100%'
      }
    }
  },
  visibilityButton: {
    color: palette.text.secondary
  },
  inputItemContainer: {
    marginBottom: spacing(INPUT_MARGIN_BOTTOMVALUE)
  },
  changePasswordContainer: {}
}));

const Security: FC = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

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
  const { localPinCode } = useSelector(getUserData);

  const [pinCode, setPinCode] = useState<string>('');
  const [isHaveLocalPinCode, setIsHaveLocalPinCode] = useState(localPinCode !== NONE);

  useEffect(() => {
    setIsHaveLocalPinCode(localPinCode !== NONE);
  }, [localPinCode]);

  const [isDialogOfChangingPinCodeOpen, setIsDialogOfChangingPinCodeOpen] = useState(false);

  const authWithLocalPinCodeProps = { pinCode, setPinCode };

  const handleChangeDialogOfChangingPinCodeOpenStatus = () => {
    setIsDialogOfChangingPinCodeOpen(prev => !prev);
  };
  const handleChangeLocalPinCodeStatus = () => {
    setIsHaveLocalPinCode(prev => !prev);
  };

  const onCloseOfDialogOfChangingPinCode = () => {
    setIsDialogOfChangingPinCodeOpen(false);
  };

  const onSaveOfDialogOfChangingPinCode = () => {
    if (pinCode.length >= 4 && !isNaN(+pinCode)) {
      dispatch(toChangeUserData({ userData: { localPinCode: pinCode } }));
      return onCloseOfDialogOfChangingPinCode();
    }
    enqueueSnackbar({
      message: 'Pin code should have more than 4 sumbols',
      severity: 'error'
    });
  };
  const defaultContainerBreakpoint = {
    lg: 6,
    sm: 12,
    md: 7,
    xl: 6,
    xs: 12
  } as { [key: string]: GridSize };

  return (
    <Grid container justify={'center'}>
      <SettingContainer container justify={'center'}>
        <Grid container className={classes.container} item>
          <FieldSetContainer title={'Change password'} isOnlyTop>
            <Grid className={classes.changePasswordContainer} container item {...defaultContainerBreakpoint}>
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

                const handleChangePasswordVisiblilittyStatus = () => {
                  setInputsStateOfPasswordChanger(state => ({
                    ...state,
                    [name]: { ...state[name], isPasswordVisible: !state[name].isPasswordVisible }
                  }));
                };

                return (
                  <Grid className={classes.inputItemContainer} container>
                    <TextField
                      label={label}
                      variant={'outlined'}
                      key={`authFormaNames-${idx}-${name}`}
                      onKeyPress={onKeyPress}
                      color={'secondary'}
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
                              {isPasswordVisible ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
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
            </Grid>
          </FieldSetContainer>

          <FieldSetContainer title={'Change pin code'} isOnlyTop>
            <Grid container alignItems={'center'} item {...defaultContainerBreakpoint}>
              <Grid item container>
                <SwitchByPas
                  checked={isHaveLocalPinCode}
                  onChange={handleChangeLocalPinCodeStatus}
                  title={'Is have a local pin code '}
                />
              </Grid>
              <Grid className={'changePinCodeButtonContainer'} container>
                <Button
                  variant={'outlined'}
                  // size={'large'}
                  color={'secondary'}
                  disabled={!isHaveLocalPinCode}
                  onClick={handleChangeDialogOfChangingPinCodeOpenStatus}
                >
                  Change pin code
                </Button>
              </Grid>
            </Grid>
          </FieldSetContainer>

          <DialogOfAddingNewPinCode
            open={isDialogOfChangingPinCodeOpen}
            authWithLocalPinCodeProps={authWithLocalPinCodeProps}
            onClose={onCloseOfDialogOfChangingPinCode}
            onSave={onSaveOfDialogOfChangingPinCode}
          />
        </Grid>
      </SettingContainer>
    </Grid>
  );
};

export default Security;
