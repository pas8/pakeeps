import { Grid, Paper, makeStyles, Typography, Chip, Box, Container, Zoom, Grow } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState, React, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import IconsUtils from 'components/IconsUtils';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { iconsArr } from 'components/Icons';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { takeValueFromBreakpoints } from 'hooks/takeValueFromBreakpoints.hook';
import { useMeasure } from 'react-use';
import { themeColors } from 'components/theme';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1.96),
    paddingTop: theme.spacing(1.0 + 4 / 10),
    cursor: 'pointer',
    position: 'relative'
  },
  title: { marginBottom: theme.spacing(1) },
  hover: {
    paddingBottom: theme.spacing(8 * 0.8),
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    borderColor: 'rgba(255,255,255,0.8)'
  },
  unHover: {
    transition: theme.transitions.create('padding', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },

  iconsUtils: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.complex
    })
  },
  label: { marginTop: theme.spacing(0) },
  labelsContainer: { marginTop: theme.spacing(0.8) },
  title: { textOverflow: 'ellipsis', overflow: 'hidden' },
  isDragging: { borderColor: themeColors.primaryMain }
}));
const PakeepElement = ({ title, text, bookmark, favorite, color, labels, isDragging, id }) => {
  const classes = useStyles(color);
  const [hover, setHover] = useState(false);
  const [labelHover, setLabelHover] = useState(!false);
  const [currentLabels, setCurrentLabels] = useState([]);
  const setHoverIsTrue = () => setHover(true);
  const setHoverIsFalse = () => setHover(false);
  const setEditTitleIsTrue = () => {};
  const handleSetFavoritePakeep = () => {};
  const handleSetColorPakeep = () => {};
  const handleSetBookmarkPakeep = () => {};
  const handleDeleteLabel = () => {};
  const [ref, { x, y, width, height, top, right, bottom, left }] = useMeasure();
  const sliceArrayTo = takeValueFromBreakpoints([5, 5, 4, 4, 6, 4]);

  const iconsUtilsProps = {
    isAllIconsIsShown: false,
    sliceArrayTo,
    setEditTitleIsTrue,
    favorite,
    handleSetFavoritePakeep: handleSetFavoritePakeep,
    changingTitle: false,
    bookmark,
    labels,
    id,
    checkbox: false,
    handleSetBookmarkPakeep,
    handleSetColorPakeep: handleSetColorPakeep,
    iconsCloser: true
  };

  const setLabelHoverStatusIsFalse = () => setLabelHover(false);
  const setLabelHoverStatus = () => setLabelHover({ title, isHovering: true });

  return (
    <Grid item onMouseEnter={setHoverIsTrue} onMouseLeave={setHoverIsFalse} ref={ref}>
      <Paper
        variant={'outlined'}
        style={{ backgroundColor: color === 'default' ? '#303030' : color }}
        className={clsx(hover ? classes.hover : classes.unHover, classes.paper, isDragging ? classes.isDragging : null)}
        elevation={3}
      >
        <Grid item className={classes.title}>
          <Typography variant={'h5'} className={classes.title}>
            {title}
          </Typography>
        </Grid>
        <Grid item>{text}</Grid>
        <Grid display={'flex'} spacing={1} container className={classes.labelsContainer}>
          
          {labels?.map(({ title, icon: labelIcon, key, color }) => {
            const onDeleteOfLabelItem = () =>
              (labelHover?.isHovering && labelHover?.title === title) || !labelIcon
                ? () => handleDeleteLabel(key)
                : null;

            const labelChipProps = {
              onMouseEnter: setLabelHoverStatus,
              onMouseLeave: setLabelHoverStatusIsFalse,
              icon: !(labelHover?.isHovering && labelHover?.title === title)
                ? iconsArr.find(({ iconName }) => iconName === labelIcon)?.icon
                : null,
              label: title,
              onDelete: onDeleteOfLabelItem,
              className: classes.chip,
              variant: 'outlined',
              color,
              size: 'small',
              deleteIcon: <DeleteForeverOutlinedIcon />
            };

            return (
              <Grid className={classes.label} item>
                <Chip {...labelChipProps} />
              </Grid>
            );
          })}
        </Grid>
        <Grow in={hover}>
          <Grid className={classes.iconsUtils}>
            <IconsUtils {...iconsUtilsProps} />
          </Grid>
        </Grow>
      </Paper>
    </Grid>
  );
};

PakeepElement.propTypes = {
  bookmark: PropTypes.any,
  color: PropTypes.string,
  favorite: PropTypes.any,
  isDragging: PropTypes.bool,
  labels: PropTypes.shape({
    map: PropTypes.func
  }),
  text: PropTypes.string,
  title: PropTypes.string
};

export default PakeepElement;
