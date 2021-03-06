import {
  async,
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder }
  from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { RioLoginForm } from './index';

describe('Component: Login Form', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [RioLoginForm]);
  beforeEach(inject([TestComponentBuilder],
    function (tcb: TestComponentBuilder) {
      builder = tcb;
    })
  );

  it('should inject the component', inject([RioLoginForm],
    (component: RioLoginForm) => {
      expect(component).toBeTruthy();
  }));


  it('should create the component', async(inject([], () => {
    return builder.createAsync(RioLoginForm)
      .then((fixture: ComponentFixture<any>) => {
        fixture.detectChanges();
        let element = fixture.nativeElement;
        expect(element.querySelector('#qa-pending-alert')).toBeNull();
        expect(element.querySelector('#qa-alert')).toBeNull();
        expect(element.querySelector('#qa-uname-input')).not.toBeNull();
        expect(element.querySelector('#qa-uname-validation').className)
          .toContain('display-none');
        expect(element.querySelector('#qa-password-input')).not.toBeNull();
        expect(element.querySelector('#qa-password-validation').className)
          .toContain('display-none');
        expect(element.querySelector('#qa-login-button')).not.toBeNull();
        expect(element.querySelector('#qa-clear-button')).not.toBeNull();
        expect(fixture.componentInstance.submit).toBeTruthy();
      });
  })));

  it('should display alert if the form failed', async(inject([], () => {
    return builder.createAsync(RioLoginForm)
      .then((fixture: ComponentFixture<any>) => {
        fixture.componentInstance.failure = true;
        fixture.autoDetectChanges();
        let alert = fixture.nativeElement.querySelector('#qa-alert');
        expect(alert).not.toBeNull();
        expect(alert.innerText).toEqual('Invalid username and password');
      });
  })));

  it('should display alert if the form pending', async(inject([], () => {
    return builder.createAsync(RioLoginForm)
      .then((fixture: ComponentFixture<any>) => {
        fixture.componentInstance.pending = true;
        fixture.autoDetectChanges();
        let alert = fixture.nativeElement.querySelector('#qa-pending');
        expect(alert).not.toBeNull();
        expect(alert.innerText).toEqual('Loading...');
      });
  })));

  it('should display name warning for invalid username',
    async(inject([], () => {
      return builder.createAsync(RioLoginForm)
        .then((fixture: ComponentFixture<any>) => {
          fixture.componentInstance.username._touched = true;
          fixture.componentInstance.username._valid = false;
          fixture.autoDetectChanges();
          let alert = fixture.nativeElement.
            querySelector('#qa-uname-validation');
          expect(alert).not.toBeNull();
          expect(alert.innerText).toEqual('Please enter a valid email address');
        });
      })
  ));

  it('should display password warning for invalid password',
    async(inject([], () => {
      return builder.createAsync(RioLoginForm)
        .then((fixture: ComponentFixture<any>) => {
          fixture.componentInstance.password._touched = true;
          fixture.componentInstance.password._valid = false;
          fixture.autoDetectChanges();
          let alert = fixture.nativeElement.
            querySelector('#qa-password-validation');
          expect(alert).not.toBeNull();
          expect(alert.innerText).toEqual('Password is required');
        });
      })
  ));

  it('should emit an event when the login button is clicked',
    async(inject([], () => {
      return builder.createAsync(RioLoginForm)
        .then((fixture: ComponentFixture<any>) => {
          fixture.componentInstance.username._value = 'user';
          fixture.componentInstance.password._value = 'pass';
          fixture.autoDetectChanges();
          fixture.componentInstance.submit.subscribe(data => {
            expect(data).toBeDefined();
            expect(data.username).toEqual('user');
            expect(data.password).toEqual('pass');
          });
          let button = fixture.nativeElement.querySelector('#qa-login-button');
          button.click();
        });
    }))
  );


});
