'use client'

import { saveUser } from '@/actions/saveUser';
import { User } from '@/lib/local-storage';
import { Usuario } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from './user-form.module.css';

interface UserFormProps {
    message: string;
    data: string;
}

const initialState: UserFormProps = {
    message: '',
    data: ''
}

export default function UserForm() {

    const [state, formAction] = useFormState(saveUser, initialState)
    const router = useRouter()

    useEffect(() => {
        if (state?.message === 'Usuario registrado') {
            User.setUser(JSON.parse(state.data!) as Usuario)
            router.push('/iniciar-sesion')
        } else {
            toast.error(state?.message)
        }
    }, [state, router])

    return (
        <form className={_.form} action={formAction}>
            <h5>REGISTRO</h5>
            <div className={_.info}>
                <div className={_.labels}>
                    <input type="text" placeholder="Nombre(s)" name="nombre" />
                    <input type="text" placeholder="Apellido paterno" name="apellido_paterno" />
                    <input type="text" placeholder="Apellido materno" name="apellido_materno" />
                    <input type="tel" placeholder="Telefono" name="telefono" />
                    <input type="email" placeholder="Correo" name="correo" />
                    <input type="password" placeholder="Contraseña" name="contrasena" />
                </div>
                <div className={_.labels}>
                    <input type="text" placeholder="Calle" name="calle" />
                    <input type="number" placeholder="Numero interior" name="numero_interior" />
                    <input type="number" placeholder="Numero exterior" name="numero_exterior" />
                    <input type="text" placeholder="Colonia" name="colonia" />
                    <input type="text" placeholder="Municipio" name="municipio" />
                    <input type="text" placeholder="Estado" name="estado" />
                    <input type="number" placeholder="Código postal" name="codigo_postal" />
                </div>
            </div>
            <button type="submit">Guardar</button>
            <ToastContainer />
        </form>
    )
}