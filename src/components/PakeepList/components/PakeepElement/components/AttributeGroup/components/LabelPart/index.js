import React, { useState } from 'react';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { iconsArr } from 'components/Icons';
import { Grid, Chip, makeStyles, Menu, MenuItem } from '@material-ui/core';
import { nanoid } from 'nanoid';
import { colord } from 'colord';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  container: ({ color, isDark }) => ({
    cursor:'pointer',
    '& .MuiChip-root': {
      cursor:'pointer',
      background: color,
      color: isDark ? '#080808' : null,
      '& svg': {
        color:isDark ? '#080808' : null
      }
    },
    '& .MuiChip-outlined': {
      background: 'transparent',
      borderColor: color,
      color,
      '& svg': {
        color
      }
    }
  })
}));

const LabelPart = ({ labels,handleDeleteLabelFromPakeepThunk }) => {
  const [labelHover, setLabelHover] = useState(!false);

  const initialState = {
    mouseX: null,
    mouseY: null
  };
  const [state, setState] = useState(initialState);

  // console.log(labelHover);
  const setLabelHoverStatusIsFalse = () => setLabelHover(false);

  const handleDeleteLabel = () => {};

  const handleClick = event => {
    event.preventDefault();
    setState({
      mouseX: event.clientX ,
      mouseY: event.clientY 
    });
  };
  const handleClose = () => {
    setState(initialState);
  };

  return (
    <>
      {labels?.map(({ title, iconName: labelIconName, id, color, variant }) => {
        const canLabelBeDeleted = (labelHover?.isHovering && labelHover?.title === title) || !labelIconName;
        const onDeleteOfLabelItem = () => (canLabelBeDeleted ? () => handleDeleteLabel(id) : null);

        // const isLabelHaveIcon = !(labelHover?.isHovering && labelHover?.title === title);
        const icon = iconsArr.find(({ iconName }) => iconName === labelIconName)?.icon;

        const onMouseEnter = () => setLabelHover({ title, isHovering: true });

        const currentColor = color === 'primary' || color === 'secondary' ? null : color;

        const isDark = colord(color).brightness() >= 0.48;
        const classes = useStyles({ color: currentColor, isDark });

        const labelChipProps = {
          onMouseEnter,
          onMouseLeave: setLabelHoverStatusIsFalse,
          icon,
          label: title,
          // onDelete: onDeleteOfLabelItem,
          className: null,
          variant,
          color,
          size: 'small',
          // deleteIcon: <MenuIcon />
        };

        return (
          <Grid item key={nanoid()} className={classes.container} onContextMenu={handleClick} onClick={handleClick}>
            <Chip {...labelChipProps} />
          </Grid>
        );
      })}
      <Menu
        keepMounted
        open={state.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          state.mouseY !== null && state.mouseX !== null ? { top: state.mouseY, left: state.mouseX } : undefined
        }
      >
        <MenuItem onClick={handleClose}>Copy</MenuItem>
        <MenuItem onClick={handleClose}>Print</MenuItem>
        <MenuItem onClick={handleClose}>Highlight</MenuItem>
        <MenuItem onClick={handleClose}>Email</MenuItem>
      </Menu>
    </>
  );
};

export default LabelPart;
