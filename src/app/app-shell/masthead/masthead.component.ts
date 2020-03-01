import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'os-masthead',
  templateUrl: './masthead.component.html',
  styleUrls: ['./masthead.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MastheadComponent implements OnInit {
  title = 'Mario Odyssey Shop';

  constructor() {}

  ngOnInit(): void {}
}
