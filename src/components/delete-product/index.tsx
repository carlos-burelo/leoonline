'use client'
import deleteProduct from '@/actions/deleteProduct';
import _ from './delete-product.module.css'
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    id: number;
}

export default function DeleteProduct({ id }: Props) {
    const router = useRouter();
    const handleDelete = async () => {
        const response = confirm('¿Estás seguro de eliminar este producto?');
        if (response) {
            const { message } = await deleteProduct(id);
            if (message === 'Producto eliminado') {
                toast.success(message);
            } else {
                toast.error(message);
            }
            router.refresh();
        } else {
            console.log('Cancelar');
        }
    }


    return (
        <>
            <button onClick={handleDelete} className={_.delete}>Eliminar</button>
            <ToastContainer />
        </>
    )
}