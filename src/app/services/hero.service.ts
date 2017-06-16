import { Injectable } from '@angular/core';
import { Hero } from '../models/hero';
import { environment } from '../../environments/environment';

import { Response, Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class HeroService {
    private heroesUrl = environment.apiServer + '/api/heroes';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    // getHeroes(): Promise<Hero[]> {
    //     return this.http.get(this.heroesUrl)
    //             .toPromise()
    //             .then(response => response.json().data as Hero[])
    //             .catch(this.handleError);
    // }

    getHeroes(): Observable<Hero[]> {
        return this.http.get(this.heroesUrl)
            .map((res: Response) => {
                return res.json().data;
            })
    }

    getHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`;

        return this.http.get(url)
                .map(response => {
                    return response.json().data;   
                });
    }

    update(hero: Hero): Observable<Hero> {
        const url = `${this.heroesUrl}/${hero._id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .map(response => response.json());
    }

    create(hero: Hero): Observable<Hero> {
        delete hero._id;
        
        return this.http
            .post(this.heroesUrl, JSON.stringify(hero), {headers: this.headers})
            .map(response => response.json().data);
    }

    delete(id: number): Observable<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers}).map(()=>{});
    }
}