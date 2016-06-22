import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../reducers';

@Injectable()
export class ContactsActions {
  constructor(private ngRedux: NgRedux<IAppState>) {}
}
