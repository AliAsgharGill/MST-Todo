import { createContext, ReactNode, useContext } from "react";
import RootStore, { RootStoreInstance } from "./RootStore";
import { useLocalObservable } from "mobx-react-lite";

interface StoreProviderProps {
  children: ReactNode;
}

const StoreContext = createContext<RootStoreInstance | null>(null);

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const store = useLocalObservable(() => RootStore.create({ todos: [] }));
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("useStore must be within a StoreProvider");
  }
  return store;
};
