import { provide, ReflectiveInjector } from '@angular/core';
import { MockBackend } from '@angular/http/testing';
import {
  fakeAsync,
  inject,
  it,
  describe,
  tick
} from '@angular/core/testing';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Headers,
  Http,
  Response,
  ResponseType
} from '@angular/http';

import { AuthService } from './index';

