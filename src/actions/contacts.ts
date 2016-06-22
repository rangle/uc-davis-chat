import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../reducers';
import { ServerService } from '../services/server';

@Injectable()
export class ContactsActions {
  public static ADD_CONTACT = 'ADD_CONTACT';
  public static ADD_CONTACT_COMPLETE = 'ADD_CONTACT_COMPLETE';
  public static ADD_CONTACT_ERROR = 'ADD_CONTACT_ERROR';

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private service: ServerService) {}

  addContact() {
    this.ngRedux.dispatch({ type: ContactsActions.ADD_CONTACT });
  }

  requestAddContact(username: string) {
    this.service.put('/contacts/add', username, {})
      .subscribe(
        next => this.ngRedux.dispatch({
          type: ContactsActions.ADD_CONTACT_COMPLETE
        }),
        err => this.ngRedux.dispatch({
          type: ContactsActions.ADD_CONTACT_ERROR,
          payload: err.message
        }));
  }
}
