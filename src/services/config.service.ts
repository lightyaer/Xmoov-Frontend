import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigProvider {

    constructor(public http: HttpClient) {
    }

    // "https://xmoov.herokuapp.com/"

    getApiEndpoint() {
        return new Promise((resolve, reject) => {
            this.http.get('assets/config.json').subscribe((res) => {
                resolve(res);
            }, (err) => {
                reject(err);
            })
        })
    }


}
