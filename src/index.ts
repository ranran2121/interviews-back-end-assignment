import express from "express";
import bodyParser from "body-parser";
import productRoutes from "./routes/products";

const app = express();

app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/products", productRoutes);

export default app;
