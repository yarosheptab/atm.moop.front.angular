import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, from, lastValueFrom, Observable, of, tap } from 'rxjs';
import { Account, AtmInfo, AtmStatus, Currencies, PlansResponse, SavingPlan, Transaction } from 'src/app/interfaces/app.interfaces';
import { environment } from 'src/environments/environment';
import { UtilsService } from './utils.service';

@Injectable()
export class AtmHttpService {

constructor(
    private http: HttpClient,
    private utilsService: UtilsService
) { }

  getAllAtm(): Observable<AtmInfo[]> {
      const url = `${environment.backApi}/atm/all`;

      return this.http.get<AtmInfo[]>(url);
  }

  verifyAtm(cardNumber: string, atmId: number): Observable<void> {
    const url = `${environment.backApi}/card/verify-atm-support-bank`;

    // const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});

    return this.http.post<void>(url, {cardNumber, atmId});

    // return of(undefined);
  }

  loginToAtm(number: string, pin: string, atm: number): Observable<any> {
    const url = `${environment.appUrl}/login`;

    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

    return this.http.post<void>(url, this.utilsService.toUrlEncoded({number, pin, atm}), {headers});
  }

  getAllAccounts(): Observable<Account[]> {
    const url = `${environment.backApi}/account/all-my`;

    return this.http.get<Account[]>(url);
  }

  logoutFromAtm(): Observable<void> {
    const url = `${environment.appUrl}/logout`;

    return this.http.post<void>(url, {}, {withCredentials: true});
  }

  getPlans(): Observable<PlansResponse> {
    return this.http.get<PlansResponse>(`${environment.backApi}/account/plans`)
  }

  getCurrency(): Observable<Currencies> {
    return this.http.get<Currencies>(`${environment.backApi}/account/currency`);
  }

  createSavingAccount(plan: number | string, currencyUnitCode: string, accountName: string): Observable<void> {
    const url = `${environment.backApi}/account/saving/plan`;

    return this.http.post<void>(url, {plan, currencyUnitCode, accountName});
  }

  createTransactionalAccount(plan: number | string, currencyUnitCode: string, accountName: string): Observable<void> {
    const url = `${environment.backApi}/account/transactional/plan`;

    return this.http.post<void>(url, {plan, currencyUnitCode, accountName});
  }

  withdraw(amount: number): Observable<void> {
    const url = `${environment.backApi}/transfer/withdraw`;

    return this.http.post<void>(url, {amount});
  }

  deposit(amount: number): Observable<void> {
    const url = `${environment.backApi}/transfer/deposit`;

    return this.http.post<void>(url, {amount});
  }

  getTransactionsHistory(): Observable<Transaction[]> {
    const url = `${environment.backApi}/transaction/history`;

    return this.http.get<Transaction[]>(url);
  }
}
