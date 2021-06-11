import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { LayoutChildrenType } from 'models/interfaces';

const DateLayout = ({ children }: LayoutChildrenType) => {
  return <MuiPickersUtilsProvider utils={DateFnsUtils}>{children}</MuiPickersUtilsProvider>;
};


export default DateLayout;
