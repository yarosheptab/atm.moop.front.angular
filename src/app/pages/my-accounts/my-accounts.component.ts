import { Component, OnInit } from '@angular/core';
import { AtmState } from 'src/app/interfaces/app.interfaces';
import { AtmHttpService } from 'src/app/services/atm-http.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-my-accounts',
  templateUrl: './my-accounts.component.html',
  styleUrls: ['./my-accounts.component.scss']
})
export class MyAccountsComponent implements OnInit {

  ATM_STATES = AtmState;

  accounts$ = this.atmHttpService.getAllAccounts();

  constructor(
    private atmHttpService: AtmHttpService,
    public navigationService: NavigationService,
  ) { }

  ngOnInit() {
  }

}
