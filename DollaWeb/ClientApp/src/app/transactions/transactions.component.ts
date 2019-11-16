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
    ["transferFrom", "\uf19c"],
    ["transferTo", "\uf19c"],
    ["depositFrom", "\uf4c0"],
    ["depositTo", "\uf19c"],
    ["withdrawFrom", "\uf19c"],
    ["withdrawTo", "\uf4c0"],
    ["billpayFrom", "\uf19c"],
    ["billpayTo", "\uf155"]
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
    return this.mapping.get(transaction.type.toLowerCase().concat("From"));
  }

  getToIcon(transaction: Transaction) {
    /* 
     * This function takes a transaction and
     * returns the unicode for the corresponding
     * Font Awesome icon for the receiving account 
     * to be used in an HTML template.
     */
    return this.mapping.get(transaction.type.toLowerCase().concat("To"));
  }

  ngOnInit() {
    this.refresh(0);
  }

  refresh(months: number) {
    this.transactionService.filterTransactions(months.toString())
      .subscribe((transactions: Transaction[]) => { this.transactions = transactions });
    //console.log("refresh(" + months + ")");
  }
  
}
