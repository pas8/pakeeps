import React, { useState, FC, MouseEvent } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { useFindIcon } from 'hooks/useFindIcon.hook';
import { toChangeGlobalLabelItem } from 'store/modules/App/actions';
import { ILabelElement } from 'store/modules/App/types';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import WrapperOfMenuOfLabelPart from './components/MenuWrapper';
import LabelItem from './components/LabelItem';
import { LabelPartPropsType, MenuStateType } from './types';

const LabelPart: FC<LabelPartPropsType> = ({
  labels,
  handleDeleteLabelFromPakeepFunc,
  pakeepId,
  parentBackgrounColor,
  customColor: notReversedCustomColor
}) => {
  const dispatch = useDispatch();

  const handleChangeGlobalLabelItem = (changedLabel: ILabelElement) => {
    dispatch(toChangeGlobalLabelItem({ changedLabel }));
  };

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
