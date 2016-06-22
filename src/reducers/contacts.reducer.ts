// import { } from '../actions/contacts.actions';

export enum Presence {
  Online,
  Idle,
  Offline,
}

export interface ContactState {
  name: string;
  username: string;
  presence: Presence;
  lastSeen: Date;
}


export interface ContactsState {
  [key: string]: ContactState; 
}

const INITIAL_STATE: ContactsState = { 
  'michael@me.com': {
    name: 'Michael',
    username: 'michael@me.com',
    presence: Presence.Offline,
    lastSeen: new Date(),
  },
  'chris@me.com': {
    name: 'Chris',
    username: 'chris@me.com',
    presence: Presence.Offline,
    lastSeen: new Date(),
  },
};

export function contactsReducer(
  state: ContactsState = INITIAL_STATE,
  action: any = {type: ''}) {

  return state;
}
