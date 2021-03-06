import { Button, ButtonGroup, Grid, Typography, Box, Slider, makeStyles } from '@material-ui/core';
import mixPlugin from 'colord/plugins/mix';
import React, { ChangeEventHandler, FC, useState } from 'react';
import RotateRightOutlinedIcon from '@material-ui/icons/RotateRightOutlined';
import RotateLeftOutlinedIcon from '@material-ui/icons/RotateLeftOutlined';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import dynamic from 'next/dynamic';
import { Skeleton } from '@material-ui/lab';
import { colord, extend } from 'colord';
import { includes, values } from 'lodash';

import ThirdStepOfSteperOfDialogOfAddNewLabel from 'components/IconsUtils/components/LabelsList/components/DialogOfAddNewLabel/components/Steper/components/Third';
import ColorPickerByPas from 'components/ColorChanger';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';
import { useFromNameToText } from 'hooks/useFromNameToText.hook';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import { customColorPlaceholder } from 'components/AccountAvatar';
import { AvatarEditorByPasPropsType } from './types';
import ReactAvatarEditor from 'react-avatar-editor'

const useStyles = makeStyles(({ spacing, transitions, breakpoints, palette: { background } }) => ({
  utilsContainer: {
    margin: spacing(0, 0, 0, 4),

    [breakpoints.down('sm')]: {
      margin: spacing(2, 0, 0, 0)
    }
  },
  containerOfBgColorUtils: {
    margin: spacing(0, 0, 0, 4),

    [breakpoints.down('sm')]: {
      margin: spacing(2, 0, 0, 0)
    },
    width: 260
  }
}));

