import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {Product, ProductResolved} from './product';
import { Observable, of } from "rxjs";
import { ProductService } from "./product.service";
import { map, catchError } from "rxjs/operators";
@Injectable({
    providedIn: 'root'
})
export class ProductResolver implements Resolve<ProductResolved>{
    constructor(private productService: ProductService){

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<ProductResolved> {
        const id  =  route.paramMap.get('id');
        if (isNaN(+id)){
            const errorMessage =`Product id was not a number: ${id}`;
            console.log(errorMessage);
            return of({product: null, error: errorMessage});
        }
        return this.productService.getProduct(+id).pipe(
            map(product => ({product: product})),
            catchError( error =>{
                const errorMessage =`Retreival error: ${error}`;
                console.log(errorMessage);
                return of({product: null, error: errorMessage});
            })

        )
    }

}