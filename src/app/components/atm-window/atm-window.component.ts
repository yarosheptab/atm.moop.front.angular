import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AtmInfo } from 'src/app/interfaces/app.interfaces';
import { AtmHttpService } from 'src/app/services/atm-http.service';

@Component({
  selector: 'app-atm-window',
  templateUrl: './atm-window.component.html',
  styleUrls: ['./atm-window.component.scss']
})
export class AtmWindowComponent implements OnInit {

  atmList$ = new BehaviorSubject<AtmInfo[]>([]);

  constructor(
    private atmHttpService: AtmHttpService
  ) {}

  ngOnInit() {
    this.atmHttpService.getAllAtm()
      .subscribe(atmList => {
        this.atmList$.next(atmList);
      })
  }

}
