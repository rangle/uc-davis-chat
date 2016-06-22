import { Map } from 'immutable';

export enum Presence {
  Offline,
  Idle,
  Online,
};

export enum AddContactState {
  Idle,
  Loading,
  Adding,
  Failed
};

export type Contact = Map<string, any>;
