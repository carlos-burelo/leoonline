'use server'

import { db } from "@/lib/db"

export default async function deleteProduct(id: number) {
    try {
        await db.eliminarProducto(id);
        return {
            message: 'Producto eliminado'
        }
    } catch (error) {
        return {
            message: 'Error al eliminar el producto'
        }
    }
}