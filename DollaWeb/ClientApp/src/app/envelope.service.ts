import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Envelope } from './envelope';
import { TransferInfo } from './transferinfo';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnvelopeService {

  constructor(private http: HttpClient) { }

  addItemTest(envelope: Envelope) {
    console.log(envelope);
    console.log(this.http.post('/api/Envelopes', envelope)
      .subscribe());
    console.log("Added Envelope");
  }

  getEnvelopes(): Observable<Envelope[]> {
    return this.http.get<Envelope[]>('/api/envelopes/');
  }
  addMoney(id: number, info: TransferInfo) {
    return this.http.put('/api/envelopes/' + id, info)
      .subscribe();
  }

}
