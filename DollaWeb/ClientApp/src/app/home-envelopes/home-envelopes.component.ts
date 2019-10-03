import { Component, OnInit } from '@angular/core';
import { Envelope } from '../envelope';
import { User } from '../User';
import { EnvelopeService } from '../envelope.service';


@Component({
  selector: 'app-home-envelopes',
  templateUrl: './home-envelopes.component.html',
  styleUrls: ['./home-envelopes.component.css', '../app.component.css']
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
    let user: User = {
      firstName: "Tyler",
      lastName: "Stewart",
      username: "tstewart11",
      password: "Testing",
      createdDate: new Date(),
      email: "tstewart11@uco.edu"

    };


    let myEnvelope: Envelope = { id: 0, user: user, name: "Testing", amount: 12, createdDate: new Date(), icon: "empty", setAmount: 25 };
    this.envelopeService.addItemTest(myEnvelope);
  }
}
