import { Router } from "express";

import CartManager from "../CartManagerMemory.js";

const cartManager = new CartManager();

const router = Router();

router.get("/", async (req, res) => {
  const carts = await cartManager.getCarts();
  res.send(carts);
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const cart = await cartManager.getCartById(id);
  if (!cart) {
    return res.status(404).json({ error: "Carrito no encontrado" });
  }
  res.send(cart);
});

router.post("/", async (req, res) => {
  const cart = await cartManager.createCart();
  res.send(cart);
});

router.post("/:id/product/:id_prod", async (req, res) => {
  const cartId = parseInt(req.params.id, 10);
  const productId = parseInt(req.params.id_prod, 10);
  const cart = await cartManager.addProductToCart(cartId, productId);
  if (!cart) {
    return res.status(404).json({ error: "Carrito no encontrado" });
  }
  res.send(cart);
});

export default router;
