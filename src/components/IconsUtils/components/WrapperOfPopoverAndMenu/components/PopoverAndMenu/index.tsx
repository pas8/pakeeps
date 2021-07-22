import { FC } from 'react';
import { Popover, Typography, Menu, makeStyles } from '@material-ui/core';
import { PopoverAndMenuType, UseStylesType } from './types';
import { sum, values } from 'lodash';

const useStyles = makeStyles(theme => ({
  paper: ({ customColor }: UseStylesType) => ({
    padding: theme.spacing(0.6, 0.8),
    background: !customColor?.isUseDefault ? customColor?.hover : '',
    color: !customColor?.isUseDefault ? customColor?.bgUnHover : ''
  }),
  popover: {
    pointerEvents: 'none'
  },
  menuContainer: ({ customColor }: UseStylesType) => ({
    '& > div': {
      backgroundColor: !customColor?.isUseDefault ? customColor?.hover : ''
    }
  })
}));

const PopoverAndMenu: FC<PopoverAndMenuType> = ({
  isMenuOpen,
  handlePopoverClose,
  isPopoverOpen,
  handleMenuClose,
  popoverText,
  menuComponentsProps,
  MenuComponents,
  reversedColor,
  currentTarget,
  cordinates,
  popoverTypographyVariant = 'subtitle2',
  customColor
}) => {
  if (!sum(values(cordinates))) return null;
  const classes = useStyles({ customColor });

  const defaultLocationOfPopoverToWitCentered = {
    anchorOrigin: {
      vertical: 'bottom' as 'bottom',
      horizontal: 'center' as 'center'
    },
    transformOrigin: {
      vertical: 'top' as 'top',
      horizontal: 'center' as 'center'
    }
  };
  const popoverProps = {
    ...defaultLocationOfPopoverToWitCentered,
    className: classes.popover,
    open: !!sum(values(cordinates)),
    classes: { paper: classes.paper },
    anchorEl: currentTarget,
    onClose: handlePopoverClose,
    disableRestoreFocus: true
  };
  const menuProps = {
    keepMounted: true,
    open: isMenuOpen!,
    onClose: handleMenuClose,
    className: classes.menuContainer
  };

  const allMenuComponentsProps = { ...menuComponentsProps, customColor };
  return (
    <>
      {currentTarget && isPopoverOpen && (
        <Popover {...popoverProps}>
          <Typography variant={popoverTypographyVariant}>{popoverText}</Typography>
        </Popover>
      )}

      {!!MenuComponents && (
        <Menu {...menuProps} anchorReference={'anchorPosition'} anchorPosition={cordinates} open>
          <MenuComponents {...allMenuComponentsProps} />
        </Menu>
      )}
    </>
  );
};

export default PopoverAndMenu;
