import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  public expandMoneyboxWithId: EventEmitter<number>;

  constructor() {
    this.expandMoneyboxWithId = new EventEmitter<number>();
  }

}
