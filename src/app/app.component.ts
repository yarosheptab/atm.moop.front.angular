import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, mergeMap, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AtmInfo } from './interfaces/app.interfaces';
import { AtmHttpService } from './services/atm-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ATM';

  constructor(
  ) {}

  ngOnInit(): void {

    // const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/x-www-form-urlencoded'});

    // this.http.post(
    //   `${environment.backApi}/login`,
    //   'number=2440735783328557&pin=5384&atm=1', //{"number": 2440735783328557, "pin": 5384, "atm": 1},
    //   {headers}
    // )
    // // of('')
    // .pipe(
    //   switchMap(res => {
    //     console.log(res);
    //     return this.http.get(`${environment.backApi}/account/plans`, {headers, withCredentials: true})
    //   })
    // )
    // .subscribe(e => {
    //   console.log(e);
    // })
  }
}
