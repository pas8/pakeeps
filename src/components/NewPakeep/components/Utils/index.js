import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import { makeStyles, Box, Button, Grid } from '@material-ui/core';
import IconsUtils from 'components/IconsUtils';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import { useMeasure } from 'react-use';
import { themeColors } from 'components/theme';
import { colord } from 'colord';

// import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 8,
    '& button:hover': { background: ({ customColor }) => customColor ?  colord(customColor.hover).alpha(0.16).toHex() : null  }
  },
  buttonWrapper: { display: 'flex', alignItems: 'center', justifyContent: 'flex-end' },
  buttonGroupWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexGrow: 1
  },
  button: { justifyContent: 'flex-end' }
}));

const NewPakeepUtils = ({ customColor, handleNewPakeepSave, widthOfContainer, ...newPakeepUtilsProps }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleNewPakeepSubmit = () => {
    try {
      enqueueSnackbar({ message: 'Processing...', severity: 'info' });
      handleNewPakeepSave();
      // closeSnackbar();
      enqueueSnackbar({ message: 'New pakeep was succsesfully added' });
    } catch (error) {
      enqueueSnackbar({ message: !!error ? error : 'Something went wrong', severity: 'error' });
    }
  };
  const [ref, { width: widthOfCButtonConatiner }] = useMeasure();

  const correctWidthOfContainer = widthOfContainer - widthOfCButtonConatiner;
  const iconUtilsProps = {
    ...newPakeepUtilsProps,
    customColor,
    widthOfContainer: correctWidthOfContainer
  };

  const classes = useStyles({ customColor });

  return (
    <Box className={clsx(classes.container)}>
      <IconsUtils {...iconUtilsProps} />
      <Box className={classes.buttonGroupWrapper} ref={ref}>
        <Box className={classes.buttonWrapper}>
          <Button
            style={{
              color: !customColor ? themeColors.whiteRgbaColorWith0dot42valueOfAlfaCanal : colord(customColor.hover).alpha(0.6).toHex()
            }}
          >
            Close
          </Button>
        </Box>
        <Box className={clsx(classes.buttonWrapper, classes.button)}>
          <Button
            startIcon={<SaveRoundedIcon />}
            onClick={handleNewPakeepSubmit}
            style={{ color: !customColor ? themeColors.primaryMain : customColor.unHover }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

NewPakeepUtils.propTypes = {
  customColor: PropTypes.shape({
    hover: PropTypes.any,
    unHover: PropTypes.any
  }),
  handleNewPakeepSave: PropTypes.func,
  widthOfContainer: PropTypes.oneOf(['string', 'number'])
};

export default NewPakeepUtils;
