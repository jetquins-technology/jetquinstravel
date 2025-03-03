'use client'

import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import FlightSearch from "@/app/_components/FlightSearch/page";

const NoResults = () => {

    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const searchRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState("0px");

    const searchParam = useSearchParams();

    const handleEditSearchClick = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    useEffect(() => {

        if (isSearchVisible) {
            setMaxHeight(`${searchRef.current.scrollHeight}px`);
        } else {
            setMaxHeight("0px");
        }
    }, [isSearchVisible]);

    const [isFlightSearchVisible, setFlightSearchVisible] = useState(false);

    // Handler to open FlightSearch component
    const openFlightSearch = () => {
        setFlightSearchVisible(true);
    }
    const closeFlightSearch = () => {
        setFlightSearchVisible(false);
    };


    return <div className="body-content" bis_skin_checked={1}>
        <div
            id="_flight-details"
            className="flight-details collapse"
            style={{ height: "100%!important" }}
            bis_skin_checked={1}
        ></div>
        <div
            id="overlay_detail"
            className="midum-overlay"
            style={{ display: "none" }}
            bis_skin_checked={1}
        />
        <div className="modify-engine-wrapper" bis_skin_checked={1}>
            <a href="javascript:void(0);" className="close-sidebar fa fa-close" />
            <div className="holder" bis_skin_checked={1}>
                <div className="modify-engine" bis_skin_checked={1}>
                    <div className="container">
                        <div className="search_detail edit-listing-searchdetails hand">
                            {!isSearchVisible ? (
                                <div className="row" onClick={handleEditSearchClick} style={{ cursor: 'pointer' }}>
                                    <div className="">
                                        <div className="search_detail edit-listing-searchdetails hand">
                                            <div className="">
                                                <button
                                                    type="button"
                                                    className="modify_search pull-right edit-listing-search"
                                                    onClick={handleEditSearchClick}
                                                >
                                                    Edit Search
                                                </button>
                                                <div className="col-sm-8 ">
                                                    {searchParam.get("tripType") === 'Round-Trip' ? (
                                                        <>
                                                            {searchParam.get("origin")} &nbsp;
                                                            <b>
                                                                <i className="fa fa-exchange" />
                                                            </b>
                                                            &nbsp; {searchParam.get("destination")}
                                                            <br />
                                                            {searchParam.get("depDate")}, {searchParam.get("returnD")}, 1 Travelers, Economy
                                                        </>
                                                    ) : (
                                                        <>
                                                            {searchParam.get("origin")} &nbsp;
                                                            <b>
                                                                <i className="fa fa-arrow-right" />
                                                            </b>
                                                            &nbsp; {searchParam.get("destination")}
                                                            <br />
                                                            {searchParam.get("depDate")}, 1 Travelers, Economy
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <a className="close-listing-search visible-lg visible-md visible-sm" onClick={handleEditSearchClick}>
                                        Close {/* */} [x]
                                    </a>
                                    <div ref={searchRef}>
                                        <section id="flightEngineId">
                                            <FlightSearch />
                                        </section>
                                    </div>
                                </>

                            )}

                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div className="mobile-header-fixed" bis_skin_checked={1}>
            <div className="mobile-itenery modifySearchMobile" bis_skin_checked={1}>
                <div className="result-itenery" bis_skin_checked={1}>
                    <div className="row">
                        <div className="col-xs-12">
                            <a href="javascript:void(0);" onClick={openFlightSearch}>
                                <div className="modify-src-btn">
                                    <img
                                        src="https://www.lookbyfare.com/us/images/svg/edit-icon.svg"
                                        alt="Edit Icon"
                                    />
                                </div>
                            </a>
                            {isFlightSearchVisible && (
                                <div className="modify-engine-wrapper open">
                                    <a
                                        href="javascript:void(0);"
                                        className="close-sidebar fa fa-close"
                                        onClick={() => setFlightSearchVisible(false)}
                                    />

                                    <div className="holder">
                                        <div className="modify-engine">
                                            <div className="container">
                                                <div className="search_detail edit-listing-searchdetails hand">
                                                    {!isSearchVisible ? (
                                                        <FlightSearch />
                                                    ) : (
                                                        <a
                                                            className="close-listing-search visible-lg visible-md"
                                                            onClick={() => setIsSearchVisible(false)}
                                                        >
                                                            Close {/* [x] */}
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="city-itenery">
                                <div className="column">
                                    <p className="airportCode">{searchParam.get("origin")}</p>
                                </div>
                                <div className="column">
                                    <div className="airporticon">
                                        <b>
                                            <i className="fa fa-long-arrow-right" aria-hidden="true" />
                                        </b>
                                    </div>
                                </div>
                                <div className="column">
                                    <p className="airportCode">{searchParam.get("destination")}</p>
                                </div>
                                <div className="clearfix" />

                                <div className="itenery-date">

                                    {searchParam.get("tripType") === 'Round-Trip' ? (
                                        <>
                                            {searchParam.get("depDate")}, {searchParam.get("returnD")},
                                            <span>1 Traveler</span>,
                                            {searchParam.get("cabin")}
                                        </>
                                    ) : (
                                        <>
                                            {searchParam.get("depDate")},
                                            <span>1 Traveler</span>,
                                            {searchParam.get("cabin")}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <loading>
            <div
                className="loader"
                style={{ position: "absolute", display: "none" }}
                bis_skin_checked={1}
            />
        </loading>
        <div id="div_gotopayment" style={{ display: "none" }} bis_skin_checked={1}>
            <div
                style={{
                    padding: 7,
                    width: 125,
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 10007,
                    background: "#fff",
                    textAlign: "center",
                    borderRadius: 10
                }}
                bis_skin_checked={1}
            >
                <img src="/assets/images/loading.gif" style={{ width: 80 }} />
                <span
                    id="loadermsg"
                    style={{ fontSize: 12, color: "rgb(255, 127, 0)", display: "none" }}
                />
            </div>
            <div className="midum-overlay" id="fadebackground" bis_skin_checked={1} />
        </div>
        <div className="listing-wrapper" bis_skin_checked={1}>
            <div className="container" bis_skin_checked={1}>
                <input type="hidden" id="tabvalue" name="tabvalue" defaultValue="all" />
                <div className="row" bis_skin_checked={1}>
                    <div className="col-sm-12 col-md-12 col-xs-12" bis_skin_checked={1}>
                        <div className="row" bis_skin_checked={1}>
                            <div className="col-md-12" bis_skin_checked={1}>
                                <div className="no-result" bis_skin_checked={1}>
                                    <img src="/assets/images/session-expire-icon.png" alt="" />
                                    <div className="oops" bis_skin_checked={1} />
                                    <div className="head" bis_skin_checked={1}>
                                        No result found
                                    </div>
                                    <p className="text">
                                        We’ve searched more than 400 airlines that we sell,
                                        <br /> and couldn't find any flights from <strong>
                                            {searchParam.get("origin")}
                                        </strong>{" "}
                                        to <strong>{searchParam.get("destination")}</strong>
                                    </p>
                                    <div className="bottom" bis_skin_checked={1}>
                                        <p>Call us at (24x7)</p>
                                        <a
                                            className="call_number"
                                            id="noresult_contact"
                                            href="tel:+1-844-774-6584"
                                        >
                                            +1-844-774-6584
                                        </a>
                                        <br />
                                        <a href="/" className="home_button">
                                            <i className="fa fa-angle-left" aria-hidden="true" /> Go
                                            Home
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <form
            id="fltdetailspack"
            name="fltdetailspack"
            method="get"
            target="_blank"
        ></form>
        <div
            className="trigger-wrapper"
            style={{ display: "none" }}
            bis_skin_checked={1}
        >
            <div className="trigger-searching" bis_skin_checked={1}>
                <span className="close-btn" id="tiggerclose">
                    <img src="/assets/images/trigger-mobile/close-icon.svg" />
                </span>
                <img
                    src="/assets/images/trigger-mobile/user-icon.svg"
                    className="user-icon"
                />
                <div className="head" bis_skin_checked={1}>
                    Book before fare goes up!
                </div>
                <p className="con-txt">
                    <b>3588</b> people are currently searching for flights to <br />
                    Los Angeles
                </p>
            </div>
            <div className="mobile-laover" bis_skin_checked={1} />
        </div>
        <style
            dangerouslySetInnerHTML={{
                __html:
                    "\n    .navbar-nav {\n        display: none;\n    }\n\n    .footer-component {\n        display: none;\n    }\n\n    .copyright-block {\n        border-top: 1px solid #ccc;\n        padding-top: 30px;\n    }\n\n    .airline-matrix-wrapper .slick-slider .slick-prev, .airline-matrix-wrapper .slick-slider .slick-next {\n        top: -15px;\n        background: #1b75bc;\n        border-radius: 100%;\n        border: 0;\n        width: 26px;\n        height: 26px;\n        right: -15px !important;\n    }\n\n    .airline-matrix-wrapper .slick-slider .slick-prev {\n        left: inherit;\n        right: 15px !important;\n    }\n@media (max-width: 479px) {\n        .navbar-toggle {\n            display: none;\n        }\n    }\n\t\n"
            }}
        />
        <div
            className="list-count"
            id="session-expire-warning-modal"
            style={{ display: "none" }}
            bis_skin_checked={1}
        >
            <div className="list-count-banner" bis_skin_checked={1}>
                <div className="top-head" bis_skin_checked={1}>
                    <div className="timer-icon" align="center" bis_skin_checked={1}>
                        <i className="fa fa-clock-o" style={{ fontSize: 42 }} />
                    </div>
                </div>
                <br />
                <div className="btm-txt txt2" bis_skin_checked={1}>
                    <p>
                        Flight Prices may change frequently owing to demand and availability.
                        Start a <b>New Search</b> / <b>Refresh Result</b> to view the latest
                        deals
                    </p>
                </div>
                <br />
                <div className="call-btn" bis_skin_checked={1}>
                    <a
                        href="javascript:searchAgain('flight');"
                        id="refResult"
                        className="w200"
                    >
                        Refresh Result
                    </a>
                    <a href="/us" id="sess_startagain" className="w200">
                        Start Again
                    </a>
                </div>
            </div>
            <div className="midum-overlay" id="fadebackground" bis_skin_checked={1} />
        </div>
    </div>
}


export default NoResults;