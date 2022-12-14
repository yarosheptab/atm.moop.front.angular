import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  account$ = this.accountService.selectedAccount$;

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
  }

}
