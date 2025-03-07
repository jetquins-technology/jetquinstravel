// src/app/(landing)/server-layout.js
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Cheap Flights, Compare Flights & Airline Deals - jetquinstravelss.com",
    description: "Find the cheapest flight tickets with Jetquins Travelss ! Compare prices effortlessly and book the best deals on flights through our advanced algorithm. Start saving on your next trip today",
    icons: {
        icon: '/favicon.ico'
    }
};

export default function ServerLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* Include other necessary meta tags */}
                <title>{metadata.title}</title>
            </head>
            <body className="results-page">
                {children}
            </body>
        </html>
    );
}
