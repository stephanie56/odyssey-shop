import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ma-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent implements OnInit {
  selected = '0';

  items = [
    { value: '0', viewValue: '0' },
    { value: '1', viewValue: '1' },
    { value: '2', viewValue: '2' }
  ];

  constructor() {}

  ngOnInit() {}
}
