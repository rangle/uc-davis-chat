import { ContactsActions } from '../actions/contacts';
import { SessionActions } from '../actions/session';
import { Contact } from '../contacts';

import { Map, fromJS } from 'immutable';

const INITIAL_STATE = fromJS({});

export type Contacts = Map<string, Contact>;

export function contactsReducer(state: Contacts = INITIAL_STATE, action) {
  switch (action.type) {
  case SessionActions.LOGOUT_USER:
    return state.merge(INITIAL_STATE);

  default:
    return state;
  }
}
