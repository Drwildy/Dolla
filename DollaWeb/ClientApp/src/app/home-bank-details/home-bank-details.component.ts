import { Component, OnInit } from '@angular/core';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons'
import { faAppleAlt } from '@fortawesome/free-solid-svg-icons'
import { ActivatedRoute } from "@angular/router";
import { Piggybank } from '../piggybank';
import { PiggybankService } from '../piggybank.service';

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
  public editPiggyIcon: string;

  //receives query params from components
  constructor(private route: ActivatedRoute, private piggybankService: PiggybankService) {
    this.route.queryParams.subscribe(params => {
      this.piggyID = params['bankID'];
      this.bankName = params["bankName"];
      this.bankAmount = params["bankAmount"];
      this.bankIcon = params["bankIcon"]
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





  }
  

  ngOnInit() {
  }

}
