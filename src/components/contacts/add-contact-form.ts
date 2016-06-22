import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  FORM_DIRECTIVES,
  FormBuilder,
  ControlGroup,
  Control,
  Validators
} from '@angular/common';

import { fromJS } from 'immutable';

import { Observable } from 'rxjs';

import {
  RioForm,
  RioFormError,
  RioFormGroup,
  RioLabel,
} from '../form';
import { RioAlert } from '../alert';
import { RioButton } from '../button';
import { RioInput } from '../form/input';
import { RioSearchableList } from './searchable-list';
import { AddContactState, Contact, Presence } from '../../contacts';
import { validateEmail } from '../form/validators';

@Component({
  selector: 'rio-add-contact-form',
  directives: [
    FORM_DIRECTIVES,
    RioAlert,
    RioButton,
    RioInput,
    RioForm,
    RioFormError,
    RioFormGroup,
    RioLabel,
    RioSearchableList,
  ],
  template: `
    <rio-form [formModel]="group">
      <div [ngSwitch]="state">
        <rio-alert *ngSwitchWhen="addContactState.Failed" status="error">
          Request failed
        </rio-alert>
        <rio-alert *ngSwitchWhen="addContactState.Loading" status="info">
          Loading contacts&hellip;
        </rio-alert>
        <rio-alert *ngSwitchWhen="addContactState.Adding" status="info">
          Adding contact&hellip;
        </rio-alert>
      </div>

      <rio-searchable-list [list]="availablePeople$">
      </rio-searchable-list>

      <rio-form-group>
        <rio-button
          qaid="qa-add-button"
          [disabled]="selected != null"
          className="btn btn-primary mr1"
          type="submit">
          Add to Contacts
        </rio-button>
        <rio-button
          qaid="qa-cancel-button"
          className="btn bg-red"
          (onClick)="onCancel()">
          Cancel
        </rio-button>
      </rio-form-group>
    </rio-form>
  `
})
export class RioAddContactForm {
  @Input() state: AddContactState;

  @Input() availablePeople$: Observable<Contact>;

  // Cancel and hide the modal
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  // Called when the user clicks the Add to Contacts button
  @Output() add: EventEmitter<Contact> = new EventEmitter<Contact>();

  private addContactState = AddContactState;

  private search: Control;

  private group: ControlGroup;

  constructor(private builder: FormBuilder) {
    this.search = new Control(null);

    this.group = this.builder.group({});
  }

  private onSubmit = () => {
    // const contact: Contact = fromJS({
    //   name: this.name.value,
    //   username: this.username.value,
    //   presence: Presence.Offline,
    //   typing: false
    // });

    // this.add.emit(contact);
  }

  private onCancel = () => {
    this.cancel.emit(void 0);
  }
};
