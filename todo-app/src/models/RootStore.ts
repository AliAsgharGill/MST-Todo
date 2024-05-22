import { Instance, SnapshotIn, types } from "mobx-state-tree";
import TodoModel from "./TodoModel";
import { RandomizeX } from "randomizex";

const RootStore = types
  .model("RootStore", {
    //   todos: types.optional(types.array(TodoModel), []),
    todos: types.array(TodoModel),
  })
  .actions((self) => ({
    addTodo: (text: string) => {
      const id = RandomizeX.UUID();
      self.todos.push({ id, text, complete: false });
    },
    removeTodo: (id: string) => {
      self.todos = self.todos.filter((todo) => todo.id !== id);
    },
    editTodo: (id: string, newText: string) => {
      const todo = self.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.setText(newText);
      }
    },
    toggleTodo: (id: string) => {
      const todo = self.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.toggle();
      }
    },
  }));

export default RootStore;
export type RootStoreInstance = Instance<typeof RootStore>;
export type RootStoreSnapshotIn = SnapshotIn<typeof RootStore>;
