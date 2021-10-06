import { PersonsService } from './../../services/persons.service';
import { Component } from '@angular/core';
import { IPerson } from 'src/app/models/Person';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css'],
})
export class PersonsComponent {
  constructor(private _personsService: PersonsService) {
    this._personsService.getAllPersonsHttp().subscribe(
      (res) => {
        this.persons = res;
        this.filterData = this.persons;
        this.dataLoaded = true;
      },
      (err) => {
        console.log(err);
        this.dataLoaded = true;
      }
    );
    // this.filterData = this.persons;
    // this.error = this.router.getCurrentNavigation()?.extras.state?.error;
  }
  persons: IPerson[] = [];
  filterData: IPerson[] = this.persons;
  onePerson: any;
  sortAsc: boolean = true;
  field: string = '';
  text: string = '';
  star: number = 0;
  id: number = 0;
  dataLoaded = false;
  // error: string | undefined;

  onFilter($event: any): void {
    let inp = $event.target.value.toLocaleLowerCase();
    this.filterData = this.persons.filter(
      (zm) => zm.name.toLocaleLowerCase().indexOf(inp) != -1
    );
  }

  onSort(field: string): void {
    let fieldAsKey = field as keyof IPerson;
    this.field = field;

    // refactored with array average for 'importance' field sorting:
    if (this.sortAsc) {
      this.filterData.sort((a, b) => {
        if (field === 'importance') {
          return a.getAverageRating() < b.getAverageRating() ? -1 : 0;
        } else {
          return a[fieldAsKey] < b[fieldAsKey] ? -1 : 0;
        }
      });
      this.sortAsc = !this.sortAsc;
    } else {
      this.filterData.sort((a, b) => {
        if (field === 'importance') {
          return a.getAverageRating() > b.getAverageRating() ? -1 : 0;
        } else {
          return a[fieldAsKey] > b[fieldAsKey] ? -1 : 0;
        }
      });
      this.sortAsc = !this.sortAsc;
    }
  }

  OnRatingClick(pareinaisvaiko: string): void {
    this.text = pareinaisvaiko;
  }

  OnStarClick(pareinaisvaiko: number): void {
    this.star = pareinaisvaiko;
  }

  OnstarClick2(pareinaisvaiko: number): void {
    this._personsService.setImportance(pareinaisvaiko, this.star);
  }

  getAverageRating(id: number): number {
    return (
      this.filterData[id].importance.reduce((a, b) => a + b) /
      this.filterData[id].importance.length
    );
  }
}
