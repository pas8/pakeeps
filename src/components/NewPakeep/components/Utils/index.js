import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import { makeStyles, Box, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import IconsUtils from 'components/IconsUtils';
import { useMeasure } from 'react-use';

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

const NewPakeepUtils = ({ open = !true, handleNewPakeepSave, widthOfContainer,...newPakeepUtilsProps }) => {
  const classes = useStyles();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleNewPakeepSubmit = () => {
    enqueueSnackbar('Processing...');
    handleNewPakeepSave();
  };


  const [ref, { width:widthOfCButtonConatiner }] = useMeasure();


  const correctWidthOfContainer = widthOfContainer - widthOfCButtonConatiner
  const iconUtilsProps = {
    ...newPakeepUtilsProps,
    widthOfContainer:correctWidthOfContainer
  };
console.log(correctWidthOfContainer)
  return (
    <Box className={clsx(classes.container, !open ? classes.hidden : null)}>
      <IconsUtils {...iconUtilsProps} />
      <Box className={classes.buttonGroupWrapper} ref={ref}>
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
