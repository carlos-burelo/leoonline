import { Link } from 'next-view-transitions'
import _ from "./navbar.module.css";

export default function Navbar() {
    return (
        <nav className={_.nav}>
            <Link className={_.link} href="/">Inicio</Link>
            <Link className={_.link} href="/productos">Productos</Link>
            <Link className={_.link} href="/iniciar-sesion">Inicio de sesión</Link>
            <Link className={_.link} href="/registrarse">Registro</Link>
        </nav>
    );
}
