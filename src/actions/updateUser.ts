'use server';
'use server';

import { db } from "@/lib/db";
import { Usuario } from "@/types";

export async function updateUser(prevState: any, data: FormData) {

    const nombre = data.get('nombre');
    const apellido_paterno = data.get('apellido_paterno');
    const apellido_materno = data.get('apellido_materno');
    const telefono = data.get('telefono');
    const correo = data.get('correo');
    const id = data.get('id');

    if (nombre === '' || apellido_paterno === '' || apellido_materno === '' || telefono === '' || correo === '' || id === '') {
        return {
            message: 'Todos los campos son obligatorios',
        }
    }

    const userData: Partial<Usuario> = {
        id: parseInt(id!.toString()),
        nombre: nombre!.toString(),
        apellido_paterno: apellido_paterno!.toString(),
        apellido_materno: apellido_materno!.toString(),
        telefono: telefono!.toString(),
        correo: correo!.toString(),
        rol: 'cliente',
    }

    await db.actualizarUsuario(userData);




    return {
        message: 'Usuario actualizado',
        data: JSON.stringify(userData)
    }
}