import { Grid, makeStyles } from '@material-ui/core';
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
import { getNavigationViewLike, getPositionOfFolderViewWithPakeepView } from 'store/modules/Settings/selectors';

const useStyles = makeStyles(theme => ({
  container: {
    '& nav': ({ positionOfFolderViewWithPakeepViewIsBottom }) =>
      !positionOfFolderViewWithPakeepViewIsBottom && {
        position: null,
        bottom: 0,
        left: 0,
        right: 0
      }
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
  positionOfFolderViewWithPakeepView
}) => {
  const positionOfFolderViewWithPakeepViewIsBottom = positionOfFolderViewWithPakeepView === 'center';
  const positionOfFolderViewWithPakeepViewIsRight = positionOfFolderViewWithPakeepView === 'right';
  const foldersArr = useFolders(folderPropertyies, { labels });
  console.log(folders);
  useEffect(() => handleFoldersThunk(foldersArr), [folderPropertyies]);

  const handleChange = (e, idx) => handleCurrentFolderPropertyIdxThunk(idx);

  const classes = useStyles({ positionOfFolderViewWithPakeepViewIsBottom });

  const foldersProps = {
    handleChange,
    folders,
    value: currentFolderPropertyIdx,
    handleDrawerWidthThunk,
    isMenuOpen,
    navigationViewLike,
    positionOfFolderViewWithPakeepViewIsBottom
  };
  return (
    <Grid
      container
      className={classes.container}
      wrap={'nowrap'}
      direction={
        positionOfFolderViewWithPakeepViewIsRight
          ? 'row-reverse'
          : positionOfFolderViewWithPakeepViewIsBottom
          ? 'column-reverse'
          : 'row'
      }
    >
      <nav style={{ minWidth: drawerWidth }}>
        <Folders {...foldersProps} />
      </nav>
      <Grid item style={{ width: '100%' }}>
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
  settings: { navigationViewLike, positionOfFolderViewWithPakeepView }
}) => ({
  folderPropertyies: getFolderPropertyies(folderPropertyies),
  currentFolderPropertyIdx: getCurrentFolderPropertyIdx(currentFolderPropertyIdx),
  folders: getFolders(folders),
  labels: getLabels(labels),
  isMenuOpen: getMenuOpenStatus(isMenuOpen),
  drawerWidth: getDrawerWidth(drawerWidth),
  navigationViewLike: getNavigationViewLike(navigationViewLike),
  positionOfFolderViewWithPakeepView: getPositionOfFolderViewWithPakeepView(positionOfFolderViewWithPakeepView)
});

const mapDispatchToProps = dispatch => ({
  handleFoldersThunk: foldersArr => dispatch(handleFoldersThunk(foldersArr)),
  handleDrawerWidthThunk: width => dispatch(handleDrawerWidthThunk(width)),
  handleCurrentFolderPropertyIdxThunk: idx => dispatch(handleCurrentFolderPropertyIdxThunk(idx))
});

export default connect(mapStateToProps, mapDispatchToProps)(FolderLayout);
