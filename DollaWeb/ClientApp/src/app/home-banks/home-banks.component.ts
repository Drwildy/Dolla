import { Component, OnInit } from '@angular/core';
import { Bank } from '../bank';
import { BankService } from '../bank.service';

@Component({
  selector: 'app-home-banks',
  templateUrl: './home-banks.component.html',
  styleUrls: ['./home-banks.component.css', '../app.component.css']
})
export class HomeBanksComponent implements OnInit {

  banks: Bank[];

  constructor(private bankService: BankService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.bankService.getBanks()
      .subscribe((banks: Bank[]) => { this.banks = banks });
  }
}
