import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SalesOrder } from '../models/salesOrder';
import { SalesOrderFilters } from '../models/salesOrderFilters';
import { OrderStatus } from '../models/orderStatus';


@Injectable()
export class SalesOrderProvider {

    constructor(public http: HttpClient) {
    }

    saveSalesOrder(salesOrder: SalesOrder) {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                'x-auth': localStorage.getItem('token')
            })
        };

        return new Promise((resolve, reject) => {
            this.http.post(localStorage.getItem('api_endpoint') + 'salesorders/create', JSON.stringify(salesOrder), httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error.error.message.split(','))
            })
        })
    }

    getAllSalesOrders(filters: SalesOrderFilters, orderStatus: OrderStatus) {

        let stageKey, stageValue;

        for (let item in orderStatus) {
            if (orderStatus[item]) {
                stageKey = item;
                stageValue = orderStatus[item];
            }
        }

        let params = new HttpParams();
        params = params.set('stageKey', String(stageKey));
        params = params.set('stageValue', String(stageValue));

        params = params.set('orderDate', new Date(filters.orderDate).toISOString());
        params = params.set('name', String(filters.productName));


        let headers = new HttpHeaders({
            'Content-type': 'application/json',
            'x-auth': localStorage.getItem('token')
        })



        return new Promise((resolve, reject) => {
            this.http.get(localStorage.getItem('api_endpoint') + 'salesorders/all', { headers: headers, params: params }).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error.error.message.split(','))
            })
        })
    }

    getSalesOrderByID(id: String) {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                'x-auth': localStorage.getItem('token')
            })
        };

        return new Promise((resolve, reject) => {
            this.http.get(localStorage.getItem('api_endpoint') + 'salesorders/' + id, httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error.error.message.split(','))
            })
        })
    }

    updateSalesOrderByID(salesOrder: SalesOrder) {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                'x-auth': localStorage.getItem('token')
            })
        };

        return new Promise((resolve, reject) => {
            this.http.patch(localStorage.getItem('api_endpoint') + 'salesorders/' + salesOrder._id, JSON.stringify(salesOrder), httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error.error.message.split(','))
            })
        })
    }

    updateOrderStatusByID(salesOrder: SalesOrder) {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                'x-auth': localStorage.getItem('token')
            })
        };

        return new Promise((resolve, reject) => {
            this.http.patch(localStorage.getItem('api_endpoint') + 'orderstatus/' + salesOrder._id, JSON.stringify(salesOrder), httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error.error.message.split(','))
            })
        })
    }

    getSalesOrderByRetailerID(id: String) {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                'x-auth': localStorage.getItem('token')
            })
        };

        return new Promise((resolve, reject) => {
            this.http.get(localStorage.getItem('api_endpoint') + 'salesorders/retailers/' + id, httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error.error.message.split(','))
            })
        })
    }

    deleteSalesOrderByID(id: String) {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                'x-auth': localStorage.getItem('token')
            })
        };

        return new Promise((resolve, reject) => {
            this.http.delete(localStorage.getItem('api_endpoint') + 'salesorders/' + id, httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error.error.message.split(','))
            })
        })
    }

}