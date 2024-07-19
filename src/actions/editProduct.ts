'use server'

import { db } from "@/lib/db"
import { Producto, Tipo } from "@/types";

export default async function editProducto(_: any, data: FormData) {
    try {
        const id = data.get('id') as string;
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
            id: parseInt(id),
            nombre,
            precio: parseFloat(precio),
            cantidad: parseInt(cantidad),
            tipo,
            imagen
        }

        await db.actualizarProducto(producto);
        return {
            message: 'Producto actualizado'
        }

    } catch (error) {
        console.log(error)
        return {
            message: 'Error al eliminar el producto'
        }
    }
}