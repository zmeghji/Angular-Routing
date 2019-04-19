import { Component, OnInit } from '@angular/core';

import { Product } from './product';
import { ProductService } from './product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{

  ngOnInit(): void {
    const resolvedData = this.route.snapshot.data["resolvedData"];
    this.errorMessage = resolvedData.error;
    this.onProductRetrieved(resolvedData.product);
    // const id =  +this.route.snapshot.paramMap.get('id');
    // this.getProduct(id);
  }

  pageTitle = 'Product Detail';
  product: Product;
  errorMessage: string;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
    //console.log(this.route.snapshot.paramMap.get('id'));
   }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe(
      product => this.onProductRetrieved(product),
      error => this.errorMessage = <any>error);
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }
}
