'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const TopFlightDestinationCard = ({ destination }) => {
    const router = useRouter();
    const [token, setToken] = useState("");

    const fetchToken = async () => {
        let body = new URLSearchParams();
        body.append("grant_type", "client_credentials");
        body.append("client_id", "0fTkgg7u7lrqduKUEFx7v5Gnhey4ZG50");
        body.append("client_secret", "1kbdDxkhO4kMMH9p");
        try {
            const data = await fetch("https://api.amadeus.com/v1/security/oauth2/token",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: body.toString()
                });
            const json = await data.json();
            setToken(json.access_token)
            localStorage.setItem("typCknhbg", json.access_token);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchToken();
    }, []);

    const sanitizedDestinationName = destination.source.iataCode
        .replace(/[^\w\s]/g, '')
        .replace(/\d+/g, '')
        .trim()
        .replace(/\s+/g, '-');

    const handleClick = () => {
        if (destination?.source?.iataCode && destination?.source?.name) {
            router.push(`/home/flights/flight?originName=${encodeURIComponent(destination.source.name)}&destName=${encodeURIComponent(destination.destination.name)}&origin=${destination.destination.iataCode}&destination=${destination.source.iataCode}&depDate=${destination.depDate}&returnD=${destination.returnDate}&adult=1&child=0&infant=0&cabin=ECONOMY&airline=all&tripType=One-Way&dateRange=${encodeURIComponent(destination.dateRange)}&tk=${token}`);
            // router.push(`/FlightListing/${sanitizedDestinationName}?name=${encodeURIComponent(destination.source.name)}&name1=${encodeURIComponent(destination.destination.name)}&destination=${destination.source.iataCode}&origin=${destination.destination.iataCode}&depDate=${destination.depDate}&returnD=${destination.returnDate}&adult=1&child=0&infant=0&cabin=ECONOMY&airline=all&tripType=Round-trip&dateRange=${encodeURIComponent(destination.dateRange)}&token=${token}`);
        }
    };

    return (
        <>
            <li onClick={handleClick} destination={destination}>
                <figure>
                    <img
                        src={destination.image}
                        className="deal__logo"
                        alt={destination.source.name}
                    />
                </figure>
                <div className="deal__detail">
                    <strong>{destination.source.name} - {destination.destination.name}</strong>
                    <div className="small_text">{destination.dateRange}</div>
                </div>
                <div className="deal__price">
                    <small className="small_text">From</small> {destination.amount}
                    <div className="small_text">Per adult</div>
                </div>
            </li>
        </>
    );
};

export default TopFlightDestinationCard;
