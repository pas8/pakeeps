import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
  useTheme,
  CircularProgress,
  Backdrop
} from '@material-ui/core';
import { map, mapValues, values } from 'lodash';
import dynamic from 'next/dynamic';
import firebase from 'firebase/app';
import 'firebase/auth';
import { ChangeEventHandler, FC, MouseEventHandler, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useToggle, useTitle } from 'react-use';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import { useIsColorLight } from 'hooks/useIsColorLight.hook';
import { errorMessages, NONE, TRANSPARENT } from 'models/denotation';
import { getAvatarProperties, getUserData } from 'store/modules/App/selectors';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';
import { emailRgEx } from 'components/AuthForm';
import { useAlpha } from 'hooks/useAlpha.hook';
import { useFromNameToText } from 'hooks/useFromNameToText.hook';
import SwitchByPas from 'components/Switch';
import FieldSetContainer from 'components/FieldSetContainer';
import SettingContainer from 'components/SettingContainer';
import ButtonOfUdatingSetting from 'components/ButtonOfUdatingSetting';
import { toChangeUserData } from 'store/modules/App/actions';
import { SnackbarSeverityNames } from 'models/unums';
import { DialogLoadingComponent } from 'layouts/DialogsLayout';

const DialogOfEditingAvatar = dynamic(() => import('components/DialogOfEditingAvatar'), {
  loading: () => <DialogLoadingComponent />
});

const DialogOfEnteringPassword = dynamic(() => import('components/DialogOfEnteringPassword'), {
  loading: () => <DialogLoadingComponent />
});

const AccountAvatar = dynamic(() => import('components/AccountAvatar'), { ssr: false });

export const INPUT_MARGIN_BOTTOMVALUE = 2.8;

const useStyles = makeStyles(
  ({ spacing, transitions, breakpoints, shape, palette: { secondary, background, primary, text } }) => ({
    wrapper: {
      borderColor: useAlpha(text.primary, 0),
      position: 'relative'
    },
    container: {
      paddingBottom: 42,
      marginTop: spacing(0.8)
    },
    containerOftextField: {
      marginBottom: spacing(INPUT_MARGIN_BOTTOMVALUE)
    },
    conatinerOfAvatar: {
      marginBottom: spacing(INPUT_MARGIN_BOTTOMVALUE),
      padding: spacing(0, 0, 0, 8),

      [breakpoints.down('md')]: {
        padding: spacing(0, 0, 0, 6)
      },

      [breakpoints.down('sm')]: {
        padding: spacing(0, 0, 0, 0),
        maxHeight: spacing(42 + 6)
      },

      [breakpoints.down('xs')]: {
        padding: spacing(0, 0, 0, 0)
        // height: '60vw',
        // maxHeight: '76vw'
      }
    },
    containerOfInputs: {
      [breakpoints.down('xs')]: {
        marginTop: '100%'

        // maxWidth: '68vw'
      }
    },

    wrapperOfAvatar: {
      position: 'relative',
      [breakpoints.down('xs')]: {
        // maxWidth: '68vw'
        width: '100%',
        paddingTop: '100%'
      }
    },
    avatar: ({
      isAccountHaveAvatar,
      borderRadius,
      backgroundColor,
      isHaveBgColor,
      isDragActive,
      isBgColorDark
    }: any) => {
      const borderUnHoverColor = isHaveBgColor
        ? backgroundColor
        : useAlpha(isAccountHaveAvatar ? secondary.main! : text.primary, 0.4);
      const borderHoverColor = isHaveBgColor ? backgroundColor : isAccountHaveAvatar ? secondary.main : text.primary;

      return {
        border: `2px solid ${isDragActive ? secondary.main : borderUnHoverColor}`,
        borderRadius: `${borderRadius}%`,
        backgroundColor,
        padding: 4,
        position: 'relative',
        width: spacing(36),
        marginTop: spacing(isAccountHaveAvatar ? 0 : -1.4),
        height: spacing(36),

        [breakpoints.down('md')]: {
          width: spacing(32),
          height: spacing(32)
        },

        [breakpoints.down('sm')]: {
          minWidth: spacing(42),
          height: spacing(42)
        },
        [breakpoints.down('xs')]: {
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%'
          // minWidth: '68vw',
          // height: '68vw'
        },

        boxShadow: isHaveBgColor ? `0px 0px 1px 4px ${backgroundColor}` : '',

        outline: 'none',
        overflow: 'hidden',
        '& legend': {
          padding: spacing(0, 0.8),
          margin: spacing(0, 1),
          background: background.default,
          borderRadius: shape.borderRadius
        },
        '&:hover': {
          boxShadow: isHaveBgColor
            ? isBgColorDark
              ? `0px 0px 1px 2px ${text.secondary}`
              : `0px 0px 1px 2px ${background.default}, 0px 0px 1px 4px ${backgroundColor}`
            : '',

          border: `2px solid ${borderHoverColor}`,
          cursor: 'pointer'
        }
      };
    },

    containerOfEditButton: ({ backgroundColor, isHaveBgColor, isBgColorDark }: any) => {
      const color = isHaveBgColor ? (isBgColorDark ? text.primary : backgroundColor) : secondary.main;
      const bg = !isBgColorDark ? background.default : backgroundColor;
      return {
        position: 'absolute',
        bottom: 10,
        zIndex: 1000,

        left: 10,
        '& svg': {
          marginRight: -4
        },

        '& button': {
          backgroundColor: bg,
          color,
          borderColor: useAlpha(color, 0.42),
          '&:hover': {
            backgroundColor: bg,
            color,
            borderColor: color
          }
        }
      };
    },
    containerOfActionsButtonGroup: ({ isSomethingWasChanged }: any) => ({
      position: 'absolute',
      borderRadius: shape.borderRadius,
      borderColor: useAlpha(isSomethingWasChanged ? primary.main : text.primary, 0.28),
      bottom: 10,
      right: 10
    })
  })
);

