import { Component, OnInit, Input } from '@angular/core';
import { AddPaymentMethod } from '../addpaymentmethod'

@Component({
  selector: 'app-addpaymentmethod',
  templateUrl: './addpaymentmethod.component.html',
  styleUrls: ['./addpaymentmethod.component.css']
})
export class AddPaymentMethodComponent implements OnInit {
  @Input() addPaymentMethod: AddPaymentMethod;

  constructor() { }

  ngOnInit() {
  }

}
