import axios from "axios";
import {
  types,
  onSnapshot,
  flow,
  applyAction,
  getSnapshot,
} from "mobx-state-tree";

export const userModel = types
  .model("User", {
    userID: types.string,
    userName: types.string,
    math: types.number,
    physics: types.number,
  })
  .actions((self) => ({
    setMarks: (physicsMarks, mathMarks) => {
      (self.physics = physicsMarks), (self.math = mathMarks);
    },
    setMathMarks(mathMarks) {
      self.math = mathMarks;
    },

    setPhysicsMarks(physicsMarks) {
      self.physics = physicsMarks;
    },

    afterCreate: () => {
      onSnapshot(self, (snapshot) =>
        console.log("Value in snapshot called marks get changed", snapshot)
      );
      console.log("After Create Hook Called");
    },

    getMarksWithApi: flow(function* getMarksWithApi() {
      let response = yield axios.get(
        "http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=5"
      );
      console.log("Response", response.data);
    }),
  }))
  .views((self) => ({
    get totalMarks() {
      return self.math + self.physics;
    },

    get percentage() {
      return ((self.math + self.physics) / 200) * 100;
    },
  }));

const user = userModel.create({
  userID: "F24BIN",
  userName: "Ali Asghar",
  math: 75,
  physics: 95,
});

export default user;