const SettingAccount: FC = () => {
  const avatarProperties = useSelector(getAvatarProperties);
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();

  const { isSiveIsXs, isSizeSmall } = useBreakpointNames();

  const validationFunc = (value: any) => true;

  const [isEmailPublic, setIsEmailPublic] = useState(userData.isEmailPubic);

  const handleChangeEmailPublicStatus: ChangeEventHandler<HTMLInputElement> = ({ target: { checked } }) => {
    setIsEmailPublic(checked);
  };

  const inputsNamesDetonation = {
    email: 'email',
    name: 'name',
    userName: 'userName'
  } as const;

  const inputsDetonationOfSettingAccount = {
    [inputsNamesDetonation.email]: {
      aditionalComponents: (
        <Grid container>
          <SwitchByPas title={'Is email  public?'} checked={isEmailPublic} onChange={handleChangeEmailPublicStatus} />
        </Grid>
      ),
      validationFunc: (value: string) => {
        const isValid = emailRgEx.test(String(value).toLowerCase());
        return isValid;
      },
      helperText: 'U can change email, but u will need to verificate that.'
    },
    [inputsNamesDetonation.name]: {
      validationFunc,
      helperText:
        'Your name may appear around Pakeeps where you contribute or are mentioned. You can remove it at any time.'
    },

    [inputsNamesDetonation.userName]: {
      validationFunc,

      helperText: 'Anyone can see your userName and you also can remove it at any time.'
    }
  } as const;

  const nullityOfInputsState = mapValues(inputsNamesDetonation, name => {
    const element = {
      value: userData[name],
      isValid: true
    };

    return element;
  });

  const [inputsState, setInputsState] = useState(nullityOfInputsState);
  // console.log(inputsState ,userData)

  useEffect(() => {
    setInputsState(state => mapValues(inputsNamesDetonation, name => ({ ...state[name], value: userData[name] })));
  }, [userData]);

  const isAccountHaveAvatar = avatarProperties?.url !== NONE;
  const isHaveBgColor = avatarProperties.backgroundColor !== TRANSPARENT;

  const [files, setFiles] = useState<any>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles: any) => {
      setFiles(acceptedFiles.map((file: any) => ({ file, preview: URL.createObjectURL(file) })));
    }
  });
  const image = files[0]?.preview;

  const [isDialogOpen, setIsDialogOpen] = useToggle(!!image);

  const dialogOfEditingAvatarProps = { image, isDialogOpen, setIsDialogOpen };

  const handleOpenDialog = () => {
    setFiles([{ preview: avatarProperties?.url }]);
    setIsDialogOpen(true);
  };

  const [anchorEl, setAnchorEl] = useState<any>(null);

  const onClickOfEditButton: MouseEventHandler<HTMLButtonElement> = ({ currentTarget }) => {
    setAnchorEl(currentTarget);
  };

  const onDialogClose = () => {
    setAnchorEl(false);
  };

  const accountAvatarProps = {
    ...avatarProperties,
    isAccountHaveAvatar,
    handleOpenDialog,
    getInputProps,
    onClose: onDialogClose,
    anchorEl,
    isDragActive,
    isHaveBgColor
  };

  const isSomethingWasChanged = inputsState !== nullityOfInputsState;

  const isBgColorDark = !useIsColorLight(avatarProperties.backgroundColor);
  const classes = useStyles({
    isAccountHaveAvatar,
    ...avatarProperties,
    isHaveBgColor,
    isDragActive,
    isBgColorDark,
    isSomethingWasChanged
  });

  const { enqueueSnackbar } = useSnackbar();

  const [stateOfDialogOfEnteringPassword, setStateOfDialogOfEnteringPassword] = useState({ open: false, value: '' });

  // console.log(userData)

  const handleUpdateDefaultAccountData = () => {
    const user = firebase.auth().currentUser;
    if (!user) return;
    user
      .updateProfile({ displayName: inputsState.name.value })
      .then(() => {
        inputsState.userName.value !== userData.userName &&
          enqueueSnackbar({
            message: `User_Name  was changed `
          });
        dispatch(toChangeUserData({ userData: { userName: inputsState.userName.value } }));
      })
      .catch(error => {
        enqueueSnackbar({
          message: error.message || errorMessages.SOMETHING_WENT_WRONG,
          severity: SnackbarSeverityNames.ERROR
        });
      });
  };

  const handleOpenDialogOfPasswordConfirm = () => {
    firebase?.auth()?.currentUser?.email !== inputsState.email.value &&
      setStateOfDialogOfEnteringPassword(state => ({ ...state, open: true }));
    handleUpdateDefaultAccountData();
  };

  const onCancelOfOfDialogOfEnteringPassword = () => {
    setStateOfDialogOfEnteringPassword(state => ({ ...state, open: false, value: '' }));
  };

  const onChangeOfDialogOfEnteringPassword: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    setStateOfDialogOfEnteringPassword(state => ({ ...state, value }));
  };

  const onUpdateAccountData = () => {
    const user = firebase.auth().currentUser;
    if (!user) return;

    const credential = firebase.auth.EmailAuthProvider.credential(user.email!, stateOfDialogOfEnteringPassword.value);
    user.reauthenticateWithCredential(credential).catch(error => {
      enqueueSnackbar({
        message: error.message || errorMessages.SOMETHING_WENT_WRONG,
        severity: SnackbarSeverityNames.ERROR
      });
    });

    user
      ?.updateEmail(inputsState.email.value)
      .then(() => {
        enqueueSnackbar({
          message: 'An email was sended  to the original email address ',
          severity: SnackbarSeverityNames.INFO
        });
      })
      .catch(error => {
        enqueueSnackbar({
          message: error.message || errorMessages.SOMETHING_WENT_WRONG,
          severity: SnackbarSeverityNames.ERROR
        });
      });
    onCancelOfOfDialogOfEnteringPassword();
  };

  const dialogOfEnteringPasswordProps = {
    ...stateOfDialogOfEnteringPassword,
    onChange: onChangeOfDialogOfEnteringPassword,
    onConfirm: onUpdateAccountData,
    onCancel: onCancelOfOfDialogOfEnteringPassword
  };

  return (
    <>
      <Grid container justify={'center'} className={classes.container}>
        <SettingContainer
          className={classes.wrapper}
          alignItems={isSiveIsXs ? 'center' : 'flex-start'}
          wrap={!isSizeSmall ? 'wrap' : 'nowrap'}
        >
          <Grid>
            <FieldSetContainer
              title={'Public account'}
              isOnlyTop
              direction={isSizeSmall ? 'column-reverse' : 'row'}
              container
            >
              {/* > */}
              <Grid lg={6} sm={12} md={7} xl={6} xs={12} className={classes.containerOfInputs} item>
                {map(
                  inputsDetonationOfSettingAccount,
                  (
                    { helperText = '', validationFunc: useValidate, ...aditional },
                    name: keyof typeof inputsNamesDetonation
                  ) => {
                    const label = useFromNameToText(name);
                    const value = inputsState[name].value === NONE ? '' : inputsState[name].value;

                    const onChange: ChangeEventHandler<HTMLInputElement> = ({ target: { name, value } }) => {
                      const isValid = useValidate(value);
                      setInputsState(state => ({ ...state, [name]: { value, isValid } }));
                    };
                    const error = !inputsState[name].isValid;

                    const textFieldProps = {
                      label,
                      placeholder: label,
                      color: 'secondary' as const,
                      type: 'text',
                      value,
                      error,
                      helperText,
                      onChange,
                      name,
                      variant: 'outlined' as const
                    };
                    return (
                      <Grid className={classes.containerOftextField} key={name}>
                        <TextField {...textFieldProps} fullWidth />

                        {
                          //@ts-ignore
                          aditional?.aditionalComponents
                        }
                      </Grid>
                    );
                  }
                )}
                <ButtonOfUdatingSetting onClick={handleOpenDialogOfPasswordConfirm} title={' Update account'} />
              </Grid>

              <Grid className={classes.conatinerOfAvatar} lg={6} sm={10} md={5} xl={6} xs={12}>
                <Grid className={classes.wrapperOfAvatar} container justify={isSizeSmall ? 'flex-start' : 'flex-end'}>
                  {isAccountHaveAvatar && (
                    <Grid className={classes.containerOfEditButton}>
                      <Button
                        startIcon={<EditOutlinedIcon />}
                        color={'secondary'}
                        variant={'outlined'}
                        size={'small'}
                        onClick={onClickOfEditButton}
                      >
                        Edit
                      </Button>
                    </Grid>
                  )}
                  <fieldset className={classes.avatar} {...getRootProps()}>
                    {!isAccountHaveAvatar && (
                      <legend>
                        <Typography variant={'body2'} color={'textSecondary'}>
                          Avatar
                        </Typography>
                      </legend>
                    )}
                    <Grid container justify={'center'} alignItems={'center'} style={{ width: '100%', height: '100%' }}>
                      <AccountAvatar {...accountAvatarProps} />
                    </Grid>
                  </fieldset>
                </Grid>
              </Grid>
            </FieldSetContainer>
          </Grid>
        </SettingContainer>
      </Grid>
      <DialogOfEnteringPassword {...dialogOfEnteringPasswordProps} />
      <DialogOfEditingAvatar {...dialogOfEditingAvatarProps} />
    </>
  );
};

export default SettingAccount;
