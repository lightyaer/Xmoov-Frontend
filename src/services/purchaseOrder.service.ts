import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PurchaseOrder } from '../models/purchaseOrder';
import { PurchaseOrderFilters } from '../models/purchaseOrderFilters';

@Injectable()
export class PurchaseOrderProvider {

    localUrl: string;
    productionUrl: string;
    constructor(public http: HttpClient) {
        // this.localUrl = 'https://xmoov.herokuapp.com/';
        this.localUrl = 'http://localhost:3000/';
    }

    savePurchaseOrder(purchaseOrder: PurchaseOrder) {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                'x-auth': localStorage.getItem('token')
            })
        };

        return new Promise((resolve, reject) => {
            this.http.post(this.localUrl + 'purchaseorders/create', JSON.stringify(purchaseOrder), httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error)
            })
        })
    }

    updatePurchaseOrderByID(purchaseOrder: PurchaseOrder) {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                'x-auth': localStorage.getItem('token')
            })
        };

        return new Promise((resolve, reject) => {
            this.http.patch(this.localUrl + 'purchaseorders/' + purchaseOrder._id, JSON.stringify(purchaseOrder), httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error)
            })
        })

    }

    deletePurchaseOrderByID(id: string) {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                'x-auth': localStorage.getItem('token')
            })
        };

        return new Promise((resolve, reject) => {
            this.http.delete(this.localUrl + 'purchaseorders/' + id, httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error)
            })
        })
    }

    getPurchaseOrderByID(id: string) {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                'x-auth': localStorage.getItem('token')
            })
        };

        return new Promise((resolve, reject) => {
            this.http.get(this.localUrl + 'purchaseorders/' + id, httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error)
            })
        })
    }

    getAllPurchaseOrders(filters: PurchaseOrderFilters) {

        let headers = new HttpHeaders({
            'Content-type': 'application/json',
            'x-auth': localStorage.getItem('token')
        })

        let params = new HttpParams();
        params = params.set('name', String(filters.name));


        return new Promise((resolve, reject) => {
            this.http.get(this.localUrl + 'purchaseorders/all', { headers: headers, params: params }).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error)
            })
        })
    }

    getRemainderQuantities(salesOrder_id: string) {
        let headers = new HttpHeaders({
            'Content-type': 'application/json',
            'x-auth': localStorage.getItem('token')
        })

        return new Promise((resolve, reject) => {
            this.http.get(this.localUrl + 'purchaseorders/getQuantities/' + salesOrder_id, { headers: headers }).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error)
            })
        })
    }
}