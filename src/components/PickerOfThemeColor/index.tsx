import { Grid, Typography, Button, makeStyles, ButtonGroup } from '@material-ui/core';
import BackgroundPlaceholderByPas from 'components/BackgroundPlaceholder';
import { colorColumnArr } from 'components/ColorChanger/components/CustomColor';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import ColumnElementOfPreparedColorExamples from 'components/ColorChanger/components/PreparedColorExamples/components/Column/components/ColumnElement';
import { useAlpha } from 'hooks/useAlpha.hook';
import { useRandomColor } from 'hooks/useRandomColor.hook';
import { useHover } from 'react-use';
import { FC, MouseEventHandler, useState } from 'react';
import { PickerOfThemeColorPropsType } from './types';
import { shuffle } from 'lodash';
import { useContrastText } from 'hooks/useContrastText.hook';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import clsx from 'clsx';
import UnfoldMoreOutlinedIcon from '@material-ui/icons/UnfoldMoreOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
const useStyles = makeStyles(({ spacing, palette, breakpoints, shape: { borderRadius } }) => ({
  colorPaletteContainer: {
    borderRadius,

    width: '49.4%',

    [breakpoints.down('md')]: {
      width: '98%'
    },
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
    height: spacing(12 * 0.42),
    width: '32%',

    [breakpoints.down('lg')]: {
      width: '31%'
    },
    [breakpoints.down('md')]: {
      width: '32.4%'
    },

    [breakpoints.down('sm')]: {
      width: '31%'
    },

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
      background: useAlpha(color, 0.6),

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
  }),
  showMoreColors: ({ color, isColorRandom }: { color: string; isColorRandom: any }) => ({
    // borderColor: useAlpha(color, 0.42),
    // height: spacing(16 * 0.42),
    // background: useAlpha(color, 0.42),
    position: 'relative',

    minWidth: spacing(26)
    // width:`${spacing(16 * 0.42)} !important`,
    // width:spacing(16 * 0.42),
    // padding:0,
  }),

  containerOfPreparedExamples: {
    maxHeight: spacing(36 * 0.42),
    overflow: 'hidden'
    // [breakpoints.down('md')]: {
    //   width: '48%'
    // },
  }
  // border: `2px solid ${colord(background.default).invert().alpha(0.32).toHex()}`
}));

// const colorArr = shuffle(colorColumnArr);
const colorArr = [...colorColumnArr, ...shuffle(colorColumnArr)];

const PickerOfThemeColor: FC<PickerOfThemeColorPropsType> = ({
  title,
  handleChangeColor,
  color,
  isColorRandom,

  setElStateOfThemePicker
}) => {
  const classes = useStyles({ color, isColorRandom });

  const [isExtended, setIsExtended] = useState(false);

  const handleChangeExtendStatus = () => {
    setIsExtended(prev => !prev);
  };

  const handleGenegateRandomColor = () => {
    const randomColor = useRandomColor();

    handleChangeColor(randomColor, true);
  };

  const handelOpenMoreMenu: MouseEventHandler = ({ currentTarget }) => {
    setElStateOfThemePicker({ anchorEl: currentTarget, handleSave: handleChangeColor, color });
  };

  const [randomThemeGenerator] = useHover(isHovering => (
    <Grid className={classes.buttonContainerOfRandomColorGenerator} onClick={handleGenegateRandomColor}>
      <BackgroundPlaceholderByPas
        color={useAlpha(color, isHovering || isColorRandom ? 0.8 : 0.42)}
        title={' Generate random color '}
        ButtonIcon={isColorRandom ? DoneOutlineOutlinedIcon : PaletteOutlinedIcon}
        buttonText={'random '}
        onClick={handleGenegateRandomColor}
      />
    </Grid>
  ));

  const [moreButton] = useHover(isHovering => (
    <Grid
      className={clsx(classes.buttonContainerOfRandomColorGenerator)}
      onClick={handelOpenMoreMenu}
      // style={{ width: 126 }}
    >
      <BackgroundPlaceholderByPas
        color={useAlpha(color, isHovering || isColorRandom ? 0.8 : 0.42)}
        title={'Advanced &'}
        ButtonIcon={ArrowDropDownCircleOutlinedIcon}
        buttonText={'Advanced'}
        onClick={handelOpenMoreMenu}
      />
    </Grid>
  ));

  const [extendButton] = useHover(isHovering => (
    <Grid
      className={clsx(classes.buttonContainerOfRandomColorGenerator)}
      onClick={handelOpenMoreMenu}
      // style={{ width: 106 }}
    >
      <BackgroundPlaceholderByPas
        color={useAlpha(color, isHovering || isColorRandom ? 0.8 : 0.42)}
        title={'Extend &'}
        ButtonIcon={UnfoldMoreOutlinedIcon}
        buttonText={'Extend '}
        onClick={handleChangeExtendStatus}
      />
    </Grid>
  ));

  return (
    <Grid key={title} component={'fieldset'} className={classes.colorPaletteContainer}>
      <legend>
        <Typography variant={'subtitle1'} color={'textSecondary'}>
          {title}
        </Typography>
      </legend>

      <Grid container alignItems={'center'} justify={'space-between'}>
        {/* <ButtonGroup orientation={''}> */}
        {/* <Button
          onClick={handleGenegateRandomColor}
          className={classes.buttonContainerOfRandomColorGenerator}
          startIcon={<VisibilityOutlinedIcon />}
        >
          Advanced color settings
        </Button> */}
        {/* </ButtonGroup> */}
        <Grid container className={classes.containerOfPreparedExamples} justify={'space-between'}>
          {colorArr.map(({ id, colorName }) => {
            return (
              <ColumnElementOfPreparedColorExamples
                handleSetColor={handleChangeColor}
                color={color}
                key={`${title}-${id}`}
                isExtended={isExtended}
                colorName={colorName}
                customColor={false}
              />
            );
          })}
        </Grid>

        <Grid container justify={'space-between'} style={{ marginTop: 4, marginLeft: 2 }} wrap={'wrap'}>
          {randomThemeGenerator}

          {extendButton}
          {moreButton}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PickerOfThemeColor;
