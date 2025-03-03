'use client';
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, arrayUnion, arrayRemove, updateDoc } from "firebase/firestore";
import { fireStore } from "../../../_components/firebase/config";

const MyBooking = () => {

    const [activeTab, setActiveTab] = useState("1");
    const [bookings, setBookings] = useState([]);
    const [cancelled, setCancelled] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState(null);

    const handleShow = (flight) => {
        setSelectedFlight(flight);  // Store the selected flight data
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const handleCancelled = async (selectedFlight) => {
        setLoading(true); // Show a loader if you have one
        const cancelledFlight = {
            ...selectedFlight, // Include the selected flight details
            cancelDate: new Date().toISOString(), // Add cancellation timestamp
        };

        const userRef = doc(fireStore, "users", currentUser.uid);
        try {
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                await updateDoc(userRef, {
                    upcomingFlights: arrayRemove(selectedFlight),
                    cancelledFlight: arrayUnion(cancelledFlight),
                });
                console.log("Flight successfully cancelled and moved to cancelled flights!");
            } else {
                console.error("User document does not exist!");
            }
            setShowModal(false)
        } catch (error) {
            console.error("Error updating Firestore: ", error);
        } finally {
            setLoading(false);
        }
    }

    const fetchCancalledFlights = async (tabId) => {
        setLoading(true);
        setCancelled([]);

        try {
            if (tabId === "3" && currentUser) {
                const userRef = doc(fireStore, "users", currentUser.uid);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const cancelledFlight = userData.cancelledFlight;
                    if (cancelledFlight && Array.isArray(cancelledFlight)) {
                        setCancelled(cancelledFlight);
                    } else {
                        console.log("No upcoming flights found for this user.");
                    }
                } else {
                    console.log("User document does not exist.");
                }
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
        setLoading(false);
    };

        //file name changed

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("current-user"));
        console.log(user.email, "UserEmail for AUthentication");

        if (user) {
            setCurrentUser(user);
        }
    }, []);

    console.log(currentUser, "Aise hi check kr rhen h");


    const fetchBookings = async (tabId) => {
        setLoading(true);
        setBookings([]);

        try {
            if (tabId === "1" && currentUser) {
                const userRef = doc(fireStore, "users", currentUser.uid);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const upcomingBookings = userData.upcomingFlights;
                    if (upcomingBookings && Array.isArray(upcomingBookings)) {
                        setBookings(upcomingBookings);
                    } else {
                        console.log("No upcoming flights found for this user.");
                    }
                } else {
                    console.log("User document does not exist.");
                }
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (currentUser) {
            fetchBookings(activeTab);
            fetchCancalledFlights(activeTab);
        }
    }, [activeTab, currentUser]);

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

    const styles = {
        modalBackdrop: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
        },
        modal: {
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            width: '900px',
            maxWidth: '90%',
            overflowY: 'auto',
        },
        modalHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        modalBody: {
            paddingTop: '10px',
        },
        modalFooter: {
            marginTop: '20px',
            textAlign: 'right',
        },
        closeButton: {
            backgroundColor: '#FF5C5C',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            borderRadius: '4px',
        },
        airlineLogo: {
            width: '50px',
            height: '50px',
        },
        legdetails: {
            margintop: '10px',
        },
        connnectingblock: {
            margintop: "15px",
        }
    };

    return (
        <>
            <div className="rightCntr" id="mytrip" style={{ display: "block" }}>
                <div className="tabBox">
                    <ul className="tabs">
                        <li>
                            <a
                                onClick={() => setActiveTab("1")}
                                className={`ac ac1 ${activeTab === "1" ? "active" : ""}`}
                            >
                                Upcoming
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => setActiveTab("2")}
                                className={`ac ac2 ${activeTab === "2" ? "active" : ""}`}
                            >
                                Completed
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => setActiveTab("3")}
                                className={`ac ac3 ${activeTab === "3" ? "active" : ""}`}
                            >
                                Cancelled
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="tabContent2" id="mybooking">
                    <div className="row">
                        <div className="col-sm-12 title">
                            <h2 className="pull-left">
                                <i
                                    className="fa fa-plane"
                                    style={{ transform: "rotate(45deg)", color: "#000" }}
                                />{" "}
                                Flight Booking(s)
                            </h2>
                        </div>
                    </div>
                    <div className="flightbooking">
                        {loading ? (
                            <div id="loadingimg" className="loading">
                                <img
                                    src="/assets/us/profile/profile/images/loader.gif"
                                    alt="loading image"
                                />
                                <span>Loading...</span>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table text-center table-bordered">
                                    <thead>
                                        <tr style={{ background: "#333", color: "#fff" }}>
                                            <th>Booking No.</th>
                                            <th>From</th>
                                            <th>To</th>
                                            <th>Travel Date</th>
                                            <th>Booking Date</th>
                                            <th>Total Price</th>
                                            <th>Detail</th>
                                        </tr>
                                    </thead>
                                    <tbody className="hstr" id="fa1">
                                        {activeTab === "1" && bookings.length > 0 ? (
                                            bookings.map((flight, index) => (
                                                <tr key={flight.selectedFlight.id}>
                                                    <td>{98989}</td>
                                                    <td>{flight.selectedFlight.itineraries[0].segments[0].departure.iataCode}</td>
                                                    <td>{flight.selectedFlight.itineraries[0].segments[0].arrival.iataCode}</td>
                                                    <td>{getFormattedDate(flight.selectedFlight.itineraries[0].segments[0].departure.at)}</td>
                                                    <td>{flight.selectedFlight.presentDate}</td>
                                                    <td>${flight.selectedFlight.price.grandTotal}</td>
                                                    <td>
                                                        <a href={`#`} className="btn btn-primary" onClick={() => handleShow(flight)}>
                                                            View Details
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : activeTab === "3" && cancelled.length > 0 ? (
                                            cancelled.map((flight, index) => (
                                                <tr key={flight.selectedFlight.id}>
                                                    <td>{98989}</td>
                                                    <td>{flight.selectedFlight.itineraries[0].segments[0].departure.iataCode}</td>
                                                    <td>{flight.selectedFlight.itineraries[0].segments[0].arrival.iataCode}</td>
                                                    <td>{getFormattedDate(flight.selectedFlight.itineraries[0].segments[0].departure.at)}</td>
                                                    <td>{flight.selectedFlight.presentDate}</td>
                                                    <td>${flight.selectedFlight.price.grandTotal}</td>
                                                    <td>
                                                        <a href={`#`} className="btn btn-primary" onClick={() => handleShow(flight)}>
                                                            View Details
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr className="norecord">
                                                <td colSpan={7}>
                                                    <div className="alert alert-danger" role="alert">
                                                        No record found
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {showModal && selectedFlight && (
                <div style={styles.modalBackdrop}>
                    <div style={styles.modal}>
                        <div style={styles.modalHeader}>
                            <h2>Flight Details</h2>
                            <button onClick={handleClose} style={styles.closeButton}>X</button>
                        </div>
                        <div
                            className="position-relative"
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "5px",
                                margin: "15px 0",
                                padding: "10px",
                                backgroundColor: "#f9f9f9",
                            }}
                        >
                            {/* Flight Details */}
                            <div
                                className="row clickflightdetail containerselect"
                                style={{ display: "flex", justifyContent: "space-between" }}
                            >
                                {/* Left Section */}
                                <div
                                    className="col-sm-10 col-xs-12"
                                    style={{ display: "flex", flexDirection: "column" }}
                                >
                                    {/* Departure Flight */}
                                    <div
                                        className="depart-flight"
                                        style={{ display: "flex", justifyContent: "space-between" }}
                                    >
                                        <div
                                            className="col-sm-3 col-xs-12 no-padding-left"
                                            style={{ textAlign: "center" }}
                                        >
                                            {/* <div className="price-section visible-xs">
                                                <div
                                                    style={{
                                                        fontSize: "16px",
                                                        fontWeight: "bold",
                                                        color: "#333",
                                                    }}
                                                >
                                                    $151.60
                                                </div>
                                                <div
                                                    className="per-adult"
                                                    style={{
                                                        fontSize: "12px",
                                                        color: "#777",
                                                    }}
                                                >
                                                    Per Adult
                                                </div>
                                            </div> */}
                                            <div className="airline-detail" style={{ marginTop: "10px" }}>
                                                <img
                                                    src={selectedFlight.selectedFlight.itineraries[0].segments[0].airline.logo}
                                                    alt="Air India"
                                                    style={{
                                                        width: "64px",
                                                        height: "64px",
                                                        marginBottom: "5px",
                                                    }}
                                                />
                                                <div
                                                    className="name"
                                                    style={{
                                                        fontSize: "14px",
                                                        fontWeight: "bold",
                                                        color: "#333",
                                                    }}
                                                >
                                                    Air India
                                                </div>
                                            </div>
                                        </div>

                                        {/* Flight Times */}
                                        <div
                                            className="col-sm-7 col-xs-12"
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            {/* Date Section */}
                                            <div
                                                className="flex-date flex-highlight"
                                                style={{
                                                    fontSize: "16px",
                                                    color: "#333",
                                                    fontWeight: "bold",
                                                    marginBottom: "10px",
                                                }}
                                            >
                                                {getFormattedDate(selectedFlight.selectedFlight.itineraries[0].segments[0].departure.at)}
                                            </div>

                                            {/* Flight Details Section */}
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    marginTop: "10px",
                                                }}
                                            >
                                                {/* Departure City */}
                                                <div
                                                    className="leg-details"
                                                    style={{
                                                        textAlign: "right",
                                                        marginRight: "20px",
                                                    }}
                                                >
                                                    <div className="city">
                                                        <div className="time">
                                                            <strong>{getTimeFromDate(selectedFlight.selectedFlight.itineraries[0].segments[0].departure.at, false)}</strong>
                                                        </div>
                                                        <div className="code">{selectedFlight.selectedFlight.itineraries[0].segments[0].departure.airport.iata}</div>
                                                    </div>
                                                </div>

                                                {/* Arrow Separator */}
                                                <div
                                                    style={{
                                                        textAlign: "center",
                                                        margin: "0 10px",
                                                        fontSize: "20px",
                                                        color: "#999",
                                                    }}
                                                >
                                                    →
                                                </div>

                                                {/* Arrival City */}
                                                <div
                                                    className="leg-details"
                                                    style={{
                                                        textAlign: "left",
                                                        marginLeft: "20px",
                                                    }}
                                                >
                                                    <div className="city">
                                                        <div className="time">
                                                            <strong>{getTimeFromDate(selectedFlight.selectedFlight.itineraries[0].segments[0].arrival.at, false)}</strong>
                                                        </div>
                                                        <div className="code">{selectedFlight.selectedFlight.itineraries[0].segments[0].arrival.airport.iata}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/* Price Section */}
                                <div
                                    className="col-sm-2 col-xs-12 hidden-xs"
                                    id="fltprice"
                                    style={{ textAlign: "center", marginTop: "10px" }}
                                >
                                    <div className="price-section">
                                        <div
                                            style={{
                                                fontSize: "16px",
                                                fontWeight: "bold",
                                                color: "#333",
                                            }}
                                        >
                                            ${selectedFlight.selectedFlight.price.grandTotal}
                                        </div>
                                        <div className="per-person" style={{ fontSize: "12px" }}>
                                            (Per Adult)
                                        </div>
                                        <button
                                            className="seedetail"
                                            style={{
                                                marginTop: "10px",
                                                padding: "5px 10px",
                                                fontSize: "12px",
                                                color: "#fff",
                                                backgroundColor: "#007bff",
                                                border: "none",
                                                borderRadius: "3px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Print
                                        </button>
                                        <button
                                            className="seedetail"
                                            onClick={() => handleCancelled(selectedFlight)}
                                            style={{
                                                marginTop: "10px",
                                                padding: "5px 10px",
                                                fontSize: "12px",
                                                color: "#fff",
                                                backgroundColor: "#007bff",
                                                border: "none",
                                                borderRadius: "3px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Cancelled
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* <div style={styles.modalFooter}>
                            <button onClick={handleClose} style={styles.closeButton}>Close</button>
                        </div> */}
                    </div>
                </div>
            )}

        </>

    )

}

export default MyBooking;