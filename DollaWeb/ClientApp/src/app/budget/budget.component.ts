import { Component, OnInit, ElementRef } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Bill } from '../bill';
import { BillService } from '../bill.service';
import { Envelope } from '../envelope';
import { EnvelopeService } from '../envelope.service';
import { PiggybankService } from '../piggybank.service';
import { Salary } from '../salary';
import { SalaryService } from '../salary.service';
import { Piggybank } from '../piggybank';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  public envelopes: Envelope[];
  bills: Bill[];
  banks: Piggybank[];

  salary: Salary;
  allocated: number;

  envelopeTotalAmount: number;
  envelopeTotalSetAmount: number; 

  editIcon = faEdit;

  my_Envelope_Bar_Chart: any;
  my_Envelope_Dougnnut_Chart: any;

  constructor(private envelopeService: EnvelopeService, private billService: BillService,
    private bankService: PiggybankService, private salaryService: SalaryService, private elementRef: ElementRef ) {
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
    
    // For displaying charts.
    this.my_Envelope_Bar_Chart_Display();
    this.my_Envelope_Dougnnut_Chart_Display();

  }

  public envelopesName = [] 
  public envelopesAmount = [];
  public envelopesSetAmount = [];
  
  
  my_Envelope_Bar_Chart_Display() {
    this.my_Envelope_Bar_Chart = new Chart('bar_Envelope_Chart', {
      type: "bar",
      data: {
        labels: this.envelopesName,
        datasets: [
          {
            label: 'Envelope Allowance',
            data: this.envelopesAmount,
            backgroundColor: "#2A6735",
            borderWidth: 1,
          },
          {
            label: "Envelope Expense",
            data: this.envelopesSetAmount,
            backgroundColor: "#C12807",
            borderWidth: 1,

          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "Overall Envelopes Details",

        },
        tooltips: {
          mode: 'index',
          intersect: true
        },
        legend: {
          position: 'bottom'
        },
        responsive: true,
        scales: {
          xAxes: [{
            stacked: false,
            ticks: {
              beginAtZero: true,
            }
          }],
          yAxes: [{
            stacked: false,
            ticks: {
              beginAtZero: true,
            }
          }]
        }
      }
    });
  }

  my_Envelope_Dougnnut_Chart_Display() {

    var envelopeAmountTotal = 29;
    var envelopeSetAmountTotal = 23;

    for (let i = 0; i < this.envelopesAmount.length; i++) {
      envelopeAmountTotal += this.envelopesAmount[i];
      console.log(this.envelopesAmount[i])
    }
    for (let i = 0; i < this.envelopesAmount.length; i++) {
      envelopeSetAmountTotal += this.envelopesSetAmount[i];
     
    }
    

    this.my_Envelope_Dougnnut_Chart = new Chart('doughnut_Envelope_Chart', {
      type: "doughnut",
      data: {
        labels: ['Total','Remaining'],
        datasets: [{
          data: [envelopeAmountTotal, envelopeAmountTotal - envelopeSetAmountTotal],
          backgroundColor: ['#01a9db','#234512'],
          label: "Envelopes Amount"
        }]
      },
      options: {
        responsive: true,
        legend: {
          position: "bottom"
        },
        title: {
          display: true,
          text: "Total Envelope Overview"
        },
        animation: {
          animateScale: true
        }
      }
    });
  }
  envelopeRefresh() {
    
    this.envelopeService.getEnvelopes()
      .subscribe((envelopes: Envelope[]) => {
        this.envelopes = envelopes;
        for (let env of envelopes) {
          this.envelopesName.push(env.name);
          this.envelopesAmount.push(env.amount);
          this.envelopesSetAmount.push(env.setAmount);
        }
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
    this.allocated += this.envelopes.map((env) => env.setAmount).reduce((a, b) => a + b);
    this.allocated += this.bills.map((bill) => bill.amount).reduce((a, b) => a + b);
    this.allocated += this.banks.map((bank) => bank.monthlyAllocation).reduce((a, b) => a + b);
  }

  saveSalary() {
    this.salaryService.updateSalary(this.salary)
      .subscribe((salary: Salary) => {
      });
  }
}
