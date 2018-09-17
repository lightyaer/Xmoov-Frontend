
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Driver } from '../models/driver';
//'https://xmoov.herokuapp.com/'
@Injectable()
export class DriverProvider {

    constructor(public http: HttpClient) {

    }

    checkValidity(email: string) {
        return new Promise((resolve, reject) => {
            this.http.post(localStorage.getItem('api_endpoint') + 'drivers/check', JSON.stringify({ email: email }), {
                headers: new HttpHeaders()
                    .set('Content-type', 'application/json'),
                observe: 'response'
            }).subscribe((res: HttpResponse<Driver>) => {
                localStorage.setItem('token', res.headers.get('x-auth'));
                localStorage.setItem('email', res.body.email);
                resolve(res);
            }, (error) => {
                reject(error.error.message.split(','))
            })
        })
    }

    setLanguage(lang) {
        return new Promise((resolve, reject) => {
            this.http.post(localStorage.getItem('api_endpoint') + 'drivers/lang', JSON.stringify({
                lang
            }), {
                    headers: new HttpHeaders()
                        .set('Content-type', 'application/json')
                        .set('x-auth', localStorage.getItem('token')),
                    observe: 'response'
                })
                .subscribe((res) => {
                    resolve(res);
                }, (error) => {
                    reject()
                })

        })
    }

    login(user) {
        return new Promise((resolve, reject) => {
            this.http.post(localStorage.getItem('api_endpoint') + 'drivers/login', JSON.stringify(user), {
                headers: new HttpHeaders()
                    .set('Content-type', 'application/json'),
                observe: 'response'
            })
                .subscribe((res: HttpResponse<Driver>) => {
                    localStorage.setItem('token', res.headers.get('x-auth'));
                    localStorage.setItem('email', res.body.email);
                    resolve(res);
                }, (error) => {
                    reject(error.error.message.split(','))
                })

        })
    }

    otpAuth(otp: Number) {
        return new Promise((resolve, reject) => {
            this.http.post(localStorage.getItem('api_endpoint') + 'drivers/otp', { otp: otp }, {
                headers: new HttpHeaders()
                    .set('Content-type', 'application/json'),
                observe: 'response'
            }).subscribe((res: HttpResponse<Driver>) => {

                localStorage.setItem('token', res.headers.get('x-auth'));
                localStorage.setItem('email', res.body.email);
                resolve(res);

            }, (error) => {
                reject(error.error.message.split(','))
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
            this.http.post(localStorage.getItem('api_endpoint') + 'drivers/signup', JSON.stringify(driver), httpOptions)
                .subscribe(() => {
                    resolve();
                }, (error) => {
                    reject(error.error.message.split(','))
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
            this.http.delete(localStorage.getItem('api_endpoint') + 'drivers/me/token', httpOptions).subscribe(res => {
                localStorage.removeItem('token')
                resolve();
            }, (error) => {
                reject(error.error.message.split(','))
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
            this.http.get(localStorage.getItem('api_endpoint') + 'drivers/me', httpOptions).subscribe(res => {
                resolve(res);
            }, (error) => {
                reject(error.error.message.split(','))
            })
        })
    }

}
