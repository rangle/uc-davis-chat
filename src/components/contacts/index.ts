import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { select } from 'ng2-redux';

import { Map } from 'immutable';

import { Observable } from 'rxjs/Observable';

import { RioAddContactForm } from './add-contact-form';
import { RioButton } from '../button';
import {
  RioModal,
  RioModalContent
} from '../modal';
import {
  Contact,
  Presence
} from '../../contacts';
import { Contacts } from '../../reducers/contacts';

@Component({
  selector: 'rio-contacts',
  template: `
    <div>
      <ul>
        <li *ngFor="let contact of people$ | async">
          <div class="presence"
            [ngClass]="{
              'idle': contact.presence === presence.Idle,
              'online': contact.presence === presence.Online,
              'offline': contact.presence === presence.Offline
            }">
          </div>
          {{contact.username}}
        </li>
      </ul>

      <rio-button (onClick)="onAddContact()">
        Add Contact
      </rio-button>

      <rio-modal *ngIf="addingContact$ | async">
        <rio-modal-content>
          <rio-add-contact-form
            [pending]="addPending$ | async"
            [failure]="addFailure$ | async"
            (cancel)="onCancel()"
            (add)="onAdd($event)">
          </rio-add-contact-form>
        </rio-modal-content>
      </rio-modal>
    </div>
  `,
  directives: [
    RioButton,
    RioModal,
    RioModalContent,
    RioAddContactForm
  ],
  pipes: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RioContacts {
  @select() contacts$: Observable<Contacts>;

  @Output() add: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() request: EventEmitter<Contact> = new EventEmitter<Contact>();

  private presence = Presence;

  private people$: Observable<Contact>;
  private addingContact$: Observable<boolean>;
  private addPending$: Observable<boolean>;
  private addFailure$: Observable<string>;

  constructor() {
    this.people$ = this.contacts$.map(c => c.get('people'));

    const add = this.contacts$.map(c => c.get('add'));

    this.addingContact$ = add.map(c => c.get('modal'));
    this.addPending$ = add.map(c => c.get('pending'));
    this.addFailure$ = add.map(c => c.get('failure'));
  }

  private onAddContact = () => {
    this.add.emit(void 0);
  }

  private onAdd = (contact: Contact) => {
    this.request.emit(contact);
  }

  private onCancel = () => {
    this.cancel.emit(void 0);
  }
};
