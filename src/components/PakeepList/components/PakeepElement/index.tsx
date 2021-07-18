import { Grid, makeStyles, Grow, Fade, Theme, useTheme } from '@material-ui/core';
import { useState, useEffect, FC, memo, MouseEventHandler } from 'react';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import { useMeasure } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';

import { getIsUtilsHaveViewLikeInGoogleKeep } from 'store/modules/Settings/selectors';
import { getLabels } from 'store/modules/App/selectors';
import { useGetReadableColor } from 'hooks/useGetReadableColor.hook';
import { useFilteredLabels } from 'hooks/useFilteredLabels.hook';
import { toChangePakeepProperty, toChangeTemporaryData, toDeleteLabelFromPakeep } from 'store/modules/App/actions';
import { LabelIdType } from 'store/modules/App/types';
import { usePakeepUtilsFunc } from 'hooks/usePakeepUtilsFunc.hook';
import { useLabelListFunc } from 'hooks/useLabelListFunc.hook';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import { useAlpha } from 'hooks/useAlpha.hook';
import { HandleSaveEventsType } from 'components/IconsUtils/components/AddDateToPakeep/types';
import { useIsColorLight } from 'hooks/useIsColorLight.hook';

import AttributeGroup from './components/AttributeGroup';
import SkeletonView from './components/SkeletonView';
import MainDefaultPartOfPakeepElement from './components/MainDefaultPart';
import { NullityStatusState, PakeepElementPropsType, UseStylesProps } from './types';

const IconsUtils = dynamic(() => import('components/IconsUtils'), { loading: () => <p>loading</p> });

const useStyles = makeStyles(({ spacing, transitions, palette }: Theme) => ({
  paperClass: ({ customColor, backgroundColor, color, isUtilsHaveViewLikeInGoogleKeep }: UseStylesProps) => {
    const isTypeLight = palette.type === 'light';

    const borderColor = isTypeLight ? color : useIsColorLight(backgroundColor) ? backgroundColor : color;

    const insetborderColor = useIsColorLight(backgroundColor) ? palette.background.default : backgroundColor;
    return {
      marginTop: 4,
      padding: spacing(0.4, 1.4, isUtilsHaveViewLikeInGoogleKeep ? 8 * 0.8 : 1, 1.4),
      cursor: 'grab',
      position: 'relative',
      backgroundColor,
      border: `1px solid ${useAlpha(borderColor!, isTypeLight ? 0.8 : 0.2)}`,
      color,
      transition: transitions.create('padding', {
        easing: transitions.easing.sharp,
        duration: transitions.duration.leavingScreen
      }),
      userSelect: 'none',
      '&:hover': {
        paddingBottom: `${spacing(8 * 0.8)}px !important`,
        transition: transitions.create('all', {
          easing: transitions.easing.sharp,
          duration: transitions.duration.leavingScreen
        }),
        borderColor: '',
        boxShadow: `0px 0px  1px 1px ${borderColor} ,inset 0px 0px 1px 2px ${insetborderColor} `
        // borderStyle:  'dashed'
      }
    };
  },

  isHoveredClass: ({ customColor, backgroundColor, color }: UseStylesProps) => {
    return {
      // paddingBottom: `${spacing(8 * 0.8)}px !important`,
      // transition: transitions.create('all', {
      //   easing: transitions.easing.sharp,
      //   duration: transitions.duration.leavingScreen
      // }),
      // borderColor,
      // // borderColor: palette.primary.main
      // boxShadow: `0px 0px  1px 1px ${borderColor} ,inset 0px 0px 1px 2px  #303030`,
      // borderRadius: 8
      // borderStyle:  'dashed'
    };
  },

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
  checkBoxes,
  isPinIconShouldBeShownInPakeep = false,
  events,
  onClickOfPakeepElement,
  isSelecting,
  handleSetPakeepElementHeigthArr,
  handleResetItemSize,

  pakeepElementHeigth,
  ...propertyies
}) => {
  const dispatch = useDispatch();
  const isUtilsHaveViewLikeInGoogleKeep = useSelector(getIsUtilsHaveViewLikeInGoogleKeep);
  const globalLabels = useSelector(getLabels);
  const filteredLabels = useFilteredLabels(labels, globalLabels);

  const {
    palette: { background, text: textColor }
  } = useTheme();

  const [customColor, isBackgroundColorDefault, isColorDefault] = useGetReadableColor(backgroundColor, color);
  const correctColor = customColor.isUseDefault ? textColor.primary : customColor?.hover;

  const correctBackground = isBackgroundColorDefault ? background.default : backgroundColor;

  const classes = useStyles({
    // isDragging,
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

  const [ref, { width: widthOfContainer, height, x, y }] = useMeasure<HTMLDivElement>();

  useEffect(() => {
    if (pakeepElementHeigth !== height && !!height) {
      handleSetPakeepElementHeigthArr({ id, height });
    }
  }, [height]);

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

  useEffect(() => {
    !!pakeepElementHeigth && handleResetItemSize();
  }, [pakeepElementHeigth]);

  useEffect(() => setStatusState(state => ({ ...state, isLoaded: true })), []);
  if (!statusState.isLoaded) return <SkeletonView />;

  const AnimationElement = isUtilsHaveViewLikeInGoogleKeep ? Fade : Grow;
  const { handleDeleteNewLabel, handleAddNewLabel } = useLabelListFunc(id);

  const isSomePakeepsSelected = false;

  const labelsListProps = {
    labels,
    pakeepId: id,
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

  const onMouseEnter: MouseEventHandler<HTMLDivElement> = e => {
    !isSelecting && dispatch(toChangeTemporaryData({ newTemporaryData: { pakeep: { id, isHovering: true } } }));
    handleSetIsHovering();
  };

  const onMouseLeave = (): void => {
    dispatch(toChangeTemporaryData({ newTemporaryData: { pakeep: { id, isHovering: false } } }));

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
    onClickOfPakeepElement(id);
  };

  const containerProps = {
    title,
    isCheckBoxes: propertyies.isCheckBoxes,
    checkBoxes,
    text,
    isPinIconButtonHidden,
    className: clsx(
      classes.paperClass,
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
  const handleSaveEvents: HandleSaveEventsType = events => {
    dispatch(toChangePakeepProperty({ pakeepId: id, property: { events } }));
  };

  const eventsListProps = {
    events,
    handleSaveEvents
  };

  const iconsUtilsProps = {
    ...iconsUtilsFunc,
    ...propertyies,
    eventsListProps,
    labelsListProps,
    handleSetIsPinnedPakeep,
    isAllIconsIsShown: false,
    changingTitle: false,
    labels,
    id,
    isBackgroundColorDefault,
    isColorDefault,
    customColor,
    events,
    widthOfContainer
  };

  return (
    <Grid {...pakeepGridContainerProps}>
      <MainDefaultPartOfPakeepElement {...containerProps}>
        <Grid>
          <AttributeGroup {...attributeGroupProps} />
        </Grid>

        {openIn && !isDragging && (
          <AnimationElement in={openIn}>
            <Grid className={classes.iconsUtilsClass}>
              <IconsUtils {...iconsUtilsProps} />
            </Grid>
          </AnimationElement>
        )}
      </MainDefaultPartOfPakeepElement>
    </Grid>
  );
};

export default memo(PakeepElement);
