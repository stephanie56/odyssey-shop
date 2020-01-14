import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../shared/services/api.service';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.dev';

@Component({
  selector: 'os-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateProductComponent implements OnInit, OnDestroy {
  createProductStatus$ = new BehaviorSubject('');

  createProductForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    count: ['', Validators.required],
    imgUrl: ['', Validators.required],
    price: ['', Validators.required],
    origin: ['', Validators.required]
  });

  selectedImage = null;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.createProductStatus$.unsubscribe();
  }

  onSelectImage(event) {
    this.selectedImage = event.target.files[0];
  }

  onUploadImage() {
    const formData = new FormData();
    formData.append('file', this.selectedImage);
    formData.append('upload_preset', environment.CLOUDINARY_CONFIG.PRESET);
    this.apiService.uploadImage(formData).subscribe((res) => {
      if (!!res.url) {
        this.createProductForm.get('imgUrl').setValue(res.url);
      }
    });
  }

  onSubmit() {
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
      price: Number(parseFloat(price).toFixed(2))
    };
  }
}