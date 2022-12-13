import { Component, OnInit } from '@angular/core';
import { AccountInfo, AtmState, User } from 'src/app/interfaces/app.interfaces';
import { AccountService } from 'src/app/services/account.service';
import { AtmHttpService } from 'src/app/services/atm-http.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent implements OnInit {

  ATM_STATES = AtmState;
  userCard = this.accountService.cardNumber;

  accountInfo?: AccountInfo;

  constructor(
    private atmHttpService: AtmHttpService,
    private accountService: AccountService,
    private navigationService: NavigationService
  ) { }

  ngOnInit() {
    this.atmHttpService.getAccountInfo()
      .subscribe(data => {
        this.accountInfo = data;
      });
  }

  changePinCode() {
    this.navigationService.goTo(AtmState.CHANGE_PIN);
  }

}
