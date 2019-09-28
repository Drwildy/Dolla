import { Component, OnInit } from '@angular/core';
import { EnvelopeService } from '../envelope.service';
import { Envelope } from '../envelope';

@Component({
  selector: 'app-home-overview',
  templateUrl: './home-overview.component.html',
  styleUrls: ['./home-overview.component.css']
})
export class HomeOverviewComponent implements OnInit {

  envelopes: Envelope[];

  constructor() { }

  ngOnInit() {
  }
}
