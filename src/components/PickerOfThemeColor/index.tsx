import { Grid, Typography, Button, makeStyles, ButtonGroup } from '@material-ui/core';
import BackgroundPlaceholderByPas from 'components/BackgroundPlaceholder';
import { colorColumnArr } from 'components/ColorChanger/components/CustomColor';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import ColumnElementOfPreparedColorExamples from 'components/ColorChanger/components/PreparedColorExamples/components/Column/components/ColumnElement';
import { useAlpha } from 'hooks/useAlpha.hook';
import { useRandomColor } from 'hooks/useRandomColor.hook';
import { useHover } from 'react-use';
import { FC } from 'react';
import { PickerOfThemeColorPropsType } from './types';
import { shuffle } from 'lodash';
import { useContrastText } from 'hooks/useContrastText.hook';

const useStyles = makeStyles(({ spacing, palette, breakpoints, shape: { borderRadius } }) => ({
  colorPaletteContainer: {
    borderRadius,
    padding: spacing(0, 1, 0.8),
    borderColor: useAlpha(palette.mediumEmphasis?.main, 0.2),
    '& legend': {
      padding: spacing(0, 0.8)
    }
  },
  buttonContainerOfRandomColorGenerator: ({ color, isColorRandom }: { color: string; isColorRandom: any }) => ({
    // background: color,
    // width: 140,
    position: 'relative',
    margin: spacing(0, 0.6, 0, 0),
    height: spacing(16 * 0.42),
    width: spacing(30),

    color: useContrastText(color),
    // '&:hover': {
    background: useAlpha(color, 0.42),
    // }
    
    border: `${isColorRandom ? 3 : 2}px solid`,
    borderRadius,
    borderColor: useAlpha(color, isColorRandom ? 1 : 0.42),
    '&:hover': {
      cursor: 'pointer',
      // background: useAlpha(color, 0.6),

      borderColor: color,
      '& button': {
        borderColor: color
      }
    },
    '& button': {
      // borderColor:useAlpha(color,isColorRandom ? 1 : 0.42),
      borderColor: useAlpha(color, 0.42),
      color
      // '&:hover':{
      // borderColor: color,

      // }
    }
  })

  // border: `2px solid ${colord(background.default).invert().alpha(0.32).toHex()}`
}));

// const colorArr = shuffle(colorColumnArr);
const colorArr = colorColumnArr;

const PickerOfThemeColor: FC<PickerOfThemeColorPropsType> = ({ title, handleChangeColor, color, isColorRandom }) => {
  const classes = useStyles({ color, isColorRandom });

  const handleGenegateRandomColor = () => {
    const randomColor = useRandomColor();

    handleChangeColor(randomColor, true);
  };

  const [randomThemeGenerator] = useHover(isHovering => (
    <Grid className={classes.buttonContainerOfRandomColorGenerator} onClick={handleGenegateRandomColor}>
      <BackgroundPlaceholderByPas
        color={useAlpha(color, isHovering || isColorRandom ? 0.8 : 0.42)}
        title={' Generate random color '}
        ButtonIcon={isColorRandom && DoneOutlineOutlinedIcon}
        buttonText={'Generate random theme'}
        onClick={handleGenegateRandomColor}
      />
    </Grid>
  ));
  return (
    <Grid
      key={title}
      component={'fieldset'}
      className={classes.colorPaletteContainer}
      xl={10}
      lg={11}
      md={12}
      xs={12}
      sm={8}
    >
      <legend>
        <Typography variant={'subtitle1'} color={'textSecondary'}>
          {title}
        </Typography>
      </legend>

      <Grid container alignItems={'center'}>
        {/* <ButtonGroup orientation={''}> */}
        {randomThemeGenerator}
        {/* <Button
          onClick={handleGenegateRandomColor}
          className={classes.buttonContainerOfRandomColorGenerator}
          startIcon={<VisibilityOutlinedIcon />}
        >
          Advanced color settings
        </Button> */}
        {/* </ButtonGroup> */}
        {colorArr.map(({ id, colorName }) => {
          return (
            <ColumnElementOfPreparedColorExamples
              handleSetColor={handleChangeColor}
              color={color}
              key={`${title}-${id}`}
              isExtended={false}
              colorName={colorName}
              customColor={false}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

export default PickerOfThemeColor;
