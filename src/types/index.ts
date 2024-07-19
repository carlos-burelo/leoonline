// Tipos para las tablas

export type Rol = 'administrador' | 'cliente';
export type Tipo = 'Comidas' | 'Postres';

export interface Usuario {
    id?: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    correo: string;
    contrasena: string;
    telefono: string;
    rol: Rol;
}

export interface Direccion {
    id?: number;
    calle: string;
    numero_exterior: string;
    numero_interior: string;
    colonia: string;
    municipio: string;
    estado: string;
    codigo_postal: string;
    usuario_id: number;
}

export interface Producto {
    id?: number;
    nombre: string;
    imagen: string;
    tipo: Tipo;
    precio: number;
    cantidad: number;
}

export interface Compra {
    id?: number;
    fecha: Date;
    tarjeta: string;
    total: number;
    usuario_id: number;
}

export interface DetalleCompra {
    id?: number;
    cantidad: number;
    precio: number;
    producto_id: number;
    compra_id: number;
}
export interface ProductoEnCarrito extends Producto {
    cantidad: number;
}

export interface CompraUnificada {
    compra_id: number
    fecha: Date
    total: number
    tarjeta: string
    usuario_nombre: string
    usuario_apellido_paterno: string
    usuario_apellido_materno: string
    cantidad: number
    precio_unitario: number
    producto_nombre: number
    producto_tipo: Tipo
}
// export interface Product {
//     nombre: string;
//     imagen: string;
//     tipo: 'Comidas' | 'Postres';
//     id: number;
//     precio: number;
// }


// export interface Usuario {
//     nombre: string;
//     apellido_paterno: string;
//     apellido_materno: string;
//     direccion: string;
//     telefono: string;
//     correo: string;
//     contrasena: string;
//     rol: 'administrador' | 'cliente';
// }

// export interface CartItem extends Product {
//     cantidad: number;
// }