import { DateTime } from "luxon";
import { DiscountItemType } from "../types";
import { generateDiscountList } from "../mocks/discountList";

export function getDiscounts(active: string) {
  const list = generateDiscountList(10);
  let discountList = list.map((discount) => {
    return { percentage: discount.percentage, productId: discount.productId };
  });

  if (active === "true") {
    discountList = getActiveDiscounts(list);
  } else if (active && active !== "true") {
    throw new Error("bad input parameter");
  }
  return discountList;
}

export function getActiveDiscounts(list: DiscountItemType[]) {
  const today = DateTime.utc().toJSDate();

  const activeDiscounts = list
    .filter(
      (discount) => discount.startDate < today && discount.endDate > today
    )
    .map((discount) => {
      return { percentage: discount.percentage, productId: discount.productId };
    });

  return activeDiscounts;
}
