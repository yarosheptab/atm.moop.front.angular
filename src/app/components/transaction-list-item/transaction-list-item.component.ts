import { Component, Input, OnInit } from '@angular/core';
import { AtmState, ScheduledTransaction, ScheduledTransactionStatus, Transaction, TransactionType } from 'src/app/interfaces/app.interfaces';
import { AccountService } from 'src/app/services/account.service';
import { AtmHttpService } from 'src/app/services/atm-http.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-transaction-list-item',
  templateUrl: './transaction-list-item.component.html',
  styleUrls: ['./transaction-list-item.component.scss']
})
export class TransactionListItemComponent implements OnInit {

  @Input() transaction?: Transaction;
  @Input() transactionSch?: ScheduledTransaction;

  SCHEDULED_STATUSES = ScheduledTransactionStatus;

  constructor(
    private accountService: AccountService,
    private atmHttpService: AtmHttpService,
    private navigationService: NavigationService,
    private notificationService: NotificationService
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

  cancelRegularTransaction() {
    if (!this.transactionSch) return;

    this.atmHttpService.cancelRegularTransaction(this.transactionSch?.id)
    .subscribe(() => {
      this.navigationService.goTo(AtmState.ACCOUNT_INFO);
      this.notificationService.notification$.next('Scheduled transaction successfully cancelled!')
    });
  }
}
