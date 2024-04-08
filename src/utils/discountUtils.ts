import { DateTime } from "luxon";
import { DiscountItemType } from "../types";

export function getActiveDiscounts(discountList: DiscountItemType[]) {
  const today = DateTime.utc();
  const activeDiscounts = discountList
    .filter(
      (discount) =>
        DateTime.fromISO(discount.startDate) < today &&
        DateTime.fromISO(discount.endDate) > today
    )
    .map((discount) => {
      return { percentage: discount.percentage, productId: discount.productId };
    });

  return activeDiscounts;
}
