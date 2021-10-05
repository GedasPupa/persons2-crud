interface IPerson {
  id: number;
  name: string;
  surname: string;
  phone: number;
  email: string;
  importance: number[];
  getAverageRating(): number;
}

export { IPerson };
