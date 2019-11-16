import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Bill } from '../bill';
import { BillService } from '../bill.service';
import { Envelope } from '../envelope';
import { EnvelopeService } from '../envelope.service';
import { PiggybankService } from '../piggybank.service';
import { Salary } from '../salary';
import { SalaryService } from '../salary.service';
import { Piggybank } from '../piggybank';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  envelopes: Envelope[];
  bills: Bill[];
  banks: Piggybank[];

  salary: Salary;
  allocated: number;

  editIcon = faEdit;

  constructor(private envelopeService: EnvelopeService, private billService: BillService,
    private bankService: PiggybankService, private salaryService: SalaryService) {
    envelopeService.dataChanged$.subscribe(item => this.envelopeRefresh());
    billService.dataChanged$.subscribe(bill => this.billRefresh());
    bankService.dataChanged$.subscribe(bank => this.bankRefresh());
  }

  ngOnInit() {
    this.envelopeRefresh();
    this.billRefresh();
    this.bankRefresh();
    this.salaryService.getSalary()
      .subscribe((salary: Salary) => {
        if (salary) {
          this.salary = salary;
        } else {
          this.salary = { salaryAmount: 0, isSalary: false };
        }
      });
  }

  envelopeRefresh() {
    this.envelopeService.getEnvelopes()
      .subscribe((envelopes: Envelope[]) => {
        this.envelopes = envelopes;
        this.allocatedRefresh();
      });
  }

  billRefresh() {
    this.billService.getBills()
      .subscribe((bills: Bill[]) => {
        this.bills = bills;
        this.allocatedRefresh();
      });
  }

  bankRefresh() {
    this.bankService.getPiggybanks()
      .subscribe((banks: Piggybank[]) => {
        this.banks = banks;
        this.allocatedRefresh();
      });
  }

  allocatedRefresh() {
    this.allocated = 0;
    if (this.envelopes)
      this.allocated += this.envelopes.map((env) => env.setAmount).reduce((a, b) => a + b);
    if (this.bills)
      this.allocated += this.bills.map((bill) => bill.amount).reduce((a, b) => a + b);
    if (this.banks)
      this.allocated += this.banks.map((bank) => bank.monthlyAllocation).reduce((a, b) => a + b);
  }

  saveSalary() {
    this.salaryService.updateSalary(this.salary)
      .subscribe((salary: Salary) => {
      });
  }
}
