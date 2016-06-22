export enum Presence {
  Offline,
  Idle,
  Online,
};

export interface Contact {
  username: string;
  presence: Presence;
  typing: boolean;
  lastMessage: Date;
}
