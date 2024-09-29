import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {people} from "../../data/people";


@Injectable({
  providedIn: 'root'
})
export class PeopleRegistrationsService {
  http = inject(HttpClient);
  id: number = 6

  private data = people;

  getPeopleRegistrations() {
    return of(this.data);
  }

  create(form: any) {
    this.data.push({
      ...form,
      id: this.id,
    })

    this.id++
    return of(form)
  }

  single(id: number) {
    return of(this.data.find((data) => data.id === id)!);
  }

  update(id: number, form: any) {
    let item = this.data.find((data) => data.id === id)
    const updateItem = {...item, ...form}

    this.data = this.data.map((item) => {
      if (item.id !== id) {
        return item
      } else {
        return updateItem
      }
    })
    return of(updateItem);
  }

  delete(id: number) {
    this.data = this.data.filter((item) => item.id !== id)
    return of(this.data)
  }

}
