import { withStyles, Switch, FormControlLabel, makeStyles } from '@material-ui/core';
import { FC } from 'react';
import { DEFAULT } from 'models/denotation';
import { SwitchByPasPropsType } from './types';
import { useAlpha } from 'hooks/useAlpha.hook';

const useStyles = makeStyles(({ spacing, palette }) => ({
  container: ({ color, isChecked }: { color: string; isChecked?: boolean }) => {
    const newColor = !isChecked ? palette.text.hint : color === DEFAULT ? palette.secondary.main : color;

    return {
      '& .MuiSwitch-thumb': {
        background: palette.background.default,
        border: '2px solid',
        // width: 22,
        // height: 22,
        marginTop: 0,
        borderColor: newColor
      },
      '&:hover .MuiTouchRipple-root': {
        background: useAlpha(newColor)
      },
      '& .MuiSwitch-track': {
        opacity: `1 !important`,
        background: newColor
      },
      // '& .MuiTouchRipple-root': {},
      '& .MuiFormControlLabel-label': {
        color: newColor
      }
    };
  }
}));

const SwitchByPas: FC<SwitchByPasPropsType> = ({ color = DEFAULT, title, ...swithProps }) => {
  const classes = useStyles({ color, isChecked: swithProps.checked });
  return (
    <FormControlLabel className={classes.container} control={<Switch {...swithProps} color={color} />} label={title} />
  );
};

export default SwitchByPas;
