import CheckoutForm from "@/components/checkout-form/índex";
import { Metadata } from "next";
import _ from './pagar.module.css';

export const metadata: Metadata = {
    title: "Pagar",
};

export default function Page() {
    return (
        <div className={_.container}>
            <CheckoutForm />
        </div>
    )
}