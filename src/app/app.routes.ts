import { Routes } from '@angular/router';
import {CheckinRegistrationsListComponent} from "./modules/checkin-registrations/checkin-registrations-list.component";

export const routes: Routes = [
  {
    path: 'people-registrations',
    loadChildren: () => import('./modules/people-registrations/people-registrations.routes'),
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'checkin-registrations',
  },
  {
    path: 'checkin-registrations', component: CheckinRegistrationsListComponent,
  }
];
