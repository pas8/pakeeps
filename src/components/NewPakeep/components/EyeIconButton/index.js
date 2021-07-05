import PropTypes from 'prop-types';
import { Grid, makeStyles, IconButton } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import { useAlpha } from 'hooks/useAlpha.hook';

const useStyles = makeStyles(theme => ({
  containeOfEyeIconButton: {
    position: 'absolute',
    right: 4,
    top: 4,
    '& button:hover': {
      color: ({ customColor }) => customColor && useAlpha(customColor.hover) 
    }
  }
}));

const EyeIconButton = ({ onClickOfEyeIconButton, isUtilsHidden, customColor }) => {
  const classes = useStyles({ customColor });
  const [, , , highEmphasisColor, mediumEmphasisColor] = useThemeColors();
  return (
    <Grid className={classes.containeOfEyeIconButton} justify={'center'} alignItems={'center'}>
      <IconButton onClick={onClickOfEyeIconButton}>
        {isUtilsHidden ? (
          <VisibilityOutlinedIcon style={{ color: !customColor ? highEmphasisColor : customColor.unHover }} />
        ) : (
          <VisibilityOffOutlinedIcon style={{ color: !customColor ? mediumEmphasisColor : customColor.unHover }} />
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
