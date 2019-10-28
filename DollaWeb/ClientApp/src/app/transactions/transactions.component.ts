import { Component, OnInit } from '@angular/core';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactions: Transaction[];

  constructor(private transactionService: TransactionService) {
   this.transactions = [];
  }


  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.transactionService.getTransaction()
      .subscribe((transactions: Transaction[]) => { this.transactions = transactions });
  }

}
