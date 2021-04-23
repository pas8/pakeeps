import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import { makeStyles, Box, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import IconsUtils from 'components/IconsUtils';

// import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
const useStyles = makeStyles(theme => ({
  container: { display: 'flex', position: 'absolute', bottom: 0, left: 0, right: 8 },
  buttonWrapper: { display: 'flex', alignItems: 'center', justifyContent: 'flex-end' },
  buttonGroupWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexGrow: 1
  },
  button: { justifyContent: 'flex-end' },
  hidden: {
    display: 'none'
  }
}));

const NewPakeepUtils = ({
  open = !true,
  setEditTitleIsTrue,
  favorite = true,
  handleSetFavoritePakeep,
  changingTitle,
  bookmark,
  labels,
  checkbox,
  handleSetBookmarkPakeep,
  handleSetColorPakeep,
  handleNewPakeepSave
}) => {
  const classes = useStyles();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleNewPakeepSubmit = () => {
    enqueueSnackbar('Processing...');
    handleNewPakeepSave();
  };
  return (
    <Box className={clsx(classes.container, !open ? classes.hidden : null)}>
      <IconsUtils
            setEditTitleIsTrue={setEditTitleIsTrue}
            favorite={favorite}
            handleSetFavoritePakeep={handleSetFavoritePakeep}
            changingTitle={changingTitle}
            bookmark={bookmark}
            labels={labels}
            checkbox={checkbox}
            handleSetBookmarkPakeep={handleSetBookmarkPakeep}
            handleSetColorPakeep={handleSetColorPakeep}
          />
      <Box className={classes.buttonGroupWrapper}>
        <Box className={classes.buttonWrapper}>
          
          <Button color={'success'} style={{ color: 'rgba(255,255,255,0.4)' }}>
            Close
          </Button>
        </Box>
        <Box className={clsx(classes.buttonWrapper, classes.button)}>
          <Button color={'primary'} startIcon={<SaveIcon />} onClick={handleNewPakeepSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

NewPakeepUtils.propTypes = {
  bookmark: PropTypes.any,
  changingTitle: PropTypes.any,
  checkbox: PropTypes.any,
  favorite: PropTypes.bool,
  handleNewPakeepSave: PropTypes.func,
  handleSetBookmarkPakeep: PropTypes.any,
  handleSetColorPakeep: PropTypes.any,
  handleSetFavoritePakeep: PropTypes.func,
  labels: PropTypes.any,
  open: PropTypes.bool,
  setEditTitleIsTrue: PropTypes.func
};

export default NewPakeepUtils;
