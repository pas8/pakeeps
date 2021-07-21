import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Grid, makeStyles } from '@material-ui/core';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import { getIsZenModeActive, getNotifinationCounterValue } from 'store/modules/App/selectors';
import { useSetNotificationArr } from 'hooks/useSetNotificationArr.hook';

const useStyles = makeStyles(({ spacing, palette }) => ({
  container: {
    '& .MuiBadge-badge': {
      top: 8,
      right: 8
    }
  }
}));

const NoticationButton: FC = () => {
  const { container } = useStyles();

  const notifinationCounterValue = useSelector(getNotifinationCounterValue);
  const isZenModeActive = useSelector(getIsZenModeActive);

  useSetNotificationArr();

  return (
    <Grid container justify={'center'} alignItems={'center'} className={container}>
      <Badge badgeContent={notifinationCounterValue} color={'secondary'} >
        <NotificationsNoneOutlinedIcon />
      </Badge>
    </Grid>
  );
};

export default NoticationButton;
