'use client'

import { buy } from '@/actions/buy';
import { Cart, User } from '@/lib/local-storage';
import { ProductoEnCarrito, Usuario } from '@/types';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from './checkout-form.module.css';
import { useRouter } from 'next/navigation';


interface ProfileFormProps {
    message: string;
    data: string;
}

interface CheckoutFormProps {
    nombre: string;
    tarjeta: string;
    importe: number;
    id: number;
}


const initialState: ProfileFormProps = {
    message: '',
    data: ''
}

export default function CheckoutForm() {
    const [values, setValues] = useState<CheckoutFormProps>({ nombre: '', tarjeta: '', importe: 0, id: 0 })
    const [state, formAction] = useFormState(buy, initialState)
    const [cart, setCart] = useState<ProductoEnCarrito[]>([])
    const router = useRouter()

    useEffect(() => {
        if (state?.message == 'Compra realizada') {
            setValues({ nombre: '', tarjeta: '', importe: 0, id: 0 })
            Cart.clearCart()
            router.push('/carrito')
        } else if (state?.message != '') {
            alert(state?.message)
        }

        if (window.localStorage) {
            const user = User.getUser()
            const cart = Cart.getCart()
            const total = Cart.getCartTotal()
            setValues({
                nombre: user!.nombre,
                tarjeta: '',
                importe: total,
                id: user!.id!
            })
            setCart(cart)
        }
    }, [router, state?.message])

    return (
        <form className={_.form} action={formAction}>
            <h5>Datos de la operación</h5>
            <div className={_.labels}>
                <input type="text" hidden name='cart' readOnly value={JSON.stringify(cart)} />
                <input type="text" hidden name='usuario_id' readOnly value={values.id} />
                <label htmlFor="nombre">
                    <span>Nombre</span>
                    <input type="text" placeholder="Nombre" name="nombre" defaultValue={values.nombre} />
                </label>
                <label htmlFor="apellidoP">
                    <span>Tarjeta</span>
                    <input type="text" placeholder="Tarjeta" name="tarjeta" defaultValue={values.tarjeta} />
                </label>
                <label htmlFor="apellidoM">
                    <span>Importe $</span>
                    <input type="number" placeholder="Importe" name="importe" readOnly value={values.importe} />
                </label>
            </div>

            <section>
                <a className='btn' href="/carrito">Volver al carrito</a>
                <button type="submit">Pagar</button>
            </section>
            <ToastContainer />
        </form>
    )
}