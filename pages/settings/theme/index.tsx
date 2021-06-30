import { Grid, Typography, makeStyles } from '@material-ui/core';
import { customColorPlaceholder } from 'components/AccountAvatar';
import ColorPickerByPas from 'components/ColorChanger';
import ThemeColorPicker from 'components/ThemeColorPicker';
import { useGetReadableColor } from 'hooks/useGetReadableColor.hook';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import { FC, useState } from 'react';

const useStyles = makeStyles(theme => ({
  colorContainer: {
    border: '1px sold yellow'
  }
}));

const Theme: FC<any> = () => {
  const classes = useStyles();

  // const secondaryColor

// const dispatch 

  const handleSave = (color: string) => {
    console.log(color);
  };

const [primaryColor,secondaryColor] = useThemeColors()

const [customColor] = useGetReadableColor(primaryColor!)

const handleSaveSecondaryColor = 

// const themePickersArr = [{

// title:'Secondary color',color:secondaryColor,handleSave

// }]


console.log(customColor)
  return (
    <Grid container>
{


}     

    </Grid>
  );
};

export default Theme;
