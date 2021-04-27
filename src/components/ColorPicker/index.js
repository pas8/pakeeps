import { useState } from 'react';
import { RgbaColorPicker } from 'react-colorful';

import TextureOutlinedIcon from '@material-ui/icons/TextureOutlined';
import { Grid, makeStyles } from '@material-ui/core';
import { themeColors } from 'components/theme';

// .custom-layout  {
//   padding: 16px;
//   border-radius: 12px;
//   background: #33333a;
//   box-shadow: 0 6px 12px #999;
// }

// .custom-layout .react-colorful__saturation {
//   margin: 15px 0;
//   border-radius: 5px;
//   border-bottom: none;
// }

// .custom-layout .react-colorful__hue {
//   order: -1;
// }

// .custom-layout .react-colorful__hue,
// .custom-layout .react-colorful__alpha {
//   height: 14px;
//   border-radius: 5px;
// }

// .custom-layout .react-colorful__hue-pointer,
// .custom-layout .react-colorful__alpha-pointer {
//   width: 20px;
//   height: 20px;
// }

const useStyles = makeStyles(theme => ({
  container: {
    '& .react-colorful': {
      padding: theme.spacing(0,1),width:theme.spacing(10)
    },
    '& .react-colorful__pointer': {
      borderRadius: theme.spacing(0.8),
      width:theme.spacing(2.8),
      height:theme.spacing(2.8),
      cursor: 'pointer',
      backgroundColor: 'transparent',
      border: '3px solid rgba(255, 255, 255,0.8)',
      transition: theme.transitions.create('border', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.complex
      }),
      '&:hover': {
        borderColor: 'rgba(255, 255, 255,0.96)'
      }
    },
    '& .react-colorful__alpha': {
      order: -1
    },
    '& .react-colorful__hue,.react-colorful__alpha ': {
      borderRadius:theme.spacing(0.8),
      margin: theme.spacing(2,0),
      height: theme.spacing(2)
    },
    '& .react-colorful__hue-pointer,.react-colorful__alpha-pointer':{
  //  borderWidth: '5px'


    }

  }
}));
const ColorPickerByPas = () => {
  const [color, setColor] = useState(themeColors.primaryMain);
  const classes = useStyles();
  return (
    <Grid className={classes.container}>
      {' '}
      <RgbaColorPicker color={color} onChange={setColor} />
    </Grid>
  );
};

export default ColorPickerByPas;
