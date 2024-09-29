import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {PeopleRegistrationsService} from "./people-registrations.service";

@Injectable({
  providedIn: 'root'
})
export class PeopleRegistrationsRepositoryService {
  service = inject(PeopleRegistrationsService)
  people$ = new BehaviorSubject<any[]>([])

  reload() {
    this.service.getPeopleRegistrations().subscribe((resp) => {
      this.people$.next(resp)
    })
  }


}
