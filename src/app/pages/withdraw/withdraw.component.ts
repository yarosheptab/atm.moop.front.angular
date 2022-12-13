import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AtmState } from 'src/app/interfaces/app.interfaces';
import { AtmHttpService } from 'src/app/services/atm-http.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {

  ATM_STATES = AtmState;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private atmHttpService: AtmHttpService,
    private navigationService: NavigationService
  ) { }

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

    this.atmHttpService.withdraw(this.amountForm.get('amount')!.value!)
      .subscribe(() => {
        this.notificationService.notification$.next('Withdraw was successfull!');
        this.navigationService.goTo(AtmState.MAIN_MENU);
      })
  }

}
