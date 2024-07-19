'use server';

import { db } from "@/lib/db";

export async function login(prevState: any, data: FormData) {

    const correo = data.get('correo');
    const contrasena = data.get('contrasena');

    if (correo === '' || contrasena == '') {
        return {
            message: 'Todos los campos son obligatorios',
        }
    }

    if (await db.correoDeUsuarioExiste(correo!.toString())) {

    } else {
        return {
            message: 'El usuario no existe',
        }
    }
    const usuario = await db.verificarUsuario(correo!.toString(), contrasena!.toString());

    if (!usuario) {
        return {
            message: 'Usuario o contraseña incorrectos',
        }
    }

    return {
        message: 'Usuario registrado',
        data: JSON.stringify({ ...usuario })
    }
}