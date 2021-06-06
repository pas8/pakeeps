import { Grid, makeStyles } from '@material-ui/core';
import { Events } from 'components/PakeepList/components/PakeepElement';
import PropTypes from 'prop-types';
import AddDateToPakeep from '../AddDateToPakeep';

const WrapperOfAddDateToPakeep = ({ ...props }) => {
  return <Events.Consumer>{({ events }) => <AddDateToPakeep {...props} events={events} />}</Events.Consumer>;
};

WrapperOfAddDateToPakeep.propTypes = {};

export default WrapperOfAddDateToPakeep;
