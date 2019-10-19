import { Component, OnInit, Input } from '@angular/core';
import { Envelope } from '../envelope';
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: 'app-home-envelope',
  templateUrl: './home-envelope.component.html',
  styleUrls: ['./home-envelope.component.css']
})
export class HomeEnvelopeComponent implements OnInit {

  private easyBorder: number = 60;
  private medBorder: number = 80;

  private lowColor: string = '#33cc33'
  private medColor: string = '#ffcc00';
  private highColor: string = '#ff3300';

  @Input() envelope: Envelope;

  color: string;
  percentage: number;

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.envelope) {
      this.percentage = Math.min(100, (this.envelope.amount / this.envelope.setAmount) * 100);
      this.setColor();
    }
  }

  private setColor() {
    if (this.percentage < this.easyBorder) {
      this.color = this.lowColor;
    } else if (this.percentage < this.medBorder) {
      this.color = this.medColor;
    } else {
      this.color = this.highColor;
    }
  }

  //currently sending through query params, change using id
  envelopeDetails() {
    let envelopeDetails: NavigationExtras = {
      queryParams: {
        "envelopeName": this.envelope.name,
        "envelopeAmount": this.envelope.amount,
        "envelopeSetAmount": this.envelope.setAmount
      }
    };
    this.router.navigate(["/home-envelope-details"], envelopeDetails);
  }
}
