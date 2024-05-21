import { useState } from "react";
import { useRootStore } from "../stores/RootStoreProvider";
import { RandomizeX } from "randomizex";

const AddItem: React.FC = () => {
  const store = useRootStore();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    store.addItem({ id: RandomizeX.Id(), name, description });
    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">{name}</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="description">{description}</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};
export default AddItem;
