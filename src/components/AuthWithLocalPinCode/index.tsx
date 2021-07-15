import { Button, Grid, makeStyles, Paper, Typography, InputBase } from '@material-ui/core';
import { ChangeEventHandler, FC, useState } from 'react';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import { AuthWithLocalPinCodePropsType } from './types';
import { useToggle } from 'react-use';
import clsx from 'clsx';
import { dropRight, isEqual, isNaN } from 'lodash';
import FieldSetContainer from 'components/FieldSetContainer';

const pinCodeDimensionValue = 12;

const useStyles = makeStyles(({ spacing, typography: { h4 }, palette, shape: { borderRadius } }) => ({
  container: {
    height: '100%',
    '& input': {
      ...h4,
      borderBottom:`1px solid ${palette.text.hint}`,
      // marginTop: spacing(-2),
      margin:spacing(-1,2,1),
      // width: '80%',
// minWidth:'20%',
      textAlign: 'center',
      caretColor: palette.secondary.main
    }
  },
  button: {
    padding: 0,
    borderRadius: '50%',
    '&  svg': {
      color: palette.text.hint
    },
    '&:hover  svg': {
      color: palette.text.primary
    }
  },
  pinCodeContainer: {
    '& > fieldset': {
      padding: spacing(1.8, 0.8),
      width: spacing(pinCodeDimensionValue * 3.6),
      gap: pinCodeDimensionValue
    }
  },
  pinCodeButton: {
    display: 'flex',
    // borderStyle:'dashe',
    alignItems: 'center',
    justifyContent: 'center',
    height: spacing(pinCodeDimensionValue),
    width: spacing(pinCodeDimensionValue)
  }
}));

const AuthWithLocalPinCode: FC<AuthWithLocalPinCodePropsType> = ({
  isPinCodeVisibleChangerButtonHidden = false,
  pinCode,
  setPinCode,
  isHaveTitle
}) => {
  const [isPinCodeVisible, setIsPinCodeVisible] = useToggle(false);
  const classes = useStyles();
  const handleChangePinCodeVisibleStatus = () => {
    setIsPinCodeVisible((prev: boolean) => !prev);
  };
  const onChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    !isNaN(+value) && setPinCode(value);
  };

  const handleDeleteOnePinCodeLetter = () => {
    setPinCode(value => (value.length > 0 ? dropRight(value.split('')).join('') : ''));
  };
  const Container = isHaveTitle ? FieldSetContainer : Grid;
  return (
    <Grid className={classes.container} container alignItems={'center'} justify={'center'}>
      <Grid className={classes.pinCodeContainer}>
        <Container container alignItems={'center'} justify={'center'} title={'Pin code '} isOnlyTop={false}>
          <Grid container alignItems={'center'} justify={'center'} className={'inputContainer'}>
            <InputBase
              value={pinCode}
              onChange={onChange}
              type={isPinCodeVisible ? 'text' : 'password'}
              autoComplete={'off'}
            />
          </Grid>
          {Array(9)
            .fill('AuthWithLocalPinCode')
            .map((el, idxWithMinusOneValue) => {
              const idx = idxWithMinusOneValue + 1
              const onClick = () => {
                setPinCode(state => state + idx);
              };

              return (
                <Button
                  className={clsx(classes.button, classes.pinCodeButton)}
                  variant={'outlined'}
                  color={'secondary'}
                  key={`AuthWithLocalPinCode_${el}_${idx}`}
                  onClick={onClick}
                >
                  <Typography variant={'h5'}>{idx}</Typography>
                </Button>
              );
            })}
          <Button className={clsx(classes.button, classes.pinCodeButton)} onClick={handleChangePinCodeVisibleStatus}>
            {!isPinCodeVisibleChangerButtonHidden && (
              <Typography variant={'h4'}>
                {isPinCodeVisible ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
              </Typography>
            )}
          </Button>
          <Button
            className={clsx(classes.button, classes.pinCodeButton)}
            variant={'outlined'}
            color={'secondary'}
            onClick={() => setPinCode(state => state + '0')}
          >
            <Typography variant={'h6'}>0</Typography>
          </Button>
          <Button className={clsx(classes.button, classes.pinCodeButton)} onClick={handleDeleteOnePinCodeLetter}>
            <Typography variant={'h4'}>{<BackspaceOutlinedIcon />}</Typography>
          </Button>
        </Container>
      </Grid>
    </Grid>
  );
};

export default AuthWithLocalPinCode;
