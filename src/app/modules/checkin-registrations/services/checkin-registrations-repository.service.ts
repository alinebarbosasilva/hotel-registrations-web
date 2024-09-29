import {inject, Injectable} from "@angular/core";
import {CheckinRegistrationsService} from "./checkin-registrations.service";
import {BehaviorSubject} from "rxjs";
import {CheckinRegistration} from "../../../models/checkin-registration";
import {PageEvent} from "@angular/material/paginator";


@Injectable({
  providedIn: 'root'
})
export class CheckinRegistrationsRepositoryService {
  service = inject(CheckinRegistrationsService);
  checkinRegistrations$ = new BehaviorSubject<CheckinRegistration[]>([])
  filterCheckinRegistrations$ = new BehaviorSubject<CheckinRegistration[]>([])
  count$ = new BehaviorSubject<number>(0)


  filter(peopleFilter: string) {
    if (peopleFilter === 'option1') {

      const checkinValue = this.checkinRegistrations$.value
      const updateCheckinValue = checkinValue.filter((item) => {
        const endDate = new Date(item.dataSaida);
        const currentDate = new Date();

        return endDate.getTime() > currentDate.getTime();
      })
      this.filterCheckinRegistrations$.next(updateCheckinValue)
    }else{

      const checkinValue = this.checkinRegistrations$.value
      const updateCheckinValue = checkinValue.filter((item) => {
        const endDate = new Date(item.dataSaida);
        const currentDate = new Date();

        return endDate.getTime() <= currentDate.getTime();
      })
      this.filterCheckinRegistrations$.next(updateCheckinValue)
    }

  }

  reload($event?: PageEvent) {
    this.service.getCheckinRegistrations($event).subscribe((resp) => {
      this.filterCheckinRegistrations$.next(resp.data)
      this.checkinRegistrations$.next(resp.data)
      this.count$.next(resp.count)
    })
  }


}
