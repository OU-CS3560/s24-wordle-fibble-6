import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessAlertDialogComponent } from './success-alert-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

describe('SuccessAlertDialogComponent', () => {
  let component: SuccessAlertDialogComponent;
  let fixture: ComponentFixture<SuccessAlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [MatIconModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            message: 'Success',
          },
        },
        { provide: MatDialogRef, useValue: { SuccessAlertDialogComponent } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});