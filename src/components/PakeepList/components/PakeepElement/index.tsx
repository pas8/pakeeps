import { Grid, makeStyles, Grow, Fade, Theme } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState, useEffect, createContext, FC, ContextType, memo } from 'react';
import { addDays, addHours, isValid } from 'date-fns';
import clsx from 'clsx';
import { useSwipeable } from 'react-swipeable';
import { useMeasure } from 'react-use';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getFilteredLabels, getGlobalEventsArr, getLabels } from 'store/modules/App/selectors';
import { useGetReadableColor } from 'hooks/useGetReadableColor.hook';
import { useIsColorDark } from 'hooks/useIsColorDark.hook';
import { PakeepHoveringContext } from 'components/PakeepList';
import AttributeGroup from './components/AttributeGroup';
import SkeletonView from './components/SkeletonView';
import MainDefaultPartOfPakeepElement from './components/MainDefaultPart';
import MainDialogPartOfPakeepElement from '../EditingDialogOfPakeepElement';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import { NullityStatusState, PakeepElementPropsType, UseStylesProps } from './types';
import {
  getIsUtilsHaveViewLikeInGoogleKeep,
  getTimeAndDateFromat,
  getTimeFormat
} from 'store/modules/Settings/selectors';
import { useFilteredLabels } from 'hooks/useFilteredLabels.hook';
import {
  toAddLabelToPakeep,
  toChangePakeepProperty,
  toChangeTemporaryData,
  toDeleteLabelFromPakeep
} from 'store/modules/App/actions';
import { ColorType, EventsOfPakeepType, LabelIdType } from 'store/modules/App/types';
import { usePakeepUtilsFunc } from 'hooks/usePakeepUtilsFunc.hook';
import PakeepPropertyProvider from 'components/PakeepPropertyProviders';
import { useLabelListFunc } from 'hooks/useLabelListFunc.hook';
import dynamic from 'next/dynamic';

const IconsUtils = dynamic(() => import('components/IconsUtils'), { loading: () => <p>loading</p> });

