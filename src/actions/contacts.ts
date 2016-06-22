import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../reducers';
import { ServerService } from '../services/server';
import { Contact } from '../contacts';

@Injectable()
export class ContactsActions {
  static ADD_CONTACT = 'ADD_CONTACT';
  static ADD_CONTACT_CANCEL = 'ADD_CONTACT_CANCEL';
  static ADD_CONTACT_COMPLETE = 'ADD_CONTACT_COMPLETE';
  static ADD_CONTACT_PENDING = 'ADD_CONTACT_PENDING';
  static ADD_CONTACT_ERROR = 'ADD_CONTACT_ERROR';
  static REQUEST_AVAILABLE_CONTACTS = 'REQUEST_AVAILABLE_CONTACTS';
  static LIST_AVAILABLE_CONTACTS = 'LIST_AVAILABLE_CONTACTS';
  static LIST_AVAILABLE_CONTACTS_FAILED = 'LIST_AVAILABLE_CONTACTS_FAILED';

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private service: ServerService) {}

  showAdd() {
    this.ngRedux.dispatch({ type: ContactsActions.ADD_CONTACT });

    this.list();
  }

  cancel() {
    this.ngRedux.dispatch({ type: ContactsActions.ADD_CONTACT_CANCEL });
  }

  add(contact: Contact) {
    this.ngRedux.dispatch({
      type: ContactsActions.ADD_CONTACT_PENDING,
    });

    const c = contact.toJS();

    const body = JSON.stringify(c);

    const promise = new Promise((resolve, reject) => {
      this.service.put('/contacts/add', c.username, body)
        .subscribe(
          next => resolve(contact),
          err => reject(err.message || 'Failed to add contact'));
    });

    return promise.then(
      () => this.ngRedux.dispatch({
        type: ContactsActions.ADD_CONTACT_COMPLETE,
        payload: contact
      }),
      err => this.ngRedux.dispatch({
        type: ContactsActions.ADD_CONTACT_ERROR,
        payload: err
      }));
  }

  list() {
    this.ngRedux.dispatch({ type: ContactsActions.REQUEST_AVAILABLE_CONTACTS });

    const promise = new Promise((resolve, reject) => {
      this.service.get('/contacts/list')
        .subscribe(next => resolve(next), err => reject(err));
    });

    return promise.then(
      contacts => this.ngRedux.dispatch({
        type: ContactsActions.LIST_AVAILABLE_CONTACTS,
        payload: contacts
      }),
      err => this.ngRedux.dispatch({
        type: ContactsActions.LIST_AVAILABLE_CONTACTS_FAILED
      }));
  }
}
