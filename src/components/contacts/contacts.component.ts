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
  @select(mapContacts) contacts$: Observable<ContactsState>;
}

function mapContacts(state) {
  return Object.keys(state.contacts)
    .map((contact) => state.contacts[contact].name);
}
