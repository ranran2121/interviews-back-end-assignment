import express, { Request, Response } from "express";
import { productList } from "../mocks/productList";

const productRoutes = express.Router();

productRoutes.get("/", async (req: Request, res: Response) => {
  const page = parseInt((req.query?.page as string) ?? "0", 10);
  const limit = parseInt((req.query?.limit as string) ?? "100", 10);
  const category = req.query?.category as string;
  const search = req.query?.search as string;

  const filteredList = productList.filter((item) => {
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (category && item.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }

    return true;
  });

  if (page < 0 || limit <= 0) {
    return res.status(400).json({ message: "Bad input parameter" });
  }

  const pagedList = filteredList.slice(page * limit, (page + 1) * limit);

  return res.status(200).json({
    total: filteredList.length,
    totalPages: Math.ceil(filteredList.length / limit),
    products: pagedList,
  });
});

productRoutes.use((req, res, next) => {
  res.status(405).json({ error: "Method Not Allowed" });
});

export default productRoutes;
