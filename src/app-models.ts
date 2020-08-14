import { create } from 'domain';

export interface ISearchParams {
  from: string;
  to: string;
  embarkDate: Date;
  passanger: number;
  return: boolean;
  returnDate?: Date;
}

export class searchParams {
  create() {
    return {
      from: '',
      to: '',
      embarkDate: Date.now(),
      passangger: 1,
      return: false,
      returnDate: null,
    };
  }
}
