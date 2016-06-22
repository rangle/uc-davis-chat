import { combineReducers } from 'redux';
import { Session, sessionReducer } from './session';
import { ContactsState, contactsReducer } from './contacts.reducer';

export interface IAppState {
  contacts?: ContactsState;
  session?: Session;
};

export default combineReducers<IAppState>({
  contacts: contactsReducer,
  session: sessionReducer,
});
