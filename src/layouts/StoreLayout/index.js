import PropTypes from 'prop-types';
import { Provider as ReduxProvider } from 'react-redux';
import store from 'store';

const StoreLayout = ({ children }) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

StoreLayout.propTypes = {
  chilren: PropTypes.any
};

export default StoreLayout;
