import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../bill';


@Component({
  selector: 'app-home-bill',
  templateUrl: './home-bill.component.html',
  styleUrls: ['./home-bill.component.css', '../app.component.css']
})
export class HomeBillComponent implements OnInit {

  @Input() bill: Bill;

  constructor() { }

  ngOnInit() {

  }
}
