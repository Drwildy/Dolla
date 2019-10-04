import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bank } from './bank';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http: HttpClient) { }

  getBanks(): Observable<Bank[]> {
    return this.http.get<Bank[]>('/api/piggybanks/');
  }
}
