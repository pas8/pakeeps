import { Chip, Grid, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIsColorDark } from 'hooks/useIsColorDark.hook';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import { useAttributeGroupColor } from 'hooks/useAttributeGroupColor.hook';

const useStyles = makeStyles(({ spacing }) => ({
  container: ({ color, isDark, currentColor, isCustomColor, parentBackgrounColor, aplyMargin }) => ({
    cursor: 'pointer',
    marginRight: spacing(aplyMargin && 1),
    marginBottom: spacing(aplyMargin && 1),
    '& .MuiChip-root': {
      cursor: 'pointer',
      background: color,
      color: isCustomColor ? parentBackgrounColor : isDark ? '#080808' : null,
      '& svg': {
        color: isCustomColor ? parentBackgrounColor : isDark ? '#080808' : null
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

const LabelItem = ({
  currentColor,
  handleOpen,
  labelChipProps,
  customColor,
  parentBackgrounColor,
  aplyMargin = true
}) => {
  const [color, isCustomColor, isDark] = useAttributeGroupColor(customColor, currentColor);
  const classes = useStyles({ color, isDark, currentColor, isCustomColor, parentBackgrounColor, aplyMargin });

  return (
    <Grid className={classes.container} onContextMenu={handleOpen} onClick={handleOpen}>
      <Chip {...labelChipProps} />
    </Grid>
  );
};


export default LabelItem;
