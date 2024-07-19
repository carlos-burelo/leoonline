import UserForm from "@/components/user-form";
import { Metadata } from "next";
import _ from "./registrarse.module.css";

export const metadata: Metadata = {
    title: "Registrarse",
};


export default function Page() {

    return (
        <div className={_.container}>
            <UserForm />
        </div>
    )
}