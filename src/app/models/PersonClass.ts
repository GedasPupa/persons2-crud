import { IPerson } from './Person';

class PersonClass implements IPerson {
  id: number;
  name: string;
  surname: string;
  phone: number;
  email: string;
  importance: number[];
  constructor(
    id: number,
    name: string,
    surname: string,
    phone: number,
    email: string,
    importance: number[]
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.phone = phone;
    this.email = email;
    this.importance = importance;
  }
  getAverageRating(): number {
    return this.importance.reduce((a, b) => a + b) / this.importance.length;
  }
}

export { PersonClass };