const AvatarEditorByPas: FC<AvatarEditorByPasPropsType> = ({
  avatarEditorState: state,
  setAvatarEditorState: setState,
  setEditor
}) => {
  extend([mixPlugin]);

  const classes = useStyles();

  const [customColor, setCustomColor] = useState<boolean | string>(false);

  const [isColorListHidden, setIsColorListHidden] = useState<boolean>(false);

  const [primaryColor, secondaryColor] = useThemeColors();
  const color = colord(primaryColor!).mix(secondaryColor!).toRgb();

  const colorValues = values(color);

  const handleScale = (__: any, scale: any) => {
    setState(state => ({ ...state, scale }));
  };

  const rotateScale = (__: any, rotate: any) => {
    // __.preventDefault();
    setState(state => ({ ...state, rotate }));
  };
  const handleRotateToLeft: ChangeEventHandler<any> = e => {
    e.preventDefault();
    const rotate = state.rotate - 90;
    setState(state => ({ ...state, rotate }));
  };

  const handleRotateToRight: ChangeEventHandler<any> = e => {
    e.preventDefault();
    const rotate = state.rotate + 90;
    setState(state => ({ ...state, rotate }));
  };

  const handleBorderRadius = (__: any, borderRadius: any) => {
    setState(state => ({ ...state, borderRadius }));
  };

  const handleXPosition = (__: any, x: any) => {
    setState(state => ({ ...state, position: { ...state.position, x } }));
  };

  const handleYPosition = (__: any, y: any) => {
    // console.log(y)
    setState(state => ({ ...state, position: { ...state.position, y } }));
  };

  const setEditorRef = (editor: any) => {
    setEditor(editor);
  };

  const slidersArr = [
    {
      step: 0.01,
      min: 0,
      max: 2,
      // defaultValue: 0,
      name: 'scaleee',
      onChange: handleScale,
      value: state.scale
    },
    {
      step: 1,
      min: 4,
      max: 50,
      defaultValue: 0,
      name: 'borderRadius',
      onChange: handleBorderRadius,
      value: state.borderRadius
    },
    { step: 1, min: 0, max: 180, defaultValue: 0, name: 'rotate', onChange: rotateScale, value: state.rotate },
    {
      step: 0.01,
      min: 0,
      max: 1,
      defaultValue: 0,
      name: 'X-Position',
      onChange: handleXPosition,
      value: state.position.x
    },
    {
      step: 0.01,
      min: 0,
      max: 1,
      defaultValue: 0,
      name: 'Y-Position',
      onChange: handleYPosition,
      value: state.position.y
    }
  ] as const;

  const CUSTOM_COLOR = 'customColor';
  const TRANSPARENT = 'transparent';

  const colorVariantsNames = [TRANSPARENT, primaryColor, secondaryColor];
  const CUSTOM_COLOR_VALUE = includes(colorVariantsNames, state.backgroundColor)
    ? 'customColor'
    : state.backgroundColor;

  const colorVariants = [
    { labelText: 'Transparent color', value: colorVariantsNames[0]! },
    { labelText: 'Primary color', value: colorVariantsNames[1]! },
    { labelText: 'Secondary color', value: colorVariantsNames[2]! },
    { labelText: 'Custom color', value: CUSTOM_COLOR_VALUE! }
  ];
  const onChangeOfLabelColorRadio: ChangeEventHandler<any> = ({ target: { value: backgroundColor } }) => {
    const isCustomColor = backgroundColor === CUSTOM_COLOR;
    setCustomColor(isCustomColor);
    setIsColorListHidden(isCustomColor);
    // const backgroundColor = isCustomColor ? 'transparent' : value;
    setState(state => ({ ...state, backgroundColor }));
  };
  const thirdStepOfSteperOfDialogOfAddNewLabelProps = {
    onChange: onChangeOfLabelColorRadio,
    colorVariants,
    customColor: customColorPlaceholder,
    value: state.backgroundColor
  };
  const handleSaveCustomColor = (backgroundColor: string) => {
    setState(state => ({ ...state, backgroundColor }));
  };
  const backgroundColor =
    CUSTOM_COLOR_VALUE === CUSTOM_COLOR && CUSTOM_COLOR_VALUE === state.backgroundColor
      ? TRANSPARENT
      : state.backgroundColor;

  const isArrowListButtonShouldRotate = !!customColor && !isColorListHidden;

  const { isSizeSmall } = useBreakpointNames();

  return (
    <Grid container wrap={!isSizeSmall ? 'nowrap' : 'wrap'} direction={isSizeSmall ? 'column' : 'row'}>
      <Grid>
        <ReactAvatarEditor
          {...state}
          ref={setEditorRef}
          borderRadius={state.width / (100 / state.borderRadius)}
          color={colorValues}
          //@ts-ignore
          backgroundColor={backgroundColor}
          // onLoadFailure={logCallback.bind(this, 'onLoadFailed')}
          // onLoadSuccess={logCallback.bind(this, 'onLoadSuccess')}
          // onImageReady={logCallback.bind(this, 'onImageReady')}
          className={'editor-canvas'}
          style={{
            borderRadius: 4,
            backgroundColor
          }}
          // disableCanvasRotation={state.disableCanvasRotation}
        />
      </Grid>
      <Grid className={classes.utilsContainer} container wrap={'nowrap'} direction={isSizeSmall ? 'column' : 'row'}>
        <Grid>
          <Box>
            {slidersArr.map(el => (
              <Grid key={el.name} container>
                <Typography>{useFromNameToText(el.name)}</Typography>

                <Slider {...el} color={'secondary'} valueLabelDisplay={'auto'} track={'normal'} />
              </Grid>
            ))}
          </Box>
          <Box mt={0.8}>
            <Grid container alignItems={'center'}>
              <Box mr={2}>
                <Typography variant={'subtitle1'}> Rotate: </Typography>
              </Box>
              <ButtonGroup color={'secondary'}>
                <Button endIcon={<RotateRightOutlinedIcon />} onClick={handleRotateToRight}>
                  Right
                </Button>
                <Button endIcon={<RotateLeftOutlinedIcon />} onClick={handleRotateToLeft}>
                  Left
                </Button>
              </ButtonGroup>
            </Grid>
          </Box>
          {/* <Box>
            <Button color={'secondary'} variant={'outlined'}>
              Generate doogle bgColor
            </Button>
          </Box> */}
        </Grid>
        <Box className={classes.containerOfBgColorUtils}>
          <Grid container alignItems={'center'}>
            <Grid
              onClick={() => {
                !!customColor && setIsColorListHidden(e => !e);
              }}
              style={{ cursor: !!customColor ? 'pointer' : 'auto' }}
            >
              <Grid container>
                <Typography gutterBottom>Backgroung_color</Typography>
                {!!customColor && (
                  <ArrowDropDownIcon style={{ transform: `rotate(${isArrowListButtonShouldRotate ? 180 : 0}deg)` }} />
                )}
              </Grid>
            </Grid>
          </Grid>

          {!isColorListHidden && (
            <ThirdStepOfSteperOfDialogOfAddNewLabel {...thirdStepOfSteperOfDialogOfAddNewLabelProps} />
          )}

          {!!customColor && (
            <ColorPickerByPas
              handleSave={handleSaveCustomColor}
              customColor={{ ...customColorPlaceholder, isUseDefault: true }}
            />
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default AvatarEditorByPas;
