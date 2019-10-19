import { Component, OnInit, Input } from '@angular/core';
import { Bank } from '../bank';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons'
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: 'app-home-bank',
  templateUrl: './home-bank.component.html',
  styleUrls: ['./home-bank.component.css', '../app.component.css']
})
export class HomeBankComponent implements OnInit {

  @Input() bank: Bank;

  // as a stop gap, I am limiting this to use a default icon
  // future pbis need to be written to allow this to be different
  icon = faPiggyBank;

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.bank) {
    }
  }

  //curently sending to it thorugh query params, change using id 
  bankDetails() {
    let bankDetails: NavigationExtras = {
      queryParams: {
        "bankName": this.bank.name,
        "bankAmount": this.bank.amount,
        //can send the icon from here as well       
      }
    };
    this.router.navigate(["/home-bank-details"], bankDetails);
  }

}
