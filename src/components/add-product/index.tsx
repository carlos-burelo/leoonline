'use client'
import addProduct from '@/actions/addProduct';
import { Tipo } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import _ from './add-product.module.css';


const initialState = {
    message: '',
}

export default function AddProduct() {

    const [open, setOpen] = useState(false);
    const options: Tipo[] = ['Comidas', 'Postres'];

    const router = useRouter();

    const [state, formState] = useFormState(addProduct, initialState)

    useEffect(() => {
        if (state?.message === 'Producto agregado') {
            setOpen(false);
            router.refresh();
        } else if (state?.message == "") {
            return
        } else {
            alert(state?.message);
        }
    }, [state, router])

    return (
        <>
            <button onClick={() => setOpen(true)}>Nuevo</button>
            <dialog open={open} className={_.dialog}>
                <header className={_.header}>
                    <h2>Nuevo Producto</h2>
                    <button onClick={() => setOpen(false)}>Cerrar</button>
                </header>
                <form className={_.form} action={formState}>
                    <label>Nombre</label>
                    <input type="text" name='nombre' />
                    <label>Imagen</label>
                    <input type="text" name='imagen' />
                    <section className={_.row}>
                        <div>
                            <label>Precio</label>
                            <input type="number" name='precio' />
                        </div>
                        <div>
                            <label>Stock</label>
                            <input type="number" name='cantidad' />
                        </div>
                        <div>
                            <label>Tipo</label>
                            <select name='tipo'>
                                {
                                    options.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </section>
                    <button>Guardar</button>
                </form>
            </dialog>
        </>
    )
}