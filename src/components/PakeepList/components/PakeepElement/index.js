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

const useStyles = makeStyles(theme => ({
  paper: { padding: theme.spacing(1.96), paddingTop: theme.spacing(1.4), cursor: 'pointer', position: 'relative' },
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
  title: { textOverflow: 'ellipsis', overflow: 'hidden' }
}));

const PakeepElement = ({ title, text, bookmark, favorite, color, labels }) => {
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

  return (
    <Grid item onMouseEnter={setHoverIsTrue} onMouseLeave={setHoverIsFalse} ref={ref}  >
      <Paper
        variant={'outlined'}
        style={{ backgroundColor: color === 'default' ? '#303030' : color}}
        className={clsx(hover ? classes.hover : classes.unHover, classes.paper)}
        elevation={3}
      >
        <Grid item className={classes.title}>
          <Typography variant={'h5'} className={classes.title}>
            {title}
          </Typography>
        </Grid>
        <Grid item>{text}</Grid>
        <Grid display={'flex'} spacing={1} container className={classes.labelsContainer}>
          {labels &&
            labels.map(({ title, icon: labelIcon, key, color }) => (
              <Grid className={classes.label} item>
                <Chip
                  onMouseEnter={() => setLabelHover({ title, isHovering: true })}
                  onMouseLeave={() => setLabelHover(false)}
                  icon={
                    !(labelHover?.isHovering && labelHover?.title === title)
                      ? iconsArr.find(({ iconName }) => iconName === labelIcon)?.icon
                      : null
                  }
                  label={title}
                  onDelete={
                    (labelHover?.isHovering && labelHover?.title === title) || !labelIcon
                      ? () => handleDeleteLabel(key)
                      : null
                  }
                  className={classes.chip}
                  variant={'outlined'}
                  color={color}
                  size={'small'}
                  deleteIcon={<DeleteForeverOutlinedIcon />}
                />
              </Grid>
            ))}
        </Grid>
        <Grow in={hover}>
          <Grid className={classes.iconsUtils}>
            <IconsUtils
              isAllIconsIsShown={false}
              sliceArrayTo={sliceArrayTo}
              setEditTitleIsTrue={setEditTitleIsTrue}
              favorite={favorite}
              handleSetFavoritePakeep={handleSetFavoritePakeep}
              changingTitle={false}
              bookmark={bookmark}
              labels={labels}
              checkbox={false}
              handleSetBookmarkPakeep={handleSetBookmarkPakeep}
              handleSetColorPakeep={handleSetColorPakeep}
              iconsCloser
            />
          </Grid>
        </Grow>
      </Paper>
    </Grid>
  );
};

PakeepElement.propTypes = {
  bookmark: PropTypes.any,
  color: PropTypes.any,
  favorite: PropTypes.any,
  labels: PropTypes.any,
  text: PropTypes.any,
  title: PropTypes.any
};

export default PakeepElement;
