import { IPerson } from 'src/app/models/Person';
import { Injectable } from '@angular/core';
import { PersonClass } from '../models/PersonClass';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonsService {
  constructor(private http: HttpClient) {}
  id: number = 0;
  persons: IPerson[] = [
    // new PersonClass(1, 'atoMAS-2', 'tomylinas', 3706661111, 'tomas@tomas.lt', [4.7, 1, 1, 1]),
    // new PersonClass(2, 'jons~Petrs-3', 'jonukaitIS', 4422223333, 'jons@jons.lt', [3.6, 3]),
    // new PersonClass(3, 'petrs~jONS-5', 'petriKAS-petruška', 37060600100, 'petrs@petrs.lt', [4.4, 5, 5]),
    // new PersonClass(4, 'ona-marija-4', 'anute/buraite', 3701000, 'ona@ona.lt', [5, 3, 4]),
  ];

  getAllPersons(): IPerson[] {
    return this.persons;
  }

  getOnePerson(id: number): IPerson {
    return this.persons.filter((p) => p.id === +id)[0];
  }

  setImportance(id: number, star: number): void {
    this.persons[id - 1].importance.push(star);
  }

  getAverageRating(id: number) {
    return (
      this.persons[id].importance.reduce((a, b) => a + b) /
      this.persons[id].importance.length
    );
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

  // HTTP requests:
  // GET all
  getAllPersonsHttp(): Observable<IPerson[]> {
    return this.http.get<IPerson[]>('http://localhost:3000/persons');
  }
  // GET one
  getOnePersonHttp(id: number): Observable<IPerson> {
    return this.http.get<IPerson>(`http://localhost:3000/persons/${id}`);
  }
  // DELETE one
  deleteOne(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/persons/${id}`);
  }
  // POST (CREATE) one
  createOne(person: IPerson | undefined): Observable<IPerson> {
    return this.http.post<IPerson>(`http://localhost:3000/persons`, person);
  }
  // PUT (UPDATE) one
  update(person: IPerson): Observable<IPerson> {
    return this.http.put<IPerson>(
      `http://localhost:3000/persons/${person.id}`,
      person
    );
  }
}
