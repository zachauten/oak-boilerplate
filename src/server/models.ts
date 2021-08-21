import { DB } from "../../deps.ts";

export interface InitialState {
  db: DB;
}

export interface Person {
  id?: number,
  name: string,
  email: string,
  birth_year: number,
}
