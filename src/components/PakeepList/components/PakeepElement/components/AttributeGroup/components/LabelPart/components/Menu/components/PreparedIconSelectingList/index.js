import { Grid, makeStyles, Typography, Box } from '@material-ui/core';
import { colord } from 'colord';
import { themeColors } from 'components/theme';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  iconContainer: ({ selectedIcon }) => ({
    padding: theme.spacing(1.4),
    transform: 'scale(1.2)',
    color: selectedIcon ? themeColors.primaryMain : themeColors.whiteRgbaColorWith0dot42valueOfAlfaCanal,
    borderRadius: theme.spacing(0.6),
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.enteringScreen
    }),

    cursor: 'pointer',
    '&:hover': {
      background: colord(selectedIcon ? themeColors.primaryMain : 'rgb(255,255,255)')
        .alpha(0.16)
        .toHex(),
      boxShadow: theme.shadows[8],
      color: selectedIcon ? themeColors.primaryMain : themeColors.whiteRgbaColorWith0dot96valueOfAlfaCanal
    }
  })
}));

const PreparedIconSelectingList = ({ icon, iconName, handleChangeLabelIconName, labelIconName }) => {
  const classes = useStyles({ selectedIcon: iconName === labelIconName });
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
