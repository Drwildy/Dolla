import { Component, OnInit } from '@angular/core';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})

@NgModule({
  imports: [
    BrowserModule,
    CommonModule
  ]
})

export class TransactionsComponent implements OnInit {

  public transactions: Transaction[];
  public mapping = new Map([
    ["gas", "&#xf52f"],
    ["fastfood", "&#xf805"],
    ["school", "&#xf5d1"],
    ["glasses", "&#xf530"],
    ["books", "&#xf02d"]
    // etc...
  ]);

  constructor(private transactionService: TransactionService) {
    transactionService.getTransaction().forEach(t => {
      this.transactions = t;
    });
  }

  getFromIcon(transaction: Transaction) {
    /* 
     * This function takes a transaction and
     * returns the unicode for the corresponding
     * Font Awesome icon for the sending account 
     * to be used in an HTML template.
     */

    return this.mapping.get(this.transactions.find(t => {
      t.id == transaction.transferToId
    }).type);
  }

  getToIcon(transaction: Transaction) {
    /* 
     * This function takes a transaction and
     * returns the unicode for the corresponding
     * Font Awesome icon for the receiving account 
     * to be used in an HTML template.
     */

    return this.mapping.get(this.transactions.find(t => {
      t.id == transaction.transferToId
    }).type);
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.transactionService.getTransaction()
      .subscribe((transactions: Transaction[]) => { this.transactions = transactions });
  }

}
