import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinRegistrationsCreateComponent } from './checkin-registrations-create.component';

describe('PriceTablesUpdateComponent', () => {
  let component: CheckinRegistrationsCreateComponent;
  let fixture: ComponentFixture<CheckinRegistrationsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckinRegistrationsCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckinRegistrationsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
