import { Component, OnInit } from '@angular/core';
import { AddPaymentMethod } from '../addpaymentmethod';
import { AddpaymentmethodService } from '../addpaymentmethod.service';

@Component({
  selector: 'app-addpaymentmethods',
  templateUrl: './addpaymentmethods.component.html',
  styleUrls: ['./addpaymentmethods.component.css']
})
export class AddPaymentMethodsComponent implements OnInit {
  addPaymentMethods: AddPaymentMethod[];

  constructor(private addPaymentMethodService: AddpaymentmethodService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.addPaymentMethodService.AddPaymentMethod()
      .subscribe((addPaymentMethods: AddPaymentMethod[]) => { this.addPaymentMethods = addPaymentMethods });
  }

}
