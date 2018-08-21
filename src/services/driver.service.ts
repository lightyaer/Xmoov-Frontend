
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Driver } from '../models/driver';

@Injectable()
export class LoginProvider {

    localUrl: string;
    productionUrl: string;
    constructor(public http: HttpClient) {
        // this.localUrl = 'https://xmoov.herokuapp.com/';
        this.localUrl = 'http://localhost:3000/';
    }


    checkValidity(email: string) {
        return new Promise((resolve, reject) => {
            this.http.post(this.localUrl + 'drivers/check', JSON.stringify({ email: email }), {
                headers: new HttpHeaders()
                    .set('Content-type', 'application/json'),
                observe: 'response'
            }).subscribe((res: HttpResponse<Driver>) => {
                localStorage.setItem('token', res.headers.get('x-auth'));
                localStorage.setItem('email', res.body.email);
                resolve(res);
            }, (err) => {
                reject(err);
            })
        })
    }

    login(user) {
        return new Promise((resolve, reject) => {
            this.http.post(this.localUrl + 'drivers/login', JSON.stringify(user), {
                headers: new HttpHeaders()
                    .set('Content-type', 'application/json'),
                observe: 'response'
            })
                .subscribe((res: HttpResponse<Driver>) => {
                    localStorage.setItem('token', res.headers.get('x-auth'));
                    localStorage.setItem('email', res.body.email);
                    resolve(res);
                }, (err) => {

                    reject(err.error);
                })
        })

    }

    otpAuth(otp: Number) {

        return new Promise((resolve, reject) => {
            this.http.post(this.localUrl + 'drivers/otp', { otp: otp }, {
                headers: new HttpHeaders()
                    .set('Content-type', 'application/json'),
                observe: 'response'
            }).subscribe((res: HttpResponse<Driver>) => {

                localStorage.setItem('token', res.headers.get('x-auth'));
                localStorage.setItem('email', res.body.email);
                resolve(res);

            }, (err) => {
                reject(err);
            })

        })


    }

    signup(driver) {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json'
            })
        };
        return new Promise((resolve, reject) => {
            this.http.post(this.localUrl + 'drivers/signup', JSON.stringify(driver), httpOptions)
                .subscribe(() => {
                    resolve();
                }, (err) => {
                    reject(err);
                })
        })
    }


    logout() {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                'x-auth': localStorage.getItem('token')
            })
        };

        return new Promise((resolve, reject) => {
            this.http.delete(this.localUrl + 'drivers/me/token', httpOptions).subscribe(res => {
                localStorage.removeItem('token')
                resolve();
            }, (error) => {
                reject(error)
            })
        })
    }


    verify() {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json',
                'x-auth': localStorage.getItem('token')
            })
        };

        return new Promise((resolve, reject) => {
            this.http.get(this.localUrl + 'drivers/me', httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error)
            })
        })
    }

}
