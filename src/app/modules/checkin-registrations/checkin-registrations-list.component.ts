import {Component, inject, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {MatToolbar} from "@angular/material/toolbar";
import {
  MatCell,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableModule
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatCard, MatCardHeader, MatCardModule} from "@angular/material/card";
import {AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {Router, RouterOutlet} from "@angular/router";
import {MatError, MatFormField} from "@angular/material/form-field";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {Observable, Subscription} from "rxjs";
import {CheckinRegistrationsCreateComponent} from "./create/checkin-registrations-create.component";
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {CheckinRegistration} from "../../models/checkin-registration";
import {CheckinRegistrationsRepositoryService} from "./services/checkin-registrations-repository.service";


@Component({
  selector: 'app-checkin-registrations',
  standalone: true,
  imports: [
    MatToolbar,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatIcon,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatCard,
    MatCardHeader,
    MatColumnDef,
    MatTableModule,
    MatCardModule,
    AsyncPipe,
    MatIconButton,
    RouterOutlet,
    MatButton,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    DatePipe,
    CurrencyPipe,
    MatError,
    NgIf,
    MatRadioButton,
    MatRadioGroup,
    FormsModule,
    CheckinRegistrationsCreateComponent,
    MatPaginator,
    JsonPipe,

  ],
  templateUrl: './checkin-registrations-list.component.html',
  styleUrl: './checkin-registrations-list.component.scss'
})
export class CheckinRegistrationsListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  checkinRegistrationsRepositoryService = inject(CheckinRegistrationsRepositoryService);
  fb = inject(FormBuilder)
  displayedColumns = ['nome', 'documento', 'valor'];
  router = inject(Router)
  subscription!: Subscription;

  totalItems$ = this.checkinRegistrationsRepositoryService.count$
  itemsPerPage: number = 10

  checkinRegistrations$: Observable<CheckinRegistration[]> = this.checkinRegistrationsRepositoryService.filterCheckinRegistrations$;

  form = this.fb.nonNullable.group({
    peopleFilter: [''],
  });

  addPerson() {
    this.router.navigate(['/people-registrations/new']);
  }

  ngOnInit(): void {
    this.subscription =
      this.form.controls.peopleFilter.valueChanges.subscribe((value) => {
        this.checkinRegistrationsRepositoryService.filter(value)
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  changePage($event: PageEvent) {
    this.checkinRegistrationsRepositoryService.reload($event)
  }
}
