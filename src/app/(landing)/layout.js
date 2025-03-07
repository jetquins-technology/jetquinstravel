import "../globals.css";
import Navbar from "../_components/Navbar/page";
import Footer from "../_components/Footer/page";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import { Inter } from "next/font/google";
// import app from "./_components/firebase/config"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cheap Flights, Compare Flights & Airline Deals - jetquinstravels.com",
  description: "Find the cheapest flight tickets with Jetquins Travelss ! Compare prices effortlessly and book the best deals on flights through our advanced algorithm. Start saving on your next trip today",
  icons: {
    icon: '/favicon.ico'
  }
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link href="/assets/stylesheet/css/style3eba.css?v=69.2.7006" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
        <link href="/assets/stylesheet/css/profile2048.css?v=1.5" rel="stylesheet" />
        <link href="/assets/stylesheet/css/profile.css?v=1.5" rel="stylesheet" />
        <link href="/assets/country-flags/countryflags3eba.css?v=69.2.7006" rel="stylesheet" />
        <link href="/assets/stylesheet/css/style.css?v=69.2.7006" rel="stylesheet" />



        <link href="https://cmsrepository.com/static/flights/flight/country-flags/countryflags.css?v=69.2.7006" rel="stylesheet" />
        {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" /> */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.min.js"></script>
        <script src="	https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" crossOrigin="anonymous"></script>
        {/* <script src="/assets/scripts/latest-jquery-ui.js" ></script> */}
      </head>
      <body className={"results-page"}>
        <>
          <Navbar />
          <ToastContainer />
          {children}
          <Footer /></>
      </body>
    </html>
  );
}
