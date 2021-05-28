import PropTypes from 'prop-types';
import { Grid, makeStyles, IconButton } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import { themeColors } from 'components/theme';
import { colord } from 'colord';

const useStyles = makeStyles(theme => ({
  containeOfEyeIconButton: {
    position: 'absolute',
    right: 4,
    top: 4,
    '& button:hover': {
      color: ({ customColor }) => (customColor && colord(customColor.hover).alpha(0.16).toHex())
    }
  }
}));

const EyeIconButton = ({ onClickOfEyeIconButton, isUtilsHidden, customColor }) => {
  const classes = useStyles({ customColor });

  return (
    <Grid className={classes.containeOfEyeIconButton} justify={'center'} alignItems={'center'}>
      <IconButton onClick={onClickOfEyeIconButton}>
        {isUtilsHidden ? (
          <VisibilityOutlinedIcon
            style={{ color: !customColor ? themeColors.whiteRgbaColorWith0dot8valueOfAlfaCanal : customColor.unHover }}
          />
        ) : (
          <VisibilityOffOutlinedIcon
            style={{ color: !customColor ? themeColors.whiteRgbaColorWith0dot42valueOfAlfaCanal : customColor.unHover }}
          />
        )}
      </IconButton>
    </Grid>
  );
};

EyeIconButton.propTypes = {
  customColor: PropTypes.any,
  isUtilsHidden: PropTypes.bool,
  onClickOfEyeIconButton: PropTypes.func
};

export default EyeIconButton;
