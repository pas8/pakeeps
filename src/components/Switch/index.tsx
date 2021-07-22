import { withStyles, Switch, FormControlLabel, makeStyles } from '@material-ui/core';
import { FC } from 'react';
import { DEFAULT } from 'models/denotation';
import { SwitchByPasPropsType, UseStylesOfSwitchByPasType } from './types';
import { useAlpha } from 'hooks/useAlpha.hook';
import { customColorPlaceholder } from 'components/AccountAvatar';
import { UseStylesCustomColorType } from 'models/types';

const useStyles = makeStyles(({ spacing, palette }) => ({
  container: ({
    color,
    isChecked,
    isBgIsPaper,
    customColor
  }: UseStylesOfSwitchByPasType & UseStylesCustomColorType) => {
    const newColor = !isChecked
      ? customColor?.isUseDefault
        ? palette.text.hint
        : customColor.unHover
      : customColor?.isUseDefault
      ? color === DEFAULT
        ? palette.secondary.main
        : color
      : customColor?.hover;

    return {
      '& .MuiSwitch-thumb': {
        background: !customColor.isUseDefault
          ? customColor.bgHover
          : palette.background[isBgIsPaper ? 'paper' : 'default'],
        border: '2px solid',
        // width: 22,
        // height: 22,
        marginTop: 0,
        borderColor: newColor
      },
      '&:hover .MuiTouchRipple-root': {
        background: useAlpha(newColor!)
      },
      '& .MuiSwitch-track': {
        opacity: `1 !important`,
        background: newColor
      },

      
      '& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track':{
        background: newColor


      },
      // '& .MuiTouchRipple-root': {},
      '& .MuiFormControlLabel-label': {
        color: newColor
      }
    };
  }
}));

const SwitchByPas: FC<SwitchByPasPropsType> = ({
  color = DEFAULT,
  title,
  isBgIsPaper = false,
  customColor,
  ...swithProps
}) => {
  const classes = useStyles({
    color,
    isChecked: swithProps.checked,
    isBgIsPaper,
    customColor: customColor || customColorPlaceholder
  });
  return <FormControlLabel className={classes.container} control={<Switch {...swithProps} />} label={title} />;
};

export default SwitchByPas;
