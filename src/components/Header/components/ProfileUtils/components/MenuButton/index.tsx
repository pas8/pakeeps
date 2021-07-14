import { Grid, IconButton } from '@material-ui/core';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuOpenOutlinedIcon from '@material-ui/icons/MenuOpenOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import { toChangeMenuOpenStatus } from 'store/modules/App/actions';
import { menuOpenStatusDenotation } from 'models/denotation';
import { getMenuOpenStatus } from 'store/modules/App/selectors';

const MenuButton: FC = () => {
  const dispatch = useDispatch();
  const menuOpenStatus = useSelector(getMenuOpenStatus);
  const isFolderExtended = menuOpenStatus === menuOpenStatusDenotation.EXTENDED;

  const handleChangeDrawerOpenStatus = () => {
    const menuOpenStatus = isFolderExtended ? menuOpenStatusDenotation.OPEN : menuOpenStatusDenotation.EXTENDED;
    dispatch(toChangeMenuOpenStatus({ menuOpenStatus }));
  };
  return (
    <Grid onClick={handleChangeDrawerOpenStatus} container justify={'center'} alignItems={'center'}>
      {isFolderExtended ? <MenuOpenOutlinedIcon /> : <MenuIcon />}
    </Grid>
  );
};

export default MenuButton;
