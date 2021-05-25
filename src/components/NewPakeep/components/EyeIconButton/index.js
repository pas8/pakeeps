
import PropTypes from 'prop-types';
import { Grid, makeStyles,IconButton } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import { themeColors } from 'components/theme';

const useStyles = makeStyles(theme => ({
  conatineOfEyeIconButton: { position: 'absolute', right: 4, top: 4,  },


}));

const EyeIconButton = ({onClickOfEyeIconButton,isUtilsHidden}) => {
  const classes = useStyles();

  return (
    <Grid className={classes.conatineOfEyeIconButton} justify={'center'} alignItems={'center'}>
      <IconButton onClick={onClickOfEyeIconButton}>
        {isUtilsHidden ? (
          <VisibilityOutlinedIcon style={{ color: themeColors.whiteRgbaColorWith0dot8valueOfAlfaCanal }} />
        ) : (
          <VisibilityOffOutlinedIcon style={{ color: themeColors.whiteRgbaColorWith0dot42valueOfAlfaCanal }} />
        )}
      </IconButton>
    </Grid>
  );
};

EyeIconButton.propTypes = {
  onClickOfEyeIconButton: PropTypes.func,
  isUtilsHidden:PropTypes.bool
}

export default EyeIconButton;
