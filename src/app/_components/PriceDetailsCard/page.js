'use client';
const PriceDetails = ({ onClose }) => {

    return (
        <>
            <div
                id="_flight-details"
                className="flight-details collapse"
                style={{ display: "block", height: "100% !important" }}
            >
                {" "}
                <button
                    onClick={onClose}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'black',
                        fontSize: '20px',
                        cursor: 'pointer'
                    }}
                >
                    X
                </button>
                <div>
                    {/* Nav tabs */}
                    <div className="leg-top-fix">
                        <div className="detail-head">
                            <a
                                className="close-btn"
                                onclick="hideFlightDetail('sss901')"
                                href="javascript:void(0);"
                            >
                                <img src="/us/images/uc/cancel.svg" alt="" />
                            </a>
                        </div>
                        <ul className="flight-leg-tab" role="tablist">
                            <li role="presentation" className="active deptab">
                                <a
                                    href="#"
                                    onclick="flightdetailAction(0)"
                                    aria-controls="Departure"
                                    role="tab"
                                    data-toggle="tab"
                                >
                                    <i className="fa fa-plane" style={{ transform: "rotate(45deg)" }} />{" "}
                                    Departure
                                </a>
                            </li>
                            <li role="presentation" className="rettab">
                                <a
                                    href="#"
                                    onclick="flightdetailAction(1)"
                                    aria-controls="return"
                                    role="tab"
                                    data-toggle="tab"
                                >
                                    <i
                                        className="fa fa-plane"
                                        style={{ transform: "rotate(225deg)" }}
                                    />{" "}
                                    Return
                                </a>
                            </li>
                            {/*<li role="presentation" class="pricetab"><a href="#" onclick="flightdetailAction(2)" aria-controls="price" role="tab" data-toggle="tab"><i class="fa fa-file-text" aria-hidden="true"></i> Fare Breakup</a></li>*/}
                        </ul>
                    </div>
                    {/* flight leg Start here  */}
                    <div className="flight-leg-info">
                        {/* Depart Start here*/}
                        <div className="flight__content-box" id="deptab">
                            {/*Repeat block Start here */}
                            <div className="flight-details-segment">
                                {/*Depart block Start here */}
                                <div className="flight-schedule flight_departure">
                                    <div className="flight_scheduleTime">
                                        <strong>08:00 PM</strong>
                                        <div className="date ">23 Oct</div>
                                    </div>
                                    <div className="flight_scheduleStops-circle" />
                                    <div className="flight_scheduleLocation">
                                        <div className="city highlight">Ontario</div>
                                        <div className="airportname">Ontario International (ONT), US</div>
                                    </div>
                                </div>
                                {/* End here*/}
                                {/*Trip time */}
                                <div className="flight_detailsInfoTravel">
                                    <div className="flight_stopIntervalSeparator" />
                                    <div className="flight-travel-details">
                                        <div className="airlines-details">
                                            <div className="right" style={{ marginBottom: 10 }}>
                                                <div className="air-name">
                                                    <img
                                                        src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png"
                                                        alt="FRONTIER AIRLINES"
                                                    />
                                                    Frontier Airlines - F9 4206
                                                    <br />
                                                    <span className="text-gray">
                                                        Cabin :{" "}
                                                        <span className="cabin_Out " id="cabin_Out_0">
                                                            Economy
                                                        </span>
                                                        <div className="flight-info flap-info-devider">
                                                            Aircraft : 32N
                                                            <span className="tooltip-custom">
                                                                <i className="fa fa-info hand" />
                                                                <div className="promo-detail right_tooltip">
                                                                    <p className="mb5px">
                                                                        32N AIRBUS A320NEO 165-194 STD Seats
                                                                    </p>
                                                                </div>
                                                            </span>
                                                        </div>
                                                        <div></div>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="clearfix" />
                                        </div>
                                        <div
                                            className="seat-pitch"
                                            id="ONT-LAS-F9-4206-20241023-ECON"
                                            style={{ display: "none" }}
                                        ></div>
                                    </div>
                                    <div className="clearfix" />
                                </div>
                                {/*Trip time */}
                                {/*arrival block Start here */}
                                <div className="flight-schedule flight_arrival">
                                    <div className="flight_scheduleTime">
                                        <strong>09:10 PM</strong>
                                        <div className="date">23 Oct</div>
                                    </div>
                                    <div className="flight_scheduleStops-circle" />
                                    <div className="flight_scheduleLocation">
                                        <div className="city">Las Vegas</div>
                                        <div className="airportname">
                                            Harry Reid International (LAS), US
                                        </div>
                                    </div>
                                    <div className="clearfix" />
                                </div>
                                {/* End here*/}
                            </div>
                            {/*Repeat block Start here */}
                            <div className="total-trip-time">
                                <i className="fa fa-clock-o" /> Departure Trip Time: <b>1h 10m</b>
                            </div>
                        </div>
                        <div
                            className="flight__content-box"
                            id="rettab"
                            style={{ display: "none" }}
                        >
                            {/*Repeat block Start here */}
                            <div className="flight-details-segment">
                                {/*Depart block Start here */}
                                <div className="flight-schedule flight_departure">
                                    <div className="flight_scheduleTime">
                                        <strong>06:00 AM</strong>
                                        <div className="date ">24 Oct</div>
                                    </div>
                                    <div className="flight_scheduleStops-circle" />
                                    <div className="flight_scheduleLocation">
                                        <div className="city">Las Vegas</div>
                                        <div className="airportname">
                                            Harry Reid International (LAS), US
                                        </div>
                                    </div>
                                </div>
                                {/* End here*/}
                                {/*Trip time */}
                                <div className="flight_detailsInfoTravel">
                                    <div className="flight_stopIntervalSeparator" />
                                    <div className="flight-travel-details">
                                        <div className="airlines-details">
                                            <div className="right" style={{ marginBottom: 10 }}>
                                                <div className="air-name">
                                                    <img
                                                        src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png"
                                                        alt="FRONTIER AIRLINES"
                                                    />
                                                    Frontier Airlines - F9 1283
                                                    <br />
                                                    <span className="text-gray">
                                                        Cabin :{" "}
                                                        <span className="cabin_Out " id="cabin_Out_1">
                                                            Economy
                                                        </span>
                                                        <div className="flight-info flap-info-devider">
                                                            Aircraft : 32N
                                                            <span className="tooltip-custom">
                                                                <i className="fa fa-info hand" />
                                                                <div className="promo-detail right_tooltip">
                                                                    <p className="mb5px">
                                                                        32N AIRBUS A320NEO 165-194 STD Seats
                                                                    </p>
                                                                </div>
                                                            </span>
                                                        </div>
                                                        <div></div>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="clearfix" />
                                        </div>
                                        <div
                                            className="seat-pitch"
                                            id="LAS-ONT-F9-1283-20241024-ECON"
                                            style={{ display: "none" }}
                                        ></div>
                                    </div>
                                    <div className="clearfix" />
                                </div>
                                {/*Trip time */}
                                {/*arrival block Start here */}
                                <div className="flight-schedule flight_arrival">
                                    <div className="flight_scheduleTime">
                                        <strong>07:08 AM</strong>
                                        <div className="date">24 Oct</div>
                                    </div>
                                    <div className="flight_scheduleStops-circle" />
                                    <div className="flight_scheduleLocation">
                                        <div className="city highlight">Ontario</div>
                                        <div className="airportname">Ontario International (ONT), US</div>
                                    </div>
                                    <div className="clearfix" />
                                </div>
                                {/* End here*/}
                            </div>
                            <div className="total-trip-time">
                                <i className="fa fa-clock-o" /> Return Trip Time: <b>1h 8m</b>
                            </div>
                        </div>
                        {/* Depart End here*/}
                        <div
                            className="flight__content-box fare-breakup breakup_tab"
                            id="pricetab"
                            style={{ display: "none" }}
                        >
                            {/*Adult Section*/}
                            <div className="fare-section">
                                <div className="line2">
                                    <a className="main blue">
                                        <span>$73.95</span>
                                        <b>1 Adult(s)</b>
                                    </a>
                                </div>
                                <div className="line taxes-fees">
                                    <p>
                                        <span>$40.35</span>
                                        <b>Per adult Base fare</b>
                                    </p>
                                    <p>
                                        <span>$33.60</span>
                                        <b>Per adult Taxes &amp; Fee</b>
                                    </p>
                                </div>
                            </div>
                            <div className="total-price">
                                <span>
                                    <b>$73.95</b>
                                </span>
                                <b>Total</b>
                            </div>
                        </div>
                        {/* Refundable Start here */}
                        {/* Refundable Booking Start here */}
                        <div className="refundableBox">
                            <h4>
                                <img
                                    src="/us/images/listing/rp-icon.svg"
                                    alt="Refundable"
                                    className="rp-icon"
                                />{" "}
                                Refundable Booking
                            </h4>
                            <div className="refundable_inner">
                                {/*<div class="refund-subtital">Choose Refundable Booking and receive a flight refund <b>($73.95)</b> even <b>up to 60 days</b> after you missed the flight and can <b>provide evidence</b> for one of the many reasons including:</div>*/}
                                <div className="refund-subtital">
                                    Upgrade your booking and receive a <b>100% refund</b> if you cannot
                                    attend and can evidence one of the many reasons in our{" "}
                                    <a
                                        onclick="window.open('https://www.refundable.me/extended/en/', 'info', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=800,height=600, screenX=50,screenY=50')"
                                        href="javascript: void(0);"
                                        className="text-link"
                                        style={{ color: "#1a58c4" }}
                                    >
                                        Terms &amp; Conditions
                                    </a>
                                    , which you accept when you select a Refundable Booking.
                                </div>
                                <div className="covid-txt">
                                    COVID-19 Infection and Isolation,{" "}
                                    <a
                                        onclick="window.open('https://www.refundable.me/covid/', 'info', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=800,height=600, screenX=50,screenY=50')"
                                        href="javascript: void(0);"
                                        className="text-link"
                                    >
                                        see details
                                    </a>
                                </div>
                                <div className="check-list">
                                    <img
                                        src="/us/images/listing/shild.png"
                                        alt="shild"
                                        className="icon_image"
                                    />
                                    <ul>
                                        <li>
                                            Flight refund: <b>($73.95)</b>
                                        </li>
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
                                <div className="price">
                                    <span className="fraPrice">$11.09</span>
                                    <small className="perperson">per person</small>
                                </div>
                                <div className="text-center">
                                    <button
                                        id="btnSelectfra_sss901"
                                        className="continue_btn"
                                        onclick="$('#div_gotopayment').show();Filter.submitbut('sss901',1)"
                                    >
                                        Continue with Refundable Booking
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Refundable End here */}
                        {/* Baggage Information Start here*/}
                        {/*check baggage*/}
                        <div className="baggage_information-new">
                            <h4>
                                <img
                                    src="/us/images/listing/baggage-icon.svg"
                                    alt="Baggage Information"
                                    className="baggage-icon"
                                />{" "}
                                Baggage Information
                            </h4>
                            <div className="baggageBox">
                                <div className="block w-100">
                                    <div className="head">
                                        <div className="air-name">
                                            <img src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/f9.png" />{" "}
                                            Frontier Airlines{" "}
                                        </div>
                                    </div>
                                    <div className="content">
                                        <ul>
                                            <li>
                                                <div className="d-flex">
                                                    <div className="t-left">
                                                        <div className="baggageicons">
                                                            {" "}
                                                            <img
                                                                src="/us/images/svg/p-bag.svg"
                                                                alt=""
                                                                className="icons"
                                                            />{" "}
                                                        </div>
                                                        Personal Item
                                                        <div className="light"> Must Fit Under the Seat </div>
                                                    </div>
                                                    <div className="green t-right2 baggage_status">
                                                        <img src="/us/images/svg/check.svg" alt="" /> Included
                                                    </div>
                                                    <div className="t-right">
                                                        {" "}
                                                        <strong />
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d-flex">
                                                    <div className="t-left">
                                                        <div className="baggageicons">
                                                            {" "}
                                                            <img
                                                                src="/us/images/svg/c-bag.svg"
                                                                alt=""
                                                                className="icons"
                                                            />{" "}
                                                        </div>
                                                        Carry-on Bag
                                                        <div className="light"> Upto 35 lbs </div>
                                                    </div>
                                                    <div className="black t-right2 baggage_status blue_text">
                                                        <img src="/us/images/svg/baggage-chargable.svg" alt="" />{" "}
                                                        79.00
                                                    </div>
                                                    <div className="t-right">
                                                        {" "}
                                                        <strong>Upto 35 lbs</strong>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d-flex">
                                                    <div className="t-left">
                                                        <div className="baggageicons">
                                                            {" "}
                                                            <img
                                                                src="/us/images/svg/b-bag.svg"
                                                                alt=""
                                                                className="icons"
                                                            />{" "}
                                                        </div>
                                                        Checked Bag
                                                        <div className="light"> Upto 40 lbs </div>
                                                    </div>
                                                    <div className="black t-right2 baggage_status blue_text">
                                                        <img src="/us/images/svg/baggage-chargable.svg" alt="" />{" "}
                                                        73.00
                                                    </div>
                                                    <div className="t-right">
                                                        {" "}
                                                        <strong>Upto 40 lbs</strong>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                        <p
                                            className="text"
                                            style={{
                                                whiteSpace: "normal",
                                                marginBottom: 0,
                                                borderBottom: "none"
                                            }}
                                        >
                                            All prices are quoted in USD. Baggage allowance and fee amounts
                                            are not quaranteed and are subject to change by the airline. be
                                            sure to verify the actual fees with your airline(s) before you
                                            travel.{" "}
                                        </p>
                                        <p
                                            className="text"
                                            style={{ whiteSpace: "normal", marginTop: 0 }}
                                        >
                                            Confirm bag fees, weight and size restrictions with
                                            <a
                                                href="https://www.flyfrontier.com/travel/travel-info/bag-options/"
                                                rel="nofollow"
                                                target="_blank"
                                                className="ng-binding"
                                            >
                                                Frontier
                                            </a>
                                            &nbsp;
                                            <i className="fa fa-external-link" aria-hidden="true" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Baggage Information End here*/}
                        {/* Refundable End here */}
                    </div>
                    {/*flight Leg End here */}
                    <div className="popup-price-strip">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="price-section pull-right">
                                    <button
                                        id="btnSelect_sss901"
                                        onclick="$('#div_gotopayment').show();Filter.submitbut('sss901',0)"
                                    >
                                        Continue
                                    </button>
                                </div>
                                <div className="price-section pull-left txt-left">
                                    <price style={{ cursor: "default" }}>
                                        <div>
                                            $73.95
                                            <span className="per-person">(Total price)</span>
                                        </div>
                                        {/* Affirm*/}
                                        {/* Affirm*/}
                                    </price>
                                    {/*
                      <div class="usp-tabs">
                          <ul>
                              <li class="hidden-sm hidden-xs" style="cursor:pointer; border-right:0;"><a aria-hidden="true" onclick="window.open('/us/baggage-fees-info?airline=F9','_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=500,width=500,height=300');">Baggage Fees <i class="fa fa-suitcase"></i></a></li>
                              <li class="visible-xs visible-sm" style="cursor:pointer; border-right:0;"><a onclick="Filter.getflightbaggage('F9')" data-toggle="modal" data-target="#baggage-fees-popup">Baggage Fees <i class="fa fa-suitcase"></i></a></li>
                          </ul>
                      </div>
                          */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Price End*/}
                </div>
                <div className="overlay">
                    <div className="seat-pitch-details">
                        <i
                            className="fa fa-times-circle close-seat atpcolistclose"
                            aria-hidden="true"
                        />
                        <div className="seatinfo_slider">
                            <div
                                className="slider-3"
                                id="atpcoslider"
                                style={{ paddingLeft: 10 }}
                            ></div>
                        </div>
                    </div>
                </div>
                <style
                    dangerouslySetInnerHTML={{
                        __html:
                            "\n@media (max-width: 767px)\n{.flight-details .popup-price-strip { position:fixed; bottom:0;   margin: 0;\n    width: 100%;\n    padding: 0 10px 10px;\n    left: 0;\n}}\n"
                    }}
                />
            </div>

        </>
    )
}

export default PriceDetails;