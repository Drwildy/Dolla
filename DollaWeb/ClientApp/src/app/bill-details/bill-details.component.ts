import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillService } from '../bill.service';
import { Bill } from '../bill';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent implements OnInit {
   
  public name: string;
  public color: string;
  public id: number;
  public myBills: Array<Bill>;
  public newBills: Array<Bill>;


  bill: Bill;
  public constructor(private route: ActivatedRoute, private billService: BillService) {
    
    //billService.dataChanged$.subscribe(bill => this.refresh());
    this.route.queryParams.subscribe(params => {
      if (params["type"] == "Bill") {
        //  specify what you want to do with bill here. 
        this.id = params["id"];
      }
      this.getBill();
    });

    var myBill: Array<Bill> = [];
    myBill.push({
      id: 23,
      username: '',
      name: 'Oct',
      amount: 240.00,
      createdDate: new Date('09/29/19'),
      icon: '',
      dayDue: 1,
      paid: true
    });
    myBill.push({
      id: 23,
      username: '',
      name: 'Sept',
      amount: 240.00,
      createdDate: new Date('08/29/10'),
      icon: '',
      dayDue: 1,
      paid: false
    });
    myBill.push({
      id: 23,
      username: '',
      name: 'Aug',
      amount: 240.00,
      createdDate: new Date('07/29/19'),
      icon: '',
      dayDue: 1,
      paid: true
    });

    this.myBills = myBill;
    
  }
  ngOnInit() {
    console.log("New bill clicked. ");

  }


  getBill() {
    console.log('Inside getBill')
    this.billService.getBillsById(this.id)
      .subscribe((bill: Bill) => {
        this.bill = bill; 
      });

    console.log(this.bill);
  }

}
