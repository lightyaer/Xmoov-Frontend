import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PurchaseOrder } from '../models/purchaseOrder';
import { PurchaseOrderFilters } from '../models/purchaseOrderFilters';


@Injectable()
export class PurchaseOrderProvider {

    constructor(public http: HttpClient) {

    }

    savePurchaseOrder(purchaseOrder: PurchaseOrder) {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                'x-auth': localStorage.getItem('token')
            })
        };

        return new Promise((resolve, reject) => {
            this.http.post(localStorage.getItem('api_endpoint') + 'purchaseorders/create', JSON.stringify(purchaseOrder), httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error.error.message.split(','))
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
            this.http.patch(localStorage.getItem('api_endpoint') + 'purchaseorders/' + purchaseOrder._id, JSON.stringify(purchaseOrder), httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error.error.message.split(','))
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
            this.http.delete(localStorage.getItem('api_endpoint') + 'purchaseorders/' + id, httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error.error.message.split(','))
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
            this.http.get(localStorage.getItem('api_endpoint') + 'purchaseorders/' + id, httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error.error.message.split(','))
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
            this.http.get(localStorage.getItem('api_endpoint') + 'purchaseorders/all', { headers: headers, params: params }).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error.error.message.split(','))
            })
        })
    }

    getRemainderQuantities(salesOrder_id: string) {
        let headers = new HttpHeaders({
            'Content-type': 'application/json',
            'x-auth': localStorage.getItem('token')
        })

        return new Promise((resolve, reject) => {
            this.http.get(localStorage.getItem('api_endpoint') + 'purchaseorders/getQuantities/' + salesOrder_id, { headers: headers }).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error.error.message.split(','))
            })
        })
    }
}