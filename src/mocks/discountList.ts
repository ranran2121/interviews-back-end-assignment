import { DiscountItemType } from "../types";
import { DateTime } from "luxon";
import { names } from "./const";

export function getRandomDate() {
  const startDate = DateTime.utc().minus({ days: 5 }).toMillis();
  const endDate = DateTime.utc().plus({ days: 5 }).toMillis();
  const randomTimestamp = Math.random() * (endDate - startDate) + startDate;
  const randomDateTime = DateTime.fromMillis(randomTimestamp);
  const randomDate = randomDateTime.startOf("day");
  const randomDateAtMidnight = randomDate.toJSDate();
  const endDateAtMidnight = randomDate.plus({ days: 5 }).toJSDate();

  return { randomDateAtMidnight, endDateAtMidnight };
}

export function generateDiscountList(length: number) {
  let discountList: DiscountItemType[] = [];
  for (let i = 0; i <= length; i++) {
    const id = i;
    const percentage = Math.floor(Math.random() * 100) + 1;
    const { randomDateAtMidnight: startDate, endDateAtMidnight: endDate } =
      getRandomDate();

    const productId = Math.floor(Math.random() * names.length) + 1;

    const discountItem = { id, productId, startDate, endDate, percentage };
    discountList.push(discountItem);
  }

  return discountList;
}
