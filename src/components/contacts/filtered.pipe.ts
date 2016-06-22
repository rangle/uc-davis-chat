import { Pipe, PipeTransform } from '@angular/core';

import { Contact } from '../../contacts';

@Pipe({ name: 'filtered' })
export class FilteredPipe implements PipeTransform {
  transform(contacts: Contact[], search: string) {
    if (contacts == null ||
        contacts.length === 0 ||
        search == null ||
        search.length === 0) {
      return contacts;
    }

    const match = (element, f) => {
      const value = f(element);
      if (value == null || value.length === 0) {
        return true;
      }

      return value.toLowerCase().indexOf(search.toLowerCase()) >= 0;
    };

    return contacts.filter(e =>
      match(e, c => c.name) ||
      match(e, c => c.username));
  }
}
