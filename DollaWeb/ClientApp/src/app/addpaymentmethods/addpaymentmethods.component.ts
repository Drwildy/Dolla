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

  public paymentMethodsName: string;
  public paymentMethodColor: string;
  public paymentMethodId: number; 


  constructor(private addPaymentMethodService: AddpaymentmethodService) {
    addPaymentMethodService.dataChanged$.subscribe(item => this.refresh());
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    console.log('refreshing...');
    this.addPaymentMethodService.getPaymentMethod()
      .subscribe((paymentMethod: AddPaymentMethod[]) => {
        this.addPaymentMethods = paymentMethod;

        //Enforce the limit of returned envelopes (used by overview to limit to top x)
        
      });
  }


  addPaymentMethod() {
    let myPaymentMethod: AddPaymentMethod =
    {
      id: 0,
      name: this.paymentMethodsName,
      createdDate: new Date(),
      color: this.paymentMethodColor,
      
    };
    this.addPaymentMethodService.createPaymentMethod(myPaymentMethod)
      .subscribe(
        result => {
          this.addPaymentMethodService.dataChanged$.emit();
        }
    );

    console.log("Data inserted: ", myPaymentMethod);
  }

  deletePaymentMethod(paymentMethodId: number) {
    this.addPaymentMethodService.deletePaymentMethod(paymentMethodId)
      .subscribe(result => {
        this.addPaymentMethodService.dataChanged$.emit();
      })
  }
}
