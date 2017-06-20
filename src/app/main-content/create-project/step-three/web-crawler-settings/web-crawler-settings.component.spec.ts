import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCrawlerSettingsComponent } from './web-crawler-settings.component';

describe('WebCrawlerSettingsComponent', () => {
  let component: WebCrawlerSettingsComponent;
  let fixture: ComponentFixture<WebCrawlerSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebCrawlerSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebCrawlerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
