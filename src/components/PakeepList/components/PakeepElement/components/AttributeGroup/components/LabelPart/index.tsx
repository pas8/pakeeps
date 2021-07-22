import React, { FC, MouseEvent, memo } from 'react';
import { useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';


import { useFindIcon } from 'hooks/useFindIcon.hook';
import { toChangeDefaultLayoutMenuProps,  } from 'store/modules/App/actions';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import LabelItem from './components/LabelItem';
import { LabelPartPropsType } from './types';
import { MenusLayoutName } from 'models/unums';

const LabelPart: FC<LabelPartPropsType> = ({
  labels,
  pakeepId,
  parentBackgrounColor,
  customColor: notReversedCustomColor
}) => {
  const dispatch = useDispatch();

  const customColor = useGetReversedCustomColor(notReversedCustomColor);

  return (
    <Grid container style={{ marginLeft: 4 }}>
      {labels.map(({ title, iconName: labelIconName, id, color, variant }) => {
        const icon = useFindIcon(labelIconName);

        const labelChipProps = {
          icon,
          label: title,
          variant,
          color: color as any,
          size: 'small' as const,
          key: id
        };

        const handleOpen = (e: MouseEvent<HTMLElement>) => {
          e.preventDefault();

          dispatch(
            toChangeDefaultLayoutMenuProps({
              props: {
                mouseX: e.clientX,
                mouseY: e.clientY,
                name: MenusLayoutName.LABELS,
                customColor,
                id
              }
            })
          );
        };

        const labelItemProps = {
          currentColor: color,
          handleOpen,
          aplyMargin: true,
          labelChipProps,
          customColor: notReversedCustomColor,
          parentBackgrounColor
        };

        return <LabelItem {...labelItemProps} />;
      })}
    </Grid>
  );
};

export default memo(LabelPart);
