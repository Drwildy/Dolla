import { Component, OnInit } from '@angular/core';
import { PaymentMethod } from '../paymentmethod';
import { PaymentMethodService } from '../paymentmethod.service';

@Component({
  selector: 'app-addpaymentmethods',
  templateUrl: './addpaymentmethods.component.html',
  styleUrls: ['./addpaymentmethods.component.css']
})
export class AddPaymentMethodsComponent implements OnInit {
  addPaymentMethods: PaymentMethod[];
  public paymentMethodsName: string;
  public paymentMethodColor: string;
  public paymentMethodId: number; 


  constructor(private paymentMethodService: PaymentMethodService) {
    paymentMethodService.dataChanged$.subscribe(item => this.refresh());
    this.addPaymentMethods = [];
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    console.log('refreshing...');
    this.paymentMethodService.getPaymentMethod()
      .subscribe((paymentMethod: PaymentMethod[]) => {
        this.addPaymentMethods = paymentMethod;

        //Enforce the limit of returned envelopes (used by overview to limit to top x)
        
      });
  }


  addPaymentMethod() {
    let myPaymentMethod: PaymentMethod =
    {
      id: 0,
      name: this.paymentMethodsName,
      createdDate: new Date(),
      color: this.paymentMethodColor,
      
    };
    this.paymentMethodService.createPaymentMethod(myPaymentMethod)
      .subscribe(
        result => {
          this.paymentMethodService.dataChanged$.emit();
        }
    );

    console.log("Data inserted: ", myPaymentMethod);
  }

  deletePaymentMethod(paymentMethodId: number) {
    this.paymentMethodService.deletePaymentMethod(paymentMethodId)
      .subscribe(result => {
        this.paymentMethodService.dataChanged$.emit();
      })
  }
}
