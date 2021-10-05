import { Injectable } from '@angular/core';
import { IPerson } from '../models/Person';
import { PersonClass } from '../models/PersonClass';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  constructor() { }
  id: number = 0;
  persons: IPerson[] = [
    new PersonClass(1, 'atoMAS-2', 'tomylinas', 3706661111, 'tomas@tomas.lt', [4.7, 1, 1, 1]),
    new PersonClass(2, 'jons~Petrs-3', 'jonukaitIS', 4422223333, 'jons@jons.lt', [3.6, 3]),
    new PersonClass(3, 'petrs~jONS-5', 'petriKAS-petruška', 37060600100, 'petrs@petrs.lt', [4.4, 5, 5]),
    new PersonClass(4, 'ona-marija-4', 'anute/buraite', 3701000, 'ona@ona.lt', [5, 3, 4]),
  ];

  getAllPersons(): IPerson[] {
    return this.persons;
  }

  getOnePerson(id: number): IPerson {
    return this.persons.filter(p => p.id === +id)[0];
  }

  setImportance(id: number, star: number): void {
    this.persons[id-1].importance.push(star); 
  }

  getAverageRating(id: number) {
    return (this.persons[id].importance.reduce((a, b) => a + b))/this.persons[id].importance.length;
  }

  getLastId(): number {
    for (const i in this.persons) {
      if (this.persons[i].id > this.id) {
        this.id = this.persons[i].id;
      }
    }
    return this.id + 1;
  }

  addNewPerson(person: IPerson) {
    this.persons.push(person);
  }
}
