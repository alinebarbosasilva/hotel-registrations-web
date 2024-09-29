import {Component, Inject, inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PeopleRegistrationsService} from "../people-registrations.service";
import {PeopleRegistrationsRepositoryService} from "../people-registrations-repository.service";
import {DialogRef} from "@angular/cdk/dialog";
import {NgIf} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-update',
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
    NgIf
  ],
  templateUrl: './people-registrations-update.component.html',
  styleUrl: './people-registrations-update.component.scss'
})
export class PeopleRegistrationsUpdateComponent implements OnInit {
  id!: number
  formBuilder = inject(FormBuilder)
  router = inject(Router)
  route = inject(ActivatedRoute)
  service = inject(PeopleRegistrationsService)
  snackbar = inject(MatSnackBar)

  form = this.formBuilder.nonNullable.group({
    nome: ['', [Validators.required]],
    documento: ['', Validators.required],
    telefone: ['', [Validators.required]],
  })

  onSubmit() {
    if (this.form.valid) {
      this.service.update(this.id, this.form.getRawValue() as any).subscribe({
        next: () => {
          this.router.navigate(['people-registrations']);
        }, error: (err) => {
          this.snackbar.open(err.error, 'Fechar', {horizontalPosition: "start"})
        }
      });
    }
  }

  back() {
    this.router.navigate(["/people-registrations"])
  }

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];

    this.service.single(this.id).subscribe({
      next: (resp) => {
        this.form.patchValue(resp)
      }, error: (err) => this.snackbar.open(err.error, 'Fechar', {horizontalPosition: "start"})
    })
  }
}
