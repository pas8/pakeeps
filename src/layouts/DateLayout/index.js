import { Grid, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const DateLayout = ({ children }) => {
  return <MuiPickersUtilsProvider utils={DateFnsUtils}>{children}</MuiPickersUtilsProvider>;
};

DateLayout.propTypes = {
  chilren: PropTypes.any
}

export default DateLayout;
