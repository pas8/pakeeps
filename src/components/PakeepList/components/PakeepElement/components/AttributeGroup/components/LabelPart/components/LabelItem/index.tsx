import { Chip, Grid, makeStyles } from '@material-ui/core';
import { useAttributeGroupColor } from 'hooks/useAttributeGroupColor.hook';
import { FC } from 'react';
import { LabelItemPropsType, UseStylesOfLabelItemType } from './types';

const useStyles = makeStyles(({ spacing }) => ({
  container: ({ color, isDark, isCustomColor, parentBackgrounColor, aplyMargin }: UseStylesOfLabelItemType) => ({
    cursor: 'pointer',
    marginRight: spacing(aplyMargin ? 1 : 0),
    marginBottom: spacing(aplyMargin ? 1 : 0),
    '& .MuiChip-root': {
      cursor: 'pointer',
      background: color,
      color: isCustomColor ? parentBackgrounColor : isDark ? '#080808' : '',
      '& svg': {
        color: isCustomColor ? parentBackgrounColor : isDark ? '#080808' : ''
      },
      '&:hover': {
        boxShadow: `0px 0px 4px 1px ${color}`
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

const LabelItem: FC<LabelItemPropsType> = ({
  currentColor,
  handleOpen,
  labelChipProps,
  customColor,
  parentBackgrounColor: oldParentColor,
  aplyMargin = true
}) => {
  const parentBackgrounColor = oldParentColor === 'default' ? '#080808' : oldParentColor;

  const [color, isCustomColor, isDark] = useAttributeGroupColor(customColor, currentColor);

  const classes = useStyles({ color, isDark, isCustomColor, parentBackgrounColor, aplyMargin });

  return (
    <Grid className={classes.container} onContextMenu={handleOpen} onClick={handleOpen}>
      <Chip {...labelChipProps} />
    </Grid>
  );
};

export default LabelItem;
