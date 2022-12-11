import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AtmStates } from '../interfaces/app.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _cardNumber: string | null = null;

  set cardNumber(number: string | null) {
    this._cardNumber = number;
  }

  get cardNumber(): string | null {
    return this._cardNumber;
  }

  atmState$ = new BehaviorSubject<AtmStates>(AtmStates.LOGIN);

constructor() { }

}
