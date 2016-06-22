import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';

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

@Component({
  selector: 'rio-contacts',
  template: `
    <div>
      <ul>
        <li *ngFor="let contact of contacts$ | async">
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
            [isPending]="isPending"
            [hasError]="hasError"
            (onSubmit)="onSubmitAdd($event)">
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
  @Input() contacts$: Observable<Contact>;
  @Input() addingContact$: Observable<boolean>;

  @Output() addContact: EventEmitter<void> = new EventEmitter<void>();

  private presence = Presence;

  private onAddContact() {
    this.addContact.emit(void 0);
  }

  private onSubmitAdd(contact: Contact) {
  }
};
