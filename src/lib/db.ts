// // import { pool as mysqlPool } from '@/lib/mysql';
// import { Compra, DetalleCompra, Direccion, Producto, Usuario, Tipo, CompraUnificada } from "@/types";
// // import { RowDataPacket } from 'mysql2/promise';
// import { createPool, RowDataPacket, ResultSetHeader } from "mysql2/promise";

// // export class db_fake {
// //     private static PRODUCTS: Producto[] = [
// //         {
// //             id: 1,
// //             precio: 50.00,
// //             nombre: 'Leonesa BBQ',
// //             imagen: '/Leonesa.png',
// //             tipo: 'Comidas',
// //             cantidad: 100
// //         },
// //         {
// //             id: 2,
// //             precio: 45.00,
// //             nombre: 'Pibi Pollo',
// //             imagen: '/pibi.png',
// //             tipo: 'Comidas',
// //             cantidad: 100
// //         },
// //         {
// //             id: 3,
// //             precio: 40.00,
// //             nombre: 'Hamburguesas',
// //             imagen: '/Hamburguesa.png',
// //             tipo: 'Comidas',
// //             cantidad: 100
// //         },
// //         {
// //             id: 4,
// //             precio: 35.00,
// //             nombre: 'Caldo',
// //             imagen: '/Caldo.png',
// //             tipo: 'Comidas',
// //             cantidad: 100
// //         },
// //         {
// //             id: 5,
// //             precio: 36.00,
// //             nombre: 'Platanos rellenos',
// //             imagen: '/platano.png',
// //             tipo: 'Comidas',
// //             cantidad: 100
// //         },
// //         {
// //             id: 6,
// //             precio: 30.00,
// //             nombre: 'Chocoburguer',
// //             imagen: '/choco.png',
// //             tipo: 'Comidas',
// //             cantidad: 100
// //         },
// //         {
// //             id: 7,
// //             precio: 50.00,
// //             nombre: 'Tacos',
// //             imagen: '/tacos.png',
// //             tipo: 'Comidas',
// //             cantidad: 100
// //         },
// //         {
// //             id: 8,
// //             precio: 15.00,
// //             nombre: 'Refresco',
// //             imagen: '/refresco.png',
// //             tipo: 'Comidas',
// //             cantidad: 100
// //         },
// //         // postres
// //         {
// //             id: 9,
// //             precio: 20.00,
// //             nombre: 'Pan de muerto',
// //             imagen: '/pan.png',
// //             tipo: 'Postres',
// //             cantidad: 100
// //         },
// //         {
// //             id: 10,
// //             precio: 25.00,
// //             nombre: 'Pastel de queso',
// //             imagen: '/pastel.png',
// //             tipo: 'Postres',
// //             cantidad: 100
// //         },
// //         {
// //             id: 11,
// //             precio: 30.00,
// //             nombre: 'Flan napolitano',
// //             imagen: '/flan.png',
// //             tipo: 'Postres',
// //             cantidad: 100
// //         },
// //         {
// //             id: 12,
// //             precio: 35.00,
// //             nombre: 'Souffle de elote',
// //             imagen: '/souffle.png',
// //             tipo: 'Postres',
// //             cantidad: 100
// //         },
// //         {
// //             id: 13,
// //             precio: 40.00,
// //             nombre: 'Gelatinas sayes',
// //             imagen: '/gelatinaS.png',
// //             tipo: 'Postres',
// //             cantidad: 100
// //         },
// //         {
// //             id: 14,
// //             precio: 45.00,
// //             nombre: 'Pastel',
// //             imagen: '/pastelL.png',
// //             tipo: 'Postres',
// //             cantidad: 100
// //         },
// //         {
// //             id: 15,
// //             precio: 50.00,
// //             nombre: 'Gelatinas mosaico',
// //             imagen: '/gelatinaM.png',
// //             tipo: 'Postres',
// //             cantidad: 100
// //         },
// //         {
// //             id: 16,
// //             precio: 55.00,
// //             nombre: 'Gelatinas',
// //             imagen: '/gelatina.png',
// //             tipo: 'Postres',
// //             cantidad: 100
// //         }
// //     ]

// //     static async getProducts(): Promise<Producto[]> {
// //         return this.PRODUCTS;
// //     }

// //     static async getProductById(id: number): Promise<Producto | undefined> {
// //         return this.PRODUCTS.find(product => product.id === id);
// //     }

