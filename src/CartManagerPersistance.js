import generateCode from "./utils.js";
import fs from "fs";

class CartManager {
  constructor() {
    this.filePath = "./carts.json";
  }

  async getCarts() {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      if (data.length === 0) {
        return [];
      }
      return JSON.parse(data);
    } catch (error) {
      console.log("Error al leer los carritos", error);
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((c) => c.id === id);
      if (!cart) {
        console.log("Carrito no encontrado");
        return null;
      }
      return cart;
    } catch (error) {
      console.log("Error al leer el carrito", error);
    }
  }

  async createCart() {
    try {
      let carts = await this.getCarts();
      let exist = carts.find((c) => c.id === id);
      if (exist) {
        throw new Error("El carrito ya existe");
      } else {
        const newCart = {
          id: generateCode(),
          products: [],
        };
        carts.push(newCart);
        await fs.promises.writeFile(
          this.filePath,
          JSON.stringify(carts, null, 2)
        );
        return newCart;
      }
    } catch (error) {
      console.log("Error al crear el carrito", error);
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((c) => c.id === cartId);
      if (!cart) {
        console.log("Carrito no encontrado");
        return null;
      }
      const product = cart.products.find((p) => p.id === Number(productId));
      if (product) {
        product.quantity++;
      } else {
        cart.products.push({ id: productId, quantity: 1 });
      }
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(carts, null, 2)
      );
      return cart;
    } catch (error) {
      console.log("Error al agregar el producto al carrito", error);
    }
  }
}

export default CartManager;
