'use client';
import _ from './product-list.module.css'
import { Producto } from '@/types'
import { Link } from 'next-view-transitions'
import { useEffect, useState } from 'react'

interface Props {
    products: Producto[]
}

export default function ProductList({ products }: Props) {

    const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
    const [tipo, setTipo] = useState<string>('Comidas');

    useEffect(() => {
        setProductosFiltrados(products.filter(producto => producto.tipo === tipo));
    }, [tipo, products]);

    return (
        <>
            <header className={_.head}>
                <button onClick={() => setTipo('Comidas')}>Comidas</button>
                <button onClick={() => setTipo('Postres')}>Postres</button>
            </header>
            <div className={_.productos}>
                {productosFiltrados.map((product) => (
                    <Link key={product.id} href={`/productos/${product.id}`} className={_.producto}>
                        <img src={product.imagen} alt={product.nombre} />
                        <h2>{product.nombre}</h2>
                        <p>${product.precio}</p>
                    </Link>
                ))}
            </div>
        </>
    )
}