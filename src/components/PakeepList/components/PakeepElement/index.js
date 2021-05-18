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
import { useMeasure, useToggle } from 'react-use';
import { themeColors } from 'components/theme';
import AttributeGroup from './components/AttributeGroup';
import { connect } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1.96),
    paddingTop: theme.spacing(0.4),
    cursor: 'grab',
    position: 'relative'
  },
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
  title: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    marginTop: theme.spacing(1.4),
    marginBottom: theme.spacing(0.8)
  },
  isDragging: { borderColor: themeColors.primaryMain }
}));
const PakeepElement = ({
  title,
  text,
  bookmark,
  favorite,
  color,
  labels,
  isDragging,
  id,
  events,
  utilsViewLikeInGoogleKeep,
  idx,
  globalLabels
}) => {
  const classes = useStyles(color);
  const [hover, setHover] = useState(false);
  const [loaded, setLoaded] = useToggle(false);
  const [labelHover, setLabelHover] = useState(!false);
  const [currentLabels, setCurrentLabels] = useState([]);
  const setHoverIsTrue = () => setHover(true);
  const setHoverIsFalse = () => setHover(false);
  const setEditTitleIsTrue = () => {};
  const handleSetFavoritePakeep = () => {};
  const handleSetColorPakeep = () => {};
  const handleSetBookmarkPakeep = () => {};
  const handleDeleteLabel = () => {};
  const [ref, { width: widthOfContainer }] = useMeasure();

  const iconsUtilsProps = {
    isAllIconsIsShown: false,
    widthOfContainer,
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
  useEffect(() => setLoaded(true), []);

  if (!loaded)
    return (
      <>
        <Skeleton height={92} variant="text" width={`${_.random(60, 80)}%`} animation="wave" />
        <Skeleton variant="rect" height={_.random(96, 240)} width={'92%'} animation="wave" />
        <Grid container>
          <Box width={`${_.random(24, 42)}%`}>
            <Skeleton variant="text" height={42} animation="wave" />
          </Box>
          <Box width={`${_.random(32, 42)}%`} ml={1.8}>
            <Skeleton variant="text" height={42} animation="wave" />
          </Box>
        </Grid>
        <Box display={'flex'} mt={-0.8}>
          <Box width={`${_.random(16, 24)}%`}>
            <Skeleton variant="text" height={42} animation="wave" />
          </Box>
          <Box width={`${_.random(42, 60)}%`} ml={1.8}>
            <Skeleton variant="text" height={42} animation="wave" />
          </Box>
        </Box>
      </>
    );

  return (
    <Grid item onMouseEnter={setHoverIsTrue} onMouseLeave={setHoverIsFalse} ref={ref}>
      <Paper
        variant={'outlined'}
        style={{ backgroundColor: color === 'default' ? '#303030' : color }}
        className={clsx(hover ? classes.hover : classes.unHover, classes.paper, isDragging ? classes.isDragging : null)}
      >
        <Grid item className={classes.title}>
          <Typography variant={'h5'}>{title}</Typography>
        </Grid>
        <Grid item>{text}</Grid>
        <AttributeGroup labels={labels} events={events} globalLabels={globalLabels} />
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
  labels: PropTypes.array,
  text: PropTypes.string,
  title: PropTypes.string
};

const mapStateToProps = ({ settings: { utilsViewLikeInGoogleKeep }, app: { labels } }) => ({
  utilsViewLikeInGoogleKeep,
  globalLabels: labels
});

export default connect(mapStateToProps)(PakeepElement);
