import {Component, inject, OnInit} from '@angular/core';
import {PeopleRegistrationsService} from "./people-registrations.service";
import {AsyncPipe, CurrencyPipe, DatePipe} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {PeopleRegistrationsRepositoryService} from "./people-registrations-repository.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [
    MatCardContent,
    AsyncPipe,
    MatCard,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    DatePipe,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    CurrencyPipe,
    MatRow,
    MatHeaderRow,
    MatButton,
    MatIcon,
    MatHeaderRowDef,
    MatRowDef,
    MatIconButton,

  ],
  templateUrl: './people-registrations-list.component.html',
  styleUrl: './people-registrations-list.component.scss'
})
export class PeopleRegistrationsListComponent implements OnInit {
  service = inject(PeopleRegistrationsService);
  private router = inject(Router);
  repository = inject(PeopleRegistrationsRepositoryService);
  snackbar = inject(MatSnackBar)

  people$ = this.repository.people$

  displayedColumns = [
    'nome',
    'telefone',
    'documento',
    'actions'];

  ngOnInit(): void {
    this.repository.reload();
  }

  addPerson() {
    this.router.navigate(['/people-registrations/new'])
  }

  updatePerson(item: any) {
    this.router.navigate([`/people-registrations/${item.id}`]);
  }

  deletePerson(item: any) {
    this.service.delete(item.id).subscribe({
      next: () => {
        this.repository.reload();
      }, error: (err) => {
        this.snackbar.open(err.error, 'Fechar', {horizontalPosition: "start"})
      }
    })

  }
}
