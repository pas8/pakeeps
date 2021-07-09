import { FC } from 'react';
import { ListItemText, Checkbox, MenuItem, Grid, makeStyles } from '@material-ui/core';
import { useAlpha } from 'hooks/useAlpha.hook';
import { useMix } from 'hooks/useMix.hook';
import { LabelElementOfGlobalLabelListOflabelListPropsType } from './types';
import IconsUtilsOfGlobalLabelListOflabelList from '../IconsUtils';
import { UseStylesOfGlobalLabelListOflabelListType } from '../../types';

const useStyles = makeStyles(({ spacing, palette: { secondary }, typography: { subtitle2 } }) => {
  return {
    container: ({ color, customColor }: UseStylesOfGlobalLabelListOflabelListType) => {
      return {
        '&  p': { ...subtitle2 },

        padding: spacing(1.6, 0, 0, 0),
        '& legend': {
          padding: spacing(0, 1.6, 0.6, 1.6),
          color: !customColor.isUseDefault
            ? useMix({...customColor, bgHover: customColor?.bgHover, hover: customColor?.hover }, 0.8)
            : ''
        },
        '& li,span': {
          '&:hover > .MuiTouchRipple-root': {
            background: useAlpha(customColor.isUseDefault ? secondary.main : color, 0.42)
          }
        }
      };
    },
    menuElement: ({ color, customColor, isChecked }: UseStylesOfGlobalLabelListOflabelListType) => {
      const correctColor = customColor.isUseDefault ? (isChecked ? secondary.main : '') : color;
      return {
        '& div': {
          postion: 'relative',
          zIndex: 100000000
        },
        padding: spacing(0.2, 0),
        color: correctColor,
        '&:hover > .MuiTouchRipple-root':
          isChecked && customColor.isUseDefault ? { background: useAlpha(secondary.main) } : {},
        '& svg,p': { color: correctColor }
      };
    }
  };
});

const LabelElementOfGlobalLabelListOflabelList: FC<LabelElementOfGlobalLabelListOflabelListPropsType> = ({
  onClickOfCheckBoxContainer,
  color,
  isChecked,
  customColor,
  checkedIcon,
  Icon,
  isIndeterminateChecked,
  iconsUtilsOfGlobalLabelListOflabelListProps,
  title
}) => {
  const classes = useStyles({ color, isChecked, customColor });

  return (
    <MenuItem disableGutters className={classes.menuElement}>
      <Grid container alignItems={'center'} onClick={onClickOfCheckBoxContainer}>
        <Checkbox checked={isChecked} checkedIcon={checkedIcon} icon={Icon} indeterminate={isIndeterminateChecked} />
        <ListItemText secondary={title} />
      </Grid>
      <IconsUtilsOfGlobalLabelListOflabelList
        {...iconsUtilsOfGlobalLabelListOflabelListProps}
        customColor={customColor}
      />
    </MenuItem>
  );
};

export default LabelElementOfGlobalLabelListOflabelList;
