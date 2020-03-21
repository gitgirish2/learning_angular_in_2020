import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { ProductDto } from '../interfaces/ProductDto';

const baseUrl = 'http://localhost:3000';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private httpClient: HttpClient) {
    }


    // POST
    CreateProduct(data: ProductDto): Observable<ProductDto> {
        return this.httpClient.post<ProductDto>(`${baseUrl}/products/`, JSON.stringify(data), httpOptions)
            .pipe(
                retry(1),
                catchError(this.errorHandler)
            )
    }

    // GET All Products
    GetProducts(): Observable<ProductDto[]> {
        return this.httpClient.get<ProductDto[]>(`${baseUrl}/products`)
            .pipe(
                retry(1),
                catchError(this.errorHandler)
            );
    }

    // GET
    GetProductById(id: number): Observable<ProductDto> {
        console.log(`Get Product request received for ${id}`);
        return this.httpClient.get<ProductDto>(`${baseUrl}/products/${id}`)
            .pipe(
                retry(1),
                catchError(this.errorHandler)
            )
    }

    // Error handling
    errorHandler(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

}
