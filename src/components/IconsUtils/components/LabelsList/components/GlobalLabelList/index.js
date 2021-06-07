import PropTypes from 'prop-types';
import includes from 'lodash.includes';
import { MenuItem, Checkbox, ListItemText, Grid, FormLabel, makeStyles, FormControl } from '@material-ui/core';
import IconsUtilsOfGlobalLabelListOflabelList from './components/IconsUtils';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import mixPlugin from 'colord/plugins/mix';
import { colord, extend } from 'colord';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import { useIsColorDark } from 'hooks/useIsColorDark.hook';
import { useAlpha } from 'hooks/useAlpha.hook';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import { useMix } from 'hooks/useMix.hook';

const useStyles = makeStyles(({ spacing, palette: { secondary } }) => {
  return {
    container: ({ color, customColor }) => ({
      '&  p': {
        color
      },
      padding: spacing(1.6, 0, 0, 0),
      '& legend': {
        padding: spacing(0, 1.6, 0.6, 1.6),
        color: customColor && useMix({ bgHover: customColor?.bgHover, hover: customColor?.hover },0.8)
      },
      '& li,span': {
        '&:hover > .MuiTouchRipple-root': customColor && {
          background: useAlpha(color)
        }
      }
    }),
    menuElement: ({ color, customColor, isChecked }) => {
      const correctColor = isChecked && !customColor ? secondary.main : color;
      return {
        padding: spacing(0.2, 0),

        color: correctColor,
        '&:hover > .MuiTouchRipple-root': isChecked &&
          !customColor && {
            background: useAlpha(secondary.main)
          },
        '& svg,p': {
          color: correctColor
        }
      };
    }
  };
});

const GlobalLabelListOflabelList = ({
  globalLabels,
  handleChangeNewLabel,
  selectedLabels,
  setMenuState,
  customColor
}) => {
  // const customColor = useGetReversedCustomColor(notReverserCustomColor);

  extend([mixPlugin]);
  const containerClasses = useStyles({ color: customColor?.hover, customColor });

  return (
    <Grid className={containerClasses.container}>
      <FormLabel component={'legend'}>All labels</FormLabel>
      {globalLabels.map(labelState => {
        const isChecked = includes(selectedLabels, labelState.id);
        const isShoulColorBeChanged = !!customColor && isChecked;
        const color = !isShoulColorBeChanged ? customColor?.unHover : customColor?.hover;

        const classes = useStyles({ color, isChecked, customColor });
        // ||  useIsColorDark(customColor.bgUnHover)
        const onClickOfCheckBoxContainer = () => handleChangeNewLabel(isChecked, labelState.id);
        const onClickOfEditButton = e => {
          e.preventDefault();
          setMenuState({ mouseX: e.clientX, mouseY: e.clientY, ...labelState, labelIconName: labelState.iconName });
        };

        const iconsUtilsOfGlobalLabelListOflabelListProps = { onClickOfEditButton, customColor };

        const [icon, checkedIcon] = useTakeIcon(labelState.iconName);

        const isIndeterminate = !checkedIcon;
        const isIndeterminateChecked = isIndeterminate && isShoulColorBeChanged;

        return (
          <MenuItem disableGutters key={`newPakeep-label-${labelState.id}`} className={classes.menuElement}>
            <Grid container alignItems={'center'} onClick={onClickOfCheckBoxContainer}>
              <Checkbox
                checked={isChecked}
                checkedIcon={checkedIcon}
                icon={isIndeterminate && !isIndeterminateChecked ? <IndeterminateCheckBoxOutlinedIcon /> : icon}
                indeterminate={isIndeterminateChecked}
              />
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
