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
  wrapperOfUtils: {
    margin: spacing(1.4, 0, 0, 0)
  },
  elementContainer: ({ backgroundColor, isHaveBorder, isColorReverse, isSelected }: any) => ({
    // margin: spacing(0, 0, 2, 0),
    borderRadius,
    padding: spacing(0.4, 0.8, 0.8),
    position: 'relative',
    zIndex: 10000,
    border:
      isHaveBorder || isColorReverse || isSelected
        ? `1px solid ${isSelected ? palette.primary.main : isColorReverse ? backgroundColor : palette.text.hint}`
        : `1px solid transparent`,
    '&:hover': {
      border: `1px solid ${palette.secondary.main}`
    },
    backgroundColor: isColorReverse ? palette.background.paper : backgroundColor
  })
}));

const PickerColorElement: FC<PickerColorElementPropsType> = ({
  name,
  setColor,
  color,
  isSelected,
  onClick,
  colorFormat
}) => {
  const colorInHexFormat = colord(color).toHex();
  const [, secondaryColor] = useThemeColors();

  const isItemTextColor = name === dialogColorNames.TEXT_COLOR;
  const isHaveBorder = name === dialogColorNames.PAPER_COLOR;
  const isColorReverse = isItemTextColor;

  const classes = useStyles({ backgroundColor: colorInHexFormat, isHaveBorder, isColorReverse, isSelected });

  const title = useFromNameToText(name);

  const inputsColorUtilsOfCustomColorPickerProps = {
    color,
    setColor,
    inputColor: isColorReverse ? colorInHexFormat : secondaryColor,
    customFormatName: colorFormat,
    colorInHexFormat
  };

  return (
    <Grid className={classes.elementContainer} onClick={onClick}>
      <Typography variant={'subtitle2'} color={'textSecondary'}>
        {title}
      </Typography>
      <Grid className={classes.wrapperOfUtils}>
        <InputsColorUtilsOfCustomColorPicker isInputsHaveSameGap {...inputsColorUtilsOfCustomColorPickerProps} />
      </Grid>
    </Grid>
  );
};

export default PickerColorElement;
