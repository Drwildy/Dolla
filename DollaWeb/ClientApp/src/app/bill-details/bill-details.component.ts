import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillService } from '../bill.service';
import { PaidBillService } from '../paidbill.service';
import { Bill } from '../bill';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { PaidBill } from '../paidbill';
import { MonthPaid } from '../monthpaid'
import { forEach } from '@angular/router/src/utils/collection';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';
import { PaymentMethod } from '../paymentmethod';
import { PaymentMethodService } from '../paymentmethod.service';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent implements OnInit {
   
  public name: string;
  public color: string;
  public id: number;
  public selPaymentID: number;
  public myBills: Array<Bill>;
  public newBills: Array<Bill>;
  public errorPay: boolean;




  public myBill: Bill;
  public myBillPayments: PaidBill[];
  public paymentMethods: PaymentMethod[];
  public months: string[];
  public pastMonths: MonthPaid[];
  public editName: string;
  public editIcon: string;
  public editAmount: number;
  public editDayDue: number;
  public iconClass: string;

  public constructor(private route: ActivatedRoute, private billService: BillService, private payBillService: PaidBillService, private transactionService: TransactionService, private paymentMethodService: PaymentMethodService) {


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
    this.getPaymentMethods();
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

   
    //edit bill through bill service
    this.billService.editBill(this.id, editBillInfo)
      .subscribe(
        result => {
          this.billService.dataChanged$.emit();
        }
    );
  }
  

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
  getPaymentMethods() {
    this.paymentMethodService.getPaymentMethod()
      .subscribe((methods: PaymentMethod[]) => {
        this.paymentMethods = methods;
        console.log(this.paymentMethods);
      });
  }
  getBillPayments() {
    this.payBillService.getPayments(this.id)
      .subscribe((bills: PaidBill[]) => {
        this.myBillPayments = bills;
        console.log("Past Months");
        console.log(this.myBillPayments);
        //console.log(bills);
        var d = new Date();
        var n = d.getMonth();
        this.pastMonths = [{month:"", paid: false, amount: 0}] 
        for (var i = n - 1; i >= 0; i--) {
          let tempMonth: MonthPaid = new MonthPaid();
          tempMonth.paid = false;
          tempMonth.month = this.months[i];
          for (var k = 0; k < this.myBillPayments.length; k++) {
            if (this.myBillPayments[k].month == tempMonth.month) {
              tempMonth.paid = true;
            }
            //tempMonth.amount = this.myBillPayments[k].transferAmount;
          }
          this.pastMonths.push(tempMonth);
        }
        console.log("Past Months");
        console.log(this.pastMonths);
      });
  }
  payBill(month) {
    if (this.selPaymentID) {
      this.errorPay = false;
      let payBill: PaidBill = {
        id: 0,
        billId: this.myBill.id,
        addPaymentMethodId: this.selPaymentID,
        month: month
      }
      this.payBillService.addPayment(payBill).subscribe(
        result => {
          this.getBillPayments();
        }
      );
    }
    else {
      this.errorPay = true;
    }
  }


}
