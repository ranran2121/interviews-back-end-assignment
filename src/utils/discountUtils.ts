import { DateTime } from "luxon";
import { DiscountItemType } from "../types";

export function getActiveDiscounts(discountList: DiscountItemType[]) {
  const today = DateTime.utc().toJSDate();
  const activeDiscounts = discountList
    .filter(
      (discount) => discount.startDate < today && discount.endDate > today
    )
    .map((discount) => {
      return { percentage: discount.percentage, productId: discount.productId };
    });

  return activeDiscounts;
}
