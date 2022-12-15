import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AtmState, Transaction } from 'src/app/interfaces/app.interfaces';
import { AtmHttpService } from 'src/app/services/atm-http.service';

@Component({
  selector: 'app-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.scss']
})
export class TransactionsHistoryComponent implements OnInit {

  ATM_STATES = AtmState;

  transactionsHitory?: Transaction[];

  constructor(
    private atmHttpService: AtmHttpService
  ) { }

  ngOnInit() {
    forkJoin(
      [
        this.atmHttpService.getTransactionsHistory(),
        this.atmHttpService.getAllAccounts(),
      ]
      )
      .subscribe(([transactions, _]) => {
        this.transactionsHitory = transactions;
      })
  }

}
