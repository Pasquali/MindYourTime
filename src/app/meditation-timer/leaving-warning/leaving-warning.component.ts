import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { Router } from '@angular/router';

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-leaving-warning',
  templateUrl: './leaving-warning.component.html',
  styleUrls: ['./leaving-warning.component.css']
})
export class LeavingWarningComponent {
  constructor(public dialog: MatDialog, private router: Router) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {message: `You currently have a session in progress. Would you like to continue?`}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
