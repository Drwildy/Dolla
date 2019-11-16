import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Piggybank } from './piggybank';
import { TransferInfo } from './transferinfo';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PiggybankService {

  public dataChanged$: EventEmitter<Piggybank>;

  constructor(private http: HttpClient) {
    this.dataChanged$ = new EventEmitter<Piggybank>();
  }
  getBanks(): Observable<Piggybank[]> {
    return this.http.get<Piggybank[]>('/api/piggybanks/');
  }
  addMoney(id: number, info: TransferInfo) {
    return this.http.put('/api/piggybanks/' + id, info)
      .subscribe();
  }

  createPiggybank(piggybank: Piggybank): Observable<Piggybank> {
    return this.http.post<Piggybank>('/api/Piggybanks', piggybank);
  }

  getPiggyBankById(id: number): Observable<Piggybank> {
    return this.http.get<Piggybank>('/api/Piggybanks/' + id);
  }

  getPiggybanks(): Observable<Piggybank[]> {
    return this.http.get<Piggybank[]>('/api/piggybanks/');
  }
}
