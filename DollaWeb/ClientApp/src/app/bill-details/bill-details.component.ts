import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillService } from '../bill.service';
import { PaidBillService } from '../paidbill.service';
import { Bill } from '../bill';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { PaidBill } from '../paidbill';
import { forEach } from '@angular/router/src/utils/collection';
import { MonthPaid } from '../month-paid';

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

  public myBill: Bill;
  public myBillPayments: PaidBill[];
  public months: string[];
  public pastMonths: MonthPaid[];
  public editName: string;
  public editIcon: string;
  public editAmount: number;
  public editDayDue: number;
  public iconClass: string;

  public constructor(private route: ActivatedRoute, private billService: BillService, private payBillService: PaidBillService) {


    this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    
    
    //billService.dataChanged$.subscribe(bill => this.refresh());
    this.route.queryParams.subscribe(params => {
      if (params["type"] == "Bill") {
        //  specify what you want to do with bill here. 
        this.id = params["id"];
      }
      this.getBillbyId();
      this.getBillPayments();
    });
    //this.pastMonths.push()
    

    // call a service to get a specific bill. 
  

    var myBill: Array<Bill> = [];
    myBill.push({
      id: 23,
      applicationUserId: '',
      name: 'Oct',
      amount: 240.00,
      createdDate: new Date('09/29/19'),
      icon: '',
      dayDue: 1,
      paid: true
    });
    myBill.push({
      id: 23,
      applicationUserId: '',
      name: 'Sept',
      amount: 240.00,
      createdDate: new Date('08/29/10'),
      icon: '',
      dayDue: 1,
      paid: false
    });
    myBill.push({
      id: 23,
      applicationUserId: '',
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
   
  }


  //let [first, ...rest] =[1, 2, 3, 4];
  //console.log(first); // outputs 1
  //console.log(rest); // outputs [ 2, 3, 4 ]

 

  editBill() {

    let editBillInfo: Bill = this.myBill;

    if (this.editName != null) {
      editBillInfo.name = this.editName;
    } else {
      editBillInfo.name = this.myBill.name;
    }
    if (this.editAmount != null && this.editAmount > 0) {
      editBillInfo.amount = this.editAmount;
    } else {
      editBillInfo.amount = this.myBill.amount;
    }
    if (this.editIcon != null) {
      editBillInfo.icon = this.editIcon;
    } else {
      editBillInfo.icon = this.myBill.icon;
    }
    if (this.editDayDue != null && this.editDayDue > 1) {
      editBillInfo.dayDue = this.editDayDue; 
    } else {
      editBillInfo.dayDue = this.myBill.dayDue;
    }

   
    /*
    // this code works but there are some bugs
    if (this.editName.length > 1) {
      editBillInfo.name = this.editName;
    } else {
      editBillInfo.name = this.myBill.name; 
    }
    if (this.editIcon.length > 1) {
      editBillInfo.icon = this.editIcon;
    } else {
      editBillInfo.icon = this.myBill.icon;
    }


    if (this.editAmount > 1) {
      editBillInfo.amount = this.editAmount;
    } else {
      editBillInfo.amount = this.myBill.amount;
    }
   

    if (this.editDayDue > 1) {
      editBillInfo.dayDue = this.editDayDue;
    } else {
      editBillInfo.dayDue = this.myBill.dayDue; 
    }
    */
    //edit bill through bill service
    this.billService.editBill(this.id, editBillInfo)
      .subscribe(
        result => {
          this.billService.dataChanged$.emit();
        }
    );
  }
  /*
  this.addPaymentMethodService.createPaymentMethod(myPaymentMethod)
  .subscribe(
    result => {
      this.addPaymentMethodService.dataChanged$.emit();
    }
  );

*/

  getBillbyId() {
  //  console.log('Inside getBill')
    this.billService.getBillsById(this.id)
      .subscribe((bill: Bill) => {
        this.myBill = bill;
        this.iconClass = bill.icon;
        console.log(this.myBill);
        //console.log("Bill is assigned. ")
      });
    
  }
  getBillPayments() {
    this.payBillService.getPayments(this.id)
      .subscribe((bills: PaidBill[]) => {
        this.myBillPayments = bills;
        //console.log(bills);
        var d = new Date();
        var n = d.getMonth();
        this.pastMonths = [{month:"", paid: false}]
        for (var i = n - 1; i >= 0; i--) {
          let tempMonth: MonthPaid = new MonthPaid();
          tempMonth.paid = false;
          tempMonth.month = this.months[i];
          for (var k = 0; k < this.myBillPayments.length; k++) {
            if (this.myBillPayments[k].month == tempMonth.month) {
              tempMonth.paid = true;
            }
            
          }
          this.pastMonths.push(tempMonth);
        }
        console.log(this.pastMonths);
      });
  }


}
