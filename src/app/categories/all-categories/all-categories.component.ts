import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'os-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllCategoriesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
