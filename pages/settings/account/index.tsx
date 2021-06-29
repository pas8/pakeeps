import { Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import DialogOfEditingAvatar from 'components/DialogOfEditingAvatar';
import { useAlpha } from 'hooks/useAlpha.hook';
import { useCustomBreakpoint } from 'hooks/useCustomBreakpoint';
import { useFromNameToText } from 'hooks/useFromNameToText.hook';
import { capitalize, mapValues, snakeCase, values } from 'lodash';
import { NONE } from 'models/denotation';
import { ChangeEventHandler, FC, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import { useToggle } from 'react-use';
import { getAvatarProperties } from 'store/modules/App/selectors';

const useStyles = makeStyles(
  ({ spacing, transitions, breakpoints, palette: { secondary, maxEmphasis, background }, }) => ({
    container: {
      minHeight: '80vh',
      marginTop: spacing(2)
    },
    containerOftextField: {
      marginBottom: spacing(3.2)
    },
    conatinerOfAvatar: {
      padding: spacing(0, 0, 0, 8)
    },
    avatar: ({ isAccountHaveAvatar, borderRadius, backgroundColor }: any) => {
      const isHaveBgColor = backgroundColor !== NONE;
      const borderUnHoverColor = isHaveBgColor
        ? backgroundColor
        : useAlpha(isAccountHaveAvatar ? secondary.main : maxEmphasis?.main, 0.4);

      const borderHoverColor = isHaveBgColor
        ? backgroundColor
        : isAccountHaveAvatar
        ? secondary.main
        : maxEmphasis?.main;

      return {
        border: `2px solid ${borderUnHoverColor}`,
        position: 'relative',
        borderRadius: `${borderRadius}%`,
        backgroundColor,
        width: spacing(42),
        marginTop:spacing(-0.8),
        height: spacing(42),
        [breakpoints.down('sm')]: {
          width: spacing(24),
          height: spacing(24),
        },
        [breakpoints.down('md')]: {
          width: spacing(32),
          height: spacing(32),
        },
        outline: 'none',
        overflow: 'hidden',
        '& legend':{

padding:spacing(0,0.4),
margin:spacing(0,1.42)
        },
        '&:hover': {
          boxShadow: isHaveBgColor ? `0px 0px 1px 4px ${background.default},0px 0px 1px 6px ${backgroundColor}` : '',

          border: `2px solid ${borderHoverColor}`,
          cursor: 'pointer'
        }
      };
    },
    editButton: {
      position: 'absolute',
      bottom: 16,
      left: 16
    }
  })
);

const SettingAccount: FC<any> = () => {
  const avatarProperties = useSelector(getAvatarProperties);
const [br] = useCustomBreakpoint()

const isSmall = br === 'sm' || br === 'xs'

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
  const classes = useStyles({ isAccountHaveAvatar, ...avatarProperties });

  const [files, setFiles] = useState<any>([]);

  const { getRootProps, getInputProps } = useDropzone({
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


  // const thumbs = files.map(file => (
  //   <div style={thumb} key={file.name}>
  //     <div style={thumbInner}>
  //       <AvatarEditor
  //         image={file.preview}
  //         // width={250}
  //         // height={250}
  //         border={50}
  //         color={[150, 150, 159, 0.6]}
  //         scale={1.2}
  //         rotate={0}
  //       />
  //     </div>
  //   </div>
  // ));

  return (
    <>
      <Grid container justify={'center'} className={classes.container} >
        <Grid sm={11} lg={8} container xl={6} md={11} xs={12} justify={'flex-start'} wrap={isSmall ? 'wrap' : 'nowrap'} >
          {/* <Paper variant={'outlined'}> */}
          <Grid lg={6}   >
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

          <Grid className={classes.conatinerOfAvatar} >
            <fieldset className={classes.avatar} {...getRootProps()}>
            <legend>
                <Typography variant={'body2'} color={'textSecondary'}>
                  Avatar
                </Typography>
              </legend>
            <Button>

             
              <Grid container justify={'center'} alignItems={'center'}>
                {isAccountHaveAvatar ? (
                  <>
                    <img
                      style={{ width: '100%', height: '100%' }}
                      src={avatarProperties.url}
                      onClick={handleOpenDialog}
                    />
                    <Grid className={classes.editButton}>
                      <Button>Edit</Button>
                    </Grid>
                  </>
                ) : (
                  <Grid>
                    <Typography variant={'body2'} color={'textSecondary'}>
                      U can uplad avatar
                    </Typography>
                    <input {...getInputProps()} />
                  </Grid>
                )}
              </Grid>
            </Button>

            </fieldset>
          </Grid>
        </Grid>
      </Grid>
      <DialogOfEditingAvatar {...dialogOfEditingAvatarProps} />
    </>
  );
};

export default SettingAccount;
