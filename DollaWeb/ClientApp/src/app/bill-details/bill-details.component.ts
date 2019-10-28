import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillService } from '../bill.service';
import { Bill } from '../bill';
import { icon } from '@fortawesome/fontawesome-svg-core';

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





  myBill: Bill;
  public editName: string;
  public editIcon: string;
  public editAmount: number;
  public editDayDue: number;

  public constructor(private route: ActivatedRoute, private billService: BillService) {

   
    

    //billService.dataChanged$.subscribe(bill => this.refresh());
    this.route.queryParams.subscribe(params => {
      if (params["type"] == "Bill") {
        //  specify what you want to do with bill here. 
        this.id = params["id"];
      }
      this.getBillbyId();
    });


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
        this.myBill = { ...bill }
        console.log(bill);
        //console.log("Bill is assigned. ")
      });
    
  }


}
