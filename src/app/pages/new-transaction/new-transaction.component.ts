import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { catchError, EMPTY } from 'rxjs';
import { Account, AtmState } from 'src/app/interfaces/app.interfaces';
import { AtmHttpService } from 'src/app/services/atm-http.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.scss']
})
export class NewTransactionComponent implements OnInit {

  ATM_STATES = AtmState;

  httpError = '';

  accounts: Account[] = [];

  transactionForm = this.fb.group({
    senderAccountDd: new FormControl<number | null>(null, [Validators.required]),
    amount: new FormControl(0, [Validators.required, Validators.min(1)]),
    receiverAccountId: new FormControl<number | null>(null, [Validators.required]),
    sendAt: new FormControl(false),
    scheduledTime: new FormControl(new Date(), [Validators.required]),
    isRegular: new FormControl(false),
    period: new FormControl('', [Validators.required]),
    initialRepeats: new FormControl(null),
  });

  constructor(
    private fb: FormBuilder,
    private atmHttpService: AtmHttpService,
    private notificationService: NotificationService,
    private navigationService: NavigationService
  ) { }

  ngOnInit() {
    this.atmHttpService.getAllAccounts()
      .subscribe(accounts => {
        this.accounts = accounts;
        this.transactionForm.patchValue({senderAccountDd: accounts[0].id}, {emitEvent: false})
        this.transactionForm.get('scheduledTime')?.disable()
        this.transactionForm.get('period')?.disable();
        this.transactionForm.get('initialRepeats')?.disable();
      });

    this.transactionForm.get('sendAt')?.valueChanges
    .subscribe(event => {
      if (event)  {
        this.transactionForm.get('scheduledTime')?.enable();
      }
      else {
        this.transactionForm.get('scheduledTime')?.disable();
      }
    });

    this.transactionForm.get('isRegular')?.valueChanges
    .subscribe(event => {
      if (event)  {
        this.transactionForm.get('period')?.enable();
        this.transactionForm.get('initialRepeats')?.enable();
      }
      else {
        this.transactionForm.get('period')?.disable();
        this.transactionForm.get('initialRepeats')?.disable();
      }
    });
  }

  periodGuide() {
    this.notificationService.notification$.next('Example format:   P1D - 1 day, P1M2D - 1 month and 2 days, P1Y - 1 year etc.')
  }

  repeatGuide() {
    this.notificationService.notification$.next('If smaller than 0, then will send unlimited times.');
  }

  submitForm() {
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();
      return;
    }

    const isRegular = this.transactionForm.get('isRegular')?.value;
    const sendAt = this.transactionForm.get('sendAt')?.value;

    if (!isRegular && !sendAt) {
      this.sendTransfer();
    }
    else if (!isRegular && sendAt) {
      this.sendScheduled()
    }
    else if (isRegular) {
      this.sendRegular();
    }
  }

  sendTransfer() {
    this.atmHttpService.createNewTransferFromTransaction(
      this.transactionForm.get('amount')!.value!,
      this.transactionForm.get('senderAccountDd')!.value!,
      this.transactionForm.get('receiverAccountId')!.value!
    )
    .pipe(
      catchError(err => {
        if (err.status === 404) {
          this.httpError = 'Receiver account not found';
        }
        else {
          this.httpError = err.error.message;
        }
        return EMPTY;
      })
    )
    .subscribe(() => {
      this.navigationService.goTo(AtmState.MAIN_MENU);
      this.notificationService.notification$.next('Transfer was sent to process, you can see current status of transfer in Transactions History');
    })
  }

  sendScheduled() {
    this.atmHttpService.createScheduledTransaction(
      this.transactionForm.get('amount')!.value!,
      this.transactionForm.get('senderAccountDd')!.value!,
      this.transactionForm.get('receiverAccountId')!.value!,
      this.getSeconds(this.transactionForm.get('scheduledTime')!.value!) as number
    )
    .pipe(
      catchError(err => {
        if (err.status === 404) {
          this.httpError = 'Receiver account not found';
        }
        else {
          this.httpError = err.error.message;
        }
        return EMPTY;
      })
    )
    .subscribe(() => {
      this.navigationService.goTo(AtmState.MAIN_MENU);
      this.notificationService.notification$.next('Transfer was scheduled!');
    })
  }

  sendRegular() {
    const transactionData = {
      amount: this.transactionForm.get('amount')!.value!,
      senderAccountId: this.transactionForm.get('senderAccountDd')!.value!,
      receiverAccountId: this.transactionForm.get('receiverAccountId')!.value!,
      scheduledTime: this.getSeconds(this.transactionForm.get('scheduledTime')!.value!) ?? null,
      period: this.transactionForm.get('period')!.value!,
      initialRepeats: this.transactionForm.get('initialRepeats')!.value!,
    };

    this.atmHttpService.createRegularTransaction(transactionData)
      .pipe(
        catchError(err => {
          if (err.status === 404) {
            this.httpError = 'Receiver account not found';
          }
          else {
            this.httpError = err.error.message;
          }
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.navigationService.goTo(AtmState.MAIN_MENU);
        this.notificationService.notification$.next('Transfer was created!');
      })
  }

  getSeconds(date: Date): number | null {
    if (date) {
      return Math.ceil(new Date(date).getTime() / 1000);
    }
    return null;
  }

}
