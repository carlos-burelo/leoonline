import { updateUser } from "@/actions/updateUser";
import Sidebar from "@/components/sidebar";
import { Metadata } from "next";
import _ from "./perfil.module.css";
import ProfileForm from "@/components/profile-form";

export const metadata: Metadata = {
    title: "Perfil",
};

export default function Page() {
    return (
        <div className={_.container}>
            <Sidebar />
            <ProfileForm />
        </div>
    )
}