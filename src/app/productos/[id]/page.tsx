import { db } from "@/lib/db";
import { Metadata } from "next";
import _ from "./[id].module.css";
import AddToCart from "@/components/add-to-cart";



export const metadata: Metadata = {
    title: "Producto",
};

type Props = {
    params: { id: string };
};

export default async function Page({ params }: Props) {
    const id = parseInt(params.id);
    const producto = await db.obtenerProductoPorID(id);



    return (
        <div className={_.container}>
            {producto ? (
                <>
                    <img src={producto.imagen} alt={`Imagen del producto ${producto.nombre}`} className={_.image} />
                    <h1>{producto.nombre}</h1>
                    <h2>$ {producto.precio} MXN</h2>

                    <section className={_.options}>
                        <a href="/productos" className="btn">Regresar al Menu</a>
                        <AddToCart producto={producto} />
                    </section>
                </>
            ) : (
                <h1>Producto no encontrado</h1>
            )}
        </div>
    )
}