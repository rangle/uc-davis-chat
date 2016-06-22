import { Map } from 'immutable';

export enum Presence {
  Offline,
  Idle,
  Online,
};

export type Contact = Map<string, any>;
