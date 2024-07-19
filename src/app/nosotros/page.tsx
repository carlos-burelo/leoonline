import Sidebar from "@/components/sidebar";
import { Metadata } from "next";
import _ from "./nosotros.module.css";

export const metadata: Metadata = {
    title: "Nosotros",
};

export default function Page() {
    return (
        <div className={_.container}>
            <Sidebar />
            <section className={_.section}>
                <header className={_.header}>
                    <img src="/Conocenos.jpeg" alt="" />
                    <h2>Conocenos</h2>
                    <img src="/Conocenos.jpeg" alt="" />
                </header>
                <p className={_.p}>
                    Grupo LEO es una empresa que ofrece productos/ servicios como
                    restaurante, pasteles, y carnes, teniendo como uno de sus
                    principales platillos las leonesas. <br /><b>Restaurantes LEO</b>
                    es una empresa que ha existido desde 1973 aproximadamente , tiene
                    un poco mas de 50 años de trayectoria, su sabor y originalidad son
                    dos elementos que la han llevado a ser una empresa de buen prestigio
                    en el estado de tabasco. cuenta con varias sucursales en la ciudad
                    de Villahermosa, una de las mas populares es: Av. paseo Tabasco #429,
                    Villahermosa
                </p>
                <img src="/Aniversario.png" alt="" />
            </section>
        </div>
    )
}