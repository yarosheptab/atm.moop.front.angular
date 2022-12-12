import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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
    this.accountService.newPlan$.subscribe(plan => {

      if (this.accountService.planType$.value === AccountType.TRANSACTIONAL) {
        this.transactionalPlan = plan as TransactionalPlan;
      }
      else if (this.accountService.planType$.value === AccountType.SAVING) {
        this.savingPlan = plan as SavingPlan;
      }
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
      this.atmHttpService.createSavingAccount(this.savingPlan.planName.toUpperCase(), this.planForm.get('currency')!.value!, this.planForm.get('accountName')!.value!)
        .subscribe(() => {
          this.navigationService.goTo(AtmState.MAIN_MENU);
          this.notificationService.notification$.next('Saving plan succesfully created!')
        })
    }
    else if (this.transactionalPlan) {
      this.atmHttpService.createSavingAccount(this.transactionalPlan.planName.toUpperCase(), this.planForm.get('currency')!.value!, this.planForm.get('accountName')!.value!)
        .subscribe(() => {
          this.navigationService.goTo(AtmState.MAIN_MENU);
          this.notificationService.notification$.next('Transactional plan succesfully created!')
        })
    }
  }

  ngOnDestroy(): void {
    this.accountService.newPlan$.next(null);
  }

}
