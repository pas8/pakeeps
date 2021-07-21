import { FC } from 'react';
import { useSelector } from 'react-redux';
import {  Typography, Box } from '@material-ui/core';
import HeaderMenuContainer from 'components/Header/components/MenuContainer';
import { getNotificationArr } from 'store/modules/App/selectors';
import { NotificationMenuPropsType } from './types';

const NotificationMenu: FC<NotificationMenuPropsType> = ({ id, onClose, customColor, mouseX: left, mouseY: top }) => {
  const arr = useSelector(getNotificationArr);
  return (
    <HeaderMenuContainer
      coordinates={{ top, left }}
      onClose={onClose}
      arr={arr}
      componentWhenArrIsEmpty={
        <Box padding={1} maxWidth={200}>
          <Typography color={'textSecondary'}>{'You dont have any notification, but u will have nice day)'} </Typography>
        </Box>
      }
    />
  );
};

export default NotificationMenu;
