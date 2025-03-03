"use client";

const FlightSearchMobile = () => {
    return (
        <section className="airlineSrchW bannerInner">
            <div className="numbers">
                <link href="assets/Content/css/m.lightpick.css?v=RUS2021" rel="stylesheet" />
                {/* <link
                    href="/bundles/US_mobilehotelcss?v=D5kGZF0-EfG2ZGUlC_qi6vWM1FZ81W3Xv_diatA6Se81"
                    rel="stylesheet"
                /> */}
                {/* Search Widget */}
                <section className="search-widget">
                    <div className="container">
                        <div className="topbuttons">
                            {/* <a
                                id="vacationtablink"
                                href="javascript:void(0)"
                                onclick="OpenTab('VacationTab')"
                            >
                                <span>
                                    <img src="/Content/images/v1.png" />
                                </span>
                                Vacations
                            </a> */}
                            <a
                                id="flighttablink"
                                href="javascript:void(0)"
                                className="active"
                                onclick="OpenTab('FlightTab')"
                            >
                                <span>
                                    <img src="/Content/images/v2.png" />
                                </span>
                                flights
                            </a>
                            {/* <a
                                id="hoteltablink"
                                href="javascript:void(0)"
                                onclick="OpenTab('HotelTab')"
                            >
                                <span>
                                    <img src="/Content/images/v3.png" />
                                </span>
                                Hotels
                            </a> */}
                        </div>
                        <div className="widgettab">
                            <div
                                className="vacationtab"
                                id="Vacations"
                                style={{ display: "none" }}
                            >
                                <link
                                    href="/bundles/US_mobilehotelcss?v=D5kGZF0-EfG2ZGUlC_qi6vWM1FZ81W3Xv_diatA6Se81"
                                    rel="stylesheet"
                                />
                                <form id="formVacationSearch">
                                    <input
                                        name="FlightUniqueId"
                                        type="hidden"
                                        id="hdnVacationGuid"
                                        defaultValue="4bf186e8-ac59-4687-b8e3-bd257d0347bf"
                                    />
                                    {/* Search box */}
                                    <div className="f-tabs lsn">
                                        <div className="From searchSec">
                                            <div id="pac-card">
                                                <span>From</span>
                                                <div className="SearchOverlay txtOriginCodeOverlay">
                                                    <h4 className="g-orange">
                                                        Origin
                                                        <a href="javascript:;" className="close-ol">
                                                            x
                                                        </a>
                                                    </h4>
                                                    <input
                                                        id="txtHolidayOriginCode"
                                                        type="text"
                                                        className="ui-autocomplete-input"
                                                        autoComplete="off"
                                                        onkeypress="return isCharWithSpaceHyphen(event)"
                                                        defaultValue=""
                                                        required=""
                                                        placeholder="Enter Origin City / Airport"
                                                    />
                                                    <i
                                                        className="fa fa-times-circle demo-label"
                                                        style={{ display: "none" }}
                                                    />
                                                </div>
                                                <input
                                                    type="text"
                                                    className="txtHolidayOriginCode"
                                                    defaultValue=""
                                                    autoComplete="off"
                                                    required=""
                                                    placeholder="Departure"
                                                />
                                                <input
                                                    name="OriginCode"
                                                    type="hidden"
                                                    id="hdnHolidayOriginCode"
                                                />
                                                <span
                                                    id="spanHolidayOriginCityName"
                                                    style={{ display: "none" }}
                                                    className="spanCity"
                                                >
                                                    City Name
                                                </span>
                                                <span
                                                    id="spnHolidayOriginErrMsg"
                                                    className="error-message"
                                                    style={{ display: "none" }}
                                                >
                                                    Please select departure
                                                </span>
                                            </div>
                                        </div>
                                        <div className="From searchSec">
                                            <div id="pac-card">
                                                <span>Going To</span>
                                                <div className="SearchOverlay txtDestCodeOverlay">
                                                    <h4 className="g-orange">
                                                        Destination
                                                        <a href="javascript:;" className="close-ol">
                                                            x
                                                        </a>
                                                    </h4>
                                                    <input
                                                        id="txtHolidayDestCode"
                                                        type="text"
                                                        className="ui-autocomplete-input"
                                                        autoComplete="off"
                                                        onkeypress="return isCharWithSpaceHyphen(event)"
                                                        defaultValue=""
                                                        required=""
                                                        placeholder="Enter Destination City / Airport"
                                                    />
                                                    <i
                                                        className="fa fa-times-circle demo-label"
                                                        style={{ display: "none" }}
                                                    />
                                                </div>
                                                <input
                                                    type="text"
                                                    className="txtHolidayDestCode"
                                                    defaultValue=""
                                                    autoComplete="off"
                                                    required=""
                                                    placeholder="Destination"
                                                />
                                                <input
                                                    name="DestinationCode"
                                                    type="hidden"
                                                    id="hdnHolidayDestinationCode"
                                                />
                                                <span
                                                    id="spanHolidayDestCityName"
                                                    style={{ display: "none" }}
                                                    className="spanCity"
                                                />
                                                <span
                                                    id="spnHolidayDestErrMsg"
                                                    className="error-message"
                                                    style={{ display: "none" }}
                                                >
                                                    Please select destination
                                                </span>
                                            </div>
                                        </div>
                                        {/* date */}
                                        {/* End date From */}
                                    </div>
                                    <div className="f-tabs dte">
                                        <div className="date searchSec" id="divHotelCheckInSecton">
                                            {/* date To */}
                                            <div className="Date">
                                                <span>Check In</span>
                                                <input
                                                    type="text"
                                                    id="tbVacationCheckIn"
                                                    name="DepDate"
                                                    className="date"
                                                    placeholder="Select"
                                                    readOnly="readonly"
                                                />
                                                <div
                                                    id="spnVacationCheckInDateErrMsg"
                                                    className="errorMsg"
                                                    style={{ display: "none" }}
                                                >
                                                    Select check-in date
                                                </div>
                                            </div>
                                            {/* End date To */}
                                            {/* date From */}
                                            <div className="Date" style={{ display: "none" }}>
                                                <span>Check-out</span>
                                                <input
                                                    type="text"
                                                    id="tbVacationCheckOut"
                                                    name="RetDate"
                                                    className="date"
                                                    placeholder="Select"
                                                    readOnly="readonly"
                                                />
                                                <p style={{ display: "none" }}>
                                                    <span className="date" id="tbVacationCheckOut_MMM">
                                                        DATE
                                                    </span>
                                                    <span
                                                        className="date"
                                                        id="tbVacationCheckOut_DD"
                                                        style={{ display: "none" }}
                                                    />
                                                </p>
                                                <span id="tbVacationCheckOut_DAY" />
                                                <span
                                                    id="tbVacationCheckOut_YYYY"
                                                    style={{ display: "none" }}
                                                />
                                                <div
                                                    id="spnVacationCheckOutDateErrMsg"
                                                    className="errorMsg"
                                                    style={{ display: "none" }}
                                                >
                                                    Select check-out date
                                                </div>
                                            </div>
                                        </div>
                                        <div className="From searchSec no-day">
                                            <span>Duration</span>
                                            <p className="night-stay">1 Night</p>
                                            <div className="night-popup">
                                                <ul>
                                                    <li className="hdngs">Duration</li>
                                                    <li className="nightday1 active">
                                                        <span>1 Night</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday2">
                                                        <span>2 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday3">
                                                        <span>3 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday4">
                                                        <span>4 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday5">
                                                        <span>5 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday6">
                                                        <span>6 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday7">
                                                        <span>7 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday8">
                                                        <span>8 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday9">
                                                        <span>9 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday10">
                                                        <span>10 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday11">
                                                        <span>11 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday12">
                                                        <span>12 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday13">
                                                        <span>13 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday14">
                                                        <span>14 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday15">
                                                        <span>15 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday16">
                                                        <span>16 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday17">
                                                        <span>17 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday18">
                                                        <span>18 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday19">
                                                        <span>19 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday20">
                                                        <span>20 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday21">
                                                        <span>21 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday22">
                                                        <span>22 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday23">
                                                        <span>23 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday24">
                                                        <span>24 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday25">
                                                        <span>25 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday26">
                                                        <span>26 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday27">
                                                        <span>27 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday28">
                                                        <span>28 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday29">
                                                        <span>29 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                    <li className="nightday30">
                                                        <span>30 Nights</span>
                                                        <span className="sel" />
                                                    </li>
                                                </ul>
                                                <input
                                                    id="hdnNightDuration"
                                                    defaultValue={1}
                                                    type="hidden"
                                                    name="Duration"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="searchSec roomselect">
                                        <span>Rooms &amp; Guests</span>
                                        <input
                                            type="text"
                                            id="totalVacationpersonH"
                                            onclick="return OpenVacationRoomGuestBox()"
                                            name="HotelRoomPaxInfo"
                                            className=""
                                            placeholder="1 Room, 2 Adults, 0 Child"
                                            readOnly=""
                                            defaultValue="1 ROOM , 2 ADULTS, 0 CHILD"
                                        />
                                    </div>
                                    {/*Dropdown*/}
                                    <input
                                        type="hidden"
                                        name="NumberOfRooms"
                                        id="hdnVacationRoomCount"
                                        defaultValue={1}
                                    />
                                    <div
                                        className="hotelvacationguestdrop"
                                        style={{ display: "none" }}
                                    >
                                        <div className="roomvacation-slct" id="divVacationRoom_1">
                                            <h3 className="g-vacation-orange">Room 1</h3>
                                            {/* adult */}
                                            <div className="box">
                                                <label>
                                                    Adult <small>18y+</small>
                                                </label>
                                                <div className="bunch">
                                                    <span
                                                        onclick="AddVacationSubtract(1, '-','ADT')"
                                                        className="minus increment"
                                                    >
                                                        -
                                                    </span>
                                                    <input
                                                        type="text"
                                                        id="txtVacationAdultCount_1"
                                                        className="cls_Vacation_RoomAdultCount"
                                                        name="RoomAdultCount"
                                                        readOnly="readonly"
                                                        size={10}
                                                        defaultValue={2}
                                                    />
                                                    <span
                                                        onclick="AddVacationSubtract(1, '+', 'ADT')"
                                                        className="plus increment"
                                                    >
                                                        +
                                                    </span>
                                                </div>
                                            </div>
                                            {/*End adult */}
                                            {/* Children */}
                                            <div className="box">
                                                <label>
                                                    Children <small>(12 years or below)</small>
                                                </label>
                                                <div className="bunch">
                                                    <span
                                                        onclick="AddVacationSubtract(1, '-', 'CHD')"
                                                        className="minus increment"
                                                    >
                                                        -
                                                    </span>
                                                    <input
                                                        type="text"
                                                        id="txtVacationChildCount_1"
                                                        className="cls_Vacation_RoomChildCount"
                                                        name="RoomChildCount"
                                                        readOnly="readonly"
                                                        size={10}
                                                        defaultValue={0}
                                                    />
                                                    <span
                                                        onclick="AddVacationSubtract(1, '+', 'CHD')"
                                                        className="plus increment"
                                                    >
                                                        +
                                                    </span>
                                                </div>
                                            </div>
                                            {/*End Children */}
                                            {/* Child 1 Age */}
                                            <div
                                                id="divVacationChildAgeBox1_1"
                                                className="box age2"
                                                style={{ display: "none" }}
                                            >
                                                <label>
                                                    1<sup>st</sup> Child Age
                                                </label>
                                                <div className="bunch">
                                                    <span
                                                        onclick="AddVacationSubtract(1, '-', 'AGE1')"
                                                        className="minus increment"
                                                    >
                                                        -
                                                    </span>
                                                    <input
                                                        type="text"
                                                        id="txtVacationChildAge1_1"
                                                        className="cls_Vacation_RoomChildAge1"
                                                        name="RoomChildAge1"
                                                        readOnly="readonly"
                                                        size={10}
                                                        defaultValue={1}
                                                    />
                                                    <span
                                                        onclick="AddVacationSubtract(1, '+', 'AGE1')"
                                                        className="plus increment"
                                                    >
                                                        +
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                id="divVacationChildAgeBox2_1"
                                                className="box"
                                                style={{ display: "none" }}
                                            >
                                                <label>
                                                    2<sup>nd</sup> Child Age
                                                </label>
                                                <div className="bunch">
                                                    <span
                                                        onclick="AddVacationSubtract(1, '-', 'AGE2')"
                                                        className="minus increment"
                                                    >
                                                        -
                                                    </span>
                                                    <input
                                                        type="text"
                                                        id="txtVacationChildAge2_1"
                                                        className="cls_Vacation_RoomChildAge2"
                                                        name="RoomChildAge2"
                                                        readOnly="readonly"
                                                        size={10}
                                                        defaultValue={1}
                                                    />
                                                    <span
                                                        onclick="AddVacationSubtract(1, '+', 'AGE2')"
                                                        className="plus increment"
                                                    >
                                                        +
                                                    </span>
                                                </div>
                                            </div>
                                            {/*End Children */}
                                        </div>
                                        {/* add more room button */}
                                        <div className="btsmoreroom">
                                            <a href="javascript:;" onclick="AddVacationRooms()">
                                                +ADD ROOM
                                            </a>
                                            <div className="btsy">
                                                <button
                                                    type="button"
                                                    onclick="return HideRoomGuestBox()"
                                                    className="g-orange"
                                                >
                                                    DONE
                                                </button>
                                            </div>
                                        </div>
                                        {/* End add more room button */}
                                    </div>
                                    {/*Close Dropdown */}
                                    {/* End Search box */}
                                    <div className="smbtbtn">
                                        <button
                                            type="button"
                                            className=""
                                            id="btnSearchVacationHotels"
                                            value="Search Now"
                                            onclick="return SearchHotelFaresNew()"
                                        >
                                            Get Quote
                                        </button>
                                    </div>
                                </form>
                                {/* New Calander */}
                                <div className="calanderoverly-vacation">
                                    <h4 className="g-orange">
                                        <span>When are you departing?</span>
                                        <a
                                            href="javascript:;"
                                            onclick="CloseVacationCalenderOverlay()"
                                            className="close-o-vacationl"
                                        >
                                            x
                                        </a>
                                    </h4>
                                    <div className="seletDate-Wrap">
                                        <div
                                            className="departs_vacation_wrap"
                                            onclick="departVacationWrapperClick()"
                                            style={{ display: "none" }}
                                        >
                                            <span className="f13">Check-In</span>
                                            <span className="selectDates-Txt">
                                                <span
                                                    className="txt-date"
                                                    id="spanDepartDateVacationCaption"
                                                >
                                                    Select Date
                                                </span>
                                                <span
                                                    className="datevalue"
                                                    id="spanDepartDateVacationValue"
                                                >
                                                    <strong id="spanDepartDateVacationValue_DD">25</strong>
                                                    <span>
                                                        <sub id="spanDepartDateVacationValue_MMM">Feb</sub>
                                                        <sup id="spanDepartDateVacationValue_DAY">Thu</sup>
                                                    </span>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* End New Calander */}
                            </div>
                            <div
                                className="flighttab hide active"
                                id="Flights"
                                style={{ display: "block" }}
                            >
                                <form id="formFlightSearchEngine">
                                    <div className="selectflighttype">
                                        <ul>
                                            <li
                                                className="active"
                                                id="T_RT"
                                                onclick="ShowHideSearchEngineTab('RT')"
                                                href="javascript:void(0)"
                                            >
                                                ROUND-TRIP
                                            </li>
                                            <li
                                                id="T_OW"
                                                onclick="ShowHideSearchEngineTab('OW')"
                                                href="javascript:void(0)"
                                            >
                                                ONE-WAY
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="widget-form" id="Tp_roundtrip">
                                        <input
                                            name="Direct"
                                            type="hidden"
                                            id="hdnDirectIndirect"
                                            defaultValue="off"
                                        />
                                        <input
                                            name="Airline"
                                            type="hidden"
                                            id="hdnAirlineCode"
                                            defaultValue="All"
                                        />
                                        <input
                                            name="FlightUniqueId"
                                            type="hidden"
                                            id="hdnFlightUniqueCode"
                                            defaultValue="c52d4aea-7245-4fb0-a957-d23efb4cb22f"
                                        />
                                        <input
                                            name="MCSector_2"
                                            type="hidden"
                                            id="hdnMC_Sec_2"
                                            defaultValue=""
                                        />
                                        <input
                                            name="TripType"
                                            type="hidden"
                                            id="hdnTripTypeCode"
                                            defaultValue={1}
                                        />
                                        <div className="f-tabs lsn">
                                            <div className="searchSec">
                                                <span>From</span>
                                                <div className="SearchOverlay txtOriginCodeOverlay">
                                                    <h4 className="g-orange">
                                                        Origin
                                                        <a href="javascript:;" className="close-ol">
                                                            x
                                                        </a>
                                                    </h4>
                                                    <input
                                                        id="txtOriginCode"
                                                        type="text"
                                                        className="ui-autocomplete-input"
                                                        autoComplete="off"
                                                        onkeypress="return isCharWithSpaceHyphen(event)"
                                                        defaultValue=""
                                                        required=""
                                                        placeholder="Enter Origin City / Airport"
                                                    />
                                                    <i
                                                        className="fa fa-times-circle demo-label"
                                                        style={{ display: "none" }}
                                                    />
                                                </div>
                                                <input
                                                    type="text"
                                                    className="txtOriginCode"
                                                    defaultValue=""
                                                    autoComplete="off"
                                                    required=""
                                                    placeholder="Airport"
                                                />
                                                <input name="OriginCode" type="hidden" id="hdnOriginCode" />
                                                <span
                                                    id="spanOriginCityName"
                                                    style={{ display: "none" }}
                                                    className="spanCity"
                                                />
                                                <span
                                                    id="spnOriginErrMsg"
                                                    className="error-message"
                                                    style={{ display: "none" }}
                                                >
                                                    Please select origin
                                                </span>
                                            </div>
                                            <div className="full searchSec">
                                                <span>To</span>
                                                <div className="SearchOverlay txtDestCodeOverlay">
                                                    <h4 className="g-orange">
                                                        Destination
                                                        <a href="javascript:;" className="close-ol">
                                                            x
                                                        </a>
                                                    </h4>
                                                    <input
                                                        id="txtDestCode"
                                                        type="text"
                                                        className="ui-autocomplete-input"
                                                        autoComplete="off"
                                                        onkeypress="return isCharWithSpaceHyphen(event)"
                                                        defaultValue=""
                                                        required=""
                                                        placeholder="Enter Destination City / Airport"
                                                    />
                                                    <i
                                                        className="fa fa-times-circle demo-label"
                                                        style={{ display: "none" }}
                                                    />
                                                </div>
                                                <input
                                                    type="text"
                                                    className="txtDestCode"
                                                    defaultValue=""
                                                    autoComplete="off"
                                                    required=""
                                                    placeholder="Airport"
                                                />
                                                <input
                                                    name="DestinationCode"
                                                    type="hidden"
                                                    id="hdnDestinationCode"
                                                />
                                                <span
                                                    id="spanDestCityName"
                                                    style={{ display: "none" }}
                                                    className="spanCity"
                                                />
                                                <span
                                                    id="spnDestErrMsg"
                                                    className="error-message"
                                                    style={{ display: "none" }}
                                                >
                                                    Please select destination
                                                </span>
                                            </div>
                                        </div>
                                        {/*DATE Start*/}
                                        <div className="f-tabs dte">
                                            <div className="searchSec Date" id="divDepartSecton">
                                                <span>Depart</span>
                                                <input
                                                    type="text"
                                                    id="txtDepartDate"
                                                    name="DepDate"
                                                    className="date"
                                                    placeholder="Select"
                                                    readOnly="readonly"
                                                />
                                                <span
                                                    id="spnDepDateErrMsg"
                                                    className="error-message"
                                                    style={{ display: "none" }}
                                                >
                                                    Select depart date
                                                </span>
                                                <span
                                                    id="txtDepartDate_DAY"
                                                    style={{ display: "none" }}
                                                    className="dd"
                                                >
                                                    Day
                                                </span>
                                            </div>
                                            <div
                                                className="searchSec Date"
                                                id="divReturnSection"
                                                style={{ display: "inline" }}
                                            >
                                                <span>Return</span>
                                                <input
                                                    type="text"
                                                    id="txtReturnDate"
                                                    name="RetDate"
                                                    className="date"
                                                    placeholder="Select"
                                                    readOnly="readonly"
                                                />
                                                <span
                                                    id="spnRetDateErrMsg"
                                                    className="error-message"
                                                    style={{ display: "none" }}
                                                >
                                                    Select return date
                                                </span>
                                                <span
                                                    id="txtReturnDate_DAY"
                                                    style={{ display: "none" }}
                                                    className="dd"
                                                >
                                                    Day
                                                </span>
                                            </div>
                                        </div>
                                        <div className="f-tabs clspsgr">
                                            <div className="travel searchSec">
                                                <span>Travelers</span>
                                                <div className="traveldetails">
                                                    <div>
                                                        <p id="txtPassengersAdt">01</p>
                                                        <p id="txtPassengersChd">00</p>
                                                        <p id="txtPassengersIns">00</p>
                                                        <p id="txtPassengersInl">00</p>
                                                    </div>
                                                    <div>
                                                        <small>Adult</small>
                                                        <small>Child</small>
                                                        <small>
                                                            INF<span>(on seat)</span>
                                                        </small>
                                                        <small>
                                                            INF<span>(on lap)</span>
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="searchSec classP">
                                                <span>Class</span>
                                                <p id="txtClassType">Coach</p>
                                            </div>
                                        </div>
                                        <div className="smbtbtn">
                                            <button
                                                type="button"
                                                style={{ display: "none" }}
                                                className=""
                                                id="BtnSearchFare_RTOW_Deal"
                                            >
                                                Search Now
                                            </button>
                                            <button type="button" className="" id="BtnSearchFare_RTOW">
                                                Search Flights
                                            </button>
                                        </div>
                                    </div>
                                    <span className="advance ">
                                        <a
                                            className="lnk_RUHUS_advanceSearch"
                                            href="javascript:void(0);"
                                        >
                                            Advanced Search (+)
                                        </a>
                                    </span>
                                    <span className="Mumnr">
                                        <a
                                            href="javascript:;"
                                            style={{ color: "#000" }}
                                            className="lnkUMNR_RUHUS"
                                        >
                                            Unaccompanied Minor
                                        </a>
                                    </span>
                                    <div className="advance_ruhus_SearchHolder">
                                        <ul>
                                            <li>
                                                <input
                                                    id="txt_RUHUS_PreferredAirlines"
                                                    type="text"
                                                    autoComplete="off"
                                                    onkeypress="return OnlyCharNumberKey(event)"
                                                    required=""
                                                    placeholder="Preferred Airline"
                                                    name="PreferredAirlineName"
                                                />
                                                <input
                                                    name="PreferredAirline"
                                                    type="hidden"
                                                    id="hdn_RUHUS_PreferredAirline"
                                                />
                                            </li>
                                            <li>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        id="chk_RUHUS_DirectFlight"
                                                        onclick="Check_RUHUS_DirectFlight()"
                                                        defaultValue="Direct"
                                                    />{" "}
                                                    <span> Non-Stop</span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                    <div
                                        className="widget-form"
                                        id="Tp_multicity"
                                        style={{ display: "none" }}
                                    ></div>
                                    <div className="" id="divUnaccompaniedMinorPopup">
                                        <a className="linkUnaccompaniedMinorClose">x</a>
                                        <div>
                                            Flight tickets for an unaccompanied minor are not available
                                            online. To book a flight for a UMNR, directly reach out to our
                                            experts at{" "}
                                            <strong style={{ fontWeight: "bold" }}>1-347-899-9715</strong>
                                            . For more details,{" "}
                                            <a href="/unaccompanied-minor">READ HERE</a>.
                                        </div>
                                    </div>
                                    {/*Passenger-*/}
                                    <div
                                        id="divPassengerDDL"
                                        className="overhdng pasenger-popup"
                                        style={{ display: "none" }}
                                    >
                                        <h4 className="g-orange">Select Travelers</h4>
                                        <div className="">
                                            <div className="divPassengerPanel">
                                                <div className="divPassenger">
                                                    <div className="divPassengerType">
                                                        <p>Adult</p>
                                                        <span>(18+ yrs)</span>
                                                    </div>
                                                    <div className="divPassengerCount">
                                                        <div className="Add_Less_Passenger">
                                                            <div className="MinusPassenger">
                                                                <input
                                                                    type="button"
                                                                    defaultValue="-"
                                                                    className="MinusPassengerBox"
                                                                    field="quantity"
                                                                    onclick="UpdatePassengerCount(2,'ADT',1)"
                                                                />
                                                            </div>
                                                            <div className="PassengerCount">
                                                                <input
                                                                    type="text"
                                                                    defaultValue={1}
                                                                    className="CountPassengerBox"
                                                                    name="AdultPaxCount"
                                                                    id="txtAdultPassenger"
                                                                    readOnly=""
                                                                />
                                                            </div>
                                                            <div className="PlusPassenger">
                                                                <input
                                                                    type="button"
                                                                    defaultValue="+"
                                                                    className="PlusPassengerBox"
                                                                    field="quantity"
                                                                    onclick="UpdatePassengerCount(1,'ADT',1)"
                                                                />
                                                            </div>
                                                            <div className="ClearPassengerCount" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="divPassenger">
                                                    <div className="divPassengerType">
                                                        <p>Children</p>
                                                        <span>(2 - 11 yrs)</span>
                                                    </div>
                                                    <div className="divPassengerCount">
                                                        <div className="Add_Less_Passenger">
                                                            <div className="MinusPassenger">
                                                                <input
                                                                    type="button"
                                                                    defaultValue="-"
                                                                    className="MinusPassengerBox"
                                                                    field="quantity"
                                                                    onclick="UpdatePassengerCount(2,'CHD',1)"
                                                                />
                                                            </div>
                                                            <div className="PassengerCount">
                                                                <input
                                                                    type="text"
                                                                    defaultValue={0}
                                                                    className="CountPassengerBox"
                                                                    name="ChildPaxCount"
                                                                    paxtype="CHD"
                                                                    id="txtChildPassenger"
                                                                    readOnly=""
                                                                />
                                                            </div>
                                                            <div className="PlusPassenger">
                                                                <input
                                                                    type="button"
                                                                    defaultValue="+"
                                                                    className="PlusPassengerBox"
                                                                    field="quantity"
                                                                    onclick="UpdatePassengerCount(1,'CHD',1)"
                                                                />
                                                            </div>
                                                            <div className="ClearPassengerCount" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="divPassenger">
                                                    <div className="divPassengerType">
                                                        <p>Infant (on lap)</p>
                                                        <span>(Below 2 yrs)</span>
                                                    </div>
                                                    <div className="divPassengerCount">
                                                        <div className="Add_Less_Passenger">
                                                            <div className="MinusPassenger">
                                                                <input
                                                                    type="button"
                                                                    defaultValue="-"
                                                                    className="MinusPassengerBox"
                                                                    field="quantity"
                                                                    onclick="UpdatePassengerCount(2,'INFL',1)"
                                                                />
                                                            </div>
                                                            <div className="PassengerCount">
                                                                <input
                                                                    type="text"
                                                                    defaultValue={0}
                                                                    className="CountPassengerBox"
                                                                    name="InfantLapPaxCount"
                                                                    paxtype="INF"
                                                                    id="txtInfantPassenger"
                                                                    readOnly=""
                                                                />
                                                            </div>
                                                            <div className="PlusPassenger">
                                                                <input
                                                                    type="button"
                                                                    defaultValue="+"
                                                                    className="PlusPassengerBox"
                                                                    field="quantity"
                                                                    onclick="UpdatePassengerCount(1,'INFL',1)"
                                                                />
                                                            </div>
                                                            <div className="ClearPassengerCount" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="divPassenger">
                                                    <div className="divPassengerType">
                                                        <p>Infant (on seat)</p>
                                                        <span>(Below 2 yrs)</span>
                                                    </div>
                                                    <div className="divPassengerCount">
                                                        <div className="Add_Less_Passenger">
                                                            <div className="MinusPassenger">
                                                                <input
                                                                    type="button"
                                                                    defaultValue="-"
                                                                    className="MinusPassengerBox"
                                                                    field="quantity"
                                                                    onclick="UpdatePassengerCount(2,'INFS',1)"
                                                                />
                                                            </div>
                                                            <div className="PassengerCount">
                                                                <input
                                                                    type="text"
                                                                    defaultValue={0}
                                                                    className="CountPassengerBox"
                                                                    name="InfantSeatPaxCount"
                                                                    paxtype="INFS"
                                                                    id="txtInfantSeatPassenger"
                                                                    readOnly=""
                                                                />
                                                            </div>
                                                            <div className="PlusPassenger">
                                                                <input
                                                                    type="button"
                                                                    defaultValue="+"
                                                                    className="PlusPassengerBox"
                                                                    field="quantity"
                                                                    onclick="UpdatePassengerCount(1,'INFS',1)"
                                                                />
                                                            </div>
                                                            <div className="ClearPassengerCount" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="btsy">
                                                <a className="g-orange" id="btnPassengerDone">
                                                    Done
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    {/*End passenger*/}
                                    {/*Class*/}
                                    <div
                                        id="divClassTypeDDL"
                                        className="pasenger-popup overhdng class-mpopup"
                                        style={{ display: "none" }}
                                    >
                                        <h4 className="g-orange">Class</h4>
                                        <div className="pnlInner">
                                            <div className="divClassTypePanel">
                                                <select
                                                    name="CabinClass"
                                                    id="LstCabinClass"
                                                    style={{ display: "none" }}
                                                >
                                                    <option value={1} selected="">
                                                        Coach
                                                    </option>
                                                    <option value={2}>Premium Economy</option>
                                                    <option value={3}>Business Class</option>
                                                    <option value={4}>First Class</option>
                                                </select>
                                                <div className="pnlInner">
                                                    <ul>
                                                        <li id="rdoCabin1" className="active">
                                                            <span>Coach</span> <span className="act1" />
                                                        </li>
                                                        <li id="rdoCabin2">
                                                            <span>Premium Economy</span> <span className="" />
                                                        </li>
                                                        <li id="rdoCabin3">
                                                            <span>Business Class</span> <span className="" />
                                                        </li>
                                                        <li id="rdoCabin4">
                                                            <span>First Class</span> <span className="" />
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="btsy">
                                                <a className="g-orange" id="btnClassTypeDone">
                                                    Done
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    {/*End Class*/}
                                </form>
                                {/* New Calander */}
                                <div className="calanderoverly">
                                    <h4 className="g-orange">
                                        <span>When are you departing?</span>
                                        <a
                                            href="javascript:;"
                                            onclick="CloseFlightCalenderOverlay()"
                                            className="close-ol-flight"
                                        >
                                            x
                                        </a>
                                    </h4>
                                    <div className="seletDate-Wrap">
                                        <div className="departs__wrap" onclick="departWrapperClick()">
                                            <span className="f13">Depart</span>
                                            <span className="selectDates-Txt">
                                                <span className="txt-date" id="spanDepartDateCaption">
                                                    Select Date
                                                </span>
                                                <span className="datevalue" id="spanDepartDateValue">
                                                    <strong id="spanDepartDateValue_DD">25</strong>
                                                    <span>
                                                        <sub id="spanDepartDateValue_MMM">Feb</sub>
                                                        <sup id="spanDepartDateValue_DAY">Thu</sup>
                                                    </span>
                                                </span>
                                            </span>
                                        </div>
                                        <div className="returns__wrap" onclick="returnWrapperClick()">
                                            <span className="f13">Return</span>
                                            <span className="selectDates-Txt">
                                                <span className="txt-date" id="spanReturnDateCaption">
                                                    Date
                                                </span>
                                                <span className="datevalue" id="spanReturnDateValue">
                                                    <strong id="spanReturnDateValue_DD">25</strong>
                                                    <span>
                                                        <sub id="spanReturnDateValue_MMM">Feb</sub>
                                                        <sup id="spanReturnDateValue_DAY">Thu</sup>
                                                    </span>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* End New Calander */}
                            </div>
                            <div
                                className="hoteltab hide"
                                id="hotel-tab"
                                style={{ display: "none" }}
                            ></div>
                        </div>
                    </div>
                </section>
                {/* End Search Widget */}
            </div>
        </section>

    )
}

export default FlightSearchMobile;