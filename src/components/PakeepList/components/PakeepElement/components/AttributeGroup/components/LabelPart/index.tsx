import React, {  FC, MouseEvent, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useFindIcon } from 'hooks/useFindIcon.hook';
import { toChangeTemporaryData } from 'store/modules/App/actions';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import LabelItem from './components/LabelItem';
import { LabelPartPropsType } from './types';
import { Grid } from '@material-ui/core';
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
          className: null,
          variant,
          color,
          size: 'small',
          key: id
        };

        const handleOpen = (e: MouseEvent<HTMLElement>) => {
          e.preventDefault();

          dispatch(
            toChangeTemporaryData({
              newTemporaryData: {
                defaultMenuProps: {
                  mouseX: e.clientX,
                  mouseY: e.clientY,
                  customColor,
                  id,
                  menuName: MenusLayoutName.LABELS
                }
              }
            })
          );
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
    </Grid>
  );
};

export default memo(LabelPart);
