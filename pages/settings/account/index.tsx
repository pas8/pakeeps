import { Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import DialogOfEditingAvatar from 'components/DialogOfEditingAvatar';
import { useAlpha } from 'hooks/useAlpha.hook';
import { useFromNameToText } from 'hooks/useFromNameToText.hook';
import { capitalize, mapValues, snakeCase, values } from 'lodash';
import { NONE } from 'models/denotation';
import { ChangeEventHandler, FC, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import { getAvatarProperties } from 'store/modules/App/selectors';

const useStyles = makeStyles(({ spacing, transitions, breakpoints, palette: { secondary, maxEmphasis } }) => ({
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
  avatar: ({ isAccountHaveAvatar }: any) => ({
    border: `2px solid ${useAlpha(isAccountHaveAvatar ? secondary.main : maxEmphasis?.main, 0.4)}`,
    borderRadius: '50%',
    width: spacing(42),
    height: spacing(42),
    '&:hover': {
      border: `2px solid ${isAccountHaveAvatar ? secondary.main : maxEmphasis?.main}`,
      cursor: 'pointer'
    }
  })
}));

const SettingAccount: FC<any> = () => {
  const avatarProperties = useSelector(getAvatarProperties);

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
  const classes = useStyles({ isAccountHaveAvatar });

  const [files, setFiles] = useState<any>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles: any) => {
      setFiles(acceptedFiles.map((file: any) => ({ file, preview: URL.createObjectURL(file) })));
    }
  });

  const image = files[0]?.preview;
  const dialogOfEditingAvatarProps = { image };

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
      <Grid container justify={'center'} className={classes.container}>
        <Grid sm={12} lg={10} container>
          {/* <Paper variant={'outlined'}> */}
          <Grid lg={6}>
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

          <Grid className={classes.conatinerOfAvatar} lg={6}>
            <Typography variant={'body2'} color={'textSecondary'}>
              Avatar{' '}
            </Typography>

            <Grid className={classes.avatar} container justify={'center'} alignItems={'center'} {...getRootProps()}>
              {isAccountHaveAvatar ? (
                <>ava</>
              ) : (
                <Grid>
                  <Typography variant={'body2'} color={'textSecondary'}>
                    U can uplad avatar
                  </Typography>
                  <input {...getInputProps()} />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <DialogOfEditingAvatar {...dialogOfEditingAvatarProps} />
    </>
  );
};

export default SettingAccount;
