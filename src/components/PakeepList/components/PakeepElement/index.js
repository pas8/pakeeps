import { Grid, makeStyles, Grow, Fade, Dialog, DialogActions, DialogContent, Modal } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState, React, useEffect } from 'react';
import { addDays, addHours, isValid } from 'date-fns';
import clsx from 'clsx';
import { useSwipeable } from 'react-swipeable';
import { useMeasure } from 'react-use';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getFilteredLabels } from 'store/modules/App/selectors';
import {
  handkePakeepPropertyThunk,
  handleDeleteLabelFromPakeepThunk,
  handlePinStatusPakeepThunk,
  handlePakeepPropertyThunk,
  handleAddLabelToPakeepThunk
} from 'store/modules/App/operations';
import { useGetReadableColor } from 'hooks/useGetReadableColor.hook';
import IconsUtils from 'components/IconsUtils';
import { useIsColorDark } from 'hooks/useIsColorDark.hook';
import { PakeepHoveringContext } from 'components/PakeepList';
import AttributeGroup from './components/AttributeGroup';
import SkeletonView from './components/SkeletonView';
import MainDefaultPartOfPakeepElement from './components/MainDefaultPart';
import MainDialogPartOfPakeepElement from './MainDialogPart';
import SaveButtonWithIcon from 'components/SaveButtonWithIcon';
import { SelectedLabels } from 'components/NewPakeep';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import { useThemeColors } from 'hooks/useThemeColors.hook';

