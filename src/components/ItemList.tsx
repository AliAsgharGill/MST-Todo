import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../stores/RootStoreProvider";

const ItemList: React.FC = observer(() => {
  const store = useRootStore();

  useEffect(() => {
    store.fetchItems();
  }, [store]);

  if (store.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {store.items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
});

export default ItemList;
