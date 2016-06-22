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

import {
  RioForm,
  RioFormError,
  RioFormGroup,
  RioLabel
} from '../form';
import { RioAlert } from '../alert';
import { RioButton } from '../button';
import { RioInput } from '../form/input';
import { Contact, Presence } from '../../contacts';
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
    RioLabel
  ],
  template: `
    <rio-form [formModel]="group" (submit)="onSubmit()">
      <rio-alert qaid="qa-pending" status='info' *ngIf="pending">
        Adding contact&hellip;
      </rio-alert>
      <rio-alert *ngIf="failure" qaid="qa-alert" status='error'>
        {{failure || 'Failed to add this contact'}}
      </rio-alert>

      <rio-form-group>
        <rio-label qaid="qa-name-label">Name</rio-label>
        <rio-input
          qaid="qa-name-label"
          inputType="text"
          placeholder="Full name (eg James Bond)"
          [formControl]="name">
        </rio-input>
      </rio-form-group>

      <rio-form-group>
        <rio-label qaid="qa-uname-label">Email</rio-label>
        <rio-input
          qaid="qa-uname-input"
          inputType='text'
          placeholder='Email address'
          [formControl]="username"></rio-input>
        <rio-form-error
          qaid="qa-uname-validation"
          [visible]="username.touched && username.valid === false">
          Please enter a valid email address
        </rio-form-error>
      </rio-form-group>

      <rio-form-group>
        <rio-button
          qaid="qa-login-button"
          [disabled]="username.valid === false"
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
  @Input() pending: boolean;
  @Input() failure: string;

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() add: EventEmitter<Contact> = new EventEmitter<Contact>();

  private name: Control;
  private username: Control;
  private group: ControlGroup;

  constructor(private builder: FormBuilder) {
    this.name = new Control(null);

    this.username = new Control(null,
      Validators.compose([
        Validators.required,
        validateEmail
      ]));

    this.pending = false;

    this.group = this.builder.group({
      name: this.name,
      username: this.username,
    });
  }

  private onSubmit = () => {
    const contact: Contact = fromJS({
      name: this.name.value,
      username: this.username.value,
      presence: Presence.Offline,
      typing: false
    });

    this.add.emit(contact);
  }

  private onCancel = () => {
    this.cancel.emit(void 0);
  }
};
