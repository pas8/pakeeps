import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { find } from 'lodash';
import LabelItem from './components/LabelItem';
import MenuOfLabelPart from './components/Menu';
import { useFindIcon } from 'hooks/useFindIcon.hook';

const LabelPart = ({ labels, handleDeleteLabelFromPakeepFunc, changeLabelItemFunc, pakeepId }) => {
  const nullityOfMenuState = { mouseX: null, mouseY: null, id: null, variant: '', labelIconName: '' };
  const [menuState, setMenuState] = useState(nullityOfMenuState);

  const setLabelHoverStatusIsFalse = () => setLabelHover(false);

  const handleClose = () => setMenuState(nullityOfMenuState);

  const handleDeleteLabel = () => {
    handleDeleteLabelFromPakeepFunc(pakeepId, menuState.id);
    handleClose();
  };
  const handleChangeLabelColor = color => changeLabelItemFunc(menuState.id, { color });
  const handleChangeLabelIconName = iconName => changeLabelItemFunc(menuState.id, { iconName });
  const handleChangeLabelVariant = () => {
    const variant = menuState.variant === 'default' ? 'outlined' : 'default';
    changeLabelItemFunc(menuState.id, { variant });
    setMenuState(state => ({ ...state, variant }));
  };
  useEffect(() => {
    const { variant, iconName: labelIconName } = find(labels, ({ id }) => menuState.id === id) ?? {
      variant: '',
      labelIconName: ''
    };
    setMenuState(state => ({ ...state, labelIconName, variant }));
  }, [labels]);

  const menuOfLabelPartProps = {
    menuState,
    handleDeleteLabel,
    handleClose,
    handleChangeLabelColor,
    handleChangeLabelVariant,
    handleChangeLabelIconName
  };

  return (
    <>
      {labels.map(({ title, iconName: labelIconName, id, color, variant }) => {
        const icon = useFindIcon(labelIconName);

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

        const labelItemProps = { currentColor:color, handleOpen, labelChipProps };

        return <LabelItem {...labelItemProps} />;
      })}
      <MenuOfLabelPart {...menuOfLabelPartProps} />
    </>
  );
};

LabelPart.propTypes = {
  changeLabelItemFunc: PropTypes.func,
  handleDeleteLabelFromPakeepFunc: PropTypes.func,
  labels: PropTypes.shape({
    map: PropTypes.func
  }),
  pakeepId: PropTypes.string
};

export default LabelPart;
