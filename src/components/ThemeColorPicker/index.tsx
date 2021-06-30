import { Grid, Typography, makeStyles } from '@material-ui/core';
import { customColorPlaceholder } from 'components/AccountAvatar';
import ColorPickerByPas from 'components/ColorChanger';
import { useGetReadableColor } from 'hooks/useGetReadableColor.hook';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import { FC } from 'react';
import { ThemeColorPickerPropsType } from './types';

const useStyles = makeStyles(({ shape }) => ({
  colorContainer: ({ color }: { color: string }) => ({
    border: '1px solid ',
    borderColor: color,
    borderRadius: 4,
    '& h6': {
      color
    }
  })
}));

const ThemeColorPicker: FC<ThemeColorPickerPropsType> = ({ color, handleSave, title }) => {
  const classes = useStyles({ color });

  const [customColor] = useGetReadableColor(color!);

  return (
    <Grid className={classes.colorContainer}>
      <Typography variant={'h6'}>{title}</Typography>
      <ColorPickerByPas handleSave={handleSave} customColor={customColor} />
    </Grid>
  );
};

export default ThemeColorPicker;
