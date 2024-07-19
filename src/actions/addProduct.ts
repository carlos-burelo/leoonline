'use server'

import { db } from "@/lib/db"
import { Producto, Tipo } from "@/types";

export default async function addProduct(_: any, data: FormData) {
    try {
        const nombre = data.get('nombre') as string;
        const precio = data.get('precio') as string;
        const cantidad = data.get('cantidad') as string;
        const tipo = data.get('tipo') as Tipo;
        const imagen = data.get('imagen') as string;

        if (!nombre || !precio || !cantidad || !tipo || !imagen) {
            return {
                message: 'Todos los campos son obligatorios'
            }
        }

        const producto: Producto = {
            nombre,
            precio: parseFloat(precio),
            cantidad: parseInt(cantidad),
            tipo,
            imagen
        }
        await db.insertarProducto(producto);
        return {
            message: 'Producto agregado'
        }

    } catch (error) {
        return {
            message: 'Error al eliminar el producto'
        }
    }
}