import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { RioButton } from '../button';

import { Contact } from '../../contacts';

@Component({
  selector: 'rio-contacts',
  template: `
      <div class="">
        {{ contacts$ | async }}
      </div>

      <rio-button (onClick)="increment.emit()">
        Add Contact
      </rio-button>
    </div>
  `,
  directives: [RioButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RioContacts {
  @Input() contacts$: Observable<Contact>;
};
