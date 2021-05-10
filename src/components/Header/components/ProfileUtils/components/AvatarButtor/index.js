import { IconButton, makeStyles } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

const useStyles = makeStyles(theme => ({}));

const AvatarButtor = () => {
  const classes = useStyles();

  return (
    <IconButton edge={'end'} aria-label={'account of current user'} aria-haspopup={'true'} color={'inherit'}>
      <AccountCircleOutlinedIcon />
    </IconButton>
  );
};

AvatarButtor.propTypes = {};

export default AvatarButtor;
