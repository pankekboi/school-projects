import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseTablesComponent } from './enterprise-tables.component';

describe('EnterpriseTablesComponent', () => {
  let component: EnterpriseTablesComponent;
  let fixture: ComponentFixture<EnterpriseTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterpriseTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
