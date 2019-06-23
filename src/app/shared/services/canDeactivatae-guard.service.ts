import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate,
         ActivatedRouteSnapshot,
         RouterStateSnapshot } from '@angular/router';

import { TimerComponent } from '../../meditation-timer/timer.component';
import { DialogComponent } from '../../meditation-timer/leaving-warning/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<boolean> {
  dialogRef;
  constructor(public dialog: MatDialog) {

  }

  canDeactivate(): Observable<boolean>| Promise<boolean> {
    this.openDialog();
    return this.dialogRef.afterClosed().pipe(
      map(result => {
        if (result) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
  openDialog(): void {
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {message: `You currently have a session in progress. Would you like to continue?`}
    });

    this.dialogRef.afterClosed().subscribe(result => {
        if (result) {
            return true;
        }
    });
}
}
