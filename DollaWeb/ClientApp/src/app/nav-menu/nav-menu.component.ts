import { Component } from '@angular/core';
import { Envelope } from '../envelope';
import { Bill } from '../bill';
import { EnvelopeService } from '../envelope.service';
import { BillService } from '../bill.service';

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
  constructor(private envelopeService: EnvelopeService, private billService: BillService) { }

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
      icon: "empty",
      setAmount: this.setAmount
    };
    this.envelopeService.addItemTest(myEnvelope);
  }
  addBill() {
    let myBill: Bill = {
      id: 0,
      username: "tstewart11",
      name: this.billName,
      createdDate: new Date(),
      icon: "empty",
      amount: this.billAmount,
      dayDue: this.dayDue
    }
    this.billService.addItemTest(myBill);
  }
}
