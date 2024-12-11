import { TestBed, ComponentFixture } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });



  it('should toggle theme class on body element', () => {
    const body = document.body;
    const initialClassList = body.classList.value;
    // Mock MouseEvent
    const mockEvent = new MouseEvent('click');
  
    // Initially, the class list should not contain 'light-theme'
    expect(initialClassList).not.toContain('light-theme');
    // Toggle theme
    component.toggleTheme(mockEvent);
    fixture.detectChanges();
    // After toggling, the class list should contain 'light-theme'
    expect(body.classList.value).toContain('light-theme');
    // Toggle again to revert to the initial state
    component.toggleTheme(mockEvent);
    fixture.detectChanges();
    // After toggling again, the class list should not contain 'light-theme'
    expect(body.classList.value).not.toContain('light-theme');
  });
});
