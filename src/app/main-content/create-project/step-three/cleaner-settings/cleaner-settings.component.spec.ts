import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanerSettingsComponent } from './cleaner-settings.component';

describe('CleanerSettingsComponent', () => {
  let component: CleanerSettingsComponent;
  let fixture: ComponentFixture<CleanerSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanerSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
