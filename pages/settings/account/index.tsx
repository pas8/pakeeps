import { Button, Grid, makeStyles, Paper, TextField, Typography, useTheme } from '@material-ui/core';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import { capitalize, mapValues, snakeCase, values } from 'lodash';
import dynamic from 'next/dynamic';
import { ChangeEventHandler, FC, MouseEventHandler, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import { useToggle, useTitle } from 'react-use';
import { getAvatarProperties, getUserData } from 'store/modules/App/selectors';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useIsColorLight } from 'hooks/useIsColorLight.hook';
import { NONE, TRANSPARENT } from 'models/denotation';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';
import { emailRgEx } from 'components/AuthForm';
import DialogOfEditingAvatar from 'components/DialogOfEditingAvatar';
import { useAlpha } from 'hooks/useAlpha.hook';
import { useFromNameToText } from 'hooks/useFromNameToText.hook';
import SwitchByPas from 'components/Switch';
import FieldSetContainer from 'components/FieldSetContainer';

const AccountAvatar = dynamic(() => import('components/AccountAvatar'), { ssr: false });

export const INPUT_MARGIN_BOTTOMVALUE = 2.8;

const useStyles = makeStyles(
  ({
    spacing,
    transitions,
    breakpoints,
    shape,
    palette: { secondary, maxEmphasis, background, primary, highEmphasis }
  }) => ({
    wrapper: {
      // padding: spacing(2  ),
      // borderRadius: shape.borderRadius,
      // borderColor: useAlpha( highEmphasis?.main!, 0.28),
      borderColor: useAlpha(highEmphasis?.main!, 0),
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
      padding: spacing(0, 0, 0, 8),

      [breakpoints.down('md')]: {
        padding: spacing(0, 0, 0, 6)
      },

      [breakpoints.down('sm')]: {
        padding: spacing(0, 0, 0, 0),
        maxHeight: spacing(42 + 6)
      },

      [breakpoints.down('xs')]: {
        padding: spacing(0, 0, 0, 0),
        // height: '60vw',
        maxHeight: '76vw'
      }
    },
    containerOfInputs: {
      [breakpoints.down('xs')]: {
        maxWidth: '68vw'
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
        : useAlpha(isAccountHaveAvatar ? secondary.main! : maxEmphasis?.main!, 0.4);
      const borderHoverColor = isHaveBgColor
        ? backgroundColor
        : isAccountHaveAvatar
        ? secondary.main
        : maxEmphasis?.main;

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
          minWidth: '68vw',
          height: '68vw'
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
              ? `0px 0px 1px 2px ${highEmphasis?.main}`
              : `0px 0px 1px 2px ${background.default}, 0px 0px 1px 4px ${backgroundColor}`
            : '',

          border: `2px solid ${borderHoverColor}`,
          cursor: 'pointer'
        }
      };
    },

    containerOfEditButton: ({ backgroundColor, isHaveBgColor, isBgColorDark }: any) => {
      const color = isHaveBgColor ? (isBgColorDark ? maxEmphasis?.main : backgroundColor) : secondary.main;
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
      borderColor: useAlpha(isSomethingWasChanged ? primary.main : highEmphasis?.main!, 0.28),
      bottom: 10,
      right: 10
    })
  })
);

const SettingAccount: FC = () => {
  const avatarProperties = useSelector(getAvatarProperties);
  const userData = useSelector(getUserData);
  const { isSiveIsXs, isSizeSmall } = useBreakpointNames();

  const validationFunc = (value: any) => console.log(value);

  const [isEmailPublic, setIsEmailPublic] = useState(userData.isEmailPubic);

  const handleChangeEmailPublicStatus: ChangeEventHandler<HTMLInputElement> = ({ target: { checked } }) => {
    setIsEmailPublic(checked);
  };

  const inputsDetonationOfSettingAccount = {
    email: {
      name: 'email',
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
    name: {
      name: 'name',
      validationFunc,
      helperText:
        'Your name may appear around Pakeeps where you contribute or are mentioned. You can remove it at any time.'
    },

    userName: {
      name: 'userName',
      validationFunc,

      helperText: 'Anyone can see your userName and you also can remove it at any time.'
    }
  } as const;

  const nullityOfInputsState = mapValues(inputsDetonationOfSettingAccount, ({ name }) => {
    const element = {
      value: userData[name],
      isValid: true
    };

    return element;
  });

  const [inputsState, setInputsState] = useState(nullityOfInputsState);

  const inputsArr = values(inputsDetonationOfSettingAccount);

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

  const onUpdateAccountData = () => {
    console.log(inputsState);
  };

  return (
    <>
      <Grid container justify={'center'} className={classes.container}>
        <Grid
          xs={12}
          sm={11}
          component={'fieldset'}
          lg={8}
          container
          xl={6}
          className={classes.wrapper}
          md={11}
          item
          alignItems={isSiveIsXs ? 'center' : 'flex-start'}
          wrap={!isSizeSmall ? 'wrap' : 'nowrap'}
          direction={isSizeSmall ? 'column-reverse' : 'row'}
        >
            <FieldSetContainer title={'Public account'} isOnlyTop>

          {/* > */}
          <Grid lg={6} sm={12} md={7} xl={6} xs={12} className={classes.containerOfInputs}>
              {inputsArr.map(({ name, helperText = '', validationFunc: useValidate, ...aditional }) => {
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
              })}
              <Button
                onClick={onUpdateAccountData}
                color={'primary'}
                variant={'outlined'}
                startIcon={<CloudUploadOutlinedIcon />}
              >
                Update account
              </Button>
          </Grid>

          <Grid className={classes.conatinerOfAvatar} lg={6} sm={10} md={5} xl={6} xs={12} >
            <Grid style={{ position: 'relative'}} container justify={'flex-end'}>
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
      </Grid>

      <DialogOfEditingAvatar {...dialogOfEditingAvatarProps} />
    </>
  );
};

export default SettingAccount;