// //     static async getProductsByType(type: string): Promise<Producto[]> {
// //         return this.PRODUCTS.filter(product => product.tipo === type);
// //     }
// // }


// interface DBConfig {
//     DB_HOST: string;
//     DB_USER: string;
//     DB_PORT: number;
//     DB_PASS: string;
//     DB_NAME: string;
// }

// var DB: DBConfig = {} as DBConfig;

// if (process.env.NODE_ENV === 'production') {
//     DB = {
//         DB_HOST: process.env.DB_HOST ?? 'localhost',
//         DB_USER: process.env.DB_USER ?? 'root',
//         DB_PASS: process.env.DB_PASS ?? 'root',
//         DB_NAME: process.env.DB_NAME ?? 'leoonline',
//         DB_PORT: parseInt(process.env.DB_PORT ?? '3306')
//     }
// } else {
//     DB = {
//         DB_HOST: 'localhost',
//         DB_USER: 'root',
//         DB_PASS: 'root',
//         DB_NAME: 'leoonline',
//         DB_PORT: 3306
//     }
// }

// export class db {
//     private static instance: db;
//     private pool = createPool({
//         host: DB.DB_HOST,
//         user: DB.DB_USER,
//         password: DB.DB_PASS,
//         database: DB.DB_NAME,
//         port: DB.DB_PORT,
//         connectionLimit: 10,
//     });

//     public static connect(): db {
//         if (!db.instance) {
//             db.instance = new db();
//         }
//         console.log('Connected to database');
//         console.log(DB);
//         return db.instance;
//     }

//     // Usuarios

//     public static async correoDeUsuarioExiste(correo: string): Promise<boolean> {
//         const QUERY = 'SELECT COUNT(*) as count FROM usuario WHERE correo = ?';
//         const [rows] = await db.connect().pool.query<RowDataPacket[]>(QUERY, correo);
//         return (rows[0] as any).count > 0;
//     }

//     public static async verificarUsuario(correo: string, contrasena: string): Promise<Usuario | undefined> {
//         const QUERY = 'SELECT * FROM usuario WHERE correo = ? AND contrasena = ?';
//         const [rows] = await db.connect().pool.query<RowDataPacket[]>(QUERY, [correo, contrasena]);
//         return rows[0] as Usuario;
//     }

//     public static async insertarUsuario(usuario: Usuario): Promise<number> {
//         const QUERY = 'INSERT INTO usuario SET ?';
//         const [result] = await db.connect().pool.query<ResultSetHeader>(QUERY, usuario);
//         return result.insertId;
//     }

//     public static async actualizarUsuario(usuario: Partial<Usuario>): Promise<void> {
//         // sera un actualizado tipo patch, si no se envia un campo ó se va como string vacio no se actualizara, se comprobara con IFNULL Y COALESCE
//         const QUERY = `
//             UPDATE usuario SET 
//             nombre = IFNULL(?, nombre),
//             apellido_paterno = IFNULL(?, apellido_paterno),
//             apellido_materno = IFNULL(?, apellido_materno),
//             telefono = IFNULL(?, telefono),
//             correo = IFNULL(?, correo)
//             WHERE id = ?;
//         `;
//         await db.connect().pool.query<RowDataPacket[]>(QUERY, [usuario.nombre, usuario.apellido_paterno, usuario.apellido_materno, usuario.telefono, usuario.correo, usuario.id]);
//     }

//     public static async insertarDireccion(direccion: Direccion): Promise<void> {
//         const QUERY = 'INSERT INTO direccion SET ?';
//         await db.connect().pool.query<RowDataPacket[]>(QUERY, direccion);
//     }

//     public static async obtenerProductoPorID(id: number): Promise<Producto | undefined> {
//         const QUERY = 'SELECT * FROM producto WHERE id = ?';
//         const [rows] = await db.connect().pool.query<RowDataPacket[]>(QUERY, id);
//         return rows[0] as Producto;
//     }

//     public static async obtenerProductos(): Promise<Producto[]> {
//         const QUERY = 'SELECT * FROM producto';
//         const [rows] = await db.connect().pool.query<RowDataPacket[]>(QUERY);
//         return rows as Producto[];
//     }

//     public static async obtenerProductosPorTipo(type: Tipo): Promise<Producto[]> {
//         const QUERY = 'SELECT * FROM producto WHERE tipo = ?';
//         const [rows] = await db.connect().pool.query<RowDataPacket[]>(QUERY, type);
//         return rows as Producto[];
//     }

