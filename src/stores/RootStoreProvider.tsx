import { createContext, ReactNode, useContext } from "react";
import { ItemStore, IItemStore } from "./ItemStore";
import { onSnapshot } from "mobx-state-tree";

interface RootStoreProviderProps {
  children: ReactNode;
}
const RootStoreContext = createContext<IItemStore | null>(null);

export const RootStateProvider: React.FC<RootStoreProviderProps> = ({
  children,
}) => {
  const store = ItemStore.create({
    items: [],
    loading: false,
  });

  onSnapshot(store, (snapshot) => {
    console.log("Snapshot", snapshot);
  });

  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  );
};

export const useRootStore = () => {
  const store = useContext(RootStoreContext);
  if (!store) {
    throw new Error("useRootStore must be used within a RootStoreProvider");
  }
  return store;
};
