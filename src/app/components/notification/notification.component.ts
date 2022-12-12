import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notifications$ = this.notificationService.notification$;

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
  }

  closeWindow() {
    this.notifications$.next('');
  }

}
