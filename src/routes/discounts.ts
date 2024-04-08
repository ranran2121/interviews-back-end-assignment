import express, { Request, Response } from "express";
import { discountList } from "../mocks/discountList";
import { getActiveDiscounts } from "../utils/discountUtils";

const discountRoutes = express.Router();

discountRoutes.get("/", async (req: Request, res: Response) => {
  const active = req.query?.active as string;
  let list = discountList.map((discount) => {
    return { percentage: discount.percentage, productId: discount.productId };
  });

  if (active === "true") {
    list = getActiveDiscounts(discountList);
  }

  return res.status(200).json({
    discountList: list,
  });
});

discountRoutes.use((req, res, next) => {
  res.status(405).json({ error: "Method Not Allowed" });
});

export default discountRoutes;
