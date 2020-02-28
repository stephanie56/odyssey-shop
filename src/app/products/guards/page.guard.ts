import { Injectable } from '@angular/core';

import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http';

import { ProductsService } from '../services/products.service';

@Injectable({
  providedIn: 'root'
})
export class PageGuard implements CanActivate {
  constructor(private router: Router, private apiService: ProductsService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const id = route.params.id;
    return this.apiService.getProductById(id).pipe(
      map((res) => {
        if (res instanceof HttpErrorResponse) {
          this.router.navigateByUrl('/products');
          return false;
        }
        return true;
      }),
      catchError((error) => {
        return of(error);
      })
    );
  }
}
