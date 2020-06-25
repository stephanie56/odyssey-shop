import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/models/Category';

@Component({
  selector: 'os-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent implements OnInit {
  constructor(private route: ActivatedRoute, private categoryService: CategoryService) {}

  categoryObs$: Observable<Category>;

  categoryId$: Observable<string> = this.route.params.pipe(
    map((p) => p.id),
    shareReplay(1)
  );

  ngOnInit() {
    this.categoryObs$ = this.categoryId$.pipe(
      switchMap((id) => this.categoryService.getCategoryById(id)),
      shareReplay(1)
    );
  }
}
