import { Component, Output, EventEmitter } from '@angular/core';
import { Envelope } from '../envelope';
import { Bill } from '../bill';
import { EnvelopeService } from '../envelope.service';
import { BillService } from '../bill.service';
import { PiggybankService } from '../piggybank.service'
import { Piggybank } from '../piggybank';
import { User } from '../User';
import { NavbarService } from '../navbar.service';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

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
    constructor(private envelopeService: EnvelopeService, private billService: BillService, private piggybankService: PiggybankService, public nav: NavbarService) { }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  addEnvelope() {
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

  addBill() {
    let myBill: Bill = {
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

  addPiggybank() {
    console.log(this.selIconPiggy);
    let myPiggyBank: Piggybank = {
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
}

