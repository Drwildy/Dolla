import { Component, OnInit } from '@angular/core';
import { Envelope } from '../envelope';
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
    this.envelopeService.getEnvelopes()
      .subscribe((envelopes: Envelope[]) => { this.envelopes = envelopes });
  }
}
