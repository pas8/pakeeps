import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { find } from 'lodash';
import LabelItem from './components/LabelItem';
import MenuOfLabelPart from './components/Menu';
import { useFindIcon } from 'hooks/useFindIcon.hook';
import WrapperOfMenuOfLabelPart from './components/MenuWrapper';

const LabelPart = ({
  labels,
  handleDeleteLabelFromPakeepFunc,
  changeLabelItemFunc,
  pakeepId,
  customColor,
  parentBackgrounColor
}) => {
  const nullityOfMenuState = {
    mouseX: null,
    mouseY: null,
    id: null,
    variant: '',
    labelIconName: '',
    title: '',
    color: ''
  };
  const [menuState, setMenuState] = useState(nullityOfMenuState);

  const handleClose = () => setMenuState(nullityOfMenuState);

  const handleDeleteLabel = () => {
    handleDeleteLabelFromPakeepFunc(pakeepId, menuState.id);
    handleClose();
  };

  // useEffect(() => {
  //   const { variant, iconName: labelIconName } = find(labels, ({ id }) => menuState.id === id) ?? {
  //     variant: '',
  //     labelIconName: ''
  //   };
  //   setMenuState(state => ({ ...state, labelIconName, variant }));
  // }, [labels]);

  const wrapperOfMenuOfLabelPartProps = {
    handleClose,
    handleDeleteLabel,
    menuState,
    changeLabelItemFunc,
    setMenuState
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
          setMenuState({ mouseX: e.clientX, mouseY: e.clientY, id, variant, labelIconName, title, color });
        };

        const labelItemProps = { currentColor: color, handleOpen, labelChipProps, customColor, parentBackgrounColor };

        return <LabelItem {...labelItemProps} />;
      })}
      <WrapperOfMenuOfLabelPart {...wrapperOfMenuOfLabelPartProps} />
    </>
  );
};

LabelPart.propTypes = {
  changeLabelItemFunc: PropTypes.func,
  customColor: PropTypes.any,
  handleDeleteLabelFromPakeepFunc: PropTypes.func,
  labels: PropTypes.shape({
    map: PropTypes.func
  }),
  pakeepId: PropTypes.string,
  parentBackgrounColor: PropTypes.any
};

export default LabelPart;
