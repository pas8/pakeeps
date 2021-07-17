import { FC } from 'react';
import { NotificationMenuPropsType } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import { Grid, MenuItem, makeStyles, Menu, Typography, Box } from '@material-ui/core';
import { useAlpha } from 'hooks/useAlpha.hook';
import HeaderMenuContainer from 'components/Header/components/MenuContainer';
import { getNotificationArr } from 'store/modules/App/selectors';

const NotificationMenu: FC<NotificationMenuPropsType> = ({ id, onClose, customColor, mouseX: left, mouseY: top }) => {
  const arr = useSelector(getNotificationArr);
  return (
    <HeaderMenuContainer
      coordinates={{ top, left }}
      onClose={onClose}
      arr={arr}
      componentWhenArrIsEmpty={
        <Box padding={1} maxWidth={200}>
          <Typography color={'textSecondary'}>{'You dont have any notification, but u will have nice day)'} </Typography>{' '}
        </Box>
      }
    />
  );
};

export default NotificationMenu;
