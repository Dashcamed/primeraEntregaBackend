import generateCode from "./utils.js";
class CartManager {
  constructor() {
    this.carts = [];
  }

  async getCarts() {
    try {
      return this.carts;
    } catch (error) {
      console.log("Error al leer los carritos", error);
    }
  }

  async createCart() {
    try {
      const newCart = {
        id: generateCode(),
        products: [],
      };
      this.carts.push(newCart);
      return newCart;
    } catch (error) {
      console.log("Error al crear el carrito", error);
    }
  }

  async getCartById(id) {
    try {
      const cart = this.carts.find((c) => c.id === id);
      if (!cart) {
        console.log("Carrito no encontrado");
        return null;
      }
      return cart;
    } catch (error) {
      console.log("Error al leer el carrito", error);
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const cart = this.carts.find((c) => c.id === cartId);
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
      return cart;
    } catch (error) {
      console.log("Error al agregar el producto al carrito", error);
    }
  }
}

export default CartManager;
