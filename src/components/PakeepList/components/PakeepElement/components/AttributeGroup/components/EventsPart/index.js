import React, { useState } from 'react';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { iconsArr } from 'components/Icons';
import { Grid, Chip, makeStyles } from '@material-ui/core';

const EventsPart = ({ events:labels }) => {
  const [labelHover, setLabelHover] = useState(!false);

  const setLabelHoverStatusIsFalse = () => setLabelHover(false);
  const setLabelHoverStatus = () => setLabelHover({ title, isHovering: true });

  const handleDeleteLabel = () => {};

  return (
    <>
      {labels?.map(({ title, icon: labelIcon, key, color }) => {
        const canLabelBeDeleted = (labelHover?.isHovering && labelHover?.title === title) || !labelIcon;
        const onDeleteOfLabelItem = () => (canLabelBeDeleted ? () => handleDeleteLabel(key) : null);

        const isLabelHaveIcon = !(labelHover?.isHovering && labelHover?.title === title);
        const icon = isLabelHaveIcon ? iconsArr.find(({ iconName }) => iconName === labelIcon)?.icon : null;

        const labelChipProps = {
          onMouseEnter: setLabelHoverStatus,
          onMouseLeave: setLabelHoverStatusIsFalse,
          icon,
          label: title,
          onDelete: onDeleteOfLabelItem,
          className: null,
          variant: 'outlined',
          color,
          size: 'small',
          deleteIcon: <DeleteForeverOutlinedIcon />
        };

        return (
          <Grid item>
            <Chip {...labelChipProps} />
          </Grid>
        );
      })}
    </>
  );
};

export default EventsPart;
