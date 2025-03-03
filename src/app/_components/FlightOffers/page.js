import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import React, { useState } from "react";

const FlightOfferCard = ({ airlinesData, setActiveFlight, handleStopFilter }) => {

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
        slidesToShow: airlinesData.length === 1 ? 1 : 4,
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
                    slidesToShow: airlinesData.length === 1 ? 1 : 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <>
            <div className="tab-content">
                {/* For Desktop view */}
                <div
                    role="tabpanel"
                    className="tab-pane active"
                    id="airlineMatrix"
                >
                    <div className="airline-matrix-wrapper hidden-xs">
                        <input
                            type="hidden"
                            id="isMixAvailable"
                            defaultValue="True"
                        />
                        <div className="row">
                            <div
                                className="col col-xs-3 col-sm-2 pr0"
                                style={{ width: "13%" }}
                            >
                                <div className="matrix-head">
                                    <ul>
                                        <li className="pt25px">
                                            Airlines <i className="fa fa-caret-right" />
                                        </li>
                                        <li
                                            onClick={() => handleStopFilter('Non Stop')} className="hand"
                                        >
                                            Non-Stop <i className="fa fa-caret-right" />
                                        </li>
                                        <li
                                            onClick={() => handleStopFilter('1 Stop')} className="hand"
                                        >
                                            1+ Stop <i className="fa fa-caret-right" />
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="pl0 col-xs-9 col-sm-10 pr0">
                                <Slider {...settings}>
                                    {airlinesData.map((flight, index) => (
                                        <div key={index} className="matrix-data" style={{ width: "100%" }}>
                                            <ul>
                                                <li className="head" onClick={() => HandleFlightDetails(flight)}>
                                                    <img src={flight.airlineLogo} alt={`${flight.airlineName} logo`} />
                                                    <div className="name">{flight.airlineName}</div>
                                                </li>
                                                <li className="matrix-cell mstop0">
                                                    <i className="fa" /> {flight.isNonStop ? `$${flight.price}` : '-'}
                                                </li>
                                                <li className="matrix-cell mstop1">
                                                    <i className="fa" /> {flight.isOnePlusStop ? `$${flight.price}` : '-'}
                                                </li>
                                            </ul>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>

                {/* For Mobile view */}
                <div className="airline-matrix-mobile visible-xs" id="showMatrixInMobile">
                    <Slider {...settings}>
                        {airlinesData.map((flight, index) => (
                            <ul>
                                <li key={index} className="head matrix_mobile" onClick={() => HandleFlightDetails(flight)}>
                                    <img src={flight.airlineLogo} alt={`${flight.airlineName} logo`} width={50}
                                        height={50} />
                                    <b>${flight.price}</b>
                                </li>
                            </ul>
                        ))}
                    </Slider>

                </div>

                <div className="matrix_bottom_row">
                    <div className="multi-airline-icon hidden-xs" style={{}}>
                        <img src="https://www.lookbyfare.com/us/images/listing/mal-blue.png" /> Indicate
                        Multiple Airline
                    </div>
                </div>
            </div >

        </>
    )
}

export default FlightOfferCard;