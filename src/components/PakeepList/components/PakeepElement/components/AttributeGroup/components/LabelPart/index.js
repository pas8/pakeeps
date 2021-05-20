import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { colord } from 'colord';
import { find } from 'lodash';
import { iconsArr } from 'components/Icons';
import LabelItem from './components/LabelItem';
import MenuOfLabelPart from './components/Menu';

const LabelPart = ({ labels, handleDeleteLabelFromPakeepThunk, changeLabelItemThunk, pakeepId }) => {
  const nullityOfMenuState = { mouseX: null, mouseY: null, id: null, variant: '', labelIconName: '' };
  const [menuState, setMenuState] = useState(nullityOfMenuState);

  const setLabelHoverStatusIsFalse = () => setLabelHover(false);

  const handleClose = () => setMenuState(nullityOfMenuState);

  const handleDeleteLabel = () => {
    handleDeleteLabelFromPakeepThunk(pakeepId, menuState.id);
    handleClose();
  };
  const handleChangeLabelColor = color => changeLabelItemThunk(menuState.id, { color });
  const handleChangeLabelIconName = iconName => changeLabelItemThunk(menuState.id, { iconName });
  const handleChangeLabelVariant = () => {
    const variant = menuState.variant === 'default' ? 'outlined' : 'default';
    changeLabelItemThunk(menuState.id, { variant });
    setMenuState(state => ({ ...state, variant }));
  };
  useEffect(() => {
    const { variant, iconName: labelIconName } = find(labels, ({ id }) => menuState.id === id) ?? {
      variant: '',
      labelIconName: ''
    };
    setMenuState(state => ({ ...state, labelIconName, variant }));
  }, [labels]);

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
          size: 'small',
          key: nanoid()
        };

        const handleOpen = e => {
          e.preventDefault();
          setMenuState({ mouseX: e.clientX, mouseY: e.clientY, id, variant, labelIconName });
        };

        const labelItemProps = { isDark, currentColor, handleOpen, labelChipProps };

        return <LabelItem {...labelItemProps} />;
      })}
      <MenuOfLabelPart
        menuState={menuState}
        handleDeleteLabel={handleDeleteLabel}
        handleClose={handleClose}
        handleChangeLabelColor={handleChangeLabelColor}
        handleChangeLabelVariant={handleChangeLabelVariant}
        handleChangeLabelIconName={handleChangeLabelIconName}
      />
    </>
  );
};

LabelPart.propTypes = {
  changeLabelItemThunk: PropTypes.func,
  handleDeleteLabelFromPakeepThunk: PropTypes.func,
  labels: PropTypes.shape({
    map: PropTypes.func
  }),
  pakeepId: PropTypes.string
};

export default LabelPart;
