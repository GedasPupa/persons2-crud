import { PersonsService } from './../../services/persons.service';
import { IPerson } from 'src/app/models/Person';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PersonClass } from 'src/app/models/PersonClass';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit {
  person: IPerson | undefined = undefined;
  persons: IPerson[] | undefined;
  importance: number = 0;
  id: any;
  sub: any;
  error: string | undefined;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private _personsService: PersonsService
  ) {
    this.error = this._router.getCurrentNavigation()?.extras.state?.error;
  }

  @ViewChild('formInfo') formInfo!: NgForm;

  ngOnInit() {
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.person = this._personsService.getOnePerson(+this.id);
      this.importance = this.getAverageRating();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onBack(): void {
    this._router.navigate(['persons']);
  }

  getAverageRating(): number {
    if (this.person !== undefined) {
      return (
        this.person.importance.reduce((a, b) => a + b) /
        this.person.importance.length
      );
    } else {
      return 0;
    }
  }

  onSubmit($event: MouseEvent): void {
    // changing
    if (
      this.formInfo.valid &&
      this.formInfo.dirty &&
      !!this.person?.id
      // !this.persons?.find((p) => p.id === this.person?.id)
    ) {
      this.person.importance.push(+this.importance);
      alert(`Person with ID: ${this.person?.id} updated!`);
      this._router.navigate(['/persons']);
    } else if (this.formInfo.valid && this.formInfo.dirty) {
      let formData = this.formInfo.value;
      let id = this._personsService.getLastId();
      let newPerson: IPerson = new PersonClass(
        id,
        formData.name,
        formData.surname,
        formData.phone,
        formData.email,
        [+formData.importance]
      );
      this._personsService.addNewPerson(newPerson);
      alert(`New person ${newPerson.name} added!`);
      this._router.navigate(['/persons']);
    }
  }
}
