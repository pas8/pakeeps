import { Button, ButtonGroup, Grid, Typography, Box, Slider } from '@material-ui/core';
import React, { ChangeEventHandler, FC, useState } from 'react';
import ReactAvatarEditor from 'react-avatar-editor';
import RotateRightOutlinedIcon from '@material-ui/icons/RotateRightOutlined';
import RotateLeftOutlinedIcon from '@material-ui/icons/RotateLeftOutlined';
import { useFromNameToText } from 'hooks/useFromNameToText.hook';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import { colord } from 'colord';
import { values } from 'lodash';
import { AvatarEditorByPasPropsType } from './types';

const AvatarEditorByPas: FC<AvatarEditorByPasPropsType> = ({
  avatarEditorState: state,
  setAvatarEditorState: setState,
  setEditor
}) => {
  const [backgroundColor] = useThemeColors();
  const color = values(colord(backgroundColor!).alpha(0.42).toRgb());

  const handleScale = (__: any, scale: any) => {
    // __.preventDefault();
    console.log(scale);
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
      step: 0.1,
      min: 0,
      max: 2,
      // defaultValue: 0,
      name: 'scaleee',
      onChange: handleScale,
      value: state.scale
    },
    {
      step: 1,
      min: 0,
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

  return (
    <Grid container>
      <Grid>
        <ReactAvatarEditor
          {...state}
          ref={setEditorRef}
          borderRadius={state.width / (100 / state.borderRadius)}
          color={color}
          // backgroundColor={state.backgroundColor}
          // onLoadFailure={logCallback.bind(this, 'onLoadFailed')}
          // onLoadSuccess={logCallback.bind(this, 'onLoadSuccess')}
          // onImageReady={logCallback.bind(this, 'onImageReady')}
          className={'editor-canvas'}
          style={{ borderRadius: 4 }}
          // disableCanvasRotation={state.disableCanvasRotation}
        />
      </Grid>
      <Box ml={4}>
        <Box>
          {slidersArr.map(el => (
            <Grid key={el.name} container>
              <Typography>{useFromNameToText(el.name)}</Typography>

              <Slider {...el} color={'secondary'} valueLabelDisplay={'auto'} />
            </Grid>
          ))}
        </Box>
        <Box mt={0.8}>
          <Grid container alignItems={'center'}>
            <Box mr={2}>
              <Typography variant={'subtitle1'}> Rotate: </Typography>
            </Box>
            <ButtonGroup color="secondary" aria-label="outlined secondary button group">
              <Button endIcon={<RotateRightOutlinedIcon />} onClick={handleRotateToRight}>
                Right
              </Button>
              <Button endIcon={<RotateLeftOutlinedIcon />} onClick={handleRotateToLeft}>
                Left
              </Button>
            </ButtonGroup>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default AvatarEditorByPas;
