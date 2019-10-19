import { Component, OnInit, Input } from '@angular/core';
import { Envelope } from '../envelope';
import { User } from '../User';
import { EnvelopeService } from '../envelope.service';


@Component({
  selector: 'app-home-envelopes',
  templateUrl: './home-envelopes.component.html',
  styleUrls: ['./home-envelopes.component.css', '../app.component.css']
})
export class HomeEnvelopesComponent implements OnInit {

  @Input() limit: number = 0; //0 means no limit

  envelopes: Envelope[];

  constructor(private envelopeService: EnvelopeService) {
    envelopeService.dataChanged$.subscribe(item => this.refresh());
  }

  ngOnInit() {
    this.refresh(); 
  }

  refresh() {
    console.log('refreshing...');
    this.envelopeService.getEnvelopes()
      .subscribe((envelopes: Envelope[]) => {
        this.envelopes = envelopes;

        //Enforce the limit of returned envelopes (used by overview to limit to top x)
        if (this.limit > 0 && this.envelopes.length > this.limit) {
          this.envelopes = this.envelopes.slice(0, 5);
        }
      });
  }

  addEnvelope() {
   


    let myEnvelope: Envelope = { id: 0, username: "tstewart11", name: "Testing", amount: 12, createdDate: new Date(), icon: "empty", setAmount: 25 };
    this.envelopeService.createEnvelope(myEnvelope);
  }
}
