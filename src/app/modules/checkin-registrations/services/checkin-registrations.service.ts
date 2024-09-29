import {Injectable} from '@angular/core';
import {of} from "rxjs";
import {checkin} from "../../../data/checkin";
import {PageEvent} from "@angular/material/paginator";

@Injectable({
  providedIn: 'root'
})
export class CheckinRegistrationsService {
  id: number = 0

  private data = checkin;

  getCheckinRegistrations(params?: PageEvent) {
    const start = (params?.pageIndex || 0) * (params?.pageSize || 10)
    const end = start + (params?.pageSize || 10)

    const paginatedData = this.data.slice(start, end);

    return of({
      data: paginatedData,
      count: this.data.length,
    });
  }

  create(form: any) {
    let weekValue = 120
    let weekendValue = 150
    let garageExtraWeekValue = 15
    let garageExtraWeekendValue = 20

    let startDate = new Date(form.dataEntrada);
    let endDate = new Date(form.dataSaida);

    let checkinDuration = endDate.getTime() - startDate.getTime()

    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    let differenceInDays = Math.floor(checkinDuration / millisecondsPerDay);


    if (endDate.getHours() > 16) {
      differenceInDays++
    } else if (endDate.getHours() === 16 && endDate.getMinutes() > 30) {
      differenceInDays++
    }

    const weekends = this.countWeekends(startDate, endDate)
    const weekDays = differenceInDays - weekends
    let totalWeekValue
    let totalWeekendValue

    if (form.adicionalVeiculo) {
      totalWeekValue = weekDays * (weekValue + garageExtraWeekValue)
      totalWeekendValue = weekends * (weekendValue + garageExtraWeekendValue)

    } else {
      totalWeekValue = weekDays * weekValue
      totalWeekendValue = weekends * weekendValue
    }

    this.data.unshift({
        ...form,
        valor: totalWeekValue + totalWeekendValue,
        id: this.id,
      }
    )

    this.id++
    return of(form)
  }

  countWeekends(startDate: Date, endDate: Date) {
    let count = 0;
    const millisecondsPerDay = 24 * 60 * 60 * 1000;

    for (let data = new Date(startDate); data <= new Date(endDate); data.setTime(data.getTime() + millisecondsPerDay)) {
      if (data.getDay() === 0 || data.getDay() === 6) {
        count++;
      }
    }
    return count;
  }
}
