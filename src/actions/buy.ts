'use server'

import { db } from "@/lib/db"
import { Compra, ProductoEnCarrito } from "@/types"

export async function buy(_: any, data: FormData) {
    const total = data.get('importe') as string
    const tarjeta = data.get('tarjeta') as string
    const nombre = data.get('nombre') as string
    const cart = data.get('cart') as string
    const userId = data.get('usuario_id') as string

    if (total === '' || tarjeta === '' || nombre === '' || cart === '' || userId === '') {
        return { message: 'Faltan datos' }
    }

    if (isNaN(parseFloat(total))) {
        console.log('Importe inválido')
        return { message: 'Importe inválido' }
    }

    if (tarjeta.length !== 16) {
        console.log('Tarjeta inválida')
        return { message: 'Tarjeta inválida' }
    }

    const cartItems = JSON.parse(cart) as ProductoEnCarrito[]

    const compra: Compra = {
        total: parseFloat(total),
        tarjeta,
        fecha: new Date(),
        usuario_id: parseInt(userId),
    }

    console.log('Realizando compra...')
    console.log(compra)
    debugger

    const shopId = await db.insertarCompra(compra)


    await Promise.all(cartItems.map(async (item) => {
        await db.insertarDetallesDeLaCompra({
            cantidad: item.cantidad,
            producto_id: parseFloat(item.id?.toString() || '0'),
            compra_id: shopId,
            precio: item.precio,
        })
    }))
    console.log('Compra realizada')

    return { message: 'Compra realizada' }
}