
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { SalesOrder } from '../models/salesOrder';
import { SalesOrderFilters } from '../models/salesOrderFilters';
import { OrderStatus } from '../models/orderStatus';


@Injectable()
export class SalesOrderProvider {

    localUrl: string;
    productionUrl: string;
    constructor(public http: HttpClient) {
       // this.localUrl = 'https://xmoov.herokuapp.com/';
        this.localUrl = 'http://localhost:3000/';
    }

    saveSalesOrder(salesOrder: SalesOrder) {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                'x-auth': localStorage.getItem('token')
            })
        };

        return new Promise((resolve, reject) => {
            this.http.post(this.localUrl + 'salesorders/create', JSON.stringify(salesOrder), httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error)
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

        params = params.set('orderDate', new Date(filters.orderDate).getTime().toString());
        params = params.set('itemName', String(filters.itemName));


        let headers = new HttpHeaders({
            'Content-type': 'application/json',
            'x-auth': localStorage.getItem('token')
        })



        return new Promise((resolve, reject) => {
            this.http.get(this.localUrl + 'salesorders/all', { headers: headers, params: params }).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error)
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
            this.http.get(this.localUrl + 'salesorders/' + id, httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error)
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
            this.http.patch(this.localUrl + 'salesorders/' + salesOrder._id, JSON.stringify(salesOrder), httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error)
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
            this.http.patch(this.localUrl + 'orderstatus/' + salesOrder._id, JSON.stringify(salesOrder), httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error)
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
            this.http.get(this.localUrl + 'salesorders/retailers/' + id, httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error)
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
            this.http.delete(this.localUrl + 'salesorders/' + id, httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                
                reject(error.error)
            })
        })
    }

}