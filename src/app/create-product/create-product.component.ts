import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, switchMap, map, finalize, shareReplay } from 'rxjs/operators';
import { ProductAdminService } from './services/product-admin.service';
import { UPLOAD_IMAGE_BASE_URL } from '../shared/services/api/api-urls';
import { Category } from '../shared/models/Category';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'os-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProductComponent implements OnInit, OnDestroy {
  createProductStatus$ = new BehaviorSubject('');
  isImageLoading$ = new BehaviorSubject(false);
  isImageUploaded$ = new BehaviorSubject(false);

  createProductForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    count: ['', Validators.required],
    imgUrl: ['', Validators.required],
    price: ['', Validators.required],
    origin: ['', Validators.required],
    categoryId: ['', Validators.required],
  });

  selectedImage = null;
  categoryObs$: Observable<Category[]>;

  constructor(
    private fb: FormBuilder,
    private productAdminService: ProductAdminService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categoryObs$ = this.categoryService.getCategories().pipe(shareReplay(1));
  }

  ngOnDestroy() {
    this.createProductStatus$.unsubscribe();
    this.isImageLoading$.unsubscribe();
    this.isImageUploaded$.unsubscribe();
  }

  onSelectImage(event) {
    this.selectedImage = event.target.files[0];
  }

  onUploadImage() {
    this.productAdminService
      .getImageUploadConfig()
      .pipe(
        tap((_) => this.isImageLoading$.next(true)),
        map((res) => {
          const { user, preset } = res;
          const imageUploadUrl = `${UPLOAD_IMAGE_BASE_URL}/${user}/image/upload`;
          let formData = new FormData();
          formData.append('file', this.selectedImage);
          formData.append('upload_preset', preset);
          return [imageUploadUrl, formData];
        }),
        switchMap(([imageUploadUrl, formData]) => {
          return this.productAdminService.uploadImage(imageUploadUrl, formData);
        }),
        finalize(() => this.isImageLoading$.next(false))
      )
      .subscribe((res) => {
        if (!!res.url) {
          this.createProductForm.get('imgUrl').setValue(res.url);
          this.isImageUploaded$.next(true);
        }
      });
  }

  onSubmit() {
    const payload = this.formToRequestTransformer(this.createProductForm.value);
    this.productAdminService
      .createProduct(payload)
      .pipe(
        tap((_) => {
          this.createProductForm.markAsPristine();
          this.createProductForm.reset();
        })
      )
      .subscribe(
        (data) => {
          this.createProductStatus$.next('Created product successfully!');
        },
        (err) => {
          this.createProductStatus$.next('Failed to create product. Please try again.');
        }
      );
  }

  private formToRequestTransformer({ title, description, count, imgUrl, price, origin, categoryId }) {
    return {
      title,
      description,
      imgUrl,
      origin,
      count: parseInt(count, 10),
      price: Number(parseFloat(price).toFixed(2)),
      categoryId,
    };
  }
}
