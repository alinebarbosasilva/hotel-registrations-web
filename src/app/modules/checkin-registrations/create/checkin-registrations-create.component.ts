import {Component, inject, OnInit} from "@angular/core";
import {MatButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AsyncPipe, NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {CheckinRegistrationsService} from "../services/checkin-registrations.service";
import {CheckinRegistrationsRepositoryService} from "../services/checkin-registrations-repository.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatToolbar} from "@angular/material/toolbar";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {map, Observable, of, startWith} from "rxjs";
import {Person} from "../../../models/person";
import {PeopleRegistrationsService} from "../../people-registrations/people-registrations.service";


@Component({
  selector: 'app-checkin-registrations-create',
  standalone: true,
  imports: [
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    MatError,
    NgIf,
    MatCheckbox,
    MatToolbar,
    MatAutocomplete,
    MatAutocompleteTrigger,
    AsyncPipe,
    MatOption
  ],
  templateUrl: './checkin-registrations-create.component.html',
  styleUrl: './checkin-registrations-create.component.scss'
})
export class CheckinRegistrationsCreateComponent implements OnInit {
  id!: string
  formBuilder = inject(FormBuilder)
  router = inject(Router)
  route = inject(ActivatedRoute)
  peopleService = inject(PeopleRegistrationsService)
  service = inject(CheckinRegistrationsService)
  repository = inject(CheckinRegistrationsRepositoryService);
  snackbar = inject(MatSnackBar)

  form = this.formBuilder.nonNullable.group({
    dataEntrada: ['', [Validators.required]],
    dataSaida: ['', Validators.required],
    pessoa: [0, Validators.required],
    adicionalVeiculo: [false],

  })


  onSubmit() {
    if (this.form.valid) {
      this.service.create(this.form.getRawValue() as any).subscribe({
        next: () => {
          this.repository.reload()
        }, error: (err) => {
          this.snackbar.open(err.error, 'Fechar', {horizontalPosition: "start"})
        }
      });
    }
  }

  options: Person[] = [];
  filteredOptions: Observable<Person[]> = of([]);

  ngOnInit() {
    this.peopleService.getPeopleRegistrations().subscribe((resp) => {
      this.options = resp;
    })


    this.filteredOptions = this.form.controls.pessoa.valueChanges.pipe(
      startWith(''),
      map(value => {
        return value ? this._filter(value as string) : this.options.slice();
      }),
    );
  }

  displayFn(person: Person): string {
    return person && person.nome ? person.nome : '';
  }

  private _filter(nome: string | number): Person[] {
    if (typeof nome !== 'string') return this.options
    const filterValue = nome.toLowerCase();

    return this.options.filter(option => {
      return option.nome.toLowerCase().includes(filterValue) || option.documento.toLowerCase().includes(filterValue)
    })
  }
}
