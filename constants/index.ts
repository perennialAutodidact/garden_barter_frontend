export const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:8000" : "";

export const BARTER_TYPES = ["seed", "plant", "produce", "material", "tool"];

export const QUANTITY_UNITS = {
  PL: "plant",
  BC: "bunch",
  CT: "count",
  PK: "package",
  OZ: "ounce",
  LB: "pound",
  CY: "cubic yard",
  GL: "gallon",
  PT: "pint"
};
