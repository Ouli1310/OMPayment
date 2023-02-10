import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-animations-example-dialog',
  templateUrl: './dialog-animations-example-dialog.component.html',
  styleUrls: ['./dialog-animations-example-dialog.component.css']
})
export class DialogAnimationsExampleDialogComponent implements OnInit {

  errorMessage!: string

  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialogComponent>) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  
}
