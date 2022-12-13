import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, mergeMap, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AtmInfo, SavingPlan } from './interfaces/app.interfaces';
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
  }
}
