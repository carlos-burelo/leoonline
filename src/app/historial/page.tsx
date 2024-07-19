import Sidebar from '@/components/sidebar';
import _ from './historial.module.css';
import { Compra, CompraUnificada, Tipo } from '@/types';
import { db } from '@/lib/db';


// compra_id: number
// fecha: Date
// total: number
// tarjeta: string
// usuario_nombre: string
// usuario_apellido_paterno: string
// usuario_apellido_materno: string
// cantidad: number
// precio_unitario: number
// importe: number
// producto_nombre: number
// producto_tipo: Tipo


export default async function Historial() {

    // example: 2024-05-26
    const fecha = new Date()
    const fechaString = fecha.toISOString().split('T')[0];
    const compras: Compra[] = await db.obtenerComprasPorFecha(fechaString);
    console.log(compras);

    return (
        <div className={_.container}>
            <Sidebar />
            <div className={_.historial}>
                <h1>Historial</h1>
                <table className={_.table}>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Usuario</th>
                            <th>Tarjeta</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {compras.map((compra, index) => (
                            <tr key={index}>
                                <td>{Intl.DateTimeFormat('es-MX').format(new Date(compra.fecha))}</td>
                                <td>{compra.usuario_id}</td>
                                <td>{compra.tarjeta}</td>
                                <td>{compra.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}