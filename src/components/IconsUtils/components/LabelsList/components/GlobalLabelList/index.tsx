import includes from 'lodash.includes';
import {  Grid, FormLabel, makeStyles,  } from '@material-ui/core';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import mixPlugin from 'colord/plugins/mix';
import {  extend } from 'colord';
import { useAlpha } from 'hooks/useAlpha.hook';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import { useMix } from 'hooks/useMix.hook';
import { useSelector } from 'react-redux';
import {  getLabels } from 'store/modules/App/selectors';
import { FC, MouseEventHandler } from 'react';
import { GlobalLabelListOflabelListPropsType, UseStylesOfGlobalLabelListOflabelListType } from './types';
import LabelElementOfGlobalLabelListOflabelList from './components/LabelElement';

const useStyles = makeStyles(({ spacing, palette: { secondary }, typography: { subtitle2 } }) => {
  return {
    container: ({ color, customColor }: UseStylesOfGlobalLabelListOflabelListType) => {
      return {
        // background:customColor.bgHover,
        '&  p': { ...subtitle2 },

        padding: spacing(1.6, 0, 0, 0),
        '& legend': {
          padding: spacing(0, 1.6, 0.6, 1.6),
          color: !customColor.isUseDefault
            ? useMix({ bgHover: customColor?.bgHover, hover: customColor?.hover }, 0.8)
            : ''
        },
        '& li,span': {
          '&:hover > .MuiTouchRipple-root': {
            background: useAlpha(customColor.isUseDefault ? secondary.main : color, 0.42)
          }
        }
      };
    },
  };
});

const GlobalLabelListOflabelList: FC<GlobalLabelListOflabelListPropsType> = ({
  handleChangeNewLabel,
  selectedLabels,
  setMenuState,
  customColor
}) => {
  const globalLabels = useSelector(getLabels);
  // const customColor = useGetReversedCustomColor(notReverserCustomColor);

  extend([mixPlugin]);
  const containerClasses = useStyles({ color: customColor?.hover, customColor });

  return (
    <Grid className={containerClasses.container}>
      <FormLabel component={'legend'}>All labels</FormLabel>
      {globalLabels.map(labelState => {
        const isChecked = includes(selectedLabels, labelState.id);
        const isShoulColorBeChanged = !customColor.isUseDefault && isChecked;
        // console.log(isChecked,selectedLabels)

        const color = !isShoulColorBeChanged ? customColor?.unHover : customColor?.hover;
        // ||  useIsColorLight(customColor.bgUnHover)
        const onClickOfCheckBoxContainer = () => handleChangeNewLabel(isChecked, labelState.id);
        const onClickOfEditButton: MouseEventHandler<HTMLButtonElement> = e => {
          e.preventDefault();
          setMenuState({ mouseX: e.clientX, mouseY: e.clientY, ...labelState, labelIconName: labelState.iconName });
        };

        const iconsUtilsOfGlobalLabelListOflabelListProps = { onClickOfEditButton, customColor };

        const [icon, checkedIcon] = useTakeIcon(labelState.iconName);

        const isIndeterminate = !checkedIcon;
        const isIndeterminateChecked = isIndeterminate && isShoulColorBeChanged;
        const Icon = isIndeterminate && !isIndeterminateChecked ? <IndeterminateCheckBoxOutlinedIcon /> : icon;

        const labelItemProps = {
          isIndeterminateChecked,
          iconsUtilsOfGlobalLabelListOflabelListProps,
          Icon,
          onClickOfCheckBoxContainer,
          checkedIcon,
          color,
          customColor,
          isChecked,
          title:labelState.title,
        };
        return (
          <LabelElementOfGlobalLabelListOflabelList key={`newPakeep-label-${labelState.id}`} {...labelItemProps} />
        );
      })}
    </Grid>
  );
};

export default GlobalLabelListOflabelList;
