import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Grid, makeStyles } from '@material-ui/core';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import { getNotifinationCounterValue } from 'store/modules/App/selectors';
import { useFindNotificationArr } from 'hooks/useFindNotificationArr.hook';
import { toChangeTemporaryData } from 'store/modules/App/actions';
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
  const dispatch = useDispatch();

  const notifinationCounterValue = useSelector(getNotifinationCounterValue);


useSetNotificationArr()

  return (
    <Grid container justify={'center'} alignItems={'center'} className={container}>
      <Badge badgeContent={notifinationCounterValue} color={'secondary'}>
        <NotificationsNoneOutlinedIcon />
      </Badge>
    </Grid>
  );
};

export default NoticationButton;
