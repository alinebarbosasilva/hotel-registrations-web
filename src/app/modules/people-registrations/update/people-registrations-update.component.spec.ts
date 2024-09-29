import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleRegistrationsUpdateComponent } from './people-registrations-update.component';

describe('PriceTablesUpdateComponent', () => {
  let component: PeopleRegistrationsUpdateComponent;
  let fixture: ComponentFixture<PeopleRegistrationsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleRegistrationsUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleRegistrationsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
