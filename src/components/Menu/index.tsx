import { makeStyles, Menu, MenuProps, Grid } from '@material-ui/core';
import { colord } from 'colord';
import { UseStylesCustomColorType } from 'models/types';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getIsMenuHaveGitHubView } from 'store/modules/Color/selectors';

const useStyles = makeStyles(({ spacing, breakpoints, palette: { secondary, background }, shadows }) => ({
  tringle: ({ customColor, isMenuHaveGitHubView }: UseStylesCustomColorType & any) => {
    const unit = 16;

    const color = colord(customColor.isUseDefault ? background.paper : customColor.bgHover)
      .lighten(0.02)
      .toHex();

    return {
      position: 'absolute',
      zIndex: -1,
      top: -(unit * 0.42),
      boxShadow: shadows[16],
      left: unit * 0.42,
      borderRadius: 2,
      transform: 'rotate(45deg)',
      width: unit * 2,
      // border:'1px solid white',
      height: unit * 2,
      background: color
      // boxShadow:'inset 0px 0px 1px 2px white'
    };
  },
  '@global': {
    '.MuiMenu-paper': ({ customColor }: UseStylesCustomColorType & any) => ({
      background: customColor.isUseDefault ? '' : customColor.bgHover
    })
  }
}));

const MenuByPas: FC<MenuProps & UseStylesCustomColorType> = ({ children, customColor, ...props }) => {
  const isMenuHaveGitHubView = useSelector(getIsMenuHaveGitHubView);
  const classes = useStyles({ customColor, isMenuHaveGitHubView });

  const menuProps = isMenuHaveGitHubView
    ? ({
        ...props,
        style: { marginTop: 42 + 8 },
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'center'
        }
      } as const)
    : props;

  return (
    <Menu {...menuProps}>
      {children}
      {isMenuHaveGitHubView && <Grid className={classes.tringle}></Grid>}
    </Menu>
  );
};

export default MenuByPas;
