import { Component, Input, OnInit } from '@angular/core';
import { Account } from 'src/app/interfaces/app.interfaces';

@Component({
  selector: 'app-account-list-item',
  templateUrl: './account-list-item.component.html',
  styleUrls: ['./account-list-item.component.scss']
})
export class AccountListItemComponent implements OnInit {

  @Input() account?: Account;

  constructor() { }

  ngOnInit() {
  }

}
