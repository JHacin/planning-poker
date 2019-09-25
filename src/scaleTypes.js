import { SCALE_FIBONACCI, SCALE_T_SHIRT, SCALE_GAMER } from "./constants";

const scaleTypes = [
  {
    title: "Fibonacci",
    machineName: SCALE_FIBONACCI,
    options: [
      { label: 0, value: 0 },
      { label: 1, value: 1 },
      { label: 2, value: 2 },
      { label: 3, value: 3 },
      { label: 5, value: 5 },
      { label: 8, value: 8 },
      { label: 13, value: 13 },
      { label: 20, value: 20 },
      { label: 40, value: 40 },
      { label: 100, value: 100 }
    ]
  },
  {
    title: "T-Shirt",
    machineName: SCALE_T_SHIRT,
    options: [
      { label: "XS", value: 1 },
      { label: "S", value: 2 },
      { label: "M", value: 3 },
      { label: "L", value: 4 },
      { label: "XL", value: 5 },
      { label: "XXL", value: 6 }
    ]
  },
  {
    title: "Gamer",
    machineName: SCALE_GAMER,
    options: [
      {
        label: "Easy",
        value: 1
      },
      {
        label: "Medium",
        value: 2
      },
      {
        label: "Hard",
        value: 3
      }
    ]
  }
];

export const getTitle = machineName => {
  const matched = scaleTypes.find(type => type.machineName === machineName);
  return matched ? matched.title : "";
};

export const calculateAverage = (scaleType, estimates) => {
  const total = estimates.reduce((a, b) => a + b, 0);
  const average = total / estimates.length; // 2

  const closest = scaleTypes
    .find(type => type.machineName === scaleType)
    .options.sort((a, b) => Math.abs(average - a.value) - Math.abs(average - b.value))[0];

  return closest.label;
};

export const getOptionsForType = type =>
  scaleTypes.find(scaleType => scaleType.machineName === type).options;

export default scaleTypes;
