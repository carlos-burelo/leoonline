'use client'

import { useFormState } from 'react-dom'
import _ from './profie-form.module.css'
import { updateUser } from '@/actions/updateUser'
import { useEffect, useState } from 'react';
import { Usuario } from '@/types';
import { User } from '@/lib/local-storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';


interface ProfileFormProps {
    message: string;
    data: string;
}

const initialState: ProfileFormProps = {
    message: '',
    data: ''
}

export default function ProfileForm() {

    const router = useRouter()

    const [values, setValues] = useState<Partial<Usuario>>({
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        telefono: '',
        correo: '',
    })
    const [state, formAction] = useFormState(updateUser, initialState)

    useEffect(() => {
        const user = User.getUser()
        if (!user) {
            return
        }
        setValues(user)


        if (state?.message === 'Usuario actualizado') {
            User.setUser(JSON.parse(state.data!) as Usuario)
            toast.success(state.message)
            return
        }
    }, [state])


    const handleLogout = () => {
        User.logout()
        router.push('/iniciar-sesion')
    }

    return (
        <div className={_.content}>
            <button className='danger' onClick={handleLogout}>Cerrar sesión</button>
            <form className={_.form} action={formAction}>
                <section>
                    <button type="submit">Guardar</button>
                    <img src="/Usuario.png" alt="" />
                </section>
                <div className={_.labels}>
                    <input type="hidden" name="id" defaultValue={values.id} />
                    <label htmlFor="nombre">
                        <span>Nombre</span>
                        <input type="text" placeholder="Nombre" name="nombre" defaultValue={values.nombre} />
                    </label>
                    <label htmlFor="apellidoP">
                        <span>Apellido paterno</span>
                        <input type="text" placeholder="Apellido paterno" name="apellido_paterno" defaultValue={values.apellido_paterno} />
                    </label>
                    <label htmlFor="apellidoM">
                        <span>Apellido materno</span>
                        <input type="text" placeholder="Apellido materno" name="apellido_materno" defaultValue={values.apellido_materno} />
                    </label>
                    <label htmlFor="telefono">
                        <span>Telefono</span>
                        <input type="tel" placeholder="Telefono" name="telefono" defaultValue={values.telefono} />
                    </label>
                    <label htmlFor="email">
                        <span>Email</span>
                        <input type="email" placeholder="Correo" name="correo" defaultValue={values.correo} />
                    </label>
                </div>
                <ToastContainer />
            </form>

        </div>
    )
}