import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { settingsInterface } from "./settings/settingsInterface";


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

    constructor(private http: HttpClient) { }

    changePass(passwords: settingsInterface): Observable<settingsInterface> {

        return this.http.put<settingsInterface>('/api/User/changePass', passwords);
    }
}
