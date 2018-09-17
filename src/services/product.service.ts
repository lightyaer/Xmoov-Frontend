import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductProvider {

    constructor(public http: HttpClient) {

    }

    getAllProducts(search: string, lang: string) {
        let httpParams = new HttpParams()
            .set('name', search)
            .set('lang', lang);

        let httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                'x-auth': localStorage.getItem('token')
            }),
            params: httpParams
        };

        return new Promise((resolve, reject) => {
            this.http.get(localStorage.getItem('api_endpoint') + 'products/all', httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error.error.message.split(','))
            })
        })
    }

    getProductsByIDs(ids: string) {
        let httpParams = new HttpParams().set('ids', ids)
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                'x-auth': localStorage.getItem('token')
            }),
            params: httpParams
        };

        return new Promise((resolve, reject) => {
            this.http.get(localStorage.getItem('api_endpoint') + 'products/ids', httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error.error.message.split(','))
            })
        })
    }


    getProductByID(id: string) {

        let headers = new HttpHeaders({
            'Content-type': 'application/json',
            'x-auth': localStorage.getItem('token')
        })


        return new Promise((resolve, reject) => {
            this.http.get(localStorage.getItem('api_endpoint') + 'products/' + id, { headers: headers }).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error.error.message.split(','))
            })
        })
    }



}