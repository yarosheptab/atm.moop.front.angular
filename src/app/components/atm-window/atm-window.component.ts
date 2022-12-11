import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AtmInfo, AtmStates } from 'src/app/interfaces/app.interfaces';
import { AccountService } from 'src/app/services/account.service';
import { AtmHttpService } from 'src/app/services/atm-http.service';

@Component({
  selector: 'app-atm-window',
  templateUrl: './atm-window.component.html',
  styleUrls: ['./atm-window.component.scss']
})
export class AtmWindowComponent implements OnInit {

  atmList$ = new BehaviorSubject<AtmInfo[]>([]);

  selectedAtm$ = new BehaviorSubject<AtmInfo | null>(null);

  atmState$ = this.accountService.atmState$;

  ATM_STATES = AtmStates;

  constructor(
    private atmHttpService: AtmHttpService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.atmHttpService.getAllAtm()
      .subscribe(atmList => {
        this.atmList$.next(atmList);
      })
  }

  onAtmSelect(atm: AtmInfo) {
    console.log(atm);
    this.selectedAtm$.next(atm);
  }

  afterLogin(cardNumber: string) {
    this.atmState$.next(AtmStates.MAIN_MENU);
  }

}
