import { Grid, IconButton, makeStyles } from '@material-ui/core';
import Folders from 'components/Folders';
import { useFolders } from 'hooks/useFolders.hook';
import PropTypes from 'prop-types';
import { useCallback, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  handleFoldersThunk,
  handleCurrentFolderPropertyIdxThunk,
  handleDrawerWidthThunk
} from 'store/modules/App/operations';
import {
  getFolderPropertyies,
  getCurrentFolderPropertyIdx,
  getFolders,
  getMenuOpenStatus,
  getDrawerWidth,
  getLabels
} from 'store/modules/App/selectors';
import {
  getIsFolderViewWithPakeepViewAlignToCenter,
  getNavigationViewLike,
  getPositionOfFolderViewWithPakeepView
} from 'store/modules/Settings/selectors';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import { themeColors } from 'components/theme';

const useStyles = makeStyles(theme => ({
  container: ({ positionOfFolderViewWithPakeepViewIsBottom, positionOfFolderViewWithPakeepViewIsRight }) => ({
    // justifyContent: positionOfFolderViewWithPakeepViewIsBottom && 'center',
    '& nav': positionOfFolderViewWithPakeepViewIsBottom
      ? {
          zIndex: 92 * 92,
          position: 'fixed',
          bottom: 0,
        }
      : {
          position: 'fixed',
          bottom: 0,
          top: 0,
          [positionOfFolderViewWithPakeepViewIsRight ? 'right' : 'left']: 0
        }
  }),
  arrowButton: ({ positionOfFolderViewWithPakeepViewIsBottom, positionOfFolderViewWithPakeepViewIsRight }) => ({
    zIndex: 96 * 96,
    position: 'fixed',
    bottom: positionOfFolderViewWithPakeepViewIsBottom ? 0 : '50%',
    [positionOfFolderViewWithPakeepViewIsRight ? 'right' : 'left']: positionOfFolderViewWithPakeepViewIsBottom
      ? '50%'
      : 0,
    transform: `rotate(${
      positionOfFolderViewWithPakeepViewIsBottom ? 270 : positionOfFolderViewWithPakeepViewIsRight ? 180 : 0
    }deg)`,
    '& svg': {
      color: themeColors.whiteRgbaColorWith0dot42valueOfAlfaCanal,
      '&:hover': {
        color: themeColors.whiteRgbaColorWith0dot8valueOfAlfaCanal,
      }
    }
  })
}));

const FolderLayout = ({
  children,
  handleFoldersThunk,
  folderPropertyies,
  currentFolderPropertyIdx,
  handleCurrentFolderPropertyIdxThunk,
  folders,
  isMenuOpen,
  handleDrawerWidthThunk,
  drawerWidth,
  navigationViewLike,
  labels,
  positionOfFolderViewWithPakeepView,
  isFolderViewWithPakeepViewAlignToCenter
}) => {
  const positionOfFolderViewWithPakeepViewIsBottom = positionOfFolderViewWithPakeepView === 'bottom';
  const positionOfFolderViewWithPakeepViewIsRight = positionOfFolderViewWithPakeepView === 'right';
  const positionOfFolderViewWithPakeepViewIsLeft = positionOfFolderViewWithPakeepView === 'left';

  const foldersArr = useFolders(folderPropertyies, { labels });

  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const marginValue = 8;

  const handleChange = (e, idx) => handleCurrentFolderPropertyIdxThunk(idx);
  const handleHideFolder = () => setIsFolderOpen(false);

  const foldersProps = {
    handleChange,
    folders,
    value: currentFolderPropertyIdx,
    handleDrawerWidthThunk,
    isMenuOpen,
    isFolderOpen,
    handleHideFolder,
    navigationViewLike,
    positionOfFolderViewWithPakeepViewIsBottom,
    positionOfFolderViewWithPakeepViewIsRight,
    isFolderViewWithPakeepViewAlignToCenter
  };

  useEffect(() => handleFoldersThunk(foldersArr), [folderPropertyies]);
  useEffect(() => !isFolderOpen && drawerWidth !== 0 && handleDrawerWidthThunk(0), [isFolderOpen, drawerWidth]);

  const classes = useStyles({ positionOfFolderViewWithPakeepViewIsBottom, positionOfFolderViewWithPakeepViewIsRight });

  return (
    <Grid
      container
      className={classes.container}
      wrap={'nowrap'}
      alignItems={'center'}
      direction={positionOfFolderViewWithPakeepViewIsBottom ? 'column-reverse' : 'row'}
    >
      {!isFolderOpen && (
        <Grid className={classes.arrowButton}>
          <IconButton onClick={() => setIsFolderOpen(true)} size={'small'}>
            <ArrowForwardIosOutlinedIcon />
          </IconButton>
        </Grid>
      )}
      <nav
        style={{
          minWidth: drawerWidth,
          display: isFolderViewWithPakeepViewAlignToCenter ? 'flex' : 'block',
          marginRight: positionOfFolderViewWithPakeepViewIsRight ? marginValue : 0
        }}
      >
        <Folders {...foldersProps} />
      </nav>
      <Grid
        item
        style={{
          width: '100%',
          marginLeft: positionOfFolderViewWithPakeepViewIsLeft && drawerWidth + marginValue,
          marginRight: positionOfFolderViewWithPakeepViewIsRight && drawerWidth + marginValue,
          transition: 'all 0.4s ease 0s'
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
};

FolderLayout.propTypes = {
  children: PropTypes.any,
  currentFolderPropertyIdx: PropTypes.number,
  folderPropertyies: PropTypes.object,
  folders: PropTypes.array,
  handleFoldersThunk: PropTypes.func,
  handleCurrentFolderPropertyIdxThunk: PropTypes.func
};

const mapStateToProps = ({
  app: { folderPropertyies, currentFolderPropertyIdx, folders, isMenuOpen, drawerWidth, labels },
  settings: { navigationViewLike, positionOfFolderViewWithPakeepView, isFolderViewWithPakeepViewAlignToCenter }
}) => ({
  folderPropertyies: getFolderPropertyies(folderPropertyies),
  currentFolderPropertyIdx: getCurrentFolderPropertyIdx(currentFolderPropertyIdx),
  folders: getFolders(folders),
  labels: getLabels(labels),
  isMenuOpen: getMenuOpenStatus(isMenuOpen),
  drawerWidth: getDrawerWidth(drawerWidth),
  navigationViewLike: getNavigationViewLike(navigationViewLike),
  positionOfFolderViewWithPakeepView: getPositionOfFolderViewWithPakeepView(positionOfFolderViewWithPakeepView),
  isFolderViewWithPakeepViewAlignToCenter: getIsFolderViewWithPakeepViewAlignToCenter(
    isFolderViewWithPakeepViewAlignToCenter
  )
});

const mapDispatchToProps = dispatch => ({
  handleFoldersThunk: foldersArr => dispatch(handleFoldersThunk(foldersArr)),
  handleDrawerWidthThunk: width => dispatch(handleDrawerWidthThunk(width)),
  handleCurrentFolderPropertyIdxThunk: idx => dispatch(handleCurrentFolderPropertyIdxThunk(idx))
});

export default connect(mapStateToProps, mapDispatchToProps)(FolderLayout);
