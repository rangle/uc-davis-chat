import { combineReducers } from 'redux';
import { Session, sessionReducer } from './session';

export interface IAppState {
  session?: Session;
};

export default combineReducers<IAppState>({
  session: sessionReducer
});
