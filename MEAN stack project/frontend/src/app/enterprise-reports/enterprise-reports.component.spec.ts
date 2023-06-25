import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseReportsComponent } from './enterprise-reports.component';

describe('EnterpriseReportsComponent', () => {
  let component: EnterpriseReportsComponent;
  let fixture: ComponentFixture<EnterpriseReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterpriseReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
