import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useState } from "react";

const FlightCardMobile = ({ airlinesData, setActiveFlight }) => {

    // console.log(airlinesData, "AirlinesData");

    const HandleFlightDetails = (flight) => {
        setActiveFlight(flight);
    }

    const secondSetting = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 980,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                },
            },
        ],
    };

    const settings = {
        dots: false,
        infinite: airlinesData.length > 1,
        speed: 500,
        slidesToShow: airlinesData.length === 1 ? 1 : 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: airlinesData.length === 1 ? 1 : 3,
                    slidesToScroll: 1,
                    infinite: airlinesData.length > 1,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: airlinesData.length === 1 ? 1 : 3,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <>
            {/* For Mobile view */}
            <div className="airline-matrix-mobile visible-xs" id="showMatrixInMobile">
                <Slider {...settings}>
                    {airlinesData.map((flight, index) => (
                        <ul>
                            <li key={index} className="head matrix_mobile" onClick={() => HandleFlightDetails(flight)}>
                                <img src={flight.airlineLogo} alt={`${flight.airlineName} logo`} width={50}
                                    height={50} />
                            </li>
                            <b>${flight.price}</b>
                        </ul>
                    ))}
                </Slider>
            </div>
        </>
    )
}

export default FlightCardMobile;