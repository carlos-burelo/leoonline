'use client'
import { useEffect, useState } from 'react';
import _ from './edit-product.module.css'
import { Producto, Tipo } from '@/types';
import { useFormState } from 'react-dom';
import editProducto from '@/actions/editProduct';
import { useRouter } from 'next/navigation';

interface EditProductProps {
    producto: Producto
}

const initialState = {
    message: '',
}

export default function EditProduct({ producto }: EditProductProps) {

    const [open, setOpen] = useState(false);
    const router = useRouter();
    const options: Tipo[] = ['Comidas', 'Postres'];

    const [state, formState] = useFormState(editProducto, initialState)

    useEffect(() => {
        if (state?.message === 'Producto actualizado') {
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
            <button onClick={() => setOpen(true)}>Editar</button>
            <dialog open={open} className={_.dialog}>
                <header className={_.header}>
                    <h2>Editar Producto</h2>
                    <button onClick={() => setOpen(false)}>Cerrar</button>
                </header>
                <form className={_.form} action={formState}>
                    <input type="hidden" name='id' value={producto.id} />
                    <label>Nombre</label>
                    <input type="text" name='nombre' defaultValue={producto.nombre} />
                    <label>Imagen</label>
                    <input type="text" name='imagen' defaultValue={producto.imagen} />
                    <section className={_.row}>
                        <div>
                            <label>Precio</label>
                            <input type="number" name='precio' defaultValue={producto.precio} min={1} minLength={1} />

                        </div>
                        <div>
                            <label>Stock</label>
                            <input type="number" name='cantidad' defaultValue={producto.cantidad} min={1} minLength={1} />
                        </div>
                        <div>
                            <label>Tipo {producto.tipo}</label>
                            <select name='tipo' defaultValue={producto.tipo}>
                                {
                                    options.map(option => (
                                        <option key={option} value={option} selected={option === producto.tipo}>{option}</option>
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