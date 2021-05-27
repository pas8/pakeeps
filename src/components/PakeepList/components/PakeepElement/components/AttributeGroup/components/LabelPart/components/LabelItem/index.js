import { Chip, Grid, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { themeColors } from 'components/theme';
import { useIsColorDark } from 'hooks/useIsColorDark.hook';

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

const LabelItem = ({ currentColor, handleOpen, labelChipProps }) => {
  const isDark = useIsColorDark(currentColor);

  const color = !currentColor
    ? '#969696'
    : currentColor === 'primary'
    ? themeColors.primaryMain
    : currentColor === 'secondary'
    ? themeColors.secondaryMain
    : currentColor;

  const classes = useStyles({ color, isDark });

  return (
    <Grid item className={classes.container} onContextMenu={handleOpen} onClick={handleOpen}>
      <Chip {...labelChipProps} />
    </Grid>
  );
};

LabelItem.propTypes = {
  currentColor: PropTypes.any,
  handleOpen: PropTypes.func,
  labelChipProps: PropTypes.object
};

export default LabelItem;
