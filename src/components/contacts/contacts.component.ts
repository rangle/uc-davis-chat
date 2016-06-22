import { Component } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Rx';
import { ContactsState } from '../../reducers/contacts.reducer';

@Component({
  selector: 'rio-contacts',
  template: `
    <h2>Contacts</h2>
    <ul>
      <li *ngFor="let name of (contacts$ | async)">
        {{ name }}
      </li> 
    </ul>
  `,
})
export class RioContactsList {
  @select(state => mapContacts(state.contacts)) contacts$: Observable<ContactsState>;
  keys = Object.keys;
  
}

function mapContacts(contacts) {
  return Object.keys(contacts)
    .map((contact) => contacts[contact].name);
}
