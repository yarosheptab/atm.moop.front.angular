import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { filter } from 'rxjs';
import { AccountType, AtmState, Currencies, SavingPlan, TransactionalPlan } from 'src/app/interfaces/app.interfaces';
import { AccountService } from 'src/app/services/account.service';
import { AtmHttpService } from 'src/app/services/atm-http.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent implements OnInit, OnDestroy {

  transactionalPlan?: TransactionalPlan;
  savingPlan?: SavingPlan;
  index: number = -1;

  ATM_STATES = AtmState;

  planForm = this.fb.group({
    accountName: new FormControl('', [Validators.required, Validators.maxLength(64), Validators.minLength(3)]),
    currency: new FormControl('', Validators.required),
  });

  currencyList: Currencies = [];

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private atmHttpService: AtmHttpService,
    private navigationService: NavigationService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.accountService.newPlan$
    .pipe(filter(res => !!res))
    .subscribe(data => {

      if (this.accountService.planType$.value === AccountType.TRANSACTIONAL) {
        this.transactionalPlan = data?.plan as TransactionalPlan;
      }
      else if (this.accountService.planType$.value === AccountType.SAVING) {
        this.savingPlan = data?.plan as SavingPlan;
      }
      this.index = data?.index ?? -1;
    });

    this.atmHttpService.getCurrency()
      .subscribe(currency => {
        this.currencyList = currency;
        this.planForm.patchValue({currency: this.currencyList[0] ?? ''}, {emitEvent: false});
      })
  }

  submitForm() {
    if (this.planForm.get('accountName')?.invalid ||
      this.planForm.get('currency')?.invalid) {
        this.planForm.markAllAsTouched();
        return;
    }

    if (this.savingPlan) {
      this.atmHttpService.createSavingAccount(this.index, this.planForm.get('currency')!.value!, this.planForm.get('accountName')!.value!)
        .subscribe(() => {
          this.navigationService.goTo(AtmState.MAIN_MENU);
          this.notificationService.notification$.next('Saving plan successfully created!')
        })
    }
    else if (this.transactionalPlan) {
      this.atmHttpService.createTransactionalAccount(this.index, this.planForm.get('currency')!.value!, this.planForm.get('accountName')!.value!)
        .subscribe(() => {
          this.navigationService.goTo(AtmState.MAIN_MENU);
          this.notificationService.notification$.next('Transactional plan successfully created!')
        })
    }
  }

  ngOnDestroy(): void {
    this.accountService.newPlan$.next(null);
  }

}
