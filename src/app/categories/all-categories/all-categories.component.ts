import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/models/Category';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'os-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllCategoriesComponent implements OnInit {
  constructor(private categoryService: CategoryService) {}

  categoryObs$: Observable<Category[]>;

  ngOnInit() {
    this.categoryObs$ = this.categoryService.getCategories().pipe(shareReplay(1));
  }
}