//     public static async insertarProducto(producto: Producto): Promise<void> {
//         const QUERY = `INSERT INTO producto SET ?`;
//         await db.connect().pool.query<RowDataPacket[]>(QUERY, producto);
//     }

//     public static async actualizarProducto(producto: Producto): Promise<void> {
//         const QUERY = `
//             UPDATE producto SET 
//             nombre = IFNULL(?, nombre),
//             precio = IFNULL(?, precio),
//             cantidad = IFNULL(?, cantidad),
//             tipo = IFNULL(?, tipo),
//             imagen = IFNULL(?, imagen)
//             WHERE id = ?;
//         `;
//         await db.connect().pool.query<RowDataPacket[]>(QUERY, [producto.nombre, producto.precio, producto.cantidad, producto.tipo, producto.imagen, producto.id]);
//     }

//     public static async eliminarProducto(id: number): Promise<void> {
//         const QUERY = `DELETE FROM producto WHERE id = ?`;
//         await db.connect().pool.query<RowDataPacket[]>(QUERY, id);
//     }

//     // Compras
//     public static async obtenerComprasPorFecha(date: string): Promise<Compra[]> {
//         const QUERY = `SELECT * FROM compra ORDER BY fecha DESC;
//     `;
//         const [rows] = await db.connect().pool.query<RowDataPacket[]>(QUERY, date);
//         return rows as Compra[];
//     }

//     public static async insertarCompra(compra: Compra): Promise<number> {
//         const QUERY = `INSERT INTO compra (fecha, total, tarjeta, usuario_id) VALUES (?, ?, ?, ?);`
//         const [result] = await db.connect().pool.query<ResultSetHeader>(QUERY, [compra.fecha, compra.total, compra.tarjeta, compra.usuario_id]);
//         return result.insertId;
//     }

//     public static async insertarDetallesDeLaCompra(detalleCompra: DetalleCompra): Promise<void> {
//         const QUERY = `
//         INSERT INTO detalle_compra (cantidad, precio, producto_id, compra_id)
//         VALUES (?, ?, ?, ?);
//         `;
//         await db.connect().pool.query<RowDataPacket[]>(QUERY, [detalleCompra.cantidad, detalleCompra.precio, detalleCompra.producto_id, detalleCompra.compra_id]);
//     }
// }

import { createPool, RowDataPacket, ResultSetHeader, Pool } from 'mysql2/promise';
import { Compra, DetalleCompra, Direccion, Producto, Usuario, Tipo } from "@/types";

// Configuración de la base de datos
interface DBConfig {
    DB_HOST: string;
    DB_USER: string;
    DB_PORT: number;
    DB_PASS: string;
    DB_NAME: string;
}

const DB: DBConfig = {
    DB_HOST: process.env.DB_HOST ?? 'localhost',
    DB_USER: process.env.DB_USER ?? 'root',
    DB_PASS: process.env.DB_PASS ?? 'root',
    DB_NAME: process.env.DB_NAME ?? 'leoonline',
    DB_PORT: parseInt(process.env.DB_PORT ?? '3306')
};

let pool: Pool | null = null;

async function getPool(): Promise<Pool> {
    if (!pool) {
        pool = createPool({
            host: DB.DB_HOST,
            user: DB.DB_USER,
            password: DB.DB_PASS,
            database: DB.DB_NAME,
            port: DB.DB_PORT,
            connectionLimit: 1, // Establece el límite de conexión a 1 para asegurar una sola conexión
        });
    }
    return pool;
}



export class db {

    private static async getConnection(): Promise<Pool> {
        return await getPool();
    }
    // Usuarios

    public static async correoDeUsuarioExiste(correo: string): Promise<boolean> {
        const pool = await db.getConnection();
        const QUERY = 'SELECT COUNT(*) as count FROM usuario WHERE correo = ?';
        const [rows] = await pool.query<RowDataPacket[]>(QUERY, correo);
        return (rows[0] as any).count > 0;
    }

    public static async verificarUsuario(correo: string, contrasena: string): Promise<Usuario | undefined> {
        const pool = await db.getConnection();
        const QUERY = 'SELECT * FROM usuario WHERE correo = ? AND contrasena = ?';
        const [rows] = await pool.query<RowDataPacket[]>(QUERY, [correo, contrasena]);
        return rows[0] as Usuario;
    }

