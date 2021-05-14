import { combineReducers } from 'redux';
import * as reducers from './modules';

export default () => combineReducers({ ...reducers });