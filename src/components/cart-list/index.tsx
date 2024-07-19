'use client'
import _ from "./cart-list.module.css";
import { useState, useEffect } from "react";
import { Cart } from "@/lib/local-storage";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { ProductoEnCarrito } from "@/types";

export default function CartList() {
    const [cart, setCart] = useState<ProductoEnCarrito[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (window.localStorage && !window.localStorage.getItem('cart')) {
            console.log('No hay carrito en local storage');
            setCart(Cart.getCart());
        } else {
            console.log('Hay carrito en local storage');
            setCart(Cart.getCart());
        }
    }, []);

    const removeFromCart = (id: number) => {
        Cart.removeFromCart(id);
        setCart(Cart.getCart());
        toast.error("Producto eliminado del carrito");
    };

    const updateCart = (id: number, quantity: number) => {
        if (quantity > 0) {
            Cart.updateCart(id, quantity);
            setCart(Cart.getCart());
        } else {
            removeFromCart(id);
        }
    }

    const clearCart = () => {
        Cart.clearCart();
        setCart(Cart.getCart());
    }

    const buy = () => {
        if (cart.length === 0) {
            toast.error("El carrito está vacío");
        } else {
            setCart(Cart.getCart());
            //toast.success("Compra realizada con éxito");
            router.push('/pagar');
        }
    }

    return (
        <div className={_.container}>
            <header className={_.header}>
                <div className={_.info}>
                    <h1>Carrito de compras</h1>
                    <h2>Productos en el carrito: {cart.length}</h2>
                </div>
                <div>
                    <h2>Total: $ {cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0)} MXN</h2>
                    <button onClick={clearCart}>Vaciar carrito</button>
                    <button onClick={buy}>Comprar</button>
                </div>
            </header>

            <ul className={_.list}>
                {cart.map((item) => (
                    <li key={item.id} className={_.item}>
                        <div>
                            <img src={item.imagen} alt={`Imagen del producto ${item.nombre}`} className={_.image} />
                            <h2>{item.nombre}</h2>
                        </div>
                        <div>
                            <h4>Precio unitario:</h4>
                            <h2>$ {item.precio} MXN</h2>
                        </div>
                        <div>
                            <h4>Cantidad:</h4>
                            <input type="number" defaultValue={item.cantidad} onChange={(e) => updateCart(item.id!, parseInt(e.target.value))} />
                        </div>
                        <div>
                            <h4>Total:</h4>
                            <h3>$ {item.precio * item.cantidad} MXN</h3>
                            <button onClick={() => removeFromCart(item.id!)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
            <ToastContainer />
        </div>
    );

}