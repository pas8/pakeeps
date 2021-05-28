import { Grid, Paper, makeStyles, Typography, Grow, Zoom, Fade } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState, React, useEffect } from 'react';
import clsx from 'clsx';
import IconsUtils from 'components/IconsUtils';
import { useMeasure, useToggle } from 'react-use';
import { themeColors } from 'components/theme';
import AttributeGroup from './components/AttributeGroup';
import { connect } from 'react-redux';
import _, { property } from 'lodash';
import SkeletonView from './components/SkeletonView';
import { getFilteredLabels } from 'store/modules/App/selectors';
import {
  changeLabelItemThunk,
  handkePakeepPropertyThunk,
  handleDeleteLabelFromPakeepThunk
} from 'store/modules/App/operations';
import { useSwipeable } from 'react-swipeable';
import { useGetReadableColor } from 'hooks/useGetReadableColor.hook';

const useStyles = makeStyles(theme => ({
  paper: ({ customColor, backgroundColor, isBackgroundColorDefault, utilsViewLikeInGoogleKeep }) => ({
    padding: theme.spacing(0.4, 1.96, utilsViewLikeInGoogleKeep ? 8 * 0.8 : 1.96, 1.96),
    cursor: 'grab',
    position: 'relative',
    background: isBackgroundColorDefault ? '#303030' : backgroundColor,
    color: !customColor ? themeColors.whiteRgbaColorWith0dot96valueOfAlfaCanal : customColor.hover,
    transition: theme.transitions.create('padding', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  }),

  isHovered: {
    paddingBottom: `${theme.spacing(8 * 0.8)}px !important`,
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    borderColor: themeColors.whiteRgbaColorWith0dot8valueOfAlfaCanal
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
  backgroundColor,
  labels,
  isDragging,
  id,
  events,
  utilsViewLikeInGoogleKeep,
  idx,
  globalLabels,
  filteredLabels,
  handleDeleteLabelFromPakeepThunk,
  changeLabelItemThunk,
  handkePakeepPropertyThunk
}) => {
  const [customColor, isBackgroundColorDefault, isColorDefault] = useGetReadableColor(backgroundColor, color);

  const classes = useStyles({ customColor, backgroundColor, isBackgroundColorDefault });

  const nullityStatusState = {
    isHovered: false,
    isLoaded: false
  };
  const [statusState, setStatusState] = useState(nullityStatusState);

  const handleSetIsHovering = () => setStatusState(state => ({ ...state, isHovered: true }));
  const handleSetIsUnHovering = () => setStatusState(state => ({ ...state, isHovered: false }));

  const setEditTitleIsTrue = () => {};
  const handleSetFavoritePakeep = () => {};
  const handleSetBookmarkPakeep = () => {};
  const handleDeleteLabel = () => {};
  const [ref, { width: widthOfContainer }] = useMeasure();

  const handleSetColorPakeep = color => handkePakeepPropertyThunk(id, { color });
  const handleSetBackgroundColorPakeep = backgroundColor => handkePakeepPropertyThunk(id, { backgroundColor });

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
    handleSetBackgroundColorPakeep,
    handleSetColorPakeep,
    isBackgroundColorDefault,
    isColorDefault,
    iconsCloser: true,
    customColor
  };

  const handlers = useSwipeable({
    onSwiped: eventData => console.log('User Swiped!', eventData)
  });

  console.log(statusState);
  // const setLabelHoverStatusIsFalse = () => setLabelHover(false);
  // const setLabelHoverStatus = () => setLabelHover({ title, isHovering: true });
  useEffect(() => setStatusState(state => ({ ...state, isLoaded: true })), []);

  if (!statusState.isLoaded) return <SkeletonView />;

  const AnimationElement = utilsViewLikeInGoogleKeep ? Fade : Grow;
  return (
    <Grid item onMouseEnter={handleSetIsHovering} onMouseLeave={handleSetIsUnHovering} ref={ref}>
      <Paper
        variant={'outlined'}
        {...handlers}
        className={clsx(classes.paper, isDragging && classes.isDragging, statusState.isHovered && classes.isHovered)}
      >
        <Grid item className={classes.title}>
          <Typography variant={'h5'}>{title}</Typography>
        </Grid>
        <Grid item>{text}</Grid>

        <AttributeGroup
          parentBackgrounColor={backgroundColor}
          customColor={customColor}
          labels={filteredLabels}
          events={events}
          pakeepId={id}
          handleDeleteLabelFromPakeepFunc={handleDeleteLabelFromPakeepThunk}
        />

        <AnimationElement in={statusState.isHovered}>
          <Grid className={classes.iconsUtils}>
            <IconsUtils {...iconsUtilsProps} />
          </Grid>
        </AnimationElement>
      </Paper>
    </Grid>
  );
};

PakeepElement.propTypes = {
  bookmark: PropTypes.bool,
  color: PropTypes.string,
  events: PropTypes.any,
  favorite: PropTypes.any,
  filteredLabels: PropTypes.any,
  globalLabels: PropTypes.any,
  handleDeleteLabelFromPakeepThunk: PropTypes.any,
  id: PropTypes.any,
  idx: PropTypes.any,
  isDragging: PropTypes.bool,
  labels: PropTypes.array,
  text: PropTypes.string,
  title: PropTypes.string,
  utilsViewLikeInGoogleKeep: PropTypes.any
};

const mapStateToProps = ({ settings: { utilsViewLikeInGoogleKeep }, app: { labels: globalLabels } }, { labels }) => ({
  utilsViewLikeInGoogleKeep,
  filteredLabels: getFilteredLabels(labels, globalLabels)
});
// const mapDispatchToProps = dispatch => ({  })
const mapDispatchToProps = dispatch => ({
  handleDeleteLabelFromPakeepThunk: (pakeepId, labelId) =>
    dispatch(handleDeleteLabelFromPakeepThunk(pakeepId, labelId)),
  handkePakeepPropertyThunk: (pakeepId, property) => dispatch(handkePakeepPropertyThunk(pakeepId, property))
});

export default connect(mapStateToProps, mapDispatchToProps)(PakeepElement);
