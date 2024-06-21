import express, { Request, Response } from "express";
import { validateOrderInput } from "../utils/orderUtils";
import { postOrder } from "../controller/orders";

const orderRoutes = express.Router();

orderRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const input = validateOrderInput(req.body);

    const {
      status,
      totalItems,
      totalPrice,
      totalPriceWithDiscounts,
      amountPaid,
    } = await postOrder(input);

    return res.status(status === "approved" ? 200 : 402).json({
      payment: status,
      totalItems,
      totalPrice,
      totalPriceWithDiscounts,
      amountPaid,
      orderDetails: input,
    });
  } catch (error: any) {
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
