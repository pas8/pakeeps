import { AppBar, Grid, makeStyles, Typography, Toolbar, Zoom, Collapse, Slide } from '@material-ui/core';
import { every } from 'lodash';
import { useMeasure } from 'react-use';
import PropTypes from 'prop-types';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { useGetReadableColor } from 'hooks/useGetReadableColor.hook';
import { usePropertiesToUtils } from 'hooks/usePropertiesToUtils.hook';
import IconButtonByPas from 'components/IconButton';
import IconsUtils from 'components/IconsUtils';
import { themeColors } from 'components/theme';
import { LocaleContext } from 'components/NewPakeep';
import { useFindSelectedLabels } from 'hooks/useFindSelectedLabels.hook';
import { useGetIsColorDefault } from 'hooks/useGetIsColorDefault.hook';

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    padding: spacing(1, 0.4)
  }
}));

const HeaderWhenActiveSelecto = ({
  selectedPakeeps,
  cancelSelectedPakeepsId,
  handleSelectedPakeepsPropertyThunk,
  handlePinStatusPakeepThunk,
  selectedPakeepsId,
  handleDeleteLabelFromPakeepThunk,
  handleAddLabelToPakeepThunk
}) => {
  const classes = useStyles();

  const [ref, { width: widthOfContainer }] = useMeasure();

  const [customColor] = useGetReadableColor(themeColors.primaryMain);
  // console.log(selectedPakeepsId)
  // const handleSetFavoritePakeep = () => setState(state => ({ ...state, isFavorite: !state.isFavorite }));

  const handleSetIsPinnedPakeep = () => {
    const isEveryItemPropetyTrue = every(selectedPakeeps, ({ isPinned }) => !!isPinned);
    selectedPakeepsId.map(el => handlePinStatusPakeepThunk(el, isEveryItemPropetyTrue));
    cancelSelectedPakeepsId();
  };

  const TOOGLE = 'TOOGLE';
  const VALUE = 'VALUE';

  const isColorDefault = useGetIsColorDefault(selectedPakeeps, 'color');
  const isBackgroundColorDefault = useGetIsColorDefault(selectedPakeeps, 'backgroundColor');

  const pakeepPropertyies = {
    isInBookmark: { funcName: 'handleSetBookmarkPakeep', propertyValue: TOOGLE },
    isFavorite: { funcName: 'handleSetFavoritePakeep', propertyValue: TOOGLE },
    isArchived: { funcName: 'handleSetArhivedPakeep', propertyValue: TOOGLE, isShouldBeClosed: true },
    isPinned: { func: handleSetIsPinnedPakeep, funcName: 'handleSetIsPinnedPakeep', propertyValue: 'isPinned' },
    color: { funcName: 'handleSetColorPakeep', propertyValue: VALUE },
    backgroundColor: { funcName: 'handleSetBackgroundColorPakeep', propertyValue: VALUE }
  };
  const propertiesArrToUtils = usePropertiesToUtils(
    pakeepPropertyies,
    selectedPakeeps,
    handleSelectedPakeepsPropertyThunk,
    cancelSelectedPakeepsId,
    { TOOGLE, VALUE }
  );
  const handleDeleteNewLabel = labelId => {
    selectedPakeepsId.map(id => handleDeleteLabelFromPakeepThunk(id, labelId));
  };
  const handleAddNewLabel = labelId => {
    selectedPakeepsId.map(id => handleAddLabelToPakeepThunk(id, labelId));
  };

  const selectedLabels = useFindSelectedLabels(selectedPakeeps);

  const labelsListProps = {
    isDefaultMenuListHidden: true,
    handleAddNewLabel,
    handleDeleteNewLabel
  };

  const arrOfButtonNamesWhichSholudBeHidden = ['picture', 'edit', 'checkbox', 'width', 'share'];

  const iconsUtilsProps = {
    widthOfContainer,
    isBackgroundColorDefault,
    isColorDefault,
    labels: selectedLabels,
    iconsCloser: true,
    customColor,
    isUtilsReversed: true,
    labelsListProps,
    arrOfButtonNamesWhichSholudBeHidden,
    ...propertiesArrToUtils
  };

  return (
    <LocaleContext.Provider value={{ selectedLabels }}>
      <Slide in={true} direction={'bottom'}>
        <AppBar ref={ref} className={classes.container}>
          <Grid container>
            <Grid style={{ flex: 1 }}>
              <Grid container alignItems={'center'}>
                <IconButtonByPas icon={CloseOutlinedIcon} customColor={customColor} onClick={cancelSelectedPakeepsId} />
                <Typography variant={'subtitle2'}>{selectedPakeeps.length} selected </Typography>
              </Grid>
            </Grid>
            <Grid className={classes.utilsContainer}>
              <IconsUtils {...iconsUtilsProps} />
            </Grid>
          </Grid>
        </AppBar>
      </Slide>
    </LocaleContext.Provider>
  );
};

HeaderWhenActiveSelecto.propTypes = {
  cancelSelectedPakeepsId: PropTypes.func,
  handleAddLabelToPakeepThunk: PropTypes.func,
  handleDeleteLabelFromPakeepThunk: PropTypes.func,
  handlePinStatusPakeepThunk: PropTypes.func,
  handleSelectedPakeepsPropertyThunk: PropTypes.func,
  selectedPakeeps: PropTypes.array,
  selectedPakeepsId: PropTypes.array
};

export default HeaderWhenActiveSelecto;
