import { AppBar, Grid, makeStyles, Typography, Slide } from '@material-ui/core';
import { every } from 'lodash';
import { FC } from 'react';
import dynamic from 'next/dynamic';
import { useMeasure } from 'react-use';
import { useDispatch } from 'react-redux';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

import { useGetReadableColor } from 'hooks/useGetReadableColor.hook';
import { usePropertiesToUtils } from 'hooks/usePropertiesToUtils.hook';
import IconButtonByPas from 'components/IconButton';
import PakeepPropertyProvider from 'components/PakeepPropertyProviders';
import { IconsUtilsArrDenotationNameType } from 'components/IconsUtils/types';
import { useFindSelectedLabels } from 'hooks/useFindSelectedLabels.hook';
import { useGetIsColorDefault } from 'hooks/useGetIsColorDefault.hook';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import {
  toAddLabelToPakeep,
  toCancelSelectingStatus,
  toChangePakeepProperty,
  toChangePinStatusOfPakeeps,
  toChangeSelectedPakeepsProperty,
  toDeleteLabelFromPakeep,
  toSetSelectedPakeepIdsArr
} from 'store/modules/App/actions';
import { EventsOfPakeepType, LabelIdType, PakeepIdType, PakeepsType } from 'store/modules/App/types';
import { VariantsOfropertiesToUtils } from 'models/unums';
import {
  HandleSelectedPakeepsPropertyFuncType,
  HeaderWhenActiveSelectoPropsType,
  PakeepPropertyiesType
} from './types';
import { useFindSelectedEvents } from 'hooks/useFindSelectedEvents.hook';
import { Skeleton } from '@material-ui/lab';
import CircularProgressLoader from 'components/CircularProgressLoader';
import { DEFAULT } from 'models/denotation';
import { colord, extend } from 'colord';
import mixPlugin from 'colord/plugins/mix';
import { useMix } from 'hooks/useMix.hook';
import { useBreakpointNames } from 'hooks/useBreakpointNames.hook';

const useStyles = makeStyles(({ spacing }) => ({
  containerClass: ({ background, color }: any) => ({
    padding: spacing(1, 0.4),
    background,
    color
  })
}));

const IconsUtils = dynamic(() => import('components/IconsUtils'), {
  loading: () => (
    <>
      <CircularProgressLoader style={{ width: 300, height: 30 }} />
    </>
  )
});

const { TOOGLE, VALUE } = VariantsOfropertiesToUtils;

