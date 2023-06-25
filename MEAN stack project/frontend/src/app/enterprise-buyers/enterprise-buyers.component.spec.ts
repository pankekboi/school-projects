import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseBuyersComponent } from './enterprise-buyers.component';

describe('EnterpriseBuyersComponent', () => {
  let component: EnterpriseBuyersComponent;
  let fixture: ComponentFixture<EnterpriseBuyersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterpriseBuyersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseBuyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
