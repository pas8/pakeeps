import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import createRootReducer from './reducers';


const store = createStore(createRootReducer(), composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;
