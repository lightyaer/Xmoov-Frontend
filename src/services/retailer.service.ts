
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Retailer } from '../models/retailer';
import { RetailerFilters } from '../models/retailerFilters';


@Injectable()
export class RetailerProvider {

    constructor(public http: HttpClient) {

    }

    saveRetailer(retailer: Retailer) {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                'x-auth': localStorage.getItem('token')
            })
        };

        return new Promise((resolve, reject) => {
            this.http.post(localStorage.getItem('api_endpoint') + 'retailers/create', JSON.stringify(retailer), httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                console.log(error.error.message.split(','));
                reject(error.error.message.split(','))
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
            this.http.get(localStorage.getItem('api_endpoint') + 'retailers/' + id, httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error.error.message.split(','))
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
            this.http.delete(localStorage.getItem('api_endpoint') + 'retailers/' + id, httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error.error.message.split(','))
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
            this.http.get(localStorage.getItem('api_endpoint') + 'retailers/all', { headers: headers, params: params }).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error.error.message.split(','))
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
            this.http.patch(localStorage.getItem('api_endpoint') + 'retailers/' + retailer._id, JSON.stringify(retailer), httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error.error.message.split(','))
            })
        })
    }


}