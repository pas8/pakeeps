import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './modules';

let configureStore = {};

const combinecRedusers = combineReducers({ ...reducers });
if (process.env.NODE_ENV === 'production') {
  configureStore = createStore(combinecRedusers,  compose(applyMiddleware(thunkMiddleware)));
} else {
  configureStore = createStore(combinecRedusers, composeWithDevTools(applyMiddleware(thunkMiddleware)));
}

export default configureStore;
