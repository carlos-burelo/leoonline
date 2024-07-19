import Navbar from "@/components/navbar";
import '@/theme/globals.css';
import { ViewTransitions } from 'next-view-transitions';

type LayoutProps = {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <ViewTransitions>
            <html lang="es">
                <body>
                    <Navbar />
                    {children}
                </body>
            </html>
        </ViewTransitions>
    )
}