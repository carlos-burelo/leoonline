import Sidebar from '@/components/sidebar';
import _ from './gestion.module.css';
import { db } from '@/lib/db';
import AddProduct from '@/components/add-product';
import EditProduct from '@/components/edit-product';
import DeleteProduct from '@/components/delete-product';


export default async function Gestion() {

    const productsos = await db.obtenerProductos();

    return (
        <div className={_.container}>
            <Sidebar />
            <div className={_.tableContainer}>
                <header className={_.header}>
                    <h1>Productos</h1>
                    <AddProduct />
                </header>
                <table className={_.table}>
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio ($)</th>
                            <th>Tipo</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productsos.map(producto => (
                                <tr key={producto.id}>
                                    <td>
                                        <img src={producto.imagen} alt={producto.nombre} className={_.img} />
                                    </td>
                                    <td>{producto.nombre}</td>
                                    <td>$ {producto.precio} MXN</td>
                                    <td>{producto.tipo}</td>
                                    <td>{producto.cantidad}</td>
                                    <td className={_.actions}>
                                        <EditProduct producto={producto} />
                                        <DeleteProduct id={producto.id!} />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}