const useStyles = makeStyles(({ spacing, transitions, palette }: Theme) => ({
  paperClass: ({ customColor, backgroundColor, color, isUtilsHaveViewLikeInGoogleKeep }: UseStylesProps) => ({
    padding: spacing(0.4, 1.96, isUtilsHaveViewLikeInGoogleKeep ? 8 * 0.8 : 1, 1.96),
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

  isHoveredClass: ({ customColor }: UseStylesProps) => ({
    paddingBottom: `${spacing(8 * 0.8)}px !important`,
    transition: transitions.create('all', {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen
    }),
    borderColor: customColor && useIsColorDark(customColor.unHover) ? customColor.unHover : palette?.highEmphasis?.main
    // borderColor: palette.primary.main
  }),

  iconsUtilsClass: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    transition: transitions.create('height', {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.complex
    })
  },
  labelClass: { marginTop: spacing(0) },
  labelsContainerClass: { marginTop: spacing(0.8) },

  // isDraggingClass: ({ customColor }: UseStylesProps) => ({
  // borderColor: !customColor && palette.primary.main,
  // boxShadow: !!customColor && `0px 0px 8px 2px ${customColor.hover} !important`
  // }),

  isSelectingClass: {},
  isSomePakeepsSelectedClass: { cursor: 'pointer !important' },
  containerClass: {
    ' & .MuiDialogContent-root': {
      overflowY: 'hidden'
    }
  }
}));

const PakeepElement: FC<PakeepElementPropsType> = ({
  title,
  text,
  color,
  backgroundColor,
  labels,
  isDragging,
  id,
  isPinIconShouldBeShownInPakeep = false,
  // handlePinStatusPakeep,
  onClickOfPakeepElement,
  isSelecting
}) => {
  const dispatch = useDispatch();
  const isUtilsHaveViewLikeInGoogleKeep = useSelector(getIsUtilsHaveViewLikeInGoogleKeep);
  const globalLabels = useSelector(getLabels);

  const filteredLabels = useFilteredLabels(labels, globalLabels);

  const events = [
    { id: '1', value: addHours(new Date(), 2) },
    { id: '2', value: addHours(new Date(), 32) },
    { id: '3', value: addHours(new Date(), 100) }
  ];

  const [, , maxEmphasisColor] = useThemeColors();

  const [customColor, isBackgroundColorDefault, isColorDefault] = useGetReadableColor(backgroundColor, color);

  const correctColor = customColor.isUseDefault ? maxEmphasisColor : customColor?.hover;

  const correctBackground = isBackgroundColorDefault ? '#303030' : backgroundColor;

  const classes = useStyles({
    customColor,
    backgroundColor: correctBackground,
    isUtilsHaveViewLikeInGoogleKeep,
    color: correctColor
  });

  const nullityStatusState = {
    isHovered: false,
    isLoaded: false
  };
  const [statusState, setStatusState] = useState<NullityStatusState>(nullityStatusState);

  // useEffect(() => {
  //   dispatch(toChangeTemporaryData({ newTemporaryData: { pakeep: { id, isHovering: statusState.isHovered } } }));
  // }, [statusState.isHovered]);

  const [ref, { width: widthOfContainer }] = useMeasure<HTMLDivElement>();

  const handleSetIsHovering = (): void => {
    setStatusState(state => ({ ...state, isHovered: true }));
  };
  const handleSetIsUnHovering = (): void => {
    setStatusState(state => ({ ...state, isHovered: false }));
  };

  const handleDeleteLabelFromPakeepFunc = (labelIdWhichShouldBeDeleted: LabelIdType): void => {
    dispatch(toDeleteLabelFromPakeep({ currentPakeepId: id, labelIdWhichShouldBeDeleted }));
  };

  const { handleSetIsPinnedPakeep, ...iconsUtilsFunc } = usePakeepUtilsFunc(id);

  const iconsUtilsProps = {
    ...iconsUtilsFunc,
    handleSetIsPinnedPakeep,
    isAllIconsIsShown: false,
    // setEditTitleIsTrue,
    changingTitle: false,
    labels,
    id,
    isBackgroundColorDefault,
    isColorDefault,
    customColor
  };

  // const handlers = useSwipeable({
  //   onSwiped: eventData => console.log('User Swiped!', eventData)
  // });

  // const setLabelHoverStatusIsFalse = () => setLabelHover(false);
  // const setLabelHoverStatus = () => setLabelHover({ title, isHovering: true });
  useEffect(() => setStatusState(state => ({ ...state, isLoaded: true })), []);
  // console.log(isSelecting)
  if (!statusState.isLoaded) return <SkeletonView />;

  const AnimationElement = isUtilsHaveViewLikeInGoogleKeep ? Fade : Grow;

  const { handleDeleteNewLabel, handleAddNewLabel } = useLabelListFunc(id);
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //.
  const isSomePakeepsSelected = false;

  // const reversedColor = useGetReversedCustomColor(customColor);
  const labelsListProps = {
    handleDeleteNewLabel,
    handleAddNewLabel
  };
  const attributeGroupProps = {
    handleDeleteLabelFromPakeepFunc,
    parentBackgrounColor: backgroundColor,
    handleDeleteNewLabel,
    customColor,
    labels: filteredLabels!,
    pakeepId: id,
    events
  };

  const onMouseEnter = (e: any): void => {
    // console.log(e);
    // setIsPakeepHovering(!isSelecting);
    handleSetIsHovering();
    // dispatch(toChangeTemporaryData({ newTemporaryData: { pakeep: { id, isHovering: true } } }));
  };

  const onMouseLeave = (): void => {
    // setIsPakeepHovering(false);

    handleSetIsUnHovering();
  };
  const className = 'selectoItem';

  const isPinIconButtonHidden = !(
    !isSomePakeepsSelected &&
    !isSelecting &&
    statusState.isHovered &&
    isPinIconShouldBeShownInPakeep
  );

  const onClick = (): void => {
    console.log(id);
    onClickOfPakeepElement(id);
  };

  const containerProps = {
    title,
    text,
    isPinIconButtonHidden,
    className: clsx(
      classes.paperClass,
      // isDragging && classes.isDraggingClass,
      !isSomePakeepsSelected && statusState.isHovered && !isSelecting && classes.isHoveredClass,
      isSelecting && classes.isSelectingClass,
      isSomePakeepsSelected && classes.isSomePakeepsSelectedClass
    ),
    onClick,
    onClickOfPinIconButton: handleSetIsPinnedPakeep,
    customColor
  };

  const openIn = !isSomePakeepsSelected && statusState.isHovered && !isSelecting;

  const pakeepGridContainerProps = {
    onMouseEnter,
    onMouseLeave,
    ref,
    className: clsx(classes.containerClass, className),
    id,
    open: true,
    maxWidth: 'md'
  };

  const allIconsUtilsProps = {
    ...iconsUtilsProps,
    events,
    widthOfContainer,
    labelsListProps
  };
  return (
    <PakeepPropertyProvider.Provider value={{ events, labels }}>
      <Grid {...pakeepGridContainerProps}>
        <MainDefaultPartOfPakeepElement {...containerProps}>
          {/* {!isDragging && (
            <Grid>
              <AttributeGroup {...attributeGroupProps} />
            </Grid>
          )}

          {openIn && !isDragging && (
            <AnimationElement in={openIn}>
              <Grid className={classes.iconsUtilsClass}>
                <IconsUtils {...allIconsUtilsProps} />
              </Grid>
            </AnimationElement>
          )} */}
        </MainDefaultPartOfPakeepElement>
      </Grid>
    </PakeepPropertyProvider.Provider>
  );
};

export default memo(PakeepElement);
