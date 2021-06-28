import React, { FC, useState } from 'react';
import ReactAvatarEditor from 'react-avatar-editor';

const AvatarEditorByPas: FC<any> = ({ image }) => {
  const [state, setState] = useState<any>({
    image,
    allowZoomOut: false,
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    rotate: 0,
    borderRadius: 0,
    preview: null,
    width: 200,
    height: 200,
    disableCanvasRotation: false,
    isTransparent: false,
    backgroundColor: null
  });

  const handleScale = e => {
    const scale = parseFloat(e.target.value);
    setState(state => ({ ...state, scale }));
  };

  const rotateScale = e => {
    const rotate = parseFloat(e.target.value);
    e.preventDefault();
    setState(state => ({ ...state, rotate }));
  };

  const rotateLeft = e => {
    e.preventDefault();
    const rotate = state.rotate - 90;
    setState(state => ({ ...state, rotate }));
  };

  const rotateRight = e => {
    e.preventDefault();
    const rotate = state.rotate + 90;
    setState(state => ({ ...state, rotate }));
  };

  const handleBorderRadius = e => {
    const borderRadius = parseInt(e.target.value);
    setState(state => ({ ...state, borderRadius }));
  };

  const handleXPosition = e => {
    const x = parseFloat(e.target.value);
    setState(state => ({ ...state, position: { ...state.position, x } }));
  };

  const handleYPosition = e => {
    const y = parseFloat(e.target.value);
    setState(state => ({ ...state, position: { ...state.position, y } }));
  };

  const setEditorRef = editor => {
    if (editor) editor = editor;
  };

  return (
    <div>
      <ReactAvatarEditor
        ref={setEditorRef}
        scale={parseFloat(state.scale)}
        width={state.width}
        height={state.height}
        position={state.position}
        rotate={parseFloat(state.rotate)}
        borderRadius={state.width / (100 / state.borderRadius)}
        // backgroundColor={state.backgroundColor}
        // onLoadFailure={logCallback.bind(this, 'onLoadFailed')}
        // onLoadSuccess={logCallback.bind(this, 'onLoadSuccess')}
        // onImageReady={logCallback.bind(this, 'onImageReady')}
        image={state.image}
        className={'editor-canvas'}
        // disableCanvasRotation={state.disableCanvasRotation}
      />
      <br />
      Zoom:
      <input
        name="scale"
        type="range"
        onChange={handleScale}
        min={state.allowZoomOut ? '0.1' : '1'}
        max="2"
        step="0.01"
        defaultValue="1"
      />
      <br />
      Border radius:
      <input name="scale" type="range" onChange={handleBorderRadius} min="0" max="50" step="1" defaultValue="0" />
      <br />
      X Position:
      <input
        name="scale"
        type="range"
        onChange={handleXPosition}
        min="0"
        max="1"
        step="0.01"
        value={state.position.x}
      />
      Y Position:
      <input
        name="scale"
        type="range"
        onChange={handleYPosition}
        min="0"
        max="1"
        step="0.01"
        value={state.position.y}
      />
      Rotate:
      <button onClick={rotateLeft}>Left</button>
      <button onClick={rotateRight}>Right</button>
      <br />
      <br />
      Rotation Scale:
      <input name="scale" type="range" onChange={rotateScale} min="0" max="180" step="1" defaultValue="0" />
    </div>
  );
};

export default AvatarEditorByPas;
