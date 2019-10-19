import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-home-envelope-details',
  templateUrl: './home-envelope-details.component.html',
  styleUrls: ['./home-envelope-details.component.css']
})
export class HomeEnvelopeDetailsComponent implements OnInit {

  public envelopeName: string;
  public envelopeAmount: number;
  public envelopeSetAmount: number;

  //receives query data from another component
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.envelopeName = params["envelopeName"];
      this.envelopeAmount = params["envelopeAmount"];
      this.envelopeSetAmount = params["envelopeSetAmount"]
    });
    console.log(this.envelopeName, this.envelopeAmount, this.envelopeSetAmount);
  }

  ngOnInit() {
  }

}
