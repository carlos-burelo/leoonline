'use client'
import { Cart } from "@/lib/local-storage";
import _ from "./add-to-cart.module.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Producto } from "@/types";

type Props = {
    producto: Producto;
}

export default function AddToCart({ producto }: Props) {


    const addToCart = async (e: any) => {
        try {
            const cantidad = parseInt(e.target.previousElementSibling.value);
            console.log(cantidad, producto);
            Cart.addToCart(producto, cantidad);
            toast.success("Producto añadido al carrito");
        } catch (error) {
            console.log(error);
            toast.error(e.message);
        }
    };


    return (
        <>
            <input
                className={_.input}
                type="number"
                placeholder="Cantidad"
                defaultValue={1}
                name="cantidad"
            />
            <button onClick={addToCart}>Añadir al carrito</button>
            <ToastContainer />
        </>
    );
}