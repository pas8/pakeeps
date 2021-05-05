import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import AppReducer from './AppReducer';
import ColorReducer from './ColorReducer';

const reducers = combineReducers({ app: AppReducer,color:ColorReducer });

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;
