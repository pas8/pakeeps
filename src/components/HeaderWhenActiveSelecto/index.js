import { AppBar, Grid, makeStyles, Typography } from '@material-ui/core';
import IconButtonByPas from 'components/IconButton';
import IconsUtils from 'components/IconsUtils';
import { themeColors } from 'components/theme';
import { useGetReadableColor } from 'hooks/useGetReadableColor.hook';
import PropTypes from 'prop-types';
import { useMeasure } from 'react-use';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { usePropertiesToUtils } from 'hooks/usePropertiesToUtils.hook';
const useStyles = makeStyles(theme => ({}));

const HeaderWhenActiveSelecto = ({ selectedPakeeps, cancelSelectedPakeepsId, handleSelectedPakeepsPropertyThunk }) => {
  const classes = useStyles();

  const [ref, { width: widthOfContainer }] = useMeasure();

  const [customColor] = useGetReadableColor(themeColors.primaryMain);
  // console.log(selectedPakeepsId)
  // const handleSetFavoritePakeep = () => setState(state => ({ ...state, isFavorite: !state.isFavorite }));

  const h = () => console.log('log');
  const TOOGLE = 'TOOGLE';
  const VALUE = 'VALUE';
  const pakeepPropertyies = {
    isInBookmark: { funcName: 'handleSetBookmarkPakeep', propertyValue: TOOGLE },
    isFavorite: { funcName: 'handleSetFavoritePakeep', propertyValue: TOOGLE },
    isArchived: { funcName: 'handleSetArhivedPakeep', propertyValue: TOOGLE },
    isPinned: { func: h, funcName: 'handleSetIsPinnedPakeep', propertyValue: 'isPinned' },
    color: { funcName: 'handleSetColorPakeep', propertyValue: VALUE },
    backgroundColor: { funcName: 'handleSetBackgroundColorPakeep', propertyValue: VALUE }
  };
  const propertiesArrToUtils = usePropertiesToUtils(pakeepPropertyies, selectedPakeeps, handleSelectedPakeepsPropertyThunk, {
    TOOGLE,
    VALUE
  });
  // console.log(g);
  // const handleSetBookmarkPakeep = () =>
  //   handleSelectedPakeepsPropertyThunk(selectedPakeeps, { name: 'isInBookmark', value: 'toogle' });
  // const handleSetIsPinnedPakeep = () => setState(state => ({ ...state, isPinned: !state.isPinned }));
  // const handleSetColorPakeep = color => setState(state => ({ ...state, color }));
  // const handleSetBackgroundColorPakeep = backgroundColor => setState(state => ({ ...state, backgroundColor }));
  // const handleSetIsCheckBoxesPakeep = () => setState(state => ({ ...state, isCheckBoxes: !state.isCheckBoxes }));

  const iconsUtilsProps = {
    widthOfContainer,
    id: 'f',
    labels: [],
    iconsCloser: true,
    customColor,
    // isInBookmark
    isUtilsReversed: true,
    // handleSetBookmarkPakeep,
    arrOfButtonNamesWhichSholudBeHidden: ['picture', 'edit', 'checkbox', 'width', 'share'],
    ...propertiesArrToUtils
  };

  return (
    <AppBar ref={ref}>
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
  );
};

HeaderWhenActiveSelecto.propTypes = {
  cancelSelectedPakeepsId: PropTypes.func,
  handleSelectedPakeepsPropertyThunk: PropTypes.func,
  selectedPakeepsId: PropTypes.array
};

export default HeaderWhenActiveSelecto;
