import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/models/Category';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'os-masthead',
  templateUrl: './masthead.component.html',
  styleUrls: ['./masthead.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MastheadComponent implements OnInit {
  title = 'Mario Odyssey Shop';
  categoryObs$: Observable<Category[]>;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryObs$ = this.categoryService.getCategories().pipe(shareReplay(1));
  }
}
