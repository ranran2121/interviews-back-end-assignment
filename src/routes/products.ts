import express, { Request, Response } from "express";
import { getProductsList } from "../controller/products";

const productRoutes = express.Router();

productRoutes.get("/", async (req: Request, res: Response) => {
  const page = parseInt((req.query?.page as string) ?? "0", 10);
  const limit = parseInt((req.query?.limit as string) ?? "100", 10);
  const category = req.query?.category as string;
  const search = req.query?.search as string;

  if (page < 0 || limit <= 0) {
    return res.status(400).json({ message: "Bad input parameter" });
  }

  const { pagedList, total } = getProductsList(page, limit, category, search);

  return res.status(200).json({
    total,
    totalPages: Math.ceil(total / limit),
    products: pagedList,
  });
});

productRoutes.use((req, res, next) => {
  res.status(405).json({ error: "Method Not Allowed" });
});

export default productRoutes;
