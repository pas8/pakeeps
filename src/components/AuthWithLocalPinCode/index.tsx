import { Button, Grid, makeStyles, Paper, Typography, InputBase } from '@material-ui/core';
import { ChangeEventHandler, FC, useState } from 'react';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import { AuthWithLocalPinCodePropsType } from './types';
import { useToggle } from 'react-use';
import clsx from 'clsx';
import { dropRight, isEqual, isNaN } from 'lodash';


const pinCodeDimensionValue = 8

const useStyles = makeStyles(({ spacing, typography: { h6 }, palette }) => ({
  container: {
    '& input': {
      ...h6,
      marginTop:spacing(-2),
      width: '100%',
      textAlign: 'center',
      caretColor: palette.secondary.main
    }
  },
  button: {
    padding: 0
  },
  pinCodeContainer: {
    padding: spacing(1),
    width: spacing(pinCodeDimensionValue * 3.6),
    gap: pinCodeDimensionValue
  },
  pinCodeIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: spacing(pinCodeDimensionValue),
    width: spacing(pinCodeDimensionValue)
  }
}));

const AuthWithLocalPinCode: FC<AuthWithLocalPinCodePropsType> = ({
  isPinCodeVisibleChangerButtonHidden = false,
  pinCode,
  setPinCode
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

  return (
    <Grid className={classes.container} container alignItems={'center'} justify={'center'}>
      <Grid container alignItems={'center'} justify={'center'} className={classes.pinCodeContainer}>
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
          .map((el, idx) => {
            const onClick = () => {
              setPinCode(state => state + idx);
            };

            return (
              <Button
                className={clsx(classes.button, classes.pinCodeIcon)}
                variant={'outlined'}
                color={'secondary'}
                key={`AuthWithLocalPinCode_${el}_${idx}`}
                onClick={onClick}
              >
                <Typography variant={'h6'}>{idx + 1}</Typography>
              </Button>
            );
          })}
        <Button className={classes.pinCodeIcon} onClick={handleChangePinCodeVisibleStatus}>
          {!isPinCodeVisibleChangerButtonHidden && (
            <Typography variant={'h4'}>
              {isPinCodeVisible ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
            </Typography>
          )}
        </Button>
        <Button
          className={clsx(classes.button, classes.pinCodeIcon)}
          variant={'outlined'}
          color={'secondary'}
          onClick={() => setPinCode(state => state + '0')}
        >
          <Typography variant={'h6'}>0</Typography>
        </Button>
        <Button className={clsx(classes.button, classes.pinCodeIcon)} onClick={handleDeleteOnePinCodeLetter}>
          <Typography variant={'h4'}>{<BackspaceOutlinedIcon />}</Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default AuthWithLocalPinCode;
