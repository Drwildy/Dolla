import { Injectable, Output, EventEmitter } from '@angular/core';
import { Transaction } from './transaction';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  @Output() dataChanged$: EventEmitter<Transaction>;

  constructor(private http: HttpClient) {
    this.dataChanged$ = new EventEmitter();
  }

  addTransaction(transaction: Transaction) {
    this.http.post('/api/Transactions', transaction)
      .subscribe(() => { this.dataChanged$.emit() });
  }

  /*
  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>('/api/Transactions', transaction);
  }
  */

  getTransaction(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>('/api/Transactions/');
  }

  filterTransactions(months: string): Observable<Transaction[]> {
      return this.http.get<Transaction[]>('/api/Transactions/',
          {
              params: {
                  key: months
              },
          });
  }

  getEnvelopeTransaction(id: string): Observable<Transaction[]> {
        return this.http.get<Transaction[]>('/api/transactions/envelopes' + id);
  }
}
