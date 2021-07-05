import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './modules';

const store = createStore(combineReducers({ ...reducers }), composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;
