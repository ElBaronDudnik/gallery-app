import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private automateDismiss = 3000;
  constructor(private notification: MatSnackBar) { }

  showNotification(message: string, action: string = 'Close'): void {
    this.notification.open(message, action, { duration: this.automateDismiss });
  }

  showError(message: string): void {
    this.notification.open(message, 'X', { panelClass: ['error'] });
  }
}
