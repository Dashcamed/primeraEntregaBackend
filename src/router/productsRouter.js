import { Router } from "express";
import ProductManager from "../ProductsManagerPersistance.js";

const productManager = new ProductManager();

const router = Router();

// async function createDefaultProducts() {
//   try {
//     await productManager.createProduct({
//       title: "Pan de maiz",
//       description: "Pan hecho de maiz 100% natural",
//       category: "Panaderia",
//       price: 100,
//       stock: 10,
//     });
//     console.log(
//       "Producto por defecto creado:",
//       await productManager.getProducts()
//     );
//   } catch (error) {
//     console.log("Error al crear el producto", error);
//   }
// }
// createDefaultProducts();

router.use((req, res, next) => {
  console.log(`Logs de productos: ${req.method} ${req.path} - ${new Date()}`);
  next();
});

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.status(200).json({
    message: "Productos obtenidos con éxito",
    products,
  });
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10); // Convertimos `id` a número
  const product = await productManager.getProductById(id);

  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.status(200).json({
    message: "Producto obtenido con éxito",
    product,
  });
});

router.post("/create", async (req, res) => {
  const { title, description, category, price, stock } = req.body;
  const newProduct = await productManager.createProduct({
    title,
    description,
    category,
    price,
    stock,
  });
  if (!newProduct) {
    return res.status(400).json({ error: "Error al crear el producto" });
  }
  res
    .status(201)
    .send({ message: "Producto creado con exito", product: newProduct });
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedProduct = await productManager.updateProduct(id, req.body);

  if (!updatedProduct) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.status(200).json({
    message: "Producto actualizado con éxito",
    product: updatedProduct,
  });
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  await productManager.deleteProduct(id);
  res.status(200).json({ message: "Producto eliminado con éxito" });
});

export default router;
