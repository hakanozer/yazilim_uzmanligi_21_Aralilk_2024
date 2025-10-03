import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-background-item',
  imports: [],
  template: `<div class="background-bg"></div>`,
  styleUrls: ['./background-item.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackgroundItem {

}
