import { DB } from "./deps.ts";
import { Person } from "./models.ts";

export function add_person(conn: DB, person: Person) {
  conn.query("INSERT INTO people (name, email, birth_year) VALUES (?, ?, ?)", [
    person.name,
    person.email,
    person.birth_year
  ]);
}

export function get_people(conn: DB, name: string): Person[] {
  const res = conn.query("SELECT id, email, birth_year FROM people WHERE name = (?)", [
    name,
  ]);
  return [...res].map(person => { return { id: person[0], name: name, email: person[1], birth_year: person[2] }});
}

export function update_person() {
}

export function delete_person(conn: DB, id: number) {
  conn.query("DELETE FROM people WHERE id = (?)", [
    id,
  ]);
}

export function setup(conn: DB) {
  conn.query(
    "CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, birth_year INTEGER)",
  );
}
