import { Grid, Typography, makeStyles } from '@material-ui/core';
import { customColorPlaceholder } from 'components/AccountAvatar';
import ColorPickerByPas from 'components/ColorChanger';
import ThemeColorPicker from 'components/ThemeColorPicker';
import { useGetReadableColor } from 'hooks/useGetReadableColor.hook';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toChangeThemeColors } from 'store/modules/Color/actions';

const useStyles = makeStyles(theme => ({
  colorContainer: {
    gap:12
  }
}));

const Theme: FC<any> = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [primaryColor, secondaryColor] = useThemeColors();

  const [customColor] = useGetReadableColor(primaryColor!);

  const handleSaveSecondaryColor = (secondaryMain: string) => {
    dispatch(toChangeThemeColors({ newThemeColors: { secondaryMain } }));
  };

  const handleSavePrimaryColor = (primaryMain: string) => {
    dispatch(toChangeThemeColors({ newThemeColors: { primaryMain } }));
  };

  const themePickersArr = [
    {
      title: 'Primary color',
      color: primaryColor!,
      handleSave: handleSavePrimaryColor
    },
    {
      title: 'Secondary color',
      color: secondaryColor!,
      handleSave: handleSaveSecondaryColor
    }
  ];

  return (
    <Grid container className={classes.colorContainer} >
      {themePickersArr.map(props => (
        <ThemeColorPicker {...props} key={props.title} />
      ))}
    </Grid>
  );
};

export default Theme;
