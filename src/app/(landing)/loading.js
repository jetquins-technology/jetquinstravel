"use client"

import { useEffect, useState } from "react";

const Loading = ({ cabin, total, depDate, origin, destination, originName, destName }) => {
    const [selectedFlight, setSelectedFlight] = useState(null);

    useEffect(() => {
        try {
            console.log(JSON.parse(localStorage.getItem("selectedflight")), "selectedflight");
            setSelectedFlight(JSON.parse(localStorage.getItem("selectedflight")));
        } catch (e) {
            console.log(e);
        }
    }, [])


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

    return <div id="div_gotopayment" bis_skin_checked="1">
        <div style={{ padding: "7px", width: "100%", height: "100%", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "10007", background: "#fff", textAlign: "center" }} bis_skin_checked="1">
            {selectedFlight && (
                <div className="box-space">
                    <div className="loading_block">
                        <div className="searched_logo">
                            <img
                                src="/assets/jetquinsLogos.png"
                                alt="https://jetquins travelss.one"
                            />
                        </div>
                        <div className="loadingBox">
                            <div className="searched_route">
                                <strong>{originName}</strong> ({origin})
                                <span className="trip-arrow">
                                    <img src="https://cmsrepository.com/static/flights/common/eticket/plane-stop.png" />
                                </span>
                                <strong>{destName}</strong> ({destination})
                            </div>
                            <div>
                                <strong>{getFormattedDate(depDate)}</strong>
                            </div>
                            <div>
                                <strong>{total} Traveler, {cabin}</strong>
                            </div>
                            <p className="pls-wait">
                                Please Wait,
                                <br />
                                while jetquins travelss is searching for our best fares...
                            </p>
                            <div className="lds-ring">
                                <div />
                                <div />
                                <div />
                                <div />
                            </div>
                            <div className="trust-logo row">
                                <div className="col-xs-6">

                                    <img id="cldimg" src="https://www.lookbyfare.com/us/images/footer/cloudfare.png" />
                                    <br />
                                    Fast, Safe &amp; Secure.
                                </div>
                                <div className="col-xs-6">
                                    <img
                                        id="affirmimg"
                                        src="https://www.lookbyfare.com/us/images/card-icon/affirm-logo.png?v=1.5"
                                    />
                                    <br />
                                    Easy Monthly Payments
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <span id="loadermsg" style={{ fontSize: "12px", color: "rgb(255, 127, 0)", display: "none" }}></span>
        </div>
        <div className="midum-overlay" id="fadebackground" bis_skin_checked="1"></div>
    </div>
}


export default Loading;