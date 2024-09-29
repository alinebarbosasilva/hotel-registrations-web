import {Component, inject} from '@angular/core';
import {PeopleRegistrationsService} from "../people-registrations.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatDialog, MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {PeopleRegistrationsRepositoryService} from "../people-registrations-repository.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-price-tables-create',
  standalone: true,
  imports: [
    AsyncPipe,
    MatCard,
    MatCardContent,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatRow,
    MatRowDef,
    MatTable,
    MatToolbar,
    MatInput,
    ReactiveFormsModule,
    MatFormField,
    MatButton,
    MatHint,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatLabel,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSuffix,
    MatError,
    NgIf
  ],
  templateUrl: './people-registrations-create.component.html',
  styleUrl: './people-registrations-create.component.scss'
})
export class PeopleRegistrationsCreateComponent {
  formBuilder = inject(FormBuilder)
  router = inject(Router)
  route = inject(ActivatedRoute)
  service = inject(PeopleRegistrationsService)
  repository = inject(PeopleRegistrationsRepositoryService)
  snackbar = inject(MatSnackBar)

  form = this.formBuilder.nonNullable.group({
    nome: ['', [Validators.required]],
    documento: ['', Validators.required],
    telefone: ['', [Validators.required]],
  })

  onSubmit() {
    if (this.form.valid) {
      this.service.create(this.form.getRawValue() as any).subscribe({
        next: () => {
          this.router.navigate(['people-registrations']);
        }, error: (err) => {
          this.snackbar.open(err.error, 'Fechar', {horizontalPosition: "start"})
        }
      });
    }
  }

  back() {
    this.router.navigate(['/people-registrations']);
  }


}
