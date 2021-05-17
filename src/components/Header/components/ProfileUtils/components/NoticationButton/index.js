import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Badge, IconButton } from '@material-ui/core';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';

const NoticationButton = ({ notifinationCounter }) => (
  <IconButton aria-label={'Notifications'} color={'inherit'}>
    <Badge badgeContent={notifinationCounter} color={'secondary'}>
      <NotificationsNoneOutlinedIcon />
    </Badge>
  </IconButton>
);

NoticationButton.propTypes = {
  notifinationCounter: PropTypes.number
};

const mapStateToProps = ({ app: { notifinationCounter } }) => ({ notifinationCounter });

export default connect(mapStateToProps, null)(NoticationButton);
