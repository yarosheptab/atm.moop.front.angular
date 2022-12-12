import { Injectable } from '@angular/core';
import { AtmState } from '../interfaces/app.interfaces';
import { AccountService } from './account.service';
import { AtmHttpService } from './atm-http.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

constructor(
  private accountService: AccountService,
  private atmHttpService: AtmHttpService
) { }

goTo(state: AtmState) {
  if (state === AtmState.LOGIN) {
    this.atmHttpService.logoutFromAtm()
    .subscribe(() => {});
  }
  this.accountService.atmState$.next(state);
}

}
