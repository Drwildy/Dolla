import { Component, OnInit, Input } from '@angular/core';
import { PaymentMethod } from '../paymentmethod';
import { Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-addpaymentmethod',
  templateUrl: './addpaymentmethod.component.html',
  styleUrls: ['./addpaymentmethod.component.css']
})
export class AddPaymentMethodComponent implements OnInit {
  @Input() paymentMethod: PaymentMethod;

  
  constructor(public router: Router) { }

  ngOnInit() {
  }

}
