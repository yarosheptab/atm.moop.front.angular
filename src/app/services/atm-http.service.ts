import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, from, lastValueFrom, Observable, of, tap } from 'rxjs';
import { Account, AccountInfo, AtmInfo, AtmStatus, Currencies, PlansResponse, SavingPlan, SavingPlanType, ScheduledTransaction, Transaction } from 'src/app/interfaces/app.interfaces';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';
import { UtilsService } from './utils.service';

@Injectable()
export class AtmHttpService {

constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private utilsService: UtilsService
) { }

  getAllAtm(): Observable<AtmInfo[]> {
      const url = `${environment.backApi}/atm/all`;

      return this.http.get<AtmInfo[]>(url);
  }

  verifyAtm(cardNumber: string, atmId: number): Observable<void> {
    const url = `${environment.backApi}/card/verify-atm-support-bank`;

    return this.http.post<void>(url, {cardNumber, atmId});
  }

  loginToAtm(number: string, pin: string, atm: number): Observable<any> {
    const url = `${environment.appUrl}/login`;

    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

    return this.http.post<void>(url, this.utilsService.toUrlEncoded({number, pin, atm}), {headers});
  }

  getAllAccounts(): Observable<Account[]> {
    const url = `${environment.backApi}/account/all-my`;

    return this.http.get<Account[]>(url).pipe(tap(accounts => this.accountService.allAccounts$.next(accounts)));
  }

  getAccountInfo(): Observable<AccountInfo> {
    const url = `${environment.backApi}/account/auth`;

    return this.http.get<AccountInfo>(url);
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

  getTransactionsHistory(accountId?: number): Observable<Transaction[]> {
    let url = `${environment.backApi}/transaction/history`;

    if (accountId) url += `/${accountId}`;

    return this.http.get<Transaction[]>(url);
  }

  getScheduledTransactions(accountId: number): Observable<ScheduledTransaction[]> {
    const url = `${environment.backApi}/transaction/regular/${accountId}`;

    return this.http.get<ScheduledTransaction[]>(url);
  }

  cancelRegularTransaction(id: number): Observable<void> {
    const url = `${environment.backApi}/transaction/regular/cancel/${id}`;

    return this.http.patch<void>(url, {});
  }

  changePinCode(pin: string): Observable<void> {
    const url = `${environment.backApi}/card/update-pin`;

    return this.http.put<void>(url, {pin});
  }

  createNewTransferFromTransaction(amount: number, senderAccountId: number, receiverAccountId: number): Observable<void> {
    const url = `${environment.backApi}/transfer`;

    return this.http.put<void>(url, {amount, senderAccountId, receiverAccountId});
  }

  createScheduledTransaction(amount: number, senderAccountId: number, receiverAccountId: number, scheduledTime: number): Observable<void> {
    const url = `${environment.backApi}/transaction/scheduled`;

    return this.http.post<void>(url, {amount, senderAccountId, receiverAccountId, scheduledTime});
  }

  createRegularTransaction(regularData: Record<string, any>): Observable<void> {
    const url = `${environment.backApi}/transaction/regular`;

    return this.http.post<void>(url, regularData);
  }

  terminateSavingPlan(id: number): Observable<Account> {
    const url = `${environment.backApi}/account/saving/terminate-contract/${id}`;

    return this.http.patch<Account>(url, {});
  }

  fireSavingPlan(id: number): Observable<Account> {
    const url = `${environment.backApi}/account/saving/fire-contract/${id}`;

    return this.http.patch<Account>(url, {});
  }

  changeSavingAccountPlan(accountId: number, planId: SavingPlanType): Observable<Account> {
    const url = `${environment.backApi}/account/saving/change-plan/${accountId}/${planId}`;

    return this.http.patch<Account>(url, {});
  }
}
