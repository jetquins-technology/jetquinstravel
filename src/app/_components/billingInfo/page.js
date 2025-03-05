'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Country, State, City } from "country-state-city"

const BillingInfo = ({ setBillingInfo, billingInfo, setCardDetails, cardDetails }) => {

    const [selectedCountry, setSelectedCountry] = useState('');
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [cities, setCities] = useState([]);

    const [year, setYears] = useState([]);
    const currentYear = new Date().getFullYear();
    const addressRef = useRef("");;
    const cityRef = useRef("");

    const postalCodeRef = useRef("");
    const debitCardRef = useRef(null);
    const creditCardRef = useRef(null);
    const cvcRef = useRef("");
    const cvvRef = useRef("");

    const cardnoRef = useRef("");
    const expmonthRef = useRef("");
    const expyearRef = useRef("");
    const cardholdernameRef = useRef("");

    const handleInputChange = (e) => {
        const { value } = e.target; // Get the value from the target element
        if (e.target === addressRef.current) {
            setBillingInfo((prevDetails) => ({
                ...prevDetails,
                address: value, // Update the cardType property
            }));
        } else if (e.target === cityRef.current) {
            setBillingInfo((prevDetails) => ({
                ...prevDetails,
                city: value, // Update the cardHolderName property
            }));
        } else if (e.target === postalCodeRef.current) {
            setBillingInfo((prevDetails) => ({
                ...prevDetails,
                postalCode: value, // Update the month property
            }));
        }
    };

    const handleCountryChange = (e) => {
        const countryCode = e.target.value;
        setBillingInfo((prevDetails) => ({
            ...prevDetails,
            country: countryCode, // Update the cardNo property
        }))
        setSelectedCountry(countryCode);
        setStates(State.getStatesOfCountry(countryCode));

    };

    const handleStateChange = (e) => {
        const stateCode = e.target.value;
        setBillingInfo((prevDetails) => ({
            ...prevDetails,
            state: stateCode, // Update the year property
        }));
        setSelectedState(stateCode);
        setCities(City.getCitiesOfState(selectedCountry, stateCode));
    };

    useEffect(() => {
        console.log("Saving billing details:", billingInfo);
    }, [billingInfo]);

    const handleInputChanges = (e) => {
        const { value } = e.target; // Get the value from the target element
        if (e.target === debitCardRef.current) {
            setCardDetails((prevDetails) => ({
                ...prevDetails,
                cardType: 'Debit', // Update card type to Debit
            }));
        } else if (e.target === creditCardRef.current) {
            setCardDetails((prevDetails) => ({
                ...prevDetails,
                cardType: 'Credit', // Update card type to Credit
            }));
        }
        else if (e.target === cardnoRef.current) {
            setCardDetails((prevDetails) => ({
                ...prevDetails,
                cardNo: value, // Update the cardNo property
            }));
        } else if (e.target === cardholdernameRef.current) {
            setCardDetails((prevDetails) => ({
                ...prevDetails,
                cardHolderName: value, // Update the cardHolderName property
            }));
        } else if (e.target === expmonthRef.current) {
            setCardDetails((prevDetails) => ({
                ...prevDetails,
                expiry: {
                    ...prevDetails.expiry,
                    month: value, // Update the month property
                },
            }));
        } else if (e.target === expyearRef.current) {
            setCardDetails((prevDetails) => ({
                ...prevDetails,
                expiry: {
                    ...prevDetails.expiry,
                    year: value, // Update the year property
                },
            }));
        } else if (e.target === cvvRef.current) {
            setCardDetails((prevDetails) => ({
                ...prevDetails,
                expiry: {
                    ...prevDetails.expiry,
                    cvv: value, // Update the cvv property
                },
            }));
        }
    };

    useEffect(() => {
        console.log("Saving card details:", cardDetails);
    }, [cardDetails]);

    useEffect(() => {
        const yearList = [];
        for (let i = 0; i < 12; i++) {
            yearList.push(currentYear + i);
        }
        setYears(yearList);
    }, [currentYear]);

    return (

        <>
            {/* For BIlling Deatils */}
            <div className="form-box" bis_skin_checked={1}>
                <div className="mainheading" bis_skin_checked={1}>
                    <img
                        src="/assets/images/svg/p-billing-information.svg"
                        className="icon billing-info"
                    />
                    Billing Information
                </div>
                <p>(As per Bank records or credit card company)</p>
                <div className="row">
                    <div className="col-sm-6 col-xs-12">
                        <input type="hidden" id="istf" name="istf" defaultValue={0} />
                        <label className="label_hide_mobile">
                            Select Country<span className="required">*</span>
                        </label>
                        <div className="form-righterrow">
                            <select
                                className="Payment"
                                data-val="true"
                                data-val-required="The Country field is required."
                                id="flightBookingRequest_Payment_Country"
                                name="flightBookingRequest.Payment.Country"
                                onChange={handleCountryChange}
                                value={selectedCountry}
                            >
                                <option value="">Select Country</option>
                                {Country.getAllCountries().map((country) => (
                                    <option key={country.isoCode} value={country.isoCode}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <span className="required_mobile">*</span>
                    </div>
                </div>
                <div className="row" bis_skin_checked={1}>
                    <div className="col-xs-12" bis_skin_checked={1}>
                        <label className="label_hide_mobile">
                            Address<span className="required">*</span>
                        </label>
                        <textarea
                            autoComplete="off"
                            className="Payment pac-target-input"
                            cols={20}
                            data-val="true"
                            data-val-required="The Address1 field is required."
                            id="flightBookingRequest_Payment_Address1"
                            maxLength={150}
                            name="flightBookingRequest.Payment.Address1"
                            placeholder="Address"
                            rows={2}
                            defaultValue={""}
                            ref={addressRef}
                            onChange={handleInputChange}
                        />
                        <span
                            className="field-validation-valid"
                            data-valmsg-for="flightBookingRequest.Payment.Address1"
                            data-valmsg-replace="true"
                        />
                        <span className="required_mobile">*</span>
                    </div>
                </div>
                <div className="row" bis_skin_checked={1}>
                    <div className="col-xs-12" bis_skin_checked={1}>
                        <div className="row" bis_skin_checked={1}>
                            <div
                                className="col-sm-4 col-xs-12"
                                id="ddlState"
                                bis_skin_checked={1}
                            >
                                <label className="label_hide_mobile">
                                    State/Province<span className="required">*</span>
                                </label>
                                <div className="form-righterrow">
                                    <select
                                        className="Payment"
                                        id="flightBookingRequest_Payment_State"
                                        name="flightBookingRequest.Payment.State"
                                        disabled={!selectedCountry}
                                        onChange={handleStateChange}
                                        value={selectedState}
                                    >
                                        <option value="">Select State</option>
                                        {states.map((state) => (
                                            <option key={state.isoCode} value={state.isoCode}>
                                                {state.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <span className="required_mobile">*</span>
                                {selectedCountry === 'US' && selectedState === 'NY' && (<div
                                    className="error_text"
                                    style={{
                                        display: "block",
                                        background: "#fff0e5",
                                        border: "1px solid #ff6e03",
                                        padding: "5px 5px 5px 27px",
                                        fontWeight: 500,
                                        fontSize: 12,
                                        position: "relative",
                                        margin: "-3px 0 15px 0"
                                    }}
                                    bis_skin_checked={1}
                                >
                                    <i
                                        className="fa fa-info-circle"
                                        aria-hidden="true"
                                        style={{
                                            fontSize: 19,
                                            position: "absolute",
                                            left: 5
                                        }}
                                    />
                                    Travel Protection is not available to residents of
                                    New York.
                                </div>
                                )}
                            </div>
                            <div
                                className="col-sm-4 col-xs-12"
                                style={{ display: "none" }}
                                id="txtState"
                                bis_skin_checked={1}
                            >
                                <label className="label_hide_mobile">
                                    State/Province
                                </label>
                                <input
                                    className="nonvalidateTxt"
                                    id="flightBookingRequest_Payment_State1"
                                    name="flightBookingRequest.Payment.State1"
                                    placeholder="State/Province"
                                    type="text"
                                    defaultValue=""
                                />
                            </div>
                            <div
                                className="col-sm-4 col-xs-12"
                                bis_skin_checked={1}
                            >
                                <label className="label_hide_mobile">
                                    City Town<span className="required">*</span>
                                </label>
                                <div className="form-righterrow">
                                    <select
                                        className="Payment"
                                        id="flightBookingRequest_Payment_City"
                                        name="flightBookingRequest.Payment.City"
                                        disabled={!selectedState}
                                        ref={cityRef}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select City</option>
                                        {cities.map((city) => (
                                            <option key={city.isoCode} value={city.isoCode}>
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <span className="required_mobile">*</span>
                            </div>
                            <div
                                className="col-sm-4 col-xs-12"
                                bis_skin_checked={1}
                            >
                                <label className="label_hide_mobile">
                                    Postal Code<span className="required">*</span>
                                </label>
                                <input
                                    autoComplete="off"
                                    className="Payment pincodeval"
                                    data-val="true"
                                    data-val-required="The PostalCode field is required."
                                    id="flightBookingRequest_Payment_PostalCode"
                                    maxLength={7}
                                    minLength={5}
                                    name="flightBookingRequest.Payment.PostalCode"
                                    placeholder="Postal Code"
                                    type="text"
                                    defaultValue=""
                                    ref={postalCodeRef}
                                    onChange={handleInputChange}
                                />
                                <span
                                    className="field-validation-valid"
                                    data-valmsg-for="flightBookingRequest.Payment.PostalCode"
                                    data-valmsg-replace="true"
                                />
                                <span className="required_mobile">*</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="imp-msg" bis_skin_checked={1} />
            </div>

            {/* For Payment Details */}
            <div className="form-box" bis_skin_checked={1}>
                <div className="mainheading" bis_skin_checked={1}>
                    <img
                        src="/assets/images/svg/p-payment-detail.svg"
                        className="icon payment-icon"
                    />
                    Payment Details
                </div>
                <p>
                    All card information is fully encrypted, secure and
                    protected.
                </p>
                <p id="paymess" style={{ color: "red", display: "none" }}>
                    please select payment method
                </p>
                <div className="row" bis_skin_checked={1}>
                    <div className="col-sm-12 col-xs-12 relative" bis_skin_checked={1}>
                        <div className="d-flex flex-wrap justify-content-between align-items-center">
                        </div>
                        {/* Debit Card Radio Button */}
                        <div className="inputSet paymentradio" bis_skin_checked={1}>
                            <img
                                className="debit-card-logo pull-right"
                                src="https://www.lookbyfare.com/us/images/card-icon/debitcard-blank.svg?v=1.2"
                                alt="Debit Card"
                            />
                            <label
                                className="pcc card_tab payment_tab"
                            >
                                <input
                                    type="radio"
                                    name="payment"   // Same 'payment' name ensures only one can be selected
                                    value="debit"    // Value indicating debit card
                                    ref={debitCardRef}
                                    checked={cardDetails.cardType === 'Debit'} // Check if Debit card is selected
                                    onChange={handleInputChanges}

                                />
                                <span>
                                    <b>Debit Card</b>
                                </span>
                            </label>
                        </div>

                        {/* Credit Card Radio Button */}
                        <div className="inputSet paymentradio" bis_skin_checked={1}>
                            <label
                                className="pcc card_tab payment_tab"
                            >
                                <input
                                    type="radio"
                                    name="payment"   // Same 'payment' name ensures only one can be selected
                                    value="credit"   // Value indicating credit card
                                    ref={creditCardRef}
                                    checked={cardDetails.cardType === 'Credit'} // Check if Credit card is selected
                                    onChange={handleInputChanges}
                                />
                                <span>
                                    <b>Credit Card</b>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                <div
                    className="row pay-with-cc"
                    style={{ display: "block" }}
                    bis_skin_checked={1}
                >
                    <div className="row" bis_skin_checked={1}>
                        <div
                            className="col-sm-6 col-sm-push-6 col-xs-12"
                            bis_skin_checked={1}
                        >
                            <div className="payment-method" bis_skin_checked={1}>
                                <span className="hidden-xs">

                                    Available payment methods
                                </span>
                                <img src="https://www.lookbyfare.com/us/images/payment/card-sprite.png?v=1.2" />
                            </div>
                        </div>
                        <div
                            className="col-sm-6 col-sm-pull-6 col-xs-12 data-hj-suppress"
                            bis_skin_checked={1}
                        >
                            <label className="label_hide_mobile">
                                Credit/Debit Card No
                                <span className="required">*</span>
                            </label>
                            <div
                                className="inbx-cc card-js relative"
                                bis_skin_checked={1}
                            >
                                <div
                                    className="card-number-wrapper"
                                    bis_skin_checked={1}
                                >
                                    <input
                                        autoComplete="off"
                                        className="card-number txtdgt numeric Payment "
                                        classval="data-numeric"
                                        data-val="true"
                                        data-val-required="The CardNumber field is required."
                                        id="flightBookingRequest_Payment_CardNumber"
                                        maxLength={19}
                                        minLength={16}
                                        name="flightBookingRequest.Payment.CardNumber"
                                        placeholder="Credit/Debit Card No"
                                        type="tel"
                                        defaultValue=""
                                        x-autocompletetype="cc-number"
                                        autocompletetype="cc-number"
                                        autoCorrect="off"
                                        spellCheck="off"
                                        autoCapitalize="off"
                                        ref={cardnoRef}
                                        onChange={handleInputChanges}
                                        value={cardDetails.cardNo}
                                    />
                                    <div
                                        className="card-type-icon"
                                        bis_skin_checked={1}
                                    ></div>
                                    <div className="icon" bis_skin_checked={1}>
                                        <svg
                                            version="1.1"
                                            id="Capa_1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            x="0px"
                                            y="3px"
                                            width="24px"
                                            height="17px"
                                            viewBox="0 0 216 146"
                                            enableBackground="new 0 0 216 146"
                                            xmlSpace="preserve"
                                        >
                                            <g>
                                                <path
                                                    className="svg"
                                                    d="M182.385,14.258c-2.553-2.553-5.621-3.829-9.205-3.829H42.821c-3.585,0-6.653,1.276-9.207,3.829c-2.553,2.553-3.829,5.621-3.829,9.206v99.071c0,3.585,1.276,6.654,3.829,9.207c2.554,2.553,5.622,3.829,9.207,3.829H173.18c3.584,0,6.652-1.276,9.205-3.829s3.83-5.622,3.83-9.207V23.464C186.215,19.879,184.938,16.811,182.385,14.258z M175.785,122.536c0,0.707-0.258,1.317-0.773,1.834c-0.516,0.515-1.127,0.772-1.832,0.772H42.821c-0.706,0-1.317-0.258-1.833-0.773c-0.516-0.518-0.774-1.127-0.774-1.834V73h135.571V122.536z M175.785,41.713H40.214v-18.25c0-0.706,0.257-1.316,0.774-1.833c0.516-0.515,1.127-0.773,1.833-0.773H173.18c0.705,0,1.316,0.257,1.832,0.773c0.516,0.517,0.773,1.127,0.773,1.833V41.713z"
                                                />
                                                <rect
                                                    className="svg"
                                                    x="50.643"
                                                    y="104.285"
                                                    width="20.857"
                                                    height="10.429"
                                                ></rect>
                                                <rect
                                                    className="svg"
                                                    x="81.929"
                                                    y="104.285"
                                                    width="31.286"
                                                    height="10.429"
                                                />
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                                <div
                                    className="expiry-container"
                                    bis_skin_checked={1}
                                >
                                    <div
                                        className="expiry-wrapper"
                                        bis_skin_checked={1}
                                    >
                                        <div bis_skin_checked={1}>
                                            <input
                                                className="expiry"
                                                placeholder="MM / YY"
                                                type="tel"
                                                maxLength={7}
                                                x-autocompletetype="cc-exp"
                                                autocompletetype="cc-exp"
                                                autoCorrect="off"
                                                spellCheck="off"
                                                autoCapitalize="off"

                                            />
                                            <input className="expiry-month" type="hidden" />
                                            <input className="expiry-year" type="hidden" />
                                        </div>
                                        <div className="icon" bis_skin_checked={1}>
                                            <svg
                                                version="1.1"
                                                id="Capa_1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                x="0px"
                                                y="4px"
                                                width="24px"
                                                height="16px"
                                                viewBox="0 0 216 146"
                                                enableBackground="new 0 0 216 146"
                                                xmlSpace="preserve"
                                            >
                                                <path
                                                    className="svg"
                                                    d="M172.691,23.953c-2.062-2.064-4.508-3.096-7.332-3.096h-10.428v-7.822c0-3.584-1.277-6.653-3.83-9.206c-2.554-2.553-5.621-3.83-9.207-3.83h-5.213c-3.586,0-6.654,1.277-9.207,3.83c-2.554,2.553-3.83,5.622-3.83,9.206v7.822H92.359v-7.822c0-3.584-1.277-6.653-3.83-9.206c-2.553-2.553-5.622-3.83-9.207-3.83h-5.214c-3.585,0-6.654,1.277-9.207,3.83c-2.553,2.553-3.83,5.622-3.83,9.206v7.822H50.643c-2.825,0-5.269,1.032-7.333,3.096s-3.096,4.509-3.096,7.333v104.287c0,2.823,1.032,5.267,3.096,7.332c2.064,2.064,4.508,3.096,7.333,3.096h114.714c2.824,0,5.27-1.032,7.332-3.096c2.064-2.064,3.096-4.509,3.096-7.332V31.286C175.785,28.461,174.754,26.017,172.691,23.953z M134.073,13.036c0-0.761,0.243-1.386,0.731-1.874c0.488-0.488,1.113-0.733,1.875-0.733h5.213c0.762,0,1.385,0.244,1.875,0.733c0.488,0.489,0.732,1.114,0.732,1.874V36.5c0,0.761-0.244,1.385-0.732,1.874c-0.49,0.488-1.113,0.733-1.875,0.733h-5.213c-0.762,0-1.387-0.244-1.875-0.733s-0.731-1.113-0.731-1.874V13.036z M71.501,13.036c0-0.761,0.244-1.386,0.733-1.874c0.489-0.488,1.113-0.733,1.874-0.733h5.214c0.761,0,1.386,0.244,1.874,0.733c0.488,0.489,0.733,1.114,0.733,1.874V36.5c0,0.761-0.244,1.386-0.733,1.874c-0.489,0.488-1.113,0.733-1.874,0.733h-5.214c-0.761,0-1.386-0.244-1.874-0.733c-0.488-0.489-0.733-1.113-0.733-1.874V13.036z M165.357,135.572H50.643V52.143h114.714V135.572z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="cvc-container" bis_skin_checked={1}>
                                    <div className="cvc-wrapper" bis_skin_checked={1}>
                                        <input
                                            className="cvc"
                                            placeholder="CVC"
                                            type="tel"
                                            maxLength={3}
                                            x-autocompletetype="cc-csc"
                                            autocompletetype="cc-csc"
                                            autoCorrect="off"
                                            spellCheck="off"
                                            autoCapitalize="off"
                                            ref={cvcRef}
                                        />
                                        <div className="icon" bis_skin_checked={1}>
                                            <svg
                                                version="1.1"
                                                id="Capa_1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                x="0px"
                                                y="3px"
                                                width="24px"
                                                height="17px"
                                                viewBox="0 0 216 146"
                                                enableBackground="new 0 0 216 146"
                                                xmlSpace="preserve"
                                            >
                                                <path
                                                    className="svg"
                                                    d="M152.646,70.067c-1.521-1.521-3.367-2.281-5.541-2.281H144.5V52.142c0-9.994-3.585-18.575-10.754-25.745c-7.17-7.17-15.751-10.755-25.746-10.755s-18.577,3.585-25.746,10.755C75.084,33.567,71.5,42.148,71.5,52.142v15.644h-2.607c-2.172,0-4.019,0.76-5.54,2.281c-1.521,1.52-2.281,3.367-2.281,5.541v46.929c0,2.172,0.76,4.019,2.281,5.54c1.521,1.52,3.368,2.281,5.54,2.281h78.214c2.174,0,4.02-0.76,5.541-2.281c1.52-1.521,2.281-3.368,2.281-5.54V75.607C154.93,73.435,154.168,71.588,152.646,70.067z M128.857,67.786H87.143V52.142c0-5.757,2.037-10.673,6.111-14.746c4.074-4.074,8.989-6.11,14.747-6.11s10.673,2.036,14.746,6.11c4.073,4.073,6.11,8.989,6.11,14.746V67.786z"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input
                            id="flightBookingRequest_Payment_CardCode"
                            name="flightBookingRequest.Payment.CardCode"
                            type="hidden"
                            defaultValue=""
                        />
                        <input
                            id="flightBookingRequest_Payment_MaskCardNumber"
                            name="flightBookingRequest.Payment.MaskCardNumber"
                            type="hidden"
                            defaultValue=""
                        />
                        <input type="hidden" defaultValue="" id="cardNo" />
                    </div>
                    <div className="row" bis_skin_checked={1}>
                        <div className="col-sm-6 col-xs-12" bis_skin_checked={1}>
                            <label className="label_hide_mobile">
                                Card holder's name<span className="required">*</span>
                            </label>
                            <div bis_skin_checked={1}>
                                <input
                                    autoComplete="off"
                                    className="alphanumeric esname Payment "
                                    data-val="true"
                                    data-val-required="The CardHolderName field is required."
                                    id="flightBookingRequest_Payment_CardHolderName"
                                    maxLength={50}
                                    minLength={2}
                                    name="flightBookingRequest.Payment.CardHolderName"
                                    placeholder="Card holder's name"
                                    type="text"
                                    defaultValue=""
                                    ref={cardholdernameRef}
                                    onChange={handleInputChanges}
                                />
                                <span
                                    className="field-validation-valid"
                                    data-valmsg-for="flightBookingRequest.Payment.CardHolderName"
                                    data-valmsg-replace="true"
                                />
                            </div>
                        </div>
                        <div className="col-sm-6 hidden-xs" bis_skin_checked={1}>
                            <a
                                onclick="window.open('https://www.jetquins travels.com/us/security-metrices-certificate.pdf?v5', 'info', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=900,height=600, screenX=100,screenY=50')"
                                href={""}
                            >
                                <img
                                    src="https://www.lookbyfare.com/us/images/footer/security-metrices-blue.svg"
                                    style={{ verticalAlign: "middle", marginTop: 30 }}
                                />
                            </a>
                        </div>
                    </div>
                    <div className="row" bis_skin_checked={1}>
                        <div className="col-sm-6 col-xs-12" bis_skin_checked={1}>
                            <div className="row" bis_skin_checked={1}>
                                <div
                                    className="col-sm-4 col-xs-4"
                                    bis_skin_checked={1}
                                >
                                    <label>

                                        Exp. Month<span className="required">*</span>
                                    </label>
                                    <div
                                        className="form-righterrow"
                                        bis_skin_checked={1}
                                    >
                                        <select
                                            className="Payment"
                                            data-val="true"
                                            data-val-required="The ExpiryMonth field is required."
                                            id="flightBookingRequest_Payment_ExpiryMonth"
                                            name="flightBookingRequest.Payment.ExpiryMonth"
                                            ref={expmonthRef}
                                            value={cardDetails.expiry.month}
                                            onChange={handleInputChanges}
                                        >
                                            <option value="">Select</option>
                                            {Array.from({ length: 12 }, (_, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    {String(i + 1).padStart(2, '0')}-{new Date(0, i).toLocaleString('default', { month: 'short' })}
                                                </option>
                                            ))}
                                        </select>
                                        <span
                                            className="field-validation-valid"
                                            data-valmsg-for="flightBookingRequest.Payment.ExpiryMonth"
                                            data-valmsg-replace="true"
                                        />
                                    </div>
                                </div>
                                <div
                                    className="col-sm-4 col-xs-4"
                                    bis_skin_checked={1}
                                >
                                    <label>
                                        Exp. Year<span className="required">*</span>
                                    </label>
                                    <div className="form-righterrow">
                                        <select
                                            className="Payment"
                                            id="flightBookingRequest_Payment_ExpiryYear"
                                            name="flightBookingRequest.Payment.ExpiryYear"
                                            defaultValue=""
                                            ref={expyearRef}
                                            value={cardDetails.expiry.year}
                                            onChange={handleInputChanges}
                                        >
                                            <option value="">Select</option>
                                            {year.map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                        <span
                                            className="field-validation-valid"
                                            data-valmsg-for="flightBookingRequest.Payment.ExpiryYear"
                                            data-valmsg-replace="true"
                                        />
                                    </div>
                                </div>
                                <div
                                    className="col-sm-4 col-xs-4"
                                    bis_skin_checked={1}
                                >
                                    <label>
                                        CVV<span className="required">*</span>
                                    </label>
                                    <input
                                        autoComplete="off"
                                        className="numeric Payment numbersOnly "
                                        data-val="true"
                                        data-val-required="The CvvNo field is required."
                                        id="flightBookingRequest_Payment_CvvNo"
                                        maxLength={4}
                                        minLength={3}
                                        name="flightBookingRequest.Payment.CvvNo"
                                        type="password"
                                        defaultValue=""
                                        ref={cvvRef}
                                        value={cardDetails.expiry.cvv}
                                        onChange={handleInputChanges}
                                    />
                                    <span
                                        className="field-validation-valid"
                                        data-valmsg-for="flightBookingRequest.Payment.CvvNo"
                                        data-valmsg-replace="true"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xs-12" bis_skin_checked={1}>
                            <div
                                className="cvv-txt"
                                id="three"
                                bis_skin_checked={1}
                            >
                                <img src="https://www.lookbyfare.com/us/images/payment/cvv.png" />
                                <span> 3 Digit number from your card</span>
                                <span className="cardImg hidden-xs" />
                            </div>
                            <div
                                className="cvv-txt"
                                style={{ display: "none" }}
                                id="Four"
                                bis_skin_checked={1}
                            >
                                <img src="https://www.lookbyfare.com/us/images/payment/cvv.png" />
                                <span> 4 Digit number from your card</span>
                                <span className="cardImg hidden-xs" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-bottom" />

                <div className="norton-block" bis_skin_checked={1}>
                    <a
                        className="visible-xs"
                        onclick="window.open('https://www.jetquins travels.com/us/security-metrices-certificate.pdf?v5', 'info', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=900,height=600, screenX=100,screenY=50')"
                        href={""}
                    >
                        <img
                            src="https://www.lookbyfare.com/us/images/footer/security-metrices-blue.svg"
                            style={{ verticalAlign: "middle" }}
                            className="godaddy"
                        />
                    </a>
                    {/* <span className="digicert-logo">
                        <div
                            id="DigiCertClickID_7dlUvcGZpayment"
                            bis_skin_checked={1}
                        >
                            <div
                                id="DigiCertClickID_7dlUvcGZpaymentSeal"
                                bis_skin_checked={1}
                                style={{
                                    textDecoration: "none",
                                    textAlign: "center",
                                    display: "block",
                                    verticalAlign: "baseline",
                                    fontSize: "100%",
                                    fontStyle: "normal",
                                    textIndent: 0,
                                    lineHeight: 1,
                                    width: "auto",
                                    margin: "0px auto",
                                    padding: 0,
                                    border: 0,
                                    background: "transparent",
                                    position: "relative",
                                    inset: 0,
                                    clear: "both",
                                    float: "none",
                                    cursor: "default"
                                }}
                            >
                                <object
                                    id="DigiCertClickID_7dlUvcGZpayment_object"
                                    type="image/svg+xml"
                                    data="//seal.digicert.com/seals/cascade/?tag=7dlUvcGZ&referer=www.jetquins travels.com&format=svg&an=min"
                                    role="link"
                                    style={{
                                        textDecoration: "none",
                                        textAlign: "center",
                                        display: "block",
                                        verticalAlign: "baseline",
                                        fontSize: "100%",
                                        fontStyle: "normal",
                                        textIndent: 0,
                                        lineHeight: 1,
                                        width: "auto",
                                        margin: "0px auto",
                                        padding: 0,
                                        border: 0,
                                        background: "transparent",
                                        position: "relative",
                                        inset: 0,
                                        clear: "both",
                                        float: "none",
                                        cursor: "pointer"
                                    }}
                                />
                            </div>
                        </div>
                    </span> */}
                    <img
                        src="https://www.lookbyfare.com/us/images/payment/godaddy.png"
                        className="godaddy"
                    />
                </div>
            </div>
        </>
    )
}

export default BillingInfo;