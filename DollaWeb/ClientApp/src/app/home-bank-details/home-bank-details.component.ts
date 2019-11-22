import { Component, OnInit } from '@angular/core';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons'
import { faAppleAlt } from '@fortawesome/free-solid-svg-icons'
import { ActivatedRoute } from "@angular/router";
import { Piggybank } from '../piggybank';
import { PiggybankService } from '../piggybank.service';
import { Chart } from 'chart.js';
import { CurrencyPipe, formatCurrency } from '@angular/common';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../transaction';

@Component({
  selector: 'app-home-bank-details',
  templateUrl: './home-bank-details.component.html',
  styleUrls: ['./home-bank-details.component.css']
})
export class HomeBankDetailsComponent implements OnInit {

  public bankName: string;
  public bankAmount: number;
  public bankIcon: string;
  public icon = faAppleAlt;


  public piggyName: string;
  public piggyAmount: number;
  public piggySetAmount: number;
  public piggyIcon: string;
  public piggyID: number;

  public id: number;
  public myPiggyBank: Piggybank;
  public myPiggyBanks: Piggybank[];
  public editPiggyIcon: string;

  public my_Piggybank_Pie_Chart: any;

  trans: Transaction[];

  //receives query params from components
  constructor(private route: ActivatedRoute, private piggybankService: PiggybankService, private transactionService: TransactionService) {
    this.route.queryParams.subscribe(params => {
      this.piggyID = params['bankID'];
      //can add icon response here
    });
    this.id = this.piggyID;
    this.getPiggyBankByID();
  }

  getPiggyBankByID() {
    this.piggybankService.getPiggyBankById(this.id)
      .subscribe((piggybank: Piggybank) => {
        this.myPiggyBank = piggybank;

        console.log(this.myPiggyBank);

      });
  }

  editPiggyBankIcon() {
    let editPiggyBankInfo: Piggybank = this.myPiggyBank;
   
    if (this.editPiggyIcon != null) {
      editPiggyBankInfo.icon = this.editPiggyIcon;
    }
    //edit envelope through envelope service
    try {
      this.piggybankService.editPiggybank(this.id, editPiggyBankInfo)
        .subscribe(
          result => {
            this.piggybankService.dataChanged$.emit();
          }
        );
    } catch{

    }


  }
  

  ngOnInit() {
    this.getPiggyBanksInfo();
    this.refresh();
  }

  public piggyBankNames = [];
  public piggyBankAmount = [];
  public piggyBankColor = [];

  refresh() {
    this.transactionService.getTransaction()
      .subscribe((allTrans: Transaction[]) => {
        this.trans = allTrans.filter(t => t.transferFromId == this.id || t.transferToId == this.id);
        console.log(this.trans);
      });
  }

  getPiggyBanksInfo() {
    this.piggybankService.getPiggybanks()
      .subscribe((banks: Piggybank[]) => {
        this.myPiggyBanks = banks;

        /* This code will display piechart.
         *
         * 
        this.piggyBankColor = [];
        this.piggyBankNames = [];
        this.piggyBankAmount = [];

        for (let bank of banks) {
          this.piggyBankAmount.push(bank.amount);
          this.piggyBankNames.push(bank.name);
          this.piggyBankColor.push('#' + Math.floor(Math.random() * 16777215).toString(16));
        }
        this.my_Piggybank_Pie_Chart_Display()
       */
      });
  }

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
          display: false,
          position: 'bottom'
        },
        responsive: true,
      }
    });
  }

}
