import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Envelope } from './envelope';
import { TransferInfo } from './transferinfo';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnvelopeService {

  public dataChanged$: EventEmitter<Envelope>;

  constructor(private http: HttpClient) {
    this.dataChanged$ = new EventEmitter<Envelope>();
  }

  createEnvelope(envelope: Envelope): Observable<Envelope> {
    return this.http.post<Envelope>('/api/Envelopes', envelope);
  }

  getEnvelopes(): Observable<Envelope[]> {
    return this.http.get<Envelope[]>('/api/envelopes/');
  }
  addMoney(id: number, info: TransferInfo) {
    return this.http.put('/api/envelopes/' + id, info)
      .subscribe();
  }

  getEnvelopeById(id: number): Observable<Envelope> {
    return this.http.get<Envelope>('/api/envelopes/' + id);
  }

  editEnvelope(id: number, envelope: Envelope): Observable<Envelope> {
    return this.http.patch<Envelope>('/api/envelopes/' + id, envelope);
  }

}
