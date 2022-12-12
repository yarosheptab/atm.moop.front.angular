import { Component, OnInit } from '@angular/core';
import { AtmState } from 'src/app/interfaces/app.interfaces';
import { AccountService } from 'src/app/services/account.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-atm-main-menu',
  templateUrl: './atm-main-menu.component.html',
  styleUrls: ['./atm-main-menu.component.scss']
})
export class AtmMainMenuComponent implements OnInit {

  ATM_STATES = AtmState;

  constructor(
    private accountService: AccountService,
    public navigationService: NavigationService
  ) { }

  ngOnInit() {
  }

}
