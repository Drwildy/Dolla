import { Component, SystemJsNgModuleLoader, Output, EventEmitter } from '@angular/core';
import { Envelope } from '../envelope';
import { Bill } from '../bill';
import { LoginService } from '../login/login.service';
import { EnvelopeService } from '../envelope.service';
import { BillService } from '../bill.service';
import { PiggybankService } from '../piggybank.service'
import { Piggybank } from '../piggybank';
import { User } from '../User';
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
  public transferDiv: boolean = false;
  public showEnv: boolean = true;
  public showBill: boolean = false;
  public showPig: boolean = false;
  public showEnvTo: boolean = true;
  public showBillTo: boolean = false;
  public showPigTo: boolean = false;
  public transFromE: number;
  public transFromB: number;
  public transFromP: number;
  public transToE: number;
  public transToB: number;
  public transToP: number;
  public envelopes: Envelope[];
  public bills: Bill[];
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
      username: "tstewart11",
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
      username: "tstewart11",
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
      username: "tstewart11",
      name: this.piggyName,
      createdDate: new Date(),
      icon: this.selIconPiggy,
      amount: 0,
      test: null
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
   this.transferDiv = (value == "Transfer")

    
  }
  fromTypeChange(evt: any) {
    var target = evt.target;
    //console.log(target.innerHTML);
    //The (change) function is not fired on the input instead the UI fires it on the label, thus the value or inner html reutrns the input with
    //the text of what radiobutton it is
    this.showEnv = target.innerHTML.includes('Envelopes');
    this.showBill = target.innerHTML.includes('Bills');
    this.showPig = target.innerHTML.includes('Piggybanks');
  }
  toTypeChange(evt: any) {
    var target = evt.target;

    this.showEnvTo = target.innerHTML.includes('Envelopes');
    this.showBillTo = target.innerHTML.includes('Bills');
    this.showPigTo = target.innerHTML.includes('Piggybanks');
  }
  addTransaction() {
    var fromID: number;
    var toID: number;
    if (this.showEnv)
      fromID = this.transFromE;
    else if (this.showBill)
      fromID = this.transFromB;
    else
      fromID = this.transFromP;
    if (this.showEnvTo)
      toID = this.transToE;
    else if (this.showBillTo)
      toID = this.transToB;
    else
      toID = this.transToP;
    console.log(toID + ' ' + fromID);
    let transaction: Transaction = {
      id: 0,
      username: "tstewart11",
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
