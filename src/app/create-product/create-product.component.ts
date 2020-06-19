import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { tap, switchMap, map, finalize } from 'rxjs/operators';
import { CreateProductService } from './services/create-product.service';
import { UPLOAD_IMAGE_BASE_URL } from '../shared/services/api/api-urls';

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
  });

  selectedImage = null;

  constructor(private fb: FormBuilder, private apiService: CreateProductService) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.createProductStatus$.unsubscribe();
    this.isImageLoading$.unsubscribe();
    this.isImageUploaded$.unsubscribe();
  }

  onSelectImage(event) {
    this.selectedImage = event.target.files[0];
  }

  onUploadImage() {
    this.apiService
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
          return this.apiService.uploadImage(imageUploadUrl, formData);
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
    /** TODO: Informs user when the image is not uploaded  */
    const payload = this.formToRequestTransformer(this.createProductForm.value);
    this.apiService
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

  private formToRequestTransformer({ title, description, count, imgUrl, price, origin }) {
    return {
      title,
      description,
      imgUrl,
      origin,
      count: parseInt(count, 10),
      price: Number(parseFloat(price).toFixed(2)),
    };
  }
}
