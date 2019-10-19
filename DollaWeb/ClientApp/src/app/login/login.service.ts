import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RegisterInterface } from "../register/register.interface";
import { LoginInterface } from "./login.interface";

@Injectable({
    providedIn: 'root'
})
export class LoginService
{

    constructor(private http: HttpClient) { }

    register(register: RegisterInterface)
    {
        return this.http.post('/api/User/register', register);
    }

    signIn(user: LoginInterface): Observable<LoginInterface>
    {
        console.log(user);
        return this.http.post<LoginInterface>('/api/User/login', user);
    }

    signOut()
    {
        return this.http.post('/api/User/logout', "");
    }

}
