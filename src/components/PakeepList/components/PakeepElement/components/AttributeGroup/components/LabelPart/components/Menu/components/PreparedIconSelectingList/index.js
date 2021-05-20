import { Grid, makeStyles, Typography, Box } from '@material-ui/core';
import { themeColors } from 'components/theme';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  iconContainer: {
    padding: theme.spacing(1.4),
    transform: 'scale(1.2)',
    color: themeColors.whiteRgbaColorWith0dot42valueOfAlfaCanal,
    borderRadius: theme.spacing(0.6),
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.enteringScreen
    }),
    cursor:'pointer',
    '&:hover': {
      background: 'rgba(255,255,255,0.16)',
      boxShadow: theme.shadows[8],
      color: themeColors.whiteRgbaColorWith0dot96valueOfAlfaCanal
    }
  }
}));

const PreparedIconSelectingList = ({ icon, iconName, handleChangeLabelIconName }) => {
  const classes = useStyles();
  const onClick = () => handleChangeLabelIconName(iconName);

  return (
    <Box mx={0.4} onClick={onClick}>
      <Grid container alignItems={'center'} justify={'center'} className={classes.iconContainer}>
        {icon}
      </Grid>
    </Box>
  );
};

PreparedIconSelectingList.propTypes = {};

export default PreparedIconSelectingList;
