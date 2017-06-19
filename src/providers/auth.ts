import { Injectable, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';

@Injectable()
export class Auth implements OnInit {
    public token: any;
    
    constructor(public http: Http, public storage: Storage) {
    }

    ngOnInit () {
        this.storage.get('token').then((value) => {
            this.token = value;
        });
    }

    getAuthHeaders(): Headers {
        let headers = new Headers();
        headers.append('Authorization', this.token);
        return headers; 
    }

    checkAuthentication(): Promise<any> {
        return new Promise((resolve, reject) => {
            //Load token if exists
            this.storage.get('token').then((value) => {
    
                this.token = value;
    
                let headers = new Headers();
                headers.append('Authorization', this.token);
                
                this.http.get(`${environment.apiServer}/api/auth/protected`, { headers: headers })
                    .subscribe(
                        res => resolve(res),
                        err => reject(err)
                    );
            }).catch(err => reject(err));
        });
    }

    createAccount(details) {
        return new Promise((resolve, reject) => {

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(`${environment.apiServer}/api/auth/register`, JSON.stringify(details), { headers: headers })
                .subscribe(res => {
                    let data = res.json();
                    this.token = data.token;
                    this.storage.set('token', data.token);
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        });

    }

    login(credentials) {
        return new Promise((resolve, reject) => {

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(`${environment.apiServer}/api/auth/login`, JSON.stringify(credentials), { headers: headers })
                .subscribe(res => {
                    let data = res.json();
                    this.token = data.token;
                    this.storage.set('token', data.token);

                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        });
    }

    logout() {
        this.storage.set('token', '');
        this.token = null;
    }
}
