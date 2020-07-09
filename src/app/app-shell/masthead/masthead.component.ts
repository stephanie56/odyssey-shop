import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/models/Category';
import { shareReplay } from 'rxjs/operators';
import { AuthState } from 'src/app/auth/store/auth.reducer';
import { Store } from '@ngrx/store';
import { selectUserName } from 'src/app/auth/store/auth.selectors';

@Component({
  selector: 'os-masthead',
  templateUrl: './masthead.component.html',
  styleUrls: ['./masthead.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MastheadComponent implements OnInit {
  title = 'Mario Odyssey Shop';
  categoryObs$: Observable<Category[]>;
  userName$: Observable<string>;

  constructor(private categoryService: CategoryService, private store: Store<AuthState>) {}

  ngOnInit() {
    this.categoryObs$ = this.categoryService.getCategories().pipe(shareReplay(1));
    this.userName$ = this.store.select(selectUserName);
  }
}
