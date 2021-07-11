import { Button, Grid, makeStyles, Paper, Typography, InputBase } from '@material-ui/core';
import { ChangeEventHandler, FC, useState } from 'react';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import { AuthWithLocalPinCodePropsType } from './types';
import { useToggle } from 'react-use';
import clsx from 'clsx';
import { isEqual, isNaN } from 'lodash';

const useStyles = makeStyles(({ spacing, typography: { h6 }, palette }) => ({
  container: {
    height: '90vw',
    width: '100vw',
    '& input': {
      ...h6,
      width: spacing(12),
      caretColor: palette.secondary.main
    }
  },
  button: {
    padding: 0
  },
  pinCodeContainer: {
    padding: spacing(1),
    maxWidth: spacing(8 * 3.4),
    gap: 10
  },
  pinCodeIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: spacing(8),
    width: spacing(8)
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

  return (
    <Grid className={classes.container} container alignItems={'center'} justify={'center'}>
      <Paper>
        <Grid container alignItems={'center'} justify={'center'} className={classes.pinCodeContainer}>
          <InputBase value={pinCode} onChange={onChange} />
          {/* {Array(8)
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
                  <Typography variant={'subtitle2'}>{idx + 1}</Typography>
                </Button>
              );
            })} */}
          <Grid className={classes.pinCodeIcon}>
            {!isPinCodeVisibleChangerButtonHidden && (
              <Typography variant={'h4'} onClick={handleChangePinCodeVisibleStatus}>
                {isPinCodeVisible ? VisibilityOutlinedIcon : VisibilityOffOutlinedIcon}
              </Typography>
            )}
          </Grid>
          <Button
            className={classes.button}
            variant={'outlined'}
            color={'secondary'}
            onClick={() => setPinCode(state => state + '0')}
          >
            <Typography variant={'subtitle2'}>0</Typography>
          </Button>
          <Grid className={classes.pinCodeIcon}>
            <Typography variant={'h4'} onClick={handleChangePinCodeVisibleStatus}>
              {BackspaceOutlinedIcon}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default AuthWithLocalPinCode;
