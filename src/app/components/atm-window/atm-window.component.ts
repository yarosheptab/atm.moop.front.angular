import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AtmInfo, AtmState } from 'src/app/interfaces/app.interfaces';
import { AccountService } from 'src/app/services/account.service';
import { AtmHttpService } from 'src/app/services/atm-http.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-atm-window',
  templateUrl: './atm-window.component.html',
  styleUrls: ['./atm-window.component.scss']
})
export class AtmWindowComponent implements OnInit {

  atmList$ = new BehaviorSubject<AtmInfo[]>([]);

  selectedAtm$ = new BehaviorSubject<AtmInfo | null>(null);

  atmState$ = this.accountService.atmState$;

  notifications$ = this.notificationService.notification$;

  ATM_STATES = AtmState;

  constructor(
    private atmHttpService: AtmHttpService,
    private accountService: AccountService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.atmHttpService.getAllAtm()
      .subscribe(atmList => {
        this.atmList$.next(atmList);
      })
  }

  onAtmSelect(atm: AtmInfo) {
    this.selectedAtm$.next(atm);
  }

  afterLogin() {
    this.atmState$.next(AtmState.MAIN_MENU);
  }

}
