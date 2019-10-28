import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../bill';
import { HostListener } from "@angular/core";
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home-bill',
  templateUrl: './home-bill.component.html',
  styleUrls: ['./home-bill.component.css', '../app.component.css']
})
export class HomeBillComponent implements OnInit {

  @Input() bill: Bill;

  constructor(public router: Router) { }
  @HostListener("click") onClick(bill) {
    console.log("Home to bill information. ");
  }

  ngOnInit() {

  }



direct() {
 // console.log("Page is routed through click event");

  let navigationExtras: NavigationExtras = {
    queryParams: {
       'type': 'Bill',
       'id': this.bill.id,
    }
  };
  this.router.navigate(['/billdetails'], navigationExtras);
}


 
}
