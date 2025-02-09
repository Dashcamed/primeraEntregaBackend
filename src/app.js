import express from "express";

import productRouter from "./router/productsRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8080, () => {
  console.log("Servidor levantado en el puerto 8080");
});

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
