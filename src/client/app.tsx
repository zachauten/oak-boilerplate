import { React } from "../../deps.ts";

function App({ todos = [] }: { todos: string[] }) {
  return (
    <div>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">ToDo's App</h1>
          <p className="lead">This is our simple todo app.</p>
          <ListTodos items={todos} />
        </div>
      </div>
    </div>
  );
}

function ListTodos({ items = [] }: { items: string[] }) {
  return (
      <ul className="list-group">
        {items.map((todo, index: number) => {
          return (
            <li key={index} className="list-group-item">
              {todo}
              <button
                type="button"
                className="ml-2 mb-1 close"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </li>
          );
        })}
      </ul>
  );
}
export default App;
