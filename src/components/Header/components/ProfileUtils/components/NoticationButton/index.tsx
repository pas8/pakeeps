import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Badge, Grid, makeStyles } from '@material-ui/core';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import { getNotifinationCounterValue } from 'store/modules/App/selectors';

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

  return (
    <Grid container justify={'center'} alignItems={'center'} className={container}>
      <Badge badgeContent={notifinationCounterValue} color={'secondary'}>
        <NotificationsNoneOutlinedIcon />
      </Badge>
    </Grid>
  );
};

export default NoticationButton;
