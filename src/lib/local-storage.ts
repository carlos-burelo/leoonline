import { Producto, ProductoEnCarrito, Usuario } from "@/types";
//import { db } from "./db";


export class Cart {

    static getCart() {
        if (!localStorage.getItem("cart") || localStorage.getItem("cart") === "undefined") {
            localStorage.setItem("cart", "[]");
            return JSON.parse(localStorage.getItem("cart") || "[]") as ProductoEnCarrito[];
        } else {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]") as ProductoEnCarrito[];
            return cart;
        }
    }

    static setCart(cart: any) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    static getCartTotal() {
        return Cart.getCart().reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    }

    static addToCart(producto: Producto, quantity: number) {
        const cart = Cart.getCart();
        const index = cart.findIndex((item: any) => item.id === producto.id);
        if (index !== -1) {
            cart[index].cantidad += quantity;
        } else {
            cart.push({ ...producto, cantidad: quantity });
        }
        Cart.setCart(cart);
    }

    static removeFromCart(id: number) {
        const cart = Cart.getCart();
        const index = cart.findIndex((item: any) => item.id === id);
        if (index !== -1) {
            cart.splice(index, 1);
            Cart.setCart(cart);
        }
    }

    static updateCart(id: number, quantity: number) {
        const cart = Cart.getCart();
        const index = cart.findIndex((item: any) => item.id === id);
        if (index !== -1) {
            cart[index].cantidad = quantity;
            Cart.setCart(cart);
        }
    }

    static clearCart() {
        localStorage.removeItem("cart");
    }
}

export class User {

    static getUser() {
        const user = localStorage.getItem("user");
        if (!user) {
            return null;
        }
        return JSON.parse(user) as Usuario;
    }

    static setUser(user: Usuario) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    static clearUser() {
        localStorage.removeItem("user");
    }

    static isLoggedIn() {
        return !!localStorage.getItem("user");
    }

    static login(user: Usuario) {
        User.setUser(user);
    }

    static logout() {
        User.clearUser();
    }

    static update(user: Usuario) {
        User.setUser(user);
    }

}