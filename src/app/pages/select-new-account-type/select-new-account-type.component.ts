import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AtmState, PlansResponse } from 'src/app/interfaces/app.interfaces';
import { AccountService } from 'src/app/services/account.service';
import { AtmHttpService } from 'src/app/services/atm-http.service';

@Component({
  selector: 'app-select-new-account-type',
  templateUrl: './select-new-account-type.component.html',
  styleUrls: ['./select-new-account-type.component.scss']
})
export class SelectNewAccountTypeComponent implements OnInit {

  ATM_STATES = AtmState;

  atmPlans$ = new BehaviorSubject<PlansResponse | null>(null);

  constructor(
    private atmHttpService: AtmHttpService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.atmHttpService.getPlans()
      .subscribe(plans => {
        this.atmPlans$.next(plans);
      });

      this.accountService.newPlan$.next(null);
  }

}
