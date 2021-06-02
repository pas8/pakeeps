import PropTypes from 'prop-types';
import includes from 'lodash.includes';
import { MenuItem, Checkbox, ListItemText, Grid, FormLabel, makeStyles, FormControl } from '@material-ui/core';
import IconsUtilsOfGlobalLabelListOflabelList from './components/IconsUtils';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import mixPlugin from 'colord/plugins/mix';
import { colord, extend } from 'colord';
import { themeColors } from 'components/theme';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import { useIsColorDark } from 'hooks/useIsColorDark.hook';
import { useAlpha } from 'hooks/useAlpha.hook';

const useStyles = makeStyles(({ spacing }) => {
  return {
    container: ({ color }) => ({
      '&  p': {
        color
      },
      padding: spacing(1.6, 0, 0, 0),
      '& legend': {
        padding: spacing(0, 1.6, 0.6, 1.6)
      },
      '& li': {
        padding: spacing(0.2, 0)
      }
    }),
    menuElement: ({ color }) => ({
      '&:hover  >  .MuiTouchRipple-root': {
        background: useAlpha(color, 0.08)
      },
      '& svg,p': {
        color
      },
      '& span:hover >  .MuiTouchRipple-root': {
        background: useAlpha(color)
      }
    })
  };
});

const GlobalLabelListOflabelList = ({
  globalLabels,
  handleChangeNewLabel,
  selectedLabels,
  setMenuState,
  customColor: notReverserCustomColor
}) => {
  const customColor = useGetReversedCustomColor(notReverserCustomColor);

  extend([mixPlugin]);
  const containerClasses = useStyles({ color: customColor?.hover });

  return (
    <Grid className={containerClasses.container}>
      <FormLabel component={'legend'}>All labels</FormLabel>
      {globalLabels.map(labelState => {
        // const mixedColor = colord(customColor?.bgHover).mix(themeColors.secondaryMain, 0.4).toHex();
        const isChecked = includes(selectedLabels, labelState.id);

        const isShoulColorBeChanged = !!customColor && isChecked;
        const color = isShoulColorBeChanged ? customColor?.unHover : customColor?.hover;
        const classes = useStyles({ color });
        // ||  useIsColorDark(customColor.bgUnHover)
        const onClickOfCheckBoxContainer = () => handleChangeNewLabel(isChecked, labelState.id);
        const onClickOfEditButton = e => {
          e.preventDefault();
          setMenuState({ mouseX: e.clientX, mouseY: e.clientY, ...labelState, labelIconName: labelState.iconName });
        };

        const iconsUtilsOfGlobalLabelListOflabelListProps = { onClickOfEditButton, customColor };

        const [icon, checkedIcon] = useTakeIcon(labelState.iconName);
        const isIndeterminate = !checkedIcon;
        return (
          <MenuItem disableGutters key={`newPakeep-label-${labelState.id}`} className={classes.menuElement}>
            <Grid container alignItems={'center'} onClick={onClickOfCheckBoxContainer}>
              <Checkbox checked={isChecked} checkedIcon={checkedIcon} icon={icon} indeterminate={isIndeterminate} />
              <ListItemText secondary={labelState.title} />
            </Grid>
            <IconsUtilsOfGlobalLabelListOflabelList {...iconsUtilsOfGlobalLabelListOflabelListProps} />
          </MenuItem>
        );
      })}
    </Grid>
  );
};

GlobalLabelListOflabelList.propTypes = {
  globalLabels: PropTypes.shape({
    map: PropTypes.func
  }),
  handleChangeNewLabel: PropTypes.func,
  selectedLabels: PropTypes.array,
  setMenuState: PropTypes.func
};

export default GlobalLabelListOflabelList;
