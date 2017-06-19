import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplerSettingsComponent } from './sampler-settings.component';

describe('SamplerSettingsComponent', () => {
  let component: SamplerSettingsComponent;
  let fixture: ComponentFixture<SamplerSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplerSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
