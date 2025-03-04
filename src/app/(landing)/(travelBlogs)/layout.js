import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import "./_css/custom8a54.css";
import "./_css/bootstrap.min.css";
import "./_css/stylesheet8a54.css";
import Navbar from "@/app/_components/Navbar/page";
import Footer from "@/app/_components/Footer/page";

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
            </head>
            <body className={"profilemgt"}>
                <ToastContainer />
                <Navbar />
                <div id="content" style={{ backgroundColor: "#FAF7F2" }}>
                    <div className="hero-wrap py-2 py-md-3 py-lg-5">
                        <div className="hero-mask opacity-2 bg-dark" />
                        <div
                            className="hero-bg lazy"
                            style={{ backgroundImage: 'url("/assets/images/Slide-01.jpg")' }}
                        />
                        <div className="hero-content">
                            <div className="container">
                                <div className="p-2 row justify-content-center">
                                    <div className="text-center">
                                        <p
                                            style={{
                                                color: "#fff",
                                                fontWeight: 600,
                                                marginBottom: 4,
                                                fontSize: 32
                                            }}
                                        >
                                            Do not miss it!
                                        </p>
                                        <h2
                                            className="text-7 font-weight-800 text-uppercase mx-auto text-white"
                                        >
                                            Book Cheap Flight Tickets &amp; Compare Flight Prices
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Welcome Text============================================= */}
                    <section className="section bg-light">
                        <div className="container">
                            <div className="row">
                                {/*Children  */}
                                {children}
                            </div>
                        </div>
                    </section>
                    {/* Welcome Text end */}
                </div>
                <Footer />
            </body>
        </html>
    );
}
