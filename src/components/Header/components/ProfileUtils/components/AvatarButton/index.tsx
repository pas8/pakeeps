import { IconButton, makeStyles } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { FC } from 'react';

const useStyles = makeStyles(theme => ({}));

const AvatarButton: FC = () => {
  const classes = useStyles();

  return (
    <IconButton edge={'end'} aria-label={'account of current user'} aria-haspopup={'true'} color={'inherit'}>
      <AccountCircleOutlinedIcon />
    </IconButton>
  );
};

export default AvatarButton;
