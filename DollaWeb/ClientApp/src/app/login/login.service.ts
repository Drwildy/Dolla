import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RegisterInterface } from "../register/register.interface";
import { LoginInterface } from "./login.interface";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) { }

    create(username: string, password: string): Observable<any> {
        var body = {
            'username': username,
            'password': password
        }
        return this.http.post('api/login/create', body);
    }

    login(username: string, password: string): Observable<any> {
        var body = {
            'username': username,
            'password': password
        }
        return this.http.post('api/login', body);
    }

    register(register: RegisterInterface) {
        return this.http.post('/api/User/register', register).pipe(map(data => { })).subscribe(result => {
            console.log(result);
        });
    }

    signIn(user: LoginInterface) {
        console.log(user);
        return this.http.post('/api/User/login', user).pipe(map(data => { })).subscribe(result => {
            console.log(result);
        });
    }

}
