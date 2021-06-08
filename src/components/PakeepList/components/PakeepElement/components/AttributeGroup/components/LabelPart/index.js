import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { find } from 'lodash';
import LabelItem from './components/LabelItem';
import MenuOfLabelPart from './components/Menu';
import { useFindIcon } from 'hooks/useFindIcon.hook';
import WrapperOfMenuOfLabelPart from './components/MenuWrapper';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';

const LabelPart = ({
  labels,
  handleDeleteLabelFromPakeepFunc,
  changeGloabalLabelItemFunc,
  pakeepId,
  parentBackgrounColor,
  customColor: notReversedCustomColor
}) => {
  if (!labels) return null;
  const customColor = useGetReversedCustomColor(notReversedCustomColor);

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

  const wrapperOfMenuOfLabelPartProps = {
    handleClose,
    handleDeleteLabel,
    menuState,
    changeGloabalLabelItemFunc,
    setMenuState,
    customColor
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

        const labelItemProps = {
          currentColor: color,
          handleOpen,
          labelChipProps,
          customColor: notReversedCustomColor,
          parentBackgrounColor
        };

        return <LabelItem {...labelItemProps} />;
      })}
      <WrapperOfMenuOfLabelPart {...wrapperOfMenuOfLabelPartProps} />
    </>
  );
};

LabelPart.propTypes = {
  changeGloabalLabelItemFunc: PropTypes.func,
  customColor: PropTypes.any,
  handleDeleteLabelFromPakeepFunc: PropTypes.func,
  labels: PropTypes.shape({
    map: PropTypes.func
  }),
  pakeepId: PropTypes.string,
  parentBackgrounColor: PropTypes.any
};

export default LabelPart;
