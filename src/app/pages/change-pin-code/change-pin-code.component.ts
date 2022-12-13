import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { catchError, EMPTY } from 'rxjs';
import { AtmState } from 'src/app/interfaces/app.interfaces';
import { AtmHttpService } from 'src/app/services/atm-http.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-change-pin-code',
  templateUrl: './change-pin-code.component.html',
  styleUrls: ['./change-pin-code.component.scss']
})
export class ChangePinCodeComponent implements OnInit {

  ATM_STATES = AtmState;

  constructor(
    private fb: FormBuilder,
    private atmHttpService: AtmHttpService,
    private notificationService: NotificationService,
    private navigationService: NavigationService
  ) { }

  pinCodeForm = this.fb.group({
    pinCode: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.minLength(4), Validators.pattern("^\\d{1,4}$")])
  })

  httpErrors = {
    pinCode: ''
  };

  ngOnInit() {
  }

  submitForm() {
    if (this.pinCodeForm.get('pinCode')?.value && this.pinCodeForm.get('pinCode')?.invalid) {
      this.pinCodeForm.markAllAsTouched();
      return;
    }

    this.atmHttpService.changePinCode(this.pinCodeForm.get('pinCode')!.value!)
      .pipe(
        catchError(err => {
          this.httpErrors.pinCode = err.error?.message ?? '';
          this.pinCodeForm.get('pinCode')?.setErrors({httpError: true}, {emitEvent: true});
          return EMPTY;
        })
      )
      .subscribe(resp => {
        this.navigationService.goTo(AtmState.CARD_INFO);
        this.notificationService.notification$.next('Pin code changed successfully!');
      })
  }
}