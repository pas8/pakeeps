import { Button, Grid, makeStyles, Typography, InputBase } from '@material-ui/core';
import { ChangeEventHandler, FC } from 'react';
import { useToggle } from 'react-use';
import clsx from 'clsx';
import { dropRight, isNaN } from 'lodash';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';

import FieldSetContainer from 'components/FieldSetContainer';
import { AuthWithLocalPinCodePropsType } from './types';

const pinCodeDimensionValue = 12;

const useStyles = makeStyles(({ spacing, typography: { h4 }, palette, shape: { borderRadius },breakpoints }) => ({
  container: {
    height: '100%',
    '& input': {
      ...h4,
      borderBottom: `1px solid ${palette.text.hint}`,
      margin: spacing(-1, 2, 1),
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
      gap: pinCodeDimensionValue,
[breakpoints.down('xs')]:{
  width: spacing(pinCodeDimensionValue * 3.6 * 0.8),
  gap: pinCodeDimensionValue * 0.8,


}
    }
  },
  pinCodeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: spacing(pinCodeDimensionValue),
    width: spacing(pinCodeDimensionValue),
[breakpoints.down('xs')]:{
  height: spacing(pinCodeDimensionValue * 0.8),
  width: spacing(pinCodeDimensionValue * 0.8),


}
  },


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
  const containerProps = isHaveTitle
    ? { isOnlyTop: false, title: 'Pin code ' }
    : { component: 'fieldset', style: { border: 0 }, title: '' };

  return (
    <Grid className={classes.container} container alignItems={'center'} justify={'center'}>
      <Grid className={classes.pinCodeContainer}>
        <Container container alignItems={'center'} justify={'center'} {...containerProps}>
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
              const idx = idxWithMinusOneValue + 1;
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
