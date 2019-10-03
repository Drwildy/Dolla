import { Component, OnInit } from '@angular/core';
import { Envelope } from '../envelope';
import { User } from '../User';
import { EnvelopeService } from '../envelope.service';


@Component({
  selector: 'app-home-envelopes',
  templateUrl: './home-envelopes.component.html',
  styleUrls: ['./home-envelopes.component.css']
})
export class HomeEnvelopesComponent implements OnInit {

  envelopes: Envelope[];

  constructor(private envelopeService: EnvelopeService) { }

  ngOnInit() {
    this.refresh();
    
  }

  refresh() {
    //this.envelopeService.getEnvelopes()
      //.subscribe((envelopes: Envelope[]) => { this.envelopes = envelopes });
  }
  addEnvelope() {
   


    let myEnvelope: Envelope = { id: 0, username: "tstewart11", name: "Testing", amount: 12, createdDate: new Date(), icon: "empty", setAmount: 25 };
    this.envelopeService.addItemTest(myEnvelope);
  }
}
