import { Chip, Grid, makeStyles, Tooltip, Zoom } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  container: ({ color, isDark }) => ({
    cursor: 'pointer',
    '& .MuiChip-root': {
      cursor: 'pointer',
      background: color,
      color: isDark ? '#080808' : null,
      '& svg': {
        color: isDark ? '#080808' : null
      },
      '&:hover': {
        boxShadow: `0px 0px 4px 1px ${color} `
      }
    },
    '& .MuiChip-outlined': {
      background: 'transparent',
      borderColor: color,
      color,
      '& svg': {
        color: `${color} !important`
      }
    }
  })
}));

const LabelItem = ({ isDark, currentColor, handleOpen, labelChipProps }) => {
  const classes = useStyles({ color: currentColor, isDark });

  return (
    <Grid item className={classes.container} onContextMenu={handleOpen} onClick={handleOpen}>
      <Chip {...labelChipProps} />
    </Grid>
  );
};

LabelItem.propTypes = {
  currentColor: PropTypes.any,
  handleOpen: PropTypes.func,
  isDark: PropTypes.bool,
  labelChipProps: PropTypes.object
};

export default LabelItem;
