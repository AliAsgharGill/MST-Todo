// import React, { useState } from "react";
// import { useRootStore } from "../stores/RootStoreProvider";

// const UpdateItem: React.FC<{ id: number }> = ({ id }) => {
//   const store = useRootStore();
//   const item = store.items.find((item) => item.id === id);
//   if (!item) {
//     return <div>Item not found</div>;
//   }

//   const [name, setName] = useState(item?.name || "");
//   const [description, setDescription] = useState(item?.description || "");

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (item) {
//       store.updateItem(id, { ...item, name, description });
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="">Name</label>
//           <input value={name} onChange={(e) => setName(e.target.value)} />
//         </div>
//         <div>
//           <label htmlFor="">Description</label>
//           <input
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <button type="submit">Update</button>
//       </form>
//     </>
//   );
// };

// export default UpdateItem;

import React, { useState } from "react";
import { useRootStore } from "../stores/RootStoreProvider";

const UpdateItem: React.FC<{
  id: number;
  initialName: string;
  initialDescription: string;
}> = ({ id, initialName, initialDescription }) => {
  const store = useRootStore();
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateItem(id, { id, name, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Description</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Update Item</button>
    </form>
  );
};

export default UpdateItem;
