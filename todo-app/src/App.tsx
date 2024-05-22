import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "./models/StoreProvider";

const App: React.FC = observer(() => {
  const store = useStore();
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    store.addTodo(newTodo);
    setNewTodo("");
  };

  return (
    <div className="App">
      <h1 className="heading">Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {store.todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <div>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => store.toggleTodo(todo.id)}
                id="todoText"
              />
              <label
                htmlFor="todoText"
                style={{
                  textDecoration: todo.complete ? "line-through" : "none",
                }}
              >
                {todo.text}
              </label>
            </div>
            <button onClick={() => store.removeTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default App;
