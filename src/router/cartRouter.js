import { Router } from "express";

import CartManager from "../CartManagerPersistance.js";

const cartManager = new CartManager();

const router = Router();

router.get("/", async (req, res) => {
  const carts = await cartManager.getCarts();
  res.status(200).json({ message: "Carritos obtenidos", carts });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const cart = await cartManager.getCartById(id);
  if (!cart) {
    return res.status(404).json({ error: "Carrito no encontrado" });
  }
  res.status(200).json({ message: "Carrito obtenido", cart });
});

router.post("/create", async (req, res) => {
  const cart = await cartManager.createCart();
  res.status(201).json({ message: "Carrito creado", cart });
});

router.post("/:id/product/:id_prod", async (req, res) => {
  const cartId = req.params.id;
  const productId = parseInt(req.params.id_prod, 10);
  const cart = await cartManager.addProductToCart(cartId, productId);
  if (!cart) {
    return res.status(404).json({ error: "Carrito no encontrado" });
  }
  res.status(200).json({ message: "Producto agregado al carrito", cart });
});

export default router;
