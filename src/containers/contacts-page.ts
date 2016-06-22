import {
  ApplicationRef,
  Component,
  Inject
} from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { Observable } from 'rxjs/Observable';

import { bindActionCreators } from 'redux';
import { select } from 'ng2-redux';

import { ContactsActions } from '../actions/contacts';
import { Contact } from '../contacts';
import {
  RioContainer,
  RioContacts
} from '../components';

@Component({
  selector: 'contacts-page',
  providers: [ ContactsActions ],
  directives: [ RioContainer, RioContacts ],
  pipes: [ AsyncPipe ],
  template: `
    <rio-container [size]=2 [center]=true>
      <h2 id="qa-contacts-heading" class="center caps">
        Contacts
      </h2>
      <rio-contacts [contacts$]="contacts$"></rio-contacts>
    </rio-container>
  `
})
export class RioContactsPage {
  @select(n => n.contacts) private contacts$: Observable<Contact>;

  constructor(private actions: ContactsActions) {}
}
