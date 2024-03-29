import express, { Request, Response } from "express";
import { productList } from "../mocks/productList";

const productRoutes = express.Router();

productRoutes.get("/", async (req: Request, res: Response) => {
  return res.status(200).json(productList);
});

export default productRoutes;
