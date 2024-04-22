import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from '../../components/notification-dialog/notification-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private dialog: MatDialog) {}

  openNotification(message: string, durationMs: number = 1500): void {
    const dialogRef = this.dialog.open(NotificationDialogComponent, {
      data: { message },
      hasBackdrop: false,
      closeOnNavigation: true,
    });

    // Fecha o dialog após a duração especificada
    setTimeout(() => {
      dialogRef.close();
    }, durationMs);
  }
}
