import { Component, OnInit, Input } from '@angular/core';
import { Bank } from '../bank';
import { BankService } from '../bank.service';

@Component({
  selector: 'app-home-banks',
  templateUrl: './home-banks.component.html',
  styleUrls: ['./home-banks.component.css', '../app.component.css']
})
export class HomeBanksComponent implements OnInit {

  @Input() limit: number = 0; //0 means no limit

  banks: Bank[];

  constructor(private bankService: BankService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.bankService.getBanks()
      .subscribe((banks: Bank[]) => {
        this.banks = banks

        //Enforce the limit of returned banks (used by overview to limit to top x)
        if (this.limit > 0 && this.banks.length > this.limit) {
          this.banks = this.banks.slice(0, 5);
        }
      });
  }
}