    public static async insertarUsuario(usuario: Usuario): Promise<number> {
        const pool = await db.getConnection();
        const QUERY = 'INSERT INTO usuario SET ?';
        const [result] = await pool.query<ResultSetHeader>(QUERY, usuario);
        return result.insertId;
    }

    public static async actualizarUsuario(usuario: Partial<Usuario>): Promise<void> {
        const pool = await db.getConnection();
        const QUERY = `
            UPDATE usuario SET 
            nombre = IFNULL(?, nombre),
            apellido_paterno = IFNULL(?, apellido_paterno),
            apellido_materno = IFNULL(?, apellido_materno),
            telefono = IFNULL(?, telefono),
            correo = IFNULL(?, correo)
            WHERE id = ?;
        `;
        await pool.query<RowDataPacket[]>(QUERY, [usuario.nombre, usuario.apellido_paterno, usuario.apellido_materno, usuario.telefono, usuario.correo, usuario.id]);
    }

    public static async insertarDireccion(direccion: Direccion): Promise<void> {
        const pool = await db.getConnection();
        const QUERY = 'INSERT INTO direccion SET ?';
        await pool.query<RowDataPacket[]>(QUERY, direccion);
    }

    public static async obtenerProductoPorID(id: number): Promise<Producto | undefined> {
        const pool = await db.getConnection();
        const QUERY = 'SELECT * FROM producto WHERE id = ?';
        const [rows] = await pool.query<RowDataPacket[]>(QUERY, id);
        return rows[0] as Producto;
    }

    public static async obtenerProductos(): Promise<Producto[]> {
        const pool = await db.getConnection();
        const QUERY = 'SELECT * FROM producto';
        const [rows] = await pool.query<RowDataPacket[]>(QUERY);
        return rows as Producto[];
    }

    public static async obtenerProductosPorTipo(type: Tipo): Promise<Producto[]> {
        const pool = await db.getConnection();
        const QUERY = 'SELECT * FROM producto WHERE tipo = ?';
        const [rows] = await pool.query<RowDataPacket[]>(QUERY, type);
        return rows as Producto[];
    }

    public static async insertarProducto(producto: Producto): Promise<void> {
        const pool = await db.getConnection();
        const QUERY = `INSERT INTO producto SET ?`;
        await pool.query<RowDataPacket[]>(QUERY, producto);
    }

    public static async actualizarProducto(producto: Producto): Promise<void> {
        const pool = await db.getConnection();
        const QUERY = `
            UPDATE producto SET 
            nombre = IFNULL(?, nombre),
            precio = IFNULL(?, precio),
            cantidad = IFNULL(?, cantidad),
            tipo = IFNULL(?, tipo),
            imagen = IFNULL(?, imagen)
            WHERE id = ?;
        `;
        await pool.query<RowDataPacket[]>(QUERY, [producto.nombre, producto.precio, producto.cantidad, producto.tipo, producto.imagen, producto.id]);
    }

    public static async eliminarProducto(id: number): Promise<void> {
        const pool = await db.getConnection();
        const QUERY = `DELETE FROM producto WHERE id = ?`;
        await pool.query<RowDataPacket[]>(QUERY, id);
    }

    // Compras
    public static async obtenerComprasPorFecha(date: string): Promise<Compra[]> {
        const pool = await db.getConnection();
        const QUERY = `SELECT * FROM compra ORDER BY fecha DESC`;
        const [rows] = await pool.query<RowDataPacket[]>(QUERY, date);
        return rows as Compra[];
    }

    public static async insertarCompra(compra: Compra): Promise<number> {
        const pool = await db.getConnection();
        const QUERY = `INSERT INTO compra (fecha, total, tarjeta, usuario_id) VALUES (?, ?, ?, ?);`
        const [result] = await pool.query<ResultSetHeader>(QUERY, [compra.fecha, compra.total, compra.tarjeta, compra.usuario_id]);
        return result.insertId;
    }

    public static async insertarDetallesDeLaCompra(detalleCompra: DetalleCompra): Promise<void> {
        const pool = await db.getConnection();
        const QUERY = `
        INSERT INTO detalle_compra (cantidad, precio, producto_id, compra_id)
        VALUES (?, ?, ?, ?);
        `;
        await pool.query<RowDataPacket[]>(QUERY, [detalleCompra.cantidad, detalleCompra.precio, detalleCompra.producto_id, detalleCompra.compra_id]);
    }
}
