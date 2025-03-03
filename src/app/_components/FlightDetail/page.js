import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
import Loadings from "@/app/Loadings";

const FlightDetail = ({ selectedFlight, travellerDetails }) => {
    const router = useRouter();
    const [refundAmount, setRefundAmount] = useState(0)
    const [isRefundable, setIsRefundable] = useState(null);
    const [loading, setLoading] = useState(false);

    console.log("isRefundable", isRefundable);


    const handleContinueClick = () => {
        setLoading(true);
        setTimeout(() => {
            setIsRefundable(false);
            handleCotnueViewDetail();
            setLoading(false);
        }, 2000);
    };

    const handleCotnueViewDetail = () => {
        localStorage.setItem("selectedflight", JSON.stringify(selectedFlight));
        localStorage.setItem("travellerDetails", JSON.stringify(travellerDetails));
        router.push(`/home/flights/flight/purchase/${selectedFlight.itineraries[0].segments[0].departure.iataCode}-${selectedFlight.itineraries[0].segments[0].arrival.iataCode}`)
    }

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

    const getTimeFromDate = (date, fullhours) => {
        let newDate = new Date(date);

        // Get hours and minutes
        let hours = newDate.getHours();
        let minutes = newDate.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';

        if (fullhours) {
            // Add leading zero to minutes if needed
            if (minutes < 10) {
                minutes = '0' + minutes;
            }

            // Add leading zero to hours if needed
            if (hours < 10) {
                hours = '0' + hours;
            }
            return `${hours}:${minutes}`;
        } else {
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            return `${hours}:${minutes} ${ampm}`
        }

    };

    function extractDuration(ptString) {
        // Define a regular expression to match hours and minutes
        const regex = /PT(\d+H)?(\d+M)?/;

        // Use the regex to extract hours and minutes
        const matches = ptString.match(regex);

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

    // Inline styles
    const styles = {
        loadingOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999, // Ensure it's on top of everything
        },
        loaderContainer: {
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        spinner: {
            fontSize: '30px', // Size of the spinner
            marginRight: '10px',
        },
        button: {
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#4CAF50', 
            color: 'white',
            border: 'none',
            borderRadius: '5px',
        },
        buttonDisabled: {
            cursor: 'not-allowed',
            opacity: 0.6,
        },
    };
    
    return <>
        {loading && (
            <div style={styles.loadingOverlay}>
                <div style={styles.loaderContainer}>
                    <i className="fa fa-spinner fa-spin" style={styles.spinner}></i> Loading...
                </div>
            </div>
        )}
        {/* <!-- flight leg Start here  --> */}
        <div className="flight-leg-info" bis_skin_checked="1">

            {/* <!-- Depart Start here--> */}
            <div className="flight__content-box" id="deptab" bis_skin_checked="1">
                {/* <!--Repeat block Start here --> */}
                {selectedFlight.itineraries[0].segments.map((a, i) => {
                    return <>
                        <div className="flight-details-segment" bis_skin_checked="1">
                            {/* <!--Depart block Start here --> */}
                            <div className="flight-schedule flight_departure" bis_skin_checked="1">
                                <div className="flight_scheduleTime" bis_skin_checked="1">
                                    <strong>{getTimeFromDate(a.departure.at, false)}</strong>
                                    <div className="date " bis_skin_checked="1">{getFormattedDate(a.departure.at)}</div>
                                </div>
                                <div className="flight_scheduleStops-circle" bis_skin_checked="1"></div>
                                <div className="flight_scheduleLocation" bis_skin_checked="1">
                                    <div className="city" bis_skin_checked="1">{a.departure.airport.city}</div>
                                    <div className="airportname" bis_skin_checked="1">{a.departure.airport.name} ({a.departure.airport.iata}), {a.departure.airport.country}</div>
                                </div>
                            </div>
                            {/* <!-- End here--> */}
                            {/* <!--Trip time --> */}
                            <div className="flight_detailsInfoTravel" bis_skin_checked="1">
                                <div className="flight_stopIntervalSeparator" bis_skin_checked="1"></div>
                                <div className="flight-travel-details" bis_skin_checked="1">
                                    <div className="airlines-details" bis_skin_checked="1">
                                        <div className="right" style={{ marginBottom: "10px" }} bis_skin_checked="1">
                                            <div className="air-name" bis_skin_checked="1">
                                                <img src={a.airline.logo} alt="AIR INDIA" />
                                                {a.airline.name}
                                                - {a.carrierCode} {a.aircraft['code']}<br />
                                                <span className="text-gray">
                                                    Cabin : <span className="cabin_Out " id="cabin_Out_0">
                                                        {a.cabin}
                                                    </span>

                                                    <div className="flight-info flap-info-devider" bis_skin_checked="1">
                                                        Aircraft : {a.aircraft.code}
                                                        {/* <span className="tooltip-custom">
                                                    <i className="fa fa-info hand"></i>
                                                    <div className="promo-detail right_tooltip" bis_skin_checked="1">
                                                        <p className="mb5px">321 AIRBUS INDUSTRIE A321 JET 174-220 STD Seats</p>
                                                    </div>
                                                </span> */}

                                                    </div>
                                                    <div bis_skin_checked="1">
                                                    </div>
                                                </span>
                                            </div>

                                        </div>
                                        <div className="clearfix" bis_skin_checked="1"></div>
                                    </div>
                                    <div className="seat-pitch" id="BLR-DEL-AI-808-20240831-ECON" style={{ display: "none" }} bis_skin_checked="1">
                                    </div>
                                </div>
                                <div className="clearfix" bis_skin_checked="1"></div>
                            </div>
                            {/* <!--Trip time --> */}
                            {/* <!--arrival block Start here --> */}
                            <div className="flight-schedule flight_arrival" bis_skin_checked="1">
                                <div className="flight_scheduleTime" bis_skin_checked="1">
                                    <strong>{getTimeFromDate(a.arrival.at)}</strong>
                                    <div className="date" bis_skin_checked="1">{getFormattedDate(a.arrival.at)}</div>
                                </div>

                                <div className="flight_scheduleStops-circle" bis_skin_checked="1"></div>
                                <div className="flight_scheduleLocation" bis_skin_checked="1">

                                    <div className="city" bis_skin_checked="1">{a.arrival.airport.city}</div>
                                    <div className="airportname" bis_skin_checked="1">{a.arrival.airport.name} {a.arrival.airport.city} ({a.arrival.airport.iata}), {a.arrival.airport.country}</div>
                                </div>
                                <div className="clearfix" bis_skin_checked="1"></div>
                            </div>
                            {/* <!-- End here--> */}
                        </div>
                        {i !== selectedFlight.itineraries[0].segments.length - 1 && <div className="flight-details-segment" bis_skin_checked="1">
                            <div className="flight-stop flight-stop--danger" bis_skin_checked="1">
                                <div className="flight-duration" title="Transfer time" bis_skin_checked="1"><i className="fa fa-clock-o"></i> {calculateLayoverTime(selectedFlight)[0].itineraries.layover_time}</div>
                                <div className="flight-stop-interval" bis_skin_checked="1">
                                    <div className="flight_stopIntervalSeparator" bis_skin_checked="1"></div>
                                    <div className="flight-layover-label" bis_skin_checked="1">Layover in {a.arrival.airport.city}</div>
                                </div>
                                <div className="clearfix" bis_skin_checked="1"></div>
                            </div>
                        </div>}
                    </>
                })}
                {/* <!--Repeat block Start here --> */}
                <div className="total-trip-time" bis_skin_checked="1">
                    <i className="fa fa-clock-o"></i> Departure Trip Time: <b>{extractDuration(selectedFlight.itineraries[0].duration)}</b>
                </div>

            </div>
            <div className="flight__content-box" id="rettab" style={{ display: "none" }} bis_skin_checked="1">
                {/* <!--Repeat block Start here --> */}

                <div className="total-trip-time" bis_skin_checked="1">
                    <i className="fa fa-clock-o"></i> Return Trip Time: <b>{extractDuration(selectedFlight.itineraries[0].duration)}</b>
                </div>

            </div>
            {/* <!-- Depart End here--> */}
            <div className="flight__content-box fare-breakup breakup_tab" id="pricetab" style={{ display: "none" }} bis_skin_checked="1">

                {/* <!--Adult Section--> */}
                <div className="fare-section" bis_skin_checked="1">
                    <div className="line2" bis_skin_checked="1">
                        <a className="main blue">
                            <span>{selectedFlight.travelerPricings[0].price.total}</span>
                            <b>
                                1 Adult(s)
                            </b>
                        </a>
                    </div>
                    <div className="line taxes-fees" bis_skin_checked="1">
                        <p>
                            <span>$64.00</span>
                            <b>Per adult Base fare</b>
                        </p>
                        <p>
                            <span>$15.80</span>
                            <b>Per adult Taxes &amp; Fee</b>
                        </p>
                    </div>
                </div>

                <div className="total-price" bis_skin_checked="1">
                    <span><b>${selectedFlight.price.grandTotal}</b></span>
                    <b>Total</b>
                </div>

            </div>

            {/* <!-- Refundable Start here --> */}
            {/* <!-- Refundable Booking Start here --> */}
            <div className="refundableBox" bis_skin_checked="1">

                <h4><img src="/assets/images/listing/rp-icon.svg" alt="Refundable" className="rp-icon" /> Refundable Booking</h4>
                <div className="refundable_inner" bis_skin_checked="1">

                    {/* <!--<div className="refund-subtital">Choose Refundable Booking and receive a flight refund <b>($79.80)</b> even <b>up to 60 days</b> after you missed the flight and can <b>provide evidence</b> for one of the many reasons including:</div>--> */}

                    <div className="refund-subtital" bis_skin_checked="1">Upgrade your booking and receive a <b>100% refund</b> if you cannot attend and can evidence one of the many reasons in our Terms &amp; Conditions, which you accept when you select a Refundable Booking.</div>

                    <div className="covid-txt" bis_skin_checked="1">COVID-19 Infection and Isolation, see details</div>

                    <div className="check-list" bis_skin_checked="1">
                        <img src="/assets/images/listing/shild.png" alt="shild" className="icon_image" />
                        <ul>
                            <li>Flight refund: <b>{refundAmount}</b></li>
                            <li>Home Emergency</li>
                            <li>Illness / Injury (including Covid-19)</li>
                            <li>Adverse Weather</li>
                            <li>Sickness, Accident and Injury</li>
                            <li>Private vehicle failure</li>
                            <li>Pre-existing Medical Condition</li>
                            <li>Public Transport Failure</li>
                            <li>Mechanical Breakdown</li>
                            <li className="moreList" style={{ display: "none" }}>
                                <ul>
                                    <li>Jury Service</li>
                                    <li>Death of Immediate Family</li>
                                    <li>Court Summons</li>
                                    <li>Theft of Documents</li>
                                    <li>Pregnancy Complication</li>
                                    <li>Scheduled airline failure</li>
                                    <li>Armed Forces &amp; Emergency Services Recall</li>
                                    <li>Flight disruption</li>
                                    <li>Relocated for Work</li>
                                    <li>Changes to Examination Dates</li>
                                </ul>
                            </li>
                            <li className="manymore">And Many More...</li>

                        </ul>
                    </div>

                    <div className="price" bis_skin_checked="1">
                        <span className="fraPrice">$11.97</span>
                        <small className="perperson">per person</small>
                    </div>

                    <div className="text-center" bis_skin_checked="1">
                        <button id="btnSelectfra_sss901" className="continue_btn" onClick={() => {
                            setIsRefundable(true);
                            handleCotnueViewDetail()
                        }}>Continue with Refundable Booking</button>
                    </div>
                </div>
            </div>
            {/* <!-- Refundable End here --> */}


            {/* <!-- Baggage Information Start here--> */}

            {/* <!--check baggage--> */}
            <div className="baggage_information-new" bis_skin_checked="1">
                <h4><img src="/assets/images/listing/baggage-icon.svg" alt="Baggage Information" className="baggage-icon" /> Baggage Information</h4>
                <div className="baggageBox" bis_skin_checked="1">
                    <div className="block w-100" bis_skin_checked="1">
                        <div className="head" bis_skin_checked="1">
                            <div className="air-name" bis_skin_checked="1"><img src={selectedFlight.itineraries[0].segments[0].airline.logo} /> {selectedFlight.itineraries[0].segments[0].airline.name} </div>
                        </div>
                        <div className="content" bis_skin_checked="1">
                            <ul>
                                <li>
                                    <div className="d-flex" bis_skin_checked="1">
                                        <div className="t-left" bis_skin_checked="1">
                                            <div className="baggageicons" bis_skin_checked="1"> <img src="/assets/images/svg/p-bag.svg" alt="" className="icons" /> </div>
                                            Personal Item
                                            <div className="light" bis_skin_checked="1"><div className="visible-xs" bis_skin_checked="1"> <strong></strong></div>  </div>

                                        </div>
                                        <div className="green t-right2 baggage_status" bis_skin_checked="1"><img src="/assets/images/svg/check.svg" alt="" /> Included</div>
                                        <div className="t-right" bis_skin_checked="1"> <strong></strong></div>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex" bis_skin_checked="1">
                                        <div className="t-left" bis_skin_checked="1">
                                            <div className="baggageicons" bis_skin_checked="1"> <img src="/assets/images/svg/c-bag.svg" alt="" className="icons" /> </div>
                                            Carry-on Bag
                                            <div className="light" bis_skin_checked="1"><div className="visible-xs" bis_skin_checked="1"> <strong></strong></div>  </div>

                                        </div>
                                        <div className="green t-right2 baggage_status" bis_skin_checked="1"><img src="/assets/images/svg/check.svg" alt="" /> Included</div>
                                        <div className="t-right" bis_skin_checked="1"> <strong></strong></div>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex" bis_skin_checked="1">
                                        <div className="t-left" bis_skin_checked="1">
                                            <div className="baggageicons" bis_skin_checked="1"> <img src="/assets/images/svg/b-bag.svg" alt="" className="icons" /> </div>
                                            Checked Bag
                                            <div className="light" bis_skin_checked="1"><div className="visible-xs" bis_skin_checked="1"> <strong>15K</strong></div>  </div>

                                        </div>
                                        <div className="green t-right2 baggage_status" bis_skin_checked="1"><img src="/assets/images/svg/check.svg" alt="" /> Included</div>
                                        <div className="t-right" bis_skin_checked="1"> <strong>15K</strong></div>
                                    </div>
                                </li>
                            </ul>
                            <p className="text" style={{ whiteSpace: "normal", marginBottom: 0, borderBottom: "none" }}>All prices are quoted in USD. Baggage allowance and fee amounts are not quaranteed and are subject to change by the airline. be sure to verify the actual fees with your airline(s) before you travel. </p>
                            <p className="text" style={{ whiteSpace: "normal", marginTop: 0 }}>
                                Confirm bag fees, weight and size restrictions with
                                <a href="http://www.airindia.in/checked-baggage-allowances.htm" rel="nofollow" target="_blank" className="ng-binding">{selectedFlight.itineraries[0].segments[0].airline.name}</a>&nbsp;<i className="fa fa-external-link" aria-hidden="true"></i>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        {/* <!--flight Leg End here --> */}
        <div className="popup-price-strip" bis_skin_checked="1">
            <div className="row" bis_skin_checked="1">
                <div className="col-xs-12" bis_skin_checked="1">
                    <div className="price-section pull-right" bis_skin_checked="1">
                        <button id="btnSelect_sss901" onClick={handleContinueClick}>
                            {loading ? "Loading..." : "Continue"}
                        </button>
                    </div>
                    <div className="price-section pull-left txt-left" bis_skin_checked="1">
                        <price style={{ cursor: "default" }}>
                            <div bis_skin_checked="1">
                                ${selectedFlight.travelerPricings[0].price.total}
                                <span className="per-person">
                                    (Per adult)

                                    <div bis_skin_checked="1"><b>${selectedFlight.price.total} One-way for {parseInt(travellerDetails.adults) + parseInt(travellerDetails.child) + parseInt(travellerDetails.infant)} travelers</b></div>
                                </span>
                                <div className="event_nobooking" bis_skin_checked="1"> NO BOOKING  <span className="fee">FEE</span></div>
                            </div>

                            {/* <!-- Affirm--> */}
                            <div className="affirm_text affirm_flap" style={{ display: "block" }} bis_skin_checked="1">
                                <spna className="afflop afffred_25400" amt="25400">or from <b>$23/mo</b></spna>
                                <div className="tooltip-custom" bis_skin_checked="1">
                                    <i className="fa fa-info hand"></i>
                                    <div className="promo-detail right_tooltip bottom_tooltip" bis_skin_checked="1">
                                        <div className="mb5px text-center" bis_skin_checked="1">
                                            <img className="easy-payment-logo" src="/assets/images/card-icon/affirm-logo.png" />
                                            <div className="textaffirm" bis_skin_checked="1"><strong>Buy now, pay over time</strong></div>
                                        </div>

                                        <ul className="affirm_list 25400_afffredul"><li>3 months  <div className="price" bis_skin_checked="1">$87</div></li><li>6 months <div className="price" bis_skin_checked="1">$44</div></li><li>12 months  <div className="price" bis_skin_checked="1">$23</div></li></ul>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Affirm--> */}
                        </price>
                        {/* <div className="usp-tabs">
                                    <ul>
                                        <li className="hidden-sm hidden-xs" style="cursor:pointer; border-right:0;"><a aria-hidden="truej" onClick="windjow.open('/assets/baggage-fees-info?airline=AI','_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=500,width=500,height=300');">Baggage Fees <i className="fa fa-suitcase"></i></a></li>
                                        <li className="visible-xs visible-sm" style="cursor:pointer; border-right:0;"><a onClick="Filter.getflightbaggage('AI')" data-toggle="modal" data-target="#baggage-fees-popup">Baggage Fees <i className="fa fa-suitcase"></i></a></li>
                                    </ul>
                                </div>
                                */}
                    </div>
                </div>
            </div>
        </div>

        {/* <!--Price End--> */}
        <div className="overlay" bis_skin_checked="1">
            <div className="seat-pitch-details" bis_skin_checked="1">
                <i className="fa fa-times-circle close-seat atpcolistclose" aria-hidden="true"></i>
                <div className="seatinfo_slider" bis_skin_checked="1">
                    <div className="slider-3" id="atpcoslider" style={{ paddingLeft: "10px" }} bis_skin_checked="1">
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default FlightDetail;