'use client'

import { login } from '@/actions/login';
import { User } from '@/lib/local-storage';
import { Usuario } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from './user-register.module.css';

interface UserFormProps {
    message: string;
    data: string;
}

const initialState: UserFormProps = {
    message: '',
    data: ''
}

export default function UserRegister() {

    const [state, formAction] = useFormState(login, initialState)
    const router = useRouter()

    useEffect(() => {
        if (state?.message === '') {
        }
        if (state?.message === 'Usuario registrado') {
            User.setUser(JSON.parse(state.data!) as Usuario)
            router.push('/productos')
        } else {
            toast.error(state?.message)
        }
    }, [state, router])

    return (
        <form className={_.form} action={formAction}>
            <h5>INICIAR SESION</h5>
            <div className={_.info}>
                <div className={_.labels}>
                    <input type="email" placeholder="Correo" name="correo" />
                    <input type="password" placeholder="Contraseña" name="contrasena" />
                </div>
            </div>
            <button type="submit">Iniciar sesion</button>
            <ToastContainer />
        </form>
    )
}