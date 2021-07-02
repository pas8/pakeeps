import { PickerColorElementPropsType } from './types';

import { FC, useState } from 'react';
import { Grid, Typography, makeStyles, DialogActions } from '@material-ui/core';
import ActionsButtonGroup from 'components/ActionsButtonGroup';
import { useDispatch } from 'react-redux';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import BackgroundPlaceholderByPas from 'components/BackgroundPlaceholder';
import { useAlpha } from 'hooks/useAlpha.hook';
import InputsColorUtilsOfCustomColorPicker from 'components/ColorChanger/components/CustomColor/components/InputsColorUtils';
import { colord } from 'colord';
import { keys, map, values } from 'lodash';
import { useFromNameToText } from 'hooks/useFromNameToText.hook';
import { dialogColorNames } from 'components/DialogOfCreatingCustomTheme';

const useStyles = makeStyles(({ spacing, palette, breakpoints, shape: { borderRadius } }) => ({
  wrapperOfColorPreview: {
    margin: spacing(0, 0, 2, 0),
    '& legend': {
      padding: spacing(0, 0.4)
    }
  },
  elementContainer: ({ backgroundColor,isHaveBorder }) => ({
    margin: spacing(0, 0, 2, 0),
    borderRadius,
    padding: spacing(0.4, 0.8, 0.8),
    position: 'relative',
    zIndex: 10000,
    border:isHaveBorder ?`1px solid ${palette.mediumEmphasis.main}` : '',
    backgroundColor
  })
}));

const PickerColorElement: FC<PickerColorElementPropsType> = ({ name, setColor, color }) => {
  const colorInHexFormat = colord(color).toHex();

  const [,secondaryColor] = useThemeColors();

  const isHaveBorder = name === dialogColorNames.PAPER_COLOR;

  console.log(color);

  const classes = useStyles({ backgroundColor: colorInHexFormat,isHaveBorder });

  const title = useFromNameToText(name);

  const inputsColorUtilsOfCustomColorPickerProps = {
    color,
    setColor,
    inputColor:secondaryColor,
    customFormatName: 'rgb',
    colorInHexFormat
  };

  return (
    <Grid className={classes.elementContainer}>
      <Typography variant={'subtitle2'} color={'textSecondary'}>
        {title}
      </Typography>
      <Grid className={classes.wrapperOfColorPreview}></Grid>
      <InputsColorUtilsOfCustomColorPicker
        {...inputsColorUtilsOfCustomColorPickerProps}
        isCustomFormatInputHidden={false}
      />
    </Grid>
  );
};

export default PickerColorElement;
