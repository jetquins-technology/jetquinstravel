import { useSearchParams } from "next/navigation";

const OfferPopup = ({ flight, hideOfferPopup }) => {
    const router = useSearchParams();

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

    return <div className="common_popup" id="undercutting_bnr" bis_skin_checked="1">
        <div className="center-block" bis_skin_checked="1">
            <div className="outer" bis_skin_checked="1">
                <div className="inner ucbinner" bis_skin_checked="1">
                    <div className="list-count1" id="top-m" bis_skin_checked="1">
                        <div className="list-count-banner1" bis_skin_checked="1">
                            <div className="close-btn close-btnUC" id="lbyfucbannerclose" onClick={hideOfferPopup} bis_skin_checked="1"><img src="/assets/images/uc/cancel.svg" /></div>
                            <div className="top-head" bis_skin_checked="1">
                                <div className="logo-sttt" bis_skin_checked="1"><img src="/assets/jetquins1.png" /></div>
                                {/* <div className="clock_timer" bis_skin_checked="1"><img src="/assets/images/uc/clock.svg" /><span className="timer">00:07:34</span></div> */}
                                <div className="lto" bis_skin_checked="1">Limited Time Offer!</div>
                            </div>
                            <div className="dealCode" bis_skin_checked="1"><span className="deal">Quote to avail this offer : L34327</span></div>
                            <div className="main-section" bis_skin_checked="1">
                                <div className="spcial-loc" bis_skin_checked="1"><span>Special fare to </span>{flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.airport.city}</div>
                                <div className="special-fare" bis_skin_checked="1">
                                    <span className="price-text">$<b>{parseInt(flight.travelerPricings[0].price.total) - 4}</b><sup>*</sup></span><br />
                                    <span className="ppp">Price per adult</span>
                                </div>
                                <div className="triptype" bis_skin_checked="1">
                                    <div className="trip" bis_skin_checked="1">
                                        {router.get("returnD") ? "Round Trip" : "One-Way"},
                                    </div>
                                    <div className="pax ng-binding" bis_skin_checked="1">
                                        &nbsp;{flight.itineraries[0].segments[0].cabin}
                                    </div>
                                </div>
                                <div style={{ clear: "both" }} bis_skin_checked="1"></div>
                                <div className="dep-ret" bis_skin_checked="1">
                                    <div className="row" bis_skin_checked="1">
                                        <div className="col-xs-5" bis_skin_checked="1">
                                            <div className="dep" bis_skin_checked="1">Departure</div>
                                            <div className="city-code" bis_skin_checked="1">{flight.itineraries[0].segments[0].departure.iataCode}</div>
                                            <div className="city-name" bis_skin_checked="1"> {flight.itineraries[0].segments[0].departure.airport.city}</div>
                                            <div className="trav-date" bis_skin_checked="1">{getFormattedDate(flight.itineraries[0].segments[0].departure.at)}</div>
                                        </div>
                                        <div className="col-xs-2" bis_skin_checked="1">
                                            <div className="exchange-arr" bis_skin_checked="1">
                                                <img className="round1 onweay_arrow" src="/assets/images/uc/round2.svg" />
                                            </div>
                                        </div>
                                        <div className="col-xs-5 text-right" bis_skin_checked="1">
                                            <div className="dep" bis_skin_checked="1">Arrival</div>
                                            <div className="city-code" bis_skin_checked="1">{flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.iataCode}</div>
                                            <div className="city-name" bis_skin_checked="1"> {flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.airport.city}</div>
                                            <div className="trav-date" bis_skin_checked="1"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="call-btn" bis_skin_checked="1">
                                    <img className="callg" src="/assets/images/uc/call.gif" />
                                    <a id="lbyfucbannercallbtn" href="tel:+1(888) 267-5955">
                                        <span className="callnow hidden-xs">
                                            <img src="/assets/images/uc/telephone-call.svg" />
                                            <b>call now</b>
                                        </span>
                                        <span className="tfn"><img src="/assets/images/uc/telephone-call.svg" className="hidden-sm hidden-md hidden-lg" /> +1(888) 267-5955</span>
                                    </a>
                                </div>
                                <div className="tp-undercut-block" bis_skin_checked="1">
                                    <div className="tp-logo" bis_skin_checked="1"><img src="/assets/images/trustpilot/trust-pilot.png" /></div>
                                    <div className="tp-rating" bis_skin_checked="1">
                                        <span className="tp-head">Excellent</span>
                                        <img src="/assets/images/trustpilot/stars-4.5.svg" className="top-logo" />
                                        <span className="tp-score"><b>4.5</b> out of <b>5</b></span>
                                    </div>
                                </div>
                                <div className="btm-txt" bis_skin_checked="1"><sup>*</sup>Fares are subject to seat availability and not guaranteed until ticketed.</div>
                            </div>
                        </div>
                    </div>
                    <div className="clearfix" bis_skin_checked="1"></div>
                </div>
            </div>
        </div>
    </div>
}

export default OfferPopup;