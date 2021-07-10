import { Grid, Menu, makeStyles } from '@material-ui/core';
import { FC, useState } from 'react';
import HeaderOfAddDateToPakeep from 'components/IconsUtils/components/AddDateToPakeep/components/HeaderOfAddDateToPakeep';
import DynamicMenuItem from 'components/IconsUtils/components/AddDateToPakeep/components/DynamicMenuItem';
import { useGetReversedCustomColor } from 'hooks/useGetReversedCustomColor.hook';
import { MenuOfChangingGlobalAttributeItemPropsType, UseStylesOfMenuOfChangingGlobalAttributeItemType } from './types';

const useStyles = makeStyles(({ spacing }) => ({
  wrapper: ({ customColor }: UseStylesOfMenuOfChangingGlobalAttributeItemType) => {
    return {
      padding: spacing(0, 0, 0, 0),
      background: !customColor?.isUseDefault ? customColor?.bgHover : ''
    };
  }
}));

const MenuOfChangingGlobalAttributeItem: FC<MenuOfChangingGlobalAttributeItemPropsType> = ({
  customColor,
  menuItemsArr,
  onClose,
  onSave,
  customTitle,
  top,
  left
}) => {
  const classes = useStyles({ customColor });

  const reversedCustomColor = useGetReversedCustomColor(customColor, true);

  const nullifyOfMenuItemState = { name: '' };
  const [menuItemState, setMenuItemState] = useState(nullifyOfMenuItemState);

  const headerOfAddDateToPakeepProps = {
    arrowButtonFunc: onClose,
    isSaveButtonHidden: false,
    onClickOfSaveButton: onSave,
    customColor,
    customTitle
  };

  return (
    <Menu
      keepMounted
      open={true}
      onClose={onClose}
      anchorReference={'anchorPosition'}
      anchorPosition={!!top && !!left ? { top, left } : undefined}
    >
      <Grid className={classes.wrapper}>
        <HeaderOfAddDateToPakeep {...headerOfAddDateToPakeepProps} />

        {menuItemsArr.map(({ title, icon: Icon, onClick: onMenuItemClick, dynamicComponent = {}, name }, idx) => {
          const DynamicComponent = dynamicComponent?.component ?? Grid;

          const correctName = name === menuItemState.name;
          const isDynamicComponentShouldBeShown = correctName && dynamicComponent.component;
          const dynamicComponentProps = { customColor: reversedCustomColor, ...dynamicComponent.props };

          const onClick = () => (onMenuItemClick ? onMenuItemClick() : setMenuItemState(state => ({ ...state, name })));

          const dynamicItemProps = { onClick };

          const DynamicMenuItemProps = {
            DynamicComponent,
            dynamicComponentProps,
            isActiveIcon: false,
            title,
            isDynamicItemGridMarginIsZero: true,
            isDynamicComponentShouldBeShown,
            dynamicItemProps,
            isPreventClickOfMenuItem: false,
            //@ts-ignore
            icon: <Icon />,
            customColor
          };
          //@ts-ignore
          return <DynamicMenuItem {...DynamicMenuItemProps} key={`menuLabelListArr-${name}-${idx}`} />;
        })}
      </Grid>
    </Menu>
  );
};

export default MenuOfChangingGlobalAttributeItem;
