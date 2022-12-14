import { Component, Input, OnInit } from '@angular/core';
import { Account, AtmState } from 'src/app/interfaces/app.interfaces';
import { AccountService } from 'src/app/services/account.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-account-list-item',
  templateUrl: './account-list-item.component.html',
  styleUrls: ['./account-list-item.component.scss']
})
export class AccountListItemComponent implements OnInit {

  @Input() account?: Account;
  @Input() index?: number;

  constructor(
    private accountService: AccountService,
    private naviagtionService: NavigationService
  ) { }

  ngOnInit() {
  }

  openAccountInfo() {
    this.accountService.selectedAccount$.next(this.account!);
    this.naviagtionService.goTo(AtmState.ACCOUNT_INFO);
  }

}
