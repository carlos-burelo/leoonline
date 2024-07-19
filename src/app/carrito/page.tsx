import { Metadata } from "next";
import _ from "./carrito.module.css";
import Sidebar from "@/components/sidebar";
import CartList from "@/components/cart-list";

export const metadata: Metadata = {
    title: "Carrito de compras",
};

export default function Page() {

    return (
        <div className={_.container}>
            <Sidebar />
            <CartList />
        </div>
    )
}