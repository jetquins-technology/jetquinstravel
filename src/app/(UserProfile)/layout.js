import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import "./_css/style.css";
import "./_css/inline.css";
import "./_css/jquery-ui.css";
import "./_css/bootstrap-min.css";
// import "./_css/payment-style.css";
import ClientLayout from "./ClientLayout";

//changed code

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Cheap Flights, Compare Flights & Airline Deals - Jetquin Travelss.com",
    description: "Find the cheapest flight tickets with Jetquin Travelss ! Compare prices effortlessly and book the best deals on flights through our advanced algorithm. Start saving on your next trip today",
    icons: {
        icon: '/favicon.ico'
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>

                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
                />
                <link
                    href="/assets/us/profile/profile/css/payment-style.css"
                    rel="stylesheet"
                />

            </head>
            <body className={"profilemgt"}>
                <ToastContainer />
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
