import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AccountType, AtmState } from 'src/app/interfaces/app.interfaces';
import { AccountService } from 'src/app/services/account.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

  ATM_STATES = AtmState;
  ACCOUNT_TYPES = AccountType;

  account$ = this.accountService.selectedAccount$;

  isSettings$ = new BehaviorSubject<boolean>(false);

  constructor(
    private accountService: AccountService,
    private navigationService: NavigationService
  ) { }

  ngOnInit() {
  }

  openSettings(value: boolean) {
    this.isSettings$.next(value);
  }

  changeAccountPlan() {
    this.navigationService.goTo(AtmState.CHANGE_ACCOUNT_PLAN);
  }

}
