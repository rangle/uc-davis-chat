import { ContactsActions } from '../actions/contacts';
import { SessionActions } from '../actions/session';
import { Contact } from '../contacts';

import { Map, fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  add: {
    modal: false,
    pending: false,
    failure: null
  },
  people: []
});

export type Contacts = Map<string, any>;

export function contactsReducer(state: Contacts = INITIAL_STATE, action) {
  switch (action.type) {
  case ContactsActions.ADD_CONTACT:
    return state.mergeIn(['add'],
      { modal: true, pending: false, failure: null });
  case ContactsActions.ADD_CONTACT_PENDING:
    return state.mergeIn(['add'], { pending: true, failure: null });
  case ContactsActions.ADD_CONTACT_CANCEL:
    return state.mergeIn(['add'], { modal: false, pending: false });
  case ContactsActions.ADD_CONTACT_COMPLETE:
    return state
             .mergeIn(['add'], { modal: false, pending: false })
             .get('people')
             .push(action.payload);
  case ContactsActions.ADD_CONTACT_ERROR:
    return state.mergeIn(['add'], { failure: action.payload, pending: false });
  case SessionActions.LOGOUT_USER:
    return state.merge(INITIAL_STATE);
  default:
    return state;
  }
};
