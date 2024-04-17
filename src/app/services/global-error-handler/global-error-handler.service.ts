import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { LoginService } from '../login-service/login.service';
import { NotificationService } from '../notification-service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(
    private loginService: LoginService,
    private ngZone: NgZone,
    private notificationService: NotificationService,
  ) { }

  handleError(error: any): void {
    if (error.status === 401) {
      this.ngZone.run(() => {
        this.loginService.logout();
        this.notificationService.openNotification('Session expired, please login again.');
      });
    }

    console.log('Handler Error:', error);
  }
}
