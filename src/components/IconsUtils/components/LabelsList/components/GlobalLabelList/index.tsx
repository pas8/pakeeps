import includes from 'lodash.includes';
import { Grid, FormLabel, makeStyles, Box, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { FC, MouseEventHandler } from 'react';
import mixPlugin from 'colord/plugins/mix';
import { extend } from 'colord';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';

import { useAlpha } from 'hooks/useAlpha.hook';
import { useMix } from 'hooks/useMix.hook';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { getLabels } from 'store/modules/App/selectors';
import { toChangeTemporaryData } from 'store/modules/App/actions';
import { MenusLayoutName } from 'models/unums';
import { GlobalLabelListOflabelListPropsType, UseStylesOfGlobalLabelListOflabelListType } from './types';
import LabelElementOfGlobalLabelListOflabelList from './components/LabelElement';

const useStyles = makeStyles(({ spacing, palette: { secondary }, typography: { subtitle2 ,body2,caption} }) => {
  return {
    container: ({ color, customColor }: UseStylesOfGlobalLabelListOflabelListType) => {
      return {
        '&  p': { ...subtitle2 },
        padding: spacing(1.6, 0, 0, 0),
        '& legend': {
          padding: spacing(0, 1.6, 0.6, 1.6),
          color: !customColor.isUseDefault
            ? useMix({ ...customColor, bgHover: customColor?.bgHover, hover: customColor?.hover }, 0.8)
            : ''
        },
        '& li,span': {
          '&:hover > .MuiTouchRipple-root': {
            background: useAlpha(customColor.isUseDefault ? secondary.main : color, 0.42)
          }
        }
      };
    },
    placeholder:{...caption}

  };
});

const GlobalLabelListOflabelList: FC<GlobalLabelListOflabelListPropsType> = ({
  handleChangeNewLabel,
  selectedLabels,
  customColor
}) => {
  extend([mixPlugin]);

  const globalLabels = useSelector(getLabels);
  const dispatch = useDispatch();
  const containerClasses = useStyles({ color: customColor?.hover, customColor });

  return (
    <Grid className={containerClasses.container}>
      <FormLabel component={'legend'}>All labels</FormLabel>

      {!globalLabels.length ? (
        <Box maxWidth={208} mt={0.8} >
          <Typography component={'legend'}  className={containerClasses.placeholder}>
            {'U didnt not added labels yet, but u can simple do this by click to the "Add new global label" button'}
          </Typography>
        </Box>
      ) : (
        globalLabels.map(({ id, title, iconName }) => {
          const isChecked = includes(selectedLabels, id);
          const isShoulColorBeChanged = !customColor.isUseDefault && isChecked;
          const color = !isShoulColorBeChanged ? customColor?.unHover : customColor?.hover;

          const onClickOfCheckBoxContainer = () => {
            handleChangeNewLabel(isChecked, id);
          };
          const onClickOfEditButton: MouseEventHandler<HTMLButtonElement> = e => {
            e.preventDefault();
            dispatch(
              toChangeTemporaryData({
                newTemporaryData: {
                  defaultMenuProps: {
                    customColor,
                    id,
                    menuName: MenusLayoutName.LABELS,
                    mouseX: e.clientX,
                    mouseY: e.clientY
                  }
                }
              })
            );
          };

          const iconsUtilsOfGlobalLabelListOflabelListProps = { onClickOfEditButton, customColor };

          const [icon, checkedIcon] = useTakeIcon(iconName);

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
            title
          };
          return <LabelElementOfGlobalLabelListOflabelList key={`newPakeep-label-${id}`} {...labelItemProps} />;
        })
      )}
    </Grid>
  );
};

export default GlobalLabelListOflabelList;
