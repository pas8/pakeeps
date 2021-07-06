import { AppBar, Grid, makeStyles, Typography, Toolbar, Zoom, Collapse, Slide } from '@material-ui/core';
import { every } from 'lodash';
import { FC } from 'react';
import { useMeasure } from 'react-use';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { useGetReadableColor } from 'hooks/useGetReadableColor.hook';
import { usePropertiesToUtils } from 'hooks/usePropertiesToUtils.hook';
import IconButtonByPas from 'components/IconButton';
import IconsUtils from 'components/IconsUtils';
import { useFindSelectedLabels } from 'hooks/useFindSelectedLabels.hook';
import { useGetIsColorDefault } from 'hooks/useGetIsColorDefault.hook';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import {
  toAddLabelToPakeep,
  toCancelSelectingStatus,
  toChangePinStatusOfPakeeps,
  toChangeSelectedPakeepsProperty,
  toDeleteLabelFromPakeep
} from 'store/modules/App/actions';
import { LabelIdType, PakeepIdType, PakeepsType } from 'store/modules/App/types';
import { VariantsOfropertiesToUtils } from 'models/unums';
import {
  HandleSelectedPakeepsPropertyFuncType,
  HeaderWhenActiveSelectoPropsType,
  PakeepPropertyiesType
} from './types';
import PakeepPropertyProvider from 'components/PakeepPropertyProviders';
import { IconsUtilsArrDenotationNameType } from 'components/IconsUtils/types';

const useStyles = makeStyles(({ spacing }) => ({
  containerClass: {
    padding: spacing(1, 0.4)
  }
}));

const { TOOGLE, VALUE } = VariantsOfropertiesToUtils;

const HeaderWhenActiveSelecto: FC<HeaderWhenActiveSelectoPropsType> = ({ selectedPakeeps, selectedPakeepsId }) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const [ref, { width: widthOfContainer }] = useMeasure();
  const [primaryColor] = useThemeColors();

  const [customColor] = useGetReadableColor(primaryColor!);

  const cancelSelectedPakeepsId = () => {
    dispatch(toCancelSelectingStatus({ isCancelSelectedPakeepsId: true }));
  };

  const handleSetIsPinnedPakeep = () => {
    const isEveryItemPropetyTrue = every(selectedPakeeps, ({ isPinned }) => !!isPinned);
    selectedPakeepsId.map((pakeepId: PakeepIdType) =>
      dispatch(toChangePinStatusOfPakeeps({ pakeepId, isPakeepPinned: isEveryItemPropetyTrue }))
    );
    cancelSelectedPakeepsId();
  };

  const isColorDefault = useGetIsColorDefault(selectedPakeeps, 'color');
  const isBackgroundColorDefault = useGetIsColorDefault(selectedPakeeps, 'backgroundColor');

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

  const labels = useFindSelectedLabels(selectedPakeeps);

  const labelsListProps = {
    isDefaultMenuListHidden: true,
    handleAddNewLabel,
    handleDeleteNewLabel
  };

  const arrOfButtonNamesWhichSholudBeHidden: IconsUtilsArrDenotationNameType[] = [
    'picture',
    'edit',
    'checkbox',
    'width',
    'share'
  ];

  const iconsUtilsProps = {
    id: 'HeaderWhenActiveSelecto',
    widthOfContainer,
    isBackgroundColorDefault,
    isColorDefault,
    labels,
    iconsCloser: true,
    customColor,
    isUtilsReversed: true,
    labelsListProps,
    arrOfButtonNamesWhichSholudBeHidden,
    ...propertiesArrToUtils
  };

  return (
    <PakeepPropertyProvider.Provider value={{ labels, events: [] }}>
      <Slide in={true} direction={'down'}>
        <AppBar ref={ref} className={classes.containerClass}>
          <Grid container>
            <Grid style={{ flex: 1 }}>
              <Grid container alignItems={'center'}>
                <IconButtonByPas icon={CloseOutlinedIcon} customColor={customColor} onClick={cancelSelectedPakeepsId} />
                <Typography variant={'subtitle2'}>{selectedPakeeps.length} selected </Typography>
              </Grid>
            </Grid>
            <Grid style={{marginRight:'8px'}}>
              <IconsUtils {...iconsUtilsProps} />
            </Grid>
          </Grid>
        </AppBar>
      </Slide>
    </PakeepPropertyProvider.Provider>
  );
};

export default HeaderWhenActiveSelecto;