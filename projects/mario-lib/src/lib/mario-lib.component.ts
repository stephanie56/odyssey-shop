import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ma-mario-lib',
  template: `
    <p>
      mario-lib works!
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarioLibComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
