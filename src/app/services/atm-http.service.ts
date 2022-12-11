import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AtmInfo, AtmStatus } from 'src/app/interfaces/app.interfaces';
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

      return of([
          {
            "id" : 1,
            "address" : "Street numero uno",
            "atmStatus" : AtmStatus.IDLE,
            "banks" : [ {
              "id" : 1,
              "name" : "9 vbyv kozu kulakom"
            } ]
          }, {
            "id" : 2,
            "address" : "Street numero dos",
            "atmStatus" : AtmStatus.IDLE,
            "banks" : [ {
              "id" : 1,
              "name" : "9 vbyv kozu kulakom"
            }, {
              "id" : 2,
              "name" : "Bank number2"
            } ]
          }, {
            "id" : 3,
            "address" : "Street numero uno",
            "atmStatus" : AtmStatus.IDLE,
            "banks" : [ {
              "id" : 3,
              "name" : "9 vbyv kozu kulakom"
            } ]
          }
        ])
  }

  verifyAtm(cardNumber: string, atmId: number): Observable<void> {
    const url = `${environment.backApi}/card/verify-atm-support-bank`;

    // const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});

    return this.http.post<void>(url, {cardNumber, atmId}, {withCredentials: true});

    // return of(undefined);
  }

  loginToAtm(number: string, pin: string, atm: number): Observable<void> {
    const url = `${environment.appUrl}/login`;

    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/x-www-form-urlencoded'});

    return this.http.post<void>(url, this.utilsService.toUrlEncoded({number, pin, atm}), {headers});
  }

  // getPlans() {
  //   this.http.get(`${environment.backApi}/account/plans`, {headers, withCredentials: true})
  // }
}
