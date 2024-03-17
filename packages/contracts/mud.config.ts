import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  tables: {
    Counter: {
      keySchema: {},
      valueSchema: "uint32",
    },
    WaterLastAt: {
      keySchema: {},
      valueSchema: "uint256",
    },
    MeditationLastAt: {
      keySchema: {},
      valueSchema: "uint256",
    },
    ExerciseLastAt: {
      keySchema: {},
      valueSchema: "uint256",
    },
    FocusLastAt: {
      keySchema: {},
      valueSchema: "uint256",
    },
  },
});
