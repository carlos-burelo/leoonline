import { Metadata } from "next";
import _ from "./iniciar-sesion.module.css";
import UserRegister from "@/components/user-register";

export const metadata: Metadata = {
    title: "Iniciar sesión",
};


export default function Page() {
    return (
        <div className={_.container}>
            <UserRegister />
        </div>
    )
}