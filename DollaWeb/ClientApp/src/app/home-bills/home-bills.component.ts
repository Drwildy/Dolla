import { Component, OnInit } from '@angular/core';
import { Bill } from '../bill';
import { BillService } from '../bill.service';

@Component({
  selector: 'app-home-bills',
  templateUrl: './home-bills.component.html',
  styleUrls: ['./home-bills.component.css', '../app.component.css']
})
export class HomeBillsComponent implements OnInit {

  bills: Bill[];

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.billService.getBills()
      .subscribe((bills: Bill[]) => { this.bills = bills });
  }

}
