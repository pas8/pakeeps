import { colord } from 'colord';
import { FC } from 'react';
import { Grid, Typography, makeStyles, } from '@material-ui/core';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import InputsColorUtilsOfCustomColorPicker from 'components/ColorChanger/components/CustomColor/components/InputsColorUtils';
import { useFromNameToText } from 'hooks/useFromNameToText.hook';
import { dialogColorNames } from 'components/DialogOfCreatingCustomTheme';
import { PickerColorElementPropsType } from './types';

const useStyles = makeStyles(({ spacing, palette, breakpoints, shape: { borderRadius } }) => ({
  wrapperOfUtils: {
    margin: spacing(1, 0, 0, 0)
  },
  elementContainer: ({ backgroundColor, isHaveBorder, isColorReverse, isSelected }: any) => ({
    [breakpoints.down('sm')]: {
      marginTop: spacing(1.4)
    },
    '& legend': {
      padding: spacing(0, 0.6)
    },
    borderRadius,
    padding: spacing(0.4, 0.8, 0.8),
    position: 'relative',
    zIndex: 10000,
    border:
      isHaveBorder || isColorReverse || isSelected
        ? `1px solid ${isSelected ? palette.primary.main : isColorReverse ? backgroundColor : palette.text.disabled}`
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
    colorInHexFormat,
    isUseAlpha: false
  };

  return (
    <Grid className={classes.elementContainer} onClick={onClick} component={'fieldset'}>
      <legend>
        <Typography variant={'subtitle2'} color={'textSecondary'}>
          {title}
        </Typography>
      </legend>
      <Grid className={classes.wrapperOfUtils}>
        {
          //@ts-ignore
          <InputsColorUtilsOfCustomColorPicker isInputsHaveSameGap {...inputsColorUtilsOfCustomColorPickerProps} />
        }
      </Grid>
    </Grid>
  );
};

export default PickerColorElement;
