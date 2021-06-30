import { Grid, Typography, makeStyles } from '@material-ui/core';
import { colord } from 'colord';
import { customColorPlaceholder } from 'components/AccountAvatar';
import ColorPickerByPas from 'components/ColorChanger';
import { useGetReadableColor } from 'hooks/useGetReadableColor.hook';
import { useIsColorLight } from 'hooks/useIsColorLight.hook';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import { FC } from 'react';
import { ThemeColorPickerPropsType } from './types';

const useStyles = makeStyles(({ shape, spacing }) => ({
  colorContainer: ({ customColor }: any) => ({
    border: '1px solid ',
    padding: spacing(0.8, 0.4, 0.4),
    borderColor: customColor.bgHover,
    borderRadius: 4,
    // background:!useIsColorLight(customColor.bgUnHover) ? 'white' : '',
    '& >  h6': {
      padding: spacing(0, 0, 0, 1),
      color: customColor.bgHover
    }
  })
}));

const ThemeColorPicker: FC<ThemeColorPickerPropsType> = ({ color, handleSave, title }) => {
  const [notValidatedCustomColor] = useGetReadableColor(color!, 'default', true);

  const customColor = {
    ...notValidatedCustomColor,
    bgHover: useIsColorLight(notValidatedCustomColor.bgHover)
      ? notValidatedCustomColor.bgHover
      : colord(notValidatedCustomColor.bgHover).lighten(0.4).toHex()
  };

  const classes = useStyles({ customColor });

  return (
    <Grid className={classes.colorContainer}>
      <Typography variant={'h6'}>{title}</Typography>
      <ColorPickerByPas handleSave={handleSave} customColor={customColor} />
    </Grid>
  );
};

export default ThemeColorPicker;
