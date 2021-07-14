import { FC } from 'react';
import { connect, useSelector } from 'react-redux';
import { Badge, Grid, IconButton } from '@material-ui/core';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import { getNotifinationCounterValue } from 'store/modules/App/selectors';

const NoticationButton: FC = () => {
  const notifinationCounterValue = useSelector(getNotifinationCounterValue);
  return (
    <Grid container justify={'center'} alignItems={'center'}>
      <Badge badgeContent={notifinationCounterValue} color={'secondary'}>
        <NotificationsNoneOutlinedIcon />
      </Badge>
    </Grid>
  );
};

export default NoticationButton;
