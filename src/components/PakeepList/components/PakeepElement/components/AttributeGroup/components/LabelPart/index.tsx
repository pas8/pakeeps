import React, { useState, FC, MouseEvent, memo } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { useFindIcon } from 'hooks/useFindIcon.hook';
import { toChangeTemporaryData } from 'store/modules/App/actions';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import LabelItem from './components/LabelItem';
import { LabelPartPropsType } from './types';

const LabelPart: FC<LabelPartPropsType> = ({
  labels,
  handleDeleteLabelFromPakeepFunc,
  pakeepId,
  parentBackgrounColor,
  customColor: notReversedCustomColor
}) => {
  const dispatch = useDispatch();

  const customColor = useGetReversedCustomColor(notReversedCustomColor);

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
          key: id
        };

        const handleOpen = (e: MouseEvent<HTMLElement>) => {
          e.preventDefault();
          const newTemporaryData = {
            labelItem: { id },
            defaultMenuProps: { mouseX: e.clientX, mouseY: e.clientY, customColor }
          };

          dispatch(toChangeTemporaryData({ newTemporaryData }));
        };

        const labelItemProps = {
          currentColor: color,
          handleOpen,
          labelChipProps,
          customColor: notReversedCustomColor,
          parentBackgrounColor
        };

        //@ts-ignore
        return <LabelItem {...labelItemProps} />;
      })}
    </>
  );
};

export default memo(LabelPart);
