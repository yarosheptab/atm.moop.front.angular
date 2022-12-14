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

  newPlan$ = new BehaviorSubject<{plan: SavingPlan | TransactionalPlan, index: number} | null>(null);

  planType$ = new BehaviorSubject<AccountType | null>(null);

constructor() {
  this.newPlan$.pipe(filter(plan => !!plan)).subscribe(
    data => {
      if (typeof (data?.plan as SavingPlan).additionAllowed == 'undefined') {
        this.planType$.next(AccountType.TRANSACTIONAL);
      }
      else if (typeof (data?.plan as TransactionalPlan).creditMoneyAmount == 'undefined') {
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
      else if (state == AtmState.CHANGE_ACCOUNT_PLAN) {
        this.stateName$.next(`Change for saving account #${this.selectedAccount$.value?.id}`);
        return;
      }
      this.stateName$.next(state);
    }
  );
}

}
