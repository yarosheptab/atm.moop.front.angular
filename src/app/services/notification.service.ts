import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notification$ = new BehaviorSubject<string>('');

constructor() { }

}
