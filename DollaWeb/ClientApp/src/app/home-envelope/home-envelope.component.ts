import { Component, OnInit, Input } from '@angular/core';
import { Envelope } from '../envelope';

@Component({
  selector: 'app-home-envelope',
  templateUrl: './home-envelope.component.html',
  styleUrls: ['./home-envelope.component.css']
})
export class HomeEnvelopeComponent implements OnInit {

  @Input() envelope: Envelope;

  constructor() { }

  ngOnInit() {
  }

}
