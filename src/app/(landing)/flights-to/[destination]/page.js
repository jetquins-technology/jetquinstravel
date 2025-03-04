"use client"

import { useEffect, useState, useRef } from "react";
import Script from "next/script";
import FlightSearch from "@/app/_components/FlightSearch/page";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import TopDestinationCard from "@/app/_components/TopDestinationCard/page";
import TopDestinationsArr from "@/assets/top_destination.json";
import TopFlightDestinationCard from "@/app/_components/TopFlightDestinationCard/page";
import TopFlightDestinationArr from "@/assets/top_flight_destination.json"

const settings = {
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


const DestinationPage = () => {

    const params = useParams();
    const searchParams = useSearchParams();
    const name = searchParams.get("destName");
    // console.log(name, "RandomImages");
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            if (name) {
                const response = await fetch(`https://api.unsplash.com/search/photos?query=${name}&per_page=10&page=1&client_id=_-08EnQEYpar-C7rgJZV_ZSS74a46hdw6C_exxUO41Y`);
                const data = await response.json();
                setPhotos(data.results);
            }
        };

        fetchPhotos();
    }, [name]);

    console.log(photos, "All Photos");


    // Randomly select a background image from the fetched photos
    const randomBackgroundImage = photos.length > 0 ? photos[Math.floor(Math.random() * photos.length)].urls.full : '';

    console.log(randomBackgroundImage, "RandomPhotos");


    return (
        <>
            <div className="body-content">
                <div className="information_popup hidden-xs" style={{ display: "none" }}>
                    <a href="javascript:void(0);" className="information_close-popup"></a>
                    <div className="logo-center hidden-xs">
                        <img src="/assets/images/home/privacy-icon.png" />
                    </div>
                    <div className="logo-center visible-xs">
                        <img src="/assets/images/home/privacy-icon-xs.png" />
                    </div>
                    <h3>Your data is safe with Jetquin Travels.com</h3>
                    <ul>
                        <li>
                            <span className="number">1.</span>We restrict sharing of your information.
                        </li>
                        <li>
                            <span className="number">2.</span>We do not use your personal information
                            for any promotional activity.
                        </li>
                    </ul>
                </div>

                <Script
                    dangerouslySetInnerHTML={`//$(document).ready(function(){
                      //	$('.information_close-popup').click(function(){
                      //		$('.information_popup').hide();
                      //	});
                      //});
  
  
                      $(document).ready(function () {
                          document.documentElement.classNameList.add('cooke');
  
                          var showMsg = "";
                          if (commonSetting.local_storage == 1) {
                              showMsg = localStorage.getItem('showpMsg');
                          }
  
                          if (showMsg !== 'false') {
                              // $('.information_popup').show();
                          }
                          $('.information_close-popup').on('click', function () {
                              $('.information_popup').fadeOut('slow');
                              if (commonSetting.local_storage == 1) {
                                  localStorage.setItem('showpMsg', 'false');
                              }
  
                          });
                      });`}
                />
                <Script
                    dangerouslySetInnerHTML={`
                  function showModal(id, id1) {
                      $('html,body').animate({
                          scrollTop: $("#" + id).offset().top - 50
                      },
                          'slow');
      }
                  $(document).ready(function () {
          var pgurl = window.location.pathname;
          if (pgurl != null && pgurl.toLowerCase().indexOf('home') > 0) {
                      //mixpanel.track("home_event");
                  }
      });
              `}
                />

                <div className="main-engine-wrapper " style={{
                    backgroundImage: `url(${randomBackgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '600px',
                }}>
                    <div className="container hidden-xs">
                        <div
                            className="engine-label"
                            style={{ textAlign: "left", color: "#fff", marginTop: "30px" }}
                        >
                            <h1
                                style={{
                                    fontWeight: 700,
                                    marginBottom: "0px",
                                    fontSize: "24px",
                                    textShadow: "0px 0px 3px black"
                                }}
                            >
                                {name ? `Flights to ${name}` : "Cheap Air Tickets & Airline Reservations Online"}
                            </h1>
                            <span
                                style={{
                                    fontSize: "16px",
                                    fontWeight: 700,
                                    marginTop: "10px",
                                    textShadow: "0px 0px 3px black"
                                }}
                            >
                                Search and Compare our best deals with over 550+ airlines - Book
                                now!
                            </span>
                        </div>
                    </div>
                    <div className="main-search-engine home_event_h">
                        <div className="container">
                            <div className="engine-tabs">
                                <ul>
                                    <li
                                        id="flightTab"
                                        className="engin-tab active"
                                        onclick="clickEngineShow('flightEngineId','flightTab');"
                                    >
                                        <i className="fa fa-plane" aria-hidden="true"></i> Flights
                                    </li>
                                    {/* <li
                                        id="carTab"
                                        className="engin-tab"
                                        onclick="clickEngineShow('carEngineId','carTab');"
                                    >
                                        <i className="fa fa-car" aria-hidden="true"></i> Cars
                                    </li> */}
                                    {/* <li
                                        id="hotelTab"
                                        className="engin-tab"
                                        onclick="clickEngineShow('hotelEngineId','hotelTab');"
                                    >
                                        <i className="fa fa-building" aria-hidden="true"></i> Hotels
                                    </li> */}
                                    {/* <li
                                        id="cruiseTab"
                                        className="engin-tab"
                                        onclick="clickEngineShow('cruiseEngineId','cruiseTab');"
                                    >
                                        <i className="cruise_icon"></i>
                                        Cruise
                                    </li> */}
                                </ul>
                            </div>
                            <div className="common_searchCntr">
                                <section id="flightEngineId">
                                    <FlightSearch selectedDes={params.destination !== "" ? params.destination : ""} />
                                </section>

                                <section id="carEngineId" style={{ display: "none" }}>
                                    <Script
                                        dangerouslySetInnerHTML={`var carsearchAction = '/us/cars/searching';`}
                                    />
                                    <form id="CarForm">
                                        <div className="searchBox" id="carEngineId">
                                            <div className="searchBlock">
                                                <div className="row">
                                                    <div className="col-sm-12 col-xs-12">
                                                        <ul className="location-type inputSet">
                                                            <li>
                                                                <label>
                                                                    <input
                                                                        name="changeLocation"
                                                                        checked="checked"
                                                                        id="sameDrop"
                                                                        type="radio"
                                                                    />
                                                                    <span>Same Drop off Location</span>
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label>
                                                                    <input
                                                                        name="changeLocation"
                                                                        id="drop_off_radio"
                                                                        type="radio"
                                                                    />
                                                                    <span>Different Drop off Location</span>
                                                                </label>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <input
                                                    type="hidden"
                                                    id="hdn_currentDate"
                                                    value="8/25/2024 4:14:56 AM"
                                                />
                                                <div className="row">
                                                    <div className="col-lg-3 col-md-6 col-sm-12">
                                                        <label className="form-label">Destination</label>
                                                        <div className="input-city">
                                                            <img
                                                                src="/assets/images/location-icon.png"
                                                                className="input-icon"
                                                            />
                                                            <input
                                                                className="textbox"
                                                                data-val="true"
                                                                data-val-required="The pickUpCityDisplay field is required."
                                                                id="pickUpCityDisplay"
                                                                name="pickUpCityDisplay"
                                                                placeholder="Pick up Location"
                                                                type="text"
                                                                value
                                                            />
                                                            <span
                                                                className="field-validation-valid"
                                                                data-valmsg-for="PickUpCity"
                                                                data-valmsg-replace="true"
                                                            ></span>
                                                            <input
                                                                data-val="true"
                                                                data-val-number="The field PickUpLocationID must be a number."
                                                                id="PickUpLocationID"
                                                                name="PickUpLocationID"
                                                                type="hidden"
                                                                value
                                                            />
                                                            <input
                                                                data-val="true"
                                                                data-val-required="The PickUpCity field is required."
                                                                id="PickUpCity"
                                                                name="PickUpCity"
                                                                type="hidden"
                                                                value
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                                                        <div className="input-city">
                                                            <img
                                                                src="/assets/images/location-icon.png"
                                                                className="input-icon"
                                                            />
                                                            <input
                                                                className="textbox"
                                                                id="dropOffCityDisplay"
                                                                name="dropOffCityDisplay"
                                                                placeholder="Drop off Location"
                                                                type="text"
                                                                value
                                                            />
                                                            <span
                                                                className="field-validation-valid"
                                                                data-valmsg-for="DropOffCity"
                                                                data-valmsg-replace="true"
                                                            ></span>
                                                            <input
                                                                data-val="true"
                                                                data-val-number="The field DropOffLocationID must be a number."
                                                                id="DropOffLocationID"
                                                                name="DropOffLocationID"
                                                                type="hidden"
                                                                value
                                                            />
                                                            <input
                                                                id="DropOffCity"
                                                                name="DropOffCity"
                                                                type="hidden"
                                                                value
                                                            />

                                                            <a
                                                                href="javascript:void(0);"
                                                                className="widgetdrop-off_close"
                                                            ></a>
                                                            <div className="widgetdrop-off inputSet">
                                                                <label>
                                                                    <span>
                                                                        Need a different <br /> Drop off Location?
                                                                    </span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                                        <div className="row">
                                                            <div className="col-md-3 col-7 col-xs-7 sm-pr-5">
                                                                <label className="form-label">Pick up Date</label>
                                                                <div className="input-city">
                                                                    <img
                                                                        src="/assets/images/location-icon.png"
                                                                        className="input-icon cal-icon"
                                                                    />
                                                                    <input
                                                                        Value="Aug 25, 2024"
                                                                        className="hand textbox"
                                                                        id="fromcarDateDisplay"
                                                                        name="fromcarDateDisplay"
                                                                        readonly="readonly"
                                                                        required="required"
                                                                        type="text"
                                                                        value="Aug 25, 2024"
                                                                    />
                                                                    <input
                                                                        Value="25-8-2024"
                                                                        data-val="true"
                                                                        data-val-date="The field PickUpDate must be a date."
                                                                        data-val-required="The PickUpDate field is required."
                                                                        id="PickUpDate"
                                                                        name="PickUpDate"
                                                                        type="hidden"
                                                                        value="8/25/2024 4:14:56 AM"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3 col-5 col-xs-5">
                                                                <label className="form-label">Time</label>
                                                                <div className="input-city downArrow">
                                                                    <select
                                                                        className="select"
                                                                        data-val="true"
                                                                        data-val-required="The PickUpHour field is required."
                                                                        id="PickUpHour"
                                                                        name="PickUpHour"
                                                                    >
                                                                        <option value="00:00">12:00 AM</option>
                                                                        <option value="00:30">12:30 AM</option>
                                                                        <option value="01:00">01:00 AM</option>
                                                                        <option value="01:30">01:30 AM</option>
                                                                        <option value="02:00">02:00 AM</option>
                                                                        <option value="02:30">02:30 AM</option>
                                                                        <option value="03:00">03:00 AM</option>
                                                                        <option value="03:30">03:30 AM</option>
                                                                        <option value="04:00">04:00 AM</option>
                                                                        <option value="04:30">04:30 AM</option>
                                                                        <option value="05:00">05:00 AM</option>
                                                                        <option value="05:30">05:30 AM</option>
                                                                        <option value="06:00">06:00 AM</option>
                                                                        <option value="06:30">06:30 AM</option>
                                                                        <option value="07:00">07:00 AM</option>
                                                                        <option value="07:30">07:30 AM</option>
                                                                        <option value="08:00">08:00 AM</option>
                                                                        <option value="08:30">08:30 AM</option>
                                                                        <option value="09:00">09:00 AM</option>
                                                                        <option value="09:30">09:30 AM</option>
                                                                        <option selected="selected" value="10:00">
                                                                            10:00 AM
                                                                        </option>
                                                                        <option value="10:30">10:30 AM</option>
                                                                        <option value="11:00">11:00 AM</option>
                                                                        <option value="11:30">11:30 AM</option>
                                                                        <option value="12:00">12:00 PM</option>
                                                                        <option value="12:30">12:30 PM</option>
                                                                        <option value="13:00">01:00 PM</option>
                                                                        <option value="13:30">01:30 PM</option>
                                                                        <option value="14:00">02:00 PM</option>
                                                                        <option value="14:30">02:30 PM</option>
                                                                        <option value="15:00">03:00 PM</option>
                                                                        <option value="15:30">03:30 PM</option>
                                                                        <option value="16:00">04:00 PM</option>
                                                                        <option value="16:30">04:30 PM</option>
                                                                        <option value="17:00">05:00 PM</option>
                                                                        <option value="17:30">05:30 PM</option>
                                                                        <option value="18:00">06:00 PM</option>
                                                                        <option value="18:30">06:30 PM</option>
                                                                        <option value="19:00">07:00 PM</option>
                                                                        <option value="19:30">07:30 PM</option>
                                                                        <option value="20:00">08:00 PM</option>
                                                                        <option value="20:30">08:30 PM</option>
                                                                        <option value="21:00">09:00 PM</option>
                                                                        <option value="21:30">09:30 PM</option>
                                                                        <option value="22:00">10:00 PM</option>
                                                                        <option value="22:30">10:30 PM</option>
                                                                        <option value="23:00">11:00 PM</option>
                                                                        <option value="23:30">11:30 PM</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3 col-7 sm-pr-5 col-xs-7">
                                                                <label className="form-label">Drop off Date</label>
                                                                <div className="input-city">
                                                                    <img
                                                                        src="/assets/images/location-icon.png"
                                                                        className="input-icon cal-icon"
                                                                    />
                                                                    <input
                                                                        Value="Sep 01, 2024"
                                                                        className="hand textbox"
                                                                        id="tocarDateDisplay"
                                                                        name="tocarDateDisplay"
                                                                        readonly="readonly"
                                                                        required="required"
                                                                        type="text"
                                                                        value="Sep 01, 2024"
                                                                    />
                                                                    <input
                                                                        Value="01-9-2024"
                                                                        data-val="true"
                                                                        data-val-date="The field DropOffDate must be a date."
                                                                        data-val-required="The DropOffDate field is required."
                                                                        id="DropOffDate"
                                                                        name="DropOffDate"
                                                                        type="hidden"
                                                                        value="9/1/2024 4:14:56 AM"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3 col-5 col-xs-5">
                                                                <label className="form-label">Time</label>
                                                                <div className="input-city downArrow">
                                                                    <select
                                                                        className="select"
                                                                        data-val="true"
                                                                        data-val-required="The DropOffHour field is required."
                                                                        id="DropOffHour"
                                                                        name="DropOffHour"
                                                                    >
                                                                        <option value="00:00">12:00 AM</option>
                                                                        <option value="00:30">12:30 AM</option>
                                                                        <option value="01:00">01:00 AM</option>
                                                                        <option value="01:30">01:30 AM</option>
                                                                        <option value="02:00">02:00 AM</option>
                                                                        <option value="02:30">02:30 AM</option>
                                                                        <option value="03:00">03:00 AM</option>
                                                                        <option value="03:30">03:30 AM</option>
                                                                        <option value="04:00">04:00 AM</option>
                                                                        <option value="04:30">04:30 AM</option>
                                                                        <option value="05:00">05:00 AM</option>
                                                                        <option value="05:30">05:30 AM</option>
                                                                        <option value="06:00">06:00 AM</option>
                                                                        <option value="06:30">06:30 AM</option>
                                                                        <option value="07:00">07:00 AM</option>
                                                                        <option value="07:30">07:30 AM</option>
                                                                        <option value="08:00">08:00 AM</option>
                                                                        <option value="08:30">08:30 AM</option>
                                                                        <option value="09:00">09:00 AM</option>
                                                                        <option value="09:30">09:30 AM</option>
                                                                        <option selected="selected" value="10:00">
                                                                            10:00 AM
                                                                        </option>
                                                                        <option value="10:30">10:30 AM</option>
                                                                        <option value="11:00">11:00 AM</option>
                                                                        <option value="11:30">11:30 AM</option>
                                                                        <option value="12:00">12:00 PM</option>
                                                                        <option value="12:30">12:30 PM</option>
                                                                        <option value="13:00">01:00 PM</option>
                                                                        <option value="13:30">01:30 PM</option>
                                                                        <option value="14:00">02:00 PM</option>
                                                                        <option value="14:30">02:30 PM</option>
                                                                        <option value="15:00">03:00 PM</option>
                                                                        <option value="15:30">03:30 PM</option>
                                                                        <option value="16:00">04:00 PM</option>
                                                                        <option value="16:30">04:30 PM</option>
                                                                        <option value="17:00">05:00 PM</option>
                                                                        <option value="17:30">05:30 PM</option>
                                                                        <option value="18:00">06:00 PM</option>
                                                                        <option value="18:30">06:30 PM</option>
                                                                        <option value="19:00">07:00 PM</option>
                                                                        <option value="19:30">07:30 PM</option>
                                                                        <option value="20:00">08:00 PM</option>
                                                                        <option value="20:30">08:30 PM</option>
                                                                        <option value="21:00">09:00 PM</option>
                                                                        <option value="21:30">09:30 PM</option>
                                                                        <option value="22:00">10:00 PM</option>
                                                                        <option value="22:30">10:30 PM</option>
                                                                        <option value="23:00">11:00 PM</option>
                                                                        <option value="23:30">11:30 PM</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <input
                                                        id="fromDateCarIn"
                                                        name="fromDateCarIn"
                                                        type="hidden"
                                                        value="2024"
                                                    />
                                                    <input
                                                        id="toDateCarIn"
                                                        name="toDateCarIn"
                                                        type="hidden"
                                                        value="2024"
                                                    />
                                                    <input
                                                        data-val="true"
                                                        data-val-required="The isSameDropOff field is required."
                                                        id="isSameDropOff"
                                                        name="isSameDropOff"
                                                        type="hidden"
                                                        value="True"
                                                    />
                                                </div>
                                                <div className="row">
                                                    <span
                                                        id="sameSearchcar"
                                                        className="col-lg-3 col-md-6 col-sm-12 error-txt hidden-xs"
                                                    ></span>
                                                    <span
                                                        id="sameSearchcarDrop"
                                                        className="col-lg-3 col-md-6 col-sm-12 error-txt hidden-xs"
                                                    ></span>
                                                </div>
                                                <div className="engine-bottom-txt">
                                                    <div className="row">
                                                        <div className="col-sm-9">
                                                            <div className="row inputSet">
                                                                <div className="col-sm-5">
                                                                    <label
                                                                        style={{
                                                                            display: "inline",
                                                                            fontSize: "14px",
                                                                        }}
                                                                    >
                                                                        <input
                                                                            checked="checked"
                                                                            className="checkeddiv"
                                                                            type="checkbox"
                                                                        />
                                                                        <span>
                                                                            Driver Age:{" "}
                                                                            <span id="agetxt">Between (30-65)</span>
                                                                        </span>
                                                                    </label>
                                                                    <div
                                                                        className="tooltip-custom"
                                                                        style={{ display: "inline" }}
                                                                    >
                                                                        <i className="fa fa-info" aria-hidden="true"></i>
                                                                        <div className="promo-detail">
                                                                            <span className="arrow"></span>
                                                                            <p className="m-0">
                                                                                Additional Fee may apply for driver under 30
                                                                                Yrs or above 65 Yrs old, at the time of
                                                                                rental. Please check term and conditions on
                                                                                payment page.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <ul
                                                                        className="driver-age-list inputSet radio_green"
                                                                        style={{ display: "none" }}
                                                                    >
                                                                        <li>
                                                                            <label>
                                                                                {" "}
                                                                                <input
                                                                                    name="Driversage"
                                                                                    id="age3065"
                                                                                    checked="checked"
                                                                                    type="radio"
                                                                                />
                                                                                <span>Between 30 - 65</span>
                                                                            </label>
                                                                        </li>
                                                                        <li>
                                                                            <label>
                                                                                {" "}
                                                                                <input
                                                                                    name="Driversage"
                                                                                    id="age30"
                                                                                    type="radio"
                                                                                />
                                                                                <span>Below 30</span>
                                                                            </label>
                                                                        </li>
                                                                        <li>
                                                                            <label>
                                                                                {" "}
                                                                                <input
                                                                                    name="Driversage"
                                                                                    id="age65"
                                                                                    type="radio"
                                                                                />
                                                                                <span>Above 65</span>
                                                                            </label>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <input
                                                                    data-val="true"
                                                                    data-val-number="The field DriverAge must be a number."
                                                                    data-val-required="The DriverAge field is required."
                                                                    id="DriverAge"
                                                                    name="DriverAge"
                                                                    type="hidden"
                                                                    value="35"
                                                                />
                                                                <div className="col-sm-7">
                                                                    <div className="checkbox-expend">
                                                                        {" "}
                                                                        <a
                                                                            href="javascript:void(0)"
                                                                            onclick="advaOptionsShow();"
                                                                            className="advanced-option"
                                                                        >
                                                                            {" "}
                                                                            Advanced Options{" "}
                                                                            <i
                                                                                className="fa fa-angle-down"
                                                                                aria-hidden="true"
                                                                            ></i>
                                                                        </a>{" "}
                                                                    </div>
                                                                    <div
                                                                        className="row"
                                                                        style={{ display: "none" }}
                                                                        id="advaOptionsDiv"
                                                                    >
                                                                        <div className="col-sm-6 col-12">
                                                                            <div className="input-city downArrow mb-sm-2">
                                                                                <select
                                                                                    className="select"
                                                                                    id="VendorCode"
                                                                                    name="VendorCode"
                                                                                >
                                                                                    <option value>Car Company</option>
                                                                                    <option value="AC">Ace Rent A Car</option>
                                                                                    <option value="AO">Aco Rent A Car</option>
                                                                                    <option value="AD">Advantage</option>
                                                                                    <option value="AL">
                                                                                        Alamo Rent A Car
                                                                                    </option>
                                                                                    <option value="ZU">Auto Europe</option>
                                                                                    <option value="ZI">
                                                                                        Avis Rent A Car
                                                                                    </option>
                                                                                    <option value="ZD">
                                                                                        Budget Rent A Car
                                                                                    </option>
                                                                                    <option value="DS">
                                                                                        Discount Rentals
                                                                                    </option>
                                                                                    <option value="ZR">
                                                                                        Dollar Rent A Car
                                                                                    </option>
                                                                                    <option value="DF">Driving Force</option>
                                                                                    <option value="ES">Easirent</option>
                                                                                    <option value="EY">
                                                                                        Economy Rent A Car
                                                                                    </option>
                                                                                    <option value="ET">
                                                                                        Enterprise Rent A Car
                                                                                    </option>
                                                                                    <option value="EM">Euromobil</option>
                                                                                    <option value="EP">Europcar</option>
                                                                                    <option value="EZ">Ez Rent A Car</option>
                                                                                    <option value="FF">
                                                                                        Firefly Car Rental
                                                                                    </option>
                                                                                    <option value="GM">Green Motion</option>
                                                                                    <option value="ZE">
                                                                                        Hertz Rent A Car
                                                                                    </option>
                                                                                    <option value="LL">
                                                                                        Localiza Rent A Car
                                                                                    </option>
                                                                                    <option value="MX">Mex Rent A Car</option>
                                                                                    <option value="MW">
                                                                                        Midway Rent A Car
                                                                                    </option>
                                                                                    <option value="MO">
                                                                                        Movida Rent A Car
                                                                                    </option>
                                                                                    <option value="ZL">
                                                                                        National Car Rental
                                                                                    </option>
                                                                                    <option value="NC">Nextcar</option>
                                                                                    <option value="NU">Nu Car Rentals</option>
                                                                                    <option value="ZA">
                                                                                        Payless Car Rental
                                                                                    </option>
                                                                                    <option value="PR">Priceless</option>
                                                                                    <option value="RW">Rent A Wreck</option>
                                                                                    <option value="RH">Rhodium</option>
                                                                                    <option value="RO">Routes</option>
                                                                                    <option value="SC">Silvercar</option>
                                                                                    <option value="SX">Sixt Auto</option>
                                                                                    <option value="ZT">
                                                                                        Thrifty Car Rental
                                                                                    </option>
                                                                                    <option value="TF">
                                                                                        Tu Florida Rental Car
                                                                                    </option>
                                                                                    <option value="SV">Usave Auto</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-6 col-12">
                                                                            <div className="input-city downArrow">
                                                                                <select
                                                                                    className="select"
                                                                                    id="VehicleType"
                                                                                    name="VehicleType"
                                                                                >
                                                                                    <option value>Car Type</option>
                                                                                    <option value="CC">Compact</option>
                                                                                    <option value="IC">Midsize</option>
                                                                                    <option value="SC">Standard</option>
                                                                                    <option value="FC">Fullsize</option>
                                                                                    <option value="EC">Economy</option>
                                                                                    <option value="PC">Premium</option>
                                                                                    <option value="LC">Luxury</option>
                                                                                    <option value="MC">Mini</option>
                                                                                    <option value="MV">Minivan</option>
                                                                                    <option value="SF">4 x 4</option>
                                                                                    <option value="ST">Convertible</option>
                                                                                    <option value="APUP">Any Pick Up</option>
                                                                                    <option value="AGRN">Green</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="text-right">
                                                                <a className="search-btn" onclick="return validcar();">
                                                                    Search
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <Script
                                        dangerouslySetInnerHTML={`
                          var searchcarObj = null;
                          $(document).ready(function () {
                              var RCar = "";
                              if (commonSetting.local_storage == 1) {
                                  RCar = localStorage.getItem("topuscarhistory");
                              }
  
                              if (RCar != null && RCar != "") {
  
  
                                  searchcarObj = $.parseJSON(RCar);
                                  if (searchcarObj != null) {
                                      $('#pickUpCityDisplay').val(searchcarObj.pickUpCityDisplay);
                                      $('#PickUpCity').val(searchcarObj.PickUpCity);
                                      $('#PickUpLocationID').val(searchcarObj.PickUpLocationID);
                                      $('#dropOffCityDisplay').val(searchcarObj.dropOffCityDisplay);
                                      $('#DropOffCity').val(searchcarObj.DropOffCity);
                                      $('#DropOffLocationID').val(searchcarObj.DropOffLocationID);
                                      if (searchcarObj.fromDateDisplay == undefined || searchcarObj.fromDateDisplay == null) $('#fromcarDateDisplay').val(searchcarObj.fromcarDateDisplay)
                                      else $('#fromcarDateDisplay').val(searchcarObj.fromDateDisplay)
                                      $('#PickUpDate').val(searchcarObj.PickUpDate);
                                      $('#PickUpHour').val(searchcarObj.PickUpHour);
                                      if (searchcarObj.toDateDisplay == undefined || searchcarObj.toDateDisplay == null) $('#tocarDateDisplay').val(searchcarObj.tocarDateDisplay)
                                      else $('#tocarDateDisplay').val(searchcarObj.toDateDisplay)
                                      try {
                                          if (new Date($('#fromcarDateDisplay').val()) < new Date()) {
                                              $('#fromcarDateDisplay').val((new Date()).toShortFormat())
                                          }
                                          if (new Date($('#tocarDateDisplay').val()) < new Date()) {
                                              $('#tocarDateDisplay').val((new Date()).toShortFormat())
                                          }
                                      }
                                      catch (e) { }
                                      $('#DropOffDate').val(searchcarObj.DropOffDate);
                                      $('#DropOffHour').val(searchcarObj.DropOffHour);
                                      $('#isSameDropOff').val(searchcarObj.isSameDropOff);
                                      $('#VendorCode').val(searchcarObj.VendorCode);
                                      $('#VehicleType').val(searchcarObj.VehicleType);
                                      if (searchcarObj.isSameDropOff != undefined && searchcarObj.isSameDropOff == false) {
                                          $('#drop_off_radio').trigger('click');
                                      }
                                      $("#DriverAge").val(searchcarObj.DriverAge);
                                      if (searchcarObj.DriverAge < 30) $('#age30').trigger('click')
                                      else if (searchcarObj.DriverAge > 65) $('#age65').trigger('click')
                                      else if (searchcarObj.DriverAge <= 65 && searchcarObj.DriverAge >= 30) $('#age3065').trigger('click')
                                  }
                              }
                          });
                          $('input[type="text"]').keydown(function () {
                              $('.bottom-call-bar').css('bottom', '-70px');
                          });
                      `}
                                    />
                                </section>

                                <section id="hotelEngineId" style={{ display: "none" }}>
                                    <div className="searchBg" id="htleng">
                                        <section>
                                            <form id="HotelForm">
                                                <div className="row">
                                                    <div className="col-xs-12">
                                                        <div className="row">
                                                            <div className="col-lg-10">
                                                                <div className="row">
                                                                    <div className="col-md-12 col-lg-4">
                                                                        <div className="input-city">
                                                                            <label className="form-label">Where to ?</label>
                                                                            <div className="relative">
                                                                                <img
                                                                                    src="/assets/images/location-icon.png"
                                                                                    className="input-icon"
                                                                                />
                                                                                <input
                                                                                    autoComplete="off"
                                                                                    className="textoverflow ui-autocomplete-input"
                                                                                    id="htlsearch"
                                                                                    name="htlsearch"
                                                                                    placeholder="City/Location?"
                                                                                    type="text"
                                                                                    value
                                                                                />
                                                                                <span
                                                                                    className="field-validation-valid"
                                                                                    data-valmsg-for="htlsearch"
                                                                                    data-valmsg-replace="true"
                                                                                ></span>
                                                                                <span className="field-validation-valid"></span>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            id="sameSearchhotel"
                                                                            className="error-txt"
                                                                            style={{ clear: "both" }}
                                                                        ></div>
                                                                    </div>
                                                                    <div className="col-xs-12 col-sm-6  col-lg-4">
                                                                        <label className="form-label cal-label">
                                                                            Travel Date(s)
                                                                        </label>
                                                                        <div className="calender-txt calender-block">
                                                                            <span className="relative">
                                                                                <img
                                                                                    src="/assets/images/location-icon.png"
                                                                                    className="cal"
                                                                                />
                                                                                <input
                                                                                    Value="Sep 01, 2024"
                                                                                    className="hand"
                                                                                    data-val="true"
                                                                                    data-val-required="The fromhotelDateDisplay field is required."
                                                                                    id="fromhotelDateDisplay"
                                                                                    name="fromhotelDateDisplay"
                                                                                    readonly="readonly"
                                                                                    required="required"
                                                                                    type="text"
                                                                                    value="Sep 01, 2024"
                                                                                />
                                                                                <i
                                                                                    style={{
                                                                                        position: "absolute",
                                                                                        top: "2px",
                                                                                        left: "9px",
                                                                                        fontSize: "12px",
                                                                                    }}
                                                                                >
                                                                                    Check-in
                                                                                </i>
                                                                                <input
                                                                                    Value="09-01-2024"
                                                                                    data-val="true"
                                                                                    data-val-date="The field checkin must be a date."
                                                                                    data-val-required="The checkin field is required."
                                                                                    id="checkin"
                                                                                    name="checkin"
                                                                                    type="hidden"
                                                                                    value="9/1/2024 4:14:56 AM"
                                                                                />
                                                                            </span>
                                                                            <span className="relative">
                                                                                <img
                                                                                    className="cal"
                                                                                    src="/assets/images/location-icon.png"
                                                                                />
                                                                                <input
                                                                                    Value="Sep 03, 2024"
                                                                                    className="hand"
                                                                                    data-val="true"
                                                                                    data-val-required="The tohotelDateDisplay field is required."
                                                                                    id="tohotelDateDisplay"
                                                                                    name="tohotelDateDisplay"
                                                                                    readonly="readonly"
                                                                                    required="required"
                                                                                    type="text"
                                                                                    value="Sep 03, 2024"
                                                                                />
                                                                                <i
                                                                                    style={{
                                                                                        position: "absolute",
                                                                                        top: "2px",
                                                                                        left: "9px",
                                                                                        fontSize: "12px",
                                                                                    }}
                                                                                >
                                                                                    Check-out
                                                                                </i>
                                                                                <input
                                                                                    Value="09-03-2024"
                                                                                    data-val="true"
                                                                                    data-val-date="The field checkout must be a date."
                                                                                    data-val-required="The checkout field is required."
                                                                                    id="checkout"
                                                                                    name="checkout"
                                                                                    type="hidden"
                                                                                    value="9/3/2024 4:14:56 AM"
                                                                                />
                                                                            </span>
                                                                        </div>
                                                                        <span
                                                                            className="field-validation-valid"
                                                                            data-valmsg-for="fromhotelDateDisplay"
                                                                            data-valmsg-replace="true"
                                                                        ></span>
                                                                        <span
                                                                            className="field-validation-valid"
                                                                            data-valmsg-for="tohotelDateDisplay"
                                                                            data-valmsg-replace="true"
                                                                        ></span>
                                                                    </div>
                                                                    <div className="col-xs-12 col-sm-6  col-lg-4">
                                                                        <div className="input-border traveler-fees-toggle pointer">
                                                                            <label className="form-label cal-label">
                                                                                Guests, Rooms
                                                                            </label>
                                                                            <div className="relative  drop-errow">
                                                                                <img
                                                                                    className="input-icon"
                                                                                    src="/assets/images/traveller-icon.png"
                                                                                />
                                                                                <input
                                                                                    autoComplete="off"
                                                                                    className="hand"
                                                                                    id="roomGuest"
                                                                                    name="roomGuest"
                                                                                    onclick="showhtlmoreRoom();"
                                                                                    placeholder="1 Room(s), 3 Adults, 2 Child"
                                                                                    readonly="readonly"
                                                                                    type="text"
                                                                                    value="1 Room, 2 Adults"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="engine-bottom-txt">
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <label
                                                                                className="form-label moreoptions"
                                                                                onclick="showhtladvance();"
                                                                            >
                                                                                Advance Search Option{" "}
                                                                                <i
                                                                                    className="fa fa-angle-down"
                                                                                    aria-hidden="true"
                                                                                ></i>
                                                                            </label>
                                                                            <div
                                                                                className="row lessoptions"
                                                                                style={{ display: "none" }}
                                                                            >
                                                                                <div className="col-sm-6">
                                                                                    <div className="input-border traveler-fees-toggle pointer ao">
                                                                                        <span className="hotel-icon"></span>
                                                                                        <input
                                                                                            className="hotel-name-input"
                                                                                            id="hotelName"
                                                                                            name="hotelName"
                                                                                            placeholder="Hotel Name"
                                                                                            type="text"
                                                                                            value
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-6">
                                                                                    <div className="input-border traveler-fees-toggle pointer dropdown-errow ao">
                                                                                        <span
                                                                                            className="star-icon"
                                                                                            aria-hidden="true"
                                                                                        ></span>
                                                                                        <select
                                                                                            id="hotelRating"
                                                                                            name="hotelRating"
                                                                                        >
                                                                                            <option value>Star Rating</option>
                                                                                            <option value="5">Five Stars</option>
                                                                                            <option value="4">Four Stars</option>
                                                                                            <option value="3">Three Stars</option>
                                                                                            <option value="2">Two Stars</option>
                                                                                            <option value="1">One Star</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <span id="sameSearch" className="error-txt"></span>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-2">
                                                                <div className="text-right">
                                                                    <button
                                                                        className="hotel-search-btn"
                                                                        onclick="return checkurlhtl();"
                                                                    >
                                                                        Search
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div
                                                    id="htlselectpax"
                                                    className="room-details"
                                                    style={{ display: "none" }}
                                                >
                                                    <div className="hotel-room-block">
                                                        <a
                                                            href="javascript:void(0);"
                                                            onclick="Doneroom()"
                                                            className="popup-close"
                                                        >
                                                            <i className="fa fa-times" aria-hidden="true"></i>
                                                        </a>
                                                        <div className="row">
                                                            <div className="col-sm-4">
                                                                <div className="roomadd">
                                                                    <div className="room-name">Room 1</div>
                                                                    <div className="add-guest">
                                                                        <span>
                                                                            <a
                                                                                href="javascript:void(0);"
                                                                                id="subadultCount1"
                                                                                onclick="removeadultpax(1)"
                                                                            >
                                                                                <i className="fa fa-minus"></i>
                                                                            </a>
                                                                            <b className="value" id="adultCount1">
                                                                                {" "}
                                                                                2{" "}
                                                                            </b>
                                                                            <a
                                                                                href="javascript:void(0);"
                                                                                id="addadultCount1"
                                                                                onclick="addadultpax(1)"
                                                                            >
                                                                                <i className="fa fa-plus"></i>
                                                                            </a>
                                                                        </span>
                                                                        Adult
                                                                    </div>
                                                                    <div className="add-guest">
                                                                        <span>
                                                                            <a
                                                                                href="javascript:void(0);"
                                                                                id="subChildCount1"
                                                                                onclick="removeaChildPax(1)"
                                                                            >
                                                                                <i className="fa fa-minus"></i>
                                                                            </a>
                                                                            <b className="value" id="ChildCount1">
                                                                                0
                                                                            </b>
                                                                            <a
                                                                                href="javascript:void(0);"
                                                                                id="addChildCount1"
                                                                                onclick="addChildpax(1)"
                                                                            >
                                                                                <i className="fa fa-plus"></i>
                                                                            </a>
                                                                        </span>
                                                                        Child <small>(0-17)</small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-8">
                                                                <div className="select-age">
                                                                    <div className="childdiv_1"></div>
                                                                </div>
                                                            </div>
                                                            <div className="sec-devider"></div>
                                                        </div>
                                                        <div id="nextdiv"> </div>
                                                        <div className="add-room">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="another-btn"
                                                                onclick="addroom()"
                                                            >
                                                                + Add another room
                                                            </a>
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="removerroom remove-btn"
                                                                style={{ display: "none" }}
                                                                onclick="removeroom()"
                                                            >
                                                                remove
                                                            </a>
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="close-btn htlclose-btn"
                                                                onclick="Doneroom()"
                                                            >
                                                                Done
                                                            </a>
                                                        </div>
                                                        <div align="right"></div>
                                                    </div>
                                                </div>

                                                <input
                                                    id="LocationID"
                                                    name="LocationID"
                                                    type="hidden"
                                                    value
                                                />
                                                <input
                                                    data-val="true"
                                                    data-val-number="The field roomCount must be a number."
                                                    data-val-required="The roomCount field is required."
                                                    id="roomCount"
                                                    name="roomCount"
                                                    type="hidden"
                                                    value="1"
                                                />
                                                <input
                                                    id="roomData"
                                                    name="roomData"
                                                    type="hidden"
                                                    value='[{"Adults":2,"Children":[]}]'
                                                />
                                                <input
                                                    id="fromDateIn"
                                                    name="fromDateIn"
                                                    type="hidden"
                                                    value="2024"
                                                />
                                                <input
                                                    id="toDateIn"
                                                    name="toDateIn"
                                                    type="hidden"
                                                    value="2024"
                                                />
                                            </form>
                                        </section>
                                    </div>
                                </section>

                                <section id="cruiseEngineId" style={{ display: "none" }}>
                                    <div className="contactenquiry" style={{ display: "block" }}>
                                        <div className="row">
                                            <div className="col-sm-3 col-xs-12">
                                                <input
                                                    type="text"
                                                    id="txtCruiseDest"
                                                    minLength="1"
                                                    maxLength="100"
                                                    placeholder="Destination"
                                                    autoComplete="off"
                                                />
                                                <span id="cruiseDestErrMsg" className="error-txt"></span>
                                            </div>
                                            <div className="col-sm-3 col-xs-12">
                                                <input
                                                    type="text"
                                                    id="txtCruiseLine"
                                                    minLength="1"
                                                    maxLength="100"
                                                    placeholder="Cruise Line"
                                                    autoComplete="off"
                                                />
                                                <span id="cruiseLineErrMsg" className="error-txt"></span>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <input
                                                    type="text"
                                                    id="txtCruiseLength"
                                                    minLength="1"
                                                    maxLength="3"
                                                    placeholder="Cruise Length"
                                                    autoComplete="off"
                                                />
                                                <span id="cruiseLengthErrMsg" className="error-txt"></span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-3 col-sm-3 col-xs-12">
                                                <input
                                                    type="text"
                                                    id="txtCruiseGuestName"
                                                    minLength="1"
                                                    maxLength="100"
                                                    placeholder="Name"
                                                    className="cc"
                                                    autoComplete="off"
                                                />
                                                <span id="cruiseGuestNameErrMsg" className="error-txt"></span>
                                            </div>
                                            <div className="col-md-3 col-sm-3 col-xs-12">
                                                <input
                                                    type="text"
                                                    id="txtCruiseGuestEmail"
                                                    minLength="1"
                                                    maxLength="100"
                                                    placeholder="Email"
                                                    className="cc"
                                                    autoComplete="off"
                                                />
                                                <span id="cruiseGuestEmailErrMsg" className="error-txt"></span>
                                            </div>
                                            <div className="col-md-4 col-sm-6 col-xs-12">
                                                <input
                                                    type="tel"
                                                    className="tel"
                                                    readonly="readonly"
                                                    id="txtCruiseGuestPhCode"
                                                    placeholder="Contact number"
                                                    value="+1"
                                                />
                                                <input
                                                    type="text"
                                                    id="txtCruiseGuestPhoneNo"
                                                    className="phoneno"
                                                    minLength="10"
                                                    maxLength="15"
                                                    placeholder="Phone No"
                                                    autoComplete="off"
                                                />
                                                <span
                                                    id="cruiseGuestPhoneNoErrMsg"
                                                    className="error-txt"
                                                ></span>
                                            </div>
                                            <div className="col-md-2 col-sm-5 col-xs-12">
                                                <div id="dvReqACruiseCall" className="text-right">
                                                    <button
                                                        id="btnReqACruiseCall"
                                                        className="search-btn"
                                                    >
                                                        Request a Call
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        id="dvCruiseAjaxLoader"
                                        className="common_popup"
                                        style={{ display: "none" }}
                                    >
                                        <div className="center-block">
                                            <div className="outer">
                                                <div className="sucesspopupmsg" style={{ width: "200px" }}>
                                                    <img src="/assets/images/loading.gif" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        id="dvCruiseCallRQSuccessPopup"
                                        className="common_popup"
                                        style={{ display: "none" }}
                                    >
                                        <div className="center-block">
                                            <div className="outer">
                                                <div className="sucesspopupmsg">
                                                    <a
                                                        href="javascript:void(0);"
                                                        id="btnClsCruiseCallRQSuccessPopup"
                                                        className="close_popup"
                                                    >
                                                        <img
                                                            src="/assets/images/svg/close-popup.svg"
                                                            alt="close-popup"
                                                        />
                                                    </a>
                                                    <img
                                                        src="/assets/images/svg/sucessfull_check.svg"
                                                        alt="thumb"
                                                    />
                                                    <div className="thanku">Thank You!</div>
                                                    <div className="submitreq">For Submitting Your Request</div>
                                                    <div className="request">
                                                        your request reference is{" "}
                                                        <strong className="customer_support">
                                                            <span id="spnCruiseCallRQId"></span>
                                                        </strong>
                                                    </div>
                                                    <p>
                                                        We've Assigned A Personal Cruise Planner And Will
                                                        Contact You Shortly. For More Information, You Can Call
                                                        Us At
                                                    </p>
                                                    <div className="customer_support">
                                                        <a href="tel:+1-248-274-7239">+1-248-274-7239</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </section>
                            </div>
                            <Script
                                dangerouslySetInnerHTML={`
                  
                  function clickEngineShow(id, tab) {
                      $("#flightEngineId").hide();
                      $("#carEngineId").hide();
                      $("#hotelEngineId").hide();
                      $("#cruiseEngineId").hide();
                      $("#" + id).show();
                      $(".engin-tab").removeClass("active");
                      $("#" + tab).addClass('active');
                      document.cookie = "lastopend=" + tab + ";expires=" + (new Date((new Date()).getTime() + 30 * 24 * 60 * 60 * 1000)) + "; path=/;";
                  }    
              `}
                            />
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="newcustomer__serviceBox">
                        <div className="container">
                            <div className="holder">
                                <div className="column">
                                    <a
                                        className="affirm-site-modal affirm-link cursor"
                                        data-page-type="homepage"
                                    >
                                        <span className="icon1"></span>
                                        <h4>Buy now,pay over time</h4>
                                        <p>
                                            Make monthly payments <br /> with no hidden fees
                                        </p>
                                    </a>
                                </div>
                                <div className="column">
                                    <a href="/" target="_blank">
                                        <span className="icon2"></span>
                                        <h4>Price Match Promise</h4>
                                        <p>
                                            Found a lower fare, we will <br /> reimburse the difference.
                                        </p>
                                    </a>
                                </div>
                                <div className="column">
                                    <span className="icon3"></span>
                                    <h4>Quick & Easy</h4>
                                    <p>
                                        Book your preferred flights & <br /> hotels in just a few
                                        clicks.
                                    </p>
                                </div>
                                <div className="column">
                                    <span className="icon4"></span>
                                    <h4>Fast and Safe</h4>
                                    <p>
                                        State-of-the-art technology to <br /> secure your data.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="customer__service" style={{ display: "none" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 col-sm-6 col-xs-12">
                                <div className="customer__block affirm--block">
                                    <img src="/assets/images/affirm-logo.png" alt="" />
                                    <h3>
                                        Buy now,
                                        <br />
                                        pay over time
                                    </h3>
                                    <p>Make monthly payments with no hidden fees.</p>
                                    <a
                                        className="affirm-site-modal affirm-link cursor"
                                        data-page-type="homepage"
                                    >
                                        Learn more
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12">
                                <div className="customer__block">
                                    <div className="cs-icon">
                                        <img
                                            src="/assets/images/price-match-logo.png"
                                            alt="price-match-logo"
                                        />
                                    </div>
                                    <h3>Price Match Promise</h3>
                                    <p>
                                        If you're able to find a lower flight fare on another website,
                                        make the claim within 24 hours of making the booking.{" "}
                                    </p>
                                    <a href="/" target="_blank">
                                        Read more
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12">
                                <div className="customer__block">
                                    <div className="cs-icon">
                                        <img
                                            src="/assets/images/quick-easy-logo.png"
                                            alt="quick-easy-logo"
                                        />
                                    </div>
                                    <h3>Quick &amp; Easy</h3>
                                    <p>
                                        We make the whole booking process quick and easy. With just a
                                        few clicks, you can book your preferred flights and hotels at
                                        affordable rates.
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12">
                                <div className="customer__block">
                                    <img
                                        src="/assets/images/cloudflare-safe.png"
                                        alt="cloudflare-safe"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="top__dealsCntr">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="page__title">
                                    <h2>Top Flight Destinations</h2>
                                    <div className="sub__title">Offers for all travel styles</div>
                                </div>

                                <div className="leftCol">
                                    {/* top flight destination */}
                                    <div className="top__dealbox">
                                        <ul>

                                            {TopFlightDestinationArr && TopFlightDestinationArr.flat().map((des, index) => {
                                                return <TopFlightDestinationCard key={index} destination={des} />;
                                            })}
                                        </ul>
                                    </div>
                                    <div className="dealbox__note">
                                        <b>Note:</b> All fares are quoted in USD. Last updated on{" "}
                                        <span className="text-link-orange">
                                            Sat, Aug 24, 2024 at 05:00 AM.
                                        </span>
                                        , the fares mentioned above are for flight tickets and inclusive
                                        of taxes & fees.{" "}
                                    </div>
                                </div>

                                <div className="rightCol">
                                    <div className="destination__block">
                                        {TopDestinationsArr && TopDestinationsArr.map(a => {
                                            return <TopDestinationCard destination={a} />
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="subscribeBoxHome">
                    <div className="container">
                        <div className="subscribeBg">
                            <h2>Subscribe To Our Newsletter</h2>
                            <ul>
                                <li>
                                    <img
                                        src="https://www.lookbyfare.com/us/images/footer/subscribe/subscribe_icon1.svg?v=1"
                                        alt="Exclusive Fares"
                                    />
                                    <p>Exclusive Fares</p>
                                </li>
                                <li>
                                    <img
                                        src="https://www.lookbyfare.com/us/images/footer/subscribe/subscribe_icon2.svg?v=1"
                                        alt="Latest Sales & Discounts"
                                    />
                                    <p>Latest Sales & Discounts</p>
                                </li>
                                <li>
                                    <img
                                        src="https://www.lookbyfare.com/us/images/footer/subscribe/subscribe_icon3.svg?v=1"
                                        alt="Members only Deals"
                                    />
                                    <p>Members only Deals</p>
                                </li>
                                <li>
                                    <img
                                        src="https://www.lookbyfare.com/us/images/footer/subscribe/subscribe_icon4.svg?v=1"
                                        alt="Special Promo Codes & more"
                                    />
                                    <p>Special Promo Codes & more</p>
                                </li>
                            </ul>
                            <a href="javascript:void(0);" className="subscribehomeBtn">
                                Subscribe Now
                            </a>
                        </div>
                    </div>
                </div>

                <div className="hotel__deals">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="page__title">
                                    <h2>Top Hotel Destinations</h2>
                                    <div className="sub__title">Hotels that speak comfort and luxury</div>
                                </div>
                                <Slider {...settings} classNameName="dealCntr dealSlider">
                                    <div
                                        className="deal__item"
                                        onclick="window.open('us/hotel/hotels/hotels-in-las-vegas-las-10801.html');"
                                    >
                                        <div className="block">
                                            <figure>
                                                <img src="/assets/images/home/hotels/las.jpg" alt="" />
                                            </figure>
                                            <div className="deal__detail">
                                                <div className="deal__title">Las Vegas</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="deal__item"
                                        onclick="window.open('us/hotel/hotels/hotels-in-cancun-cun-54072.html');"
                                    >
                                        <div className="block">
                                            <figure>
                                                <img src="/assets/images/home/hotels/cancun.jpg" alt="" />
                                            </figure>
                                            <div className="deal__detail">
                                                <div className="deal__title">Cancun</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="deal__item"
                                        onclick="window.open('us/hotel/hotels/hotels-in-london-lon-63982.html');"
                                    >
                                        <div className="block">
                                            <figure>
                                                <img src="/assets/images/home/hotels/lon.jpg" alt="" />
                                            </figure>
                                            <div className="deal__detail">
                                                <div className="deal__title">London</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="deal__item"
                                        onclick="window.open('us/hotel/hotels/hotels-in-new-york-nyc-14189.html');"
                                    >
                                        <div className="block">
                                            <figure>
                                                <img src="/assets/images/home/hotels/nyc.jpg" alt="" />
                                            </figure>
                                            <div className="deal__detail">
                                                <div className="deal__title">New York</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="deal__item"
                                        onclick="window.open('us/hotel/hotels/hotels-in-toronto-yto-65326.html');"
                                    >
                                        <div className="block">
                                            <figure>
                                                <img src="/assets/images/home/hotels/toronto.jpg" alt="" />
                                            </figure>
                                            <div className="deal__detail">
                                                <div className="deal__title">Toronto</div>
                                            </div>
                                        </div>
                                    </div>
                                </Slider>
                                {/* <div className="dealCntr dealSlider"></div> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="newserviceBox">
                    <div className="container">
                        <div className="page__title">
                            <h3>Exclusive Add on Services</h3>
                        </div>
                        <div className="holder">
                            <div className="column">
                                <a href="/baggage-fees" target="_blank">
                                    <img src="/assets/images/home/new/baggage.jpg" alt="baggage" />
                                    <h4>Baggage</h4>
                                </a>
                            </div>
                            <div className="column">
                                <img src="/assets/images/home/new/seat.jpg" alt="seat" />
                                <h4>Seats</h4>
                            </div>
                            <div className="column">
                                <a
                                    href="/assets/airlines/web-check-in/online-check-in.html"
                                    target="_blank"
                                >
                                    <img
                                        src="/assets/images/home/new/online-check-in.jpg"
                                        alt="online-check-in"
                                    />
                                    <h4>Online Check-in</h4>
                                </a>
                            </div>
                            <div className="column">
                                <a href="/assets/travel-insurance.html" target="_blank">
                                    <img
                                        src="/assets/images/home/new/travel-insurance.jpg"
                                        alt="travel-insurance"
                                    />
                                    <h4>Travel Insurance</h4>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="clearfix"></div>
                <br />
                <div
                    id="tpmyModal66c74c2d0abcdbabb7a4c9ba"
                    className="modal fade tpmodelpopUp"
                    role="dialog"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <button type="button" className="close" data-dismiss="modal">
                                    x
                                </button>
                                <div className="trustpilot-wraper">
                                    <div className="review-block">
                                        <div className="review-content">
                                            <div className="rating-strip">
                                                <div className="time">2 days ago</div>
                                                <span className="first-letter">D</span>
                                                <div className="tp-rating position">
                                                    <img
                                                        src="/assets/images/trustpilot/stars-5.svg"
                                                        style={{ height: "20px" }} alt=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="name">Darlene Moore</div>
                                            <input
                                                type="hidden"
                                                id="66c74c2d0abcdbabb7a4c9ba"
                                                value="Wade assisted me with my itinerary for…"
                                            />
                                            <p className="txt">
                                                Wade assisted me with my itinerary for my trip, which I was
                                                very pleased. Great customer attention was given to me by
                                                this young man. He is a true asset to your company. Thank
                                                you, Darlene{" "}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    id="tpmyModal66c335abd66575b90d1e23b6"
                    className="modal fade tpmodelpopUp"
                    role="dialog"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <button type="button" className="close" data-dismiss="modal">
                                    x
                                </button>
                                <div className="trustpilot-wraper">
                                    <div className="review-block">
                                        <div className="review-content">
                                            <div className="rating-strip">
                                                <div className="time">6 days ago</div>
                                                <span className="first-letter">R</span>
                                                <div className="tp-rating position">
                                                    <img
                                                        src="/assets/images/trustpilot/stars-5.svg"
                                                        style={{ height: "20px" }} alt=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="name">Rj Washington</div>
                                            <input
                                                type="hidden"
                                                id="66c335abd66575b90d1e23b6"
                                                value="Best prices!"
                                            />
                                            <p className="txt">
                                                The company was reliable and customer service is on top of
                                                the game with handling misunderstandings!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    id="tpmyModal66bfe502ea5401c0b99a6c98"
                    className="modal fade tpmodelpopUp"
                    role="dialog"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <button type="button" className="close" data-dismiss="modal">
                                    x
                                </button>
                                <div className="trustpilot-wraper">
                                    <div className="review-block">
                                        <div className="review-content">
                                            <div className="rating-strip">
                                                <div className="time">8 days ago</div>
                                                <span className="first-letter">S</span>
                                                <div className="tp-rating position">
                                                    <img
                                                        src="/assets/images/trustpilot/stars-5.svg"
                                                        style={{ height: "20px" }} alt=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="name">Samuel Gomez</div>
                                            <input
                                                type="hidden"
                                                id="66bfe502ea5401c0b99a6c98"
                                                value="What a great team."
                                            />
                                            <p className="txt">
                                                I was having problems booking with JetBlue Airlines since
                                                last night in the their website. So I decided to search on
                                                the web for the JetBlue customer service for support.
                                                Somehow I got in contact with a Jetquin Travels representative
                                                named Marshall, the process when well. Great pronunciation
                                                in our communication. After the fair payment for the
                                                flights, I received a booking ID number with all the flight
                                                itinerary. And this when I noticed it was from Jetquin Travels
                                                and not JetBlue I got nervous and started to reach out to my
                                                bank and JetBlue to verify my flights, as for my first email
                                                response didn’t show the confirmation code. Anyway Marshall
                                                explained the process properly in the beginning of our
                                                conversation, that it will be taking a few minutes to
                                                process the booking of the flights. JetBlue and the bank
                                                both acknowledged the transaction, I began to feel better. A
                                                few minutes later I received my second email from
                                                Jetquin Travels with more information like the flight
                                                confirmation code. Shortly after I received a call from
                                                Jetquin Travels, a gentleman named Jonathan. This
                                                representative also cleared the air with our sitting
                                                arrangement as it wasn’t showing up on our itinerary. I will
                                                be traveling with my elderly mother, so i want to make sure
                                                she’s comfortable in her travels. So I paid a bit extra to
                                                seat in the front. Just wanted to share my thoughts, at
                                                first I was nervous dealing with a third party, but I can
                                                actually say I was taken care of by Jetquin Travels
                                                representatives. What an excellent team you have, BRAVO ZULU
                                                to Marshall and Jonathan. Great Job. Thank you both!!! for
                                                making my life easier.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    id="tpmyModal66be88ccb375e7b3a4bd4a54"
                    className="modal fade tpmodelpopUp"
                    role="dialog"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <button type="button" className="close" data-dismiss="modal">
                                    x
                                </button>
                                <div className="trustpilot-wraper">
                                    <div className="review-block">
                                        <div className="review-content">
                                            <div className="rating-strip">
                                                <div className="time">9 days ago</div>
                                                <span className="first-letter">C</span>
                                                <div className="tp-rating position">
                                                    <img
                                                        src="/assets/images/trustpilot/stars-4.svg"
                                                        style={{ height: "20px" }} alt=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="name">Chirag Sharma</div>
                                            <input
                                                type="hidden"
                                                id="66be88ccb375e7b3a4bd4a54"
                                                value="The experience was quite good as i was…"
                                            />
                                            <p className="txt">
                                                The experience was quite good as i was easily able to
                                                compare prizes for different dates, different airports and
                                                also different airlines. Must have a look here before
                                                booking{" "}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    id="tpmyModal66baa73709e776888a6d8952"
                    className="modal fade tpmodelpopUp"
                    role="dialog"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <button type="button" className="close" data-dismiss="modal">
                                    x
                                </button>
                                <div className="trustpilot-wraper">
                                    <div className="review-block">
                                        <div className="review-content">
                                            <div className="rating-strip">
                                                <div className="time">12 days ago</div>
                                                <span className="first-letter">F</span>
                                                <div className="tp-rating position">
                                                    <img
                                                        src="/assets/images/trustpilot/stars-5.svg"
                                                        style={{ height: "20px" }} alt=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="name">Fiona Loney</div>
                                            <input
                                                type="hidden"
                                                id="66baa73709e776888a6d8952"
                                                value="Satisfied customer"
                                            />
                                            <p className="txt">
                                                I want to thank your Agent Selvin Brad for the excellent
                                                customer service he displayed. He went above and beyond to
                                                ensure that the mattter I queried was thorougly dealt with.
                                                He was able to give the best possible advise on the matter.
                                                I felt comforable and satisfied with the service. Well done
                                                Selvin!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    id="tpmyModal66b97bb8331a3580d20a1152"
                    className="modal fade tpmodelpopUp"
                    role="dialog"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <button type="button" className="close" data-dismiss="modal">
                                    x
                                </button>
                                <div className="trustpilot-wraper">
                                    <div className="review-block">
                                        <div className="review-content">
                                            <div className="rating-strip">
                                                <div className="time">13 days ago</div>
                                                <span className="first-letter">J</span>
                                                <div className="tp-rating position">
                                                    <img
                                                        src="/assets/images/trustpilot/stars-5.svg"
                                                        style={{ height: "20px" }} alt=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="name">Jessica Diaz-Adara</div>
                                            <input
                                                type="hidden"
                                                id="66b97bb8331a3580d20a1152"
                                                value=" excellent customer service"
                                            />
                                            <p className="txt">
                                                I received excellent customer service from Scout! My
                                                questions were answered promptly and I was left satisfied.
                                                Definitely recommend booking with this company!{" "}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    id="tpmyModal66b7f398b1f9fd96605a93bb"
                    className="modal fade tpmodelpopUp"
                    role="dialog"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <button type="button" className="close" data-dismiss="modal">
                                    x
                                </button>
                                <div className="trustpilot-wraper">
                                    <div className="review-block">
                                        <div className="review-content">
                                            <div className="rating-strip">
                                                <div className="time">14 days ago</div>
                                                <span className="first-letter">T</span>
                                                <div className="tp-rating position">
                                                    <img
                                                        src="/assets/images/trustpilot/stars-4.svg"
                                                        style={{ height: "20px" }} alt=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="name">Trunkmonkey</div>
                                            <input
                                                type="hidden"
                                                id="66b7f398b1f9fd96605a93bb"
                                                value="Easy to use system"
                                            />
                                            <p className="txt">
                                                Easy to use system, found lower rates than all the other
                                                cheap flight services.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Script dangerouslySetInnerHTML={``} />
                <div className="contentBox">
                    <div className="container">
                        <br />
                        <p>
                            A one-stop site for all your travel needs, Jetquin Travels is an OTA
                            started by travelers and for the travelers, with an aim to make travel
                            booking convenient and budget-friendly. We have a team of travel
                            experts working round the clock with our partner airlines and travel
                            service providers so we can handpick the cheapest air tickets,
                            discount hotel rooms, car rentals and packages to destinations across
                            the globe. Whether you are planning a vacation or a business trip,
                            book cheap air tickets with Jetquin Travels and save big on your ticket
                            reservation.
                        </p>
                        <p>
                            Along with making travel affordable, we also believe in offering
                            unmatched user experience and customer service. Thanks to our in-house
                            technology team, we have developed our state-of-the-art booking
                            platform, through which travelers can scan hundreds of flight deals
                            and book the best-priced ticket in just a few clicks. That is not all.
                            When you book with us, you will also get to experience our world-className
                            24/7 customer service, who will assist you right from planning your
                            travel to booking the lowest airfare deals available online. What are
                            you waiting for? Book online or call us to fly with the cheapest
                            flight tickets to your dream destination.
                        </p>
                        <br />
                    </div>
                </div>
            </div>
        </>
    );
}


export default DestinationPage;         
