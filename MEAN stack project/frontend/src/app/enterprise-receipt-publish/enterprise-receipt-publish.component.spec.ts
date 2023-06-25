import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseReceiptPublishComponent } from './enterprise-receipt-publish.component';

describe('EnterpriseReceiptPublishComponent', () => {
  let component: EnterpriseReceiptPublishComponent;
  let fixture: ComponentFixture<EnterpriseReceiptPublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterpriseReceiptPublishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseReceiptPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
