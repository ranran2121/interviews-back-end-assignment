import axios from "axios";
import { calculateTotal } from "../utils/orderUtils";
import { CartItemType, CreditCardType } from "../types";

export async function postOrder(order: {
  cart: CartItemType[];
  creditCard: CreditCardType;
  usePoints: boolean;
}) {
  try {
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

    return {
      status: paymentResponse.data.status,
      payment: paymentResponse.data.status,
      totalItems,
      totalPrice,
      totalPriceWithDiscounts,
      amountPaid: paymentBody.amount,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}
