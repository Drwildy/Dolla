import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Piggybank } from './piggybank';
import { TransferInfo } from './transferinfo';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PiggybankService {

  constructor(private http: HttpClient) { }
  addItemTest(piggybank: Piggybank) {
    console.log(piggybank);
    this.http.post('/api/Piggybanks', piggybank)
      .subscribe();
    console.log("Added Piggybank");
  }
  getBanks(): Observable<Piggybank[]> {
    return this.http.get<Piggybank[]>('/api/piggybanks/');
  }
  addMoney(id: number, info: TransferInfo) {
    return this.http.put('/api/piggybanks/' + id, info)
      .subscribe();
  }


}
