import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { catchError, EMPTY } from 'rxjs';
import { AtmState } from 'src/app/interfaces/app.interfaces';
import { AtmHttpService } from 'src/app/services/atm-http.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {

  ATM_STATES = AtmState;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private atmHttpService: AtmHttpService,
    private navigationService: NavigationService
  ) { }

  httpErrors = {
    amount: ''
  }

  amountForm = this.fb.group({
    amount: new FormControl(0, [Validators.required, Validators.min(1)])
  });

  ngOnInit() {
  }

  submitForm() {
    if (this.amountForm.get('amount')?.invalid || !this.amountForm.get('amount')?.value) {
      this.amountForm.markAllAsTouched();
      return;
    }

    this.atmHttpService.deposit(this.amountForm.get('amount')!.value!)
      .pipe(catchError(err => {
        if (err.status === 400) {
          this.amountForm.get('amount')?.setErrors({httpError: true});
          this.httpErrors.amount = err.error.message;
        }
        return EMPTY;
      }))
      .subscribe(() => {
        this.notificationService.notification$.next('Deposit was successfull!');
        this.navigationService.goTo(AtmState.MAIN_MENU);
      })
  }

}
