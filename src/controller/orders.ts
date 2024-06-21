import axios from "axios";
import { calculateTotal } from "../utils/orderUtils";
import { CartItemType, CreditCardType } from "../types";
import { acquireLock, releaseLock } from "../utils/redisClient";

export async function postOrder(order: {
  cart: CartItemType[];
  creditCard: CreditCardType;
  usePoints: boolean;
}) {
  const ttl = 1000;
  const keys: string[] = order.cart.map(
    (cartItem) => `product:${cartItem.product.id}`
  );

  let lockKeys;
  try {
    lockKeys = await acquireLock(keys, ttl);

    //check items' availability
    //and throw error if an item's availabiity is less than the requested quantity

    //simulate call to Discount Table to get active discounts
    const activeDiscounts = await axios.get(
      "http://localhost:4000/api/discounts?active=true"
    );

    const {
      totalItems,
      totalPrice,
      totalBonusReward,
      totalPriceWithDiscounts,
    } = calculateTotal(order.cart, activeDiscounts.data.discountList);

    const paymentBody = {
      ...order.creditCard,
      amount: order.usePoints
        ? totalPriceWithDiscounts - totalBonusReward
        : totalPriceWithDiscounts,
    };

    // send request to payment service
    const paymentResponse = await axios.post(
      "http://localhost:4000/api/payment",
      paymentBody
    );

    //update new items' quantity

    return {
      status: paymentResponse.data.status,
      payment: paymentResponse.data.status,
      totalItems,
      totalPrice,
      totalPriceWithDiscounts,
      amountPaid: paymentBody.amount,
    };
  } catch (error: any) {
    throw new Error(error.message);
  } finally {
    try {
      await releaseLock(lockKeys);
    } catch (releaseError) {
      console.error("Error releasing lock:", releaseError);
    }
  }
}
