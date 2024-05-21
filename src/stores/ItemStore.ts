import axios from "axios";
import { types, flow, Instance } from "mobx-state-tree";

const Item = types.model("Item", {
  id: types.identifierNumber,
  name: types.string,
  description: types.string,
});

export const ItemStore = types
  .model("ItemStore", {
    items: types.array(Item),
    loading: types.boolean,
  })
  .actions((self) => ({
    fetchItems: flow(function* () {
      self.loading = true;
      try {
        const response = yield axios.get("http://localhost:5000/items");
        self.items = response.data;
      } catch (error) {
        console.log("Failed to fetch items", error);
      } finally {
        self.loading = false;
      }
    }),
    addItem: flow(function* (item) {
      try {
        const response = yield axios.post("http://localhost:5000/items", item);
        self.items.push(response.data);
      } catch (error) {
        console.log("Failed to add item", error);
      }
    }),
    updateItem: flow(function* (item) {
      try {
        const response = yield axios.put(
          `http://localhost:5000/items/${item.id}`,
          item
        );
        const index = self.items.findIndex((i) => i.id === item.id);
        self.items[index] = response.data;
      } catch (error) {
        console.log("Failed to update item", error);
      }
    }),
    deleteItem: flow(function* (id) {
      try {
        yield axios.delete(`http://localhost:5000/items/${id}`);
        self.items = self.items.filter((i) => i.id !== id);
      } catch (error) {
        console.log("Failed to delete item", error);
      }
    }),
  }));

export interface IItemStore extends Instance<typeof ItemStore> {}
