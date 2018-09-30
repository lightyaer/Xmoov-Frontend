import { Receipt } from './../models/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ReceiptProvider {

    constructor(public http: HttpClient) {
    }

    saveReceipt(receipt: Receipt) {

        let httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                'x-auth': localStorage.getItem('token')
            })
        };

        return new Promise((resolve, reject) => {
            this.http.post(localStorage.getItem('api_endpoint') + 'receipts/create/', JSON.stringify(receipt), httpOptions).subscribe(res => {
                resolve();
            }, (error) => {
                reject()
            })
        })
    }

}
