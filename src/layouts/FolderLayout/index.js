import { Grid, makeStyles } from '@material-ui/core';
import Folders from 'components/Folders';
import { useFolders } from 'hooks/useFolders.hook';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { handleFoldersThunk, handleCurrentFolderPropertyIdxThunk } from 'store/modules/App/operations';
import {
  getFolderPropertyies,
  getCurrentFolderPropertyIdx,
  getFolders,
  getMenuOpenStatus
} from 'store/modules/App/selectors';

const useStyles = makeStyles(theme => ({}));

const FolderLayout = ({
  children,
  handleFoldersThunk,
  folderPropertyies,
  currentFolderPropertyIdx,
  handleCurrentFolderPropertyIdxThunk,
  folders,
  isMenuOpen
}) => {
  const classes = useStyles();
  const [minWidthOfNav, setMinWidthOfNav] = useState(0);

  const foldersArr = useFolders(folderPropertyies);
  useCallback(() => console.log(';'), [currentFolderPropertyIdx, folderPropertyies]);

  const handleChange = (e, idx) => handleCurrentFolderPropertyIdxThunk(idx);

  const foldersProps = {
    handleChange,
    folders,
    value: currentFolderPropertyIdx,
    setMinWidthOfNav,
    isMenuOpen
  };

  return (
    <Grid container wrap={'nowrap'}>
      <nav style={{ minWidth: minWidthOfNav }}>
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

const mapStateToProps = ({ app: { folderPropertyies, currentFolderPropertyIdx, folders, isMenuOpen } }) => ({
  folderPropertyies: getFolderPropertyies(folderPropertyies),
  currentFolderPropertyIdx: getCurrentFolderPropertyIdx(currentFolderPropertyIdx),
  folders: getFolders(folders),
  isMenuOpen: getMenuOpenStatus(isMenuOpen)
});

const mapDispatchToProps = dispatch => ({
  handleFoldersThunk: foldersArr => dispatch(handleFoldersThunk(foldersArr)),
  handleCurrentFolderPropertyIdxThunk: idx => dispatch(handleCurrentFolderPropertyIdxThunk(idx))
});

export default connect(mapStateToProps, mapDispatchToProps)(FolderLayout);
