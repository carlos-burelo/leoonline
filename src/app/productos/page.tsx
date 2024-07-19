import ProductList from "@/components/product-list";
import Sidebar from "@/components/sidebar";
import { db } from "@/lib/db";
import { Metadata } from "next";
import _ from "./productos.module.css";

export const metadata: Metadata = {
    title: "Productos",
};


export default async function Page() {
    const products = await db.obtenerProductos()
    return (
        <div className={_.container}>
            <Sidebar />
            <section className={_.body}>
                <ProductList products={products} />
            </section>
        </div>
    )
}