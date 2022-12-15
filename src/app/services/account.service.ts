import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, share, tap } from 'rxjs';
import { Account, AccountType, AtmState, SavingPlan, TransactionalPlan, TransactionType } from '../interfaces/app.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _cardNumber: string | null = null;

  set cardNumber(number: string | null) {
    this._cardNumber = number;
  }

  get cardNumber(): string | null {
    return this._cardNumber;
  }

  atmState$ = new BehaviorSubject<AtmState>(AtmState.LOGIN);

  stateName$ = new BehaviorSubject<string>('');

  selectedAccount$ = new BehaviorSubject<Account | null>(null);

  newPlan$ = new BehaviorSubject<SavingPlan | TransactionalPlan | null>(null);

  planType$ = new BehaviorSubject<AccountType | null>(null);

  allAccounts$ = new BehaviorSubject<Account[]>([]);

constructor() {
  this.newPlan$.pipe(filter(plan => !!plan)).subscribe(
    plan => {
      if (typeof (plan as SavingPlan).additionAllowed == 'undefined') {
        this.planType$.next(AccountType.TRANSACTIONAL);
      }
      else if (typeof (plan as TransactionalPlan).creditMoneyAmount == 'undefined') {
        this.planType$.next(AccountType.SAVING);
      }
    }
  );
  this.atmState$.subscribe(
    state => {
      if (state == AtmState.NEW_ACCOUNT) {
        switch (this.planType$.value) {
          case AccountType.SAVING:
            this.stateName$.next('Create new saving account');
            break;
          case AccountType.TRANSACTIONAL:
            this.stateName$.next('Create new transactional account');
            break;
        }
        return;
      }
      else if (state == AtmState.ACCOUNT_INFO) {
        switch (this.selectedAccount$.value?.accountType) {
          case AccountType.SAVING:
            this.stateName$.next(`Saving account #${this.selectedAccount$.value?.id}`);
            break;
          case AccountType.TRANSACTIONAL:
            this.stateName$.next(`Transactional account #${this.selectedAccount$.value?.id}`);
            break;
          }
        return;
      }
      this.stateName$.next(state);
    }
  );
}

}
