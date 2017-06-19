import { Injectable } from '@angular/core';
import { Hero } from '../models/hero';
import { environment } from '../environments/environment';

import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { Auth } from './auth';

@Injectable()
export class HeroService {
    private heroesUrl = environment.apiServer + '/api/heroes';  // URL to web api

    constructor(private http: Http, private authService: Auth) { }

    getHeaders() {
        let headers: Headers = this.authService.getAuthHeaders();
        headers.append('Content-Type', 'application/json');

        return headers;
    }

    getHeroes(): Observable<Hero[]> {
        return this.http
                .get(this.heroesUrl, {headers: this.getHeaders()})
                .map(heroes => heroes.json().data);
    }

    getHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`;

        return this.http
                .get(url, {headers: this.getHeaders()})
                .map(response => {
                    return response.json().data;   
                });
    }

    update(hero: Hero): Observable<Hero> {
        const url = `${this.heroesUrl}/${hero._id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.getHeaders()})
            .map(response => response.json());
    }

    create(hero: Hero): Observable<Hero> {
        delete hero._id;
        
        return this.http
            .post(this.heroesUrl, JSON.stringify(hero), {headers: this.getHeaders()})
            .map(response => response.json().data);
    }

    delete(id: number): Observable<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, {headers: this.getHeaders()}).map(()=>{});
    }
}