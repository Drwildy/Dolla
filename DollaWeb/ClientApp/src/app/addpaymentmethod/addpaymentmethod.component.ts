import { Component, OnInit, Input } from '@angular/core';
import { AddPaymentMethod } from '../addpaymentmethod';
import { Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-addpaymentmethod',
  templateUrl: './addpaymentmethod.component.html',
  styleUrls: ['./addpaymentmethod.component.css']
})
export class AddPaymentMethodComponent implements OnInit {
  @Input() addPaymentMethod: AddPaymentMethod;

 // state$: Observable<any>;
   
  
  constructor(public router: Router) {
    
  }

  ngOnInit() {
   // console.log(this.addPaymentMethod)
  }


}
