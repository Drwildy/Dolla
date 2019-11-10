import { Component, SystemJsNgModuleLoader, Output, EventEmitter } from '@angular/core';
import { Envelope } from '../envelope';
import { Bill } from '../bill';
import { LoginService } from '../login/login.service';
import { EnvelopeService } from '../envelope.service';
import { BillService } from '../bill.service';
import { PiggybankService } from '../piggybank.service'
import { Piggybank } from '../piggybank';
import { NavbarService } from '../navbar.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, ParamMap } from '@angular/router';
import { TransactionService } from '../transaction.service';
import { Moneybox } from '../moneybox';
import { Transaction } from '../transaction';
import { TransferInfo } from '../transferinfo';



@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})

export class NavMenuComponent 
{
  isExpanded = false;

  public envName: string;
  public setAmount: number;
  public billName: string;
  public dayDue: number;
  public billAmount: number;
  public piggyName: string;
  public selIconPiggy: string;
  public selIconBill: string;
  public selIconEnvelope: string;

  public selTransType: string;
  public transferAmount: number;
  public withdrawAmount: number;
  public depositAmount: number;
  public transferDiv: boolean = false;
  public withdrawDiv: boolean = false;
  public depositDiv: boolean = false;
  public showEnv: boolean = true;
  public showEnvW: boolean = true;
  public showEnvD: boolean = true;
  public showPig: boolean = false;
  public showPigW: boolean = false;
  public showPigD: boolean = false;
  public showEnvTo: boolean = true;
  public showPigTo: boolean = false;
  public transFromE: number;
  public transFromP: number;
  public transToE: number;
  public transToP: number;
  public withFromE: number;
  public withFromP: number;
  public depToE: number;
  public depToP: number;
  public envelopes: Envelope[];
  public piggyBanks: Piggybank[];
 
  
  //Prayus make sure there are no errors here, had a big merge conflict
  constructor(private router: Router, private loginService: LoginService, private envelopeService: EnvelopeService, 
                private billService: BillService, private piggybankService: PiggybankService, public nav: NavbarService, public transactionService: TransactionService) { }
   
  ngOnInit() {
    //this.refresh();
  }

    
  refresh() {
    this.envelopeService.getEnvelopes()
      .subscribe((envelopes: Envelope[]) => { this.envelopes = envelopes });

    this.piggybankService.getBanks()
      .subscribe((piggyBanks: Piggybank[]) => { this.piggyBanks = piggyBanks });
  }
 
  collapse() {
    this.isExpanded = false;
  }

  toggle()
  {
    this.isExpanded = !this.isExpanded;
  }


  addEnvelope()
  {
    let myEnvelope: Envelope =
    {
      id: 0,
      applicationUserId: "tstewart11",
      name: this.envName,
      amount: 0,
      createdDate: new Date(),
      icon: this.selIconEnvelope,
      setAmount: this.setAmount
    };
    this.envelopeService.createEnvelope(myEnvelope)
      .subscribe(
        result => {
          this.envelopeService.dataChanged$.emit();
        }
      );
  }

  addBill()
  {
    let myBill: Bill =
    {

      id: 0,
      applicationUserId: "tstewart11",
      name: this.billName,
      createdDate: new Date(),
      icon: this.selIconBill,
      amount: this.billAmount,
      dayDue: this.dayDue,
      paid: false
    }
    this.billService.createBill(myBill)
      .subscribe(
        result => {
          this.billService.dataChanged$.emit();
        }
      );
  }

