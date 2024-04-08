import { DiscountItemType } from "../types";

const d: DiscountItemType = {
  id: 1,
  productId: 1,
  percentage: 50,
  startDate: "",
  endDate: "",
};

export const discountList: DiscountItemType[] = [
  {
    id: 1,
    productId: 1,
    percentage: 50,
    startDate: "2024-03-19T00:00:00Z",
    endDate: "2024-03-21T00:00:00Z",
  },
  {
    id: 2,
    productId: 2,
    percentage: 50,
    startDate: "2024-03-19T00:00:00Z",
    endDate: "2024-03-19T00:00:00Z",
  },
  {
    id: 3,
    productId: 3,
    percentage: 30,
    startDate: "2024-03-19T00:00:00Z",
    endDate: "2024-04-19T00:00:00Z",
  },
  {
    id: 4,
    productId: 1,
    percentage: 20,
    startDate: "2024-03-19T00:00:00Z",
    endDate: "2024-04-19T00:00:00Z",
  },
];
