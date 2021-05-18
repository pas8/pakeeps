import { Grid, makeStyles } from '@material-ui/core';
import { useFolders } from 'hooks/useFolders.hook';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleFoldersThunk } from 'store/modules/App/operations';

const useStyles = makeStyles(theme => ({}));

const FolderLayout = ({ children, handleFoldersThunk, folderPropertyies }) => {
  const classes = useStyles();

  const foldersArr = useFolders(folderPropertyies,handleFoldersThunk);

  return <Grid>{children}</Grid>;
};

FolderLayout.propTypes = {};

const mapStateToProps = ({ app: { folderPropertyies } }) => ({ folderPropertyies });

const mapDispatchToProps = dispatch => ({ handleFoldersThunk: foldersArr => dispatch(handleFoldersThunk(foldersArr)) });

export default connect(mapStateToProps, null)(FolderLayout);
