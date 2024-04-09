import express, { Request, Response } from "express";
import { generateDiscountList } from "../mocks/discountList";
import { getActiveDiscounts } from "../utils/discountUtils";

const discountRoutes = express.Router();

discountRoutes.get("/", async (req: Request, res: Response) => {
  const active = req.query?.active as string;
  let list = generateDiscountList(10);

  let discountList = list.map((discount) => {
    return { percentage: discount.percentage, productId: discount.productId };
  });

  if (active === "true") {
    discountList = getActiveDiscounts(list);
  } else if (active && active !== "true") {
    return res.status(400).json({ message: "Bad input parameter" });
  }

  return res.status(200).json({
    discountList,
  });
});

discountRoutes.use((req, res, next) => {
  res.status(405).json({ error: "Method Not Allowed" });
});

export default discountRoutes;
