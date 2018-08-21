
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Retailer } from '../models/retailer';
import { RetailerFilters } from '../models/retailerFilters';

@Injectable()
export class RetailerProvider {

    localUrl: string;
    productionUrl: string;
    constructor(public http: HttpClient) {
      // this.localUrl = 'https://xmoov.herokuapp.com/';
       this.localUrl = 'http://localhost:3000/';
    }

    saveRetailer(retailer: Retailer) {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                'x-auth': localStorage.getItem('token')
            })
        };

        return new Promise((resolve, reject) => {
            this.http.post(this.localUrl + 'retailers/create', JSON.stringify(retailer), httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error)
            })
        })
    }

    getRetailerbyID(id: String) {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                'x-auth': localStorage.getItem('token')
            })
        };

        return new Promise((resolve, reject) => {
            this.http.get(this.localUrl + 'retailers/' + id, httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error)
            })
        })
    }

    deleteRetailerbyID(id: String) {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                'x-auth': localStorage.getItem('token')
            })
        };

        return new Promise((resolve, reject) => {
            this.http.delete(this.localUrl + 'retailers/' + id, httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error)
            })
        })
    }

    getRetailers(filters: RetailerFilters) {

        let params = new HttpParams();
        params = params.set('RetailerName', String(filters.name));

        let headers = new HttpHeaders({
            'Content-type': 'application/json',
            'x-auth': localStorage.getItem('token')
        })


        return new Promise((resolve, reject) => {
            this.http.get(this.localUrl + 'retailers/all', { headers: headers, params: params }).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error)
            })
        })
    }

    updateRetailerbyID(retailer: Retailer) {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                'x-auth': localStorage.getItem('token')
            })
        };

        return new Promise((resolve, reject) => {
            this.http.patch(this.localUrl + 'retailers/' + retailer._id, JSON.stringify(retailer), httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error)
            })
        })
    }


}