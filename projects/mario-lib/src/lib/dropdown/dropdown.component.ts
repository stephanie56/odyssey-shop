import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ma-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent {
  @Output() selectedQuantity = new EventEmitter<number>();

  selected = 1;

  items = [
    { value: 1, viewValue: '1' },
    { value: 2, viewValue: '2' },
    { value: 3, viewValue: '3' }
  ];

  constructor() {}

  onSelectQuantity(event) {
    this.selectedQuantity.emit(event.value);
  }
}
