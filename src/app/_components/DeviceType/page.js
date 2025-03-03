"use client";

import { useEffect, useState } from "react";
import FlightSearch from "../FlightSearch/page";
import FlightSearchMobile from "../FlightSearchMobile/page";

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(0); // Initial value of 0

    useEffect(() => {
        // Check if window is available (client-side only)
        if (typeof window !== "undefined") {
            const handleResize = () => {
                setWindowWidth(window.innerWidth);
            };

            window.addEventListener("resize", handleResize);

            // Initial window width
            setWindowWidth(window.innerWidth);

            // Cleanup on component unmount
            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }
    }, []);

    return windowWidth;
};

const MyComponent = () => {
    const width = useWindowWidth();
    const isMobile = width <= 768; // You can adjust the breakpoint as needed

    useEffect(() => {
        if (isMobile) {
            const profileCss = document.createElement("link");
            profileCss.rel = "stylesheet";
            profileCss.href = "/assets/Content/css/m.lightpick.css";
            document.head.appendChild(profileCss);
            {/* <link href="/assets/Content/css/m.lightpick.css?v=69.2.7006" rel="stylesheet" /> */ }
            return () => {
                if (document.head.contains(profileCss)) {
                    document.head.removeChild(profileCss);
                }
            };
        }
    }, [isMobile])

    return (
        <div>
            {isMobile ? <FlightSearchMobile /> : <FlightSearch />}
        </div>
    );
};

export default MyComponent;
