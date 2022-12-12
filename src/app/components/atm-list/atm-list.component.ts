import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AtmInfo, AtmStatus } from 'src/app/interfaces/app.interfaces';

@Component({
  selector: 'app-atm-list',
  templateUrl: './atm-list.component.html',
  styleUrls: ['./atm-list.component.scss']
})
export class AtmListComponent implements OnInit {

  @Input() atmList: AtmInfo[] =
  [
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
  ];

  selectedIndex = new BehaviorSubject<number | null>(null);

  @Output() onAtmSelect = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selectItem(index: number) {
    this.selectedIndex.next(index);
    this.onAtmSelect.emit(this.atmList[index]);
  }

}
