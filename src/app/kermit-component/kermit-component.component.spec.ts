import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KermitComponent } from './kermit-component.component';

describe('KermitComponentComponent', () => {
  let component: KermitComponent;
  let fixture: ComponentFixture<KermitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KermitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
