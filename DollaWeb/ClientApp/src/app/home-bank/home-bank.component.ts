import { Component, OnInit, Input } from '@angular/core';
import { Bank } from '../bank';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-home-bank',
  templateUrl: './home-bank.component.html',
  styleUrls: ['./home-bank.component.css']
})
export class HomeBankComponent implements OnInit {

  @Input() bank: Bank;

  // as a stop gap, I am limiting this to use a default icon
  // future pbis need to be written to allow this to be different
  icon = faPiggyBank;

  constructor() { }

  ngOnInit() {
    if (this.bank) {
    }
  }

}
