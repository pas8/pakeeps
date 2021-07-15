import {
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Typography,
  TextField,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import FieldSetContainer from 'components/FieldSetContainer';
import { capitalize, mapValues, values } from 'lodash';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import { ChangeEventHandler, FC, KeyboardEventHandler, MouseEvent, useState } from 'react';
import { INPUT_MARGIN_BOTTOMVALUE } from '../account';
import { SwitchByPasPropsType } from 'components/Switch/types';
import SwitchByPas from 'components/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from 'store/modules/App/selectors';
import { NONE } from 'models/denotation';
import AuthWithLocalPinCode from 'components/AuthWithLocalPinCode';
import ActionsButtonGroup from 'components/ActionsButtonGroup';
import { toChangeUserData } from 'store/modules/App/actions';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(({ spacing, palette, breakpoints, shape: { borderRadius } }) => ({
  container: {},
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
  return (
    <Grid container justify={'center'}>
      <Grid container lg={6} xl={5} md={8} xs={12} sm={11} item className={classes.container}>
        <FieldSetContainer title={'Change password'} isOnlyTop>
          <Grid className={classes.changePasswordContainer} container item lg={6} sm={12} md={7} xl={6} xs={12}>
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
          <Grid container alignItems={'center'}>
            <Grid item container>
              <SwitchByPas
                checked={isHaveLocalPinCode}
                onChange={handleChangeLocalPinCodeStatus}
                title={'Is have a local pin code '}
              />
            </Grid>
            <Button
              variant={'outlined'}
              color={'secondary'}
              disabled={!isHaveLocalPinCode}
              onClick={handleChangeDialogOfChangingPinCodeOpenStatus}
            >
              Change pin code
            </Button>
          </Grid>
        </FieldSetContainer>

        <Dialog open={isDialogOfChangingPinCodeOpen}>
          <DialogTitle>
            <Typography variant={'h6'}>Pin code</Typography>
          </DialogTitle>
          <DialogContent>
            <AuthWithLocalPinCode {...authWithLocalPinCodeProps} />
          </DialogContent>
          <DialogActions>
            <ActionsButtonGroup onClose={onCloseOfDialogOfChangingPinCode} onSave={onSaveOfDialogOfChangingPinCode} />
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default Security;
