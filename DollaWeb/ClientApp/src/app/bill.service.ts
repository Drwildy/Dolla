import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Bill } from './bill';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }
  addItemTest(bill: Bill) {
    console.log(bill);
    this.http.post('/api/Bills', bill)
      .subscribe();
    console.log("Added Bill");
  }
  getBills(): Observable<Bill[]> {
    let list: Array<Bill> = [];
    list.push(<Bill>{
      id: 1,
      name: "Phone Bill",
      createdDate: new Date(),
      amount: 66.48,
      dayDue: 4,
      paid: true
    });
    list.push(<Bill>{
      id: 2,
      name: "Internet",
      createdDate: new Date(),
      amount: 91.90,
      dayDue: 31,
      paid: false
    });
    list.push(<Bill>{
      id: 3,
      name: "Rent",
      createdDate: new Date(),
      amount: 1085,
      dayDue: 1,
      paid: true
    });
    list.push(<Bill>{
      id: 1,
      name: "Phone Bill",
      createdDate: new Date(),
      amount: 66.48,
      dayDue: 4,
      paid: false
    });
    list.push(<Bill>{
      id: 2,
      name: "Internet",
      createdDate: new Date(),
      amount: 91.90,
      dayDue: 31,
      paid: false
    });
    list.push(<Bill>{
      id: 3,
      name: "Rent",
      createdDate: new Date(),
      amount: 1085,
      dayDue: 1,
      paid: false
    });
    list.push(<Bill>{
      id: 1,
      name: "Phone Bill",
      createdDate: new Date(),
      amount: 66.48,
      dayDue: 4,
      paid: false
    });
    list.push(<Bill>{
      id: 2,
      name: "Internet",
      createdDate: new Date(),
      amount: 91.90,
      dayDue: 31,
      paid: false
    });
    list.push(<Bill>{
      id: 3,
      name: "Rent",
      createdDate: new Date(),
      amount: 1085,
      dayDue: 1,
      paid: false
    });

    return Observable.create(function (observer) {
      observer.next(list);
    });
  }

}
