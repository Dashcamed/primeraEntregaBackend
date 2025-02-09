import fs from "fs";
import generateCode from "./utils.js";

class ProductManager {
  constructor() {
    this.filePath = "./products.json";
  }

  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.log("Error al leer los productos", error);
    }
  }

  async getProductById(id) {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      const products = JSON.parse(data);
      const product = products.find((p) => p.id === Number(id));
      if (!product) {
        console.log("Producto no encontrado");
        return null;
      }
      return product;
    } catch (error) {
      console.log("Error al leer el producto", error);
    }
  }

  async createProduct(product) {
    try {
      let products = await this.getProducts();
      let exist = products.find((p) => p.title === product.title);
      if (exist) {
        throw new Error("El producto ya existe");
      }

      const newProduct = {
        id: Math.floor(Math.random() * Date.now()),
        code: generateCode(),
        status: true,
        ...product,
      };
      products.push(newProduct);
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(products, null, 2)
      );
      console.log("Producto creado:", newProduct);
      return newProduct;
    } catch (error) {
      console.log("Error al crear el producto", error);
      return null;
    }
  }

  async updateProduct(id, product) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((p) => p.id === Number(id));
      if (index === -1) {
        console.log("Producto no encontrado");
        return null;
      }
      products[index] = { ...products[index], ...product };
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(products, null, 2)
      );
      console.log("Producto actualizado:", products[index]);
      return products[index];
    } catch (error) {
      console.log("Error al actualizar el producto", error);
      return null;
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((p) => p.id === Number(id));
      if (index === -1) {
        console.log("Producto no encontrado");
        return;
      }
      products.splice(index, 1);
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(products, null, 2)
      );
      console.log("Producto eliminado");
    } catch (error) {
      console.log("Error al eliminar el producto", error);
    }
  }
}

export default ProductManager;
