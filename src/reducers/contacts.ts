import { ContactsActions } from '../actions/contacts';
import { SessionActions } from '../actions/session';
import { Contact } from '../contacts';

import { Map, fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  state: {
    addingContact: false,
  },
  people: {},
});

export type Contacts = Map<string, any>;

export function contactsReducer(state: Contacts = INITIAL_STATE, action) {
  switch (action.type) {
  case ContactsActions.ADD_CONTACT:
    return state.updateIn(['state', 'addingContact'], v => true);
  case ContactsActions.ADD_CONTACT_COMPLETE:
    return state.updateIn(['state', 'addingContact'], v => false);
  case SessionActions.LOGOUT_USER:
    return state.merge(INITIAL_STATE);
  default:
    return state;
  }
};
