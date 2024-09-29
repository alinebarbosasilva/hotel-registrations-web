import {Route} from "@angular/router";
import {CheckinRegistrationsListComponent} from "./checkin-registrations-list.component";
import {PeopleRegistrationsCreateComponent} from "../people-registrations/create/people-registrations-create.component";

export default [
  {path: '', component: CheckinRegistrationsListComponent},
  {path: 'new', component: PeopleRegistrationsCreateComponent},
] satisfies Route[]
