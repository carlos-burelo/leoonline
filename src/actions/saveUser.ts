'use server';

import { db } from "@/lib/db";
import { Direccion, Usuario } from "@/types";

export async function saveUser(prevState: any, data: FormData) {

    const nombre = data.get('nombre');
    const apellido_paterno = data.get('apellido_paterno');
    const apellido_materno = data.get('apellido_materno');
    const telefono = data.get('telefono');
    const correo = data.get('correo');
    const contrasena = data.get('contrasena');
    const calle = data.get('calle');
    const numero_interior = data.get('numero_interior');
    const numero_exterior = data.get('numero_exterior');
    const colonia = data.get('colonia');
    const municipio = data.get('municipio');
    const estado = data.get('estado');
    const codigo_postal = data.get('codigo_postal');

    if (nombre === '' || apellido_paterno === '' || apellido_materno === '' || telefono === '' || correo === '' || contrasena == '' || calle === '' || numero_interior === '' || numero_exterior === '' || colonia === '' || municipio === '' || estado === '' || codigo_postal === '') {
        return {
            message: 'Todos los campos son obligatorios',
        }
    }

    if (await db.correoDeUsuarioExiste(correo!.toString())) {
        return {
            message: 'El correo ya está registrado',
        }
    }

    const userData: Usuario = {
        nombre: nombre!.toString(),
        apellido_paterno: apellido_paterno!.toString(),
        apellido_materno: apellido_materno!.toString(),
        telefono: telefono!.toString(),
        correo: correo!.toString(),
        contrasena: contrasena!.toString(),
        rol: 'cliente',
    }

    const idUsuario = await db.insertarUsuario(userData);

    const direccionData: Direccion = {
        usuario_id: idUsuario,
        calle: calle!.toString(),
        numero_interior: numero_interior!.toString(),
        numero_exterior: numero_exterior!.toString(),
        colonia: colonia!.toString(),
        municipio: municipio!.toString(),
        estado: estado!.toString(),
        codigo_postal: codigo_postal!.toString(),
    }

    db.insertarDireccion(direccionData);

    return {
        message: 'Usuario registrado',
        data: JSON.stringify({ ...userData, id: idUsuario, contrasena: null })
    }
}