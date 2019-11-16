import { Component, OnInit, Input } from '@angular/core';
import { Moneybox } from '../moneybox';
import { BudgetService } from '../budget.service';
import { BillService } from '../bill.service';
import { PiggybankService } from '../piggybank.service';
import { EnvelopeService } from '../envelope.service';
import { Envelope } from '../envelope';
import { Piggybank } from '../piggybank';
import { Bill } from '../bill';

@Component({
  selector: 'app-budget-moneybox',
  templateUrl: './budget-moneybox.component.html',
  styleUrls: ['./budget-moneybox.component.css']
})
export class BudgetMoneyboxComponent implements OnInit {

  @Input() envelope: Envelope;
  @Input() bill: Bill;
  @Input() bank: Piggybank;

  icon: string;

  isOpen: boolean = false;

  editMoneybox: Moneybox;
  type: number; // 1=env | 2=bill | 3=bank

  percentageMode: boolean = false;
  percentage: number = 0;
  amount: number = 0;

  constructor(private budgetService: BudgetService, private envelopeService: EnvelopeService,
    private billService: BillService, private bankService: PiggybankService) {

  }

  ngOnInit() {

    this.type = this.envelope ? 1 : (this.bill ? 2 : 3);

    switch (this.type) {
      case 1:
        this.editMoneybox = JSON.parse(JSON.stringify(this.envelope)); //deep copy;
        this.amount = this.envelope.setAmount;
        break;
      case 2:
        this.editMoneybox = JSON.parse(JSON.stringify(this.bill)); //deep copy;
        this.amount = this.bill.amount;
        break;
      case 3:
        this.editMoneybox = JSON.parse(JSON.stringify(this.bank)); //deep copy;
        this.amount = this.bank.monthlyAllocation;
        break;
    }

    this.icon = this.editMoneybox.icon ? this.editMoneybox.icon : "";

    this.budgetService.expandMoneyboxWithId.subscribe((id: number) => {
      if (this.editMoneybox.id !== id && this.isOpen) {
        document.getElementById('details_' + this.editMoneybox.id).classList.remove('show');
        this.onClickHeader();
      }
    });

  }

  onClickHeader() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.budgetService.expandMoneyboxWithId.emit(this.editMoneybox.id);
    }
  }

  onNameExit() {
    this.saveToDb();
  }

  // This is called when the user selects 
  onIconChange() {
    console.log('icon changed');
  }

  togglePercentage() {
    this.percentageMode = !this.percentageMode;
  }

  incrementAmount(value: number) {
    this.amount += value;
  }


  private saveToDb() {
    switch (this.type) {
      case 1:

        break;
      case 2:
        break;
      case 3:
        break;
    }
  }
}
