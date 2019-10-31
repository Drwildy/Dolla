import { Component, OnInit, Input } from '@angular/core';
import { Moneybox } from '../moneybox';

@Component({
  selector: 'app-budget-moneybox',
  templateUrl: './budget-moneybox.component.html',
  styleUrls: ['./budget-moneybox.component.css']
})
export class BudgetMoneyboxComponent implements OnInit {

  @Input() moneybox: Moneybox;

  constructor() { }

  ngOnInit() {
  }

}
