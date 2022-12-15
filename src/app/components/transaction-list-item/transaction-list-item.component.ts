import { Component, Input, OnInit } from '@angular/core';
import { Transaction, TransactionType } from 'src/app/interfaces/app.interfaces';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-transaction-list-item',
  templateUrl: './transaction-list-item.component.html',
  styleUrls: ['./transaction-list-item.component.scss']
})
export class TransactionListItemComponent implements OnInit {

  @Input() transaction?: Transaction;

  constructor(
    private accountService: AccountService
  ) { }

  transactionColor = 'black';

  ngOnInit() {
    this.transactionColor = this.getTransactionColor();
  }

  getTransactionColor(): string {
    switch (this.transaction?.transactionType) {
      case TransactionType.DEPOSIT:
        return 'lawngreen';
      case TransactionType.WITHDRAWAL:
        return 'red';
      case TransactionType.TRANSFERRING:
        return this.getTransferringColor();
      default:
        return 'black';
    }
  }

  getTransferringColor(): string {
    const isFrom = this.accountService.allAccounts$.value.findIndex(account => account.id === this.transaction?.fromAccount.id) >= 0;
    const isTo = this.accountService.allAccounts$.value.findIndex(account => account.id === this.transaction?.toAccount.id) >= 0;

    if (isFrom && isTo) return 'yellow';
    else if (isFrom) return 'red';
    else if (isTo) return 'lawngreen';
    else return 'black';
  }
}
