import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-leaving-warning',
  templateUrl: './leaving-warning.component.html',
  styleUrls: ['./leaving-warning.component.css']
})
export class LeavingWarningComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {message: `You currently have a session in progress. Would you like to continue?`, options: ['Continue', 'Cancel']},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}
