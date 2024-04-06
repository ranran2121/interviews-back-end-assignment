import express, { Request, Response } from "express";
import axios from "axios";
import { calculateTotal, validateOrderInput } from "../utils/orderUtils";

const orderRoutes = express.Router();

orderRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const input = validateOrderInput(req.body);

    // send request to payment service
    const paymentResponse = await axios.post(
      "http://localhost:4000/api/payment",
      req.body.creditCard
    );

    const { totalItems, totalPrice } = calculateTotal(req.body.cart);

    return res
      .status(paymentResponse.data.status === "approved" ? 200 : 400)
      .json({
        payment: paymentResponse.data.status,
        totalItems,
        totalPrice,
        orderDetails: input,
      });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
});

orderRoutes.use((req, res, next) => {
  res.status(405).json({ error: "Method Not Allowed" });
});

export default orderRoutes;
