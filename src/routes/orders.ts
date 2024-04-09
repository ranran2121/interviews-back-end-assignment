import express, { Request, Response } from "express";
import axios from "axios";
import { calculateTotal, validateOrderInput } from "../utils/orderUtils";

const orderRoutes = express.Router();

orderRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const input = validateOrderInput(req.body);
    //simulate call to Discount Table to get active discounts
    const activeDiscounts = await axios.get(
      "http://localhost:4000/api/discounts?active=true"
    );

    const {
      totalItems,
      totalPrice,
      totalBonusReward,
      totalPriceWithDiscounts,
    } = calculateTotal(input.cart, activeDiscounts.data.discountList);

    const paymentBody = {
      ...input.creditCard,
      amount: input.usePoints
        ? totalPriceWithDiscounts - totalBonusReward
        : totalPriceWithDiscounts,
    };

    // send request to payment service
    const paymentResponse = await axios.post(
      "http://localhost:4000/api/payment",
      paymentBody
    );

    return res
      .status(paymentResponse.data.status === "approved" ? 200 : 402)
      .json({
        payment: paymentResponse.data.status,
        totalItems,
        totalPrice,
        totalPriceWithDiscounts,
        amountPaid: paymentBody.amount,
        orderDetails: input,
      });
  } catch (error) {
    if (error.message.includes("Validation Error")) {
      return res.status(400).json({
        error: error.message,
      });
    }
    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
});

orderRoutes.use((req, res, next) => {
  res.status(405).json({ error: "Method Not Allowed" });
});

export default orderRoutes;
