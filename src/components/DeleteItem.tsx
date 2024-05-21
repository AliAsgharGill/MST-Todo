import React from "react";
import { useRootStore } from "../stores/RootStoreProvider";

const DeleteItem: React.FC<{ id: number }> = ({ id }) => {
  const store = useRootStore();

  const handleDelete = () => {
    store.deleteItem(id);
  };

  return <button onClick={handleDelete}>Delete Item</button>;
};

export default DeleteItem;
