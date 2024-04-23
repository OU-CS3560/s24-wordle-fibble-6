// may have to install "npm install --save @angular/material"
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-success-alert-dialog',
  standalone: true,
  templateUrl: './success-alert-dialog.component.html',
  styleUrls: ['./success-alert-dialog.component.scss'],
  imports: [
    MatIconModule,
  ]
})
export class SuccessAlertDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<SuccessAlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.dialogRef.close(), 1750);
  }
}