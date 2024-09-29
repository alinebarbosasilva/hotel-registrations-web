import {Route} from '@angular/router';
import {PeopleRegistrationsListComponent} from "./people-registrations-list.component";
import {PeopleRegistrationsCreateComponent} from "./create/people-registrations-create.component";
import {PeopleRegistrationsUpdateComponent} from "./update/people-registrations-update.component";

export default [
  {path: '', component: PeopleRegistrationsListComponent},
  {path: 'new', component: PeopleRegistrationsCreateComponent},
  {path: ':id', component: PeopleRegistrationsUpdateComponent},

] satisfies Route[]
