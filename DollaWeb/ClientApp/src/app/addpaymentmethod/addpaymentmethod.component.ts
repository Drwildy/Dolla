import { Component, OnInit, Input } from '@angular/core';
import { PaymentMethod } from '../paymentmethod';
import { Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { PaymentMethodService } from '../paymentmethod.service';

@Component({
  selector: 'app-addpaymentmethod',
  templateUrl: './addpaymentmethod.component.html',
  styleUrls: ['./addpaymentmethod.component.css']
})
export class AddPaymentMethodComponent implements OnInit {
  @Input() paymentMethod: PaymentMethod;

  ePaymentMethod: PaymentMethod;

  constructor(private paymentMethodService: PaymentMethodService) { }

  ngOnInit() {
    this.ePaymentMethod = JSON.parse(JSON.stringify(this.paymentMethod)); // deep copy
  }

  editPaymentMethod() {
    this.paymentMethodService.editPaymentMethod(this.ePaymentMethod.id, this.ePaymentMethod)
      .subscribe(res => {
        this.paymentMethod = JSON.parse(JSON.stringify(this.ePaymentMethod)); // deep copy
      })
  }

  deletePaymentMethod() {
    this.paymentMethodService.deletePaymentMethod(this.paymentMethod.id)
      .subscribe(res => this.paymentMethodService.dataChanged$.emit());
  }
}
