import { Component, OnInit } from '@angular/core';
import { EnvelopeService } from '../envelope.service';
import { Envelope } from '../envelope';
import { Piggybank } from '../piggybank';
import { PiggybankService } from '../piggybank.service'

@Component({
  selector: 'app-home-overview',
  templateUrl: './home-overview.component.html',
  styleUrls: ['./home-overview.component.css']
})
export class HomeOverviewComponent implements OnInit {

  envelopes: Envelope[];
  bank: Piggybank;
  public piggyBanks: Piggybank[];
  testEnvelopes: Envelope[];

  public piggyName: string;
  public selIconPiggy: string;

  constructor(private envelopeService: EnvelopeService, private piggybankService: PiggybankService) { }

  ngOnInit() {
  }

  //overflowButton() {
  //  console.log("it works");

  //  let envelopeName;

  //  //gets envelopes
  //  //get the amount of each envelope and add it
  //  //curretly ahving issues getting the right amount just thought of an ingenious/spagetti way but no time lol
  //  //this.envelopeService.getEnvelopeById(this.id)
  //    //.subscribe((envelope: Envelope) => {
  //      //this.envelopes = envelope;

  //      //console.log(this.myPiggyBank);

  //    //});
    

  //  //adds a overflow bank
  //  //currently just sets a hardcode amount due to get not working and month not implemented in this sprint
  //  this.piggyName = "Overflow Month"
  //  //lol random number generator
  //  let randomNumber = Math.random() * 10;
  //  let randomAmount = 10064.34 - randomNumber;
  //  let myPiggyBank: Piggybank =
  //  {
  //    id: 0,
  //    applicationUserId: "tstewart11",
  //    name: this.piggyName,
  //    createdDate: new Date(),
  //    icon: this.selIconPiggy,
  //    amount: randomAmount,
  //    monthlyAllocation: 0
  //  }
  //  this.piggybankService.createPiggybank(myPiggyBank)
  //    .subscribe(
  //      result => {
  //        this.piggybankService.dataChanged$.emit();
  //      }
  //    );
  //}
}
