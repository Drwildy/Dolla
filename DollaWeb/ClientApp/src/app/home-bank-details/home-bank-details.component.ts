import { Component, OnInit } from '@angular/core';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons'
import { faAppleAlt } from '@fortawesome/free-solid-svg-icons'
import { ActivatedRoute } from "@angular/router";

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

  //receives query params from components
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.bankName = params["bankName"];
      this.bankAmount = params["bankAmount"];
      this.bankIcon = params["bankIcon"]
      //can add icon response here
    });
      console.log(this.bankName, this.bankAmount, this.bankIcon);
  }

  ngOnInit() {
  }

}
