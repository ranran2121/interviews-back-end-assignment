import { categories } from "./const";

export function randomGroceryCategory() {
  return categories[Math.floor(Math.random() * categories.length)];
}
