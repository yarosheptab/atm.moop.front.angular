import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AtmState, SavingPlan, SavingPlanType, TransactionalPlan } from 'src/app/interfaces/app.interfaces';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-plan-list-item',
  templateUrl: './account-plan-list-item.component.html',
  styleUrls: ['./account-plan-list-item.component.scss']
})
export class AccountPlanListItemComponent implements OnInit {

  @Input() disabled: boolean = false;
  @Input() transactionalPlan?: TransactionalPlan;
  @Input() savingPlan?: SavingPlan;
  @Input() index?: number;
  @Input() isCustomCallback: boolean = false;

  @Output() customCallback = new EventEmitter<SavingPlanType>();

  constructor(
    private accountService: AccountService
  ) { }


  ngOnInit() {
  }

  selectPlan() {
    if (this.isCustomCallback && this.savingPlan) {
      this.customCallback.emit(this.savingPlan?.id);
      return;
    }
    if (this.savingPlan) {
      this.accountService.newPlan$.next(this.savingPlan);
      this.accountService.atmState$.next(AtmState.NEW_ACCOUNT)
    }
    else if (this.transactionalPlan) {
      this.accountService.newPlan$.next(this.transactionalPlan);
      this.accountService.atmState$.next(AtmState.NEW_ACCOUNT)
    }
  }

}
