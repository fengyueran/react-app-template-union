import { combineReducers } from 'redux-immutable';
import appState from '../../reducers/appReducer';

const reducers = {
  appState,
};

const rootReducer = combineReducers(reducers);

export { reducers, rootReducer };
