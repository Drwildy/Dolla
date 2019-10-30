import { Component, OnInit } from '@angular/core';
import { EnvelopeService } from '../envelope.service';
import { Envelope } from '../envelope';
import { BillService } from '../bill.service';
import { PiggybankService } from '../piggybank.service';
import { Bank } from '../bank';
import { Bill } from '../bill';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  envelopes: Envelope[];
  bills: Bill[];
  banks: Bank[];

  constructor(private envelopeService: EnvelopeService, private billService: BillService,
    private bankService: PiggybankService) {
    envelopeService.dataChanged$.subscribe(item => this.envelopeRefresh());
    billService.dataChanged$.subscribe(bill => this.billRefresh());
    bankService.dataChanged$.subscribe(bank => this.bankRefresh());
  }

  ngOnInit() {
    this.envelopeRefresh();
    this.billRefresh();
    this.bankRefresh();
  }

  envelopeRefresh() {
    this.envelopeService.getEnvelopes()
      .subscribe((envelopes: Envelope[]) => {
        this.envelopes = envelopes;
      });
  }

  billRefresh() {
    this.billService.getBills()
      .subscribe((bills: Bill[]) => {
        this.bills = bills;
      });
  }

  bankRefresh() {
    this.bankService.getPiggybanks()
      .subscribe((banks: Bank[]) => {
        console.log(banks);
        this.banks = banks;
      });
  }

}
