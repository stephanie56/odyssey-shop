import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ApiService } from "../shared/services/api.service";
import { Observable } from "rxjs";
import { delay } from "rxjs/operators";

@Component({
  selector: "os-product-page",
  templateUrl: "./product-page.component.html",
  styleUrls: ["./product-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPageComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  productObs$: Observable<any>;

  ngOnInit() {
    this.productObs$ = this.apiService.getProductById(
      "96d600ec-c2db-4dfd-a470-6dc775575e86"
    );
  }
}
