"use client";

import FlightCard from "@/app/_components/FlightCard/page";
import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import airportsDB from "../../../../../../lib/airports.json";
import airlines from "../../../../../../lib/airlines.json";
import FlightDetail from "@/app/_components/FlightDetail/page";
import { motion } from 'framer-motion';
import Loading from "@/app/(landing)/loading";
import OfferPopup from "@/app/_components/OfferPopup/page";
import FlightSearch from "@/app/_components/FlightSearch/page";
import FlightOfferCard from "@/app/_components/FlightOffers/page";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const FlightResultCompnent = () => {

    const router = useRouter();
    const searchParam = useSearchParams();
    const origin = searchParam.get("origin");
    const destination = searchParam.get("destination");
    const searchRef = useRef(null);

    const [uniqueAirlines, setUniqueAirlines] = useState([]);
    const [flightList, setFlightList] = useState([]);
    const [flightDetail, setFlightDetailVisible] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState(null);

    const [maxHeight, setMaxHeight] = useState("0px");
    const [mobileFilterVisible, setMobileFilterVisible] = useState(false);
    const [openedFilter, setOpenedFilter] = useState("Stops");
    const [offerPopupVisible, setOfferPopupVisible] = useState(false);

    const [loading, setLoading] = useState(true);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    const [depName, setDepName] = useState(null)

    const [nearbyAirports, setNearbyAirports] = useState([]);
    const [activeFlight, setActiveFlight] = useState(null);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [stopFilter, setStopFilter] = useState("")

    const [airlinesDetails, setAirlineDetails] = useState([])
    const [showMoreAirlines, setShowMoreAirlines] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState([]);
    const [selectedAirports, setSelectedAirports] = useState([]);

    const [selectedStop, setSelectedStop] = useState(null);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [selectedAirlines, setSelectedAirlines] = useState([]);
    const [isRoundTrip, setIsRoundTrip] = useState(false);

    const [selectedDepartureFilter, setSelectedDepartureFilter] = useState("");
    const [selectedArrivalFilter, setSelectedArrivalFilter] = useState("");
    const [departureCity, setDepartureCity] = useState('');
    const [arrivalCity, setArrivalCity] = useState('');

    const [visibleCount, setVisibleCount] = useState(10);
    const [isFlightSearchVisible, setFlightSearchVisible] = useState(false);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);

    const [grandTotal, setGrandTotal] = useState("");
    const [nearTotal, setNearTotal] = useState("");
    const [shortestTotal, setShortestTotal] = useState("");


    const timeFilters = [
        { label: "Early Morning", timeRange: "Before 6am", iconSrc: "/assets/images/listing/em.png", value: "Before 6am" },
        { label: "Morning", timeRange: "6am - 12pm", iconSrc: "/assets/images/listing/m.png", value: "6am - 12pm" },
        { label: "Afternoon", timeRange: "12pm - 6pm", iconSrc: "/assets/images/listing/a.png", value: "12pm - 6pm" },
        { label: "Evening", timeRange: "After 6pm", iconSrc: "/assets/images/listing/e.png", value: "After 6pm" },
    ];

    const [isCollapsed, setIsCollapsed] = useState(true); // Track the collapse state

    const toggleMatrix = () => {
        setIsCollapsed(!isCollapsed); // Toggle the collapse state
    };

    useEffect(() => {
        const tripType = searchParam.get("tripType");
        setIsRoundTrip(tripType === 'Round-Trip');
    }, [searchParam]);

    const stopOptions = flightList.flatMap(flight => {
        const stops = flight.itineraries[0].segments.length - 1;
        const grandTotal = parseFloat(flight.price.grandTotal);

        return [
            { label: "Non Stop", value: 0, price: grandTotal, flight },
            { label: "1 Stop", value: 1, price: grandTotal, flight },
            { label: "2 Stops", value: 2, price: grandTotal, flight }
        ].filter(option => option.value <= stops);
    });

    // Group by stop type and find minimum price
    const minPriceStops = stopOptions.reduce((acc, option) => {

        // console.log(option, "OPTIONS");

        if (option.value >= 0 && option.value <= 2) {
            if (!acc[option.value] || option.price < acc[option.value].price) {
                acc[option.value] = {
                    label: option.label,
                    value: option.value,
                    price: option.price,
                    flight: option.flight
                };
            }
        }
        return acc;
    }, {});

    const availableStops = Object.values(minPriceStops);

    // Filter the Flight 
    useEffect(() => {
        // console.log("coming here");
        // console.log({ activeFlight });
        let tmpData = flightList;
        if (activeFlight !== null) {
            tmpData = flightList.filter((obj) => {
                return obj.validatingAirlineCodes[0] === activeFlight.airlineCode;
            });
            setAppliedFilters(prev => {
                const existingFilter = prev.find(filter => filter.type === 'Airline');
                if (existingFilter) {
                    return prev.map(filter =>
                        filter.type === 'Airline' ? { ...filter, value: activeFlight.airlineName } : filter
                    );
                }
                return [...prev, { type: 'Airline', value: activeFlight.airlineName }];
            });

            // console.log(tmpData);
        }

        if (stopFilter === 'Non Stop') {
            tmpData = tmpData.filter(flight =>
                flight.itineraries.every(itinerary => itinerary.segments.length === 1)
            );
            setAppliedFilters(prev =>
                prev.filter(filter => filter.type !== 'Stop').concat({ type: 'Stop', value: 'Non-Stop' })
            );
        } else if (stopFilter === '1 Stop') {
            tmpData = tmpData.filter(flight =>
                flight.itineraries.some(itinerary => itinerary.segments.length === 2)
            );
            setAppliedFilters(prev =>
                prev.filter(filter => filter.type !== 'Stop').concat({ type: 'Stop', value: 'One-Stop' })
            );
        } else if (stopFilter === '2 Stops') {
            tmpData = tmpData.filter(flight =>
                flight.itineraries.some(itinerary => itinerary.segments.length > 2)
            );
            setAppliedFilters(prev =>
                prev.filter(filter => filter.type !== 'Stop').concat({ type: 'Stop', value: 'Two or More Stops' })
            );
        }


        setFilteredFlights(tmpData);
    }, [activeFlight, flightList, stopFilter, selectedAirports])

    const handleStopFilter = (type) => {
        const selectedOption = availableStops.find(option => option.label === type);
        setSelectedStop(selectedOption);
        setStopFilter(type);
    };

    const handleCheckboxChanges = (airportCode) => {
        setSelectedAirports((prevSelected) => {
            const isSelected = prevSelected.includes(airportCode);
            const newSelected = isSelected
                ? prevSelected.filter(code => code !== airportCode)
                : [...prevSelected, airportCode];

            setAppliedFilters((prevFilters) => {
                let newFilters;

                if (isSelected) {
                    // Remove airport filter if the checkbox is unchecked
                    newFilters = prevFilters.filter(filter => filter.value !== airportCode);
                } else {
                    // Add airport filter if the checkbox is checked
                    newFilters = [...prevFilters, { type: 'Airport', value: airportCode }];
                }

                return newFilters;
            });

            return newSelected;
        });
    };


    const filterFlights = (flights, isArrival) => {
        return flights.filter(flight => {
            // Determine which itinerary to use
            const itineraryIndex = isArrival && flight.itineraries.length > 1 ? 1 : 0;
            const segments = flight.itineraries[itineraryIndex]?.segments;

            if (!segments || segments.length === 0) {
                return false;
            }

            const time = new Date(segments[0].departure.at).getHours();

            // Use selected filter based on whether we're filtering arrival or departure
            const filterValue = isArrival ? selectedArrivalFilter : selectedDepartureFilter;

            switch (filterValue) {
                case 'Before 6am':
                    return time < 6;
                case '6am - 12pm':
                    return time >= 6 && time < 12;
                case '12pm - 6pm':
                    return time >= 12 && time < 18;
                case 'After 6pm':
                    return time >= 18;
                default:
                    return true; // No filter applied
            }
        });
    };

    useEffect(() => {
        if (flightList && flightList.length > 0) {
            const filtered = filterFlights(flightList, false);
            setFilteredFlights(filtered);

            if (selectedDepartureFilter) {
                setAppliedFilters(prev => [
                    ...prev.filter(filter => filter.type !== 'departureTime'),
                    { type: 'departureTime', value: selectedDepartureFilter }
                ]);
            }
        }
    }, [flightList, selectedDepartureFilter]);

    useEffect(() => {
        if (isRoundTrip && flightList && flightList.length > 0) {
            const filtered = filterFlights(flightList, true);
            setFilteredFlights(filtered);

            if (selectedArrivalFilter) {
                setAppliedFilters(prev => [
                    ...prev.filter(filter => filter.type !== 'arrivalTime'),
                    { type: 'arrivalTime', value: selectedArrivalFilter }
                ]);
            }
        }
    }, [flightList, selectedArrivalFilter, isRoundTrip]);

    const handleDepartureFilterClick = (filter) => {
        setSelectedDepartureFilter(filter);
    };

    const handleArrivalFilterClick = (filter) => {
        setSelectedArrivalFilter(filter);
    };

    const handleCheckboxChange = (flight) => {
        const { airlineCode } = flight;

        // Set selected airline to only the one that's currently selected
        setSelectedAirlines([airlineCode]);

        // Set the active flight or reset if the same airline is clicked
        setActiveFlight(prev => (prev && prev.airlineCode === airlineCode) ? null : flight);
    };

    const variants = {
        hidden: { x: '100%', opacity: 0 }, // Start off-screen to the right
        visible: { x: 0, opacity: 1, transition: { ease: "easeOut", duration: 0.5 } },
        exit: { x: '100%', opacity: 0, transition: { ease: "easeIn", duration: 0.5 } }
    };

    //Function for Extract the data
    const processFlightData = (json) => {
        let flightDetails = [];
        const uniqueAirlines = new Set();

        json.data.forEach(a => {
            a.stops = a.itineraries[0].segments.length - 1; // Calculate stops

            // Process each itinerary and segment
            a.itineraries.forEach(b => {
                b.segments.forEach(segment => {
                    segment.airline = airlines[segment.carrierCode];
                    segment.arrival.airport = airportsDB[segment.arrival.iataCode];
                    segment.departure.airport = airportsDB[segment.departure.iataCode];

                    // Append cabin class to the segment
                    const cabin = a.travelerPricings[0].fareDetailsBySegment.find(fare => fare.segmentId === segment.id)?.cabin;
                    if (cabin) segment.cabin = cabin;
                });
            });

            // Create a new object to store combined details
            const flightDetail = {
                price: a.price.grandTotal,
                airlineCode: a.validatingAirlineCodes[0],
                isNonStop: a.stops === 0,
                isOnePlusStop: a.stops > 0,
                airlineName: a.itineraries[0].segments[0].airline.name,
                airlineLogo: a.itineraries[0].segments[0].airline.logo,
                departureAirportName: a.itineraries[0].segments[0].departure.airport.name,
                departureAirportIata: a.itineraries[0].segments[0].departure.iataCode,
                arrivalAirportName: a.itineraries[0].segments[0].arrival.airport.name,
                arrivalAirportIata: a.itineraries[0].segments[0].arrival.iataCode,
                duration: a.itineraries[0].duration,
                departureAirportCity: a.itineraries[0].segments[0].departure.airport.city,
                arrivalAirportCity: a.itineraries[0].segments[0].arrival.airport.city,
            };

            if (!uniqueAirlines.has(flightDetail.airlineCode)) {
                uniqueAirlines.add(flightDetail.airlineCode);
                flightDetails.push(flightDetail);
                setDepartureCity(flightDetail.departureAirportCity);
                setArrivalCity(flightDetail.arrivalAirportCity);
            }
        });

        // console.log(flightDetails, "Flights");

        setAirlineDetails(flightDetails)
        return flightDetails;
    };

    const hideOfferPopup = () => {
        setOfferPopupVisible(false);
    }

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const oneway = searchParam.get("tripType") === 'One-Way';
    // console.log(oneway, "ONEWAY");

    useEffect(() => {
        const fetchFlightOffers = async () => {
            let travellersArr = [];
            if (searchParam.get("adult")) {
                for (let x = 0; x < parseInt(searchParam.get("adult")); x++) {
                    travellersArr.push({ id: travellersArr.length + 1, travelerType: "ADULT" })
                }
            }

            if (searchParam.get("child")) {
                for (let x = 0; x < parseInt(searchParam.get("child")); x++) {
                    travellersArr.push({ id: travellersArr.length + 1, travelerType: "CHILD" })
                }
            }

            if (searchParam.get("infant")) {
                for (let x = 0; x < parseInt(searchParam.get("infant")); x++) {
                    travellersArr.push({ id: travellersArr.length + 1, travelerType: "SEATED_INFANT" })
                }
            }

            // console.log(searchParam.get("returnD"));
            // console.log(searchParam.get("depDate"));


            let cabinRestrictionObj = {};
            if (searchParam.get("airline") !== "all") {
                cabinRestrictionObj = {
                    "includedCarrierCodes": [searchParam.get("airline")]
                }
            }

            // console.log(cabinRestrictionObj, "ARRRRRRRRRRR");

            let query = {
                "currencyCode": "USD",
                "originDestinations": [
                    {
                        "id": "1",
                        "originLocationCode": searchParam.get("origin"),
                        "destinationLocationCode": searchParam.get("destination"),
                        "departureDateTimeRange": {
                            "date": searchParam.get("depDate")
                        }
                    }
                ],
                "travelers": travellersArr,
                "sources": [
                    "GDS"
                ],
                "searchCriteria": {
                    "maxFlightOffers": 50,
                    "flightFilters": {
                        "cabinRestrictions": [
                            {
                                "cabin": searchParam.get("cabin"),
                                "originDestinationIds": [
                                    "1"
                                ]
                            }
                        ]

                    },

                }
            };


            let query1 = {
                "currencyCode": "USD",
                "originDestinations": [
                    {
                        "id": "1",
                        "originLocationCode": searchParam.get("origin"),
                        "destinationLocationCode": searchParam.get("destination"),
                        "departureDateTimeRange": {
                            "date": searchParam.get("depDate")
                        }
                    },
                    {
                        "id": "2",
                        "originLocationCode": searchParam.get("destination"),
                        "destinationLocationCode": searchParam.get("origin"),
                        "departureDateTimeRange": {
                            "date": searchParam.get("returnD")
                        }
                    }
                ],
                "travelers": travellersArr,
                "sources": [
                    "GDS"
                ],
                "searchCriteria": {
                    "maxFlightOffers": 50,
                    "flightFilters": {
                        "cabinRestrictions": [
                            {
                                "cabin": searchParam.get("cabin"),
                                "originDestinationIds": [
                                    "1", "2"
                                ]
                            }
                        ]

                    },

                }
            };


            try {
                const response = await fetch("https://api.amadeus.com/v2/shopping/flight-offers", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${searchParam.get("tk")}`
                    },
                    body: oneway ? JSON.stringify(query) : JSON.stringify(query1)
                });

                const json = await response.json();
                console.log(json, "JSON");
                const FlightList = json.data.map(a => {
                    a.stops = a.itineraries[0].segments.length - 1;
                    a.itineraries.forEach(b => {
                        b.segments.forEach(segment => {
                            segment.airline = airlines[segment.carrierCode];
                            segment.arrival.airport = airportsDB[segment.arrival.iataCode];
                            segment.departure.airport = airportsDB[segment.departure.iataCode];
                            // Append the cabin class to the segment
                            const cabin = a.travelerPricings[0].fareDetailsBySegment.find(fare => fare.segmentId === segment.id)?.cabin;
                            if (cabin) segment.cabin = cabin;
                        });
                    });
                    return a;
                });

                let newFlightList;

                if (!oneway) {
                    newFlightList = json.data.map(a => {
                        a.stops = a.itineraries[1].segments.length - 1;
                        a.itineraries.forEach(b => {
                            b.segments.forEach(segment => {
                                segment.airline = airlines[segment.carrierCode];
                                segment.arrival.airport = airportsDB[segment.arrival.iataCode];
                                segment.departure.airport = airportsDB[segment.departure.iataCode];
                                // Append the cabin class to the segment
                                const cabin = a.travelerPricings[0].fareDetailsBySegment.find(fare => fare.segmentId === segment.id)?.cabin;
                                if (cabin) segment.cabin = cabin;
                            });
                        });
                        // console.log(newFlightList, "NEWFLIGHTLIST");

                        return a;
                    });
                }


                if (!oneway) {
                    setFlightList(FlightList);
                } else {
                    const twoway = [...(FlightList || []), ...(newFlightList || [])]
                    // console.log(twoway, "TWOWAY");

                    setFlightList(twoway);
                }

                const depCityName = FlightList[0]?.itineraries[0]?.segments[0]?.departure?.airport?.city
                setDepName(depCityName)
                // function call data based on json
                const flightDetails = processFlightData(json);

                setUniqueAirlines(flightDetails);

                setFlightList(FlightList);
                if (FlightList.length <= 0) {
                    router.push(`/home/no-results?origin=${searchParam.get("origin")}&destination=${searchParam.get("destination")}&depDate=${searchParam.get("depDate")}&returnD=${searchParam.get("returnD")}`);
                } else {
                    setFlightList(FlightList);
                    setLoading(false);
                    let offerInterval = setInterval(() => {
                        if (!offerPopupVisible) {
                            setOfferPopupVisible(true);
                        }
                    }, 50000);
                }
            } catch (err) {
                router.push(`/home/no-results?origin=${searchParam.get("origin")}&destination=${searchParam.get("destination")}&depDate=${searchParam.get("depDate")}&returnD=${searchParam.get("returnD")}`);
            }
        }
        fetchFlightOffers();
    }, [searchParam])

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

    // Filtering the flight based on Near By airports

    useEffect(() => {
        const fetchNearbyAirports = async () => {

            if (flightList.length === 0) {
                // console.log("No flights available.");
                return;
            }

            const arrivalSegment = flightList[0].itineraries[0].segments[0].arrival.airport;
            const latitude = arrivalSegment.latitude;
            const longitude = arrivalSegment.longitude;

            // console.log(latitude, "HEY Latitude");
            // console.log(longitude, "HEY Longitude");

            try {
                let response = await fetch(`https://api.amadeus.com/v1/reference-data/locations/airports?latitude=${latitude}&longitude=${longitude}&radius=200&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=relevance`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${searchParam.get("tk")}`
                    }
                });

                let result = await response.json();

            } catch (error) {
                console.error('Error fetching nearby airports:', error);
                setNearbyAirports([]);
            }
        };
        fetchNearbyAirports();
    }, [flightList]);

    // Filtering the data based on Shortest Flight 
    const getShortestFlights = () => {
        return [...flightList]
            .sort((a, b) => {
                return a.itineraries[0].segments.length - b.itineraries[0].segments.length;
            })
            .slice(0, 10);
    }

    useEffect(() => {

        const shortestFlights = getShortestFlights();

        const allPrices = Array.isArray(flightList) ? flightList.map(flight => flight.price) : [];
        const nearbyPrices = Array.isArray(nearbyAirports) ? nearbyAirports.map(flight => flight.price) : [];
        const shortestPrices = Array.isArray(shortestFlights) ? shortestFlights.map(flight => flight.price) : [];

        // console.log(allPrices, "ALL PRICES");
        // console.log(nearbyPrices, "NEARBY");
        // console.log(shortestPrices, "SHORTEST");

        if (allPrices.length > 0 || nearbyPrices.length > 0 || shortestPrices.length > 0) {
            setGrandTotal(allPrices[0]?.grandTotal);
            setNearTotal(nearbyPrices[0]?.grandTotal);
            setShortestTotal(shortestPrices[0]?.grandTotal);

            console.log(allPrices[0]?.grandTotal, "MINIMUM-ALL");
        } else {
            console.log("allPrices is empty or not defined");
        }

    }, [flightList, nearbyAirports]);

    useEffect(() => {
        if (flightList.length > 0) {
            const prices = flightList.map(flight => parseFloat(flight.price.grandTotal));
            const calculatedMinPrice = Math.min(...prices);
            const calculatedMaxPrice = Math.max(...prices);
            setMinPrice(calculatedMinPrice);
            setMaxPrice(calculatedMaxPrice);
            setPriceRange({ min: calculatedMinPrice, max: calculatedMaxPrice });
            setFilteredFlights(flightList); // Optionally reset filtered flights
        }
    }, [flightList]);

    const handlePriceChange = (newRange) => {
        setPriceRange({ min: newRange[0], max: newRange[1] });

        const filtered = flightList.filter(flight => {
            const flightPrice = parseFloat(flight.price.grandTotal);
            return flightPrice >= newRange[0] && flightPrice <= newRange[1];
        });

        setFilteredFlights(filtered);

        setAppliedFilters(prevFilters => {

            const priceFilterIndex = prevFilters.findIndex(filter => filter.type === 'Price range');

            if (priceFilterIndex !== -1) {

                const updatedFilters = [...prevFilters];
                updatedFilters[priceFilterIndex] = {
                    type: 'Price range',
                    value: `$${newRange[0]} - $${newRange[1]}`,
                };
                return updatedFilters;
            } else {

                return [
                    ...prevFilters,
                    {
                        type: 'Price range',
                        value: `$${newRange[0]} - $${newRange[1]}`,
                    },
                ];
            }
        });
    };

    const resetFilters = () => {
        setPriceRange({ min: minPrice, max: maxPrice });
        setFilteredFlights(flightList);
        setAppliedFilters([]);
    };

    const total = parseInt(searchParam.get("adult")) + parseInt(searchParam.get("child"))

    // For Mobile View 
    const filters = [
        { id: "stops", label: "Stops", tabId: "tab-1", resetFunction: "restFilter", resetParam: "stops" },
        { id: "price", label: "Price", tabId: "tab-3", resetFunction: "restpricefilter", resetParam: "" },
        { id: "airlines", label: "Airlines", tabId: "tab-5", resetFunction: "restFilter", resetParam: "airline" },
        { id: "time", label: "Time", tabId: "tab-4", resetFunction: "restmobdepretfilter", resetParam: "" },
        { id: "airports", label: "DepartureAirports", tabId: "tab-6", resetFunction: "restFilter", resetParam: "airports" }
    ];

    // Handler to open FlightSearch component
    const openFlightSearch = () => {
        setFlightSearchVisible(true);
    }

    // Load more results
    const loadMoreResults = () => {
        setVisibleCount(visibleCount + 10); // Load 10 more results
    };

    // Reset all filters
    const resetAllFilters = () => {
        setStopFilter(null);
        setActiveFlight(null);
        setAppliedFilters([]);
        setSelectedStop(null)
        setPriceRange({ min: minPrice, max: maxPrice });
        setFilteredFlights(flightList);
        setSelectedAirlines([]);
        setSelectedDepartureFilter("");
        setSelectedArrivalFilter("");
        setSelectedAirports([]);
        setVisibleCount(10);
    };

    return <>
        {!offerPopupVisible && flightList && <div onClick={() => setOfferPopupVisible(true)} className="count-top-icon pointer uc-minimize-strip" id="reopen_ucb" bis_skin_checked="1">
            <div className="strip-content ng-binding" bis_skin_checked="1">
                <img src="/assets/images/uc/mob-call.gif" />
                <img className="tel-icon" src="/assets/images/uc/telephone-call.svg" />
                $  {flightList[0] && flightList[0].travelerPricings[0].price.total - 4}
                {/* <span className="Timer">00:14:16</span> */}
            </div>
        </div>}
        {offerPopupVisible && <OfferPopup hideOfferPopup={hideOfferPopup} flight={flightList[0]} />}
        {loading && <Loading cabin={searchParam.get("cabin")} total={total} depDate={searchParam.get("depDate")} origin={searchParam.get("origin")} destination={searchParam.get("destination")} originName={searchParam.get("originName")} destName={searchParam.get("destName")} />}
        {flightDetail && <motion.div
            id="_flight-details"
            class="flight-details collapse"
            style={{ display: "block", height: "100% !important", position: "fixed", right: 0, top: 0 }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            bis_skin_checked="1">
            <div bis_skin_checked="1">
                {/* <!-- Nav tabs --> */}
                <div class="leg-top-fix" bis_skin_checked="1">
                    <div class="detail-head" bis_skin_checked="1">
                        <a class="close-btn" style={{}} onClick={() => setFlightDetailVisible(false)} ><img src="/assets/images/uc/cancel.svg" alt=" /" /></a>
                    </div>
                    <ul class="flight-leg-tab" role="tablist">
                        <li role="presentation" class="active deptab"><a href="#" onclick="flightdetailAction(0)" aria-controls="Departure" role="tab" data-toggle="tab"><i class="fa fa-plane" style={{ transform: "rotate(45deg)" }}></i> Departure</a></li>
                        {/* <!--<li role="presentation" class="pricetab"><a href="#" onclick="flightdetailAction(2)" aria-controls="price" role="tab" data-toggle="tab"><i class="fa fa-file-text" aria-hidden="true"></i> Fare Breakup</a></li>--> */}
                    </ul>
                </div>
                <FlightDetail selectedFlight={selectedFlight && selectedFlight} travellerDetails={{ adults: searchParam.get("adult"), child: searchParam.get("child"), infant: searchParam.get("infant"), cabin: searchParam.get("cabin"), tripType: searchParam.get("tripType") }} />
            </div>
        </motion.div>}
        <div className="body-content">
            <div
                id="overlay_detail"
                className="midum-overlay"
                style={{ display: "none" }}
            />

            <div className="modify-engine-wrapper">
                <a href="javascript:void(0);" className="close-sidebar fa fa-close" />
                <div className="holder">
                    <div className="modify-engine">
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
                                                                {origin} &nbsp;
                                                                <b>
                                                                    <i className="fa fa-exchange" />
                                                                </b>
                                                                &nbsp; {destination}
                                                                <br />
                                                                {searchParam.get("depDate")}, {searchParam.get("returnD")}, {total} Travelers, {searchParam.get("cabin")}
                                                            </>
                                                        ) : (
                                                            <>
                                                                {origin} &nbsp;
                                                                <b>
                                                                    <i className="fa fa-arrow-right" />
                                                                </b>
                                                                &nbsp; {destination}
                                                                <br />
                                                                {searchParam.get("depDate")}, {total} Travelers, {searchParam.get("cabin")}
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

            {/* MOBILE VIEW */}
            <div className="mobile-header-fixed">
                <div className="mobile-itenery modifySearchMobile">
                    <div className="result-itenery">
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


                                {/* For Recheck Tommorow */}

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

                                {/* Flight itinerary details */}
                                <div className="city-itenery">
                                    <div className="column">
                                        <p className="airportCode">{origin}</p>
                                    </div>
                                    <div className="column">
                                        <div className="airporticon">
                                            <b>
                                                <i className="fa fa-long-arrow-right" aria-hidden="true" />
                                            </b>
                                        </div>
                                    </div>
                                    <div className="column">
                                        <p className="airportCode">{destination}</p>
                                    </div>
                                    <div className="clearfix" />

                                    <div className="itenery-date">
                                        {searchParam.get('tripType') === 'Round-Trip' ? (
                                            <>
                                                {searchParam.get('depDate')}, {searchParam.get('returnD')},{' '}
                                                <span>{total} Traveler</span>, {searchParam.get('cabin')}
                                            </>
                                        ) : (
                                            <>
                                                {searchParam.get('depDate')},{' '}
                                                <span>{total} Traveler</span>, {searchParam.get('cabin')}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="filter_strip_mobile modifyFilterMobile hidden-lg hidden-md">
                    <img
                        className="filter_icon_mobile responsiveFilter_btn" onClick={() => setMobileFilterVisible(true)}
                        src="https://www.lookbyfare.com/us/images/svg/filter-icon.svg"
                    />
                    <ul>
                        {filters.map((tab) => (
                            <li
                                key={tab.id}
                                id={`filterTabs_${tab.id}`}
                                onClick={() => {
                                    setOpenedFilter(tab.label);  // Set the opened filter label
                                    setMobileFilterVisible(true); // Set the mobile filter visible
                                }}
                                className={openedFilter === tab.label ? "active" : ""}
                            >
                                <a data-toggle="tab" href={`#${tab.id}`}>
                                    {tab.label}
                                </a>
                            </li>
                        ))}

                    </ul>
                </div>
            </div>

            <loading>
                <div className="loader" style={{ position: "absolute", display: "none" }} />
            </loading>

            <div id="div_gotopayment" style={{ display: "none" }}>
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
                >
                    <img src="/assets/images/loading.gif" style={{ width: 80 }} />
                    <span id="loadermsg" style={{ fontSize: 12, color: "#ff7f00" }} />
                </div>
                <div className="midum-overlay" id="fadebackground" />
            </div>

            <div className="listing-wrapper">
                <div className="container">
                    <input type="hidden" id="tabvalue" name="tabvalue" defaultValue="all" />
                    <a
                        className="matrix_btn visible-sm hidden-xs"
                        role="button"
                        id="marixOption"
                        data-toggle="collapse"
                        onClick={toggleMatrix}
                        href="javascript:void(0);"
                        aria-expanded="true"
                        aria-controls="airlineMatrixblock"
                        style={{ marginLeft: 5 }}
                    >
                        <i className="fa fa-th-large" aria-hidden="true" /> Matrix{" "}
                        <i className="fa fa-angle-up" aria-hidden="true" />
                    </a>
                    <div className="row">
                        <div className="col-sm-12 col-md-3 col-xs-12">
                            <div className={`show-component-mobile ${mobileFilterVisible && "open"}`}>
                                <div className="filter-main-head">
                                    Filters
                                    <svg
                                        width={16}
                                        height={16}
                                        fill="currentColor"
                                        className="bi bi-x close-sidebar"
                                        viewBox="0 0 16 16"
                                        onClick={() => setMobileFilterVisible(false)}
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                                        />
                                    </svg>
                                </div>
                                <ul className="filterTabs">
                                    {filters.map((tab) => (
                                        <li
                                            key={tab.id}
                                            id={`filterTabs_${tab.id}`}
                                            onClick={() => setOpenedFilter(tab.label)}
                                            className={openedFilter === tab.label ? "active" : ""}
                                        >
                                            <a data-toggle="tab" href={`#${tab.id}`}>
                                                {tab.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <div className="clearfix" />
                                <div className="holder">
                                    <div className="filter-block">

                                        <div className="filter-item filter_top_info">
                                            <h4>
                                                <a
                                                    href="javascript:void(0);"
                                                    className="clear-all-filters pull-right hidden-xs"
                                                    style={{ display: "block" }}
                                                    onClick={resetAllFilters}
                                                >
                                                    Reset all
                                                </a>
                                                <i className="fa fa-filter" aria-hidden="true" /> Filter
                                                your result
                                            </h4>
                                            <p className="result-found">
                                                <span id="totalResults">{flightList.length}</span> Results Found{" "}
                                            </p>
                                        </div>

                                        <div
                                            id="tab-1"
                                            className={`filter-item tab-pane ${openedFilter === "Stops" && "active"}`}
                                            style={{ clear: "both" }}
                                        >
                                            <div className="head">
                                                <a
                                                    href="javascript:void(0);"
                                                    className="headairport"
                                                    onClick={() => {
                                                        setStopFilter(null);
                                                        setAppliedFilters([]);
                                                        setSelectedStop(null);
                                                    }}
                                                >
                                                    Reset
                                                </a>
                                                Stops
                                            </div>
                                            <div className="filter-data">
                                                <div className="inputSet stopset">
                                                    {availableStops.map(option => (
                                                        <label className="mode" key={option.value} onClick={() => handleStopFilter(option.label)}>
                                                            <span className="filter-price">${option.price}</span>
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedStop?.value === option.value}
                                                                readOnly
                                                            />
                                                            <span>{option.label}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            id="tab-3"
                                            className={`filter-item tab-pane ${openedFilter === "Price" && "active"}`}
                                            style={{ clear: "both" }}
                                        >
                                            <div className="head">
                                                <a
                                                    href="javascript:void(0);"
                                                    className="headairport"
                                                    onClick={resetFilters}
                                                >
                                                    Reset
                                                </a>
                                                Price Range
                                            </div>
                                            <div className="filter-data">
                                                <p className="time-filter-data">
                                                    <span className="slider-range2 pull-right">${priceRange.max}</span>
                                                    <span className="slider-range">${priceRange.min}</span>
                                                </p>
                                                <Slider
                                                    range
                                                    min={minPrice}
                                                    max={maxPrice}
                                                    value={[priceRange.min, priceRange.max]}
                                                    onChange={handlePriceChange}
                                                />
                                                <br />
                                            </div>
                                        </div>

                                        <div
                                            id="tab-4"
                                            className={`filter-item tab-pane ${openedFilter === "Time" && "active"}`}
                                            style={{ clear: "both" }}
                                        >
                                            <div className="head">
                                                <a
                                                    href="javascript:void(0);"
                                                    className="headairport"
                                                    onClick={() => {
                                                        setSelectedDepartureFilter("");
                                                        setSelectedArrivalFilter("");
                                                        setAppliedFilters([]);
                                                    }}
                                                >
                                                    Reset
                                                </a>
                                                <i className="fa fa-plane" style={{ transform: "rotate(45deg)" }} />{" "}
                                                From {departureCity}
                                            </div>

                                            <div className="filter-data mb20">
                                                <ul className="time_filter _deptimecontainer">
                                                    {timeFilters.map((filter) => (
                                                        <li
                                                            key={filter.value}
                                                            className="deptimefilter"
                                                            onClick={() => handleDepartureFilterClick(filter.value)}
                                                        >
                                                            <img src={filter.iconSrc} alt={filter.label} />
                                                            <strong>{filter.label}</strong>
                                                            <div className="time">{filter.timeRange}</div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {isRoundTrip && (
                                                <div>
                                                    <div className="head">
                                                        <a
                                                            href="javascript:void(0);"
                                                            className="headrettime"
                                                            style={{ display: "none" }} // Adjust visibility based on your needs
                                                            onClick={() => { }}
                                                        >
                                                            Reset
                                                        </a>
                                                        <i className="fa fa-plane" style={{ transform: "rotate(225deg)" }} />
                                                        From {arrivalCity}
                                                    </div>
                                                    <div className="filter-data mb20">
                                                        <ul className="time_filter _deptimecontainer">
                                                            {timeFilters.map((filter) => (
                                                                <li
                                                                    key={filter.value}
                                                                    className="deptimefilter"
                                                                    onClick={() => handleArrivalFilterClick(filter.value)}
                                                                >
                                                                    <img src={filter.iconSrc} alt={filter.label} />
                                                                    <strong>{filter.label}</strong>
                                                                    <div className="time">{filter.timeRange}</div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div
                                            id="tab-5"
                                            className={`filter-item bdrR0 tab-pane ${openedFilter === "Airlines" && "active"}`}
                                        >
                                            <div className="head">
                                                <a
                                                    href="javascript:void(0);"
                                                    className="headairport"
                                                    onClick={() => {
                                                        setActiveFlight(null);
                                                        setSelectedAirlines([]);
                                                        setAppliedFilters([]);
                                                    }}
                                                >
                                                    Reset
                                                </a>
                                                Airlines
                                            </div>
                                            <div className="filter-data">
                                                {airlinesDetails && airlinesDetails.length > 0 ? (
                                                    airlinesDetails.slice(0, showMoreAirlines ? airlinesDetails.length : 3).map((flight, index) => (
                                                        <div className="inputSet" key={index}>
                                                            <label className="mode">
                                                                <span className="filter-price">${flight.price}</span>
                                                                <input
                                                                    type="checkbox"
                                                                    name="airline"
                                                                    checked={selectedAirlines.includes(flight.airlineCode)}
                                                                    onChange={() => handleCheckboxChange(flight)}
                                                                />
                                                                <span>{flight.airlineName}</span>
                                                            </label>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>No airlines available</p>
                                                )}
                                                <div className="clearfix" />
                                                <div className="show-more">
                                                    <a
                                                        href="javascript:void(0);"
                                                        id="moreair"
                                                        onClick={() => setShowMoreAirlines(!showMoreAirlines)}
                                                    >
                                                        {showMoreAirlines ? 'Show Less Airlines' : 'More Airlines'} <i className="fa fa-angle-down" />
                                                    </a>
                                                </div>
                                                <div
                                                    className="multi-airline-icon"
                                                    style={{ display: "none", margin: "10px 0 0" }}
                                                >
                                                    <img src="https://www.lookbyfare.com/us/images/listing/mal-blue.png" /> Indicate
                                                    Multiple Airline
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            id="tab-6"
                                            className={`filter-item tab-pane ${openedFilter === "DepartureAirports" && "active"}`}
                                        >
                                            <div className="head">
                                                <a
                                                    href="javascript:void(0);"
                                                    className="headairport"
                                                    onClick={() => {
                                                        setSelectedAirports([]);
                                                        setAppliedFilters([]);
                                                    }}
                                                >
                                                    Reset
                                                </a>
                                                <i className="fa fa-plane" style={{ transform: "rotate(45deg)" }} />

                                                <span>
                                                    {searchParam.get("tripType") === 'One-Way'
                                                        ? 'Departure Airports'
                                                        : 'Departure Airports'
                                                    }
                                                </span>
                                            </div>

                                            <div className="filter-data">

                                                {Array.from(new Set(airlinesDetails.map(flight => flight.departureAirportIata)))
                                                    .map(airportCode => {
                                                        const flight = airlinesDetails.find(flight => flight.departureAirportIata === airportCode);
                                                        return (
                                                            <div className="inputSet" key={airportCode}>
                                                                <label className="mode">
                                                                    <input
                                                                        type="checkbox"
                                                                        name="departureairports"
                                                                        checked={selectedAirports.includes(airportCode)}
                                                                        onChange={() => handleCheckboxChanges(airportCode, 'departure')}
                                                                    />
                                                                    <span>{flight.departureAirportIata} ({flight.departureAirportName})</span>
                                                                </label>
                                                            </div>
                                                        );
                                                    })}

                                                {searchParam.get("tripType") === 'Round-Trip' && (

                                                    <>
                                                        <i className="fa fa-plane" style={{ transform: "rotate(45deg)" }} />
                                                        <div className="head">
                                                            <span ><b>Arrival Airports</b></span>
                                                        </div>
                                                        {Array.from(new Set(airlinesDetails.map(flight => flight.arrivalAirportIata)))
                                                            .map(airportCode => {
                                                                const flight = airlinesDetails.find(flight => flight.arrivalAirportIata === airportCode);
                                                                return (
                                                                    <div className="inputSet" key={airportCode}>
                                                                        <label className="mode">
                                                                            <input
                                                                                type="checkbox"
                                                                                name="arrivalairports"
                                                                                checked={selectedAirports.includes(airportCode)}
                                                                                onChange={() => handleCheckboxChanges(airportCode, 'arrival')}
                                                                            />
                                                                            <span>{flight.arrivalAirportIata} ({flight.arrivalAirportName})</span>
                                                                        </label>
                                                                    </div>
                                                                );
                                                            })}
                                                    </>
                                                )}

                                                <div className="clearfix" />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="mobile-button">
                                    <a
                                        href="javascript:void(0);"
                                        onClick={resetAllFilters}
                                        className="reset-all-filters"
                                    >
                                        Reset all Filter
                                    </a>
                                    <a href="javascript:void(0);" className="apply-filters" onClick={() => setMobileFilterVisible(false)}>
                                        Close
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-9 col-xs-12">
                            <div className="listing-matrix-section">
                                <FlightOfferCard airlinesData={uniqueAirlines} setActiveFlight={setActiveFlight} handleStopFilter={handleStopFilter} />

                            </div>
                            <div className="covid-list hidden-xs">
                                <b>Note:</b> All the fares displayed are for One Way Trip and are in
                                USD, inclusive of base fare, taxes and service fees. Additional{" "}
                                <a
                                    href="/baggage-fees"
                                    style={{ color: "#4863db" }}
                                    target="_blank"
                                >
                                    baggage fees
                                </a>{" "}
                                may apply as per the airline(s) policies. Some of the flights
                                results shown could either be for other dates or nearby airport(s).
                            </div>
                            <div className="covid-list visible-xs">
                                <b>Note:</b> All the fares displayed are for
                                <span id="covidAirlinemsg" style={{ display: "none" }}>
                                    One Way Trip and are in USD, inclusive of base fare, taxes and
                                    service fees. Additional{" "}
                                    <a href="/baggage-fees" target="_blank">
                                        baggage fees
                                    </a>{" "}
                                    may apply as per the airline(s) policies. Some of the flights
                                    results shown could either be for other dates or nearby
                                    airport(s).
                                </span>
                                <a
                                    className="d-block"
                                    href="javascript:void(0);"
                                    role="button"
                                    aria-expanded="false"
                                    aria-controls="covidAirlinemsg"
                                >
                                    <u>
                                        <span className="showMore">Show</span>
                                        <i className="fa fa-angle-down" aria-hidden="true" />
                                    </u>
                                </a>
                            </div>
                            <div className="listappliedfiltr hidden-xs">
                                {appliedFilters.length > 0 && (
                                    <>
                                        <div style={{ float: "left" }}>
                                            {/* Display applied filters */}
                                            <ul>
                                                {appliedFilters.map((filter, index) => (
                                                    <li key={index}>
                                                        {filter.type}: {filter.value}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div style={{ float: "left", marginTop: 2, paddingLeft: 20 }}>
                                            <div className="filter-item filter_top_info">
                                                <a
                                                    href="javascript:void(0);"
                                                    className="clear-all-filters pull-right hidden-xs"
                                                    onClick={() => {
                                                        setStopFilter(null);
                                                        setActiveFlight(null);
                                                        setAppliedFilters([]);
                                                        setSelectedStop(null)
                                                        setPriceRange({ min: minPrice, max: maxPrice });
                                                        setFilteredFlights(flightList);
                                                        setSelectedAirlines([]);
                                                        setSelectedDepartureFilter("");
                                                        setSelectedArrivalFilter("");
                                                        setSelectedAirports([]);
                                                    }}
                                                >
                                                    Reset all
                                                </a>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="clearfix" />

                            <div className="shorting-tab">
                                <ul>
                                    <li
                                        id="all"
                                        className={activeTab === 'all' ? 'active' : ''}
                                        onClick={() => handleTabClick('all')}
                                    >
                                        <b>All Results</b>
                                        <br />
                                        <span id="spn_all_amount">${grandTotal}</span>
                                    </li>
                                    <li
                                        id="nearby"
                                        className={activeTab === 'nearby' ? 'active' : ''}
                                        onClick={() => handleTabClick('nearby')}
                                    >
                                        <b>Nearby Airport(s)</b>
                                        <br />
                                        <span id="spn_nearby_amount">${nearTotal}</span>
                                    </li>
                                    <li
                                        id="shortest"
                                        className={activeTab === 'shortest' ? 'active' : ''}
                                        onClick={() => handleTabClick('shortest')}
                                    >
                                        <b>Shortest Flights</b>
                                        <br />
                                        <span id="spn_shortest_amount">${shortestTotal}</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Content Area */}
                            <div className="result-block sss901">
                                <div className="row">
                                    <div className="col-md-12 col-xs-12 h-36">
                                        <div className="flexi-content hidden-xs">
                                            <span>
                                                {activeTab === 'all'
                                                    ? 'All Results'
                                                    : activeTab === 'nearby'

                                                        ? 'Nearby Airports'
                                                        : activeTab === 'shortest'
                                                            ? 'Shortest Flights'
                                                            : ''}
                                            </span>
                                        </div>
                                    </div>
                                </div>


                                {activeTab === 'all' && filteredFlights.slice(0, visibleCount).map((flight, index) => (
                                    <FlightCard
                                        key={index}
                                        setSelectedFlight={setSelectedFlight}
                                        setFlightDetailVisible={setFlightDetailVisible}
                                        flight={flight}
                                        oneway={oneway.toString()}
                                    />
                                ))}


                                {activeTab === 'nearby' && Array.isArray(nearbyAirports) && nearbyAirports.slice(0, visibleCount).map((flight, index) => (
                                    <FlightCard
                                        key={index}
                                        setSelectedFlight={setSelectedFlight}
                                        setFlightDetailVisible={setFlightDetailVisible}
                                        flight={flight}
                                        oneway={oneway.toString()}
                                    />
                                ))}


                                {activeTab === 'shortest' && getShortestFlights().slice(0, visibleCount).map((flight, index) => (
                                    <FlightCard
                                        key={index}
                                        setSelectedFlight={setSelectedFlight}
                                        setFlightDetailVisible={setFlightDetailVisible}
                                        flight={flight}
                                        oneway={oneway.toString()}
                                    />
                                ))}

                            </div>
                            <div id="containerListing">
                                <input
                                    type="hidden"
                                    name="hdn_DOB_ValidatingDate"
                                    id="hdn_DOB_ValidatingDate"
                                    defaultValue="Fri, Aug 30, 2024"
                                />
                                {/* <div className="flexi-content visible-xs">
                                    <span className="mobile_alternate hidden-sm hidden-lg hidden-md">
                                        Alternate Date{" "}
                                    </span>
                                </div> */}
                                <input type="hidden" defaultValue={572} id="Pcount" />
                                <input type="hidden" id="sort_all_amt" defaultValue="101.48" />
                                <input type="hidden" id="sort_nearby_amt" defaultValue="208.97" />
                                <input type="hidden" id="sort_flexible_amt" defaultValue="101.48" />
                                <input type="hidden" id="sort_shortest_amt" defaultValue="325.99" />
                                <div id="baggage-fees-popup" className="modal fade" role="dialog">
                                    <div className="modal-content">
                                        <div className="close_window">
                                            <button
                                                type="button"
                                                className="back_btn"
                                                data-dismiss="modal"
                                            >
                                                <span className="fa fa-angle-left" />
                                            </button>
                                            Baggage Fees
                                            <button
                                                type="button"
                                                className="close_btn"
                                                data-dismiss="modal"
                                            >
                                                X
                                            </button>
                                        </div>
                                        <div id="fltbaggage"></div>
                                    </div>
                                </div>
                            </div>
                            <input
                                type="hidden"
                                id="totalpage"
                                name="totalpage"
                                defaultValue={57}
                            />
                            {filteredFlights.length > visibleCount && (
                                <div id="containerListing">
                                    <div className="load-more" style={{ cursor: 'pointer' }} onClick={loadMoreResults}>
                                        More Results
                                    </div>
                                </div>
                            )}
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

            <div className="trigger-wrapper" style={{ display: "none" }}>
                <div className="trigger-searching">
                    <span className="close-btn" id="tiggerclose">
                        <img src="/assets/images/trigger-mobile/close-icon.svg" />
                    </span>
                    <img
                        src="/assets/images/trigger-mobile/user-icon.svg"
                        className="user-icon"
                    />
                    <div className="head">Book before fare goes up!</div>
                    <p className="con-txt">
                        <b>4515</b> people are currently searching for flights to <br />
                        Los Angeles
                    </p>
                </div>
                <div className="mobile-laover" />
            </div>

            {/* <style
                // dangerouslySetInnerHTML={{
                //     __html:
                //         "\n            .navbar-nav {\n                display: none;\n            }\n\n            .footer-component {\n                display: none;\n            }\n\n            .copyright-block {\n                border-top: 1px solid #ccc;\n                padding-top: 30px;\n            }\n\n            .airline-matrix-wrapper .slick-slider .slick-prev,\n            .airline-matrix-wrapper .slick-slider .slick-next {\n                top: -15px;\n                background: #1b75bc;\n                border-radius: 100%;\n                border: 0;\n                width: 26px;\n                height: 26px;\n                right: -15px !important;\n            }\n\n            .airline-matrix-wrapper .slick-slider .slick-prev {\n                left: inherit;\n                right: 15px !important;\n            }\n\n            @media (max-width: 479px) {\n                .navbar-toggle {\n                    display: none;\n                }\n            }\n        "
                // }}
            /> */}
            <div
                className="list-count"
                id="session-expire-warning-modal"
                style={{ display: "none" }}
            >
                <div className="list-count-banner">
                    <div className="top-head">
                        <div className="timer-icon" align="center">
                            <i className="fa fa-clock-o" style={{ fontSize: 42 }} />
                        </div>
                    </div>
                    <br />
                    <div className="btm-txt txt2">
                        <p>
                            Flight Prices may change frequently owing to demand and availability.
                            Start a <b>New Search</b> / <b>Refresh Result</b> to view the latest
                            deals
                        </p>
                    </div>
                    <br />
                    <div className="call-btn">
                        <a
                            href=""
                            id="refResult"
                            className="w200"
                        >
                            Refresh Result
                        </a>
                        <a href="/assets" id="sess_startagain" className="w200">
                            Start Again
                        </a>
                    </div>
                </div>
                <div className="midum-overlay" id="fadebackground" />
            </div>
        </div>
    </>
}

export default FlightResultCompnent;    