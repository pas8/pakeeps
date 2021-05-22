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

const useStyles = makeStyles(theme => ({
  container: ({ positionOfFolderViewWithPakeepViewIsBottom, positionOfFolderViewWithPakeepViewIsRight }) => ({
    '& nav': positionOfFolderViewWithPakeepViewIsBottom
      ? {
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0
        }
      : {
          position: 'fixed',
          bottom: 0,
          top: 0,
          [positionOfFolderViewWithPakeepViewIsRight ? 'right' : 'left']: 0
        }
  }),
  arrowButton: {
    zIndex: 10000000000,
    position: 'fixed',
    bottom: '50%',
    left: 0
  }
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
  console.log(drawerWidth);
  useEffect(() => handleFoldersThunk(foldersArr), [folderPropertyies]);

  const handleChange = (e, idx) => handleCurrentFolderPropertyIdxThunk(idx);
  const [isFolderOpen, setIsFolderOpen] = useState(false);

  useEffect(() => !isFolderOpen && drawerWidth !== 0 && handleDrawerWidthThunk(0), [isFolderOpen, drawerWidth]);

  const classes = useStyles({ positionOfFolderViewWithPakeepViewIsBottom, positionOfFolderViewWithPakeepViewIsRight });

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

  const marginValue = 8;
  
  return (
    <Grid
      container
      className={classes.container}
      wrap={'nowrap'}
      direction={positionOfFolderViewWithPakeepViewIsBottom ? 'column-reverse' : 'row'}
    >
      {!isFolderOpen && (
        <Grid className={classes.arrowButton}>
          <IconButton onClick={() => setIsFolderOpen(true)} size={'small'}>
            <ArrowForwardIosOutlinedIcon />
          </IconButton>
        </Grid>
      )}
      <nav style={{ minWidth: drawerWidth, display: isFolderViewWithPakeepViewAlignToCenter ? 'flex' : 'block' }}>
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
