import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import { makeStyles, Box, Button, Grid } from '@material-ui/core';
import IconsUtils from 'components/IconsUtils';
import { useMeasure } from 'react-use';
import SaveButtonWithIcon from 'components/SaveButtonWithIcon';
import { useAlpha } from 'hooks/useAlpha.hook';
import { useThemeColors } from 'hooks/useThemeColors.hook';

// import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 8,
    '& button:hover': {
      background: ({ customColor }) => (customColor ? useAlpha(customColor.hover) : null)
    }
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
  const [, , , , mediumEmphasisColor] = useThemeColors();

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
              color: !customColor ? mediumEmphasisColor : useAlpha(customColor.hover, 0.6)
            }}
          >
            Close
          </Button>
        </Box>
        <Box className={clsx(classes.buttonWrapper, classes.button)}>
          <SaveButtonWithIcon onSave={handleNewPakeepSubmit} customColor={customColor} />
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
