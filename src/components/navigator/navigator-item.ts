import { Input, Component } from '@angular/core';

@Component({
  selector: 'rio-navigator-item',
  template: `
    <div
      class="truncate"
      [ngClass]="{
        mr2: mr,
        ml2: ml
      }">
      <ng-content></ng-content>
    </div>
  `
})
export class RioNavigatorItem {
  @Input() mr = false;
  @Input() ml = false;
};
