import { ProductType } from "../types";
import { names } from "./const";
import { randomGroceryCategory } from "./utils";

export const productList: ProductType[] = names.map((name, index) => ({
  id: index,
  name: name,
  imageUrl: `https://via.placeholder.com/150?text=Product+${index}`,
  price: parseFloat((Math.random() * 40).toFixed(2)),
  category: randomGroceryCategory(),
  availableQuantity: parseInt((Math.random() * 50).toFixed()),
  specialBonus: Math.floor(Math.random() * 3) + 1,
}));
