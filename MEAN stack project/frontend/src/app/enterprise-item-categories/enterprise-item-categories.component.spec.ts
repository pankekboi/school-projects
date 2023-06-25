import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseItemCategoriesComponent } from './enterprise-item-categories.component';

describe('EnterpriseItemCategoriesComponent', () => {
  let component: EnterpriseItemCategoriesComponent;
  let fixture: ComponentFixture<EnterpriseItemCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterpriseItemCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseItemCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
