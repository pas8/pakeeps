import { IconButton, InputAdornment, makeStyles } from '@material-ui/core';
import { FC, MouseEvent } from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles(({ spacing, shape: { borderRadius }, palette }) => ({
  visibilityButton: {
    '& svg': {
      color: palette.text.hint
    },

    '&:hover svg': {
      color: palette.text.primary
    }
  }
}));

const InputVisibilityAdornment: FC<{ onClick: (e: any) => void; isPasswordVisible: boolean }> = ({
  onClick,
  isPasswordVisible
}) => {
  const handleMouseDownPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  const classes = useStyles();

  return (
    <InputAdornment position={'end'}>
      <IconButton
        className={classes.visibilityButton}
        aria-label={'toggle password visibility'}
        onClick={onClick}
        style={{ width: 48, marginRight: -8 }}
        onMouseDown={handleMouseDownPassword}
        edge={'end'}
      >
        {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
};

export default InputVisibilityAdornment;
