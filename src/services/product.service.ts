import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class ProductProvider {

    localUrl: string;
    productionUrl: string;
    constructor(public http: HttpClient) {
        // this.localUrl = 'https://xmoov.herokuapp.com/';
        this.localUrl = 'http://localhost:3000/';
    }

    getAllProducts(search: string, lang: string) {
        let httpParams = new HttpParams()
            .set('name', search)
            .set('lang', 'en');

        let httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                'x-auth': localStorage.getItem('token')
            }),
            params: httpParams
        };

        return new Promise((resolve, reject) => {
            this.http.get(this.localUrl + 'products/all', httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error)
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
            this.http.get(this.localUrl + 'products/ids', httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error)
            })
        })
    }


    getProductByID(id: string) {

        let headers = new HttpHeaders({
            'Content-type': 'application/json',
            'x-auth': localStorage.getItem('token')
        })


        return new Promise((resolve, reject) => {
            this.http.get(this.localUrl + 'products/' + id, { headers: headers }).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error)
            })
        })
    }



}