import { Injectable } from '@angular/core';
import { Transaction } from './transaction';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  addTransaction(transaction: Transaction) {
    this.http.post('/api/Transactions', transaction)
      .subscribe();
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
    //console.log("service.ts");
    return this.http.get<Transaction[]>('/api/Transactions/', 
    {
      params: {
        key: months
      },
    })
  }
  
}
