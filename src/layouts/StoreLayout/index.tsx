import { LayoutChildrenType } from 'models/types';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider } from 'react-redux';
import store from 'store';

const StoreLayout = ({ children }: LayoutChildrenType) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};


export default StoreLayout;
