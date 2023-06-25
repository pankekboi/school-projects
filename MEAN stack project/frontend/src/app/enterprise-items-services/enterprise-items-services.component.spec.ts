import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseItemsServicesComponent } from './enterprise-items-services.component';

describe('EnterpriseItemsServicesComponent', () => {
  let component: EnterpriseItemsServicesComponent;
  let fixture: ComponentFixture<EnterpriseItemsServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterpriseItemsServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseItemsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
