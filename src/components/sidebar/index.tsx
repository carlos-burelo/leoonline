'use client';
import { User } from '@/lib/local-storage';
import { Link } from 'next-view-transitions';
import { usePathname } from "next/navigation";
import { useEffect, useState } from 'react';
import _ from "./sidebar.module.css";

export default function Sidebar() {
    const pathname = usePathname();

    const is = (path: string) => pathname == path ? _.active : '';
    const [showProfile, setShowProfile] = useState(false);
    const [showAdminTools, setShowAdminTools] = useState(false);

    useEffect(() => {
        const user = User.getUser();
        if (user) {
            console.log('user', user);
            setShowProfile(true);
            if (user.rol == 'administrador') {
                setShowAdminTools(true);
            }
        }
    }, []);


    return (
        <aside className={_.side}>
            <img src="/logo.webp" alt="Logo leoonline" />
            <Link className={`${_.link} ${is('/')}`} href="/">🏠 Inicio</Link>
            <Link className={`${_.link} ${is('/nosotros')}`} href="/nosotros">💁 Conocenos</Link>
            <Link className={`${_.link} ${is('/productos')}`} href="/productos">🍔 Productos</Link>
            <Link className={`${_.link} ${is('/carrito')}`} href="/carrito">🛒 Carrito</Link>
            {
                showProfile && <Link className={`${_.link} ${is('/perfil')}`} href="/perfil">👤 Perfil</Link>
            }
            {
                showAdminTools && (
                    <>
                        <Link className={`${_.link} ${is('/gestion')}`} href="/gestion"> 🛠️ Gestion</Link>
                        <Link className={`${_.link} ${is('/historial')}`} href="/historial"> 📈 Historial</Link>
                    </>
                )
            }
        </aside>
    );
}
