'use client';

import { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city"
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { fireStore, useAuth } from "../../../_components/firebase/config";

const MyInformation = () => {

    const [isEditing, setIsEditing] = useState(false);
    const [contactIsEditing, setContactIsEditing] = useState(false);
    const [billingIsEditing, setBillingIsEditing] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [cities, setCities] = useState([]);
    const [activeTab, setActiveTab] = useState("tab1");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [travellers, setTravellers] = useState([]);
    const [selectedTraveller, setSelectedTraveller] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);


    const [personalInfoData, setPersonalInfoData] = useState({
        firstname: "",
        middlename: "",
        lastname: "",
        dobirth: "",
        genderid: "",
        airport_name: "",
        tsa_name: "",
    });

    const [contactInfoData, setContactInfoData] = useState({
        addressline1: "",
        addressline2: "",
        city: "",
        country: "",
        zip: "",
        state: "",
        phone: "",
        mobile: "",
    });

    const [billingInfoData, setBillingInfoData] = useState({
        billaddressline1: "",
        billaddressline2: "",
        billcity: "",
        country: "",
        billzip: "",
        state: "",
        billphone: "",
        mobile: "",
    });

    const [travellerInfoData, setTravellerInfoData] = useState({
        fname: "",
        mname: "",
        lname: "",
        genderpopup: "",
        dobid: "",
        country: "",
    });

    useEffect(() => {
        if (currentUser) {
            fetchPersonalInfo();
            fetchContactInfo();
            fetchBillingInfo();
            fetchTravellerInfo();
        }

    }, [currentUser]);


    const handleOpenModal = (traveller) => {
        setSelectedTraveller(traveller);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const handleCountryChange = (e) => {
        const countryCode = e.target.value;
        setContactInfoData((prevDetails) => ({
            ...prevDetails,
            country: countryCode, // Update the cardNo property
        }))
        setSelectedCountry(countryCode);
        setStates(State.getStatesOfCountry(countryCode));

    };

    const handleStateChange = (e) => {
        const stateCode = e.target.value;
        setContactInfoData((prevDetails) => ({
            ...prevDetails,
            state: stateCode, // Update the year property
        }));
        setSelectedState(stateCode);
        setCities(City.getCitiesOfState(selectedCountry, stateCode));
    };

    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfoData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleConatctInfoChange = (e) => {
        const { name, value } = e.target;
        setContactInfoData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleBillingInfoChange = (e) => {
        const { name, value } = e.target;
        setBillingInfoData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleTravellerInfoChange = (e) => {
        const { name, value } = e.target;
        setTravellerInfoData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePersonalSave = async () => {
        try {
            // Reference to the user's document in Firestore
            const userRef = doc(fireStore, "users", currentUser.uid);

            // Save `personalInfoData` inside the user's document
            await setDoc(
                userRef,
                { personalInfo: { ...personalInfoData } },
                { merge: true } // Merge ensures other fields are not overwritten
            );

            console.log("Saved Personal Information Data:", personalInfoData);
            setIsEditing(false); // Exit edit mode after saving
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    const handleContactSave = async () => {
        try {
            // Reference to the user's document in Firestore
            const userRef = doc(fireStore, "users", currentUser.uid);

            // Save `personalInfoData` inside the user's document
            await setDoc(
                userRef,
                { contactInfo: { ...contactInfoData } },
                { merge: true } // Merge ensures other fields are not overwritten
            );

            console.log("Saved Contact Information Data:", contactInfoData);
            setContactIsEditing(false);
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    const handleBillingSave = async () => {
        try {
            // Reference to the user's document in Firestore
            const userRef = doc(fireStore, "users", currentUser.uid);

            // Save `personalInfoData` inside the user's document
            await setDoc(
                userRef,
                { billingInfo: { ...billingInfoData } },
                { merge: true } // Merge ensures other fields are not overwritten
            );

            console.log("Saved Billings Information Data:", billingInfoData);
            setBillingIsEditing(false);
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    const handleTravellerSave = async () => {
        try {
            const userRef = doc(fireStore, "users", currentUser.uid);

            // Add the new traveler to the array using `arrayUnion`
            await updateDoc(userRef, {
                travellerInfo: arrayUnion({ ...travellerInfoData, id: Date.now() }), // Add unique ID
            });

            console.log("Saved Billings Information Data:", travellerInfoData);
            setTravellerInfoData({
                fname: "",
                mname: "",
                lname: "",
                genderpopup: "",
                dobid: "",
                country: "",
            }); // Reset form
            setIsModalOpen(false);
            fetchTravellerInfo();
        } catch (error) {
            console.error("Error saving data:", error);
        }

    };

    // Added all 

    const fetchPersonalInfo = async () => {
        try {
            // Reference to the user's document in Firestore
            const userRef = doc(fireStore, "users", currentUser.uid);

            // Fetch the document data
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                // Extract the personalInfo field from the document
                const data = userDoc.data();
                const personalInfo = data.personalInfo;
                console.log(data, "User Data")
                if (personalInfo) {
                    console.log("Fetched Personal Information:", personalInfo);

                    // Update your state or UI as needed
                    setPersonalInfoData(personalInfo); // Assuming you have a state for this
                } else {
                    console.log("No personal information found for the user.");
                }
            } else {
                console.log("User document does not exist.");
            }
        } catch (error) {
            console.error("Error fetching personal information:", error);
        }
    };

    const fetchContactInfo = async () => {
        try {
            // Reference to the user's document in Firestore
            const userRef = doc(fireStore, "users", currentUser.uid);

            // Fetch the document data
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                // Extract the personalInfo field from the document
                const data = userDoc.data();
                const contactInfo = data.contactInfo;

                if (contactInfo) {
                    console.log("Fetched Personal Information:", contactInfo);

                    // Update your state or UI as needed
                    setContactInfoData(contactInfo); // Assuming you have a state for this
                } else {
                    console.log("No personal information found for the user.");
                }
            } else {
                console.log("User document does not exist.");
            }
        } catch (error) {
            console.error("Error fetching personal information:", error);
        }
    };

    const fetchBillingInfo = async () => {
        try {
            // Reference to the user's document in Firestore
            const userRef = doc(fireStore, "users", currentUser.uid);

            // Fetch the document data
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                // Extract the personalInfo field from the document
                const data = userDoc.data();
                const billingInfo = data.billingInfo;

                if (billingInfo) {
                    console.log("Fetched Personal Information:", billingInfo);

                    // Update your state or UI as needed
                    setBillingInfoData(billingInfo); // Assuming you have a state for this
                } else {
                    console.log("No personal information found for the user.");
                }
            } else {
                console.log("User document does not exist.");
            }
        } catch (error) {
            console.error("Error fetching personal information:", error);
        }
    };

    const fetchTravellerInfo = async () => {
        try {
            // Reference to the user's document in Firestore
            const userRef = doc(fireStore, "users", currentUser.uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                // Extract the personalInfo field from the document
                const data = userDoc.data();
                const travellerInfo = data.travellerInfo;

                if (travellerInfo) {
                    console.log("Fetched Personal Information:", travellerInfo);

                    // Update your state or UI as needed
                    setTravellers(Array.isArray(travellerInfo) ? travellerInfo : []);
                } else {
                    console.log("No personal information found for the user.");
                    setTravellers([]);
                }
            } else {
                console.log("User document does not exist.");
            }
        } catch (error) {
            console.error("Error fetching personal information:", error);
            setTravellers([]);
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("current-user"));
        if (user) {
            setCurrentUser(user);
        }
    }, [])

    // console.log(currentUser, "Aise hi check kr rhe h");

    // Delete a traveler from Firestore
    const handleTravellerDelete = async (traveller) => {
        try {
            const userRef = doc(fireStore, "users", currentUser.uid);

            // Remove the specific traveler using `arrayRemove`
            await updateDoc(userRef, {
                travellerInfo: arrayRemove(traveller),
            });

            console.log("Traveler deleted:", traveller);
            fetchTravellerInfo(); // Refresh the local list
        } catch (error) {
            console.error("Error deleting traveler:", error);
        }
    };

    const handlePersonalCancel = () => {
        setIsEditing(false);
        fetchPersonalInfo();
    };

    const handleContactCancel = () => {
        setContactIsEditing(false);
        fetchContactInfo();
    };

    const handleBillingCancel = () => {
        setBillingIsEditing(false);
        fetchBillingInfo();
    };

    const handleTravellerCancel = () => {
        setIsModalOpen(false);
        fetchTravellerInfo();
    };

    // Styles
    const modalStyles = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
    };

    return (

        <>
            <div className="rightCntr" id="myinformation" style={{ display: "block" }}>
                <div id="myinfoTab">
                    {/*  / tabBox Start here \ */}
                    <div className="tabBox">
                        <ul id="tabs">
                            <li>
                                <a
                                    href="javascript:void(0);"
                                    id="tab1"
                                    className={`myinfo ${activeTab === "tab1" ? "active" : ""}`}
                                    onClick={() => handleTabClick("tab1")}
                                >
                                    My Details
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" id="tab2" className={`myinfo ${activeTab === "tab2" ? "active" : ""}`}
                                    onClick={() => handleTabClick("tab2")}>
                                    My Billing Details
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" id="tab4" className={`myinfo ${activeTab === "tab4" ? "active" : ""}`}
                                    onClick={() => handleTabClick("tab4")}>
                                    My Travelers
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/*  \ tabBox End here / */}
                    {/* My detail tab Start here */}
                    {activeTab === "tab1" && (
                        <div className="tabContent" id="tab1C" style={{}}>
                            {/*  / Personal Information Start here \ */}
                            <div className="formBox">
                                <div className="personal-info">
                                    <div className="row">
                                        <div className="col-sm-12 title">
                                            <h2>Personal Information</h2>
                                            {!isEditing && (
                                                <a
                                                    className="edit personal_infoform"
                                                    onClick={() => setIsEditing(true)}
                                                    href="#"
                                                >
                                                    Edit
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {isEditing ? (
                                        <div id="personal_infoform">
                                            <form name="personal_Req" id="personal_Req">
                                                <div className="row form-group">
                                                    <div className="col-sm-6">
                                                        <label className="label">
                                                            First Name<sup className="star">*</sup>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="user_firstname"
                                                            name="firstname"
                                                            className="textbox"
                                                            value={personalInfoData.firstname}
                                                            onChange={handlePersonalInfoChange}
                                                        />
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <label className="label">Middle Name</label>
                                                        <input
                                                            type="text"
                                                            id="middlename"
                                                            name="middlename"
                                                            className="textbox"
                                                            value={personalInfoData.middlename}
                                                            onChange={handlePersonalInfoChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row form-group">
                                                    <div className="col-sm-6">
                                                        <label className="label">
                                                            Last Name<sup className="star">*</sup>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="user_lastname"
                                                            name="lastname"
                                                            className="textbox"
                                                            value={personalInfoData.lastname}
                                                            onChange={handlePersonalInfoChange}
                                                        />
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <label className="label">
                                                            Date Of Birth<sup className="star">*</sup>
                                                        </label>
                                                        <input
                                                            type="date"
                                                            id="user_dobirth"
                                                            name="dobirth"
                                                            className="textbox"
                                                            value={personalInfoData.dobirth}
                                                            onChange={handlePersonalInfoChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row form-group">
                                                    <div className="col-sm-6">
                                                        <label className="label">
                                                            Gender<sup className="star">*</sup>
                                                        </label>
                                                        <select
                                                            id="user_genderid"
                                                            name="genderid"
                                                            value={personalInfoData.genderid}
                                                            onChange={handlePersonalInfoChange}
                                                        >
                                                            <option value="">Select Gender</option>
                                                            <option value="1">Male</option>
                                                            <option value="2">Female</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <label className="label">Home Airport</label>
                                                        <input
                                                            type="text"
                                                            id="airport_name"
                                                            name="airport_name"
                                                            className="textbox"
                                                            value={personalInfoData.airport_name}
                                                            onChange={handlePersonalInfoChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row form-group">
                                                    <div className="col-sm-6">
                                                        <label className="label">TSA Redress / Known Traveler</label>
                                                        <input
                                                            type="text"
                                                            id="tsa_name"
                                                            name="tsa_name"
                                                            className="textbox"
                                                            value={personalInfoData.tsa_name}
                                                            onChange={handlePersonalInfoChange}
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                    className="button pull-right mt_mob"
                                                    type="button"
                                                    onClick={handlePersonalSave}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    className="button pull-right grayBtn mt_mob"
                                                    onClick={handlePersonalCancel}
                                                    type="button"
                                                >
                                                    Cancel
                                                </button>
                                            </form>

                                        </div>
                                    ) : (
                                        <div id="personal_infoDetail">
                                            <p>
                                                <strong id="user_name">{`${personalInfoData.firstname} ${personalInfoData.lastname}`}</strong>
                                            </p>
                                            <ul className="content_detail">
                                                <li>
                                                    <span className="label">Gender :</span>{" "}
                                                    <span id="gen">{personalInfoData.genderid || "-"}</span>
                                                </li>
                                                <li>
                                                    <span className="label">Date Of Birth :</span>{" "}
                                                    <span id="dob">{personalInfoData.dobirth || "-"}</span>
                                                </li>
                                                <li>
                                                    <span className="label">Home Airport : </span>{" "}
                                                    <span id="airp">{personalInfoData.airport_name || "-"}</span>
                                                </li>
                                                <li>
                                                    <span className="label">TSA Redress : </span>{" "}
                                                    <span id="tsa">{personalInfoData.tsa_name || "-"}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/*  \ Personal Information End here / */}
                            {/*  / Contact Information Start here \ */}
                            <div className="formBox">
                                <div className="row">
                                    <div className="col-sm-12 title">
                                        <h2>Contact Information</h2>{" "}
                                        {!contactIsEditing && (
                                            <a
                                                className="edit contact_infoform"
                                                onClick={() => setContactIsEditing(true)}
                                                href="#"
                                            >
                                                Edit
                                            </a>
                                        )}
                                    </div>
                                </div>
                                {/* Edit Mode For Contact information */}
                                {contactIsEditing ? (
                                    <div id="contact_infoform">
                                        <form id="contactform_Req" name="contactform_Req">
                                            <div className="row form-group">
                                                <div className="col-sm-6">
                                                    <label className="lable">
                                                        Address Line 1<sup className="star">*</sup>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="user_addressline1"
                                                        placeholder=""
                                                        name="addressline1"
                                                        className="textbox"
                                                        value={contactInfoData.addressline1}
                                                        onChange={handleConatctInfoChange}
                                                    />
                                                    <div className="error_text">
                                                        Address Line 1 is required
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="lable">Address Line 2</label>
                                                    <input
                                                        type="text"
                                                        id="addressline2"
                                                        placeholder=""
                                                        name="addressline2"
                                                        className="textbox"
                                                        value={contactInfoData.addressline2}
                                                        onChange={handleConatctInfoChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col-sm-6">
                                                    <label className="lable">
                                                        City<sup className="star">*</sup>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder=""
                                                        id="user_city"
                                                        name="city"
                                                        className="textbox textOnly"
                                                        value={contactInfoData.city}
                                                        onChange={handleConatctInfoChange}
                                                    />
                                                    <div className="error_text">City is required</div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="lable">
                                                        Country<sup className="star">*</sup>
                                                    </label>
                                                    <div className="select_dropdown">
                                                        <select
                                                            className="Select Country"
                                                            data-val="true"
                                                            data-val-required="The country field is required."
                                                            id="user_country"
                                                            name="country"
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
                                                        <div className="error_text">
                                                            Country is required
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col-sm-6">
                                                    <label className="lable">
                                                        Zip Code<sup className="star">*</sup>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder=""
                                                        className="textbox"
                                                        id="user_zip"
                                                        name="zip"
                                                        maxLength={7}
                                                        value={contactInfoData.zip}
                                                        onChange={handleConatctInfoChange}
                                                    />
                                                    <div className="error_text">Zip Code is required</div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="lable">State</label>
                                                    {/* <input  
                                                    type="text"
                                                    placeholder=""
                                                    className="textbox textOnly"
                                                    id="state"
                                                    name="state"
                                                /> */}
                                                    <div
                                                        className="select_dropdown statedrop"
                                                    >
                                                        <select
                                                            className="select_dropdown"
                                                            id="statecode"
                                                            name="statecode"
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
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col-sm-6">
                                                    <label className="lable">
                                                        Contact Phone<sup className="star">*</sup>{" "}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        maxLength={10}
                                                        placeholder=""
                                                        className="textbox numbersOnly"
                                                        id="user_phone"
                                                        name="phone"
                                                        value={contactInfoData.phone}
                                                        onChange={handleConatctInfoChange}
                                                    />
                                                    <div className="error_text">
                                                        Contact Phone is required
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="lable">Mobile</label>
                                                    <input
                                                        type="text"
                                                        placeholder=""
                                                        maxLength={10}
                                                        className="textbox numbersOnly"
                                                        id="mobile"
                                                        name="mobile"
                                                        value={contactInfoData.mobile}
                                                        onChange={handleConatctInfoChange}
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                className="button pull-right mt_mob"
                                                type="button"
                                                onClick={handleContactSave}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="button pull-right grayBtn mt_mob"
                                                onClick={handleContactCancel}
                                                type="button"
                                            >
                                                Cancel
                                            </button>
                                        </form>
                                    </div>
                                ) : (
                                    <div id="contact_infoDetail">
                                        <ul className="content_detail">
                                            <li>
                                                <span className="label">Address Line1 :</span>{" "}
                                                <sapn id="add1">{contactInfoData.addressline1 || "-"}</sapn>{" "}
                                            </li>
                                            <li>
                                                <span className="label">Address Line2 :</span>{" "}
                                                <span id="add2">{contactInfoData.addressline2 || "-"}</span>
                                            </li>
                                            <li>
                                                <span className="label">City : </span>{" "}
                                                <span id="ct">{contactInfoData.city || "-"}</span>
                                            </li>
                                            <li>
                                                <span className="label">State : </span>{" "}
                                                <span id="st">{contactInfoData.state || "-"}</span>
                                            </li>
                                            <li>
                                                <span className="label">Zip Code : </span>{" "}
                                                <span id="czip">{contactInfoData.zip || "-"}</span>
                                            </li>
                                            <li>
                                                <span className="label">Country : </span>{" "}
                                                <span id="cntry">{contactInfoData.country || "-"}</span>
                                            </li>
                                            <li>
                                                <span className="label">Contact Phone : </span>{" "}
                                                <span id="ccontact">{contactInfoData.phone || "-"}</span>
                                            </li>
                                            <li>
                                                <span className="label">Mobile : </span>{" "}
                                                <span id="cmobile">{contactInfoData.mobile || "-"}</span>
                                            </li>
                                            <li>
                                                <span className="label">Email : </span>{" "}
                                                <span id="cemail">himanshu.codebugger@gmail.com</span>
                                            </li>
                                        </ul>
                                    </div>
                                )}

                                {/* Edit Mode For Contact information */}
                                {/* Contact information start */}

                                {/* Contact information end */}
                            </div>
                            {/*  \ Contact Information End here / */}
                        </div>
                    )}

                    {/* My detail tab Start here */}
                    {/* My billing detail tab Start here */}
                    {activeTab === "tab2" && (
                        <div
                            className="tabContent"
                            id="tab2C"
                        >
                            {/*  / add new address Start here \ */}
                            <div className="formBox">
                                <div className="row">
                                    <div className="col-sm-12 title">
                                        <h2>Billing Address</h2>{" "}
                                        <a
                                            className="edit billing_infoform"
                                            onClick={() => setBillingIsEditing(true)}
                                            href="javascript:void(0);"
                                        >
                                            {" "}
                                            Edit
                                        </a>
                                    </div>
                                </div>

                                {billingIsEditing ? (
                                    <div id="billing_infoform" >
                                        <div
                                            className="row form-group radiobtn"
                                        >
                                            <div className="col-sm-12 inputSet">
                                                <label>
                                                    <input
                                                        type="radio"
                                                        defaultChecked=""
                                                        id="newadd"
                                                        name="address"

                                                    />
                                                    <span>Add New Address</span>
                                                </label>
                                                <label>
                                                    <input type="radio" id="contactadd" name="address" />
                                                    <span>Use Contact Address</span>
                                                </label>
                                            </div>
                                        </div>
                                        <form id="billingform_Req" name="billingform_Req">
                                            <div className="row form-group">
                                                <div className="col-sm-6">
                                                    <label className="lable">
                                                        Country <span className="star">*</span>
                                                    </label>
                                                    <div className="select_dropdown">
                                                        <select
                                                            className="Select Country"
                                                            data-val="true"
                                                            data-val-required="The billcountry field is required."
                                                            id="user_billcountry"
                                                            name="billcountry"
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
                                                        <div className="error_text">
                                                            Country is required
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col-sm-6">
                                                    <label className="lable">
                                                        Address Line 1<sup className="star">*</sup>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="user_billaddressline1"
                                                        placeholder=""
                                                        name="billaddressline1"
                                                        className="textbox"
                                                        value={billingInfoData.billaddressline1}
                                                        onChange={handleBillingInfoChange}
                                                    />
                                                    <div className="error_text">
                                                        Address Line 1 is required
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="lable">
                                                        Address Line 2<sup className="star" />
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="billaddressline2"
                                                        placeholder=""
                                                        name="billaddressline2"
                                                        className="textbox"
                                                        value={billingInfoData.billaddressline2}
                                                        onChange={handleBillingInfoChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col-sm-6">
                                                    <label className="lable">
                                                        City<sup className="star">*</sup>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder=""
                                                        id="user_billcity"
                                                        name="billcity"
                                                        className="textbox textOnly"
                                                        value={billingInfoData.billcity}
                                                        onChange={handleBillingInfoChange}
                                                    />
                                                    <div className="error_text">City is required</div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="lable">State</label>
                                                    {/* <input
                                                        type="text"
                                                        placeholder=""
                                                        className="textbox textOnly"
                                                        id="billstate"
                                                        name="billstate"
                                                    /> */}
                                                    <div
                                                        className="select_dropdown statedrop_bill"

                                                    >
                                                        <select
                                                            className="Select State"
                                                            id="statecode_bill"
                                                            name="statecode_bill"
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
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col-sm-6">
                                                    <label className="lable">
                                                        Zip Code <span className="star">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder=""
                                                        className="textbox"
                                                        id="user_billzip"
                                                        name="billzip"
                                                        maxLength={7}
                                                        value={billingInfoData.billzip}
                                                        onChange={handleBillingInfoChange}
                                                    />
                                                    <div className="error_text">Zip Code is required</div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="lable">
                                                        Billing Phone <span className="star">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder=""
                                                        className="textbox numbersOnly"
                                                        maxLength={10}
                                                        id="user_billphone"
                                                        name="billphone"
                                                        value={billingInfoData.billphone}
                                                        onChange={handleBillingInfoChange}
                                                    />
                                                    <div className="error_text">
                                                        Billing Phone is required
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                className="button pull-right mt_mob"
                                                type="button"
                                                onClick={handleBillingSave}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="button pull-right grayBtn mt_mob"
                                                onClick={handleBillingCancel}
                                                type="button"
                                            >
                                                Cancel
                                            </button>
                                        </form>
                                    </div>
                                ) : (
                                    <div id="billing_infoDetail">
                                        <ul className="content_detail">
                                            <li>
                                                <span className="label">Address Line1 :</span>{" "}
                                                <sapn id="bill_add1">{billingInfoData.billaddressline1 || "-"}</sapn>{" "}
                                            </li>
                                            <li>
                                                <span className="label">Address Line2 :</span>{" "}
                                                <span id="bill_add2">{billingInfoData.billaddressline2 || "-"}</span>
                                            </li>
                                            <li>
                                                <span className="label">City : </span>{" "}
                                                <span id="bill_ct">{billingInfoData.billcity || "-"}</span>
                                            </li>
                                            <li>
                                                <span className="label">State : </span>{" "}
                                                <span id="bill_st">{billingInfoData.state || "-"}</span>
                                            </li>
                                            <li>
                                                <span className="label">Zip Code : </span>{" "}
                                                <span id="bill_czip">{billingInfoData.billzip || "-"}</span>
                                            </li>
                                            <li>
                                                <span className="label">Country : </span>{" "}
                                                <span id="bill_cntry">{billingInfoData.country || "-"}</span>
                                            </li>
                                            <li>
                                                <span className="label">Contact Phone : </span>{" "}
                                                <span id="bill_ccontact">{billingInfoData.billphone || "-"}</span>
                                            </li>
                                        </ul>
                                    </div>
                                )}


                            </div>
                            {/*  \ add new address End here / */}
                        </div>
                    )}

                    {/* My billing detail tab Start here */}
                    {/* travelers tab Start here */}
                    {activeTab === "tab4" && (
                        <>
                            <div
                                className="tabContent"
                                id="tab4C"
                            >
                                {/*  / Add traveller Start here \ */}
                                <div className="formBox">
                                    <div className="row">
                                        <div className="col-sm-12 title">
                                            
                                            <h2>My Traveler's</h2>
                                            <div>You can add your traveler details</div>
                                            <button
                                                className="button pull-right travller"
                                                onClick={handleOpenModal}
                                                type="button"
                                            >
                                                ADD TRAVELER
                                            </button>

                                        </div>
                                    </div>
                                    {Array.isArray(travellers) &&
                                        travellers.map((traveller, index) => (
                                            <div id="traveler_infoDetail" key={traveller.id || index}>
                                                <div className="row" id="traveler_htm">
                                                    <div className="col-sm-6">
                                                        <div className="traveller_block">
                                                            <p>
                                                                <strong>{traveller.fname} {traveller.lname}</strong>
                                                            </p>
                                                            <ul className="content_detail">
                                                                <li>
                                                                    <span className="label">Gender :</span> {traveller.genderpopup}
                                                                </li>
                                                                <li>
                                                                    <span className="label">Date Of Birth :</span> {traveller.dobid}
                                                                </li>
                                                                <li>
                                                                    <span className="label">Nationality :</span> {traveller.country}
                                                                </li>
                                                            </ul>
                                                            <div className="actionBtn">
                                                                <a onClick={() => handleOpenModal(traveller)}>Edit</a>
                                                                <span className="sep">|</span>
                                                                <a className="delete" onClick={() => handleTravellerDelete(traveller)}>
                                                                    Delete
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                                {/*  \ Add traveller End here / */}
                            </div>

                            {/* Add Modal */}
                            {isModalOpen && (
                                <div
                                    className="modal show"
                                    id="addModal"
                                    style={{ ...modalStyles, display: "block", paddingLeft: 0, }}

                                    aria-modal="true"
                                    role="dialog"
                                >
                                    <div className="modal-dialog">
                                        <div className="modal-content formBox">
                                            {/* Modal Header */}
                                            <div className="modal-header">
                                                <h4 className="modal-title">Traveler </h4>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={handleCloseModal} />
                                            </div>
                                            {/* Modal body */}
                                            <div className="modal-body">
                                                <form id="addpax_Req">
                                                    <div className="row form-group">
                                                        <div className="col-sm-6">
                                                            <label className="label">
                                                                First Name<sup className="star">*</sup>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="user_fname"
                                                                name="fname"
                                                                className="textbox textOnly valid"
                                                                value={travellerInfoData.fname}
                                                                onChange={handleTravellerInfoChange}
                                                            />
                                                            <div className="error_text">First Name is required</div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <label className="label">Middle Name</label>
                                                            <input
                                                                type="text"
                                                                id="mname"
                                                                name="mname"
                                                                className="textbox textOnly"
                                                                value={travellerInfoData.mname}
                                                                onChange={handleTravellerInfoChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row form-group">
                                                        <div className="col-sm-6">
                                                            <label className="label">
                                                                Last Name<sup className="star">*</sup>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="user_Laname"
                                                                name="lname"
                                                                className="textbox textOnly valid"
                                                                value={travellerInfoData.lname}
                                                                onChange={handleTravellerInfoChange}
                                                            />
                                                            <div className="error_text">Last Name is required</div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <label className="label">
                                                                Gender<sup className="star">*</sup>
                                                            </label>
                                                            <div className="select_dropdown">
                                                                <select
                                                                    id="user_genderpopup"
                                                                    name="genderpopup"
                                                                    className="valid"
                                                                    value={travellerInfoData.genderpopup}
                                                                    onChange={handleTravellerInfoChange}
                                                                >
                                                                    <option value="">Select Gender</option>
                                                                    <option value={1}>Male</option>
                                                                    <option value={2}>Female </option>
                                                                </select>
                                                                {!travellerInfoData.genderpopup && (
                                                                    <div className="error_text">Gender is required</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row form-group">
                                                        <div className="col-sm-6">
                                                            <label className="label">
                                                                Date of Birth<sup className="star">*</sup>
                                                            </label>
                                                            <div className="relative">
                                                                <div id="dobdiv">
                                                                    <input
                                                                        type="text"
                                                                        placeholder=""
                                                                        defaultValue=""
                                                                        readOnly=""
                                                                        className="textbox hasDatepicker valid"
                                                                        id="user_dobid"
                                                                        name="dobid"
                                                                        value={travellerInfoData.dobid}
                                                                        onChange={handleTravellerInfoChange}
                                                                    />
                                                                    <i className="fa fa-calendar" aria-hidden="true" />
                                                                    <div className="error_text">Date of Birth is required</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <label className="label">
                                                                {" "}
                                                                Nationality<sup className="star">*</sup>
                                                            </label>
                                                            <div className="select_dropdown">
                                                                <select
                                                                    className="Select Country valid"
                                                                    data-val="true"
                                                                    data-val-required="The nationality field is required."
                                                                    id="user_nationality"
                                                                    name="nationality"
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
                                                                <div className="error_text">Country is required</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            {/* Modal footer */}
                                            <div className="modal-footer">
                                                <input
                                                    type="hidden"
                                                    name="paxindex_hidden"
                                                    id="paxindex_hidden"
                                                    defaultValue={0}
                                                />
                                                <button
                                                    className="button pull-right mt_mob"
                                                    type="button"
                                                    onClick={handleTravellerSave}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    className="button pull-right grayBtn mt_mob"
                                                    onClick={handleTravellerCancel}
                                                    type="button"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="button"
                                                    id="editbtn"
                                                    style={{ display: "none" }}
                                                    className="btn button"
                                                    onclick="submitPassenger_details()"
                                                >
                                                    Update{" "}
                                                    <span className="button_loding_div" style={{ display: "none" }}>
                                                        <i className="button_loader blnk" />
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </>


                        // add Modal

                    )}

                    {/* travelers tab Start here */}
                </div>
            </div>
        </>
    )

}

export default MyInformation;