import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from '../../components/notification-dialog/notification-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private dialog: MatDialog) {}

  openNotification(message: string, durationMs: number = 5000): void {
    const dialogRef = this.dialog.open(NotificationDialogComponent, {
      data: { message },
      hasBackdrop: false,
    });

    // Fecha o dialog após a duração especificada
    setTimeout(() => {
      dialogRef.close();
    }, durationMs);
  }
}