const HeaderWhenActiveSelecto: FC<HeaderWhenActiveSelectoPropsType> = ({ selectedPakeeps, selectedPakeepsId }) => {
  const dispatch = useDispatch();
  extend([mixPlugin]);

  const isColorDefault = useGetIsColorDefault(selectedPakeeps, 'color');
  const isBackgroundColorDefault = useGetIsColorDefault(selectedPakeeps, 'backgroundColor');
  const isColorsDefault = isColorDefault && isBackgroundColorDefault;

  // const { backgroundColor } = selectedPakeeps.reduce(
  //   (sum, { color, backgroundColor }, idx) => {
  //     const newBgColor =
  //       sum.backgroundColor === DEFAULT
  //         ? DEFAULT
  //         : backgroundColor === DEFAULT
  //         ? DEFAULT
  //         : // ? sum.backgroundColor
  //           colord(sum.backgroundColor).mix(backgroundColor).toHex();
  //     console.log( backgroundColor, backgroundColor === DEFAULT, sum.backgroundColor === DEFAULT);
  //     return {
  //       // color: color === DEFAULT ? sum.color === DEFAULT ? DEFAULT : sum.color : colord(sum.color).mix(color).toHex(),
  //       backgroundColor: newBgColor
  //     };
  //   },
  //   { backgroundColor: 'red' }
  // );

  const [ref, { width: widthOfContainer }] = useMeasure();
  const [primaryColor] = useThemeColors();
  // console.log(backgroundColor);
  const [customColor] = useGetReadableColor(
    // isColorsDefault ?
    primaryColor!
    // :backgroundColor
    // isColorsDefault ? DEFAULT : color
  );

  const classes = useStyles({
    background:
      //  isBackgroundColorDefault ?

      primaryColor
    //  : customColor.bgHover,
    // color: customColor.hover
  });

  const cancelSelectedPakeepsId = () => {
    dispatch(toSetSelectedPakeepIdsArr({ selectedPakeepsId: [] }));

    dispatch(toCancelSelectingStatus({ isCancelSelectedPakeepsId: true }));
  };

  const handleSetIsPinnedPakeep = () => {
    const isEveryItemPropetyTrue = every(selectedPakeeps, ({ isPinned }) => !!isPinned);
    selectedPakeepsId.map((pakeepId: PakeepIdType) =>
      dispatch(toChangePinStatusOfPakeeps({ pakeepId, isPakeepPinned: isEveryItemPropetyTrue }))
    );
    cancelSelectedPakeepsId();
  };

  const pakeepPropertyies: PakeepPropertyiesType = {
    isInBookmark: { funcName: 'handleSetBookmarkPakeep', propertyValue: TOOGLE },
    isFavorite: { funcName: 'handleSetFavoritePakeep', propertyValue: TOOGLE },
    isArchived: { funcName: 'handleSetArhivedPakeep', propertyValue: TOOGLE, isShouldBeClosed: true },
    isPinned: { func: handleSetIsPinnedPakeep, funcName: 'handleSetIsPinnedPakeep', propertyValue: 'isPinned' },
    color: { funcName: 'handleSetColorPakeep', propertyValue: VALUE },
    backgroundColor: { funcName: 'handleSetBackgroundColorPakeep', propertyValue: VALUE }
  };

  const handleSelectedPakeepsPropertyFunc: HandleSelectedPakeepsPropertyFuncType = newPakeeps => {
    dispatch(toChangeSelectedPakeepsProperty({ newPakeeps }));
  };

  const propertiesArrToUtils = usePropertiesToUtils(
    pakeepPropertyies,
    selectedPakeeps,
    handleSelectedPakeepsPropertyFunc,
    cancelSelectedPakeepsId
  );

  const handleDeleteNewLabel = (labelIdWhichShouldBeDeleted: LabelIdType) => {
    selectedPakeepsId.map((currentPakeepId: PakeepIdType) => {
      dispatch(toDeleteLabelFromPakeep({ currentPakeepId, labelIdWhichShouldBeDeleted }));
    });
  };

  const handleAddNewLabel = (labelIdWhichShouldBeAdded: LabelIdType) => {
    selectedPakeepsId.map((currentPakeepId: PakeepIdType) => {
      dispatch(toAddLabelToPakeep({ currentPakeepId, labelIdWhichShouldBeAdded }));
    });
  };

  const id = 'HeaderWhenActiveSelecto';
  const labels = useFindSelectedLabels(selectedPakeeps);
  const events = useFindSelectedEvents(selectedPakeeps);
  // console.log(selectedPakeepsId)
  const labelsListProps = {
    labels,
    pakeepId: id,
    isDefaultMenuListHidden: true,
    handleAddNewLabel,
    handleDeleteNewLabel
  };

  const handleSaveEvents = (events: EventsOfPakeepType) => {
    selectedPakeepsId.map((pakeepId: PakeepIdType) => {
      dispatch(toChangePakeepProperty({ pakeepId, property: { events } }));
    });
  };

  const arrOfButtonNamesWhichSholudBeHidden: IconsUtilsArrDenotationNameType[] = [
    'picture',
    'edit',
    'checkbox',
    'width',
    'share'
  ];

  const { isSiveIsXs } = useBreakpointNames();
  const iconsUtilsProps = {
    id,
    isBackgroundColorDefault,
    isColorDefault,
    labels,
    events,
    iconsCloser: true,
    widthOfContainer: isSiveIsXs ? 320 : 800,
    customColor,
    isUtilsReversed: true,
    labelsListProps,
    eventsListProps: { events, handleSaveEvents },
    arrOfButtonNamesWhichSholudBeHidden,
    ...propertiesArrToUtils
  };

  return (
    <Slide in={true} direction={'down'}>
      <AppBar ref={ref} className={classes.containerClass}>
        <Grid container>
          <Grid style={{ flex: 1 }}>
            <Grid container alignItems={'center'}>
              <IconButtonByPas icon={CloseOutlinedIcon} customColor={customColor} onClick={cancelSelectedPakeepsId} />
              <Typography variant={'subtitle2'}>{selectedPakeeps.length} selected </Typography>
            </Grid>
          </Grid>
          <Grid style={{ marginRight: 12 }}>
            <IconsUtils {...iconsUtilsProps} />
          </Grid>
        </Grid>
      </AppBar>
    </Slide>
  );
};

export default HeaderWhenActiveSelecto;
