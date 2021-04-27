import { useState } from "react";
import { HexColorPicker } from "react-colorful";

import TextureOutlinedIcon from '@material-ui/icons/TextureOutlined';
const ColorPickerByPas = () => {
  const [color, setColor] = useState("#aabbcc");
  return <HexColorPicker color={color} onChange={setColor} />;
}

export default ColorPickerByPas
