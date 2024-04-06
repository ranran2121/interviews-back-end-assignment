import express, { Request, Response } from "express";
import axios from "axios";
import { calculateTotal, validateOrderInput } from "../utils/orderUtils";

const orderRoutes = express.Router();

orderRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const input = validateOrderInput(req.body);
    const { totalItems, totalPrice } = calculateTotal(req.body.cart);
    const paymentBody = { ...req.body.creditCard, amount: totalPrice };

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
