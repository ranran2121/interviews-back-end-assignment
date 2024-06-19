import express, { Request, Response } from "express";
import { validatePaymentInput } from "../utils/paymentUtils";
import { postPayment } from "../controller/payments";

const paymentRoutes = express.Router();

paymentRoutes.post("/", async (req: Request, res: Response) => {
  try {
    validatePaymentInput(req.body);

    //here I should check if the card is able to cover the amount of the payment
    //not having info about the active balance of the card, I generate a random number that simulate the credit card coverage

    const { transactionId, status } = postPayment();

    return res.status(200).json({
      transactionId,
      status,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

paymentRoutes.use((req, res, next) => {
  res.status(405).json({ error: "Method Not Allowed" });
});

export default paymentRoutes;
