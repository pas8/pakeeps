import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import { makeStyles, Box, Button, Grid } from '@material-ui/core';
import IconsUtils from 'components/IconsUtils';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import { useMeasure } from 'react-use';
import { themeColors } from 'components/theme';

// import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
const useStyles = makeStyles(theme => ({
  container: { display: 'flex', position: 'absolute', bottom: 0, left: 0, right: 8 },
  buttonWrapper: { display: 'flex', alignItems: 'center', justifyContent: 'flex-end' },
  buttonGroupWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexGrow: 1
  },
  button: { justifyContent: 'flex-end' }
}));

const NewPakeepUtils = ({ handleNewPakeepSave, widthOfContainer, ...newPakeepUtilsProps }) => {
  const classes = useStyles();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleNewPakeepSubmit = () => {
    enqueueSnackbar('Processing...');
    handleNewPakeepSave();
  };

  const [ref, { width: widthOfCButtonConatiner }] = useMeasure();

  const correctWidthOfContainer = widthOfContainer - widthOfCButtonConatiner;
  const iconUtilsProps = {
    ...newPakeepUtilsProps,
    widthOfContainer: correctWidthOfContainer
  };

  return (
    <Box className={clsx(classes.container)}>
      <IconsUtils {...iconUtilsProps} />
      <Box className={classes.buttonGroupWrapper} ref={ref}>
        <Box className={classes.buttonWrapper}>
          <Button color={'success'} style={{ color: themeColors.whiteRgbaColorWith0dot42valueOfAlfaCanal }}>
            Close
          </Button>
        </Box>
        <Box className={clsx(classes.buttonWrapper, classes.button)}>
          <Button color={'primary'} startIcon={<SaveRoundedIcon />} onClick={handleNewPakeepSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

NewPakeepUtils.propTypes = {
  handleNewPakeepSave: PropTypes.func,
  widthOfContainer: PropTypes.oneOf(['string', 'number'])
};

export default NewPakeepUtils;
