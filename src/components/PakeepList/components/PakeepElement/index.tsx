import { Grid, makeStyles, Grow, Fade, Theme } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState, useEffect, createContext, FC, ContextType } from 'react';
import { addDays, addHours, isValid } from 'date-fns';
import clsx from 'clsx';
import { useSwipeable } from 'react-swipeable';
import { useMeasure } from 'react-use';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getFilteredLabels, getGlobalEventsArr } from 'store/modules/App/selectors';
import {
  handkePakeepPropertyThunk,
  handleDeleteLabelFromPakeepThunk,
  handlePinStatusPakeep,
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
import MainDialogPartOfPakeepElement from '../EditingDialogOfPakeepElement';
import { SelectedLabels } from 'components/NewPakeep';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import { IconsUtilsProps, NullityStatusState, PakeepElementProps, ReduxState, UseStylesProps } from './interface';

export const Events = createContext<null | { events: any[] }>(null);

const useStyles = makeStyles(({ spacing, transitions, palette }: Theme) => ({
    paperClass: ({ customColor, backgroundColor, color, utilsViewLikeInGoogleKeep }: UseStylesProps) => ({
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

    isHoveredClass: ({ customColor }: UseStylesProps) => ({
      paddingBottom: `${spacing(8 * 0.8)}px !important`,
      transition: transitions.create('all', {
        easing: transitions.easing.sharp,
        duration: transitions.duration.leavingScreen
      }),
      borderColor:
        customColor && useIsColorDark(customColor.unHover) ? customColor.unHover : palette?.highEmphasis?.main
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

const PakeepElement: FC<PakeepElementProps> = ({
  title,
  text,
  color,
  backgroundColor,
  labels,
  isDragging,
  id,
  utilsViewLikeInGoogleKeep,
  globalEvents,
  filteredLabels,
  timeFormat,
  timeAndDateFromat,
  handleDeleteLabelFromPakeepThunk,
  handkePakeepPropertyThunk,
  isPinIconShouldBeShownInPakeep = false,
  handlePinStatusPakeep,
  isSelecting,
  handlePakeepPropertyThunk,
  handleAddLabelToPakeepThunk
}) => {
  const events: any[] = [
    { id: '1', value: addHours(new Date(), 2) },
    { id: '2', value: addHours(new Date(), 32) },
    { id: '3', value: addHours(new Date(), 100) }
  ];

  const [, , maxEmphasisColor] = useThemeColors();

  const [customColor, isBackgroundColorDefault, isColorDefault] = useGetReadableColor(backgroundColor, color);
  const correctColor: string = !customColor ? maxEmphasisColor : customColor?.hover;

  const correctBackground: string = isBackgroundColorDefault ? '#303030' : backgroundColor;

  const classes = useStyles({
    customColor,
    backgroundColor: correctBackground,
    utilsViewLikeInGoogleKeep,
    color: correctColor
  });

  const nullityStatusState = {
    isHovered: false,
    isLoaded: false
  };
  const [statusState, setStatusState] = useState<NullityStatusState>(nullityStatusState);

  const handleSetIsHovering = (): void => {
    setStatusState(state => ({ ...state, isHovered: true }));
  };
  const handleSetIsUnHovering = (): void => {
    setStatusState(state => ({ ...state, isHovered: false }));
  };

  const setEditTitleIsTrue = (): void => {};
  const handleSetFavoritePakeep = (): void => {};
  const handleSetBookmarkPakeep = (): void => {};
  const handleDeleteLabel = (): void => {};
  const [ref, { width: widthOfContainer }] = useMeasure();

  const handleSetColorPakeep = (color: string): void => {
    handkePakeepPropertyThunk(id, { color });
  };

  const handleSetBackgroundColorPakeep = (backgroundColor: string): void => {
    handkePakeepPropertyThunk(id, { backgroundColor });
  };

  const handleSetIsPinnedPakeep = (): void => {
    handlePinStatusPakeep(id);
  };

  const iconsUtilsProps = {
    isAllIconsIsShown: false,
    setEditTitleIsTrue,
    handleSetFavoritePakeep,
    changingTitle: false,
    labels,
    id,
    handleSetBackgroundColorPakeep,
    handleSetColorPakeep,
    isBackgroundColorDefault,
    isColorDefault,
    customColor,
    handleSetIsPinnedPakeep
  };

  // const handlers = useSwipeable({
  //   onSwiped: eventData => console.log('User Swiped!', eventData)
  // });

  // const setLabelHoverStatusIsFalse = () => setLabelHover(false);
  // const setLabelHoverStatus = () => setLabelHover({ title, isHovering: true });
  useEffect(() => setStatusState(state => ({ ...state, isLoaded: true })), []);
  // console.log(isSelecting)
  if (!statusState.isLoaded) return <SkeletonView />;
  const AnimationElement = utilsViewLikeInGoogleKeep ? Fade : Grow;

  return (
    <SelectedLabels.Provider value={{ selectedLabels: labels }}>
      <Events.Provider value={{ events }}>
        <PakeepHoveringContext.Consumer>
          {({ setIsPakeepHovering, onClickOfPakeepElement, isSomePakeepsSelected }) => {
            const handleDeleteNewLabel = (labelId: string): void => {
              handleDeleteLabelFromPakeepThunk(id, labelId);
            };

            const handleAddNewLabel = (labelId: string): void => {
              handleAddLabelToPakeepThunk(id, labelId);
            };
            // const reversedColor = useGetReversedCustomColor(customColor);

            const labelsListProps = {
              handleAddNewLabel,
              handleDeleteNewLabel
            };iconsUtilsProps
            const attributeGroupProps = {
              // handleDeleteLabelFromPakeepFunc,
              parentBackgrounColor: backgroundColor,
              handleDeleteNewLabel,
              customColor,
              labels: filteredLabels,
              pakeepId: id,
              globalEvents,
              events,
              timeFormat,
              timeAndDateFromat
            };

            const onMouseEnter = (): void => {
              setIsPakeepHovering(!isSelecting);
              handleSetIsHovering();
            };

            const onMouseLeave = (): void => {
              setIsPakeepHovering(false);
              handleSetIsUnHovering();
            };
            const className: string = 'selectoItem';

            const isPinIconButtonHidden: boolean = !(
              !isSomePakeepsSelected &&
              !isSelecting &&
              statusState.isHovered &&
              isPinIconShouldBeShownInPakeep
            );

            const onClick = (): void => {
              onClickOfPakeepElement({
                id,
                customColor,
                dialogIconsUtilsProps,
                correctColor,
                correctBackground,
                title,
                text,
                dialogAttributeGroupProps
              });
            };

            const containerProps = {
              title,
              text,
              isPinIconButtonHidden,
              className: clsx(
                classes.paperClass,
                isDragging && classes.isDraggingClass,
                !isSomePakeepsSelected && statusState.isHovered && !isSelecting && classes.isHoveredClass,
                isSelecting && classes.isSelectingClass,
                isSomePakeepsSelected && classes.isSomePakeepsSelectedClass
              ),
              onClick,
              onClickOfPinIconButton: handleSetIsPinnedPakeep,
              customColor
            };

            const openIn: boolean = !isSomePakeepsSelected && statusState.isHovered && !isSelecting;

            const pakeepGridContainerProps = {
              onMouseEnter,
              onMouseLeave,
              // ref,
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

            const dialogIconsUtilsProps = { ...iconsUtilsProps };
            const dialogAttributeGroupProps = { ...attributeGroupProps };

            return (
              <Grid {...pakeepGridContainerProps}>
                <MainDefaultPartOfPakeepElement {...containerProps}>
                  <Grid>
                    <AttributeGroup {...attributeGroupProps} />
                  </Grid>

                  <AnimationElement in={openIn}>
                    <Grid className={classes.iconsUtilsClass}>
                      <IconsUtils {...allIconsUtilsProps} />
                    </Grid>
                  </AnimationElement>
                </MainDefaultPartOfPakeepElement>
              </Grid>
            );
          }}
        </PakeepHoveringContext.Consumer>
      </Events.Provider>
    </SelectedLabels.Provider>
  );
};

const mapStateToProps = (
  {
    settings: { utilsViewLikeInGoogleKeep, timeFormat, timeAndDateFromat },
    app: { labels: globalLabels, events }
  }: ReduxState,
  { labels }: { labels: [any] }
) => ({
  utilsViewLikeInGoogleKeep,
  filteredLabels: getFilteredLabels(labels, globalLabels),
  globalEvents: getGlobalEventsArr(events),
  timeFormat,
  timeAndDateFromat
});
// const mapDispatchToProps = dispatch => ({  })
const mapDispatchToProps = (dispatch?:any) => ({
  handleDeleteLabelFromPakeepThunk: (pakeepId?: string, labelId?: string) =>
    dispatch(handleDeleteLabelFromPakeepThunk(pakeepId, labelId)),
  handkePakeepPropertyThunk: (pakeepId?: string, property?: any) =>
    dispatch(handkePakeepPropertyThunk(pakeepId, property)),
  handleAddLabelToPakeepThunk: (pakeepId?: string, labelId?: string) =>
    dispatch(handleAddLabelToPakeepThunk(pakeepId, labelId)),

  handlePinStatusPakeep: (pakeepId?: string) => dispatch(handlePinStatusPakeep(pakeepId)),
  handlePakeepPropertyThunk: (pakeepId?: string, property?: any) =>
    dispatch(handlePakeepPropertyThunk(pakeepId, property))
});

export default connect(mapStateToProps, mapDispatchToProps)(PakeepElement);
