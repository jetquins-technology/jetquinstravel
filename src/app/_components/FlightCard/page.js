"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

const FlightCard = ({ flight, setFlightDetailVisible, setSelectedFlight, oneway }) => {

    console.log(flight, "FlightLoop")

    const router = useRouter();

    const isOneWay = oneway === 'true'

    function calculateLayoverTime(flightOffer) {
        const itineraries = flightOffer.itineraries;
        const layovers = [];

        itineraries.forEach(itinerary => {
            const segments = itinerary.segments;
            for (let i = 0; i < segments.length - 1; i++) {
                const arrivalTime = new Date(segments[i].arrival.at);
                const departureTime = new Date(segments[i + 1].departure.at);

                const layoverDuration = (departureTime - arrivalTime) / 60000; // Duration in minutes

                layovers.push({
                    layover_duration: layoverDuration, // in minutes
                    layover: layoverDuration > 0,
                    itineraries: {
                        layover_time: `${Math.floor(layoverDuration / 60)}H ${layoverDuration % 60}M`
                    }
                });
            }
        });

        return layovers;
    }

    const getFormattedDate = (date) => {
        let newDate = new Date(date)
        if (!isNaN(newDate)) {
            const formattedDate = newDate.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
            return formattedDate;
        } else {
            console.log("Not a valid date");
        }
    };

    const getTimeFromDate = (date) => {
        let newDate = new Date(date);

        // Get hours and minutes
        let hours = newDate.getHours();
        let minutes = newDate.getMinutes();

        // Add leading zero to minutes if needed
        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        // Add leading zero to hours if needed
        if (hours < 10) {
            hours = '0' + hours;
        }
        return `${hours}:${minutes}`;
    };

    function extractDuration(ptString) {
        // Define a regular expression to match hours and minutes
        const regex = /PT(\d+H)?(\d+M)?/;

        // Use the regex to extract hours and minutes
        const matches = ptString?.match(regex);

        // Initialize hours and minutes
        let hours = '';
        let minutes = '';

        if (matches) {
            // Extract hours if present
            if (matches[1]) {
                hours = matches[1].replace('H', '') + 'H';
            }

            // Extract minutes if present
            if (matches[2]) {
                minutes = matches[2].replace('M', '') + 'M';
            }
        }

        // Return the formatted duration as "XH YM"
        return `${hours} ${minutes || '00M'}`.trim();
    }

    return <>
        {flight && <div onClick={() => { setSelectedFlight(flight); setFlightDetailVisible(true) }} className="result-block FTT3001">
            <div className="row">
                {/* <div className="col-md-12 col-xs-12 h-36">
                    <div className="flexi-content hidden-xs">
                        <span>Alternate Date </span>
                    </div>
                </div> */}
            </div>
            <div className="position-relative">
                <div
                    id="lbyfclickflightdetail"
                    className="row clickflightdetail containerselect"
                >
                    <div className="col-sm-10 col-xs-12" id="fltlst">
                        <div className="depart-flight">
                            <a className="xs-dis-blck" href="javascript:void(0);">

                                {
                                    isOneWay ?
                                        (
                                            <div className="row">
                                                <div className="col-sm-3 col-xs-12 no-padding-left">
                                                    <span className="price-section visible-xs">
                                                        <price>
                                                            ${flight.travelerPricings[0].price.total}
                                                            <div className="per-adult"> {flight.travelerPricings[0].price.total}</div>
                                                            <div
                                                                className="per-adult"
                                                                style={{ display: "none" }}
                                                            >
                                                                <div
                                                                    className="afflop afffred_10100"
                                                                    amt={10100}
                                                                ></div>
                                                            </div>
                                                        </price>
                                                    </span>
                                                    <div className="airline-detail">
                                                        <img
                                                            src={flight.itineraries[0].segments[0].airline.logo}
                                                            onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png';"
                                                        />
                                                        <div className="name">
                                                            {flight.itineraries[0].segments[0].airline.name}
                                                            <span className="tooltip-custom">
                                                                <div className="promo-detail">
                                                                    <span className="arrow" />
                                                                    <p className="mb5px">
                                                                        32A AIRBUS A320 (SHARKLETS) 123-180 STD
                                                                        Seats
                                                                    </p>
                                                                </div>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-sm-7 col-xs-12">
                                                    <div className="flex-date flex-highlight">
                                                        {getFormattedDate(flight.itineraries[0].segments[0].departure.at)}
                                                    </div>
                                                    <div className="leg-details">
                                                        <div className="city text-right">
                                                            <div className="time">
                                                                <strong>{getTimeFromDate(flight.itineraries[0].segments[0].departure.at)}</strong>
                                                            </div>
                                                            <div className="code">
                                                                <span className=" tooltip-custom minor-txt">
                                                                    {flight.itineraries[0].segments[0].departure.iataCode}
                                                                    <div className="promo-detail">
                                                                        <span className="arrow" />
                                                                        <p
                                                                            className="mb5px"
                                                                            style={{ textAlign: "left" }}
                                                                        >
                                                                            {flight.itineraries[0].segments[0].departure.airport.name}, {flight.itineraries[0].segments[0].departure.airport.city}
                                                                        </p>
                                                                    </div>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="connnecting-block">
                                                        <div className="leg-points">
                                                            {flight.itineraries[0].segments.length > 1 && <div className="tooltip-custom">
                                                                <span className="visible-xs layovertimemob">
                                                                    <span
                                                                        style={{ width: "auto" }}
                                                                        className="fa fa-clock-o"
                                                                    />
                                                                    {extractDuration(flight.itineraries[0].duration)}
                                                                </span>
                                                                <span>
                                                                    <div className="layovertime hidden-xs">
                                                                        {flight.itineraries[0].segments.length > 1 && calculateLayoverTime(flight)[0].itineraries.layover_time}
                                                                    </div>
                                                                    <i />
                                                                    <div className="destination_code">
                                                                        <b>{flight.itineraries[0].segments.length > 1 && flight.itineraries[0].segments[1].departure.iataCode}</b>
                                                                    </div>
                                                                </span>
                                                                <div className="promo-detail">
                                                                    <p>
                                                                        <strong>Flight Duration: </strong>{extractDuration(flight.itineraries[0].duration)}
                                                                    </p>
                                                                    {flight.itineraries[0].segments.length > 1 && flight.itineraries[0].segments.map((a, i) => {
                                                                        if (i !== 0) {
                                                                            return <p>
                                                                                <strong>Layover {i}:</strong> {extractDuration(a.duration)},
                                                                                {a.departure.airport ? a.departure.airport.name : ""}, {a.departure.airport ? a.departure.airport.city : ""}
                                                                            </p>
                                                                        }
                                                                    })}

                                                                </div>
                                                            </div>}
                                                        </div>
                                                    </div>

                                                    <div className="leg-details">
                                                        <div className="city">

                                                            <div className="time">

                                                                <strong>{getTimeFromDate(flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.at)}</strong>
                                                                <sup />
                                                            </div>
                                                            <div className="code">
                                                                <span className="  tooltip-custom minor-txt">
                                                                    {flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.iataCode}
                                                                    <div className="promo-detail">
                                                                        <span className="arrow" />
                                                                        <p
                                                                            className="mb5px"
                                                                            style={{ textAlign: "left" }}
                                                                        >
                                                                            {flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.airport.name}, {flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.airport.city}
                                                                        </p>
                                                                    </div>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-sm-2 col-xs-12 p0px hidden-xs">
                                                    <div
                                                        className="trip-time"
                                                        style={{
                                                            fontSize: 12,
                                                            width: 80,
                                                            paddingTop: 20,
                                                            color: "#333"
                                                        }}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width={12}
                                                            height={12}
                                                            fill="currentColor"
                                                            className="bi bi-clock"
                                                            viewBox="0 0 16 16"
                                                            style={{ verticalAlign: "middle" }}
                                                        >
                                                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"></path>
                                                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"></path>
                                                        </svg>
                                                        {extractDuration(flight.itineraries[0].duration)}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="row">
                                                    <div className="col-sm-3 col-xs-12 no-padding-left">
                                                        <span className="price-section visible-xs">
                                                            <price>
                                                                ${flight.travelerPricings[0].price.total}
                                                                <div className="per-adult"> {flight.travelerPricings[0].price.total}</div>
                                                                <div
                                                                    className="per-adult"
                                                                    style={{ display: "none" }}
                                                                >
                                                                    <div
                                                                        className="afflop afffred_10100"
                                                                        amt={10100}
                                                                    ></div>
                                                                </div>
                                                            </price>
                                                        </span>
                                                        <div className="airline-detail">
                                                            <img
                                                                src={flight.itineraries[0].segments[0].airline.logo}
                                                                onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png';"
                                                            />
                                                            <div className="name">
                                                                {flight.itineraries[0].segments[0].airline.name}
                                                                <span className="tooltip-custom">
                                                                    <div className="promo-detail">
                                                                        <span className="arrow" />
                                                                        <p className="mb5px">
                                                                            32A AIRBUS A320 (SHARKLETS) 123-180 STD
                                                                            Seats
                                                                        </p>
                                                                    </div>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-7 col-xs-12">
                                                        <div className="flex-date flex-highlight">
                                                            {getFormattedDate(flight.itineraries[0].segments[0].departure.at)}
                                                        </div>
                                                        <div className="leg-details">
                                                            <div className="city text-right">
                                                                <div className="time">
                                                                    <strong>{getTimeFromDate(flight.itineraries[0].segments[0].departure.at)}</strong>
                                                                </div>
                                                                <div className="code">
                                                                    <span className=" tooltip-custom minor-txt">
                                                                        {flight.itineraries[0].segments[0].departure.iataCode}
                                                                        <div className="promo-detail">
                                                                            <span className="arrow" />
                                                                            <p
                                                                                className="mb5px"
                                                                                style={{ textAlign: "left" }}
                                                                            >
                                                                                {flight.itineraries[0].segments[0].departure.airport.name}, {flight.itineraries[0].segments[0].departure.airport.city}
                                                                            </p>
                                                                        </div>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="connnecting-block">
                                                            <div className="leg-points">
                                                                {flight.itineraries[0].segments.length > 1 && <div className="tooltip-custom">
                                                                    <span className="visible-xs layovertimemob">
                                                                        <span
                                                                            style={{ width: "auto" }}
                                                                            className="fa fa-clock-o"
                                                                        />
                                                                        {extractDuration(flight.itineraries[0].duration)}
                                                                    </span>
                                                                    <span>
                                                                        <div className="layovertime hidden-xs">
                                                                            {flight.itineraries[0].segments.length > 1 && calculateLayoverTime(flight)[0].itineraries.layover_time}
                                                                        </div>
                                                                        <i />
                                                                        <div className="destination_code">
                                                                            <b>{flight.itineraries[0].segments.length > 1 && flight.itineraries[0].segments[1].departure.iataCode}</b>
                                                                        </div>
                                                                    </span>
                                                                    <div className="promo-detail">
                                                                        <p>
                                                                            <strong>Flight Duration: </strong>{extractDuration(flight.itineraries[0].duration)}
                                                                        </p>
                                                                        {flight.itineraries[0].segments.length > 1 && flight.itineraries[0].segments.map((a, i) => {
                                                                            if (i !== 0) {
                                                                                return <p>
                                                                                    <strong>Layover {i}:</strong> {extractDuration(a.duration)},
                                                                                    {a.departure.airport ? a.departure.airport.name : ""}, {a.departure.airport ? a.departure.airport.city : ""}
                                                                                </p>
                                                                            }
                                                                        })}

                                                                    </div>
                                                                </div>}
                                                            </div>
                                                        </div>

                                                        <div className="leg-details">
                                                            <div className="city">

                                                                <div className="time">

                                                                    <strong>{getTimeFromDate(flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.at)}</strong>
                                                                    <sup />
                                                                </div>
                                                                <div className="code">
                                                                    <span className="  tooltip-custom minor-txt">
                                                                        {flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.iataCode}
                                                                        <div className="promo-detail">
                                                                            <span className="arrow" />
                                                                            <p
                                                                                className="mb5px"
                                                                                style={{ textAlign: "left" }}
                                                                            >
                                                                                {flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.airport.name}, {flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.airport.city}
                                                                            </p>
                                                                        </div>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-2 col-xs-12 p0px hidden-xs">
                                                        <div
                                                            className="trip-time"
                                                            style={{
                                                                fontSize: 12,
                                                                width: 80,
                                                                paddingTop: 20,
                                                                color: "#333"
                                                            }}
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width={12}
                                                                height={12}
                                                                fill="currentColor"
                                                                className="bi bi-clock"
                                                                viewBox="0 0 16 16"
                                                                style={{ verticalAlign: "middle" }}
                                                            >
                                                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"></path>
                                                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"></path>
                                                            </svg>
                                                            {extractDuration(flight.itineraries[0].duration)}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="leg-devider" />

                                                <div className="row">
                                                    
                                                    <div className="col-sm-3 col-xs-12 no-padding-left">
                                                        <span className="price-section visible-xs">
                                                            <price>
                                                                ${flight.travelerPricings[0].price.total}
                                                                <div className="per-adult"> {flight.travelerPricings[0].price.total}</div>
                                                                <div
                                                                    className="per-adult"
                                                                    style={{ display: "none" }}
                                                                >
                                                                    <div
                                                                        className="afflop afffred_10100"
                                                                        amt={10100}
                                                                    ></div>
                                                                </div>
                                                            </price>
                                                        </span>
                                                        <div className="airline-detail">
                                                            <img
                                                                src={flight.itineraries[0].segments[0].airline.logo}
                                                                onerror="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png';"
                                                            />
                                                            <div className="name">
                                                                {flight.itineraries[0].segments[0].airline.name}
                                                                <span className="tooltip-custom">
                                                                    <div className="promo-detail">
                                                                        <span className="arrow" />
                                                                        <p className="mb5px">
                                                                            32A AIRBUS A320 (SHARKLETS) 123-180 STD
                                                                            Seats
                                                                        </p>
                                                                    </div>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-7 col-xs-12">
                                                        <div className="flex-date flex-highlight">
                                                            {getFormattedDate(flight.itineraries[1]?.segments[0].departure.at)}
                                                        </div>
                                                        <div className="leg-details">
                                                            <div className="city text-right">
                                                                <div className="time">
                                                                    <strong>{getTimeFromDate(flight.itineraries[1]?.segments[0].departure.at)}</strong>
                                                                </div>
                                                                <div className="code">
                                                                    <span className=" tooltip-custom minor-txt">
                                                                        {flight.itineraries[1]?.segments[0].departure.iataCode}
                                                                        <div className="promo-detail">
                                                                            <span className="arrow" />
                                                                            <p
                                                                                className="mb5px"
                                                                                style={{ textAlign: "left" }}
                                                                            >
                                                                                {flight.itineraries[1]?.segments[0].departure.airport.name}, {flight.itineraries[1]?.segments[0].departure.airport.city}
                                                                            </p>
                                                                        </div>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="connnecting-block">
                                                            <div className="leg-points">
                                                                {flight.itineraries[1]?.segments.length > 1 && <div className="tooltip-custom">
                                                                    <span className="visible-xs layovertimemob">
                                                                        <span
                                                                            style={{ width: "auto" }}
                                                                            className="fa fa-clock-o"
                                                                        />
                                                                        {extractDuration(flight.itineraries[1].duration)}
                                                                    </span>
                                                                    <span>
                                                                        <div className="layovertime hidden-xs">
                                                                            {flight.itineraries[1]?.segments.length > 1 && calculateLayoverTime(flight)[0].itineraries.layover_time}
                                                                        </div>
                                                                        <i />
                                                                        <div className="destination_code">
                                                                            <b>{flight.itineraries[1]?.segments.length > 1 && flight.itineraries[1]?.segments[1].departure.iataCode}</b>
                                                                        </div>
                                                                    </span>
                                                                    <div className="promo-detail">
                                                                        <p>
                                                                            <strong>Flight Duration: </strong>{extractDuration(flight.itineraries[1].duration)}
                                                                        </p>
                                                                        {flight.itineraries[1]?.segments.length > 1 && flight.itineraries[1]?.segments.map((a, i) => {
                                                                            if (i !== 0) {
                                                                                return <p>
                                                                                    <strong>Layover {i}:</strong> {extractDuration(a.duration)},
                                                                                    {a.departure.airport ? a.departure.airport.name : ""}, {a.departure.airport ? a.departure.airport.city : ""}
                                                                                </p>
                                                                            }
                                                                        })}

                                                                    </div>
                                                                </div>}
                                                            </div>
                                                        </div>

                                                        <div className="leg-details">
                                                            <div className="city">

                                                                <div className="time">

                                                                    <strong>{getTimeFromDate(flight.itineraries[1]?.segments[flight.itineraries[1]?.segments.length - 1].arrival.at)}</strong>
                                                                    <sup />
                                                                </div>
                                                                <div className="code">
                                                                    <span className="  tooltip-custom minor-txt">
                                                                        {flight.itineraries[1]?.segments[flight.itineraries[1]?.segments.length - 1].arrival.iataCode}
                                                                        <div className="promo-detail">
                                                                            <span className="arrow" />
                                                                            <p
                                                                                className="mb5px"
                                                                                style={{ textAlign: "left" }}
                                                                            >
                                                                                {flight.itineraries[1]?.segments[flight.itineraries[1]?.segments.length - 1].arrival.airport.name}, {flight.itineraries[1]?.segments[flight.itineraries[1]?.segments.length - 1].arrival.airport.city}
                                                                            </p>
                                                                        </div>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-2 col-xs-12 p0px hidden-xs">
                                                        <div
                                                            className="trip-time"
                                                            style={{
                                                                fontSize: 12,
                                                                width: 80,
                                                                paddingTop: 20,
                                                                color: "#333"
                                                            }}
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width={12}
                                                                height={12}
                                                                fill="currentColor"
                                                                className="bi bi-clock"
                                                                viewBox="0 0 16 16"
                                                                style={{ verticalAlign: "middle" }}
                                                            >
                                                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"></path>
                                                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"></path>
                                                            </svg>
                                                            {extractDuration(flight.itineraries[1]?.duration)}
                                                        </div>
                                                    </div>

                                                </div>
                                            </>
                                        )
                                }
                            </a>
                        </div>
                    </div>
                    <div className="col-sm-2 col-xs-12 hidden-xs" id="fltprice">
                        <div className="price-section">
                            <price>
                                <div
                                    className="fare-breakup"
                                    id="farebreakup_FTT3001"
                                    style={{ display: "none" }}
                                >
                                    <div className="fare-section">
                                        <div className="line2">
                                            <a
                                                href="#adult"
                                                data-toggle="collapse"
                                                className="main blue"
                                            >
                                                <span>${flight.travelerPricings[0].price.total}</span>
                                                <b>
                                                    1 Adult(s) <i className="fa fa-angle-down" />
                                                </b>
                                            </a>
                                        </div>
                                        <div
                                            id="adult"
                                            className="line taxes-fees collapse in"
                                            aria-expanded="true"
                                        >
                                            <p>
                                                <span>$30.90</span>
                                                <b>Per adult Base fare</b>
                                            </p>
                                            <p>
                                                <span>$70.58</span>
                                                <b>Per adult Taxes &amp; Fee</b>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="total-price">
                                        <span>
                                            <b>${flight.travelerPricings[0].price.total}</b>
                                        </span>
                                        <b>Total</b>
                                    </div>
                                </div>
                                <div>
                                    ${flight.travelerPricings[0].price.total} <br />
                                    <span />
                                </div>
                                <div className="per-person">
                                    (Per Adult)
                                    <div
                                        className="affirm_text"
                                        style={{ display: "none" }}
                                    >
                                        <spna
                                            className="afflop afffred_10100"
                                            amt={10100}
                                        />
                                        <div className="tooltip-custom">
                                            <i className="fa fa-info hand" />
                                            <div className="promo-detail right_tooltip">
                                                <div className="mb5px text-center">
                                                    <img
                                                        className="easy-payment-logo"
                                                        src="/assets/images/card-icon/affirm-logo.png"
                                                    />
                                                    <div className="textaffirm">
                                                        <strong>Buy now, pay over time</strong>
                                                    </div>
                                                </div>
                                                <ul className="affirm_list 10100_afffredul" />
                                            </div>
                                        </div>
                                    </div>
                                    <button className="seedetail"  >Select</button>
                                </div>
                            </price>
                            <div className="per-person">Standard Fare {flight.itineraries[0].segments[0].cabin}</div>
                            <div className="clearfix" />
                            <div className="actionicons">
                                <ul>
                                    <li>
                                        <div className="relative">
                                            <span className="top_icon">
                                                <img src="/assets/images/svg/check.svg" alt="" />
                                            </span>
                                            <img
                                                src="/assets/images/svg/p-bag.svg?v=1.2"
                                                className="icons icon-luggage"
                                                alt=""
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="relative">
                                            <span className="top_icon">
                                                <img
                                                    src="/assets/images/svg/baggage-chargable.svg"
                                                    alt=""
                                                />
                                            </span>
                                            <img
                                                src="/assets/images/svg/c-bag.svg?v=1.2"
                                                className="icons icon-luggage"
                                                alt=""
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="relative">
                                            <span className="top_icon">
                                                <img
                                                    src="/assets/images/svg/baggage-chargable.svg"
                                                    alt=""
                                                />
                                            </span>
                                            <img
                                                src="/assets/images/svg/b-bag.svg?v=1.2"
                                                className="icons icon-luggage"
                                                alt=""
                                            />
                                        </div>
                                    </li>
                                </ul>
                                <div className="tooltipBox baggage_1 text-left">
                                    <div className="baggage_row">
                                        <div className="popup_icon relative">
                                            <img
                                                src="/assets/images/svg/p-bag.svg?v=1.0"
                                                alt=""
                                                className="icons"
                                            />
                                        </div>
                                        <div className="d-flex">
                                            Personal Item
                                            <span className="green baggage_status">
                                                <img
                                                    alt="icons"
                                                    src="/assets/images/svg/check.svg"
                                                />
                                                Included
                                            </span>
                                        </div>
                                        <div className="light">A laptop bag or purse</div>
                                    </div>
                                    <div className="baggage_row">
                                        <div className="popup_icon relative">
                                            <img
                                                src="/assets/images/svg/c-bag.svg?v=1.0"
                                                alt=""
                                                className="icons"
                                            />
                                        </div>
                                        <div className="d-flex">
                                            Carry-on Bag
                                            <span className="blue_text baggage_status">
                                                <img
                                                    src="/assets/images/svg/baggage-chargable.svg"
                                                    alt=""
                                                />{" "}
                                                75.00
                                            </span>
                                        </div>
                                        <div className="light">22 x 18 x 10 inches</div>
                                    </div>
                                    <div className="baggage_row">
                                        <div className="popup_icon relative">
                                            <img
                                                src="/assets/images/svg/b-bag.svg?v=1.0"
                                                alt=""
                                                className="icons"
                                            />
                                        </div>
                                        <div className="d-flex">
                                            Checked Bag
                                            <span className="blue_text baggage_status">
                                                <img
                                                    src="/assets/images/svg/baggage-chargable.svg"
                                                    alt=""
                                                />{" "}
                                                70.00
                                            </span>
                                        </div>
                                        <div className="light">62 linear inches</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>}

    </>
}

export default FlightCard;