import PropTypes from 'prop-types';
import React, { useState, useEffect, FC, MouseEvent } from 'react';
import { nanoid } from 'nanoid';
import { find } from 'lodash';
import LabelItem from './components/LabelItem';
import MenuOfLabelPart from './components/Menu';
import { useFindIcon } from 'hooks/useFindIcon.hook';
import WrapperOfMenuOfLabelPart from './components/MenuWrapper';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import { LabelPartPropsType, MenuStateType } from './types';

const LabelPart: FC<LabelPartPropsType> = ({
  labels,
  handleDeleteLabelFromPakeepFunc,
  handleChangeGlobalLabelItem,
  pakeepId,
  parentBackgrounColor,
  customColor: notReversedCustomColor
}) => {
  if (!labels) return null;
  const customColor = useGetReversedCustomColor(notReversedCustomColor);

  const nullityOfMenuState = {
    mouseX: 0,
    mouseY: 0,
    id: '',
    variant: '',
    labelIconName: '',
    title: '',
    color: ''
  };

  const [menuState, setMenuState] = useState<MenuStateType>(nullityOfMenuState);

  const handleClose = () => setMenuState(nullityOfMenuState);

  const handleDeleteLabel = () => {
    handleDeleteLabelFromPakeepFunc(pakeepId, menuState.id);
    handleClose();
  };

  const wrapperOfMenuOfLabelPartProps = {
    handleClose,
    handleDeleteLabel,
    menuState,
    handleChangeGlobalLabelItem,
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

        const handleOpen = (e: MouseEvent<HTMLElement>) => {
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

export default LabelPart;
