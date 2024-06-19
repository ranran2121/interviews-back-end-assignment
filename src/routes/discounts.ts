import express, { Request, Response } from "express";
import { getDiscounts } from "../controller/discounts";

const discountRoutes = express.Router();

discountRoutes.get("/", async (req: Request, res: Response) => {
  const active = req.query?.active as string;
  try {
    const discountList = getDiscounts(active);
    return res.status(200).json({
      discountList,
    });
  } catch (err) {
    return res.status(400).json({ message: "Bad input parameter" });
  }
});

discountRoutes.use((req, res, next) => {
  res.status(405).json({ error: "Method Not Allowed" });
});

export default discountRoutes;
