import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../bill';
import { BillService } from '../bill.service';

@Component({
  selector: 'app-home-bills',
  templateUrl: './home-bills.component.html',
  styleUrls: ['./home-bills.component.css', '../app.component.css']
})
export class HomeBillsComponent implements OnInit {

  @Input() limit: number = 0; //0 means no limit

  bills: Bill[];

  constructor(private billService: BillService) {
    billService.dataChanged$.subscribe(bill => this.refresh());
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.billService.getBills()
      .subscribe((bills: Bill[]) => {
        this.bills = bills

        //Enforce the limit of returned bills (used by overview to limit to top x)
        if (this.limit > 0 && this.bills.length > this.limit) {
          this.bills = this.bills.slice(0, 5);
        }
      });
  }

}
