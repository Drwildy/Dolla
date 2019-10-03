import { Component } from '@angular/core';
import { Envelope } from '../envelope';
import { EnvelopeService } from '../envelope.service';
import { User } from '../User';
import { NavbarService } from '../navbar.service';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  public envName: string;
  public setAmount: number;
  constructor(private envelopeService: EnvelopeService) { }
  constructor( public nav: NavbarService ) {}


  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  addEnvelope() {

    let myEnvelope: Envelope =
    {
      id: 0,
      username: "tstewart11",
      name: this.envName,
      amount: 0,
      createdDate: new Date(),
      icon: "empty",
      setAmount: this.setAmount
    };
    this.envelopeService.addItemTest(myEnvelope);
  }
}

