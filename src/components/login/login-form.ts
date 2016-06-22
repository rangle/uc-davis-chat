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

import {
  RioForm,
  RioFormError,
  RioFormGroup,
  RioLabel
} from '../form';
import { RioAlert } from '../alert';
import { RioButton } from '../button';
import { RioInput } from '../form/input';
import { validateEmail } from '../form/validators';

@Component({
  selector: 'rio-login-form',
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
    <rio-form
      [formModel]="group"
      (onSubmit)="handleSubmit()">
      <rio-alert qaid="qa-pending" status='info'
        *ngIf="isPending">Loading...</rio-alert>
      <rio-alert
        qaid="qa-alert"
        status='error'*ngIf="hasError">
        Invalid username and password
      </rio-alert>

      <rio-form-group>
        <rio-label qaid="qa-uname-label">Username</rio-label>
        <rio-input
          qaid="qa-uname-input"
          inputType='text'
          placeholder='Username'
          [formControl]="username"></rio-input>
        <rio-form-error
          qaid="qa-uname-validation"
          [visible]="showNameWarning()">
          Please enter a valid email address
        </rio-form-error>
      </rio-form-group>

      <rio-form-group>
        <rio-label qaid="qa-password-label">Password</rio-label>
        <rio-input
          qaid="qa-password-input"
          inputType='password'
          placeholder='Password'
          [formControl]="password"></rio-input>
        <rio-form-error
          qaid="qa-password-validation"
          [visible]="showPasswordWarning()">
          Password is required
        </rio-form-error>
      </rio-form-group>

      <rio-form-group>
        <rio-button
          qaid="qa-login-button"
          [disabled]="valid() === false"
          className="mr1"
          type="submit">
          Login
        </rio-button>
        <rio-button
          qaid="qa-clear-button"
          className="bg-red"
          (onClick)="reset()">
          Clear
        </rio-button>
      </rio-form-group>
    </rio-form>
  `
})
export class RioLoginForm {
  @Input() isPending: boolean;
  @Input() hasError: boolean;
  @Output() onSubmit: EventEmitter<Object> = new EventEmitter();
  private username: Control;
  private password: Control;
  private group: ControlGroup;

  constructor(private builder: FormBuilder) {
    this.reset();
  }

  private showNameWarning() {
    return this.username.touched && this.username.valid === false;
  }

  private showPasswordWarning() {
    return this.password.touched && this.password.valid === false;
  }

  private valid() {
    return this.username.valid && this.password.valid;
  }

  private handleSubmit() {
    this.password.markAsTouched();
    this.username.markAsTouched();

    if (this.password.value && this.username.value) {
      this.onSubmit.emit(this.group.value);
    }
  }

  private reset() {
    this.username = new Control('',
      Validators.compose([Validators.required, validateEmail]));

    this.password = new Control('', Validators.required);

    this.hasError = false;

    this.isPending = false;

    this.group = this.builder.group({
      username: this.username,
      password: this.password,
    });
  }
};