const useStyles = makeStyles(({ spacing, transitions, palette }) => ({
  paper: ({ customColor, backgroundColor, color, utilsViewLikeInGoogleKeep }) => ({
    padding: spacing(0.4, 1.96, utilsViewLikeInGoogleKeep ? 8 * 0.8 : 1, 1.96),
    cursor: 'grab',
    position: 'relative',
    backgroundColor,
    color,
    transition: transitions.create('padding', {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen
    }),
    userSelect: 'none'
  }),

  isHovered: ({ customColor }) => ({
    paddingBottom: `${spacing(8 * 0.8)}px !important`,
    transition: transitions.create('all', {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen
    }),
    borderColor: customColor && useIsColorDark(customColor.unHover) ? customColor.unHover : palette?.highEmphasis?.main
  }),

  iconsUtils: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    transition: transitions.create('height', {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.complex
    })
  },
  label: { marginTop: spacing(0) },
  labelsContainer: { marginTop: spacing(0.8) },

  isDragging: ({ customColor }) => ({
    borderColor: !customColor && palette.primary.main,
    boxShadow: !!customColor && `0px 0px 8px 2px ${customColor.hover} !important`
  }),

  isSelecting: {},
  isSomePakeepsSelected: { cursor: 'pointer !important' },
  dialogIconsUtils: { margin: spacing(-1.4, 0.4, 0), paddingBottom: spacing(0.4) },
  container: {
    ' & .MuiDialogContent-root': {
      overflowY: 'hidden'
    }
  }
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
  utilsViewLikeInGoogleKeep,
  idx,
  globalLabels,
  filteredLabels,
  handleDeleteLabelFromPakeepThunk,
  changeLabelItemThunk,
  handkePakeepPropertyThunk,
  isPinIconShouldBeShownInPakeep,
  handlePinStatusPakeepThunk,
  isSelecting,
  handlePakeepPropertyThunk,
  handleAddLabelToPakeepThunk
}) => {
  const [, , maxEmphasisColor] = useThemeColors();

  const [customColor, isBackgroundColorDefault, isColorDefault] = useGetReadableColor(backgroundColor, color);
  const correctColor = !customColor ? maxEmphasisColor : customColor?.hover;

  const correctBackground = isBackgroundColorDefault ? '#303030' : backgroundColor;
  const classes = useStyles({
    customColor,
    backgroundColor: correctBackground,
    isPinIconShouldBeShownInPakeep,
    color: correctColor
  });

  const nullityStatusState = {
    isHovered: false,
    isLoaded: false
  };
  const [statusState, setStatusState] = useState(nullityStatusState);

  const [state, setState] = useState({ title, text });
  const onChange = ({ target: { name, value } }) => setState(state => ({ ...state, [name]: value }));

  const handleSetIsHovering = () => setStatusState(state => ({ ...state, isHovered: true }));
  const handleSetIsUnHovering = () => setStatusState(state => ({ ...state, isHovered: false }));

  const setEditTitleIsTrue = () => {};
  const handleSetFavoritePakeep = () => {};
  const handleSetBookmarkPakeep = () => {};
  const handleDeleteLabel = () => {};
  const [ref, { width }] = useMeasure();

  const handleSetColorPakeep = color => handkePakeepPropertyThunk(id, { color });
  const handleSetBackgroundColorPakeep = backgroundColor => handkePakeepPropertyThunk(id, { backgroundColor });

  const handleSetIsPinnedPakeep = () => handlePinStatusPakeepThunk(id);

  const iconsUtilsProps = {
    isAllIconsIsShown: false,
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
    // iconsCloser: true,
    customColor,
    handleSetIsPinnedPakeep
  };

  const handlers = useSwipeable({
    onSwiped: eventData => console.log('User Swiped!', eventData)
  });

  // const setLabelHoverStatusIsFalse = () => setLabelHover(false);
  // const setLabelHoverStatus = () => setLabelHover({ title, isHovering: true });
  useEffect(() => setStatusState(state => ({ ...state, isLoaded: true })), []);
  // console.log(isSelecting)
  if (!statusState.isLoaded) return <SkeletonView />;
  const AnimationElement = utilsViewLikeInGoogleKeep ? Fade : Grow;

  return (
    <SelectedLabels.Provider value={{ selectedLabels: labels }}>
      <PakeepHoveringContext.Consumer>
        {({
          setIsPakeepHovering,
          onClickOfPakeepElement,
          isSomePakeepsSelected,
          pakeepIdOfDialog,
          handleClosePakeepDialog
        }) => {
          const events = [
            { id: '1', value: addHours(new Date(), 2) },
            { id: '2', value: addHours(new Date(), 27) }
          ];

          const handleDeleteNewLabel = labelId => {
            handleDeleteLabelFromPakeepThunk(id, labelId);
          };

          const handleAddNewLabel = labelId => {
            handleAddLabelToPakeepThunk(id, labelId);
          };
          // const reversedColor = useGetReversedCustomColor(customColor);

          const labelsListProps = {
            handleAddNewLabel,
            handleDeleteNewLabel
          };
          const attributeGroupProps = {
            handleDeleteLabelFromPakeepFunc: handleDeleteLabelFromPakeepThunk,
            parentBackgrounColor: backgroundColor,
            handleDeleteNewLabel,
            customColor,
            labels: filteredLabels,
            events,
            pakeepId: id
          };

          const onMouseEnter = () => {
            setIsPakeepHovering(!isSelecting);
            handleSetIsHovering();
          };

          const onMouseLeave = () => {
            setIsPakeepHovering(false);
            handleSetIsUnHovering();
          };
          const className = 'selectoItem';
          const onClick = () => {
            onClickOfPakeepElement(id);
          };

          const onClose = () => {
            handleClosePakeepDialog();
            handleSetIsUnHovering();
          };

          const pakeepGridContainerProps = {
            onMouseEnter,
            onMouseLeave,
            ref,
            className: clsx(classes.container, className),
            id,
            open: true,
            onClose,
            maxWidth: 'md'
          };

          const isDialogOpen = pakeepIdOfDialog === id;
          const isPinIconButtonHidden = !(
            !isSomePakeepsSelected &&
            !isSelecting &&
            statusState.isHovered &&
            isPinIconShouldBeShownInPakeep
          );

          const PakeepContainer = isDialogOpen ? Dialog : Grid;
          const Container = isDialogOpen ? MainDialogPartOfPakeepElement : MainDefaultPartOfPakeepElement;
          const UtilsContainer = isDialogOpen ? DialogActions : Grid;
          const AttributeGroupContainer = isDialogOpen ? DialogContent : Grid;
          const mainDefaultPartOfPakeepElement = {
            isPinIconButtonHidden,
            className: clsx(
              classes.paper,
              isDragging && classes.isDragging,
              !isSomePakeepsSelected && statusState.isHovered && !isSelecting && classes.isHovered,
              isSelecting && classes.isSelecting,
              isSomePakeepsSelected && classes.isSomePakeepsSelected
            ),
            onClick,
            onClickOfPinIconButton: handleSetIsPinnedPakeep
          };

          const mainDialogPartOfPakeepElement = {
            backgroundColor: correctBackground,
            color: correctColor
          };

          const defaultContainerProps = {
            ...state,
            onChange,
            customColor
          };
          const containerProps = isDialogOpen ? mainDialogPartOfPakeepElement : mainDefaultPartOfPakeepElement;
          const allContainerProps = { ...defaultContainerProps, ...containerProps };

          const openIn = isDialogOpen || (!isSomePakeepsSelected && statusState.isHovered && !isSelecting);

          const arrOfButtonNamesWhichSholudBeHidden = isDialogOpen ? ['width'] : [];

          const JUST_PADDING_VALUE = 160;
          const widthOfContainer = isDialogOpen ? width - JUST_PADDING_VALUE : width;

          const allIconsUtilsProps = {
            ...iconsUtilsProps,
            events,
            arrOfButtonNamesWhichSholudBeHidden,
            widthOfContainer,
            labelsListProps
          };

          const handleSubmit = () => console.log(state);

          return (
            <PakeepContainer {...pakeepGridContainerProps}>
              <Container {...allContainerProps}>
                <AttributeGroupContainer>
                  <AttributeGroup {...attributeGroupProps} />
                </AttributeGroupContainer>

                <AnimationElement in={openIn}>
                  <UtilsContainer className={isDialogOpen ? classes.dialogIconsUtils : classes.iconsUtils}>
                    <IconsUtils {...allIconsUtilsProps} />

                    {isDialogOpen && <SaveButtonWithIcon onSave={handleSubmit} customColor={customColor} />}
                  </UtilsContainer>
                </AnimationElement>
              </Container>
            </PakeepContainer>
          );
        }}
      </PakeepHoveringContext.Consumer>
    </SelectedLabels.Provider>
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
  handkePakeepPropertyThunk: (pakeepId, property) => dispatch(handkePakeepPropertyThunk(pakeepId, property)),
  handleAddLabelToPakeepThunk: (pakeepId, labelId) => dispatch(handleAddLabelToPakeepThunk(pakeepId, labelId)),

  handlePinStatusPakeepThunk: pakeepId => dispatch(handlePinStatusPakeepThunk(pakeepId)),
  handlePakeepPropertyThunk: (pakeepId, property) => dispatch(handlePakeepPropertyThunk(pakeepId, property))
});

export default connect(mapStateToProps, mapDispatchToProps)(PakeepElement);
