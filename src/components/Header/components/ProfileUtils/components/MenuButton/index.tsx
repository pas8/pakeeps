import { Grid } from '@material-ui/core';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import MenuOpenOutlinedIcon from '@material-ui/icons/MenuOpenOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import { menuOpenStatusDenotation } from 'models/denotation';
import { getMenuOpenStatus } from 'store/modules/App/selectors';

const MenuButton: FC = () => {
  const menuOpenStatus = useSelector(getMenuOpenStatus);
  const isFolderExtended = menuOpenStatus === menuOpenStatusDenotation.EXTENDED;

  return (
    <Grid container justify={'center'} alignItems={'center'}>
      {isFolderExtended ? <MenuOpenOutlinedIcon /> : <MenuIcon />}
    </Grid>
  );
};

export default MenuButton;
