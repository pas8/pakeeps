import React, { useState, Fragment } from 'react';
import { iconsArr } from 'components/Icons';
import { nanoid } from 'nanoid';
import { colord } from 'colord';
import LabelItem from './components/LabelItem';
import MenuOfLabelPart from './components/Menu';

const LabelPart = ({ labels, handleDeleteLabelFromPakeepThunk, changeLabelItemThunk}) => {
  const nullityOfMenuState = { mouseX: null, mouseY: null, id: null };
  const [menuState, setMenuState] = useState(nullityOfMenuState);

  const setLabelHoverStatusIsFalse = () => setLabelHover(false);

  const handleClose = () => setMenuState(nullityOfMenuState);
  const handleDeleteLabel = () => handleDeleteLabelFromPakeepThunk(id);
  const handleChangeLabelColor = color => changeLabelItemThunk({ color });
  return (
    <>
      {labels.map(({ title, iconName: labelIconName, id, color, variant }) => {
        const icon = iconsArr.find(({ iconName }) => iconName === labelIconName)?.icon;

        const currentColor = color === 'primary' || color === 'secondary' ? null : color;
        const isDark = colord(color).brightness() >= 0.48;

        const labelChipProps = {
          icon,
          label: title,
          className: null,
          variant,
          color,
          size: 'small'
        };

        const handleOpen = e => {
          e.preventDefault();
          setMenuState({ mouseX: e.clientX, mouseY: e.clientY, id });
        };

        const labelItemProps = { isDark, currentColor, handleOpen, labelChipProps };

        return (
          <Fragment key={nanoid()}>
              <LabelItem {...labelItemProps} />
          </Fragment>
        );
      })}
      <MenuOfLabelPart
        menuState={menuState}
        handleDeleteLabel={handleDeleteLabel}
        handleClose={handleClose}
        handleChangeLabelColor={handleChangeLabelColor}
      />
    </>
  );
};

export default LabelPart;
