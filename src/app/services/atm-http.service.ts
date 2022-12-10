import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AtmInfo, AtmStatus } from 'src/app/interfaces/app.interfaces';
import { environment } from 'src/environments/environment';

@Injectable()
export class AtmHttpService {

constructor(
    private http: HttpClient
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
}
