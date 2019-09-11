import { SCALE_FIBONACCI, SCALE_T_SHIRT, SCALE_GAMER } from "./constants";

const scaleTypes = [
  {
    title: "Fibonacci",
    machineName: SCALE_FIBONACCI,
    options: [0, 1, 2, 3, 5, 8, 13, 20, 40, 100]
  },
  {
    title: "T-Shirt",
    machineName: SCALE_T_SHIRT,
    options: ["XS", "S", "M", "L", "XL", "XXL"]
  },
  {
    title: "Gamer",
    machineName: SCALE_GAMER,
    options: ["Easy", "Medium", "Hard"]
  }
];

export default scaleTypes;
