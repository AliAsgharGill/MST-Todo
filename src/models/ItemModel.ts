import { types } from "mobx-state-tree";

const ItemModel = types.model("Item", {
  id: types.identifierNumber,
  name: types.string,
  description: types.string,
});

export default ItemModel;
