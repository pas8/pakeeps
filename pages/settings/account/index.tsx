import { Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import DialogOfEditingAvatar from 'components/DialogOfEditingAvatar';
import { useAlpha } from 'hooks/useAlpha.hook';
import { useCustomBreakpoint } from 'hooks/useCustomBreakpoint';
import { useFromNameToText } from 'hooks/useFromNameToText.hook';
import { capitalize, mapValues, snakeCase, values } from 'lodash';
import { NONE, TRANSPARENT } from 'models/denotation';
import dynamic from 'next/dynamic';
import { ChangeEventHandler, FC, MouseEventHandler, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import { useToggle, useTitle } from 'react-use';
import { getAvatarProperties } from 'store/modules/App/selectors';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useIsColorLight } from 'hooks/useIsColorLight.hook';

const AccountAvatar = dynamic(() => import('components/AccountAvatar'), { ssr: false });

const useStyles = makeStyles(
  ({
    spacing,
    transitions,
    breakpoints,
    palette: { secondary, maxEmphasis, background, mediumEmphasis, highEmphasis }
  }) => ({
    container: {
      minHeight: '80vh',
      marginTop: spacing(2)
    },
    containerOftextField: {
      marginBottom: spacing(3.2)
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
        marginTop: spacing(isAccountHaveAvatar ? 2 : -1.4),
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
          borderRadius: 4
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
    }
  })
);

const SettingAccount: FC<any> = () => {

  const avatarProperties = useSelector(getAvatarProperties);
  const [br] = useCustomBreakpoint();

  const isSiveIsSm = br === 'sm';
  const isSiveIsXs = br === 'xs';

  const isSmall = isSiveIsSm || isSiveIsXs;

  const propsValue = {
    name: 'Pas',
    userName: 'pas8'
  };

  const inputsDetonationOfSettingAccount = {
    name: {
      name: 'name',
      helperText:
        'Your name may appear around Pakeeps where you contribute or are mentioned. You can remove it at any time.'
    },
    userName: {
      name: 'userName',
      helperText: 'Anyone can see your userName and you also can remove it at any time.'
    }
  } as const;

  const validationFunc = (value: any) => console.log(value);

  const nullityOfInputsState = mapValues(inputsDetonationOfSettingAccount, ({ name }) => {
    const element = {
      value: propsValue[name],
      isValid: true,
      validationFunc
    };

    return element;
  });
  const [inputsState, setInputsState] = useState(nullityOfInputsState);

  const onChange: ChangeEventHandler<HTMLInputElement> = ({ target: { name, value } }) => {
    setInputsState(state => ({ ...state, [name]: { value } }));
  };

  const inputsNameArr = values(inputsDetonationOfSettingAccount);

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

  const onClose = () => {
    setAnchorEl(false);
  };

  const accountAvatarProps = {
    ...avatarProperties,
    isAccountHaveAvatar,
    handleOpenDialog,
    getInputProps,
    onClose,
    anchorEl,
    isDragActive,
    isHaveBgColor
  };

  const isBgColorDark = !useIsColorLight(avatarProperties.backgroundColor);

  const classes = useStyles({ isAccountHaveAvatar, ...avatarProperties, isHaveBgColor, isDragActive, isBgColorDark });
  return (
    <>
      <Grid container justify={'center'} className={classes.container}>
        <Grid
          sm={11}
          lg={8}
          container
          xl={6}
          md={11}
          xs={12}
          alignItems={isSiveIsXs ? 'center' : 'flex-start'}
          wrap={!isSmall ? 'wrap' : 'nowrap'}
          direction={isSmall ? 'column-reverse' : 'row'}
        >
          {/* <Paper variant={'outlined'}> */}
          <Grid lg={6} sm={12} md={6} xl={6} xs={11} className={classes.containerOfInputs}>
            {inputsNameArr.map(({ name, helperText = '' }) => {
              const label = useFromNameToText(name);
              const value = inputsState[name].value;

              const textFieldProps = {
                label,
                placeholder: label,
                color: 'secondary' as const,
                type: 'text',
                value,
                helperText,
                onChange,
                name,
                variant: 'outlined' as const
              };
              return (
                <Grid className={classes.containerOftextField} key={name}>
                  <TextField {...textFieldProps} fullWidth />
                </Grid>
              );
            })}
          </Grid>

          <Grid className={classes.conatinerOfAvatar} lg={6} sm={10} md={6} xl={6} xs={12}>
            <Grid style={{ position: 'relative', padding: 4 }} container>
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
        </Grid>
      </Grid>
      <DialogOfEditingAvatar {...dialogOfEditingAvatarProps} />
    </>
  );
};

export default SettingAccount;
