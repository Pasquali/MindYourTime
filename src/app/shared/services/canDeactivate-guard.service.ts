import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate } from '@angular/router';

import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { TimerService } from './timer.service';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<boolean> {
  dialogRef;
  constructor(public dialog: MatDialog, private timerService: TimerService) {}

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if ( this.timerService.getStatus() ) {
      this.openDialog();
      return this.dialogRef.afterClosed().pipe(
        map(result => {
          if (result) {
            this.timerService.resetTimer();
            return true;
          } else {
            return false;
          }
        })
      );
    } else {
      return true;
    }
  }
  openDialog(): void {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {message: `You currently have a session in progress. Would you like to continue?`}
    });
  }
}
