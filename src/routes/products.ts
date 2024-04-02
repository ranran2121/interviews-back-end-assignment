import express, { Request, Response } from "express";
import { productList } from "../mocks/productList";

const productRoutes = express.Router();

productRoutes.get("/", async (req: Request, res: Response) => {
  const page = parseInt((req.query?.page as string) ?? "0", 10);
  const limit = parseInt((req.query?.limit as string) ?? "100", 10);

  if (page < 0 || limit <= 0) {
    return res.status(400).json({ message: "Bad input parameter" });
  }

  const pagedList = productList.slice(page * limit, (page + 1) * limit);

  return res.status(200).json({
    total: productList.length,
    totalPages: Math.ceil(productList.length / limit),
    products: pagedList,
  });
});

productRoutes.use((req, res, next) => {
  res.status(405).json({ error: "Method Not Allowed" });
});

export default productRoutes;
