import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  constructor( public nav: NavbarService ) { }

  ngOnInit() {
    this.nav.hide();
  }

}
