import express from "express";

import bodyParser from "body-parser";
import productRoutes from "./routes/products";
import { limiter } from "./middleware/rateLimit";
import paymentRoutes from "./routes/payment";

const app = express();

app.use(limiter);

app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);

export default app;
