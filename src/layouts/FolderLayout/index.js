import { Grid, makeStyles } from '@material-ui/core';
import Folders from 'components/Folders';
import { useFolders } from 'hooks/useFolders.hook';
import PropTypes from 'prop-types';
import { useCallback, useState,useEffect } from 'react';
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
  getDrawerWidth
} from 'store/modules/App/selectors';
import { getNavigationViewLike } from 'store/modules/Settings/selectors';

const useStyles = makeStyles(theme => ({}));

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
  labels
}) => {
  const classes = useStyles();

  const foldersArr = useFolders(folderPropertyies, { labels });
  console.log(folders);
  useEffect(() => handleFoldersThunk(foldersArr), [folderPropertyies]);

  const handleChange = (e, idx) => handleCurrentFolderPropertyIdxThunk(idx);

  const foldersProps = {
    handleChange,
    folders,
    value: currentFolderPropertyIdx,
    handleDrawerWidthThunk,
    isMenuOpen,
    navigationViewLike
  };

  return (
    <Grid container wrap={'nowrap'}>
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
  settings: { navigationViewLike }
}) => ({
  folderPropertyies: getFolderPropertyies(folderPropertyies),
  currentFolderPropertyIdx: getCurrentFolderPropertyIdx(currentFolderPropertyIdx),
  folders: getFolders(folders),
  labels,
  isMenuOpen: getMenuOpenStatus(isMenuOpen),
  drawerWidth: getDrawerWidth(drawerWidth),
  navigationViewLike: getNavigationViewLike(navigationViewLike)
});

const mapDispatchToProps = dispatch => ({
  handleFoldersThunk: foldersArr => dispatch(handleFoldersThunk(foldersArr)),
  handleDrawerWidthThunk: width => dispatch(handleDrawerWidthThunk(width)),
  handleCurrentFolderPropertyIdxThunk: idx => dispatch(handleCurrentFolderPropertyIdxThunk(idx))
});

export default connect(mapStateToProps, mapDispatchToProps)(FolderLayout);
