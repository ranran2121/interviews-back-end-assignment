import express, { Request, Response } from "express";
import { validateCreditCardInput } from "../utils/creditCardUtils";

const paymentRoutes = express.Router();

paymentRoutes.post("/", async (req: Request, res: Response) => {
  try {
    validateCreditCardInput(req.body);

    //here I should check if the card is able to cover the amount of the payment
    //not having info about the active balance of the card, I generate a random number that simulate the credit card coverage
    const coverage = Math.floor(Math.random() * 900000000) + 100000000;

    if (coverage < 400000000) {
      return res.status(200).json({
        transactionId: `tx_${coverage}`,
        status: "approved",
      });
    } else if (coverage >= 400000000 && coverage < 700000000) {
      return res.status(200).json({
        transactionId: `tx_${coverage}`,
        status: "declined",
      });
    } else {
      return res.status(200).json({
        transactionId: `tx_${coverage}`,
        status: "error",
      });
    }
  } catch (error) {
    console.log("Error in payment", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

paymentRoutes.use((req, res, next) => {
  res.status(405).json({ error: "Method Not Allowed" });
});

export default paymentRoutes;
