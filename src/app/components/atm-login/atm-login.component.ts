import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AtmInfo } from 'src/app/interfaces/app.interfaces';
import { AccountService } from 'src/app/services/account.service';
import { AtmHttpService } from 'src/app/services/atm-http.service';

@Component({
  selector: 'app-atm-login',
  templateUrl: './atm-login.component.html',
  styleUrls: ['./atm-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AtmLoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private atmHttpService: AtmHttpService,
    private accountService: AccountService
  ) {
    this.loginForm.disable();
   }

  @Input() selectedAtm$!: BehaviorSubject<AtmInfo>;
  @Output() afterLogin = new EventEmitter<void>();

  loginForm = this.fb.group(
    {
      cardNumber: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]),
      pinCode: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]),
    }
  )
  isVerified$ = new BehaviorSubject<boolean>(false);

  ngOnInit() {
    this.selectedAtm$.subscribe(atm => {
      if (atm) {
        this.loginForm.enable();
        this.loginForm.reset();
        this.accountService.cardNumber = null;
      }
      this.loginForm.patchValue({cardNumber: '', pinCode: ''});
      this.isVerified$.next(false);
    });

    this.loginForm.get('cardNumber')?.valueChanges.subscribe(val => {
      this.loginForm.get('cardNumber')?.setValue(this.loginForm.get('cardNumber')?.value?.replace(/\s/g, '') ?? '', {emitEvent: false});
    })
  }

  submitAction() {
    if (this.loginForm.get('cardNumber')?.invalid ||
      (this.loginForm.get('pinCode')?.invalid && this.isVerified$.value)) {
      return;
    }

    if (!this.isVerified$.value) {
      this.loginForm.get('cardNumber')?.markAllAsTouched();
      this.atmHttpService.verifyAtm(this.loginForm.get('cardNumber')?.value!, this.selectedAtm$.value.id)
      .subscribe(
        {
          next: () => {
            this.loginForm.get('cardNumber')?.disable();
            this.accountService.cardNumber = this.loginForm.get('cardNumber')?.value ?? null;
            this.isVerified$.next(true);
          },
          error: err => {
            if (err.status == 400) {
              console.log(err);
              this.loginForm.get('cardNumber')?.setErrors({invalidCard: true});
              this.accountService.cardNumber = null;
            }
            else {
              this.loginForm.get('cardNumber')?.setErrors({httpError: true});
            }
            this.isVerified$.next(false);
          }
        }
      )
      return;
    }
    this.loginForm.markAllAsTouched();

    this.atmHttpService.loginToAtm(
      this.loginForm.get('cardNumber')!.value!,
      this.loginForm.get('pinCode')!.value!,
      this.selectedAtm$.value.id
    )
    .subscribe(() => {
      this.afterLogin.emit();
    })

    console.log(this.loginForm.value);
  }

}
