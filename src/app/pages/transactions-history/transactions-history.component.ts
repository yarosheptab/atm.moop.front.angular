import { Component, Input, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AtmState, Transaction } from 'src/app/interfaces/app.interfaces';
import { AccountService } from 'src/app/services/account.service';
import { AtmHttpService } from 'src/app/services/atm-http.service';

@Component({
  selector: 'app-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.scss']
})
export class TransactionsHistoryComponent implements OnInit {

  ATM_STATES = AtmState;

  transactionsHitory?: Transaction[];

  selectedAccount$ = this.accountService.selectedAccount$;

  constructor(
    private atmHttpService: AtmHttpService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    forkJoin(
      [
        this.atmHttpService.getTransactionsHistory(this.selectedAccount$.value?.id),
        this.atmHttpService.getAllAccounts(),
      ]
      )
      .subscribe(([transactions, _]) => {
        this.transactionsHitory = transactions;
      })
  }

}