  addPiggybank()
  {
    console.log(this.selIconPiggy);
    let myPiggyBank: Piggybank =
    {
      id: 0,
      applicationUserId: "tstewart11",
      name: this.piggyName,
      createdDate: new Date(),
      icon: this.selIconPiggy,
      amount: 0,
      monthlyAllocation: 0
    }
    this.piggybankService.createPiggybank(myPiggyBank)
      .subscribe(
        result => {
          this.piggybankService.dataChanged$.emit();
        }
      );
  }
  changeType(value: any) {
    console.log(value);
   this.refresh();
    this.transferDiv = (value == "Transfer");
    this.withdrawDiv = (value == "Withdraw");
    this.depositDiv = (value == "Deposit");

    
  }
  fromTypeChange(evt: any) {
    var target = evt.target;
    //console.log(target.innerHTML);
    //The (change) function is not fired on the input instead the UI fires it on the label, thus the value or inner html reutrns the input with
    //the text of what radiobutton it is
    this.showEnv = target.innerHTML.includes('Envelopes');
    this.showPig = target.innerHTML.includes('Piggybanks');
  }
  toTypeChange(evt: any) {
    var target = evt.target;

    this.showEnvTo = target.innerHTML.includes('Envelopes');
    this.showPigTo = target.innerHTML.includes('Piggybanks');
  }
  withdrawTypeChange(evt: any) {
    var target = evt.target;

    this.showEnvW = target.innerHTML.includes('Envelopes');
    this.showPigW = target.innerHTML.includes('Piggybanks');
  }
  depositTypeChange(evt: any) {
    var target = evt.target;

    this.showEnvD = target.innerHTML.includes('Envelopes');
    this.showPigD = target.innerHTML.includes('Piggybanks');
  }
  addTransaction() {
    var fromID: number;
    var toID: number;
    if (this.transferDiv) {

      if (this.showEnv)
        fromID = this.transFromE;
      else
        fromID = this.transFromP;
      if (this.showEnvTo)
        toID = this.transToE;
      else
        toID = this.transToP;
      console.log(toID + ' ' + fromID);
      let transaction: Transaction = {
        id: 0,
        applicationUserId: "tstewart11",
        type: this.selTransType,
        transferFromId: fromID,
        transferToId: toID,
        transferAmount: this.transferAmount,
        transactionDate: new Date()
      }
      let toInfo: TransferInfo = {
        type: "To",
        id: toID,
        amount: this.transferAmount
      }
      let fromInfo: TransferInfo = {
        type: "From",
        id: fromID,
        amount: this.transferAmount
      }
      if (this.showPigTo)
        this.piggybankService.addMoney(toID, toInfo);
      else if (this.showEnvTo)
        this.envelopeService.addMoney(toID, toInfo);
      if (this.showPig)
        this.piggybankService.addMoney(fromID, fromInfo);
      else if (this.showEnv)
        this.envelopeService.addMoney(fromID, fromInfo);

      this.transactionService.addTransaction(transaction);
    }
    else if (this.withdrawDiv) {
      if (this.showEnvW)
        fromID = this.withFromE;
      else
        fromID = this.withFromP;
      let transaction: Transaction = {
        id: 0,
        applicationUserId: "tstewart11",
        type: this.selTransType,
        transferFromId: fromID,
        transferToId: null,
        transferAmount: this.withdrawAmount,
        transactionDate: new Date()
      }
      let fromInfo: TransferInfo = {
        type: "From",
        id: fromID,
        amount: this.withdrawAmount
      }
      if (this.showPigW)
        this.piggybankService.addMoney(fromID, fromInfo);
      else if (this.showEnvW)
        this.envelopeService.addMoney(fromID, fromInfo);
      this.transactionService.addTransaction(transaction);
    }
    else {
      if (this.showEnvD)
        toID = this.depToE;
      else
        toID = this.depToP;
      let transaction: Transaction = {
        id: 0,
        applicationUserId: "tstewart11",
        type: this.selTransType,
        transferFromId: null,
        transferToId: toID,
        transferAmount: this.depositAmount,
        transactionDate: new Date()
      }
      let toInfo: TransferInfo = {
        type: "To",
        id: toID,
        amount: this.depositAmount
      }
      if (this.showPigD)
        this.piggybankService.addMoney(toID, toInfo);
      else if (this.showEnvD)
        this.envelopeService.addMoney(toID, toInfo);
      this.transactionService.addTransaction(transaction);
    }
  }

  signOut()
  {
    this.loginService.signOut().subscribe(
      result => {
        console.log(result);
        this.nav.hide();
        this.router.navigateByUrl(`/login`);
      },
      error => {
        console.log(error);
        //Display Failed to log in on screen
      }
    );
  }

}
