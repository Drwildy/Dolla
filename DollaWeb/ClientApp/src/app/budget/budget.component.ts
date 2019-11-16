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
import { forEach } from '@angular/router/src/utils/collection';


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

  my_Piggybank_Pie_Chart: any; 

  my_Bill_Pie_Chart: any;

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
  }

  public billsNames = [];
  public billsColor = [];
  public billsAmount = [];

  my_Bill_Pie_Chart_Display() {
    this.my_Bill_Pie_Chart = new Chart('pie_Bills_Chart', {
      type: "pie",
      data: {
        labels: this.billsNames,
        datasets: [
          {
            label: 'Bills Overview',
            data: this.billsAmount,
            backgroundColor: this.billsColor,
            borderWidth: 1,
          },
        ]
      },
      options: {
        title: {
          display: true,
          text: "Overall Bills Details",
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        legend: {
          display:false,
          position: 'bottom'
        },
        responsive: true,
      }
    });
  }

  public piggyBankNames = [];
  public piggyBankColor = [];
  public piggyBankAmount = [];
  
  my_Piggybank_Pie_Chart_Display() {
    this.my_Piggybank_Pie_Chart = new Chart('pie_Piggybank_Chart', {
      type: "pie",
      data: {
        labels: this.piggyBankNames,
        datasets: [
          {
            label: 'Piggybank Overview',
            data: this.piggyBankAmount,
            backgroundColor: this.piggyBankColor,
            borderWidth: 1,
          },
        ]
      },
      options: {
        title: {
          display: true,
          text: "Overall Piggybank Details",

        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        legend: {
          display:false,
          position: 'bottom'
        },
        responsive: true,
      }
    });
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
            data: this.envelopesSetAmount, 
            backgroundColor: "#2A6735",
            borderWidth: 1,
          },
          {
            label: "Envelope Expense",
            data: this.envelopesAmount,
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
          intersect: false,
          
        },
        legend: {
          display:false,
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
          data: [envelopeSetAmountTotal, envelopeSetAmountTotal - envelopeAmountTotal ],
          backgroundColor: ['#2A6735','#C12807'],
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
        this.envelopesName = [];
        this.envelopesAmount = [];
        this.envelopesSetAmount = [];

        for (let env of envelopes) {
          
          this.envelopesName.push(env.name);
          this.envelopesAmount.push(env.amount);
          this.envelopesSetAmount.push(env.setAmount);
        }
        this.allocatedRefresh();
        this.my_Envelope_Bar_Chart_Display();
        this.my_Envelope_Dougnnut_Chart_Display();
       

      });
  }

  billRefresh() {
    this.billService.getBills()
      .subscribe((bills: Bill[]) => {
        this.bills = bills;

        this.billsColor = [];
        this.billsNames = [];
        this.billsAmount = [];

        for (let bill of bills) {
          this.billsAmount.push(bill.amount);
          this.billsNames.push(bill.name);
          this.billsColor.push('#' + Math.floor(Math.random() * 16777215).toString(16));
        }
        this.my_Bill_Pie_Chart_Display()

        this.allocatedRefresh();
      });
  }

  bankRefresh() {
    this.bankService.getPiggybanks()
      .subscribe((banks: Piggybank[]) => {
        this.banks = banks;
        this.piggyBankColor = [];
        this.piggyBankNames = [];
        this.piggyBankAmount = [];

        for (let bank of banks) {
          this.piggyBankAmount.push(bank.amount);
          this.piggyBankNames.push(bank.name);
          this.piggyBankColor.push('#' + Math.floor(Math.random() * 16777215).toString(16));
        }
        this.my_Piggybank_Pie_Chart_Display()
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
