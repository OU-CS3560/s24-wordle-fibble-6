import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KermitComponentComponent } from './kermit-component.component';

describe('KermitComponentComponent', () => {
  let component: KermitComponentComponent;
  let fixture: ComponentFixture<KermitComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KermitComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KermitComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
