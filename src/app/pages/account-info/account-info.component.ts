import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY } from 'rxjs';
import { AccountStatus, AccountType, AtmState, SavingPlan, SavingPlanType } from 'src/app/interfaces/app.interfaces';
import { AccountService } from 'src/app/services/account.service';
import { AtmHttpService } from 'src/app/services/atm-http.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

  ATM_STATES = AtmState;
  ACCOUNT_TYPES = AccountType;
  ACCOUNT_STATUSES = AccountStatus;
  SAVING_PLAN_TYPE = SavingPlanType;

  account$ = this.accountService.selectedAccount$;

  isPlain = this.account$.value?.accountType === AccountType.SAVING ? this.account$.value?.savingAccountPlan?.id === SavingPlanType.PLAIN : false;

  isSettings$ = new BehaviorSubject<boolean>(false);
  isChoosingPlan$ = new BehaviorSubject<boolean>(false);
  savingPlans$ = new BehaviorSubject<SavingPlan[]>([]);

  constructor(
    private accountService: AccountService,
    private navigationService: NavigationService,
    private atmHttpService: AtmHttpService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
  }

  openSettings(value: boolean) {
    this.isSettings$.next(value);
    this.isChoosingPlan$.next(false);
  }

  changeAccountPlan() {
    this.isChoosingPlan$.next(true);
    this.atmHttpService.getPlans()
      .pipe(
        catchError(err => {
          if (err.error?.message) {
            this.notificationService.notification$.next(err.error?.message);
          }
          return EMPTY;
        }),
      )
      .subscribe(resp => {
        this.savingPlans$.next(
          resp.plans.saving
            .filter(
              plan => plan.id !== this.account$.value?.savingAccountPlan?.id
            )
        );
      });
  }

  terminateContract() {
    if (!this.account$.value) {
      return;
    }
    this.atmHttpService.terminateSavingPlan(this.account$.value.id)
      .pipe(
        catchError(err => {
          if (err.error?.message) {
            this.notificationService.notification$.next(err.error?.message);
          }
          return EMPTY;
        }),
      )
      .subscribe(account => {
        this.account$.next(account);
        this.isPlain = account.savingAccountPlan?.id === SavingPlanType.PLAIN;
        this.notificationService.notification$.next('Contract was successfully terminated!');
      })
  }

  fireContract() {
    if (!this.account$.value) {
      return;
    }
    this.atmHttpService.fireSavingPlan(this.account$.value.id)
      .pipe(
        catchError(err => {
          if (err.error?.message) {
            this.notificationService.notification$.next(err.error?.message);
          }
          return EMPTY;
        }),
      )
      .subscribe(account => {
        this.account$.next(account);
        this.isPlain = account.savingAccountPlan?.id === SavingPlanType.PLAIN;
        this.notificationService.notification$.next('Contract was successfully fired!');
      })
  }

  onSelectNewPlan(planId: SavingPlanType) {
    if (!this.account$.value) {
      return;
    }
    this.atmHttpService.changeSavingAccountPlan(this.account$.value.id, planId)
      .pipe(
        catchError(err => {
          if (err.error?.message) {
            this.notificationService.notification$.next(err.error?.message);
          }
          return EMPTY;
        }),
      )
      .subscribe(account => {
        this.account$.next(account);
        this.openSettings(true);
      })
  }

  openAccountHistory() {
    this.navigationService.goTo(AtmState.TRANSACTION_HISTORY);
  }

  openActiveTransactions() {
    this.navigationService.goTo(AtmState.REGULAR_TRANSACTION_HISTORY);
  }

}
