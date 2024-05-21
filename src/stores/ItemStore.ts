import { types, Instance, flow, applySnapshot } from "mobx-state-tree";
import axios from "axios";
import ItemModel from "../models/ItemModel";

const ItemStore = types
  .model("ItemStore", {
    items: types.optional(types.array(ItemModel), []),
    loading: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    fetchItems: flow(function* () {
      self.loading = true;
      try {
        const response = yield axios.get("http://localhost:5000/items");
        self.items.replace(response.data);
      } catch (error) {
        console.error("Failed to fetch items", error);
      } finally {
        self.loading = false;
      }
    }),
    addItem: flow(function* (item) {
      try {
        const response = yield axios.post("http://localhost:5000/items", item);
        self.items.push(response.data);
      } catch (error) {
        console.error("Failed to add item", error);
      }
    }),
    updateItem: flow(function* (id, updatedItem) {
      try {
        const response = yield axios.put(
          `http://localhost:5000/items/${id}`,
          updatedItem
        );
        const index = self.items.findIndex((item) => item.id === id);
        if (index !== -1) {
          applySnapshot(self.items[index], response.data);
        }
      } catch (error) {
        console.error("Failed to update item", error);
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

export type IItemStore = Instance<typeof ItemStore>;
export { ItemStore };
