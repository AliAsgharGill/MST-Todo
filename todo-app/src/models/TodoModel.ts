import { types } from "mobx-state-tree";
const TodoModel = types
  .model("Todo", {
    id: types.identifier,
    text: types.string,
    complete: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    toggle() {
      self.complete = !self.complete;
    },
    setText(newText: string) {
      self.text = newText;
    },
  }));

export default TodoModel;
