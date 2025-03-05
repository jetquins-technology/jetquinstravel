"use client"

import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import countryCodeArr from "@/assets/Country_Code.json"
import PassengerForm from "@/app/_components/PassengerForm/page";
import BillingInfo from "@/app/_components/billingInfo/page";
import SignInComponent from "@/app/_components/SignIn/page";
import SignUpComponent from "@/app/_components/SignUp/page";
import { collection, addDoc, setDoc, doc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";
import { fireStore, useAuth } from "../../../../../../_components/firebase/config";
import img from '../../../../../../../../public/assets/jetquinsLogos.png';
import Loadings from "@/app/Loadings";

const PurchasePage = () => {

    const [selectedFlight, setSelectedFlight] = useState(null);
    const [travellerDetails, setTravellerDetails] = useState({});
    const [isAffirmPayment, setIsAffirmPayment] = useState(false);
    const [flightDetailVisible, setFlightDetailVisible] = useState(false);
    const [isRefundSectionVisible, setRefundSectionVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [formedFilled, setFormFilled] = useState(false);
    const emailRef = useRef("");
    const phoneRef = useRef("");
    const alternateNumRef = useRef("");
    const [selectedCountry, setSelectedCountry] = useState(countryCodeArr[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownOpens, setIsDropdownOpens] = useState(false);

    // Added new feature

    const [isMoreInfoVisible, setIsMoreInfoVisible] = useState(false);
    const [year, setYears] = useState([]);
    const currentYear = new Date().getFullYear();
    const [mobileVisible, setMobileVisible] = useState(false);
    const router = useRouter();
    const searchParam = useSearchParams();
    const refundAmount = searchParam.get("refundAmount")

    // For All Details of TripDetails
    const [travellersDetails, setTravellersDetails] = useState([]);

    // Contact Details of Traveler
    const [contactDetails, setContactDetails] = useState({});

    // Traveler Info
    const [travelers, setTravelers] = useState([]);

    // Billing Info
    const [billingInfo, setBillingInfo] = useState({
        country: "",
        address: "",
        state: "",
        city: "",
        postalCode: "",
    });

    // Card Details
    const [cardDetails, setCardDetails] = useState({
        cardType: "Debit",
        cardHolderName: "",
        cardNo: "",
        expiry: {
            month: "",
            year: "",
            cvv: "",
        },
    });

    useEffect(() => {
        console.log("Saving card details:", cardDetails);
    }, [cardDetails]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleDropdowns = () => {
        setIsDropdownOpens(!isDropdownOpens);
    };

    const styles = {
        flagDropdown: {
            position: 'relative',
            cursor: 'pointer',
        },
        selectedFlag: {
            display: 'flex',
            alignItems: 'center',
        },
        downArrow: {
            width: 0,
            height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid #000', // Change color as needed
            marginLeft: '60px',
        },
        countryList: {
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'white',
            border: '1px solid #ccc',
            zIndex: 1000,
            maxHeight: '200px',
            overflowY: 'auto',
            display: isDropdownOpen ? 'block' : 'none',
        },
        countryItem: {
            padding: '10px',
            cursor: 'pointer',
        },
        countryItemHover: {
            background: '#f0f0f0',
        },
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

    const styles1 = {
        flagDropdown: {
            position: 'relative',
            cursor: 'pointer',
        },
        selectedFlag: {
            display: 'flex',
            alignItems: 'center',
        },
        downArrow: {
            width: 0,
            height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid #000', // Change color as needed
            marginLeft: '120px',
        },
        countryList: {
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'white',
            border: '1px solid #ccc',
            zIndex: 1000,
            maxHeight: '200px',
            overflowY: 'auto',
            display: isDropdownOpens ? 'block' : 'none',
        },
        countryItem: {
            padding: '10px',
            cursor: 'pointer',
        },
        countryItemHover: {
            background: '#f0f0f0',
        },
    };

    const [travellerCount, setTravellerCount] = useState({
        "adults": {
            "count": 0,
            "perAdult": 0
        },
        "child": {
            "count": 0,
            "perChild": 0
        },
        "infant": {
            "count": 0,
            "perInfant": 0
        },
        "totalPrice": 0
    });

    const handleCustomerDetailCollection = (e) => {
        e.preventDefault();

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const phoneRegex = /^\d{10,15}$/;
        setLoading(true);

        if (emailRef.current.value === "" && phoneRef.current.value === "") {
            toast.error("Please fill the billing details first!")
        } else if (!emailRegex.test(emailRef.current.value)) {
            toast.error("Please enter a valid email address!")
        } else if (!phoneRegex.test(phoneRef.current.value)) {
            toast.error("Please enter a valid phone number!")
        } else {
            const contactData = {
                Email: emailRef.current.value,
                Mobile: phoneRef.current.value,
                AlternateMobile: alternateNumRef.current.value,
                CountryCode: selectedCountry.dialCode
            };
            setContactDetails(contactData);

            // Log the data to verify
            // console.log("CONTACT DATA: ", contactData);
            fetch("https://script.google.com/macros/s/AKfycbwVmb-Fq-ph0V-Buszfxf-iww-DuyO7M7s7APz-3-yNsDeXO3XWQCG3-djqs9kJ1X1CdA/exec",
                {
                    method: "POST",
                    body: contactDetails
                }
            ).then(res => console.log(res), setFormFilled(true)).catch(err => console.log(err));
        }
        setLoading(false);
    }

    // Function to handle the scroll event
    const handleScroll = () => {
        const s = window.scrollY || window.pageYOffset;
        const d = document.documentElement.scrollHeight || document.body.scrollHeight;
        const c = window.innerHeight;
        const scrollPercent = (s / (d - c)) * 100;

        if (scrollPercent >= 10) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    // Initialize counters and totals
    function summarizeTravelers(travelers) {
        const counts = {
            adults: { count: 0, total: 0 },
            child: { count: 0, total: 0 },
            infant: { count: 0, total: 0 }
        };

        // Iterate over each traveler
        travelers.forEach(traveler => {
            // Extract the traveler type and price information
            const { travelerType, price } = traveler;
            const totalPrice = parseFloat(price.total);

            // Update counts and totals based on traveler type
            if (travelerType === 'ADULT') {
                counts.adults.count += 1;
                counts.adults.total += totalPrice;
            } else if (travelerType === 'CHILD') {
                counts.child.count += 1;
                counts.child.total += totalPrice;
            } else if (travelerType === 'INFANT') {
                counts.infant.count += 1;
                counts.infant.total += totalPrice;
            }
        });

        // Calculate rates for each category
        const calculateRate = (total, count) => count > 0 ? (total / count).toFixed(2) : '0.00';

        const adultsRate = calculateRate(counts.adults.total, counts.adults.count);
        const childRate = calculateRate(counts.child.total, counts.child.count);
        const infantRate = calculateRate(counts.infant.total, counts.infant.count);

        // Calculate total price
        const totalPrice = counts.adults.total + counts.child.total + counts.infant.total;

        // Return the summary object
        return {
            adults: { count: counts.adults.count, rate: parseFloat(adultsRate) },
            child: { count: counts.child.count, rate: parseFloat(childRate) },
            infant: { count: counts.infant.count, rate: parseFloat(infantRate) },
            totalPrice: totalPrice.toFixed(2)
        };
    }

    useEffect(() => {
        if (window) {
            window.addEventListener('scroll', handleScroll);
            // Clean up the event listener on component unmount
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [])

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
            return { hours: `${hours}:${minutes}`, ampm: `${ampm}` }
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

    useEffect(() => {
        try {
            console.log(JSON.parse(localStorage.getItem("selectedflight")), "selectedflight");
            setSelectedFlight(JSON.parse(localStorage.getItem("selectedflight")));
            setTravellerDetails(JSON.parse(localStorage.getItem("travellerDetails")));
            setTravellerCount(summarizeTravelers(JSON.parse(localStorage.getItem("selectedflight")).travelerPricings));
            // console.log(summarizeTravelers(JSON.parse(localStorage.getItem("selectedflight")).travelerPricings), "SUMMARIZED")
        } catch (e) {
            console.log(e);
        }
    }, [])

    const printEvent = (e) => {
        console.log(e.target)
    };

    const gotolisting = () => {
        router.back();
    }

    // Fetch the Country Code based on current location
    useEffect(() => {
        const getLocation = async () => {
            try {
                const response = await fetch('http://ip-api.com/json');
                const data = await response.json();
                // console.log("DataGeo", data);

                if (data.status === 'fail') {
                } else {
                    const userCountryCode = data.countryCode;
                    const country = countryCodeArr.find(c => c.countryCode.toUpperCase() === userCountryCode);
                    console.log(country, "CountryCode-1");
                    setSelectedCountry(country || countryCodeArr[0]);
                }
            } catch (err) {
                console.error('Error fetching location:', err);
            } finally {
            }
        };

        getLocation();
    }, []);

    const toggleMoreInfo = (e) => {
        e.preventDefault();
        setIsMoreInfoVisible(!isMoreInfoVisible);
    };

    useEffect(() => {
        const yearList = [];
        for (let i = 0; i < 12; i++) {
            yearList.push(currentYear + i);
        }
        setYears(yearList);
    }, [currentYear]);

    // Effect to set travelers based on the details (adults, children, infants)
    useEffect(() => {
        const updatedTravelers = [];

        if (travellerDetails.adults > 0) {
            updatedTravelers.push(
                ...Array.from({ length: travellerDetails.adults }, (_, index) => ({
                    id: `adult-${index + 1}`,
                    gender: '1', // Default gender (Male)
                    title: '',
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    dobMonth: '',
                    dobDate: '',
                    dobYear: '',
                    emergencyContactName: '',
                    phoneCode: '',
                    tsaPrecheckNumber: '',
                    redressNumber: '',
                    emergencyContactNumber: '',
                    travelerType: 'Adult', // Default traveler type (Adult)
                }))
            );
        }

        if (travellerDetails.child > 0) {
            updatedTravelers.push(
                ...Array.from({ length: travellerDetails.child }, (_, index) => ({
                    id: `child-${index + 1}`,
                    gender: '1', // Default gender (Male)
                    title: '',
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    dobMonth: '',
                    dobDate: '',
                    dobYear: '',
                    tsaPrecheckNumber: '',
                    redressNumber: '',
                    travelerType: 'Child', // Default traveler type (Child)
                }))
            );
        }

        if (travellerDetails.infant > 0) {
            updatedTravelers.push(
                ...Array.from({ length: travellerDetails.infant }, (_, index) => ({
                    id: `infant-${index + 1}`,
                    gender: '1', // Default gender (Male)
                    title: '',
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    dobMonth: '',
                    dobDate: '',
                    dobYear: '',
                    tsaPrecheckNumber: '',
                    redressNumber: '',
                    travelerType: 'Infant', // Default traveler type (Infant)
                }))
            );
        }

        setTravelers(updatedTravelers);
    }, [travellerDetails, setTravelers]);

    console.log(contactDetails, "ContactDetails");


    // const [user] = useAuthState(auth);
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    const currentUser = useAuth();
    console.log(currentUser, "UserAuthentication");

    const hideSignIn = () => {
        setShowSignIn(false);
    }

    const hideSignUp = () => {
        setShowSignUp(false);
    }

    const showSignUpForm = () => {
        setShowSignIn(false);
        setShowSignUp(true);
    }

    const showSignInFor = () => {
        setShowSignUp(false);
        setShowSignIn(true);
    }

    const handleSubmitTravellersDetails = async () => {

        setLoading(true);
        // Combine all the data into a single newTraveler object
        const newTraveler = {
            contactDetails,
            travelers,
            cardDetails,
            billingInfo,
        };

        // Add the new traveler to the array of travelers
        setTravellersDetails((prevState) => [...prevState, newTraveler]);

        const allTravelerData = {
            contactDetails,
            travelers,
            cardDetails,
            billingInfo,
            selectedFlight,
            userId: currentUser?.uid,
            userEmailId: currentUser?.email,
            userDisplayName: currentUser?.displayName
        };

        const upcomingFlight = {
            selectedFlight,
            presentDate: new Date().toISOString(),
        }

        localStorage.setItem('travelerData', JSON.stringify(allTravelerData));

        // For Payment Gateway
        if (!currentUser) {
            setShowSignIn(true);
            setLoading(false);
        } else {
            try {
                // Send the travelers' details to the backend API for flight reservation
                const response = await fetch('/api/charge-credit-card', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(allTravelerData),
                });
                const result = await response.json();
                
                await handleSMSSubmit(newTraveler, selectedFlight);
                await handleSubmit(newTraveler);
                if (result.success) {
                    setLoading(false);
                    toast.success('Reservation Successful! Transaction ID: ' + result.transactionId);

                    // await handleSMSSubmit(newTraveler, selectedFlight);
                    // await handleSubmit(newTraveler);

                    // Store traveler data in Firebase
                    const travelerDataRef = collection(fireStore, "travelers");
                    await addDoc(travelerDataRef, {
                        ...allTravelerData,
                        createdAt: new Date(),
                    });

                    const userRef = doc(fireStore, "users", currentUser.uid);
                    try {
                        const userDoc = await getDoc(userRef);
                        if (userDoc.exists()) {
                            await updateDoc(userRef, {
                                upcomingFlights: arrayUnion(upcomingFlight),
                            });
                            console.log("Flight successfully added to upcoming flights!");
                        } else {
                            await setDoc(userRef, {
                                upcomingFlights: [upcomingFlight],
                            });
                            console.log("User document created with upcoming flight!");
                        }
                    } catch (error) {
                        console.error("Error updating Firestore: ", error);
                    } finally {
                        setLoading(false);
                    }

                    router.push(`/home/confirmationPage/book-flight-confirms?transactionStatus=${result.success}`)
                } else {
                    toast.error('Error: ' + result.message);
                    setLoading(false);
                }
            } catch (error) {
                toast.error('Error: ' + error.message);
            }
        }

        // Clear individual fields after adding to the array
        setTravelers([]);

        setContactDetails({})

        setCardDetails({
            cardHolderName: "",
            cardNo: "",
            expiry: { month: "", year: "", cvv: "" },
        });

        setBillingInfo({
            country: "",
            address: "",
            state: "",
            city: "",
            postalCode: "",
        });
    };

    // Function to send email with the traveler details
    const handleSubmit = async (travelerData) => {
        try {
            const email = travelerData.contactDetails.Email;

            const emailContent = `
                Hello ${travelerData.travelers[0].firstName} ${travelerData.travelers[0].lastName},
        
                Thank you for choosing to book your flight with us. Below are your booking details:
        
                Traveler Info:
                Name: ${travelerData.travelers[0].firstName} ${travelerData.travelers[0].lastName}
                Email: ${email || 'Not Provided'}
                Gender: ${travelerData.travelers[0].gender === '1' ? 'Male' : 'Female'} 
        
                Billing Info:
                Address: ${travelerData.billingInfo.address || 'Not Provided'}
                Country: ${travelerData.billingInfo.country || 'Not Provided'}
                Postal Code: ${travelerData.billingInfo.postalCode || 'Not Provided'}
        
                Best regards,
                jetquins travels
            `;

            const content = (travellerDetails, selectedFlight, travelers) => `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Flight Itinerary</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f9;
                            color: #333;
                            margin: 0;
                            padding: 0;
                        }
                            /* Container for header content */
                        .header-container {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding: 20px;
                            background-color: #1b75bc;
                            color: white;
                        }
                        /* Logo styling */
                        .logo img {
                            width: 50px;
                            height: auto;
                        }
                        /* Company info */
                        .company-info {
                            text-align: center;
                            font-size: 18px;
                            font-weight: bold;
                            margin-left: 20px;
                        }
                        .company-info p {
                            margin: 5px 0;
                            font-size: 14px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        .w560 {
                            width: 560px;
                            margin: 20px auto;
                            background-color: #ffffff;
                            border-radius: 10px;
                            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                        }
                        .w160 {
                            width: 160px;
                        }
                        .stops img {
                            width: 20px;
                            vertical-align: middle;
                        }
                        .h20 {
                            height: 20px;
                        }
                        .w20 {
                            width: 20px;
                        }
                        .tabel-format2 th, .tabel-format2 td {
                            padding: 10px;
                            text-align: left;
                            border: 1px solid #ddd;
                        }
                        .tabel-format2 th {
                            background-color: #f0f0f0;
                            color: #666;
                            font-weight: bold;
                        }
                        .tabel-format2 td {
                            font-size: 14px;
                        }
                        .stops {
                            text-align: center;
                            font-weight: bold;
                        }
                        .stops img {
                            margin-bottom: 5px;
                        }
                        .w20, .h20 {
                            background-color: #e0e0e0;
                        }
                        /* Styling for the header */
                        .header {
                            background-color: #1b75bc;
                            color: #ffffff;
                            font-size: 16px;
                            font-weight: 600;
                            padding: 10px;
                            border-radius: 5px;
                        }
                        .header img {
                            vertical-align: middle;
                            margin-right: 10px;
                        }
                        /* Flight section styles */
                        .flight-info {
                            background-color: #e1ecff;
                            padding: 15px;
                            font-size: 12px;
                            border-radius: 5px;
                        }
                        .flight-info span {
                            font-weight: 600;
                        }
                        .flight-details {
                            background-color: #f5f5f5;
                            padding: 15px;
                            border-radius: 5px;
                            font-size: 12px;
                            color: #202020;
                        }
                        .flight-details .time {
                            font-size: 14px;
                            font-weight: bold;
                        }
                        .flight-details .city-name {
                            font-size: 12px;
                            color: #666;
                        }
                            
                        /* Traveler section styles */
                        .traveler-info {
                            background-color: #1b75bc;
                            color: white;
                            padding: 10px;
                            border-radius: 5px 5px 0 0;
                            font-weight: bold;
                            font-size: 14px;
                        }
                        .traveler-table th, .traveler-table td {
                            border: 1px solid #ddd;
                            padding: 10px;
                            text-align: left;
                        }
                        .traveler-table th {
                            background-color: #f0f0f0;
                            color: #666;
                        }
                        .traveler-table td {
                            font-size: 13px;
                            color: #333;
                        }
                        .traveler-table td span {
                            font-weight: bold;
                        }
                    /* Footer styles */
                        footer {
                            background-color: #333;
                            color: white;
                            text-align: center;
                            padding: 15px 0;
                            font-size: 14px;
                            position: fixed;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            width: 100%;
                            page-break-before: always; /* Make sure footer appears only at the end */
                        }
                        footer a {
                            color: #1b75bc;
                            text-decoration: none;
                        }
                        footer a:hover {
                            text-decoration: underline;
                        }
                    </style>
                </head>
                <body>
                <!-- Header Section -->
                <div class="header-container">
                    <div class="logo">
                        <img src={img} alt="Company Logo">
                    </div>
                    <div class="company-info">
                        <p>jetquins travels</p>
                        <p>Address, City, Country</p>
                        <p>Email: contact@jetquinstravels.com | Phone: +1-(888)-267-5955</p>
                    </div>
                </div>

                <!-- Main Content -->

                        ${travellerDetails.tripType === 'One-Way' ? (
                    selectedFlight.itineraries[0].segments.map((segment, i) => `
                                <table cellpadding="0" cellspacing="0" border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <br>
                                                <table class="w560" cellpadding="0" cellspacing="0" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="header">
                                                                <img src="https://cmsrepository.com/static/flights/common/eticket/plane.png" style="vertical-align: middle; margin-right: 5px;"> 
                                                                Departure ${getFormattedDate(segment.departure.at)}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="flight-info">
                                                                <span>Leg ${i + 1}</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="flight-details">
                                                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="w160">
                                                                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td><img src="${segment.airline.logo}" width="32"></td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td style="font-weight: 600;">${segment.departure.airport.iata}</td>
                                                                                        </tr>
                                                                                        <tr><td height="5"></td></tr>
                                                                                        <tr>
                                                                                            <td style="font-weight: 600; font-size: 14px;">Flight ${segment.number} | <span style="font-size: 12px; font-weight: 500;">Aircraft ${segment.aircraft.code}</span></td>
                                                                                        </tr>
                                                                                        <tr><td class="h20"></td></tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td style="color: #666;">Cabin</td>
                                                                                                        </tr>
                                                                                                        <tr style="font-weight: 600;">
                                                                                                            <td>${travellerDetails.cabin}</td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                            <td width="5"></td>
                                                                            <td width="1" style="border-left: 1px dotted #ccc;"></td>
                                                                            <td width="10"></td>
                                                                            <td>
                                                                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td style="width: 140px; vertical-align: top;">
                                                                                                <b style="font-size: 18px;">${segment.departure.airport.iata}</b><br>
                                                                                                <b style="font-size: 12px;">${segment.departure.airport.city}</b>
                                                                                            </td>
                                                                                            <td>&nbsp;</td>
                                                                                            <td style="text-align: right; width: 140px; vertical-align: top;">
                                                                                                <b style="font-size: 18px;">${segment.arrival.airport.iata}</b><br>
                                                                                                <b style="font-size: 12px;">${segment.arrival.airport.city}</b>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr><td colspan="3" height="10"></td></tr>
                                                                                        <tr>
                                                                                            <td style="width: 140px; vertical-align: top;">
                                                                                                <span style="color: #666;">${segment.departure.airport.name}</span>
                                                                                            </td>
                                                                                            <td class="stops">
                                                                                                <img src="https://cmsrepository.com/static/flights/common/eticket/plane-stop.png"><br>
                                                                                                ${segment.stopQuantity > 0 ? `${segment.stopQuantity} Stop(s)` : 'Non Stop'}
                                                                                            </td>
                                                                                            <td style="text-align: right; width: 140px; vertical-align: top;">
                                                                                                <span style="color: #666;">${segment.arrival.airport.name}</span>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr><td colspan="3" height="10"></td></tr>
                                                                                    </tbody>
                                                                                </table>
                                                                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td style="width: 130px; vertical-align: top;">
                                                                                                <b style="font-size: 14px;"> ${getTimeFromDate(segment.departure.at, false)} </b><br>
                                                                                            </td>
                                                                                            <td>&nbsp;</td>
                                                                                            <td style="text-align: right; width: 180px; vertical-align: top;">
                                                                                                <b style="font-size: 14px;"> ${getTimeFromDate(segment.arrival.at)} </b><br>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <!-- Layover Information Table -->
                                ${i !== selectedFlight.itineraries[0].segments.length - 1
                            ? `<table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tbody>
                                    <tr>
                                        <td
                                            style="background: #ffe2cd; text-align: center; font-size: 12px; font-weight: 600; padding: 7px 10px; border-radius: 5px; color: #21356e;"
                                        >
                                            Layover in ${segment.arrival.airport.name}, ${segment.arrival.airport.city}: ${calculateLayoverTime(selectedFlight)[0].itineraries.layover_time}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>`
                            : ''
                        }

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                

                            `)).join('') :

                    (selectedFlight.itineraries[0].segments.map((segment, i) => `
                                <table cellpadding="0" cellspacing="0" border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <br>
                                                <table class="w560" cellpadding="0" cellspacing="0" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="header">
                                                                <img src="https://cmsrepository.com/static/flights/common/eticket/plane.png" style="vertical-align: middle; margin-right: 5px;"> 
                                                                Departure ${getFormattedDate(segment.departure.at)}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="flight-info">
                                                                <span>Leg ${i + 1}</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="flight-details">
                                                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="w160">
                                                                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td><img src="${segment.airline.logo}" width="32"></td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td style="font-weight: 600;">${segment.departure.airport.iata}</td>
                                                                                        </tr>
                                                                                        <tr><td height="5"></td></tr>
                                                                                        <tr>
                                                                                            <td style="font-weight: 600; font-size: 14px;">Flight ${segment.number} | <span style="font-size: 12px; font-weight: 500;">Aircraft ${segment.aircraft.code}</span></td>
                                                                                        </tr>
                                                                                        <tr><td class="h20"></td></tr>
                                                                                        <tr>
                                                                                            <td>
                                                                                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td style="color: #666;">Cabin</td>
                                                                                                        </tr>
                                                                                                        <tr style="font-weight: 600;">
                                                                                                            <td>${travellerDetails.cabin}</td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                            <td width="5"></td>
                                                                            <td width="1" style="border-left: 1px dotted #ccc;"></td>
                                                                            <td width="10"></td>
                                                                            <td>
                                                                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td style="width: 140px; vertical-align: top;">
                                                                                                <b style="font-size: 18px;">${segment.departure.airport.iata}</b><br>
                                                                                                <b style="font-size: 12px;">${segment.departure.airport.city}</b>
                                                                                            </td>
                                                                                            <td>&nbsp;</td>
                                                                                            <td style="text-align: right; width: 140px; vertical-align: top;">
                                                                                                <b style="font-size: 18px;">${segment.arrival.airport.iata}</b><br>
                                                                                                <b style="font-size: 12px;">${segment.arrival.airport.city}</b>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr><td colspan="3" height="10"></td></tr>
                                                                                        <tr>
                                                                                            <td style="width: 140px; vertical-align: top;">
                                                                                                <span style="color: #666;">${segment.departure.airport.name}</span>
                                                                                            </td>
                                                                                            <td class="stops">
                                                                                                <img src="https://cmsrepository.com/static/flights/common/eticket/plane-stop.png"><br>
                                                                                                ${segment.stopQuantity > 0 ? `${segment.stopQuantity} Stop(s)` : 'Non Stop'}
                                                                                            </td>
                                                                                            <td style="text-align: right; width: 140px; vertical-align: top;">
                                                                                                <span style="color: #666;">${segment.arrival.airport.name}</span>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr><td colspan="3" height="10"></td></tr>
                                                                                    </tbody>
                                                                                </table>
                                                                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td style="width: 130px; vertical-align: top;">
                                                                                                <b style="font-size: 14px;">${getTimeFromDate(segment.departure.at, false)}</b><br>
                                                                                            </td>
                                                                                            <td>&nbsp;</td>
                                                                                            <td style="text-align: right; width: 180px; vertical-align: top;">
                                                                                                <b style="font-size: 14px;">${getTimeFromDate(segment.arrival.at)}</b><br>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <!-- Layover Information Table -->
                            ${i !== selectedFlight.itineraries[0].segments.length - 1
                            ? `<table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tbody>
                                    <tr>
                                        <td
                                            style="background: #ffe2cd; text-align: center; font-size: 12px; font-weight: 600; padding: 7px 10px; border-radius: 5px; color: #21356e;"
                                        >
                                            Layover in ${segment.arrival.airport.name}, ${segment.arrival.airport.city}: ${calculateLayoverTime(selectedFlight)[0].itineraries.layover_time}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>`
                            : ''
                        }

                                    `)).join('') + selectedFlight.itineraries[1].segments.map((segment, i) => `
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <br>
                                                        <table class="w560" cellpadding="0" cellspacing="0" border="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="header">
                                                                        <img src="https://cmsrepository.com/static/flights/common/eticket/return-plane.png" style="vertical-align: middle; margin-right: 5px;"> 
                                                                        Departure ${getFormattedDate(segment.departure.at)}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="flight-info">
                                                                        <span>Leg ${i + 1}</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="flight-details">
                                                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="w160">
                                                                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td><img src="${segment.airline.logo}" width="32"></td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td style="font-weight: 600;">${segment.departure.airport.iata}</td>
                                                                                                </tr>
                                                                                                <tr><td height="5"></td></tr>
                                                                                                <tr>
                                                                                                    <td style="font-weight: 600; font-size: 14px;">Flight ${segment.number} | <span style="font-size: 12px; font-weight: 500;">Aircraft ${segment.aircraft.code}</span></td>
                                                                                                </tr>
                                                                                                <tr><td class="h20"></td></tr>
                                                                                                <tr>
                                                                                                    <td>
                                                                                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td style="color: #666;">Cabin</td>
                                                                                                                </tr>
                                                                                                                <tr style="font-weight: 600;">
                                                                                                                    <td>${travellerDetails.cabin}</td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                    <td width="5"></td>
                                                                                    <td width="1" style="border-left: 1px dotted #ccc;"></td>
                                                                                    <td width="10"></td>
                                                                                    <td>
                                                                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td style="width: 140px; vertical-align: top;">
                                                                                                        <b style="font-size: 18px;">${segment.departure.airport.iata}</b><br>
                                                                                                        <b style="font-size: 12px;">${segment.departure.airport.city}</b>
                                                                                                    </td>
                                                                                                    <td>&nbsp;</td>
                                                                                                    <td style="text-align: right; width: 140px; vertical-align: top;">
                                                                                                        <b style="font-size: 18px;">${segment.arrival.airport.iata}</b><br>
                                                                                                        <b style="font-size: 12px;">${segment.arrival.airport.city}</b>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr><td colspan="3" height="10"></td></tr>
                                                                                                <tr>
                                                                                                    <td style="width: 140px; vertical-align: top;">
                                                                                                        <span style="color: #666;">${segment.departure.airport.name}</span>
                                                                                                    </td>
                                                                                                    <td class="stops">
                                                                                                        <img src="https://cmsrepository.com/static/flights/common/eticket/plane-stop.png"><br>
                                                                                                        ${segment.stopQuantity > 0 ? `${segment.stopQuantity} Stop(s)` : 'Non Stop'}
                                                                                                    </td>
                                                                                                    <td style="text-align: right; width: 140px; vertical-align: top;">
                                                                                                        <span style="color: #666;">${segment.arrival.airport.name}</span>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr><td colspan="3" height="10"></td></tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td style="width: 130px; vertical-align: top;">
                                                                                                        <b style="font-size: 14px;">${getTimeFromDate(segment.departure.at, false)}</b><br>
                                                                                                    </td>
                                                                                                    <td>&nbsp;</td>
                                                                                                    <td style="text-align: right; width: 180px; vertical-align: top;">
                                                                                                        <b style="font-size: 14px;">${getTimeFromDate(segment.arrival.at)}</b><br>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <!-- Layover Information Table -->
                                        ${i !== selectedFlight.itineraries[0].segments.length - 1
                                ? `<table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tbody>
                                        <tr>
                                            <td
                                                style="background: #ffe2cd; text-align: center; font-size: 12px; font-weight: 600; padding: 7px 10px; border-radius: 5px; color: #21356e;"
                                            >
                                                Layover in ${segment.arrival.airport.name}, ${segment.arrival.airport.city}: ${calculateLayoverTime(selectedFlight)[0].itineraries.layover_time}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>`
                                : ''
                            }

                                    `).join('')

                }

                        <table class="w560" cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                                <tr>
                                    <td class="traveler-info">
                                        <img src="https://cmsrepository.com/static/flights/common/eticket/user.png" style="vertical-align: middle;"> Traveler(s) Details
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="100%" class="tabel-format2" cellpadding="10" cellspacing="0" border="0">
                                            <tbody>
                                                <tr>
                                                    <th>Traveler(s) Name</th>
                                                    <th>Gender</th>
                                                    <th>DOB(DD/MM/YYYY)</th>
                                                </tr>
                                                ${travelers.map((traveler, index) => `
                                                    <tr>
                                                        <td>${index + 1}. ${traveler.firstName} ${traveler.lastName}</td>
                                                        <td>${traveler.travelerType === '1' ? 'Female' : 'Male'}</td>
                                                        <td> ${traveler.dobDate < 10 ? `0${traveler.dobDate}` : traveler.dobDate}/
                                                                                                                    ${traveler.dobMonth < 10 ? `0${traveler.dobMonth}` : traveler.dobMonth}/
                                                                                                                    ${traveler.dobYear}</td>
                                                    </tr>
                                                `).join('')}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr><td height="20"></td></tr>
                                <tr>
                                    <td>
                                        <table class="w560" cellpadding="0" cellspacing="0" border="0">
                                            <tbody>
                                                <tr>
                                                    <td style="background: #1b75bc; padding: 10px; border-radius: 5px 5px 0 0; color: #fff; font-size: 14px; font-weight: 600;">
                                                        <img src="https://cmsrepository.com/static/flights/common/eticket/price-icon.png" style="vertical-align: middle; margin-right: 5px;"> Price Details
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <table class="tabel-format2" width="100%" cellpadding="10" cellspacing="0" border="0" style="border-color: #ccc; border-collapse: collapse; font-size: 14px; background: #F5F5F5; font-weight: bold; color: #1F1F1F; border-radius: 0 0 5px 5px;">
                                                            <tbody>
                                                                <tr>
                                                                    <td>Flight Price</td>
                                                                    <td style="text-align: right;">${selectedFlight.travelerPricings[0].price.total}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="border-top: 1px dashed #ddd; color: #3AB54A; font-weight: bold;">
                                                                        <span style="color: #1F1F1F;">Flight Watcher</span>
                                                                    </td>
                                                                    <td style="border-top: 1px dashed #ddd; color: #3AB54A; text-align: right; font-weight: bold;">
                                                                        Free
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="padding-bottom: 20px; font-size: 16px; color: #1b75bc; border-top: 2px solid #ddd;">
                                                                        Total Travel Cost
                                                                    </td>
                                                                    <td style="padding-bottom: 20px; font-size: 16px; text-align: right; color: #ff7f00; border-top: 2px solid #ddd;">
                                                                    ${selectedFlight.travelerPricings[0].price.total}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="h20"></td>
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 12px; line-height: 1.6em;">
                                                        The total travel cost in the amount of <b>${selectedFlight.travelerPricings[0].price.total}</b> were charged to the (Visa) ending in <b>1234</b> of <b>John Doe</b>. Your Credit/Debit card may be billed in multiple charges totaling the final price.
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="h20"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>



                <!-- Footer Section -->
                <footer>
                    <p>&copy; 2024 jetquins travelss . All Rights Reserved.</p>
                    <p>Address | <a href="mailto:contact@jetquins travels.com">contact@jetquins travels.com</a> | Phone: +1-(888)-267-5955</p>
                </footer>

                </body>
                </html>

            `;


            const htmlContent = content(travellerDetails, selectedFlight, travelers);
            // Step 1: Generate PDF
            const response = await fetch('/api/generate-pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ htmlContent }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate PDF');
            }

            const { filePath } = await response.json(); // Get the saved file path

            // Step 2: Send Email
            const emailResponse = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: email,
                    subject: 'Booking Confirmation and Traveler Details',
                    text: emailContent,
                    filePath, // Pass the saved PDF file path
                }),
            });

            if (emailResponse.ok) {
                toast.success('Booking email sent successfully!');
            } else {
                const { error } = await emailResponse.json();
                toast.error(error || 'Failed to send email');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.message || 'An unexpected error occurred!');
        }
    };

    // Function for send sms to customer mobile number
    const handleSMSSubmit = async (travelerData, selectedFlight) => {
        const to = travelerData.contactDetails.Mobile;
        const message = `
                Dear ${travelerData.travelers[0].firstName} ${travelerData.travelers[0].lastName},

                Thank you for booking with jetquins travels! We are excited to confirm your upcoming jetquins travels.

                Here are the details of your booking:

                ----------------------------------------------------------
                **Flight Details**:
                - **Airline**: ${selectedFlight.itineraries[0].segments[0].airline.name}
                - **Flight Number**: ${selectedFlight.itineraries[0].segments[0].departure.number}
                - **Departure Date & Time**: ${getFormattedDate(selectedFlight.itineraries[0].segments[0].departure.at)} at ${getTimeFromDate(selectedFlight.itineraries[0].segments[0].departure.at)}
                - **Departure City**: ${selectedFlight.itineraries[0].segments[0].departure.airport.city}
                - **Arrival City**: ${selectedFlight.itineraries[0].segments[0].arrival.airport.city}
                - **Seat Number**: ${11}

                **Booking Reference**: ${223232323}  
                **Total Amount**: ${selectedFlight.price.grandTotal}

                ----------------------------------------------------------
                **Important Information**:
                - Please make sure to check in at least 2 hours before your flight’s departure time.
                - Ensure you have all necessary travel documents (passport, visa, etc.) for a smooth journey.

                If you need to modify your reservation or have any questions, feel free to reach out to us at +1-866-307-8603 or email us at contact@jetquins travels.com

                Safe travels, and thank you for flying with jetquins travels!

                Best regards,  
                jetquins travels
                www.jetquinstravels.com  
                +1-866-307-8603 
                contact@jetquins travels.com
        `;

        try {
            const response = await fetch('/api/send-sms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ to, message }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Message sent successfully!');
            } else {
                toast.error('Failed to send message: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            toast.error('Error sending message: ' + error.message);
            console.error('Error sending message:', error);
        }
    };


    useEffect(() => {
        console.log("Updated travellers details:", travellersDetails);
    }, [travellersDetails]);

    // Helper function to get years for DOB
    const getYears = () => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 100 }, (_, index) => currentYear - index);
    };

    const years = getYears();

    // Handle input changes for each traveler
    const handleInputChanges = (travelerId, e) => {
        const { name, value } = e.target;

        // Use the travelerId to find the specific traveler and update their data
        setTravelers((prevTravelers) => {
            // Find the traveler in the array by matching the id
            const updatedTravelers = prevTravelers.map((traveler) =>
                traveler.id === travelerId
                    ? { ...traveler, [name]: value } // Update the traveler by ID
                    : traveler // Keep the rest unchanged
            );

            return updatedTravelers;
        });
    };

    const genderOptions = [
        { value: 1, label: 'Male' },
        { value: 2, label: 'Female' }
    ];

    // State to manage the selected gender
    const [selectedGender, setSelectedGender] = useState(1); // Default to 'Male'

    // Function to handle the gender selection
    const handleGenderChange = (id, gender) => {
        setTravelers((prevTravelers) => {
            const updatedTravelers = [...prevTravelers];

            // Find the traveler by ID and update gender and title
            const travelerIndex = updatedTravelers.findIndex((traveler) => traveler.id === id);
            if (travelerIndex !== -1) {
                updatedTravelers[travelerIndex] = {
                    ...updatedTravelers[travelerIndex],
                    gender,
                    title: gender === '1' ? 'Mr' : gender === '2' ? 'Mrs' : '', // Adjust title for adults
                };
            }

            return updatedTravelers;
        });
    };

    // Handle title change
    const handleTitleChange = (id, title) => {
        setTravelers((prevTravelers) => {
            const updatedTravelers = [...prevTravelers];

            // Find the traveler by ID and update the title
            const travelerIndex = updatedTravelers.findIndex((traveler) => traveler.id === id);
            if (travelerIndex !== -1) {
                updatedTravelers[travelerIndex] = {
                    ...updatedTravelers[travelerIndex],
                    title,
                };
            }

            return updatedTravelers;
        });
    };

    // Handle country selection from dropdown
    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        const updatedTravelers = [...travelers];
        updatedTravelers.forEach((traveler, index) => {
            traveler.phoneCode = country.dialCode;
        });
        setTravelers(updatedTravelers);
        setIsDropdownOpens(false);
    };

    // Calculate the age and set the travelerType
    const calculateAge = (dobDate, dobMonth, dobYear) => {
        const currentDate = new Date();
        const birthDate = new Date(dobYear, dobMonth - 1, dobDate); // Month is 0-based in JavaScript Date
        let age = currentDate.getFullYear() - birthDate.getFullYear();

        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();

        // If birthday hasn't occurred yet this year, subtract 1 from age
        if (currentMonth < birthDate.getMonth() || (currentMonth === birthDate.getMonth() && currentDay < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    const getTravelerType = (dobDate, dobMonth, dobYear) => {
        const age = calculateAge(dobDate, dobMonth, dobYear);
        if (age >= 12) return 'Adult'; // Adult
        if (age >= 2) return 'Child'; // Child
        return 'Infant'; // Infant
    };

    useEffect(() => {
        // Avoid updating the state unnecessarily to prevent infinite re-renders
        setTravelers((prevTravelers) => {
            const updatedTravelers = prevTravelers.map((traveler) => {
                if (traveler.dobDate && traveler.dobMonth && traveler.dobYear) {
                    const travelerType = getTravelerType(
                        traveler.dobDate,
                        traveler.dobMonth,
                        traveler.dobYear
                    );

                    // Only update if the travelerType has actually changed
                    if (traveler.travelerType !== travelerType) {
                        return { ...traveler, travelerType };
                    }
                }
                return traveler;
            });

            // Only update if there's a change
            const isDifferent = !prevTravelers.every((traveler, index) => {
                return JSON.stringify(traveler) === JSON.stringify(updatedTravelers[index]);
            });

            // If no changes, return the previous state, otherwise return updated state
            return isDifferent ? updatedTravelers : prevTravelers;
        });
    }, [travelers]); // Include travelers as dependency to trigger when travelers change

    const handleAffirmPayment = () => {
        console.log('Processing payment with Affirm...');

    };

    useEffect(() => {
        setIsAffirmPayment(true);
    }, []);

    const scrollToMissingField = (travelerId) => {
        const travelerForm = document.getElementById(`${travelerId}_wrapper`);
        if (travelerForm) {
            const inputs = travelerForm.querySelectorAll('input');
            for (let input of inputs) {
                // Check if the field is empty
                if (!input.value.trim()) {
                    input.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    break;
                }
            }
        }
    };

    // Function to toggle the flight detail visibility
    const handleToggleFilterspdtl = () => {
        setFlightDetailVisible(!flightDetailVisible); // Toggle visibility
    };

    const handleRemoveRefund = () => {
        // Set the state to false to hide the refund section
        setRefundSectionVisible(false);
    };


    return <>
        {loading && (
            <div style={styles.loadingOverlay}>
                <div style={styles.loaderContainer}>
                    <i className="fa fa-spinner fa-spin" style={styles.spinner}></i> Loading...
                </div>
            </div>
        )}
        {selectedFlight && <div className="body-content" bis_skin_checked="1">
            <div className="payment-wrapper kaxsdc" data-event="load" bis_skin_checked={1}>
                <div className="container" bis_skin_checked={1}>
                    <div className="row" bis_skin_checked={1}>
                        <div className="col-sm-2 col-xs-12" bis_skin_checked={1}>
                            <div className="go-button" onClick={gotolisting}>
                                <a href="#" >
                                    <i className="fa fa-angle-left" aria-hidden="true" /> Change Flight
                                </a>
                            </div>
                        </div>
                        <div className="col-sm-10 hidden-xs" bis_skin_checked={1}>
                            <ul className="secure_payment">
                                <li>
                                    <span>
                                        <img src="/assets/images/payment/secure.png" alt="" /> Secure <br />
                                        Payment System
                                    </span>
                                </li>
                                <li>
                                    <span className="easy">
                                        <img src="/assets/images/payment/essy-booking.png" alt="" /> Easy
                                        <br /> Booking
                                    </span>
                                </li>
                                <li>
                                    <span className="certified">
                                        <img src="/assets/images/payment/certified.png" alt="" /> Certified
                                        <br />
                                        Travel Portal
                                    </span>
                                </li>
                                <li className="last">
                                    <span className="certified">
                                        <img src="/assets/images/payment/essy-booking.png" alt="" /> Focused
                                        on <br />
                                        Quality Services
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <input type="hidden" defaultValue={1} id="totalPax" />

                    {showSignIn && <SignInComponent hideLoginPopup={hideSignIn} showSignUp={showSignUpForm} />}
                    {showSignUp && <SignUpComponent hideSignUp={hideSignUp} showSignIn={showSignInFor} />}

                    {/* MAIN-FORM */}
                    {loading && (
                        <div style={styles.loadingOverlay}>
                            <div style={styles.loaderContainer}>
                                <i className="fa fa-spinner fa-spin" style={styles.spinner}></i> Loading...
                            </div>
                        </div>
                    )}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault(); // Prevent default form submission behavior
                            handleSubmitTravellersDetails(); // Call the first function
                        }}
                        autoComplete="off"
                        id="fltpaymentform"
                        method="post"
                    >

                        <input type="hidden" id="isUprgadeAvail" />
                        <input
                            id="flightBookingRequest_userSessionID"
                            name="flightBookingRequest.userSessionID"
                            type="hidden"
                            defaultValue="16991_ee7d79c2968541e8ba92dabd0aca43b4"
                        />
                        <input
                            data-val="true"
                            data-val-number="The field oldPriceForTF must be a number."
                            data-val-required="The oldPriceForTF field is required."
                            id="flightBookingRequest_oldPriceForTF"
                            name="flightBookingRequest.oldPriceForTF"
                            type="hidden"
                            defaultValue={0}
                        />
                        <input
                            data-val="true"
                            data-val-number="The field IsSoldOut must be a number."
                            data-val-required="The IsSoldOut field is required."
                            id="flightBookingRequest_IsSoldOut"
                            name="flightBookingRequest.IsSoldOut"
                            type="hidden"
                            defaultValue={0}
                        />
                        <input
                            id="flightBookingRequest_NearBy"
                            name="flightBookingRequest.NearBy"
                            type="hidden"
                            defaultValue="no"
                        />
                        <input
                            id="flightBookingRequest_FlexSearch"
                            name="flightBookingRequest.FlexSearch"
                            type="hidden"
                            defaultValue="no"
                        />
                        <input
                            id="flightBookingRequest_KountSessionID"
                            name="flightBookingRequest.KountSessionID"
                            type="hidden"
                            defaultValue="3404b72840944f078d9c44bdf7a21cb1"
                        />
                        <input
                            id="flightBookingRequest_img_val"
                            name="flightBookingRequest.img_val"
                            type="hidden"
                            defaultValue=""
                        />
                        <input
                            id="flightBookingRequest_bagSellPosposition"
                            name="flightBookingRequest.bagSellPosposition"
                            type="hidden"
                            defaultValue=""
                        />
                        <input
                            id="flightBookingRequest_ResponseUniqueKey"
                            name="flightBookingRequest.ResponseUniqueKey"
                            type="hidden"
                            defaultValue="1601141000blrhydai591t31aug20241435hyddelai418t31aug20241735290824010823222d612344cc4eba8271f1003bea675c"
                        />
                        <input
                            data-val="true"
                            data-val-number="The field SeatMinprice must be a number."
                            data-val-required="The SeatMinprice field is required."
                            id="flightBookingRequest_SeatMinprice"
                            name="flightBookingRequest.SeatMinprice"
                            type="hidden"
                            defaultValue=""
                        />
                        <input
                            data-val="true"
                            data-val-number="The field baggNO must be a number."
                            data-val-required="The baggNO field is required."
                            id="flightBookingRequest_baggNO"
                            name="flightBookingRequest.baggNO"
                            type="hidden"
                            defaultValue={0}
                        />
                        <input
                            data-val="true"
                            data-val-number="The field baggNI must be a number."
                            data-val-required="The baggNI field is required."
                            id="flightBookingRequest_baggNI"
                            name="flightBookingRequest.baggNI"
                            type="hidden"
                            defaultValue={0}
                        />
                        <input
                            data-val="true"
                            data-val-number="The field baggNCO must be a number."
                            data-val-required="The baggNCO field is required."
                            id="flightBookingRequest_baggNCO"
                            name="flightBookingRequest.baggNCO"
                            type="hidden"
                            defaultValue={0}
                        />
                        <input
                            data-val="true"
                            data-val-number="The field baggNCI must be a number."
                            data-val-required="The baggNCI field is required."
                            id="flightBookingRequest_baggNCI"
                            name="flightBookingRequest.baggNCI"
                            type="hidden"
                            defaultValue={0}
                        />
                        <input
                            data-val="true"
                            data-val-number="The field BaggagePrice must be a number."
                            data-val-required="The BaggagePrice field is required."
                            id="flightBookingRequest_BaggagePrice"
                            name="flightBookingRequest.BaggagePrice"
                            type="hidden"
                            defaultValue={0}
                        />
                        <input
                            id="flightBookingRequest_flightid"
                            name="flightBookingRequest.flightid"
                            type="hidden"
                            defaultValue="sss913"
                        />
                        <input
                            name="__RequestVerificationToken"
                            type="hidden"
                            defaultValue="1B6vOSriZWuwEaKPhz7PAuYPpCykp2q52mH61yCbTOiLHzOMmMzWd9oGy7aD899vmtcTDCn3TWVg6Dit1lztPeZQ9Cy8KP7VKyPvHlhY5tk1"
                        />
                        <input type="hidden" id="customValuesAffirm" name="customValuesAffirm" />
                        <input type="hidden" id="airline_selected" defaultValue="AI" />
                        <input type="hidden" id="sourceMedia" defaultValue="googlepmax" />
                        <input
                            type="hidden"
                            id="_todaydate"
                            name="_todaydate"
                            defaultValue="08/22/2024"
                        />
                        <div className="row" bis_skin_checked={1}>
                            <div
                                className="col-xs-12  col-lg-3 col-lg-push-9"
                                id="add_block"
                                bis_skin_checked={1}
                            ></div>
                            <div
                                className="col-xs-12 col-md-12 col-sm-12 col-lg-9 col-lg-pull-3 validateinput"
                                id="fltBookingDetails"
                                bis_skin_checked={1}
                            >
                                <div id="div_Itinerary" className="step1" bis_skin_checked={1}>
                                    <div className="payment_itinary" bis_skin_checked={1}>
                                        <div className="row" bis_skin_checked={1}>
                                            <div className="col-sm-12" bis_skin_checked={1}>
                                                <div className="mainheading" bis_skin_checked={1}>
                                                    <img
                                                        src="/assets/images/svg/p-flight-summary.svg"
                                                        className="icon flightdetail"
                                                    />
                                                    Flight Summary
                                                </div>
                                            </div>
                                        </div>
                                        <input
                                            type="hidden"
                                            name="hdn_DOB_ValidatingDate"
                                            id="hdn_DOB_ValidatingDate"
                                            defaultValue="Sat, Aug 31, 2024"
                                        />
                                        <div
                                            className="flexi-content visible-xs"
                                            bis_skin_checked={1}
                                        ></div>
                                        <div className="result-block sss913" bis_skin_checked={1}>
                                            <div className="row" bis_skin_checked={1}>
                                                <div className="col-md-6 col-xs-12" bis_skin_checked={1}>
                                                    <div
                                                        className="flexi-content hidden-xs"
                                                        bis_skin_checked={1}
                                                    ></div>
                                                </div>
                                                <div
                                                    className="col-md-6 col-xs-12 text-right"
                                                    bis_skin_checked={1}
                                                >
                                                    <div
                                                        className="easy-free-cancellation"
                                                        bis_skin_checked={1}
                                                    >
                                                        <i className="fa fa-check" aria-hidden="true" /> Easy
                                                        Cancelation within 24 hours.
                                                        <span className="tooltip-custom">
                                                            <i
                                                                className="fa fa-info hand"
                                                                style={{ color: "#fff", borderColor: "#fff" }}
                                                            />
                                                            <div className="promo-detail" bis_skin_checked={1}>
                                                                <span className="arrow" />
                                                                <p>
                                                                    Easy cancelation within 24 hours for a fee by
                                                                    calling our 24x7 support team.
                                                                </p>
                                                            </div>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="position-relative" bis_skin_checked={1}>
                                                <div
                                                    className="row clickflightdetail"
                                                    onclick=""
                                                    bis_skin_checked={1}
                                                >
                                                    <div
                                                        className="col-sm-10 col-xs-12 col-sm-12"
                                                        id="fltlst"
                                                        bis_skin_checked={1}
                                                    >
                                                        <div className="depart-flight" bis_skin_checked={1}>
                                                            <a className="xs-dis-blck" href={""}>
                                                                <div className="row" bis_skin_checked={1}>
                                                                    <div
                                                                        className="col-sm-3 col-xs-12 no-padding-left"
                                                                        bis_skin_checked={1}
                                                                    >
                                                                        <div
                                                                            className="airline-detail"
                                                                            bis_skin_checked={1}
                                                                        >
                                                                            <span className="price-section visible-xs">
                                                                                <price>
                                                                                    ${selectedFlight.price.base}
                                                                                    <div
                                                                                        className="per-adult"
                                                                                        bis_skin_checked={1}
                                                                                    >
                                                                                        (per adult)
                                                                                    </div>
                                                                                </price>
                                                                            </span>
                                                                            <img
                                                                                src={selectedFlight.itineraries[0].segments[0].airline.logo}
                                                                                onError="if (this.src != 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/ai.png') this.src = 'https://cmsrepository.com/static/flights/flight/airlinelogo-png/ai.png';"
                                                                            />
                                                                            <div className="name" bis_skin_checked={1}>
                                                                                {selectedFlight.itineraries[0].segments[0].airline.name}
                                                                                <span className="tooltip-custom">
                                                                                    <div
                                                                                        className="promo-detail"
                                                                                        bis_skin_checked={1}
                                                                                    >
                                                                                        <span className="arrow" />
                                                                                        <p className="mb5px">
                                                                                            359 AIRBUS INDUSTRIE A350-900 JET
                                                                                            314-475 STD Seats
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="col-sm-7 col-xs-12"
                                                                        bis_skin_checked={1}
                                                                    >
                                                                        <div className="flex-date " bis_skin_checked={1}>
                                                                            {getFormattedDate(selectedFlight.itineraries[0].segments[0].departure.at)}
                                                                        </div>
                                                                        <div className="leg-details" bis_skin_checked={1}>
                                                                            <div
                                                                                className="city text-right"
                                                                                bis_skin_checked={1}
                                                                            >
                                                                                <div className="time" bis_skin_checked={1}>
                                                                                    <strong>{getTimeFromDate(selectedFlight.itineraries[0].segments[0].departure.at, false).hours}</strong> {getTimeFromDate(selectedFlight.itineraries[0].segments[0].departure.at, false).ampm}
                                                                                </div>
                                                                                <div className="code" bis_skin_checked={1}>
                                                                                    <span className=" tooltip-custom minor-txt">
                                                                                        {selectedFlight.itineraries[0].segments[0].departure.iataCode}
                                                                                        <div
                                                                                            className="promo-detail"
                                                                                            bis_skin_checked={1}
                                                                                        >
                                                                                            <span className="arrow" />
                                                                                            <p
                                                                                                className="mb5px"
                                                                                                style={{ textAlign: "left" }}
                                                                                            >
                                                                                                {selectedFlight.itineraries[0].segments[0].departure.airport.name}
                                                                                            </p>
                                                                                        </div>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className="connnecting-block"
                                                                            bis_skin_checked={1}
                                                                        >
                                                                            <div
                                                                                className="leg-points"
                                                                                bis_skin_checked={1}
                                                                            >
                                                                                <div
                                                                                    className="tooltip-custom"
                                                                                    bis_skin_checked={1}
                                                                                >
                                                                                    {calculateLayoverTime(selectedFlight).length > 0 && <span className="visible-xs layovertimemob">
                                                                                        <span
                                                                                            style={{ width: "auto" }}
                                                                                            className="fa fa-clock-o"
                                                                                        />
                                                                                        {calculateLayoverTime(selectedFlight)[0].itineraries.layover_time}
                                                                                    </span>}
                                                                                    {calculateLayoverTime(selectedFlight).length > 0 && <span>
                                                                                        <div
                                                                                            className="layovertime hidden-xs"
                                                                                            bis_skin_checked={1}
                                                                                        >
                                                                                            {calculateLayoverTime(selectedFlight)[0].itineraries.layover_time}
                                                                                        </div>
                                                                                        <i />
                                                                                        <div
                                                                                            className="destination_code"
                                                                                            bis_skin_checked={1}
                                                                                        >

                                                                                            <b>{selectedFlight.itineraries[0].segments[0].arrival.airport.iata}</b>
                                                                                        </div>
                                                                                    </span>}
                                                                                    <div
                                                                                        className="promo-detail"
                                                                                        bis_skin_checked={1}
                                                                                    >
                                                                                        <p>
                                                                                            <strong>Flight Duration: </strong>{extractDuration(selectedFlight.itineraries[0].duration)}
                                                                                        </p>
                                                                                        {calculateLayoverTime(selectedFlight).length > 0 && <p>
                                                                                            <strong>Layover 1:</strong>{calculateLayoverTime(selectedFlight)[0].itineraries.layover_time},
                                                                                            {selectedFlight.itineraries[0].segments[0].arrival.airport.iata}
                                                                                        </p>}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="leg-details" bis_skin_checked={1}>
                                                                            <div className="city" bis_skin_checked={1}>
                                                                                <div className="time" bis_skin_checked={1}>
                                                                                    <strong>{getTimeFromDate(selectedFlight.itineraries[0].segments[selectedFlight.itineraries[0].segments.length - 1].arrival.at, false).hours}</strong> {getTimeFromDate(selectedFlight.itineraries[0].segments[selectedFlight.itineraries[0].segments.length - 1].arrival.at, false).ampm}
                                                                                    <sup />
                                                                                </div>
                                                                                <div className="code" bis_skin_checked={1}>
                                                                                    <span className="  tooltip-custom minor-txt">
                                                                                        {selectedFlight.itineraries[0].segments[selectedFlight.itineraries[0].segments.length - 1].arrival.iataCode}
                                                                                        <div
                                                                                            className="promo-detail"
                                                                                            bis_skin_checked={1}
                                                                                        >
                                                                                            <span className="arrow" />
                                                                                            <p
                                                                                                className="mb5px"
                                                                                                style={{ textAlign: "left" }}
                                                                                            >
                                                                                                {selectedFlight.itineraries[0].segments[0].arrival.airport.name}
                                                                                            </p>
                                                                                        </div>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="col-sm-2 col-xs-12 p0px hidden-xs"
                                                                        bis_skin_checked={1}
                                                                    >
                                                                        <div
                                                                            className="trip-time"
                                                                            style={{
                                                                                fontSize: 12,
                                                                                width: 80,
                                                                                paddingTop: 20,
                                                                                color: "#333"
                                                                            }}
                                                                            bis_skin_checked={1}
                                                                        >
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width={12}
                                                                                height={12}
                                                                                fill="currentColor"
                                                                                className="bi bi-clock"
                                                                                viewBox="0 0 16 16"
                                                                                style={{ verticalAlign: "middle" }}
                                                                            >
                                                                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                                                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                                                                            </svg>
                                                                            {extractDuration(selectedFlight.itineraries[0].duration)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                id="flight_detail_payment"
                                                className="row"
                                                bis_skin_checked={1}
                                            >
                                                <div className="col-sm-9 col-xs-7" bis_skin_checked={1}></div>
                                                <div className="col-sm-3 col-xs-5" bis_skin_checked={1}>
                                                    <div className="flight-details-btn" bis_skin_checked={1}>
                                                        <a
                                                            style={{ zIndex: 5 }}
                                                            onClick={() => { return setFlightDetailVisible((prev => !prev)) }}
                                                        >
                                                            Flight Details
                                                            <i className="fa fa-angle-down sss606 arr-down" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            {flightDetailVisible && <div
                                                id="flight-details"
                                                className="flight-details"
                                                bis_skin_checked={1}
                                            >
                                                <div className="flight-leg-info" bis_skin_checked={1}>
                                                    <div
                                                        className="detail-head visible-xs"
                                                        bis_skin_checked={1}
                                                    >
                                                        <a
                                                            className="close-btn visible-xs"
                                                            data-toggle="collapse"
                                                            onClick={handleToggleFilterspdtl}
                                                        >
                                                            X
                                                        </a>
                                                        Flight Details
                                                    </div>
                                                    <ul className="flight-leg-tab" role="tablist">
                                                        <li role="presentation" className="active">
                                                            <a
                                                                href="#departuresss913"
                                                                aria-controls="Departure"
                                                                role="tab"
                                                                data-toggle="tab"
                                                            >
                                                                Departure
                                                            </a>
                                                        </li>
                                                    </ul>
                                                    <div className="tab-content" bis_skin_checked={1}>
                                                        <div
                                                            role="tabpanel"
                                                            className="tab-pane active"
                                                            id="departuresss913"
                                                            bis_skin_checked={1}
                                                        >
                                                            {
                                                                selectedFlight.itineraries[0].segments.map((a, i) => {
                                                                    return <> <div className="flight-details-segment" bis_skin_checked={1}>
                                                                        <div
                                                                            className="flight-schedule flight_departure"
                                                                            bis_skin_checked={1}
                                                                        >
                                                                            <div
                                                                                className="flight_scheduleTime"
                                                                                bis_skin_checked={1}
                                                                            >
                                                                                <strong>{getTimeFromDate(a.departure.at).hours}{getTimeFromDate(a.departure.at).ampm}</strong>
                                                                                <div className="date " bis_skin_checked={1}>
                                                                                    {getFormattedDate(a.departure.at)}
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                className="flight_scheduleStops-circle"
                                                                                bis_skin_checked={1}
                                                                            />
                                                                            <div
                                                                                className="flight_scheduleLocation"
                                                                                bis_skin_checked={1}
                                                                            >
                                                                                <div className="city" bis_skin_checked={1}>
                                                                                    {a.departure.airport.city}
                                                                                </div>
                                                                                <div className="airportname" bis_skin_checked={1}>
                                                                                    {a.departure.airport.name} ({a.departure.iataCode}), {a.departure.airport.country}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className="flight_detailsInfoTravel"
                                                                            bis_skin_checked={1}
                                                                        >
                                                                            <div
                                                                                className="flight_stopIntervalSeparator"
                                                                                bis_skin_checked={1}
                                                                            />
                                                                            <div
                                                                                className="flight-travel-details"
                                                                                bis_skin_checked={1}
                                                                            >
                                                                                <div
                                                                                    className="airlines-details"
                                                                                    bis_skin_checked={1}
                                                                                >
                                                                                    <div className="right" bis_skin_checked={1}>
                                                                                        <div
                                                                                            className="air-name"
                                                                                            bis_skin_checked={1}
                                                                                        >
                                                                                            <img
                                                                                                src={a.airline.logo}
                                                                                                alt="AIR INDIA"
                                                                                            />
                                                                                            {a.airline.name} - {a.carrierCode} {a.aircraft.code}
                                                                                            <br />
                                                                                            <span className="text-gray">
                                                                                                Cabin:
                                                                                                <span
                                                                                                    className="cabin_Out "
                                                                                                    id="cabin_Out_0"
                                                                                                >
                                                                                                    {a.cabin}
                                                                                                </span>
                                                                                                <div
                                                                                                    className="flight-leg-info"
                                                                                                    style={{ marginTop: 1 }}
                                                                                                    bis_skin_checked={1}
                                                                                                >
                                                                                                    Aircraft - {a.aircraft.code}
                                                                                                    {/* <span className="tooltip-custom">
                                                                                                    <i className="fa fa-info hand" />
                                                                                                    <div
                                                                                                        className="promo-detail"
                                                                                                        bis_skin_checked={1}
                                                                                                    >
                                                                                                        <p className="mb5px">
                                                                                                            359 AIRBUS INDUSTRIE A350-900 JET
                                                                                                            314-475 STD Seats
                                                                                                        </p>
                                                                                                    </div>
                                                                                                </span> */}
                                                                                                </div>
                                                                                                <div bis_skin_checked={1}></div>
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div
                                                                                        className="clearfix"
                                                                                        bis_skin_checked={1}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="clearfix" bis_skin_checked={1} />
                                                                        </div>
                                                                        <div
                                                                            className="flight-schedule flight_arrival"
                                                                            bis_skin_checked={1}
                                                                        >
                                                                            <div
                                                                                className="flight_scheduleTime"
                                                                                bis_skin_checked={1}
                                                                            >
                                                                                <strong>{getTimeFromDate(a.arrival.at, false).hours} {getTimeFromDate(a.arrival.at, false).ampm}</strong>
                                                                                <div className="date" bis_skin_checked={1}>
                                                                                    {getFormattedDate(a.arrival.at)}
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                className="flight_scheduleStops-circle"
                                                                                bis_skin_checked={1}
                                                                            />
                                                                            <div
                                                                                className="flight_scheduleLocation"
                                                                                bis_skin_checked={1}
                                                                            >
                                                                                <div className="city" bis_skin_checked={1}>
                                                                                    {a.arrival.airport.city}
                                                                                </div>
                                                                                <div className="airportname" bis_skin_checked={1}>
                                                                                    {a.arrival.airport.name} ({a.arrival.airport.city}), {a.arrival.airport.country}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                        {i < selectedFlight.itineraries[0].segments.length - 1 && <div
                                                                            className="flight-details-segment"
                                                                            bis_skin_checked={1}
                                                                        >
                                                                            <div
                                                                                className="flight-stop flight-stop--danger"
                                                                                bis_skin_checked={1}
                                                                            >
                                                                                <div
                                                                                    className="flight-duration"
                                                                                    title="Transfer time"
                                                                                    bis_skin_checked={1}
                                                                                >
                                                                                    <i className="fa fa-clock-o" /> {calculateLayoverTime(selectedFlight).length > 0 && calculateLayoverTime(selectedFlight)[i].itineraries.layover_time}
                                                                                </div>
                                                                                <div
                                                                                    className="flight-stop-interval"
                                                                                    bis_skin_checked={1}
                                                                                >
                                                                                    <div
                                                                                        className="flight_stopIntervalSeparator"
                                                                                        bis_skin_checked={1}
                                                                                    />
                                                                                    <div
                                                                                        className="flight-layover-label"
                                                                                        bis_skin_checked={1}
                                                                                    >
                                                                                        Layover in {a.arrival.airport.city}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="clearfix" bis_skin_checked={1} />
                                                                            </div>
                                                                        </div>}
                                                                    </>
                                                                })
                                                            }
                                                            <div className="total-trip-time" bis_skin_checked={1}>
                                                                <i className="fa fa-clock-o" /> Departure Trip Time:
                                                                <b>{extractDuration(selectedFlight.itineraries[0].duration)}</b>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>}
                                        </div>
                                        <div
                                            id="baggage-fees-popup"
                                            className="modal fade"
                                            role="dialog"
                                            bis_skin_checked={1}
                                        >
                                            <div className="modal-content" bis_skin_checked={1}>
                                                <div className="close_window" bis_skin_checked={1}>
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
                                                <div id="fltbaggage" bis_skin_checked={1}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <input
                                        type="hidden"
                                        id="responsebagg"
                                        defaultValue="1601141000blrhydai591t31aug20241435hyddelai418t31aug20241735290824010823222d612344cc4eba8271f1003bea675c"
                                    />
                                    <div className="form-box" bis_skin_checked={1}>
                                        <div className="mainheading" bis_skin_checked={1}>
                                            <img
                                                src="/assets/images/svg/p-contact.svg"
                                                className="icon contact-info"
                                            />
                                            Booking details will be sent to
                                        </div>
                                        <div className="row" bis_skin_checked={1}>
                                            <div className="col-sm-4 col-xs-12" bis_skin_checked={1}>
                                                <label className="label_hide_mobile">
                                                    Email <span className="required">*</span>
                                                </label>
                                                <input
                                                    autoComplete="off"
                                                    className="Payment esname"
                                                    id="flightBookingRequest_Contact_Email"
                                                    placeholder="Email"
                                                    type="text"
                                                    ref={emailRef}
                                                />
                                                <label
                                                    style={{ fontSize: 13, top: "-8px", position: "relative" }}
                                                >
                                                    (Booking Details Via email)
                                                </label>
                                                <span
                                                    className="field-validation-valid"
                                                    data-valmsg-for="flightBookingRequest.Contact.Email"
                                                    data-valmsg-replace="true"
                                                />
                                                <span className="required_mobile">*</span>
                                            </div>
                                            <div className="col-sm-8 col-xs-12" bis_skin_checked={1}>
                                                <div className="row" bis_skin_checked={1}>

                                                    {/* Country Code */}
                                                    <div className="col-sm-3 col-xs-12">
                                                        <label>
                                                            Country code<span className="required">*</span>
                                                        </label>
                                                        <div className="country-code mb20">
                                                            <div className="intl-tel-input">
                                                                <div className="flag-dropdown f16" onClick={toggleDropdown}>
                                                                    <div className="selected-flag">
                                                                        <div className={`flag ${selectedCountry.countryCode}`} />
                                                                        <div className="down-arrow" style={styles.downArrow} />
                                                                    </div>
                                                                    <ul className={`country-list ${isDropdownOpen ? '' : 'hide'}`} style={styles.countryList}>
                                                                        {countryCodeArr.map((country) => (
                                                                            <li
                                                                                key={country.countryCode}
                                                                                className="country"
                                                                                data-dial-code={country.dialCode}
                                                                                data-country-code={country.countryCode}
                                                                                onClick={() => handleCountrySelect(country)}
                                                                            >
                                                                                <div className={`flag ${country.countryCode}`} />
                                                                                <span className="country-name">{country.name}</span>
                                                                                <span className="dial-code">{country.dialCode}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                                <input
                                                                    className="nonvalidateTxt"
                                                                    id="PhoneCode"
                                                                    name="flightBookingRequest.Contact.Intcode"
                                                                    placeholder="e.g"
                                                                    readOnly
                                                                    type="tel"
                                                                    value={selectedCountry.dialCode}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-9 col-xs-12" bis_skin_checked={1}>
                                                        <div className="row" bis_skin_checked={1}>
                                                            <div
                                                                className="col-sm-6 col-xs-12"
                                                                bis_skin_checked={1}
                                                            >
                                                                <label className="label_hide_mobile">
                                                                    Billing Phone Number
                                                                    <span className="required">*</span>
                                                                </label>
                                                                <input
                                                                    autoComplete="off"
                                                                    className="phone-number Payment numeric"
                                                                    id="flightBookingRequest_Contact_BillingPhone"
                                                                    ref={phoneRef}
                                                                    maxLength={15}
                                                                    minLength={10}
                                                                    name="flightBookingRequest.Contact.BillingPhone"
                                                                    placeholder="Billing Phone Number"
                                                                    type="tel"
                                                                    defaultValue=""
                                                                />
                                                                <label
                                                                    id="us_sms"
                                                                    style={{
                                                                        fontSize: 13,
                                                                        top: "-8px",
                                                                        position: "relative"
                                                                    }}
                                                                >
                                                                    (Booking Details Via SMS)
                                                                </label>
                                                                <span
                                                                    className="field-validation-valid"
                                                                    data-valmsg-for="flightBookingRequest.Contact.BillingPhone"
                                                                    data-valmsg-replace="true"
                                                                />
                                                                <span className="required_mobile">*</span>
                                                            </div>
                                                            <div
                                                                className="col-sm-6 col-xs-12"
                                                                bis_skin_checked={1}
                                                            >
                                                                <label className="label_hide_mobile">
                                                                    Alternate Phone Number
                                                                </label>
                                                                <input
                                                                    autoComplete="off"
                                                                    className="phone-number  nonvalidateTxt numeric"
                                                                    id="flightBookingRequest_Contact_AlternatePhone"
                                                                    maxLength={15}
                                                                    minLength={10}
                                                                    ref={alternateNumRef}
                                                                    name="flightBookingRequest.Contact.AlternatePhone"
                                                                    placeholder="Alternate Phone Number"
                                                                    type="tel"
                                                                    defaultValue=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="imp-msg contact_sms_check" bis_skin_checked={1}>
                                            <div
                                                className="mb20"
                                                style={{ color: "red", display: "none" }}
                                                id="altntext"
                                                bis_skin_checked={1}
                                            >
                                                Alternate number (if provided) must be different from billing
                                                phone number.
                                            </div>
                                            <div className="inputSet" bis_skin_checked={1}>
                                                <label>
                                                    <input
                                                        defaultChecked="checked"
                                                        data-val="true"
                                                        data-val-required="The IsSubscribed field is required."
                                                        id="flightBookingRequest_IsSubscribed"
                                                        name="flightBookingRequest.IsSubscribed"
                                                        type="checkbox"
                                                        defaultValue="true"
                                                    />
                                                    <input
                                                        name="flightBookingRequest.IsSubscribed"
                                                        type="hidden"
                                                        defaultValue="false"
                                                    />
                                                    <span />
                                                </label>
                                                Send me latest travel deals and special offers via email
                                                and/or SMS.
                                            </div>
                                            <div className="mb20" bis_skin_checked={1}>
                                                <b style={{ color: "#ff7f00" }}>

                                                    <i className="fa fa-warning" /> Important!
                                                </b>
                                                Provide your valid email and phone number to receive e-tickets
                                                and your flight updates.
                                            </div>
                                        </div>
                                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }} >
                                            <button style={{ backgroundColor: "#0066b2", color: "white", fontWeight: 500, textAlign: "center", border: 0, padding: "10px" }} onClick={handleCustomerDetailCollection} >Proceed to add travellers <i class="fa-solid fa-angles-down"></i></button>
                                        </div>
                                    </div>
                                </div>


                                <div id="div_Traveler" className="step2" bis_skin_checked={1}>
                                    {formedFilled && <div className="form-box" bis_skin_checked={1} >
                                        <div className="mainheading" bis_skin_checked={1}>
                                            <img
                                                src="/assets/images/svg/p-traveller-information.svg"
                                                className="icon traveller-info"
                                            />
                                            Traveler Information
                                        </div>
                                        <input
                                            data-val="true"
                                            data-val-number="The field Count must be a number."
                                            data-val-required="The Count field is required."
                                            id="flightBookingRequest_PassengerList_Count"
                                            name="flightBookingRequest.PassengerList.Count"
                                            type="hidden"
                                            defaultValue={1}
                                        />
                                        <input
                                            data-val="true"
                                            data-val-number="The field Gds must be a number."
                                            data-val-required="The Gds field is required."
                                            id="flightBookingRequest_Flight_Gds"
                                            name="flightBookingRequest.Flight.Gds"
                                            type="hidden"
                                            defaultValue={114}
                                        />
                                        <input type="hidden" id="hvtflgg" defaultValue="false" />
                                        <input type="hidden" id="valc" defaultValue="AI" />
                                        <input
                                            data-val="true"
                                            data-val-required="The PassengerType field is required."
                                            id="flightBookingRequest_PassengerList_0__PassengerType"
                                            name="flightBookingRequest.PassengerList[0].PassengerType"
                                            type="hidden"
                                            defaultValue="Adult"
                                        />
                                        <input
                                            data-val="true"
                                            data-val-required="The IsLeadPassenger field is required."
                                            id="flightBookingRequest_PassengerList_0__IsLeadPassenger"
                                            name="flightBookingRequest.PassengerList[0].IsLeadPassenger"
                                            type="hidden"
                                            defaultValue="True"
                                        />
                                        <input
                                            data-val="true"
                                            data-val-number="The field TravelerNo must be a number."
                                            data-val-required="The TravelerNo field is required."
                                            id="flightBookingRequest_PassengerList_0__TravelerNo"
                                            name="flightBookingRequest.PassengerList[0].TravelerNo"
                                            type="hidden"
                                            defaultValue={1}
                                        />

                                        {travelers.length > 0 && (
                                            <>
                                                {/* New Section for Adult */}
                                                {travelers.filter(traveler => traveler.travelerType === 'Adult').map((adult, index) => (
                                                    <div key={adult.id}>

                                                        <div className="head" id="p0_wrapper" bis_skin_checked={1}>
                                                            {adult.travelerType} {index + 1}
                                                            <p>Passenger details must match your passport or photo ID</p>
                                                        </div>

                                                        <div className="gender-type">
                                                            <ul>
                                                                {genderOptions.map((gender, index) => (
                                                                    <li key={index}>
                                                                        <div className="inputSet">
                                                                            <label>
                                                                                <input
                                                                                    type="radio"
                                                                                    name={`gender-${adult.id}`}
                                                                                    value={gender.value}
                                                                                    checked={adult.gender === gender.value}
                                                                                    onChange={(e) => handleGenderChange(adult.id, e.target.value)}
                                                                                />
                                                                                <span>{gender.label}</span>
                                                                            </label>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                            <div className="clearfix"></div>
                                                        </div>

                                                        <div className="row" bis_skin_checked={1}>

                                                            <div className="col-sm-2 col-xs-12">
                                                                <label>
                                                                    Title
                                                                    <span className="required">*</span>
                                                                </label>
                                                                <div className="form-righterrow">
                                                                    <select
                                                                        name={`title-${adult.id}`}
                                                                        value={adult.title}
                                                                        onChange={(e) => handleTitleChange(adult.id, e.target.value)}
                                                                    >
                                                                        <option value="Mr">Mr</option>
                                                                        <option value="Mrs">Mrs</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-5 col-xs-12" bis_skin_checked={1}>
                                                                <label className="label_hide_mobile">
                                                                    First Name<span className="required">*</span>
                                                                </label>
                                                                <input
                                                                    className="Traveler esname alphanumeric"
                                                                    data-val="true"
                                                                    data-val-required="The FirstName field is required."
                                                                    id="flightBookingRequest_PassengerList_0__FirstName"
                                                                    maxLength={54}
                                                                    name="firstName"
                                                                    value={adult.firstName}
                                                                    onChange={(e) => handleInputChanges(adult.id, e)}
                                                                    placeholder="First Name"
                                                                    type="text"
                                                                    defaultValue=""
                                                                />
                                                                <span
                                                                    className="field-validation-valid"
                                                                    data-valmsg-for="flightBookingRequest.PassengerList[0].FirstName"
                                                                    data-valmsg-replace="true"
                                                                />
                                                                <span className="required_mobile">*</span>
                                                            </div>

                                                            <div className="col-sm-5 col-xs-12" bis_skin_checked={1}>
                                                                <label className="label_hide_mobile">
                                                                    Middle Name<small> (Optional)</small>
                                                                </label>
                                                                <input
                                                                    className="nonvalidateTxt esname alphanumeric"
                                                                    id="flightBookingRequest_PassengerList_0__MiddleName"
                                                                    maxLength={54}
                                                                    name="middleName"
                                                                    value={adult.middleName}
                                                                    onChange={(e) => handleInputChanges(adult.id, e)}
                                                                    onBlur={(e) => printEvent(e)}
                                                                    placeholder="Middle Name (Optional)"
                                                                    type="text"
                                                                    defaultValue=""
                                                                />
                                                            </div>

                                                        </div>
                                                        {/* Passenger Form */}
                                                        <PassengerForm
                                                            index={adult.id}
                                                            lastName={adult.lastName}
                                                            dobMonth={adult.dobMonth}
                                                            dobDate={adult.dobDate}
                                                            dobYear={adult.dobYear}
                                                            handleInputChanges={handleInputChanges} />
                                                        <div
                                                            id="dobMsg_0"
                                                            style={{
                                                                display: "none",
                                                                color: "#f00",
                                                                paddingBottom: 10,
                                                                fontSize: 13
                                                            }}
                                                            bis_skin_checked={1}
                                                        >
                                                            <i
                                                                className="fa fa-angle-double-right"
                                                                style={{ display: "none" }}
                                                                id="dobMsgI_0"
                                                            />
                                                            <i
                                                                className="fa fa-angle-double-right"
                                                                style={{ display: "none" }}
                                                                id="paxMsgI_0"
                                                            />
                                                        </div>

                                                        <div className="imp-msg">
                                                            {/* More Info Link */}
                                                            <div className="more-info">
                                                                <a
                                                                    href="#pasngrOD_0"
                                                                    id="pasngrMI_0"
                                                                    onClick={toggleMoreInfo}
                                                                    style={{ cursor: 'pointer' }}
                                                                >
                                                                    {isMoreInfoVisible ? '(-) Hide Info' : '(+) More Info'}
                                                                </a>
                                                                <small className="ffsmall_text">
                                                                    (Optional TSA Precheck and Redress Number)
                                                                </small>
                                                            </div>

                                                            {/* The additional info section that can be toggled */}
                                                            {isMoreInfoVisible && (
                                                                <div id="pasngrOD_0" className="pasngrOD_0">
                                                                    <div className="row" id="emergency_0">
                                                                        <div className="col-sm-5 col-xs-12">
                                                                            <label>Emergency contact name</label>
                                                                            <input
                                                                                className="alphanumeric nonvalidateTxt"
                                                                                id={`flightBookingRequest_Contact_EmergencyContactName_${index}`}
                                                                                name="emergencyContactName"
                                                                                placeholder="Name"
                                                                                type="text"
                                                                                value={adult.emergencyContactName}
                                                                                onChange={(e) => handleInputChanges(adult.id, e)}
                                                                            />
                                                                        </div>
                                                                        <div className="col-sm-7 col-xs-12">
                                                                            <div className="row">
                                                                                <div className="col-sm-5 col-xs-12">
                                                                                    <label>Country code</label>
                                                                                    <div className="country-code mb20">
                                                                                        <div className="intl-tel-input">
                                                                                            <div className="flag-dropdown f16" onClick={toggleDropdowns}>
                                                                                                <div className="selected-flag">
                                                                                                    <div className={`flag ${selectedCountry.countryCode}`} />
                                                                                                    <div className="down-arrow" style={styles1.downArrow} />
                                                                                                </div>
                                                                                                <ul className={`country-list ${isDropdownOpens ? '' : 'hide'}`} style={styles1.countryList}>
                                                                                                    {countryCodeArr.map((country) => (
                                                                                                        <li
                                                                                                            key={country.countryCode}
                                                                                                            className="country"
                                                                                                            data-dial-code={country.dialCode}
                                                                                                            data-country-code={country.countryCode}
                                                                                                            onClick={() => handleCountrySelect(country)}
                                                                                                        >
                                                                                                            <div className={`flag ${country.countryCode}`} />
                                                                                                            <span className="country-name">{country.name}</span>
                                                                                                            <span className="dial-code">{country.dialCode}</span>
                                                                                                        </li>
                                                                                                    ))}
                                                                                                </ul>
                                                                                            </div>
                                                                                            <input
                                                                                                className="nonvalidateTxt"
                                                                                                id={`PhoneCode_${index}`}
                                                                                                name="phoneCode"
                                                                                                placeholder="e.g"
                                                                                                readOnly
                                                                                                type="tel"
                                                                                                value={adult.phoneNumber}
                                                                                                onChange={(e) => handleInputChanges(adult.id, e)}

                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-7 col-xs-12">
                                                                                    <label>Emergency contact number</label>
                                                                                    <input
                                                                                        className="alphanumeric nonvalidateTxt"
                                                                                        id={`flightBookingRequest_Contact_EmergencyContactName_${index}`}
                                                                                        name="emergencyContactNumber"
                                                                                        placeholder="Name"
                                                                                        type="text"
                                                                                        value={adult.emergencyContactNumber}
                                                                                        onChange={(e) => handleInputChanges(adult.id, e)}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-sm-6 col-xs-12">
                                                                            <label>
                                                                                TSA Precheck
                                                                                <span className="tooltip-custom">
                                                                                    <i className="fa fa-info hand" />
                                                                                    <div className="promo-detail tsa_tooltip">
                                                                                        <span className="arrow" />
                                                                                        <p className="mb5px" style={{ textAlign: 'left' }}>
                                                                                            The Known Traveler Number is also referred to as
                                                                                            Pass ID, TSA PreCheck and Global Entry Number.
                                                                                            It can be found on the top-left corner on the
                                                                                            back of your Trusted Traveler membership card.
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </label>
                                                                            <input
                                                                                className="nonvalidateTxt alphanumericbothwithoutspace"
                                                                                id={`flightBookingRequest_PassengerList_${index}__TSAPrecheckNumber`}
                                                                                name="tsaPrecheckNumber"
                                                                                placeholder="Known Traveler Number (Optional)"
                                                                                type="text"
                                                                                value={adult.tsaPrecheckNumber}
                                                                                onChange={(e) => handleInputChanges(adult.id, e)}
                                                                            />
                                                                        </div>
                                                                        <div className="col-sm-6 col-xs-12">
                                                                            <label>
                                                                                Redress number
                                                                                <span className="tooltip-custom">
                                                                                    <i className="fa fa-info hand" />
                                                                                    <div className="promo-detail tsa_tooltip">
                                                                                        <span className="arrow" />
                                                                                        <p className="mb5px" style={{ textAlign: 'left' }}>
                                                                                            A Redress is a unique number that is assigned to
                                                                                            a passenger by the Department of Homeland
                                                                                            Security (DHS) for the purpose of promoting the
                                                                                            resolution with previous watch list alerts.
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </label>
                                                                            <input
                                                                                className="numeric nonvalidateTxt"
                                                                                id={`flightBookingRequest_PassengerList_${index}__TSARedressNumber`}
                                                                                name="redressNumber"
                                                                                placeholder="(Optional)"
                                                                                type="number"
                                                                                value={adult.redressNumber}
                                                                                onChange={(e) => handleInputChanges(adult.id, e)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            )}
                                                        </div>

                                                        {/* {travelers.length > 1 && (
                                                    <button type="button" onClick={() => removeAdult(travelers.length - 1)} style={buttonStyle}>
                                                        Remove Last Traveller
                                                    </button>

                                                )} */}
                                                    </div>
                                                ))}

                                                {/* New Section for Child */}
                                                {travelers.filter(traveler => traveler.travelerType === 'Child').map((child, index) => (
                                                    <div key={child.id}>

                                                        <div className="head" id="p0_wrapper" bis_skin_checked={1}>
                                                            {child.travelerType} {index + 1}
                                                            <p>Passenger details must match your passport or photo ID</p>
                                                        </div>

                                                        <div className="gender-type">
                                                            <ul>
                                                                {genderOptions.map((gender, index) => (
                                                                    <li key={index}>
                                                                        <div className="inputSet">
                                                                            <label>
                                                                                <input
                                                                                    type="radio"
                                                                                    name={`gender-${child.id}`}
                                                                                    value={gender.value}
                                                                                    checked={child.gender === gender.value}
                                                                                    onChange={(e) => handleGenderChange(child.id, e.target.value)}
                                                                                />
                                                                                <span>{gender.label}</span>
                                                                            </label>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                        <div className="row" bis_skin_checked={1}>

                                                            <div className="col-sm-2 col-xs-12">
                                                                <label>
                                                                    Title
                                                                    <span className="required">*</span>
                                                                </label>
                                                                <div className="form-righterrow">
                                                                    <select
                                                                        name={`title-${child.id}`}
                                                                        value={child.title}
                                                                        onChange={(e) => handleTitleChange(child.id, e.target.value)}
                                                                    >
                                                                        <option value="Mr">Mr</option>
                                                                        <option value="Mrs">Mrs</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-5 col-xs-12" bis_skin_checked={1}>

                                                                <label className="label_hide_mobile">
                                                                    First Name<span className="required">*</span>
                                                                </label>
                                                                <input
                                                                    className="Traveler esname alphanumeric"
                                                                    data-val="true"
                                                                    data-val-required="The FirstName field is required."
                                                                    id="flightBookingRequest_PassengerList_0__FirstName"
                                                                    maxLength={54}
                                                                    name="firstName"
                                                                    value={child.firstName}
                                                                    onChange={(e) => handleInputChanges(child.id, e)}
                                                                    placeholder="First Name"
                                                                    type="text"
                                                                    defaultValue=""
                                                                />
                                                                <span
                                                                    className="field-validation-valid"
                                                                    data-valmsg-for="flightBookingRequest.PassengerList[0].FirstName"
                                                                    data-valmsg-replace="true"
                                                                />
                                                                <span className="required_mobile">*</span>
                                                            </div>
                                                            <div className="col-sm-5 col-xs-12" bis_skin_checked={1}>
                                                                <label className="label_hide_mobile">
                                                                    Middle Name<small> (Optional)</small>
                                                                </label>
                                                                <input
                                                                    className="nonvalidateTxt esname alphanumeric"
                                                                    id="flightBookingRequest_PassengerList_0__MiddleName"
                                                                    maxLength={54}
                                                                    name="middleName"
                                                                    value={child.middleName}
                                                                    onChange={(e) => handleInputChanges(child.id, e)}
                                                                    onBlur={(e) => printEvent(e)}
                                                                    placeholder="Middle Name (Optional)"
                                                                    type="text"
                                                                    defaultValue=""
                                                                />
                                                            </div>
                                                        </div>
                                                        {/* Passenger Form */}
                                                        <PassengerForm
                                                            index={child.id}
                                                            lastName={child.lastName}
                                                            dobMonth={child.dobMonth}
                                                            dobDate={child.dobDate}
                                                            dobYear={child.dobYear}
                                                            handleInputChanges={handleInputChanges} />

                                                        <div
                                                            id="dobMsg_0"
                                                            style={{
                                                                display: "none",
                                                                color: "#f00",
                                                                paddingBottom: 10,
                                                                fontSize: 13
                                                            }}
                                                            bis_skin_checked={1}
                                                        >
                                                            <i
                                                                className="fa fa-angle-double-right"
                                                                style={{ display: "none" }}
                                                                id="dobMsgI_0"
                                                            />
                                                            <i
                                                                className="fa fa-angle-double-right"
                                                                style={{ display: "none" }}
                                                                id="paxMsgI_0"
                                                            />
                                                        </div>
                                                        <div className="imp-msg">
                                                            {/* More Info Link */}
                                                            <div className="more-info">
                                                                <a
                                                                    href="#pasngrOD_0"
                                                                    id="pasngrMI_0"
                                                                    onClick={toggleMoreInfo}
                                                                    style={{ cursor: 'pointer' }}
                                                                >
                                                                    {isMoreInfoVisible ? '(-) Hide Info' : '(+) More Info'}
                                                                </a>
                                                                <small className="ffsmall_text">
                                                                    (Optional TSA Precheck and Redress Number)
                                                                </small>
                                                            </div>

                                                            {/* The additional info section that can be toggled */}
                                                            {isMoreInfoVisible && (
                                                                <div id="pasngrOD_0" className="pasngrOD_0">
                                                                    <div className="row" id="emergency_0">
                                                                        <div className="col-sm-6 col-xs-12">
                                                                            <label>
                                                                                TSA Precheck
                                                                                <span className="tooltip-custom">
                                                                                    <i className="fa fa-info hand" />
                                                                                    <div className="promo-detail tsa_tooltip">
                                                                                        <span className="arrow" />
                                                                                        <p className="mb5px" style={{ textAlign: 'left' }}>
                                                                                            The Known Traveler Number is also referred to as
                                                                                            Pass ID, TSA PreCheck and Global Entry Number.
                                                                                            It can be found on the top-left corner on the
                                                                                            back of your Trusted Traveler membership card.
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </label>
                                                                            <input
                                                                                className="nonvalidateTxt alphanumericbothwithoutspace"
                                                                                id={`flightBookingRequest_PassengerList_${index}__TSAPrecheckNumber`}
                                                                                name="tsaPrecheckNumber"
                                                                                placeholder="Known Traveler Number (Optional)"
                                                                                type="text"
                                                                                value={child.tsaPrecheckNumber}
                                                                                onChange={(e) => handleInputChanges(child.id, e)}
                                                                            />
                                                                        </div>
                                                                        <div className="col-sm-6 col-xs-12">
                                                                            <label>
                                                                                Redress number
                                                                                <span className="tooltip-custom">
                                                                                    <i className="fa fa-info hand" />
                                                                                    <div className="promo-detail tsa_tooltip">
                                                                                        <span className="arrow" />
                                                                                        <p className="mb5px" style={{ textAlign: 'left' }}>
                                                                                            A Redress is a unique number that is assigned to
                                                                                            a passenger by the Department of Homeland
                                                                                            Security (DHS) for the purpose of promoting the
                                                                                            resolution with previous watch list alerts.
                                                                                        </p>
                                                                                    </div>
                                                                                </span>
                                                                            </label>
                                                                            <input
                                                                                className="numeric nonvalidateTxt"
                                                                                id={`flightBookingRequest_PassengerList_${index}__TSARedressNumber`}
                                                                                name="redressNumber"
                                                                                placeholder="(Optional)"
                                                                                type="number"
                                                                                value={child.redressNumber}
                                                                                onChange={(e) => handleInputChanges(child.id, e)}
                                                                            />
                                                                        </div>
                                                                        {/* <div className="col-sm-5 col-xs-12">
                                                                            <label>Emergency contact name</label>
                                                                            <input
                                                                                className="alphanumeric nonvalidateTxt"
                                                                                id={`flightBookingRequest_Contact_EmergencyContactName_${index}`}
                                                                                name="emergencyContactName"
                                                                                placeholder="Name"
                                                                                type="text"
                                                                                value={child.emergencyContactName}
                                                                                onChange={(e) => handleInputChanges(child.id, e)}
                                                                            />
                                                                        </div> */}
                                                                        {/* <div className="col-sm-7 col-xs-12"> */}
                                                                        {/* <div className="row">
                                                                                <div className="col-sm-5 col-xs-12">
                                                                                    <label>Country code</label>
                                                                                    <div className="country-code mb20">
                                                                                        <div className="intl-tel-input">
                                                                                            <div className="flag-dropdown f16" onClick={toggleDropdowns}>
                                                                                                <div className="selected-flag">
                                                                                                    <div className={`flag ${selectedCountry.countryCode}`} />
                                                                                                    <div className="down-arrow" style={styles1.downArrow} />
                                                                                                </div>
                                                                                                <ul className={`country-list ${isDropdownOpens ? '' : 'hide'}`} style={styles1.countryList}>
                                                                                                    {countryCodeArr.map((country) => (
                                                                                                        <li
                                                                                                            key={country.countryCode}
                                                                                                            className="country"
                                                                                                            data-dial-code={country.dialCode}
                                                                                                            data-country-code={country.countryCode}
                                                                                                            onClick={() => handleCountrySelect(country)}
                                                                                                        >
                                                                                                            <div className={`flag ${country.countryCode}`} />
                                                                                                            <span className="country-name">{country.name}</span>
                                                                                                            <span className="dial-code">{country.dialCode}</span>
                                                                                                        </li>
                                                                                                    ))}
                                                                                                </ul>
                                                                                            </div>
                                                                                            <input
                                                                                                className="nonvalidateTxt"
                                                                                                id={`PhoneCode_${index}`}
                                                                                                name="phoneCode"
                                                                                                placeholder="e.g"
                                                                                                readOnly
                                                                                                type="tel"
                                                                                                value={child.phoneNumber}
                                                                                                onChange={(e) => handleInputChanges(child.id, e)}

                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-7 col-xs-12">
                                                                                    <label>Emergency contact number</label>
                                                                                    <input
                                                                                        className="alphanumeric nonvalidateTxt"
                                                                                        id={`flightBookingRequest_Contact_EmergencyContactName_${index}`}
                                                                                        name="emergencyContactNumber"
                                                                                        placeholder="Name"
                                                                                        type="text"
                                                                                        value={child.emergencyContactNumber}
                                                                                        onChange={(e) => handleInputChanges(child.id, e)}
                                                                                    />
                                                                                </div>
                                                                            </div> */}

                                                                        {/* <div className="row">

                                                                            </div> */}
                                                                        {/* </div> */}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* {travelers.length > 1 && (
                                                    <button type="button" onClick={() => removeAdult(travelers.length - 1)} style={buttonStyle}>
                                                        Remove Last Traveller
                                                    </button>

                                                )} */}
                                                    </div>
                                                ))}

                                                {/* New Section for Infant */}
                                                {travelers.filter(traveler => traveler.travelerType === 'Infant').map((Infant, index) => (
                                                    <div key={Infant.id}>

                                                        <div className="head" id="p0_wrapper" bis_skin_checked={1}>
                                                            {Infant.travelerType} {index + 1}
                                                            <p>Passenger details must match your passport or photo ID</p>
                                                        </div>

                                                        <div className="gender-type">
                                                            <ul>
                                                                {genderOptions.map((gender, index) => (
                                                                    <li key={index}>
                                                                        <div className="inputSet">
                                                                            <label>
                                                                                <input
                                                                                    type="radio"
                                                                                    name={`gender-${Infant.id}`}
                                                                                    value={gender.value}
                                                                                    checked={Infant.gender === gender.value}
                                                                                    onChange={(e) => handleGenderChange(Infant.id, e.target.value)}
                                                                                />
                                                                                <span>{gender.label}</span>
                                                                            </label>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                        <div className="row" bis_skin_checked={1}>

                                                            <div className="col-sm-2 col-xs-12">
                                                                <label>
                                                                    Title
                                                                    <span className="required">*</span>
                                                                </label>
                                                                <div className="form-righterrow">
                                                                    <select
                                                                        name={`title-${Infant.id}`}
                                                                        value={Infant.title}
                                                                        onChange={(e) => handleTitleChange(Infant.id, e.target.value)}
                                                                    >
                                                                        <option value="Mr">Mr</option>
                                                                        <option value="Mrs">Mrs</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-5 col-xs-12" bis_skin_checked={1}>
                                                                <label className="label_hide_mobile">
                                                                    First Name<span className="required">*</span>
                                                                </label>
                                                                <input
                                                                    className="Traveler esname alphanumeric"
                                                                    data-val="true"
                                                                    data-val-required="The FirstName field is required."
                                                                    id="flightBookingRequest_PassengerList_0__FirstName"
                                                                    maxLength={54}
                                                                    name="firstName"
                                                                    value={Infant.firstName}
                                                                    onChange={(e) => handleInputChanges(Infant.id, e)}
                                                                    placeholder="First Name"
                                                                    type="text"
                                                                    defaultValue=""
                                                                />
                                                                <span
                                                                    className="field-validation-valid"
                                                                    data-valmsg-for="flightBookingRequest.PassengerList[0].FirstName"
                                                                    data-valmsg-replace="true"
                                                                />
                                                                <span className="required_mobile">*</span>
                                                            </div>
                                                            <div className="col-sm-5 col-xs-12" bis_skin_checked={1}>
                                                                <label className="label_hide_mobile">
                                                                    Middle Name<small> (Optional)</small>
                                                                </label>
                                                                <input
                                                                    className="nonvalidateTxt esname alphanumeric"
                                                                    id="flightBookingRequest_PassengerList_0__MiddleName"
                                                                    maxLength={54}
                                                                    name="middleName"
                                                                    value={Infant.middleName}
                                                                    onChange={(e) => handleInputChanges(Infant.id, e)}
                                                                    onBlur={(e) => printEvent(e)}
                                                                    placeholder="Middle Name (Optional)"
                                                                    type="text"
                                                                    defaultValue=""
                                                                />
                                                            </div>
                                                        </div>
                                                        {/* Passenger Form */}
                                                        <PassengerForm
                                                            index={Infant.id}
                                                            lastName={Infant.lastName}
                                                            dobMonth={Infant.dobMonth}
                                                            dobDate={Infant.dobDate}
                                                            dobYear={Infant.dobYear}
                                                            handleInputChanges={handleInputChanges} />

                                                        <div
                                                            id="dobMsg_0"
                                                            style={{
                                                                display: "none",
                                                                color: "#f00",
                                                                paddingBottom: 10,
                                                                fontSize: 13
                                                            }}
                                                            bis_skin_checked={1}
                                                        >
                                                            <i
                                                                className="fa fa-angle-double-right"
                                                                style={{ display: "none" }}
                                                                id="dobMsgI_0"
                                                            />
                                                            <i
                                                                className="fa fa-angle-double-right"
                                                                style={{ display: "none" }}
                                                                id="paxMsgI_0"
                                                            />
                                                        </div>
                                                        <div className="imp-msg">
                                                            {/* More Info Link */}
                                                            <div className="more-info">
                                                                <a
                                                                    href="#pasngrOD_0"
                                                                    id="pasngrMI_0"
                                                                    onClick={toggleMoreInfo}
                                                                    style={{ cursor: 'pointer' }}
                                                                >
                                                                    {isMoreInfoVisible ? '(-) Hide Info' : '(+) More Info'}
                                                                </a>
                                                                <small className="ffsmall_text">
                                                                    (Optional TSA Precheck and Redress Number)
                                                                </small>
                                                            </div>

                                                            {/* The additional info section that can be toggled */}
                                                            {isMoreInfoVisible && (
                                                                <div id="pasngrOD_0" className="pasngrOD_0">
                                                                    <div className="row" id="emergency_0">
                                                                        <div className="row">
                                                                            <div className="col-sm-6 col-xs-12">
                                                                                <label>
                                                                                    TSA Precheck
                                                                                    <span className="tooltip-custom">
                                                                                        <i className="fa fa-info hand" />
                                                                                        <div className="promo-detail tsa_tooltip">
                                                                                            <span className="arrow" />
                                                                                            <p className="mb5px" style={{ textAlign: 'left' }}>
                                                                                                The Known Traveler Number is also referred to as
                                                                                                Pass ID, TSA PreCheck and Global Entry Number.
                                                                                                It can be found on the top-left corner on the
                                                                                                back of your Trusted Traveler membership card.
                                                                                            </p>
                                                                                        </div>
                                                                                    </span>
                                                                                </label>
                                                                                <input
                                                                                    className="nonvalidateTxt alphanumericbothwithoutspace"
                                                                                    id={`flightBookingRequest_PassengerList_${index}__TSAPrecheckNumber`}
                                                                                    name="tsaPrecheckNumber"
                                                                                    placeholder="Known Traveler Number (Optional)"
                                                                                    type="text"
                                                                                    value={Infant.tsaPrecheckNumber}
                                                                                    onChange={(e) => handleInputChanges(Infant.id, e)}
                                                                                />
                                                                            </div>
                                                                            <div className="col-sm-6 col-xs-12">
                                                                                <label>
                                                                                    Redress number
                                                                                    <span className="tooltip-custom">
                                                                                        <i className="fa fa-info hand" />
                                                                                        <div className="promo-detail tsa_tooltip">
                                                                                            <span className="arrow" />
                                                                                            <p className="mb5px" style={{ textAlign: 'left' }}>
                                                                                                A Redress is a unique number that is assigned to
                                                                                                a passenger by the Department of Homeland
                                                                                                Security (DHS) for the purpose of promoting the
                                                                                                resolution with previous watch list alerts.
                                                                                            </p>
                                                                                        </div>
                                                                                    </span>
                                                                                </label>
                                                                                <input
                                                                                    className="numeric nonvalidateTxt"
                                                                                    id={`flightBookingRequest_PassengerList_${index}__TSARedressNumber`}
                                                                                    name="redressNumber"
                                                                                    placeholder="(Optional)"
                                                                                    type="number"
                                                                                    value={Infant.redressNumber}
                                                                                    onChange={(e) => handleInputChanges(Infant.id, e)}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        {/* <div className="col-sm-5 col-xs-12">
                                                                            <label>Emergency contact name</label>
                                                                            <input
                                                                                className="alphanumeric nonvalidateTxt"
                                                                                id={`flightBookingRequest_Contact_EmergencyContactName_${index}`}
                                                                                name="emergencyContactName"
                                                                                placeholder="Name"
                                                                                type="text"
                                                                                value={Infant.emergencyContactName}
                                                                                onChange={(e) => handleInputChanges(Infant.id, e)}
                                                                            />
                                                                        </div>
                                                                        <div className="col-sm-7 col-xs-12">
                                                                            <div className="row">
                                                                                <div className="col-sm-5 col-xs-12">
                                                                                    <label>Country code</label>
                                                                                    <div className="country-code mb20">
                                                                                        <div className="intl-tel-input">
                                                                                            <div className="flag-dropdown f16" onClick={toggleDropdowns}>
                                                                                                <div className="selected-flag">
                                                                                                    <div className={`flag ${selectedCountry.countryCode}`} />
                                                                                                    <div className="down-arrow" style={styles1.downArrow} />
                                                                                                </div>
                                                                                                <ul className={`country-list ${isDropdownOpens ? '' : 'hide'}`} style={styles1.countryList}>
                                                                                                    {countryCodeArr.map((country) => (
                                                                                                        <li
                                                                                                            key={country.countryCode}
                                                                                                            className="country"
                                                                                                            data-dial-code={country.dialCode}
                                                                                                            data-country-code={country.countryCode}
                                                                                                            onClick={() => handleCountrySelect(country)}
                                                                                                        >
                                                                                                            <div className={`flag ${country.countryCode}`} />
                                                                                                            <span className="country-name">{country.name}</span>
                                                                                                            <span className="dial-code">{country.dialCode}</span>
                                                                                                        </li>
                                                                                                    ))}
                                                                                                </ul>
                                                                                            </div>
                                                                                            <input
                                                                                                className="nonvalidateTxt"
                                                                                                id={`PhoneCode_${index}`}
                                                                                                name="phoneCode"
                                                                                                placeholder="e.g"
                                                                                                readOnly
                                                                                                type="tel"
                                                                                                value={Infant.phoneNumber}
                                                                                                onChange={(e) => handleInputChanges(Infant.id, e)}

                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-7 col-xs-12">
                                                                                    <label>Emergency contact number</label>
                                                                                    <input
                                                                                        className="alphanumeric nonvalidateTxt"
                                                                                        id={`flightBookingRequest_Contact_EmergencyContactName_${index}`}
                                                                                        name="emergencyContactNumber"
                                                                                        placeholder="Name"
                                                                                        type="text"
                                                                                        value={Infant.emergencyContactNumber}
                                                                                        onChange={(e) => handleInputChanges(Infant.id, e)}
                                                                                    />
                                                                                </div>
                                                                            </div>

                                                                           
                                                                        </div> */}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* {travelers.length > 1 && (
                                                    <button type="button" onClick={() => removeAdult(travelers.length - 1)} style={buttonStyle}>
                                                        Remove Last Traveller
                                                    </button>

                                                )} */}
                                                    </div>
                                                ))}

                                            </>
                                        )}


                                        <div className="flight-refundable-container" bis_skin_checked={1}>
                                            <div className="main-head refund-label" bis_skin_checked={1}>
                                                <img
                                                    src="/assets/images/svg/p-refund-protected.svg"
                                                    className="rp-icon"
                                                />
                                                Refundable Booking
                                            </div>
                                            <div className="row" bis_skin_checked={1}>
                                                <div className="col-md-12 col-xs-12" bis_skin_checked={1}>
                                                    <div
                                                        className="flight-refundable-content"
                                                        bis_skin_checked={1}
                                                    >
                                                        <div className="refund-subtital" bis_skin_checked={1}>
                                                            Upgrade your booking and receive a <b>100% refund</b> if
                                                            you cannot attend and can evidence one of the many
                                                            reasons in our
                                                            <a
                                                                onclick="window.open('https://www.refundable.me/extended/en/', 'info', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=800,height=600, screenX=50,screenY=50')"
                                                                href={""}
                                                                className="text-link"
                                                                style={{ color: "#1a58c4" }}
                                                            >
                                                                Terms &amp; Conditions
                                                            </a>
                                                            , which you accept when you select a Refundable Booking.
                                                        </div>
                                                        <div className="covid-txt" bis_skin_checked={1}>
                                                            COVID-19 Infection and Isolation,
                                                            <a
                                                                onclick="window.open('https://www.refundable.me/covid/', 'info', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=800,height=600, screenX=50,screenY=50')"
                                                                href={""}
                                                                className="text-link"
                                                            >
                                                                see details
                                                            </a>
                                                        </div>
                                                        <div className="refund-details" bis_skin_checked={1}>
                                                            <img
                                                                src="/assets/images/listing/shild.png"
                                                                alt="shild"
                                                                className="icon_image"
                                                            />
                                                            <ul className="fraList">
                                                                <li>
                                                                    Flight refund: <b>($91.40)</b>
                                                                </li>
                                                                <li>Home Emergency</li>
                                                                <li>Illness / Injury (including Covid-19)</li>
                                                                <li>Adverse Weather</li>
                                                                <li>Sickness, Accident and Injury</li>
                                                                <li>Private vehicle failure</li>
                                                                <li>Pre-existing Medical Condition</li>
                                                                <li>Public Transport Failure</li>
                                                                <li className="moreList" style={{ display: "none" }}>
                                                                    <ul>
                                                                        <li>Mechanical Breakdown</li>
                                                                        <li>Jury Service</li>
                                                                        <li>Death of Immediate Family</li>
                                                                        <li>Court Summons</li>
                                                                        <li>Theft of Documents</li>
                                                                        <li>Pregnancy Complication</li>
                                                                        <li>Scheduled airline failure</li>
                                                                        <li>
                                                                            Armed Forces &amp; Emergency Services Recall
                                                                        </li>
                                                                        <li>Flight disruption</li>
                                                                        <li>Relocated for Work</li>
                                                                        <li>Changes to Examination Dates</li>
                                                                    </ul>
                                                                </li>
                                                                <li className="manymore">And Many More...</li>
                                                            </ul>
                                                        </div>
                                                        <div
                                                            className="total-price refund-price"
                                                            bis_skin_checked={1}
                                                        >
                                                            <b>$13.71</b> per person
                                                        </div>
                                                        <div className="row" bis_skin_checked={1}>
                                                            <div
                                                                className="col-sm-6 col-xs-12"
                                                                bis_skin_checked={1}
                                                            >
                                                                <div
                                                                    className="wselection inputSet "
                                                                    bis_skin_checked={1}
                                                                >
                                                                    <label onclick="applyRRefundable('true','13.71')">
                                                                        <input type="radio" name="RefundProtect" />
                                                                        <span>
                                                                            <b>Yes,</b> make my booking refundable
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="col-sm-6 col-xs-12"
                                                                bis_skin_checked={1}
                                                            >
                                                                <div
                                                                    className="wselection inputSet "
                                                                    bis_skin_checked={1}
                                                                >
                                                                    <label onclick="applyRRefundable('false','13.71')">
                                                                        <input type="radio" name="RefundProtect" />
                                                                        <span>
                                                                            <b>No,</b> don't make my booking refundable
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="upgrade-txt hidden" bis_skin_checked={1}>
                                                            <p>
                                                                Upgrade your booking for a small increase of $13.71
                                                                and receive a 100% refund if you cannot attend and can
                                                                <b>provide evidence</b> for one of the many reasons in
                                                                our
                                                                <a
                                                                    onclick="window.open('https://www.refundable.me/extended/en/', 'info', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=800,height=600, screenX=50,screenY=50')"
                                                                    href={""}
                                                                    className="text-link"
                                                                    style={{ textDecoration: "underline" }}
                                                                >
                                                                    Terms &amp; Conditions
                                                                </a>
                                                                , which you accept when you select a Refundable
                                                                Booking.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <input
                                                data-val="true"
                                                data-val-number="The field RefundProtectAmount must be a number."
                                                data-val-required="The RefundProtectAmount field is required."
                                                id="flightBookingRequest_RefundProtectAmount"
                                                name="flightBookingRequest.RefundProtectAmount"
                                                type="hidden"
                                                defaultValue={0}
                                            />
                                        </div>
                                        <div
                                            className="flightdetails-payment options-container"
                                            id="seatMaindiv"
                                            bis_skin_checked={1}
                                            style={{ display: "none" }}
                                        >
                                            <div className="contents" bis_skin_checked={1}>
                                                <div className="mainheading" bis_skin_checked={1}>

                                                    <img
                                                        // src="/assets/images/svg/p-seatmap.svg"
                                                        className="icon seatmap"
                                                    />
                                                    Select Seats (Recommended)
                                                </div>
                                                <div id="_flightseatmapcontainer" bis_skin_checked={1}>
                                                    <div className="row" id="loadshw" bis_skin_checked={1}>

                                                        <div className="col-sm-12" bis_skin_checked={1}>

                                                            <div className="feed-content" bis_skin_checked={1}>

                                                                <h3>Reserve your favorite seats to:</h3>
                                                                <ul>

                                                                    <li>
                                                                        <i className="fa fa-check" aria-hidden="true" />
                                                                        Select your preferred seat(s)
                                                                    </li>
                                                                    <li>
                                                                        <i className="fa fa-check" aria-hidden="true" />
                                                                        Enjoy extra legroom
                                                                    </li>
                                                                    <li>
                                                                        <i className="fa fa-check" aria-hidden="true" />
                                                                        Stream your choice of movies, games, and access
                                                                        other information on your individual video screen
                                                                    </li>
                                                                    <li>
                                                                        <i className="fa fa-check" aria-hidden="true" />
                                                                        Keep your gadgets charged via electronic plug-in
                                                                    </li>
                                                                </ul>
                                                                <img
                                                                    className="seat-image"
                                                                    src="https://cmsrepository.com/static/ancillaries/seatmap//images/seatmap/160/desktop-seat.gif"
                                                                />
                                                                <img
                                                                    className="mobileseat-image"
                                                                    src="https://cmsrepository.com/static/ancillaries/seatmap//images/seatmap/160/seatmap-mobile.gif"
                                                                />
                                                                <div className="clearfix" bis_skin_checked={1} />
                                                                <a
                                                                    className="view_seat_button"
                                                                    style={{ display: "none" }}
                                                                    href={""}
                                                                    data-toggle="collapse"
                                                                    data-target="#seatmapShow"
                                                                >
                                                                    Hide Seat Map
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        id="loading_div"
                                                        className="loading_div text-center"
                                                        style={{ borderTop: "1px dotted #ccc" }}
                                                        bis_skin_checked={1}
                                                    >
                                                        <img
                                                            className="seat-image"
                                                            src="https://cmsrepository.com/static/ancillaries/seatmap//images/seatmap/160/loading.gif"
                                                        />
                                                        <div style={{ marginTop: "-16px" }} bis_skin_checked={1}>
                                                            Please wait...
                                                        </div>
                                                    </div>
                                                    <div id="dvPostBind" bis_skin_checked={1} />
                                                </div>
                                                <input
                                                    type="hidden"
                                                    id="seatmapkey"
                                                    name="seatmapkey"
                                                    defaultValue="1601141000blrhydai591t31aug20241435hyddelai418t31aug20241735290824010823222d612344cc4eba8271f1003bea675c"
                                                />
                                                <input
                                                    type="hidden"
                                                    id="upgratekey"
                                                    name="upgratekey"
                                                    defaultValue=""
                                                />
                                            </div>
                                        </div>
                                        <input
                                            id="flightBookingRequest_seatmapdata"
                                            name="flightBookingRequest.seatmapdata"
                                            type="hidden"
                                            defaultValue=""
                                        />
                                        <input
                                            data-val="true"
                                            data-val-required="The IsInsuranceApplied field is required."
                                            id="flightBookingRequest_IsInsuranceApplied"
                                            name="flightBookingRequest.IsInsuranceApplied"
                                            type="hidden"
                                            defaultValue="false"
                                        />
                                        <div id="insuranceMainDiv" bis_skin_checked={1}>
                                            <div className="options-container" bis_skin_checked={1}>
                                                <div className="contents" bis_skin_checked={1}>
                                                    <div id="dvPostBindInsurance" bis_skin_checked={1}>
                                                        <div className="mainheading" bis_skin_checked={1}>
                                                            <img
                                                                src="/assets/images/svg/p-travel-protection-plan.svg"
                                                                className="icon travelprotection"
                                                            />
                                                            Travel Protection Plan
                                                            <div
                                                                className="trip_protection_strip hidden-xs hidden-sm hidden-md"
                                                                style={{ display: "none" }}
                                                                bis_skin_checked={1}
                                                            >
                                                                <span className="price">
                                                                    <span id="Ins_perPaxDisplay">
                                                                        <span>
                                                                            <strong>Adult:</strong> $28.00
                                                                        </span>
                                                                        <small className="per-pax">Per pax</small>
                                                                    </span>
                                                                    <br />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="travel-protection-block"
                                                            bis_skin_checked={1}
                                                        >
                                                            <div className="row" bis_skin_checked={1}>
                                                                <div
                                                                    className="col-sm-9 col-xs-12"
                                                                    bis_skin_checked={1}
                                                                >
                                                                    <div className="row" bis_skin_checked={1}>
                                                                        <div
                                                                            className="col-md-6 col-sm-12 col-xs-12"
                                                                            bis_skin_checked={1}
                                                                        >
                                                                            <ul>
                                                                                <li>
                                                                                    Air Ticket Cost* protected if
                                                                                    <b>Trip Cancelation</b> due to a covered
                                                                                    reason, including sickness of a traveling
                                                                                    companion.
                                                                                </li>
                                                                                <li>
                                                                                    Up to $750 <b>Travel Delay</b>, including
                                                                                    delays relating to quarantine.
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        <div
                                                                            className="col-md-6 col-sm-12 col-xs-12"
                                                                            bis_skin_checked={1}
                                                                        >
                                                                            <ul>
                                                                                <li>
                                                                                    Up to $50,000 <b>Emergency Evacuation.</b>
                                                                                </li>
                                                                                <li>
                                                                                    Up to $25,000 <b>Medical Expense</b>, covers
                                                                                    COVID-19 the same as any sickness.
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <div className="txt" bis_skin_checked={1}>
                                                                        * To a Maximum of $10,000 for Domestic Air Tickets
                                                                        or $50,000 for International Air Tickets. Trip
                                                                        cancelation due to government travel advisories or
                                                                        fear of travel is not covered.
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="col-sm-3 hidden-xs"
                                                                    bis_skin_checked={1}
                                                                >
                                                                    <img
                                                                        src="/assets/images/payment/travel-protection-plan.gif"
                                                                        className="image-bnr"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* New start for mobile */}
                                                        <div id="div_insurance" bis_skin_checked={1}>
                                                            <div
                                                                className="fare-protection-plan"
                                                                style={{ display: "none" }}
                                                                bis_skin_checked={1}
                                                            >
                                                                <div className="row" bis_skin_checked={1}>
                                                                    <div className="col-xs-6" bis_skin_checked={1}>
                                                                        <strong>Adult:</strong> $28.00
                                                                        <small className="per-pax">Per Pax</small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div bis_skin_checked={1}>
                                                                <div className="insurance-price" bis_skin_checked={1}>
                                                                    $28.00<span className="per-pax">Per Person</span>
                                                                </div>
                                                            </div>
                                                            {/* New end for mobile */}
                                                            <div className="row" bis_skin_checked={1}>
                                                                <div
                                                                    className="col-sm-11 col-xs-12"
                                                                    bis_skin_checked={1}
                                                                >
                                                                    <div className="select-option" bis_skin_checked={1}>
                                                                        <ul>
                                                                            <li>
                                                                                <div
                                                                                    className="trip_protection_tooltip"
                                                                                    style={{ display: "none" }}
                                                                                    bis_skin_checked={1}
                                                                                >
                                                                                    <span
                                                                                        className="close_tooltip"
                                                                                        onclick="closeTPPTips()"
                                                                                    >
                                                                                        <svg
                                                                                            width={16}
                                                                                            height={16}
                                                                                            fill="currentColor"
                                                                                            className="bi bi-x-circle-fill"
                                                                                            viewBox="0 0 16 16"
                                                                                        >
                                                                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                                                                        </svg>
                                                                                    </span>
                                                                                    <p>
                                                                                        <i
                                                                                            className="fa fa-thumbs-up"
                                                                                            aria-hidden="true"
                                                                                        />
                                                                                        Opt for our Travel Protection Plan for
                                                                                        $28.00 and protect your trip costs of
                                                                                        $91.40 from unexpected events.
                                                                                    </p>
                                                                                </div>
                                                                                <div
                                                                                    className="inputSet"
                                                                                    bis_skin_checked={1}
                                                                                >
                                                                                    <label>
                                                                                        <input
                                                                                            type="radio"
                                                                                            onclick="applyInsurance('true','28')"
                                                                                            id="Insurance"
                                                                                            defaultValue="true"
                                                                                            name="Insurance"
                                                                                        />
                                                                                        <span>
                                                                                            <b>Yes,</b> I want to protect my trip
                                                                                        </span>
                                                                                    </label>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div
                                                                                    className="inputSet"
                                                                                    bis_skin_checked={1}
                                                                                >
                                                                                    <label>
                                                                                        <input
                                                                                            type="radio"
                                                                                            onclick="applyInsurance('false','28')"
                                                                                            id="Insurance"
                                                                                            defaultValue="false"
                                                                                            name="Insurance"
                                                                                        />
                                                                                        <span>
                                                                                            <b>No,</b> I would risk my entire trip
                                                                                            <b>
                                                                                                ($<span id="grndTotalIns">91.40</span>)
                                                                                            </b>
                                                                                        </span>
                                                                                    </label>
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="error_text"
                                                                style={{
                                                                    display: "none",
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
                                                                Travel Protection is not available to residents of New
                                                                York.
                                                            </div>
                                                            <div bis_skin_checked={1}>
                                                                The quoted price for the travel protection plan cost
                                                                includes the plan premium and a fee for non-insurance
                                                                assistance services. Please see
                                                                <a
                                                                    onclick="window.open('https://www.tripmate.com/main/consumer-disclosures/', 'info', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=800,height=600, screenX=50,screenY=50')"
                                                                    href={""}
                                                                >
                                                                    important disclosures
                                                                </a>
                                                                .
                                                            </div>
                                                            <p>

                                                                <span>

                                                                    To learn more
                                                                    <a href="/assets/travel-insurance" target="_blank">
                                                                        click here
                                                                    </a>
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        id="loadinginsurance_div"
                                                        className="loadinginsurance_div text-center"
                                                        style={{ borderTop: "1px dotted #ccc", display: "none" }}
                                                        bis_skin_checked={1}
                                                    >
                                                        <img
                                                            className="seat-image"
                                                            src="/assets/images/loading.gif"
                                                        />
                                                        <div style={{ marginTop: "-16px" }} bis_skin_checked={1}>
                                                            Please wait...
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <input
                                            data-val="true"
                                            data-val-required="The isTCPIncludesBRB field is required."
                                            id="flightBookingRequest_isTCPIncludesBRB"
                                            name="flightBookingRequest.isTCPIncludesBRB"
                                            type="hidden"
                                            defaultValue="False"
                                        />
                                        <input
                                            data-val="true"
                                            data-val-number="The field Macp must be a number."
                                            data-val-required="The Macp field is required."
                                            id="flightBookingRequest_Macp"
                                            name="flightBookingRequest.Macp"
                                            type="hidden"
                                            defaultValue={0}
                                        />
                                        <div
                                            className="toster_anceliry"
                                            id="tcp_toster"
                                            style={{ display: "none" }}
                                            bis_skin_checked={1}
                                        >
                                            {/* <img src="/assets/images/payment/toster-icon.png" alt="" /> */}
                                            <p>
                                                <a href={""} className="toster-closebtn">
                                                    X
                                                </a>
                                                Success! Travelers' Trusted Program has been added.
                                            </p>
                                        </div>
                                        <div
                                            className="options-container travelers-concierge"
                                            bis_skin_checked={1}
                                        >
                                            <div className="contents" bis_skin_checked={1}>
                                                <div className="mainheading" bis_skin_checked={1}>
                                                    <img
                                                        src="/assets/images/svg/p-tcp.svg"
                                                        className="icon tcpicon"
                                                    />
                                                    Travelers' Trusted Program <span>(TTP)</span>
                                                </div>
                                                <div
                                                    className="tcp_contentBox"
                                                    id="tcp_collapse"
                                                    style={{ display: "block" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="row" bis_skin_checked={1}>
                                                        <div className="col-md-12" bis_skin_checked={1}>
                                                            <img
                                                                src="/assets/images/payment/p-tcp.svg"
                                                                className="tcp_image hidden"
                                                                alt="user image"
                                                            />
                                                            <p className="tcp_text_black">
                                                                Step up your travel game with Travelers' Trusted
                                                                Program (TTP), for you can trust us with all of your
                                                                travel-related assistance.
                                                            </p>
                                                            <div className="tcp_plan" bis_skin_checked={1}>
                                                                <table className="table">
                                                                    <thead>
                                                                        <tr>
                                                                            <th className="text-left heading">Services</th>
                                                                            <th className="tdwidth heading"> Standard</th>
                                                                            <th className="tdwidth heading"> Premium </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="pd-top">
                                                                                <strong>Baggage Protection</strong>
                                                                                <span>
                                                                                    Get benefits of up to $1000 per bag
                                                                                </span>
                                                                            </td>
                                                                            <td className="tdwidth">
                                                                                <img
                                                                                    src="/assets/images/payment/minus.png"
                                                                                    alt="alt"
                                                                                />
                                                                            </td>
                                                                            <td className="tdwidth">
                                                                                <img src="/assets/images/payment/check.svg" />
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <strong> Dedicated Services</strong>
                                                                                <span>
                                                                                    Dedicated Personalized Service &amp;
                                                                                    Toll-Free
                                                                                </span>
                                                                            </td>
                                                                            <td>
                                                                                <img src="/assets/images/payment/minus.png" />
                                                                            </td>
                                                                            <td>
                                                                                <img src="/assets/images/payment/check.svg" />
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <strong>Cancelation</strong>
                                                                                <span>Within 24 hrs</span>
                                                                            </td>
                                                                            <td>
                                                                                <img src="/assets/images/payment/check.svg" />
                                                                            </td>
                                                                            <td>
                                                                                <img src="/assets/images/payment/check.svg" />
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <strong>Rescheduling</strong>
                                                                                <span>
                                                                                    If the airline changes its schedule, we will
                                                                                    help you find the next best alternative.
                                                                                </span>
                                                                            </td>
                                                                            <td>
                                                                                <img src="/assets/images/payment/minus.png" />
                                                                            </td>
                                                                            <td>
                                                                                <img src="/assets/images/payment/check.svg" />
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td
                                                                                valign="bottom"
                                                                                style={{ verticalAlign: "bottom" }}
                                                                            >
                                                                                <a
                                                                                    href={""}
                                                                                    data-target="#tcpTxt"
                                                                                    className="learn-more collapsed"
                                                                                    data-toggle="collapse"
                                                                                >
                                                                                    Learn more
                                                                                </a>
                                                                            </td>
                                                                            <td>
                                                                                <div
                                                                                    className="tcp_price"
                                                                                    bis_skin_checked={1}
                                                                                >
                                                                                    <strong>
                                                                                        <i className="fa fa-usd" />
                                                                                        0.00
                                                                                    </strong>
                                                                                    Per Person
                                                                                </div>
                                                                                <a
                                                                                    href={""}
                                                                                    style={{ cursor: "default" }}
                                                                                    className="selected-btn"
                                                                                >
                                                                                    Included
                                                                                </a>
                                                                            </td>
                                                                            <td className="btm-blue">
                                                                                <div
                                                                                    className="tcp_price"
                                                                                    bis_skin_checked={1}
                                                                                >
                                                                                    <strong>
                                                                                        <i className="fa fa-usd" />
                                                                                        19.89
                                                                                    </strong>
                                                                                    Per Person
                                                                                </div>
                                                                                <a
                                                                                    href={""}
                                                                                    id="buttcpselect"
                                                                                    onclick="addedtcp('19.89')"
                                                                                    className="selected-btn active"
                                                                                >
                                                                                    Add
                                                                                </a>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        id="tcpTxt"
                                                        className="learn-more-content collapse"
                                                        bis_skin_checked={1}
                                                    >
                                                        <ul className="nav nav-tabs" role="tablist">
                                                            <li role="presentation" className="active">
                                                                <a
                                                                    href="#tcp-tnc"
                                                                    aria-controls="TCP"
                                                                    role="tab"
                                                                    data-toggle="tab"
                                                                >
                                                                    Terms and Conditions
                                                                </a>
                                                            </li>
                                                            <li role="presentation">
                                                                <a
                                                                    href="#brb-tnc"
                                                                    aria-controls="BRB"
                                                                    role="tab"
                                                                    data-toggle="tab"
                                                                >
                                                                    Baggage Protection Policy
                                                                </a>
                                                            </li>
                                                        </ul>
                                                        <div className="tab-content" bis_skin_checked={1}>
                                                            <div
                                                                role="tabpanel"
                                                                className="tab-pane active"
                                                                id="tcp-tnc"
                                                                bis_skin_checked={1}
                                                            >
                                                                <div className="text-justify" bis_skin_checked={1}>
                                                                    <p className="mt5">
                                                                        Signing up for “Travelers' Trusted Program” will
                                                                        entitle you to some remarkable benefits. It will
                                                                        let you cancel and rebook your flight tickets
                                                                        without paying any change and cancelation
                                                                        penalties and our service fee. And that’s not it,
                                                                        you get a host of other benefits as well.
                                                                    </p>
                                                                    <p className="mt5">
                                                                        Travelers' Trusted Programc subscribers are
                                                                        warranted free rescheduling and name changes,
                                                                        individualized dedicated service without any
                                                                        charges, a separate Toll-Free Number along with
                                                                        complimentary seat assignment and meal preference
                                                                        on international sector.
                                                                    </p>
                                                                    <p className="mt5" style={{ marginBottom: 10 }}>
                                                                        <strong>Note:</strong> This is an additional
                                                                        service that we offer, other than Insurance plan
                                                                        and it is non-refundable.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div
                                                                role="tabpanel"
                                                                className="tab-pane"
                                                                id="brb-tnc"
                                                                bis_skin_checked={1}
                                                            >
                                                                <p>
                                                                    NOTE: This service is applicable for this flight
                                                                    booking only. If you require any changes, you must
                                                                    report to
                                                                    <a
                                                                        href="mailto:info@blueribbonbags.com"
                                                                        className="brb-link"
                                                                    >
                                                                        info@blueribbonbags.com
                                                                    </a>
                                                                    prior your scheduled departure. Please mention your
                                                                    Service Agreement Number in the subject line and it
                                                                    may require additional purchases.
                                                                </p>
                                                                <p>
                                                                    Once clicked on 'Add', I agree to the
                                                                    <a
                                                                        className="brb-link"
                                                                        target="_blank"
                                                                        href="/assets/description.pdf"
                                                                    >
                                                                        Terms and Conditions*
                                                                    </a>
                                                                </p>
                                                                <h4>A Comprehensive Overview</h4>
                                                                <p>
                                                                    Please note that this service is provided on
                                                                    jetquins travels by Blue Ribbon Bags.
                                                                </p>
                                                                <ul className="brb-list">
                                                                    <li>
                                                                        Once added to your booking, Blue Ribbon Bags (BRB)
                                                                        will track your delayed baggage and speed up its
                                                                        return within 96 hours (4 days of your flight
                                                                        arrival) of it being lost.
                                                                    </li>
                                                                    <li>
                                                                        Each purchase of BRB is per person, per round trip
                                                                        and does not include the connections during your
                                                                        flight trip.
                                                                    </li>
                                                                    <li>
                                                                        Under this protection plan categorized into three,
                                                                        Blue Ribbon Bag will pay you.
                                                                    </li>
                                                                </ul>
                                                                <p className="clearfix" />
                                                                <p className="mt10">

                                                                    <span>

                                                                        Please click here to
                                                                        <b>
                                                                            <a
                                                                                href="/assets/baggage-protection"
                                                                                target="_blank"
                                                                            >
                                                                                View the Description of Baggage
                                                                            </a>
                                                                        </b>
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    id="tcp_message"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <img
                                                        // src="/assets/images/payment/tcp-image-selected.svg"
                                                        className="tcp_selected_image hidden"
                                                        alt="user image"
                                                    />
                                                    <div className="tcp_greatChoise" bis_skin_checked={1}>
                                                        <b>Great Choice!</b> You have selected Travelers' Trusted
                                                        Program <br /> Please continue and complete your booking!
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            id="div_Optionals"
                                            className="step3"
                                            bis_skin_checked={1}
                                        ></div>

                                        <div
                                            className="price-summary"
                                            id="price_block"
                                            bis_skin_checked={1}
                                            style={{ top: isScrolled ? 0 : 134, left: "1062.6px" }}
                                        >
                                            <div className="content-box" bis_skin_checked={1}>
                                                <div
                                                    className="mainheading mobile-title"
                                                    bis_skin_checked={1}
                                                >
                                                    <img
                                                        src="/assets/images/svg/p-payment-detail.svg"
                                                        className="icon priceicon"
                                                    />
                                                    Fare Summary
                                                </div>
                                                <div id="paxfaredetails" bis_skin_checked={1}>
                                                    <div className="fare-section" bis_skin_checked={1}>
                                                        <div
                                                            className="main traveler-fees-toggle"
                                                            bis_skin_checked={1}
                                                        >
                                                            <span>
                                                                $<span id="adultPricingTotal">{(Math.round((travellerCount.adults.count * travellerCount.adults.rate) * 100) / 100).toFixed(2)}</span>
                                                            </span>
                                                            Adult ({travellerCount.adults.count} X ${travellerCount.adults.rate})
                                                        </div>
                                                        {travellerCount.child.count > 0 && <div
                                                            className="main traveler-fees-toggle"
                                                            bis_skin_checked={1}
                                                        >
                                                            <span>
                                                                $<span id="adultPricingTotal">{(Math.round((travellerCount.child.count * travellerCount.child.rate) * 100) / 100).toFixed(2)}</span>
                                                            </span>
                                                            Child ({travellerCount.child.count} X ${travellerCount.child.rate})
                                                        </div>}
                                                        {travellerCount.infant.count > 0 && <div
                                                            className="main traveler-fees-toggle"
                                                            bis_skin_checked={1}
                                                        >
                                                            <span>
                                                                $<span id="adultPricingTotal">{(Math.round((travellerCount.infant.count * travellerCount.infant.rate) * 100) / 100).toFixed(2)}</span>
                                                            </span>
                                                            Infant ({travellerCount.infant.count} X ${travellerCount.infant.rate})
                                                        </div>}
                                                    </div>
                                                    <input
                                                        type="hidden"
                                                        id="hdntotal"
                                                        name="hdntotal"
                                                        defaultValue="91.4"
                                                    />
                                                </div>
                                                <div
                                                    className="fare-section dni"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="main" bis_skin_checked={1}>
                                                        <span>
                                                            $<span id="spdnitaxamt">0</span>
                                                        </span>
                                                        DNI Taxes (Tourism Tax)
                                                    </div>
                                                </div>
                                                <div
                                                    className="fare-section bagggae-txt"
                                                    id="priceCheckedBaggage"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div
                                                        className="main"
                                                        onclick="showhidebaggageparent()"
                                                        bis_skin_checked={1}
                                                    >
                                                        <span>
                                                            $<span id="totalCheckedBgg">0</span>
                                                        </span>
                                                        Baggage Details
                                                        <i className="fa bggangle fa-angle-double-down" />
                                                        &nbsp;
                                                        <a
                                                            className="remove-btn cursor-pointer"
                                                            onclick="showbagpopup();"
                                                        >
                                                            <img src="https://www.lookbyfare.com/us/images/payment/trash-icon.svg?v=1.0" />
                                                        </a>
                                                    </div>
                                                    <div
                                                        className="traveler-fees-slide1"
                                                        id="priceOutBaggage"
                                                        style={{ display: "none" }}
                                                        bis_skin_checked={1}
                                                    />
                                                </div>
                                                <div
                                                    className="fare-section olgtxt"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="main" bis_skin_checked={1}>
                                                        <span>
                                                            $<span id="spnolgamt">0</span>
                                                        </span>
                                                        Outward Luggage
                                                    </div>
                                                </div>
                                                <div
                                                    className="fare-section ilgtxt"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="main" bis_skin_checked={1}>
                                                        <span>
                                                            $<span id="spnilgamt">0</span>
                                                        </span>
                                                        Return Luggage
                                                    </div>
                                                </div>
                                                <div
                                                    className="fare-section slgtxt"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="main" bis_skin_checked={1}>
                                                        <span>
                                                            $<span id="spnslgamt">0</span>
                                                        </span>
                                                        Luggage Fee
                                                    </div>
                                                </div>
                                                <div
                                                    className="fare-section instxt"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="main" bis_skin_checked={1}>
                                                        <span>
                                                            $<span id="spninsamt">0</span>
                                                        </span>
                                                        Travel Insurance
                                                    </div>
                                                </div>
                                                {/* Fare Section - Refund Assurance */}
                                                {isRefundSectionVisible && refundAmount && (
                                                    <div
                                                        className="fare-section rfndtxt"
                                                        bis_skin_checked="1"
                                                    >
                                                        <div
                                                            className="main"
                                                            bis_skin_checked="1"
                                                        >
                                                            <span>
                                                                <span id="spnrfntamt"> ${(Math.round(parseFloat(refundAmount) * 100) / 100).toFixed(2)}</span> {/* Refund amount */}
                                                            </span>
                                                            Flight Refund <br />
                                                            Assurance
                                                            <a
                                                                className="remove-btn cursor-pointer"
                                                                onClick={handleRemoveRefund} // Call handleRemoveRefund when clicked
                                                            >
                                                                <img
                                                                    src="https://www.lookbyfare.com/us/images/payment/trash-icon.svg?v=1.0"
                                                                    alt="Remove"
                                                                />
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}
                                                <div
                                                    className="fare-section Refundtxt"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="main" bis_skin_checked={1}>
                                                        <span>
                                                            $<span id="spnRefundamt">0</span>
                                                        </span>
                                                        Refundable Booking
                                                        <a
                                                            onclick="applyRRefundable('false', '13.71');"
                                                            href={""}
                                                            className="remove-btn cursor-pointer"
                                                        >
                                                            <img src="https://www.lookbyfare.com/us/images/payment/trash-icon.svg?v=1.0" />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div
                                                    className="fare-section webchk"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="main" bis_skin_checked={1}>
                                                        <span>
                                                            $<span id="spnwebchkamt">0</span>
                                                        </span>
                                                        Web Check In &nbsp;&nbsp;
                                                        <a
                                                            className="remove-btn cursor-pointer"
                                                            onclick="Rchkamt();"
                                                        >
                                                            <img src="https://www.lookbyfare.com/us/images/payment/trash-icon.svg?v=1.0" />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div
                                                    className="fare-section tcptxt"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="main" bis_skin_checked={1}>
                                                        <span>
                                                            $<span id="spntcpamt">0</span>
                                                        </span>
                                                        Traveler's <br /> Trusted Program &nbsp;
                                                        <a onclick="removetcp();" href={""}>
                                                            <img src="https://www.lookbyfare.com/us/images/payment/trash-icon.svg?v=1.0" />
                                                        </a>
                                                    </div>
                                                </div>
                                                {/* CHANGHES 2 */}
                                                <div
                                                    className="fare-section tcptxt1"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="main" bis_skin_checked={1}>
                                                        <span>
                                                            $<span id="spnbagamt">0.00</span>
                                                        </span>
                                                        <b className="green">Free</b> Baggage Protection
                                                    </div>
                                                </div>
                                                <div
                                                    className="fare-section flxtxt"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="main" bis_skin_checked={1}>
                                                        <span>
                                                            $<span id="spnflxtkt">0</span>
                                                        </span>
                                                        Flexible Ticket
                                                    </div>
                                                </div>
                                                <div
                                                    className="fare-section seattxt"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="main" bis_skin_checked={1}>
                                                        <span>
                                                            $<span id="spnseatamt">0</span>
                                                        </span>
                                                        Seat Assignment &nbsp;
                                                        <a
                                                            href={""}
                                                            className="view_seatmap"
                                                            style={{
                                                                color: "#4863DB",
                                                                fontSize: 12,
                                                                textDecoration: "underline"
                                                            }}
                                                        >
                                                            View
                                                        </a>
                                                    </div>
                                                </div>
                                                <div
                                                    className="fare-section spntxt"
                                                    style={{ display: "none" }}
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="main" bis_skin_checked={1}>
                                                        <span className="copoun_applytext">
                                                            - $<span id="spncpmamt" />
                                                        </span>
                                                        Coupon Discount
                                                        <a
                                                            href={""}
                                                            onclick="applyCoupon();"
                                                            className="remove"
                                                        >
                                                            Remove
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="fare-section spntxt" bis_skin_checked={1}>
                                                    {/* <div className="main" bis_skin_checked={1}>
                                                        <span className="added_green" style={{ paddingLeft: 5 }}>
                                                            $0.00
                                                        </span>
                                                        <span className="price_cut">$10</span>
                                                        <div className="event_nobooking" bis_skin_checked={1}>

                                                        </div>
                                                        <small className="eventapplycoppon">
                                                            Labor Day Saving Applied
                                                        </small>
                                                    </div> */}
                                                </div>
                                                <div
                                                    className="fare-section total-price"
                                                    bis_skin_checked={1}
                                                >
                                                    <div className="main  bold" bis_skin_checked={1}>
                                                        <input
                                                            type="hidden"
                                                            id="hdntotal"
                                                            name="hdntotal"
                                                            defaultValue="91.4"
                                                        />
                                                        <input
                                                            data-val="true"
                                                            data-val-number="The field AmountToCharge must be a number."
                                                            data-val-required="The AmountToCharge field is required."
                                                            id="flightBookingRequest_Payment_AmountToCharge"
                                                            name="flightBookingRequest.Payment.AmountToCharge"
                                                            type="hidden"
                                                            defaultValue="91.40"
                                                        />
                                                        <input
                                                            type="hidden"
                                                            id="affGrandtotal"
                                                            name="affGrandtotal"
                                                        />
                                                        <span>
                                                            $<span id="fltTotal">{selectedFlight.price.total}</span>
                                                        </span>
                                                        Total Price (USD)
                                                        <div
                                                            className="tooltip-custom fareladder-tooltip"
                                                            bis_skin_checked={1}
                                                        >
                                                            <i className="fareladder-icon fa fa-info hand" />
                                                            <div
                                                                id="fareladorPromod"
                                                                className="promo-detail"
                                                                style={{ display: "none" }}
                                                                bis_skin_checked={1}
                                                            >
                                                                <span className="arrow" />
                                                                <span className="fareladder-close">
                                                                    <svg
                                                                        width={18}
                                                                        height={18}
                                                                        fill="currentColor"
                                                                        className="bi bi-x-circle-fill"
                                                                        viewBox="0 0 16 16"
                                                                    >
                                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                                                    </svg>
                                                                </span>
                                                                <p
                                                                    className="mb5px hidden-xs hidden-sm"
                                                                    style={{ textAlign: "left" }}
                                                                >
                                                                    Total price includes base price, our <br />
                                                                    <a
                                                                        onclick="window.open('/us/taxes-fees#serviceFeesc', 'info', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=800,height=600, screenX=50,screenY=50')"
                                                                        href={""}
                                                                    >
                                                                        service fees
                                                                    </a>
                                                                    and
                                                                    <a
                                                                        onclick="window.open('/us/taxes-fees', 'info', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=800,height=600, screenX=50,screenY=50')"
                                                                        href={""}
                                                                    >
                                                                        taxes and fees
                                                                    </a>
                                                                    .
                                                                </p>
                                                                <p
                                                                    className="mb5px visible-xs visible-sm"
                                                                    style={{ textAlign: "left" }}
                                                                >
                                                                    Total price includes base price, our <br />
                                                                    <a
                                                                        onclick="Filter.getmobile_popup('tnf','serviceFeesc')"
                                                                        className="text_link"
                                                                        data-toggle="modal"
                                                                        data-target="#mobile-popup"
                                                                        href={""}
                                                                    >
                                                                        service fees
                                                                    </a>
                                                                    and
                                                                    <a
                                                                        onclick="    Filter.getmobile_popup('tnf')"
                                                                        className="text_link"
                                                                        data-toggle="modal"
                                                                        data-target="#mobile-popup"
                                                                        href={""}
                                                                    >
                                                                        taxes and fees
                                                                    </a>
                                                                    .
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content-box" bis_skin_checked={1}>
                                                <input
                                                    id="flightBookingRequest_couponsCode"
                                                    name="flightBookingRequest.couponsCode"
                                                    type="hidden"
                                                    defaultValue=""
                                                />
                                                <input
                                                    id="flightBookingRequest_coupons"
                                                    name="flightBookingRequest.coupons"
                                                    type="hidden"
                                                    defaultValue=""
                                                />
                                                <input
                                                    data-val="true"
                                                    data-val-number="The field couponsAmt must be a number."
                                                    data-val-required="The couponsAmt field is required."
                                                    id="flightBookingRequest_couponsAmt"
                                                    name="flightBookingRequest.couponsAmt"
                                                    type="hidden"
                                                    defaultValue={0}
                                                />
                                                <p className="note">
                                                    <b>Note:</b>
                                                    All fares are quoted in USD. Additional baggage fees may
                                                    apply as per the airline policies. Your credit/debit card
                                                    may be billed in multiple charges totaling the final total
                                                    price.
                                                    <span id="tpnote" style={{ display: "none" }}>
                                                        The travel protection plan cost includes the plan premium
                                                        and a fee for non-insurance assistance services. Please
                                                        see
                                                        <a
                                                            onclick="window.open('https://www.tripmate.com/main/consumer-disclosures/', 'info', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=800,height=600, screenX=50,screenY=50')"
                                                            href={""}
                                                            style={{
                                                                color: "#4863db",
                                                                textDecoration: "underline",
                                                                display: "inline-block"
                                                            }}
                                                        >
                                                            important disclosures
                                                        </a>
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        <div id="div_Payment" className="step4" bis_skin_checked={1}>
                                            {/* Billing Information and Payment Details */}
                                            <BillingInfo
                                                setBillingInfo={setBillingInfo}
                                                billingInfo={billingInfo}
                                                setCardDetails={setCardDetails}
                                                cardDetails={cardDetails}
                                            />

                                            <div className="form-box" bis_skin_checked={1}>
                                                <div style={{ marginBottom: 5 }} bis_skin_checked={1}>
                                                    Please be careful - Passenger details must match your
                                                    passport or photo ID
                                                </div>
                                                {travelers.map((traveler, index) => (
                                                    <div className="head" key={traveler.id}>
                                                        <p id="pxdtails">
                                                            <span>
                                                                {traveler.travelerType} {index + 1} -{' '}
                                                                <span id={`p0_confirm_name_${traveler.id}`}>
                                                                    {traveler.firstName && traveler.lastName
                                                                        ? `${traveler.firstName} ${traveler.lastName}`
                                                                        : 'Missing name'}
                                                                </span>

                                                                <a
                                                                    href="javascript:void(0);"
                                                                    onClick={() => scrollToMissingField(traveler.id)}

                                                                >
                                                                    (make changes)
                                                                </a>
                                                            </span>
                                                            <br />
                                                        </p>

                                                    </div>
                                                ))}
                                                <div className="imp-msg" bis_skin_checked={1}>
                                                    <div className="tnc-txt" bis_skin_checked={1}>

                                                        {!mobileVisible && (
                                                            <p className="hidden-xs hidden-sm">
                                                                By clicking, <span className="bkdyntxt">Book Now</span>
                                                                I agree that I have read and accepted jetquins travels
                                                                <a href="/assets/terms-conditions" target="_blank">
                                                                    Terms &amp; Conditions
                                                                </a>
                                                                and
                                                                <a href="/assets/privacy-policy" target="_blank">
                                                                    Privacy Policy
                                                                </a>
                                                            </p>
                                                        )}


                                                        {mobileVisible && (
                                                            <p className="visible-xs visible-sm">
                                                                By clicking, <span className="bkdyntxt">Book Now</span>
                                                                I agree that I have read and accepted jetquins travels
                                                                <a
                                                                    onclick="Filter.getmobile_popup('tnc')"
                                                                    className="text_link"
                                                                    data-toggle="modal"
                                                                    data-target="#mobile-popup"
                                                                    href={""}
                                                                >
                                                                    Terms &amp; Conditions
                                                                </a>
                                                                and
                                                                <a
                                                                    onclick="Filter.getmobile_popup('privacypolicy')"
                                                                    className="text_link"
                                                                    data-toggle="modal"
                                                                    data-target="#mobile-popup"
                                                                    href={""}
                                                                >
                                                                    Privacy Policy
                                                                </a>
                                                            </p>
                                                        )}
                                                        <div className="clearfix" bis_skin_checked={1} />
                                                    </div>
                                                </div>
                                                <div className="step-continue" bis_skin_checked={1}>
                                                    <button
                                                        className="main-btn pay-cc"
                                                        id="btnBookNow"
                                                        name="btnBookNow"
                                                    >
                                                        <i className="fa fa-lock" aria-hidden="true" /> Book Now
                                                    </button>

                                                    {!isAffirmPayment && (
                                                        <button
                                                            className="main-btn pay-affirm"
                                                            type="button"
                                                            onClick={handleAffirmPayment}
                                                        >
                                                            Book with <span className="affirm-btn" />
                                                        </button>
                                                    )}
                                                    <p>
                                                        <br />
                                                        <small>
                                                            Your payment details are secured via 256 Bit encryption
                                                            by GoDaddy
                                                        </small>
                                                    </p>
                                                </div>
                                                <div className="imp-msg" bis_skin_checked={1}>
                                                    <div className="tnc-txt" bis_skin_checked={1}>
                                                        <p>
                                                            <b>NOTE: </b>
                                                            <span className="text-blue">
                                                                Please check if the dates and timings of flight
                                                                departure are correct.
                                                            </span>
                                                            Also, make sure that the name of the traveler is
                                                            accurate as tickets are non-refundable and any change in
                                                            the name of the traveler is not permitted. Date and
                                                            routing changes will be subject to airline penalties and
                                                            our service fees. Fares are not guaranteed until
                                                            ticketed. All our service fees and taxes are included in
                                                            the total ticket cost. Itineraries cannot be changed
                                                            within 7 days before departure, and no credit will be
                                                            issued. You can cancel your reservation within 24 hrs of
                                                            purchase for a full refund by calling our 24/7 customer
                                                            support provided the purchase was made before 7 days of
                                                            departure. However, a nominal cancelation fee will be
                                                            applicable.
                                                        </p>
                                                        <div className="clearfix" bis_skin_checked={1} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="st_footer" bis_skin_checked={1} />
                                        </div>
                                    </div>}
                                </div>
                                <div
                                    id="div_gotopayment"
                                    style={{ display: "none" }}
                                    bis_skin_checked={1}
                                >
                                    <div
                                        style={{
                                            padding: 7,
                                            width: 119,
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
                                    </div>
                                    <div
                                        className="midum-overlay"
                                        id="fadebackground"
                                        bis_skin_checked={1}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>

                    <style
                        dangerouslySetInnerHTML={{
                            __html:
                                "\n                                                .navbar-nav, .traveler-fees-slide {\n                                                    display: none;\n        }\n\n                                                .footer-component {\n                                                    display: none;\n        }\n\n                                                .copyright-block {\n                                                    border - top: 1px solid #ccc;\n                                                padding-top: 30px;\n        }\n                                            "
                        }}
                    />
                    <div
                        id="div_sessioTimeOut"
                        style={{ display: "none" }}
                        bis_skin_checked={1}
                    >
                        <div className="list-count" bis_skin_checked={1}>
                            <div className="list-count-banner sesson-exp" bis_skin_checked={1}>
                                <div className="top-head" bis_skin_checked={1}>
                                    <div className="lto2" bis_skin_checked={1}>
                                        Your Session will expire in
                                    </div>
                                    <div className="clock_timer" bis_skin_checked={1}>
                                        <img
                                            // src="/assets/images/listing/timer.png"
                                            style={{ width: 24, marginRight: 7 }}
                                        />
                                        <span id="timer">15m 00s </span>
                                    </div>
                                </div>
                                <div
                                    className="btm-txt txt2"
                                    style={{ marginBottom: 15 }}
                                    bis_skin_checked={1}
                                >
                                    Click "Continue" button to working on this page
                                </div>
                                <div
                                    className="call-btn"
                                    onclick="hideSessionAlert()"
                                    bis_skin_checked={1}
                                >
                                    <a href={""} className="w200">
                                        Continue
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                    Flight Prices may change frequently owing to demand and
                                    availability. Start a <b>New Search</b> to view the latest deals
                                </p>
                            </div>
                            <br />
                            <div className="call-btn" bis_skin_checked={1}>
                                <a href="/us" id="sess_startagain" className="w200">
                                    Start Again
                                </a>
                            </div>
                        </div>
                        <div className="midum-overlay" id="fadebackground" bis_skin_checked={1} />
                    </div>
                    <div
                        id="confrmWait"
                        className="list-count"
                        style={{ display: "none" }}
                        bis_skin_checked={1}
                    >
                        <div
                            className="list-count-banner"
                            style={{ minHeight: "auto" }}
                            bis_skin_checked={1}
                        >
                            <div align="center" bis_skin_checked={1}>
                                <img src="/assets/images/loading.gif" alt="" />
                            </div>
                            <div
                                className="top-head"
                                style={{ minHeight: "auto" }}
                                bis_skin_checked={1}
                            >
                                <div className="lto2" bis_skin_checked={1}>
                                    Please Wait
                                    <br />
                                    while your booking request is being processed...
                                </div>
                            </div>
                            <div className="btm-txt txt2" bis_skin_checked={1}>
                                Please do not close this page or press your browser's back button.
                            </div>
                        </div>
                        <div className="midum-overlay" bis_skin_checked={1} />
                    </div>
                    <div
                        className="list-count in"
                        id="tfPriceChange"
                        style={{ display: "none" }}
                        bis_skin_checked={1}
                    >
                        <div
                            className="list-count-banner"
                            style={{ minHeight: "auto", textAlign: "center" }}
                            bis_skin_checked={1}
                        >
                            <div
                                className="top-head"
                                style={{ minHeight: "auto" }}
                                bis_skin_checked={1}
                            >
                                <div
                                    className="call-btn"
                                    align="center"
                                    style={{ marginBottom: 20 }}
                                    bis_skin_checked={1}
                                >
                                    {/* <img src="/assets/images/payment/price-up.png" /> */}
                                </div>
                                <h4 style={{ color: "#4863db" }}>
                                    Airline increased the fare by <span id="incresedamount">$91.4</span>
                                </h4>
                            </div>
                            <div className="btm-txt mb20" bis_skin_checked={1}>
                                Your updated total fare is <b id="incresedfare">$91.4</b>. Previous
                                total fare was <b id="oldfare">$0</b>
                            </div>
                            <div className="btm-txt mb20" bis_skin_checked={1}>
                                Airlines keep updating their fares over their system which causes fare
                                changes from time to time.
                            </div>
                            <div className="call-btn" bis_skin_checked={1}>
                                <a
                                    href={""}
                                    onclick="return continueBooking();"
                                    id="contBooking"
                                    className="w200"
                                    style={{ fontSize: 14, fontWeight: 400 }}
                                >

                                    Continue Booking
                                </a>
                                <a
                                    href={""}
                                    onclick="gotolisting();"
                                    id="pkAnotherFlight"
                                    className="w200"
                                    style={{
                                        background: "#333",
                                        marginLeft: 5,
                                        fontSize: 14,
                                        fontWeight: 400
                                    }}
                                >
                                    Select Another flight
                                </a>
                            </div>
                        </div>
                        <div className="midum-overlay" id="fadebackground" bis_skin_checked={1} />
                    </div>
                    <div
                        id="mobile-popup"
                        className="modal fade"
                        role="dialog"
                        bis_skin_checked={1}
                    >
                        <div className="modal-content" bis_skin_checked={1}>
                            <div className="close_window" bis_skin_checked={1}>
                                <button type="button" className="back_btn" data-dismiss="modal">
                                    <span className="fa fa-angle-left" />
                                </button>
                                <span id="popup_header">Terms &amp; Conditions</span>
                                <button type="button" className="close_btn" data-dismiss="modal">
                                    X
                                </button>
                            </div>
                            <div id="fltpopup" bis_skin_checked={1}></div>
                        </div>
                    </div>
                    <div
                        id="modaliframe"
                        className="modal fade"
                        tabIndex={-1}
                        role="dialog"
                        bis_skin_checked={1}
                    >
                        <div className="modal-dialog" bis_skin_checked={1}>
                            <div className="modal-content" bis_skin_checked={1}>
                                <div
                                    className="modal-body"
                                    id="iframe-container"
                                    bis_skin_checked={1}
                                >
                                    <iframe style={{ width: "100%", height: 450, border: 0 }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="common_popup delete-bags-pop"
                        id="deltebagpopup"
                        style={{ display: "none" }}
                        bis_skin_checked={1}
                    >
                        <div className="center-block" bis_skin_checked={1}>
                            <div className="outer" bis_skin_checked={1}>
                                <div className="newbaggage" bis_skin_checked={1}>
                                    <div className="icon-box" bis_skin_checked={1}>
                                        {/* <img src="/assets/images/payment/addbag/delete-icon.svg" /> */}
                                    </div>
                                    <div className="bags-box" bis_skin_checked={1}>
                                        <h6>Want to delete the bags?</h6>
                                        <p>Baggage charges are up to 50% higher at the airport !!</p>
                                        <div className="btn-box" bis_skin_checked={1}>
                                            <a onclick="removelallbagsok();" href={""}>
                                                Remove Bags
                                            </a>
                                            <a
                                                onclick="closebagpopup();"
                                                className="active"
                                                href={""}
                                            >
                                                I'll keep the bags
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="common_popup  successfully-added-pop"
                        id="successfullyaddedpop"
                        style={{ display: "none" }}
                        bis_skin_checked={1}
                    >
                        <div className="center-block" bis_skin_checked={1}>
                            <div className="outer" bis_skin_checked={1}>
                                <div className="newbaggage" bis_skin_checked={1}>
                                    <div className="succesfull-box" bis_skin_checked={1}>
                                        <svg
                                            className="checkmark"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 52 52"
                                        >
                                            <circle
                                                className="checkmark__circle"
                                                cx={26}
                                                cy={26}
                                                r={25}
                                                fill="none"
                                            />
                                            <path
                                                className="checkmark__check"
                                                fill="none"
                                                d="M14.1 27.2l7.1 7.2 16.7-16.8"
                                            />
                                        </svg>
                                        <h6>Request has been successfully processed.</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="common_popup"
                        id="callpoppay"
                        style={{ display: "none" }}
                        bis_skin_checked={1}
                    >
                        <div className="center-block" bis_skin_checked={1}>
                            <div className="outer" bis_skin_checked={1}>
                                <div className="inner callpopup_inner" bis_skin_checked={1}>
                                    <a
                                        href={""}
                                        onclick="closeallpopup();"
                                        className="close_popup"
                                    >
                                        <svg
                                            width={16}
                                            height={16}
                                            fill="currentColor"
                                            className="bi bi-x-circle-fill"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                                        </svg>
                                    </a>
                                    <div className="toplogo" bis_skin_checked={1}>
                                        <img src="/assets/jetquinsLogos.png" alt="logo" />
                                    </div>
                                    <div className="images" bis_skin_checked={1}>
                                        <img
                                            // src="/assets/images/payment/popup_image.png"
                                            alt="image"
                                            className="main_image"
                                        />
                                    </div>
                                    <h3>Can't Decide On Your Flight Booking?</h3>
                                    <p className="phoneonly">Phone Only Deals</p>
                                    <span className="extradiscount">Get Extra 15% Off</span>
                                    <a href="tel:+1-714-782-7027" className="call_action">
                                        <svg
                                            width={20}
                                            height={20}
                                            fill="currentColor"
                                            className="bi bi-telephone-fill"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                                            />
                                        </svg>
                                        Call Now: +1-714-782-7027
                                    </a>
                                    <p className="expert">To Speak With A Travel Expert 24/7 Support</p>
                                    <div className="popuprating" bis_skin_checked={1}>
                                        <div className="left" bis_skin_checked={1}>
                                            <div className="poprating" bis_skin_checked={1}>
                                                <img
                                                    src="/assets/images/trustpilot/trust-pilot.png"
                                                    className="trustlogo"
                                                />
                                                <div className="excellent" bis_skin_checked={1}>
                                                    <b>Excellent</b>
                                                    <img
                                                        src="/assets/images/trustpilot/stars-4.5.svg"
                                                        className="starimg"
                                                    />
                                                </div>
                                                <div className="review-txt" bis_skin_checked={1}>
                                                    (4.7) Based on 2341 Reviews
                                                </div>
                                            </div>
                                        </div>
                                        <div className="right" bis_skin_checked={1}>
                                            <div className="poprating" bis_skin_checked={1}>
                                                <img
                                                    src="/assets/images/sitejabber/sitejabber-logo.svg"
                                                    className="sitejaberlogo"
                                                />
                                                <div className="excellent" bis_skin_checked={1}>
                                                    <b>Excellent</b>
                                                    <span className="sitejebber">
                                                        <span className="fill" style={{ width: "90%" }} />
                                                    </span>
                                                </div>
                                                <div className="review-txt" bis_skin_checked={1}>
                                                    (4.7) Based on 9,820 Reviews
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div >}</>
}

export default PurchasePage;