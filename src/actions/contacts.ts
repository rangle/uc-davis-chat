import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../reducers';
import { ServerService } from '../services/server';
import { Contact } from '../contacts';

@Injectable()
export class ContactsActions {
  public static ADD_CONTACT = 'ADD_CONTACT';
  public static ADD_CONTACT_CANCEL = 'ADD_CONTACT_CANCEL';
  public static ADD_CONTACT_COMPLETE = 'ADD_CONTACT_COMPLETE';
  public static ADD_CONTACT_PENDING = 'ADD_CONTACT_PENDING';
  public static ADD_CONTACT_ERROR = 'ADD_CONTACT_ERROR';

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private service: ServerService) {}

  add() {
    this.ngRedux.dispatch({ type: ContactsActions.ADD_CONTACT });
  }

  cancel() {
    this.ngRedux.dispatch({ type: ContactsActions.ADD_CONTACT_CANCEL });
  }

  request(contact: Contact) {
    this.ngRedux.dispatch({
      type: ContactsActions.ADD_CONTACT_PENDING,
    });

    const c = contact.toJS();

    const promise = new Promise((resolve, reject) => {
      this.service.put('/contacts/add', c.username, {})
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
}
