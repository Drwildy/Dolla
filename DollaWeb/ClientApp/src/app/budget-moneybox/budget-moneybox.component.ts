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
  amount: number = 0;
  type: number; // 1=env | 2=bill | 3=bank

  percentageMode: boolean = false;
  percentage: number = 0;
  editAmount: number = 0;
  

  constructor(private budgetService: BudgetService, private envelopeService: EnvelopeService,
    private billService: BillService, private bankService: PiggybankService) {

  }

  ngOnInit() {

    this.type = this.envelope ? 1 : (this.bill ? 2 : 3);

    switch (this.type) {
      case 1:
        this.editMoneybox = JSON.parse(JSON.stringify(this.envelope)); //deep copy;
        this.editAmount = this.envelope.setAmount;
        this.amount = this.envelope.setAmount;
        break;
      case 2:
        this.editMoneybox = JSON.parse(JSON.stringify(this.bill)); //deep copy;
        this.editAmount = this.bill.amount;
        this.amount = this.bill.amount;
        break;
      case 3:
        this.editMoneybox = JSON.parse(JSON.stringify(this.bank)); //deep copy;
        this.editAmount = this.bank.monthlyAllocation;
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
    } else {
      this.saveToDb();
    }
  }

  onNameExit() {
    this.saveToDb();
  }

  onDueExit() {
    this.saveToDb();
  }

  onIconChange() {
    this.saveToDb();
  }

  togglePercentage() {
    this.percentageMode = !this.percentageMode;
  }

  incrementAmount(value: number) {
    this.editAmount += value;
  }


  private saveToDb() {
    switch (this.type) {
      case 1:
        this.envelope.name = this.editMoneybox.name;
        this.envelope.icon = this.icon;
        this.envelope.setAmount = this.editAmount;
        this.envelopeService.editEnvelope(this.envelope.id, this.envelope).subscribe(res => {
          //this.envelopeService.dataChanged$.emit();
        });
        break;
      case 2:
        this.bill.name = this.editMoneybox.name;
        this.bill.icon = this.icon;
        this.bill.amount = this.editAmount;
        this.billService.editBill(this.bill.id, this.bill).subscribe(res => {
          //this.billService.dataChanged$.emit();
        });
        break;
      case 3:
        this.bank.name = this.editMoneybox.name;
        this.bank.icon = this.icon;
        this.bank.monthlyAllocation = this.editAmount;
        this.bankService.editPiggybank(this.bank.id, this.bank).subscribe(res => {
          //this.bankService.dataChanged$.emit();
        });
        break;
    }
  }

  private moneyboxToEntity(copyFrom: Moneybox, copyTo: Moneybox) {
    copyFrom.name = copyTo.name;


  }
}
