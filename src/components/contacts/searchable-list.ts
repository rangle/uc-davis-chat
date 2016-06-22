import { Component, Input } from '@angular/core';
import { Control } from '@angular/common';

import { List } from 'immutable';

import { RioInput } from '../form/input';
import { FilteredPipe } from './filtered.pipe';
import { Contact } from '../../contacts';

@Component({
  selector: 'rio-searchable-list',
  template: require('./searchable-list.tmpl.html'),
  styles: [require('./searchable-list.css')],
  directives: [RioInput],
  pipes: [FilteredPipe]
})
export class RioSearchableList {
  @Input() private list: List<Contact>;

  private search = new Control(null);
}
