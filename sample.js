'use client';
import { useState } from 'react';

// import img from "../../../../../public/assets/logo.png"

const MyBooking = () => {

    const [showMyTrip, setShowMyTrip] = useState(false);

    const handleMyInfoClick = () => {
        console.log("MyInformation Clicked");

        setShowMyTrip(true);
    };

    console.log(showMyTrip, "MyInfromation");

    // const handleTabClick = (tabId) => {
    //     setActiveTab(tabId); // Switch active tab when a tab is clicked
    // };

    return (

        <>
            {/* Navebar */}
            <div className="loginBar">
                <input type="hidden" id="goo_signin" name="goo_signin" defaultValue="Yes" />
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="topmenuBox">
                                <ul>
                                    <li className="dropdown loginDropdown loginpg" style={{}}>
                                        <a
                                            className="login"
                                            data-toggle="dropdown"
                                            href="javascript:void(0);"
                                            aria-expanded="true"
                                        >
                                            <span className="displayusername">Welcome Himanshu</span>{" "}
                                            <span className="fa fa-angle-down support-icon" />
                                        </a>
                                        <ul className="dropdown-menu loginMenu">
                                            <li>
                                                <a
                                                    onclick="redirectURl('mytrip')"
                                                    className="mytrip removeAll active"
                                                >
                                                    My Booking
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    onclick="redirectURl('myinformation')"
                                                    className="myinformation removeAll"
                                                >
                                                    My Information
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    onclick="redirectURl('offers')"
                                                    className="reward offers removeAll"
                                                >
                                                    Latest Offers
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    onclick="redirectURl('settings')"
                                                    className="setting settings removeAll"
                                                >
                                                    Settings
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    onclick="redirectURl('writeus')"
                                                    className="writeus deal removeAll"
                                                >
                                                    Write To Us
                                                </a>
                                            </li>
                                            <li>
                                                <a className="signout removeAll">Sign Out</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li
                                        className="dropdown loginDropdown signpg"
                                        style={{ display: "none" }}
                                    >
                                        <a
                                            className="login"
                                            data-toggle="dropdown"
                                            href="javascript:void(0);"
                                            aria-expanded="true"
                                        >
                                            {" "}
                                            Account <span className="fa fa-angle-down support-icon" />
                                        </a>
                                        <ul className="dropdown-menu withoutlogin">
                                            <li>
                                                <a href="/us/profile/sign-in">Sign in</a>
                                            </li>
                                            <li>
                                                <a href="/us/profile/signup">Create an Account</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header */}
            <header className="header">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <a className="logo" href="https://www.JetQuinsTravel.com/">
                                <img
                                    src="/assets/logo.png"
                                    alt="logo"
                                    style={{ width: 160, marginTop: 10 }}
                                />
                            </a>
                            <div className="topmenuBox">
                                <ul>
                                    <li>
                                        <a href="https://www.JetQuinsTravel.com/">Flights</a>
                                    </li>
                                    {/* <li>
                                        <a href="https://www.lookbyfare.com/us/hotel/">Hotels</a>
                                    </li>
                                    <li>
                                        <a href="https://www.lookbyfare.com/us/car/">Cars</a>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Container */}
            <div className="container">
                <main role="main" className="pb-3">
                    <input type="hidden" id="pageid" defaultValue="myinfo" />
                    <input type="hidden" id="billdtl" defaultValue="false" />
                    <input type="hidden" id="loginpg" defaultValue={2} />
                    {/*  / Profile  container \ */}
                    <div id="profileCntr">
                        <div className="row">
                            <div className="col-sm-12 row-flex main-section-container">
                                {/*  / Left container Start here \ */}
                                <div className="leftCntr">
                                    <div className="profile_imageBlock">
                                        <figure className="image">
                                            <span className="changeColor">HA</span>
                                        </figure>
                                        <div className="name_col">
                                            <div className="name">
                                                <span className="displayusername_2">Himanshu Anand</span>
                                                <div className="small">
                                                    Last login: <br className="d-none d-xl-block" />
                                                    <span className="LastLoginDate">
                                                        Dec 26, 2024, 8:08:53 AM
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="leftMenu">
                                        <ul>
                                            <li>
                                                <a
                                                    onclick="redirectURl('mytrip')"
                                                    className="mytrip removeAll active"
                                                >
                                                    My Booking
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    onClick={handleMyInfoClick}
                                                    className={`myinformation removeAll ${showMyTrip ? 'active' : ''}`}
                                                >
                                                    My Information
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    onclick="redirectURl('offers')"
                                                    className="reward offers removeAll"
                                                >
                                                    Latest Offers
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    onclick="redirectURl('settings')"
                                                    className="setting settings removeAll"
                                                >
                                                    Settings
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    onclick="redirectURl('writeus')"
                                                    className="deal writeus removeAll"
                                                >
                                                    Write To Us
                                                </a>
                                            </li>
                                            <li>
                                                <a className="signout removeAll">Sign Out</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>{" "}

                                <div className="rightCntr" id="myinformation">
                                    <div id="myinfoTab">
                                        {/*  / tabBox Start here \ */}
                                        <div className="tabBox">
                                            <ul id="tabs">
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        id="tab1"
                                                        className="myinfo active"
                                                    >
                                                        My Details
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0);" id="tab2" className="myinfo">
                                                        My Billing Details
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0);" id="tab4" className="myinfo">
                                                        My Travelers
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        {/*  \ tabBox End here / */}
                                        {/* My detail tab Start here */}
                                        <div className="tabContent" id="tab1C" style={{}}>
                                            {/*  / Personal Information Start here \ */}
                                            <div className="formBox">
                                                <div className="row">
                                                    <div className="col-sm-12 title">
                                                        <h2>Personal Information</h2>{" "}
                                                        <a
                                                            className="edit personal_infoform"
                                                            onclick="showdiv('personal_infoform','personal_infoDetail')"
                                                            href="javascript:void(0);"
                                                        >
                                                            {" "}
                                                            Edit
                                                        </a>
                                                    </div>
                                                </div>
                                                <div id="personal_infoform" style={{ display: "none" }}>
                                                    <form name="personal_Req" id="personal_Req">
                                                        <div className="row form-group">
                                                            <div className="col-sm-6">
                                                                <label className="lable">
                                                                    First Name<sup className="star">*</sup>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="user_firstname"
                                                                    name="firstname"
                                                                    className="textbox textOnly"
                                                                />
                                                                <div className="error_text">
                                                                    First Name is required
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <label className="lable">Middle Name</label>
                                                                <input
                                                                    type="text"
                                                                    id="middlename"
                                                                    name="middlename"
                                                                    className="textbox textOnly"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <div className="col-sm-6">
                                                                <label className="lable">
                                                                    Last Name<sup className="star">*</sup>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="user_lastname"
                                                                    name="lastname"
                                                                    className="textbox textOnly"
                                                                />
                                                                <div className="error_text">
                                                                    Last Name is required
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <label className="lable">
                                                                    Date Of Birth<sup className="star">*</sup>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    readOnly=""
                                                                    id="user_dobirth"
                                                                    name="dobirth"
                                                                    className="textbox hasDatepicker"
                                                                />
                                                                <div className="error_text">
                                                                    Date Of Birth is required
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <div className="col-sm-6">
                                                                <label className="lable">
                                                                    Gender<sup className="star">*</sup>
                                                                </label>
                                                                <div className="select_dropdown">
                                                                    <select id="user_genderid" name="genderid">
                                                                        <option value="" selected="">
                                                                            Select Gender
                                                                        </option>
                                                                        <option value={1}>Male</option>
                                                                        <option value={2}>Female </option>
                                                                    </select>
                                                                    <div className="error_text">Gender is required</div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <label className="lable">Home Airport</label>
                                                                <input
                                                                    type="text"
                                                                    placeholder=""
                                                                    id="airport_name"
                                                                    onclick="this.select();"
                                                                    name="airport_name"
                                                                    className="textbox ui-autocomplete-input"
                                                                    autoComplete="off"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <div className="col-sm-6">
                                                                <label className="lable">
                                                                    TSA Redress / Known Traveler{" "}
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    placeholder=""
                                                                    id="tsa_name"
                                                                    name="tsa_name"
                                                                    onclick="this.select();"
                                                                    className="textbox"
                                                                />
                                                            </div>
                                                        </div>
                                                        <button
                                                            className="button pull-right mt_mob"
                                                            type="button"
                                                            onclick="submitPersonal_details()"
                                                        >
                                                            Save{" "}
                                                            <span
                                                                className="button_loding_div"
                                                                style={{ display: "none" }}
                                                            >
                                                                <i className="button_loader blnk" />
                                                            </span>
                                                        </button>
                                                    </form>
                                                    <button
                                                        className="button pull-right grayBtn mt_mob"
                                                        onclick="hidediv('personal_infoform','personal_infoDetail')"
                                                        type="button"
                                                    >
                                                        cancel
                                                    </button>
                                                </div>
                                                {/* Personal information start */}
                                                <div id="personal_infoDetail">
                                                    <p>
                                                        <strong id="user_name">Himanshu Anand</strong>
                                                    </p>
                                                    <ul className="content_detail">
                                                        <li>
                                                            <span className="label">Gender :</span>{" "}
                                                            <sapn id="gen">-</sapn>
                                                        </li>
                                                        <li>
                                                            <span className="label">Date Of Birth :</span>{" "}
                                                            <span id="dob">-</span>
                                                        </li>
                                                        <li>
                                                            <span className="label">Home Airport : </span>{" "}
                                                            <span id="airp">-</span>
                                                        </li>
                                                        <li>
                                                            <span className="label">TSA Redress : </span>{" "}
                                                            <span id="tsa">-</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                {/* Personal information end */}
                                            </div>
                                            {/*  \ Personal Information End here / */}
                                            {/*  / Contact Information Start here \ */}
                                            <div className="formBox">
                                                <div className="row">
                                                    <div className="col-sm-12 title">
                                                        <h2>Contact Information</h2>{" "}
                                                        <a
                                                            className="edit contact_infoform"
                                                            onclick="showdiv('contact_infoform','contact_infoDetail')"
                                                            href="javascript:void(0);"
                                                        >
                                                            {" "}
                                                            Edit
                                                        </a>
                                                    </div>
                                                </div>
                                                {/* Edit Mode For Contact information */}
                                                <div id="contact_infoform" style={{ display: "none" }}>
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
                                                                    >
                                                                        <option value="">Select Country</option>
                                                                        <option value="AF">Afghanistan</option>
                                                                        <option value="AL">Albania</option>
                                                                        <option value="DZ">Algeria</option>
                                                                        <option value="AS">American Samoa</option>
                                                                        <option value="AD">Andorra</option>
                                                                        <option value="AO">Angola</option>
                                                                        <option value="AI">Anguilla</option>
                                                                        <option value="AQ">Antarctica</option>
                                                                        <option value="AG">Antigua and Barbuda</option>
                                                                        <option value="AR">Argentina</option>
                                                                        <option value="AM">Armenia</option>
                                                                        <option value="AW">Aruba</option>
                                                                        <option value="AU">Australia</option>
                                                                        <option value="AT">Austria</option>
                                                                        <option value="AZ">Azerbaijan</option>
                                                                        <option value="BS">Bahamas</option>
                                                                        <option value="BH">Bahrain</option>
                                                                        <option value="BD">Bangladesh</option>
                                                                        <option value="BB">Barbados</option>
                                                                        <option value="BY">Belarus</option>
                                                                        <option value="BE">Belgium</option>
                                                                        <option value="BZ">Belize</option>
                                                                        <option value="BJ">Benin</option>
                                                                        <option value="BM">Bermuda</option>
                                                                        <option value="BT">Bhutan</option>
                                                                        <option value="BO">Bolivia</option>
                                                                        <option value="BQ">
                                                                            Bonaire, Sint Eustatius and Saba
                                                                        </option>
                                                                        <option value="BA">Bosnia Herzegovina</option>
                                                                        <option value="BW">Botswana</option>
                                                                        <option value="BR">Brazil</option>
                                                                        <option value="IO">
                                                                            British Indian Ocean Territory
                                                                        </option>
                                                                        <option value="VG">British Virgin Islands</option>
                                                                        <option value="BN">Brunei Darussalam</option>
                                                                        <option value="BG">Bulgaria</option>
                                                                        <option value="BF">Burkina Faso</option>
                                                                        <option value="BI">Burundi</option>
                                                                        <option value="KH">Cambodia</option>
                                                                        <option value="CM">Cameroon</option>
                                                                        <option value="CA">Canada</option>
                                                                        <option value="CV">Cape Verde</option>
                                                                        <option value="KY">Cayman Islands</option>
                                                                        <option value="CF">
                                                                            Central African Republic
                                                                        </option>
                                                                        <option value="TD">Chad</option>
                                                                        <option value="CL">Chile</option>
                                                                        <option value="CN">China</option>
                                                                        <option value="CX">Christmas Island</option>
                                                                        <option value="CC">Cocos Islands</option>
                                                                        <option value="CO">Colombia</option>
                                                                        <option value="KM">Comoros</option>
                                                                        <option value="CK">Cook Islands</option>
                                                                        <option value="CR">Costa Rica</option>
                                                                        <option value="HR">Croatia</option>
                                                                        <option value="CU">Cuba</option>
                                                                        <option value="CW">Curacao</option>
                                                                        <option value="CY">Cyprus</option>
                                                                        <option value="CZ">Czech Republic</option>
                                                                        <option value="CD">
                                                                            Democratic Republic of the Congo
                                                                        </option>
                                                                        <option value="DK">Denmark</option>
                                                                        <option value="DJ">Djibouti</option>
                                                                        <option value="DM">Dominica</option>
                                                                        <option value="DO">Dominican Republic</option>
                                                                        <option value="TL">East Timor</option>
                                                                        <option value="EC">Ecuador</option>
                                                                        <option value="EG">Egypt</option>
                                                                        <option value="SV">El Salvador</option>
                                                                        <option value="GQ">Equatorial Guinea</option>
                                                                        <option value="ER">Eritrea</option>
                                                                        <option value="EE">Estonia</option>
                                                                        <option value="SZ">Eswatini</option>
                                                                        <option value="ET">Ethiopia</option>
                                                                        <option value="FK">Falkland Islands</option>
                                                                        <option value="FO">Faroe Islands</option>
                                                                        <option value="FJ">Fiji</option>
                                                                        <option value="FI">Finland</option>
                                                                        <option value="FR">France</option>
                                                                        <option value="GF">French Guiana</option>
                                                                        <option value="PF">French Polynesia</option>
                                                                        <option value="GA">Gabon</option>
                                                                        <option value="GM">Gambia</option>
                                                                        <option value="GE">Georgia</option>
                                                                        <option value="DE">Germany</option>
                                                                        <option value="GH">Ghana</option>
                                                                        <option value="GI">Gibraltar</option>
                                                                        <option value="GR">Greece</option>
                                                                        <option value="GL">Greenland</option>
                                                                        <option value="GD">Grenada</option>
                                                                        <option value="GP">Guadeloupe</option>
                                                                        <option value="GU">Guam</option>
                                                                        <option value="GT">Guatemala</option>
                                                                        <option value="GG">Guernsey</option>
                                                                        <option value="GN">Guinea</option>
                                                                        <option value="GW">Guinea-Bissau</option>
                                                                        <option value="GY">Guyana</option>
                                                                        <option value="HT">Haiti</option>
                                                                        <option value="HM">
                                                                            Heard Island and McDonald Islands
                                                                        </option>
                                                                        <option value="HN">Honduras</option>
                                                                        <option value="HK">Hong Kong</option>
                                                                        <option value="HU">Hungary</option>
                                                                        <option value="IS">Iceland</option>
                                                                        <option value="IN">India</option>
                                                                        <option value="ID">Indonesia</option>
                                                                        <option value="IR">Iran</option>
                                                                        <option value="IQ">Iraq</option>
                                                                        <option value="IE">Ireland</option>
                                                                        <option value="IM">Isle of Man</option>
                                                                        <option value="IL">Israel</option>
                                                                        <option value="IT">Italy</option>
                                                                        <option value="CI">Ivory Coast</option>
                                                                        <option value="JM">Jamaica</option>
                                                                        <option value="JP">Japan</option>
                                                                        <option value="JE">Jersey</option>
                                                                        <option value="JO">Jordan</option>
                                                                        <option value="KZ">Kazakhstan</option>
                                                                        <option value="KE">Kenya</option>
                                                                        <option value="KI">Kiribati</option>
                                                                        <option value="KW">Kuwait</option>
                                                                        <option value="KG">Kyrgyzstan</option>
                                                                        <option value="LA">
                                                                            Lao Peoples Democratic Republic
                                                                        </option>
                                                                        <option value="LV">Latvia</option>
                                                                        <option value="LB">Lebanon</option>
                                                                        <option value="LS">Lesotho</option>
                                                                        <option value="LR">Liberia</option>
                                                                        <option value="LY">Libya</option>
                                                                        <option value="LI">Liechtenstein</option>
                                                                        <option value="LT">Lithuania</option>
                                                                        <option value="LU">Luxembourg</option>
                                                                        <option value="MO">Macau</option>
                                                                        <option value="MG">Madagascar</option>
                                                                        <option value="MW">Malawi</option>
                                                                        <option value="MY">Malaysia</option>
                                                                        <option value="MV">Maldives</option>
                                                                        <option value="ML">Mali</option>
                                                                        <option value="MT">Malta</option>
                                                                        <option value="MH">Marshall Islands</option>
                                                                        <option value="MQ">Martinique</option>
                                                                        <option value="MR">Mauritania</option>
                                                                        <option value="MU">Mauritius</option>
                                                                        <option value="YT">Mayotte</option>
                                                                        <option value="MX">Mexico</option>
                                                                        <option value="FM">Micronesia</option>
                                                                        <option value="MD">Moldova</option>
                                                                        <option value="MC">Monaco</option>
                                                                        <option value="MN">Mongolia</option>
                                                                        <option value="ME">Montenegro</option>
                                                                        <option value="MS">Montserrat</option>
                                                                        <option value="MA">Morocco</option>
                                                                        <option value="MZ">Mozambique</option>
                                                                        <option value="MM">Myanmar</option>
                                                                        <option value="NA">Namibia</option>
                                                                        <option value="NR">Nauru</option>
                                                                        <option value="NP">Nepal</option>
                                                                        <option value="NL">Netherlands</option>
                                                                        <option value="NC">New Caledonia</option>
                                                                        <option value="NZ">New Zealand</option>
                                                                        <option value="NI">Nicaragua</option>
                                                                        <option value="NE">Niger</option>
                                                                        <option value="NG">Nigeria</option>
                                                                        <option value="NU">Niue</option>
                                                                        <option value="NF">Norfolk Island</option>
                                                                        <option value="KP">North Korea</option>
                                                                        <option value="MP">
                                                                            Northern Mariana Islands
                                                                        </option>
                                                                        <option value="NO">Norway</option>
                                                                        <option value="OM">Oman</option>
                                                                        <option value="PK">Pakistan</option>
                                                                        <option value="PW">Palau</option>
                                                                        <option value="PS">
                                                                            Palestinian Territory, Occupied
                                                                        </option>
                                                                        <option value="PA">Panama</option>
                                                                        <option value="PG">Papua New Guinea</option>
                                                                        <option value="PY">Paraguay</option>
                                                                        <option value="PE">Peru</option>
                                                                        <option value="PH">Philippines</option>
                                                                        <option value="PN">Pitcairn</option>
                                                                        <option value="PL">Poland</option>
                                                                        <option value="PT">Portugal</option>
                                                                        <option value="PR">Puerto Rico</option>
                                                                        <option value="QA">Qatar</option>
                                                                        <option value="MK">Republic of Macedonia</option>
                                                                        <option value="CG">Republic of the Congo</option>
                                                                        <option value="RE">Reunion</option>
                                                                        <option value="RO">Romania</option>
                                                                        <option value="RU">Russia</option>
                                                                        <option value="RW">Rwanda</option>
                                                                        <option value="BL">Saint Barthelemy</option>
                                                                        <option value="SH">Saint Helena</option>
                                                                        <option value="MF">Saint Martin</option>
                                                                        <option value="WS">Samoa</option>
                                                                        <option value="SM">San Marino</option>
                                                                        <option value="ST">Sao Tome and Principe</option>
                                                                        <option value="SA">Saudi Arabia</option>
                                                                        <option value="SN">Senegal</option>
                                                                        <option value="RS">Serbia</option>
                                                                        <option value="SC">Seychelles</option>
                                                                        <option value="SL">Sierra Leone</option>
                                                                        <option value="SG">Singapore</option>
                                                                        <option value="SX">Sint Maarten</option>
                                                                        <option value="SK">Slovakia</option>
                                                                        <option value="SI">Slovenia</option>
                                                                        <option value="SB">Solomon Islands</option>
                                                                        <option value="SO">Somalia</option>
                                                                        <option value="ZA">South Africa</option>
                                                                        <option value="GS">
                                                                            South Georgia and the South Sandwich Islands
                                                                        </option>
                                                                        <option value="KR">South Korea</option>
                                                                        <option value="SS">South Sudan</option>
                                                                        <option value="ES">Spain</option>
                                                                        <option value="LK">Sri Lanka</option>
                                                                        <option value="KN">
                                                                            St. Christopher (St. Kitts) Nevis
                                                                        </option>
                                                                        <option value="LC">St. Lucia</option>
                                                                        <option value="PM">
                                                                            St. Pierre and Miquelon
                                                                        </option>
                                                                        <option value="VC">
                                                                            St. Vincent and The Grenadines
                                                                        </option>
                                                                        <option value="SD">Sudan</option>
                                                                        <option value="SR">Suriname</option>
                                                                        <option value="SJ">Svalbard and Jan Mayen</option>
                                                                        <option value="SE">Sweden</option>
                                                                        <option value="CH">Switzerland</option>
                                                                        <option value="SY">Syrian Arab Republic</option>
                                                                        <option value="TW">Taiwan</option>
                                                                        <option value="TJ">Tajikistan</option>
                                                                        <option value="TZ">Tanzania</option>
                                                                        <option value="TH">Thailand</option>
                                                                        <option value="TG">Togo</option>
                                                                        <option value="TK">Tokelau</option>
                                                                        <option value="TO">Tonga</option>
                                                                        <option value="TT">Trinidad and Tobago</option>
                                                                        <option value="TN">Tunisia</option>
                                                                        <option value="TR">Turkey</option>
                                                                        <option value="TM">Turkmenistan</option>
                                                                        <option value="TC">
                                                                            Turks and Caicos Islands
                                                                        </option>
                                                                        <option value="TV">Tuvalu</option>
                                                                        <option value="UG">Uganda</option>
                                                                        <option value="UA">Ukraine</option>
                                                                        <option value="AE">United Arab Emirates</option>
                                                                        <option value="GB">United Kingdom</option>
                                                                        <option value="US">United States</option>
                                                                        <option value="UM">
                                                                            United States Minor Outlying Islands (the)
                                                                        </option>
                                                                        <option value="UY">Uruguay</option>
                                                                        <option value="VI">US Virgin Islands</option>
                                                                        <option value="UZ">Uzbekistan</option>
                                                                        <option value="VU">Vanuatu</option>
                                                                        <option value="VA">Vatican</option>
                                                                        <option value="VE">Venezuela</option>
                                                                        <option value="VN">Vietnam</option>
                                                                        <option value="EH">Western Sahara</option>
                                                                        <option value="YE">Yemen</option>
                                                                        <option value="ZM">Zambia</option>
                                                                        <option value="ZW">Zimbabwe</option>
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
                                                                />
                                                                <div className="error_text">Zip Code is required</div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <label className="lable">State</label>
                                                                <input
                                                                    type="text"
                                                                    placeholder=""
                                                                    className="textbox textOnly"
                                                                    id="state"
                                                                    name="state"
                                                                />
                                                                <div
                                                                    className="select_dropdown statedrop"
                                                                    style={{ display: "none" }}
                                                                >
                                                                    <select
                                                                        className="select_dropdown"
                                                                        id="statecode"
                                                                        name="statecode"
                                                                    >
                                                                        <option value="">Select State</option>
                                                                        <option value="AA">
                                                                            Armed Forces (the) Americas
                                                                        </option>
                                                                        <option value="AE">Armed Forces Europe</option>
                                                                        <option value="AE">Armed Forces Africa</option>
                                                                        <option value="AE">
                                                                            Armed Forces Middle East
                                                                        </option>
                                                                        <option value="AE">Armed Forces Canada</option>
                                                                        <option value="AP">Armed Forces Pacific</option>
                                                                        <option value="AL">Alabama</option>
                                                                        <option value="AK">Alaska</option>
                                                                        <option value="AZ">Arizona</option>
                                                                        <option value="AR">Arkansas</option>
                                                                        <option value="CA">California</option>
                                                                        <option value="CO">Colorado</option>
                                                                        <option value="CT">Connecticut</option>
                                                                        <option value="DE">Delaware</option>
                                                                        <option value="DC">District of Columbia</option>
                                                                        <option value="FL">Florida</option>
                                                                        <option value="GA">Georgia</option>
                                                                        <option value="HI">Hawaii</option>
                                                                        <option value="ID">Idaho</option>
                                                                        <option value="IL">Illinois</option>
                                                                        <option value="IN">Indiania</option>
                                                                        <option value="IA">Iowa</option>
                                                                        <option value="KS">Kansas</option>
                                                                        <option value="KY">Kentucky</option>
                                                                        <option value="LA">Louisiana</option>
                                                                        <option value="ME">Maine</option>
                                                                        <option value="MD">Maryland</option>
                                                                        <option value="MA">Massachusetts</option>
                                                                        <option value="MI">Michigan</option>
                                                                        <option value="MN">Minnesota</option>
                                                                        <option value="MS">Mississippi</option>
                                                                        <option value="MO">Missouri</option>
                                                                        <option value="MT">Montana</option>
                                                                        <option value="NE">Nebraska</option>
                                                                        <option value="NV">Nevada</option>
                                                                        <option value="NH">New Hampshire</option>
                                                                        <option value="NJ">New Jersey</option>
                                                                        <option value="NM">New Mexico</option>
                                                                        <option value="NY">New York</option>
                                                                        <option value="NC">North Carolina</option>
                                                                        <option value="ND">North Dakota</option>
                                                                        <option value="OH">Ohio</option>
                                                                        <option value="OK">Oklahoma</option>
                                                                        <option value="OR">Oregon</option>
                                                                        <option value="PA">Pennsylvania</option>
                                                                        <option value="RI">Rhode Island</option>
                                                                        <option value="SC">South Carolina</option>
                                                                        <option value="SD">South Dakota</option>
                                                                        <option value="TN">Tennessee</option>
                                                                        <option value="TX">Texas</option>
                                                                        <option value="UT">Utah</option>
                                                                        <option value="VT">Vermont</option>
                                                                        <option value="VA">Virginia</option>
                                                                        <option value="WA">Washington</option>
                                                                        <option value="WV">West Virginia</option>
                                                                        <option value="WI">Wisconsin</option>
                                                                        <option value="WY">Wyoming</option>
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
                                                                />
                                                            </div>
                                                        </div>
                                                        <button
                                                            className="button pull-right mt_mob"
                                                            type="button"
                                                            onclick="submitContact_details()"
                                                        >
                                                            Save{" "}
                                                            <span
                                                                className="button_loding_div"
                                                                style={{ display: "none" }}
                                                            >
                                                                <i className="button_loader blnk" />
                                                            </span>
                                                        </button>
                                                        <button
                                                            className="button pull-right grayBtn mt_mob"
                                                            onclick="hidediv('contact_infoform','contact_infoDetail')"
                                                            type="button"
                                                        >
                                                            cancel
                                                        </button>
                                                    </form>
                                                </div>
                                                {/* Edit Mode For Contact information */}
                                                {/* Contact information start */}
                                                <div id="contact_infoDetail">
                                                    <ul className="content_detail">
                                                        <li>
                                                            <span className="label">Address Line1 :</span>{" "}
                                                            <sapn id="add1">-</sapn>{" "}
                                                        </li>
                                                        <li>
                                                            <span className="label">Address Line2 :</span>{" "}
                                                            <span id="add2">-</span>
                                                        </li>
                                                        <li>
                                                            <span className="label">City : </span>{" "}
                                                            <span id="ct">-</span>
                                                        </li>
                                                        <li>
                                                            <span className="label">State : </span>{" "}
                                                            <span id="st">-</span>
                                                        </li>
                                                        <li>
                                                            <span className="label">Zip Code : </span>{" "}
                                                            <span id="czip">-</span>
                                                        </li>
                                                        <li>
                                                            <span className="label">Country : </span>{" "}
                                                            <span id="cntry">-</span>
                                                        </li>
                                                        <li>
                                                            <span className="label">Contact Phone : </span>{" "}
                                                            <span id="ccontact">-</span>
                                                        </li>
                                                        <li>
                                                            <span className="label">Mobile : </span>{" "}
                                                            <span id="cmobile">-</span>
                                                        </li>
                                                        <li>
                                                            <span className="label">Email : </span>{" "}
                                                            <span id="cemail">himanshu.codebugger@gmail.com</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                {/* Contact information end */}
                                            </div>
                                            {/*  \ Contact Information End here / */}
                                        </div>
                                        {/* My detail tab Start here */}
                                        {/* My billing detail tab Start here */}
                                        <div
                                            className="tabContent"
                                            id="tab2C"
                                            style={{ display: "none" }}
                                        >
                                            {/*  / add new address Start here \ */}
                                            <div className="formBox">
                                                <div className="row">
                                                    <div className="col-sm-12 title">
                                                        <h2>Billing Address</h2>{" "}
                                                        <a
                                                            className="edit billing_infoform"
                                                            onclick="showdiv('billing_infoform','billing_infoDetail')"
                                                            href="javascript:void(0);"
                                                        >
                                                            {" "}
                                                            Edit
                                                        </a>
                                                    </div>
                                                </div>
                                                <div id="billing_infoDetail">
                                                    <ul className="content_detail">
                                                        <li>
                                                            <span className="label">Address Line1 :</span>{" "}
                                                            <sapn id="bill_add1">-</sapn>{" "}
                                                        </li>
                                                        <li>
                                                            <span className="label">Address Line2 :</span>{" "}
                                                            <span id="bill_add2">-</span>
                                                        </li>
                                                        <li>
                                                            <span className="label">City : </span>{" "}
                                                            <span id="bill_ct">-</span>
                                                        </li>
                                                        <li>
                                                            <span className="label">State : </span>{" "}
                                                            <span id="bill_st">-</span>
                                                        </li>
                                                        <li>
                                                            <span className="label">Zip Code : </span>{" "}
                                                            <span id="bill_czip">-</span>
                                                        </li>
                                                        <li>
                                                            <span className="label">Country : </span>{" "}
                                                            <span id="bill_cntry">-</span>
                                                        </li>
                                                        <li>
                                                            <span className="label">Contact Phone : </span>{" "}
                                                            <span id="bill_ccontact">-</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div id="billing_infoform" style={{ display: "none" }}>
                                                    <div
                                                        className="row form-group radiobtn"
                                                        style={{ display: "none" }}
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
                                                                    >
                                                                        <option value="">Select Country</option>
                                                                        <option value="AF">Afghanistan</option>
                                                                        <option value="AL">Albania</option>
                                                                        <option value="DZ">Algeria</option>
                                                                        <option value="AS">American Samoa</option>
                                                                        <option value="AD">Andorra</option>
                                                                        <option value="AO">Angola</option>
                                                                        <option value="AI">Anguilla</option>
                                                                        <option value="AQ">Antarctica</option>
                                                                        <option value="AG">Antigua and Barbuda</option>
                                                                        <option value="AR">Argentina</option>
                                                                        <option value="AM">Armenia</option>
                                                                        <option value="AW">Aruba</option>
                                                                        <option value="AU">Australia</option>
                                                                        <option value="AT">Austria</option>
                                                                        <option value="AZ">Azerbaijan</option>
                                                                        <option value="BS">Bahamas</option>
                                                                        <option value="BH">Bahrain</option>
                                                                        <option value="BD">Bangladesh</option>
                                                                        <option value="BB">Barbados</option>
                                                                        <option value="BY">Belarus</option>
                                                                        <option value="BE">Belgium</option>
                                                                        <option value="BZ">Belize</option>
                                                                        <option value="BJ">Benin</option>
                                                                        <option value="BM">Bermuda</option>
                                                                        <option value="BT">Bhutan</option>
                                                                        <option value="BO">Bolivia</option>
                                                                        <option value="BQ">
                                                                            Bonaire, Sint Eustatius and Saba
                                                                        </option>
                                                                        <option value="BA">Bosnia Herzegovina</option>
                                                                        <option value="BW">Botswana</option>
                                                                        <option value="BR">Brazil</option>
                                                                        <option value="IO">
                                                                            British Indian Ocean Territory
                                                                        </option>
                                                                        <option value="VG">British Virgin Islands</option>
                                                                        <option value="BN">Brunei Darussalam</option>
                                                                        <option value="BG">Bulgaria</option>
                                                                        <option value="BF">Burkina Faso</option>
                                                                        <option value="BI">Burundi</option>
                                                                        <option value="KH">Cambodia</option>
                                                                        <option value="CM">Cameroon</option>
                                                                        <option value="CA">Canada</option>
                                                                        <option value="CV">Cape Verde</option>
                                                                        <option value="KY">Cayman Islands</option>
                                                                        <option value="CF">
                                                                            Central African Republic
                                                                        </option>
                                                                        <option value="TD">Chad</option>
                                                                        <option value="CL">Chile</option>
                                                                        <option value="CN">China</option>
                                                                        <option value="CX">Christmas Island</option>
                                                                        <option value="CC">Cocos Islands</option>
                                                                        <option value="CO">Colombia</option>
                                                                        <option value="KM">Comoros</option>
                                                                        <option value="CK">Cook Islands</option>
                                                                        <option value="CR">Costa Rica</option>
                                                                        <option value="HR">Croatia</option>
                                                                        <option value="CU">Cuba</option>
                                                                        <option value="CW">Curacao</option>
                                                                        <option value="CY">Cyprus</option>
                                                                        <option value="CZ">Czech Republic</option>
                                                                        <option value="CD">
                                                                            Democratic Republic of the Congo
                                                                        </option>
                                                                        <option value="DK">Denmark</option>
                                                                        <option value="DJ">Djibouti</option>
                                                                        <option value="DM">Dominica</option>
                                                                        <option value="DO">Dominican Republic</option>
                                                                        <option value="TL">East Timor</option>
                                                                        <option value="EC">Ecuador</option>
                                                                        <option value="EG">Egypt</option>
                                                                        <option value="SV">El Salvador</option>
                                                                        <option value="GQ">Equatorial Guinea</option>
                                                                        <option value="ER">Eritrea</option>
                                                                        <option value="EE">Estonia</option>
                                                                        <option value="SZ">Eswatini</option>
                                                                        <option value="ET">Ethiopia</option>
                                                                        <option value="FK">Falkland Islands</option>
                                                                        <option value="FO">Faroe Islands</option>
                                                                        <option value="FJ">Fiji</option>
                                                                        <option value="FI">Finland</option>
                                                                        <option value="FR">France</option>
                                                                        <option value="GF">French Guiana</option>
                                                                        <option value="PF">French Polynesia</option>
                                                                        <option value="GA">Gabon</option>
                                                                        <option value="GM">Gambia</option>
                                                                        <option value="GE">Georgia</option>
                                                                        <option value="DE">Germany</option>
                                                                        <option value="GH">Ghana</option>
                                                                        <option value="GI">Gibraltar</option>
                                                                        <option value="GR">Greece</option>
                                                                        <option value="GL">Greenland</option>
                                                                        <option value="GD">Grenada</option>
                                                                        <option value="GP">Guadeloupe</option>
                                                                        <option value="GU">Guam</option>
                                                                        <option value="GT">Guatemala</option>
                                                                        <option value="GG">Guernsey</option>
                                                                        <option value="GN">Guinea</option>
                                                                        <option value="GW">Guinea-Bissau</option>
                                                                        <option value="GY">Guyana</option>
                                                                        <option value="HT">Haiti</option>
                                                                        <option value="HM">
                                                                            Heard Island and McDonald Islands
                                                                        </option>
                                                                        <option value="HN">Honduras</option>
                                                                        <option value="HK">Hong Kong</option>
                                                                        <option value="HU">Hungary</option>
                                                                        <option value="IS">Iceland</option>
                                                                        <option value="IN">India</option>
                                                                        <option value="ID">Indonesia</option>
                                                                        <option value="IR">Iran</option>
                                                                        <option value="IQ">Iraq</option>
                                                                        <option value="IE">Ireland</option>
                                                                        <option value="IM">Isle of Man</option>
                                                                        <option value="IL">Israel</option>
                                                                        <option value="IT">Italy</option>
                                                                        <option value="CI">Ivory Coast</option>
                                                                        <option value="JM">Jamaica</option>
                                                                        <option value="JP">Japan</option>
                                                                        <option value="JE">Jersey</option>
                                                                        <option value="JO">Jordan</option>
                                                                        <option value="KZ">Kazakhstan</option>
                                                                        <option value="KE">Kenya</option>
                                                                        <option value="KI">Kiribati</option>
                                                                        <option value="KW">Kuwait</option>
                                                                        <option value="KG">Kyrgyzstan</option>
                                                                        <option value="LA">
                                                                            Lao Peoples Democratic Republic
                                                                        </option>
                                                                        <option value="LV">Latvia</option>
                                                                        <option value="LB">Lebanon</option>
                                                                        <option value="LS">Lesotho</option>
                                                                        <option value="LR">Liberia</option>
                                                                        <option value="LY">Libya</option>
                                                                        <option value="LI">Liechtenstein</option>
                                                                        <option value="LT">Lithuania</option>
                                                                        <option value="LU">Luxembourg</option>
                                                                        <option value="MO">Macau</option>
                                                                        <option value="MG">Madagascar</option>
                                                                        <option value="MW">Malawi</option>
                                                                        <option value="MY">Malaysia</option>
                                                                        <option value="MV">Maldives</option>
                                                                        <option value="ML">Mali</option>
                                                                        <option value="MT">Malta</option>
                                                                        <option value="MH">Marshall Islands</option>
                                                                        <option value="MQ">Martinique</option>
                                                                        <option value="MR">Mauritania</option>
                                                                        <option value="MU">Mauritius</option>
                                                                        <option value="YT">Mayotte</option>
                                                                        <option value="MX">Mexico</option>
                                                                        <option value="FM">Micronesia</option>
                                                                        <option value="MD">Moldova</option>
                                                                        <option value="MC">Monaco</option>
                                                                        <option value="MN">Mongolia</option>
                                                                        <option value="ME">Montenegro</option>
                                                                        <option value="MS">Montserrat</option>
                                                                        <option value="MA">Morocco</option>
                                                                        <option value="MZ">Mozambique</option>
                                                                        <option value="MM">Myanmar</option>
                                                                        <option value="NA">Namibia</option>
                                                                        <option value="NR">Nauru</option>
                                                                        <option value="NP">Nepal</option>
                                                                        <option value="NL">Netherlands</option>
                                                                        <option value="NC">New Caledonia</option>
                                                                        <option value="NZ">New Zealand</option>
                                                                        <option value="NI">Nicaragua</option>
                                                                        <option value="NE">Niger</option>
                                                                        <option value="NG">Nigeria</option>
                                                                        <option value="NU">Niue</option>
                                                                        <option value="NF">Norfolk Island</option>
                                                                        <option value="KP">North Korea</option>
                                                                        <option value="MP">
                                                                            Northern Mariana Islands
                                                                        </option>
                                                                        <option value="NO">Norway</option>
                                                                        <option value="OM">Oman</option>
                                                                        <option value="PK">Pakistan</option>
                                                                        <option value="PW">Palau</option>
                                                                        <option value="PS">
                                                                            Palestinian Territory, Occupied
                                                                        </option>
                                                                        <option value="PA">Panama</option>
                                                                        <option value="PG">Papua New Guinea</option>
                                                                        <option value="PY">Paraguay</option>
                                                                        <option value="PE">Peru</option>
                                                                        <option value="PH">Philippines</option>
                                                                        <option value="PN">Pitcairn</option>
                                                                        <option value="PL">Poland</option>
                                                                        <option value="PT">Portugal</option>
                                                                        <option value="PR">Puerto Rico</option>
                                                                        <option value="QA">Qatar</option>
                                                                        <option value="MK">Republic of Macedonia</option>
                                                                        <option value="CG">Republic of the Congo</option>
                                                                        <option value="RE">Reunion</option>
                                                                        <option value="RO">Romania</option>
                                                                        <option value="RU">Russia</option>
                                                                        <option value="RW">Rwanda</option>
                                                                        <option value="BL">Saint Barthelemy</option>
                                                                        <option value="SH">Saint Helena</option>
                                                                        <option value="MF">Saint Martin</option>
                                                                        <option value="WS">Samoa</option>
                                                                        <option value="SM">San Marino</option>
                                                                        <option value="ST">Sao Tome and Principe</option>
                                                                        <option value="SA">Saudi Arabia</option>
                                                                        <option value="SN">Senegal</option>
                                                                        <option value="RS">Serbia</option>
                                                                        <option value="SC">Seychelles</option>
                                                                        <option value="SL">Sierra Leone</option>
                                                                        <option value="SG">Singapore</option>
                                                                        <option value="SX">Sint Maarten</option>
                                                                        <option value="SK">Slovakia</option>
                                                                        <option value="SI">Slovenia</option>
                                                                        <option value="SB">Solomon Islands</option>
                                                                        <option value="SO">Somalia</option>
                                                                        <option value="ZA">South Africa</option>
                                                                        <option value="GS">
                                                                            South Georgia and the South Sandwich Islands
                                                                        </option>
                                                                        <option value="KR">South Korea</option>
                                                                        <option value="SS">South Sudan</option>
                                                                        <option value="ES">Spain</option>
                                                                        <option value="LK">Sri Lanka</option>
                                                                        <option value="KN">
                                                                            St. Christopher (St. Kitts) Nevis
                                                                        </option>
                                                                        <option value="LC">St. Lucia</option>
                                                                        <option value="PM">
                                                                            St. Pierre and Miquelon
                                                                        </option>
                                                                        <option value="VC">
                                                                            St. Vincent and The Grenadines
                                                                        </option>
                                                                        <option value="SD">Sudan</option>
                                                                        <option value="SR">Suriname</option>
                                                                        <option value="SJ">Svalbard and Jan Mayen</option>
                                                                        <option value="SE">Sweden</option>
                                                                        <option value="CH">Switzerland</option>
                                                                        <option value="SY">Syrian Arab Republic</option>
                                                                        <option value="TW">Taiwan</option>
                                                                        <option value="TJ">Tajikistan</option>
                                                                        <option value="TZ">Tanzania</option>
                                                                        <option value="TH">Thailand</option>
                                                                        <option value="TG">Togo</option>
                                                                        <option value="TK">Tokelau</option>
                                                                        <option value="TO">Tonga</option>
                                                                        <option value="TT">Trinidad and Tobago</option>
                                                                        <option value="TN">Tunisia</option>
                                                                        <option value="TR">Turkey</option>
                                                                        <option value="TM">Turkmenistan</option>
                                                                        <option value="TC">
                                                                            Turks and Caicos Islands
                                                                        </option>
                                                                        <option value="TV">Tuvalu</option>
                                                                        <option value="UG">Uganda</option>
                                                                        <option value="UA">Ukraine</option>
                                                                        <option value="AE">United Arab Emirates</option>
                                                                        <option value="GB">United Kingdom</option>
                                                                        <option value="US">United States</option>
                                                                        <option value="UM">
                                                                            United States Minor Outlying Islands (the)
                                                                        </option>
                                                                        <option value="UY">Uruguay</option>
                                                                        <option value="VI">US Virgin Islands</option>
                                                                        <option value="UZ">Uzbekistan</option>
                                                                        <option value="VU">Vanuatu</option>
                                                                        <option value="VA">Vatican</option>
                                                                        <option value="VE">Venezuela</option>
                                                                        <option value="VN">Vietnam</option>
                                                                        <option value="EH">Western Sahara</option>
                                                                        <option value="YE">Yemen</option>
                                                                        <option value="ZM">Zambia</option>
                                                                        <option value="ZW">Zimbabwe</option>
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
                                                                />
                                                                <div className="error_text">City is required</div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <label className="lable">State</label>
                                                                <input
                                                                    type="text"
                                                                    placeholder=""
                                                                    className="textbox textOnly"
                                                                    id="billstate"
                                                                    name="billstate"
                                                                />
                                                                <div
                                                                    className="select_dropdown statedrop_bill"
                                                                    style={{ display: "none" }}
                                                                >
                                                                    <select
                                                                        className="Select State"
                                                                        id="statecode_bill"
                                                                        name="statecode_bill"
                                                                    >
                                                                        <option value="">Select State</option>
                                                                        <option value="AA">
                                                                            Armed Forces (the) Americas
                                                                        </option>
                                                                        <option value="AE">Armed Forces Europe</option>
                                                                        <option value="AE">Armed Forces Africa</option>
                                                                        <option value="AE">
                                                                            Armed Forces Middle East
                                                                        </option>
                                                                        <option value="AE">Armed Forces Canada</option>
                                                                        <option value="AP">Armed Forces Pacific</option>
                                                                        <option value="AL">Alabama</option>
                                                                        <option value="AK">Alaska</option>
                                                                        <option value="AZ">Arizona</option>
                                                                        <option value="AR">Arkansas</option>
                                                                        <option value="CA">California</option>
                                                                        <option value="CO">Colorado</option>
                                                                        <option value="CT">Connecticut</option>
                                                                        <option value="DE">Delaware</option>
                                                                        <option value="DC">District of Columbia</option>
                                                                        <option value="FL">Florida</option>
                                                                        <option value="GA">Georgia</option>
                                                                        <option value="HI">Hawaii</option>
                                                                        <option value="ID">Idaho</option>
                                                                        <option value="IL">Illinois</option>
                                                                        <option value="IN">Indiania</option>
                                                                        <option value="IA">Iowa</option>
                                                                        <option value="KS">Kansas</option>
                                                                        <option value="KY">Kentucky</option>
                                                                        <option value="LA">Louisiana</option>
                                                                        <option value="ME">Maine</option>
                                                                        <option value="MD">Maryland</option>
                                                                        <option value="MA">Massachusetts</option>
                                                                        <option value="MI">Michigan</option>
                                                                        <option value="MN">Minnesota</option>
                                                                        <option value="MS">Mississippi</option>
                                                                        <option value="MO">Missouri</option>
                                                                        <option value="MT">Montana</option>
                                                                        <option value="NE">Nebraska</option>
                                                                        <option value="NV">Nevada</option>
                                                                        <option value="NH">New Hampshire</option>
                                                                        <option value="NJ">New Jersey</option>
                                                                        <option value="NM">New Mexico</option>
                                                                        <option value="NY">New York</option>
                                                                        <option value="NC">North Carolina</option>
                                                                        <option value="ND">North Dakota</option>
                                                                        <option value="OH">Ohio</option>
                                                                        <option value="OK">Oklahoma</option>
                                                                        <option value="OR">Oregon</option>
                                                                        <option value="PA">Pennsylvania</option>
                                                                        <option value="RI">Rhode Island</option>
                                                                        <option value="SC">South Carolina</option>
                                                                        <option value="SD">South Dakota</option>
                                                                        <option value="TN">Tennessee</option>
                                                                        <option value="TX">Texas</option>
                                                                        <option value="UT">Utah</option>
                                                                        <option value="VT">Vermont</option>
                                                                        <option value="VA">Virginia</option>
                                                                        <option value="WA">Washington</option>
                                                                        <option value="WV">West Virginia</option>
                                                                        <option value="WI">Wisconsin</option>
                                                                        <option value="WY">Wyoming</option>
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
                                                                />
                                                                <div className="error_text">
                                                                    Billing Phone is required
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button
                                                            className="button pull-right mt_mob"
                                                            type="button"
                                                            onclick="submitbilling_details()"
                                                        >
                                                            Save{" "}
                                                            <span
                                                                className="button_loding_div"
                                                                style={{ display: "none" }}
                                                            >
                                                                <i className="button_loader blnk" />
                                                            </span>
                                                        </button>
                                                        <button
                                                            className="button pull-right grayBtn mt_mob"
                                                            onclick="hidediv('billing_infoform','billing_infoDetail')"
                                                            type="button"
                                                        >
                                                            cancel
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                            {/*  \ add new address End here / */}
                                        </div>
                                        {/* My billing detail tab Start here */}
                                        {/* travelers tab Start here */}
                                        <div
                                            className="tabContent"
                                            id="tab4C"
                                            style={{ display: "none" }}
                                        >
                                            {/*  / Add traveller Start here \ */}
                                            <div className="formBox">
                                                <div className="row">
                                                    <div className="col-sm-12 title">
                                                        <button
                                                            className="button pull-right travller"
                                                            onclick="openmodel('0')"
                                                            type="button"
                                                        >
                                                            ADD TRAVELER
                                                        </button>
                                                        <h2>My Traveler's</h2>
                                                        <div>You can add your traveler details</div>
                                                    </div>
                                                </div>
                                                <div id="traveler_infoDetail">
                                                    <div className="row" id="traveler_htm"></div>
                                                </div>
                                            </div>
                                            {/*  \ Add traveller End here / */}
                                        </div>
                                        {/* travelers tab Start here */}
                                    </div>
                                </div>
                                {/* {showMyTrip && (
                             
                            )} */}

                                <div className="rightCntr" id="mytrip" style={{ display: "block" }}>
                                    <div className="tabBox">
                                        <ul className="tabs">
                                            <li>
                                                <a onclick="booking_details('1')" className="active ac ac1">
                                                    Upcoming
                                                </a>
                                            </li>
                                            <li>
                                                <a onclick="booking_details('2')" className="ac ac2">
                                                    Completed
                                                </a>
                                            </li>
                                            <li>
                                                <a onclick="booking_details('3')" className="ac ac3">
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
                                            <div className="table-responsive">
                                                <table className="table text-center table-bordered">
                                                    <thead>
                                                        <tr>
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
                                                        <tr className="norecord">
                                                            <td colSpan={7}>
                                                                {" "}
                                                                <div className="alert alert-danger" role="alert">
                                                                    No record found
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        id="loadingimg"
                                        className="loading"
                                        style={{ display: "none" }}
                                    >
                                        <img
                                            src="/assets/us/profile/profile/images/loader.gif"
                                            alt="loading image"
                                        />
                                        <span>Loading...</span>
                                    </div>
                                </div>
                                <div className="rightCntr" id="offers">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h2 className="main_title">Use these Promo Codes!</h2>
                                        </div>
                                    </div>
                                    {/*  / tabBox Start here \ */}
                                    <div className="travelCouponBox">
                                        <div className="row">
                                            <div className="col-md-6 col-sm-6 ">
                                                <figure
                                                    className="travel-img"
                                                    style={{
                                                        background:
                                                            "url(/us/profile/profile/lbyf/images/offer/economy.png) left top no-repeat",
                                                        backgroundSize: "cover"
                                                    }}
                                                />
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <div className="coupon-top">
                                                    <h3>Fly Economy on the cheap!</h3>
                                                    <p>
                                                        Use promo code{" "}
                                                        <strong className="text-color"> Trip10</strong> and get up
                                                        to{" "}
                                                        <strong className="text-color">
                                                            {" "}
                                                            $10 off<sup>*</sup>
                                                        </strong>
                                                        <span className="review_tnc">
                                                            * Review the terms and conditions for this offer
                                                        </span>
                                                    </p>
                                                    <div className="custom-tooltip">
                                                        <a className="learn_more" href="javascript:void(0);">
                                                            Learn more
                                                        </a>
                                                        <div className="tooltip_detail text-left">
                                                            <span className="arrow" />
                                                            <span>
                                                                <strong>T&amp;C:</strong>The said promo code is only
                                                                applicable on the bookings of flight tickets. The
                                                                promo code is required to be applied during the
                                                                checkout. The promo code displayed offers discounts on
                                                                the service fees charged by us. With this promo code,
                                                                a passenger can avail of the discount of $10 at most.
                                                                The said promo code cannot be clubbed or used along
                                                                with any other special offer, promo code, or
                                                                promotion. The promo code will strictly be applicable
                                                                on the basis of searched route, selected cabin class,
                                                                and other related factors. This promo code can be
                                                                discontinued at any point in time without prior
                                                                notice. The promo code can be used only once by a
                                                                single person.{" "}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="travelCouponBox">
                                        <div className="row">
                                            <div className="col-md-6 col-sm-6">
                                                <figure
                                                    className="travel-img"
                                                    style={{
                                                        background:
                                                            "url(/us/profile/profile/lbyf/images/offer/business.png) left top no-repeat",
                                                        backgroundSize: "cover"
                                                    }}
                                                />
                                            </div>
                                            <div className="col-md-6 col-sm-6 ">
                                                <div className="coupon-top">
                                                    <h3>Buy Business class ticket at low Prices! </h3>
                                                    <p>
                                                        Use promo code{" "}
                                                        <strong className="text-color"> Trip30</strong> and get up
                                                        to{" "}
                                                        <strong className="text-color">
                                                            {" "}
                                                            $120 off<sup>*</sup>
                                                        </strong>
                                                        <span className="review_tnc">
                                                            * Review the terms and conditions for this offer
                                                        </span>
                                                    </p>
                                                    <div className="custom-tooltip">
                                                        <a className="learn_more" href="javascript:void(0);">
                                                            Learn more
                                                        </a>
                                                        <div className="tooltip_detail text-left">
                                                            <span className="arrow" />
                                                            <span>
                                                                <strong>T&amp;C:</strong> The said promo code is only
                                                                applicable on the bookings of flight tickets. The
                                                                promo code is required to be applied during the
                                                                checkout. The promo code displayed offers discounts on
                                                                the service fees charged by us. With this promo code,
                                                                a customer can avail of the discount of $30 per
                                                                passenger at most; a minimum of 4 passengers is
                                                                required to redeem the full amount of the promo code.
                                                                The said promo code cannot be clubbed or used along
                                                                with any other special offer, promo code, or
                                                                promotion. The promo code will strictly be applicable
                                                                on the basis of the searched route, selected cabin
                                                                class, and other related factors. This promo code can
                                                                be discontinued at any point in time without prior
                                                                notice. The promo code can be used only once by a
                                                                single person.{" "}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="travelCouponBox">
                                        <div className="row">
                                            <div className="col-md-6 col-sm-6 ">
                                                <figure
                                                    className="travel-img"
                                                    style={{
                                                        background:
                                                            "url(/us/profile/profile/lbyf/images/offer/first.png) left top no-repeat",
                                                        backgroundSize: "cover"
                                                    }}
                                                />
                                            </div>
                                            <div className="col-md-6 col-sm-6 ">
                                                <div className="coupon-top">
                                                    <h3>Save big bucks on First Class!</h3>
                                                    <p>
                                                        Use promo code{" "}
                                                        <strong className="text-color"> Trip40 </strong> and get
                                                        up to{" "}
                                                        <strong className="text-color">
                                                            {" "}
                                                            $160 off<sup>*</sup>
                                                        </strong>
                                                        <span className="review_tnc">
                                                            * Review the terms and conditions for this offer
                                                        </span>
                                                    </p>
                                                    <div className="custom-tooltip">
                                                        <a className="learn_more" href="javascript:void(0);">
                                                            Learn more
                                                        </a>
                                                        <div className="tooltip_detail text-left">
                                                            <span className="arrow" />
                                                            <span>
                                                                <strong>T&amp;C:</strong>The said promo code is only
                                                                applicable on the bookings of flight tickets. The
                                                                promo code is required to be applied during the
                                                                checkout. The promo code displayed offers discounts on
                                                                the service fees charged by us. With this promo code,
                                                                a customer can avail of the discount of $40 per
                                                                passenger at most; a minimum of 4 passengers is
                                                                required to redeem the full amount of the promo code.
                                                                The said promo code cannot be clubbed or used along
                                                                with any other special offer, promo code, or
                                                                promotion. The promo code will strictly be applicable
                                                                on the basis of the searched route, selected cabin
                                                                class, and other related factors. This promo code can
                                                                be discontinued at any point in time without prior
                                                                notice. The promo code can be used only once by a
                                                                single person.{" "}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="rightCntr" id="settings">
                                    <h2 className="main_title">Settings</h2>
                                    {/*  / Change password Start here \ */}
                                    <div className="formBox">
                                        <div className="row">
                                            <div className="col-sm-12 title">
                                                <h2>Reset Your pin</h2>
                                            </div>
                                        </div>
                                        <div id="personal_infoform">
                                            <p>
                                                Enter the email you use for JetQuinsTravels and we'll send your
                                                instructions to reset your pin
                                            </p>
                                            <form id="reset_Req" name="reset_Req">
                                                <div
                                                    id="Messageloginsup_settings"
                                                    style={{ display: "none" }}
                                                    className="alert alert-danger"
                                                >
                                                    Invalid credentials provided.Please try again.
                                                </div>
                                                <div
                                                    id="MessageSuccess_settings"
                                                    style={{ display: "none" }}
                                                    className="alert alert-success"
                                                >
                                                    Pin changed successfully.
                                                </div>
                                                <div className="row form-group">
                                                    <div className="col-sm-6">
                                                        <label className="label">
                                                            Old Pin<sup className="star">*</sup>
                                                        </label>
                                                        <input
                                                            id="user_oldpin"
                                                            name="oldpin"
                                                            maxLength={4}
                                                            minLength={4}
                                                            type="password"
                                                            className="textbox numbersOnly"
                                                        />
                                                        <div className="error_text">Old Pin is required</div>
                                                    </div>
                                                </div>
                                                <div className="row form-group">
                                                    <div className="col-sm-6">
                                                        <label className="label">
                                                            New Pin<sup className="star">*</sup>
                                                        </label>
                                                        <input
                                                            id="user_newpin"
                                                            name="newpin"
                                                            maxLength={4}
                                                            minLength={4}
                                                            type="password"
                                                            className="textbox numbersOnly"
                                                        />
                                                        <div className="error_text">New Pin is required</div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <label className="label">
                                                            Confirm Pin<sup className="star">*</sup>
                                                        </label>
                                                        <input
                                                            id="user_confirmpin"
                                                            name="confirmpin"
                                                            maxLength={4}
                                                            minLength={4}
                                                            type="password"
                                                            className="textbox numbersOnly"
                                                        />
                                                        <div className="error_text">Confirm Pin is required</div>
                                                    </div>
                                                </div>
                                                <button
                                                    className="button pull-right mt_mob"
                                                    onclick="submitReset()"
                                                    type="button"
                                                >
                                                    Reset{" "}
                                                    <span
                                                        className="button_loding_div"
                                                        style={{ display: "none" }}
                                                    >
                                                        <i className="button_loader blnk" />
                                                    </span>
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    {/*  \ Change password End here / */}
                                </div>
                                <div className="rightCntr" id="writeus">
                                    <div
                                        id="Messageloginsup_writeus"
                                        style={{ display: "none" }}
                                        className="alert alert-danger"
                                    >
                                        Invalid credentials provided.Please try again.
                                    </div>
                                    <div
                                        id="MessageSuccess_writeus"
                                        style={{ display: "none" }}
                                        className="alert alert-success"
                                    >
                                        Your Feedback is submitted successfully.
                                    </div>
                                    <h2 className="main_title">Write To Us</h2>
                                    {/*  / Change password Start here \ */}
                                    <div className="formBox">
                                        <div id="personal_infoform">
                                            <form id="writeus_Reqform" name="writeus_Reqform">
                                                <div className="row">
                                                    <div className="col-sm-7">
                                                        <div className="row form-group">
                                                            <div className="col-sm-12">
                                                                <label className="label">
                                                                    Please select your feedback category below{" "}
                                                                    <sup className="star"> *</sup>
                                                                </label>
                                                                <div className="select_dropdown">
                                                                    <select id="user_category" name="category">
                                                                        <option value="">Select Category</option>
                                                                        <option value="Cancellation">Cancellation</option>
                                                                        <option value="Refund">Refund</option>
                                                                        <option value="Chargeback">Chargeback</option>
                                                                        <option value="Customer service">
                                                                            Customer service
                                                                        </option>
                                                                        <option value="Technical Issue">
                                                                            Technical Issue
                                                                        </option>
                                                                        <option value="Feedback">Feedback</option>
                                                                        <option value="Other">Other</option>
                                                                    </select>
                                                                    <div className="error_text">
                                                                        feedback category is required
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="row form-group experience"
                                                            style={{ display: "none" }}
                                                        >
                                                            <div className="col-sm-12 inputSet">
                                                                <label className="label" style={{ paddingLeft: 0 }}>
                                                                    Overall Experience
                                                                </label>
                                                                <label>
                                                                    <input
                                                                        name="Experience"
                                                                        type="radio"
                                                                        defaultChecked=""
                                                                        defaultValue="Excellent"
                                                                    />
                                                                    <span>Excellent</span>
                                                                </label>
                                                                <label>
                                                                    <input
                                                                        name="Experience"
                                                                        type="radio"
                                                                        defaultValue="Great"
                                                                    />
                                                                    <span>Great</span>
                                                                </label>
                                                                <label>
                                                                    <input
                                                                        name="Experience"
                                                                        type="radio"
                                                                        defaultValue="Average"
                                                                    />
                                                                    <span>Average</span>
                                                                </label>
                                                                <label>
                                                                    <input
                                                                        name="Experience"
                                                                        type="radio"
                                                                        defaultValue="Poor"
                                                                    />
                                                                    <span>Poor</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <div className="col-sm-12">
                                                                <label className="label">
                                                                    Is there anything you would like to tell us?
                                                                    <sup className="star"> *</sup>
                                                                </label>
                                                                <textarea
                                                                    rows={4}
                                                                    cols={4}
                                                                    className="textbox"
                                                                    id="user_feedback"
                                                                    name="feedback"
                                                                    defaultValue={""}
                                                                />
                                                                <div className="error_text">feedback is required</div>
                                                            </div>
                                                        </div>
                                                        <button
                                                            className="button mt_mob"
                                                            onclick="submitfeedback()"
                                                            type="button"
                                                        >
                                                            Submit{" "}
                                                            <span
                                                                className="button_loding_div"
                                                                style={{ display: "none" }}
                                                            >
                                                                <i className="button_loader blnk" />
                                                            </span>
                                                        </button>
                                                    </div>
                                                    <div className="col-sm-5">
                                                        <h4>USA Office</h4>
                                                        <div className="contact-block">
                                                            <div className="row">
                                                                <div className="col-sm-12">
                                                                    <address>
                                                                        <i className="fa fa-map-marker" />
                                                                        <span>
                                                                            A Red Diamond Affair LLC, 1 Meadowlands Plaza
                                                                            Suite 200, East Rutherford, NJ 07073
                                                                        </span>
                                                                    </address>
                                                                </div>
                                                                <div className="col-sm-12">
                                                                    <i className="fa fa-phone" />
                                                                    <a href="tel:+1-248-274-7239">+1-248-274-7239</a>
                                                                </div>
                                                                <div className="col-sm-12">
                                                                    <i className="fa fa-envelope-o" />
                                                                    <a href="mailto:support@lookbyfare.com">
                                                                        support@lookbyfare.com
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    {/*  \ Change password End here / */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  \ Profile container / */}
                    {/*  \ wrapper / */}
                    {/* Add Traveller end here*/}
                    <div className="modal" id="addModal">
                        <div className="modal-dialog">
                            <div className="modal-content formBox">
                                {/* Modal Header */}
                                <div className="modal-header">
                                    <h4 className="modal-title">Traveler </h4>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                    />
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
                                                    className="textbox textOnly"
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
                                                    name="Laname"
                                                    className="textbox textOnly"
                                                />
                                                <div className="error_text">Last Name is required</div>
                                            </div>
                                            <div className="col-sm-6">
                                                <label className="label">
                                                    Gender<sup className="star">*</sup>
                                                </label>
                                                <div className="select_dropdown">
                                                    <select id="user_genderpopup" name="genderpopup">
                                                        <option value="">Select Gender</option>
                                                        <option value={1}>Male</option>
                                                        <option value={2}>Female </option>
                                                    </select>
                                                    <div className="error_text">Gender is required</div>
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
                                                            className="textbox hasDatepicker"
                                                            id="user_dobid"
                                                            name="dobid"
                                                        />
                                                        <i className="fa fa-calendar" aria-hidden="true" />
                                                        <div className="error_text">
                                                            Date of Birth is required
                                                        </div>
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
                                                        className="Select Country"
                                                        data-val="true"
                                                        data-val-required="The nationality field is required."
                                                        id="user_nationality"
                                                        name="nationality"
                                                    >
                                                        <option value="">Select Country</option>
                                                        <option value="AF">Afghanistan</option>
                                                        <option value="AL">Albania</option>
                                                        <option value="DZ">Algeria</option>
                                                        <option value="AS">American Samoa</option>
                                                        <option value="AD">Andorra</option>
                                                        <option value="AO">Angola</option>
                                                        <option value="AI">Anguilla</option>
                                                        <option value="AQ">Antarctica</option>
                                                        <option value="AG">Antigua and Barbuda</option>
                                                        <option value="AR">Argentina</option>
                                                        <option value="AM">Armenia</option>
                                                        <option value="AW">Aruba</option>
                                                        <option value="AU">Australia</option>
                                                        <option value="AT">Austria</option>
                                                        <option value="AZ">Azerbaijan</option>
                                                        <option value="BS">Bahamas</option>
                                                        <option value="BH">Bahrain</option>
                                                        <option value="BD">Bangladesh</option>
                                                        <option value="BB">Barbados</option>
                                                        <option value="BY">Belarus</option>
                                                        <option value="BE">Belgium</option>
                                                        <option value="BZ">Belize</option>
                                                        <option value="BJ">Benin</option>
                                                        <option value="BM">Bermuda</option>
                                                        <option value="BT">Bhutan</option>
                                                        <option value="BO">Bolivia</option>
                                                        <option value="BQ">
                                                            Bonaire, Sint Eustatius and Saba
                                                        </option>
                                                        <option value="BA">Bosnia Herzegovina</option>
                                                        <option value="BW">Botswana</option>
                                                        <option value="BR">Brazil</option>
                                                        <option value="IO">British Indian Ocean Territory</option>
                                                        <option value="VG">British Virgin Islands</option>
                                                        <option value="BN">Brunei Darussalam</option>
                                                        <option value="BG">Bulgaria</option>
                                                        <option value="BF">Burkina Faso</option>
                                                        <option value="BI">Burundi</option>
                                                        <option value="KH">Cambodia</option>
                                                        <option value="CM">Cameroon</option>
                                                        <option value="CA">Canada</option>
                                                        <option value="CV">Cape Verde</option>
                                                        <option value="KY">Cayman Islands</option>
                                                        <option value="CF">Central African Republic</option>
                                                        <option value="TD">Chad</option>
                                                        <option value="CL">Chile</option>
                                                        <option value="CN">China</option>
                                                        <option value="CX">Christmas Island</option>
                                                        <option value="CC">Cocos Islands</option>
                                                        <option value="CO">Colombia</option>
                                                        <option value="KM">Comoros</option>
                                                        <option value="CK">Cook Islands</option>
                                                        <option value="CR">Costa Rica</option>
                                                        <option value="HR">Croatia</option>
                                                        <option value="CU">Cuba</option>
                                                        <option value="CW">Curacao</option>
                                                        <option value="CY">Cyprus</option>
                                                        <option value="CZ">Czech Republic</option>
                                                        <option value="CD">
                                                            Democratic Republic of the Congo
                                                        </option>
                                                        <option value="DK">Denmark</option>
                                                        <option value="DJ">Djibouti</option>
                                                        <option value="DM">Dominica</option>
                                                        <option value="DO">Dominican Republic</option>
                                                        <option value="TL">East Timor</option>
                                                        <option value="EC">Ecuador</option>
                                                        <option value="EG">Egypt</option>
                                                        <option value="SV">El Salvador</option>
                                                        <option value="GQ">Equatorial Guinea</option>
                                                        <option value="ER">Eritrea</option>
                                                        <option value="EE">Estonia</option>
                                                        <option value="SZ">Eswatini</option>
                                                        <option value="ET">Ethiopia</option>
                                                        <option value="FK">Falkland Islands</option>
                                                        <option value="FO">Faroe Islands</option>
                                                        <option value="FJ">Fiji</option>
                                                        <option value="FI">Finland</option>
                                                        <option value="FR">France</option>
                                                        <option value="GF">French Guiana</option>
                                                        <option value="PF">French Polynesia</option>
                                                        <option value="GA">Gabon</option>
                                                        <option value="GM">Gambia</option>
                                                        <option value="GE">Georgia</option>
                                                        <option value="DE">Germany</option>
                                                        <option value="GH">Ghana</option>
                                                        <option value="GI">Gibraltar</option>
                                                        <option value="GR">Greece</option>
                                                        <option value="GL">Greenland</option>
                                                        <option value="GD">Grenada</option>
                                                        <option value="GP">Guadeloupe</option>
                                                        <option value="GU">Guam</option>
                                                        <option value="GT">Guatemala</option>
                                                        <option value="GG">Guernsey</option>
                                                        <option value="GN">Guinea</option>
                                                        <option value="GW">Guinea-Bissau</option>
                                                        <option value="GY">Guyana</option>
                                                        <option value="HT">Haiti</option>
                                                        <option value="HM">
                                                            Heard Island and McDonald Islands
                                                        </option>
                                                        <option value="HN">Honduras</option>
                                                        <option value="HK">Hong Kong</option>
                                                        <option value="HU">Hungary</option>
                                                        <option value="IS">Iceland</option>
                                                        <option value="IN">India</option>
                                                        <option value="ID">Indonesia</option>
                                                        <option value="IR">Iran</option>
                                                        <option value="IQ">Iraq</option>
                                                        <option value="IE">Ireland</option>
                                                        <option value="IM">Isle of Man</option>
                                                        <option value="IL">Israel</option>
                                                        <option value="IT">Italy</option>
                                                        <option value="CI">Ivory Coast</option>
                                                        <option value="JM">Jamaica</option>
                                                        <option value="JP">Japan</option>
                                                        <option value="JE">Jersey</option>
                                                        <option value="JO">Jordan</option>
                                                        <option value="KZ">Kazakhstan</option>
                                                        <option value="KE">Kenya</option>
                                                        <option value="KI">Kiribati</option>
                                                        <option value="KW">Kuwait</option>
                                                        <option value="KG">Kyrgyzstan</option>
                                                        <option value="LA">
                                                            Lao Peoples Democratic Republic
                                                        </option>
                                                        <option value="LV">Latvia</option>
                                                        <option value="LB">Lebanon</option>
                                                        <option value="LS">Lesotho</option>
                                                        <option value="LR">Liberia</option>
                                                        <option value="LY">Libya</option>
                                                        <option value="LI">Liechtenstein</option>
                                                        <option value="LT">Lithuania</option>
                                                        <option value="LU">Luxembourg</option>
                                                        <option value="MO">Macau</option>
                                                        <option value="MG">Madagascar</option>
                                                        <option value="MW">Malawi</option>
                                                        <option value="MY">Malaysia</option>
                                                        <option value="MV">Maldives</option>
                                                        <option value="ML">Mali</option>
                                                        <option value="MT">Malta</option>
                                                        <option value="MH">Marshall Islands</option>
                                                        <option value="MQ">Martinique</option>
                                                        <option value="MR">Mauritania</option>
                                                        <option value="MU">Mauritius</option>
                                                        <option value="YT">Mayotte</option>
                                                        <option value="MX">Mexico</option>
                                                        <option value="FM">Micronesia</option>
                                                        <option value="MD">Moldova</option>
                                                        <option value="MC">Monaco</option>
                                                        <option value="MN">Mongolia</option>
                                                        <option value="ME">Montenegro</option>
                                                        <option value="MS">Montserrat</option>
                                                        <option value="MA">Morocco</option>
                                                        <option value="MZ">Mozambique</option>
                                                        <option value="MM">Myanmar</option>
                                                        <option value="NA">Namibia</option>
                                                        <option value="NR">Nauru</option>
                                                        <option value="NP">Nepal</option>
                                                        <option value="NL">Netherlands</option>
                                                        <option value="NC">New Caledonia</option>
                                                        <option value="NZ">New Zealand</option>
                                                        <option value="NI">Nicaragua</option>
                                                        <option value="NE">Niger</option>
                                                        <option value="NG">Nigeria</option>
                                                        <option value="NU">Niue</option>
                                                        <option value="NF">Norfolk Island</option>
                                                        <option value="KP">North Korea</option>
                                                        <option value="MP">Northern Mariana Islands</option>
                                                        <option value="NO">Norway</option>
                                                        <option value="OM">Oman</option>
                                                        <option value="PK">Pakistan</option>
                                                        <option value="PW">Palau</option>
                                                        <option value="PS">
                                                            Palestinian Territory, Occupied
                                                        </option>
                                                        <option value="PA">Panama</option>
                                                        <option value="PG">Papua New Guinea</option>
                                                        <option value="PY">Paraguay</option>
                                                        <option value="PE">Peru</option>
                                                        <option value="PH">Philippines</option>
                                                        <option value="PN">Pitcairn</option>
                                                        <option value="PL">Poland</option>
                                                        <option value="PT">Portugal</option>
                                                        <option value="PR">Puerto Rico</option>
                                                        <option value="QA">Qatar</option>
                                                        <option value="MK">Republic of Macedonia</option>
                                                        <option value="CG">Republic of the Congo</option>
                                                        <option value="RE">Reunion</option>
                                                        <option value="RO">Romania</option>
                                                        <option value="RU">Russia</option>
                                                        <option value="RW">Rwanda</option>
                                                        <option value="BL">Saint Barthelemy</option>
                                                        <option value="SH">Saint Helena</option>
                                                        <option value="MF">Saint Martin</option>
                                                        <option value="WS">Samoa</option>
                                                        <option value="SM">San Marino</option>
                                                        <option value="ST">Sao Tome and Principe</option>
                                                        <option value="SA">Saudi Arabia</option>
                                                        <option value="SN">Senegal</option>
                                                        <option value="RS">Serbia</option>
                                                        <option value="SC">Seychelles</option>
                                                        <option value="SL">Sierra Leone</option>
                                                        <option value="SG">Singapore</option>
                                                        <option value="SX">Sint Maarten</option>
                                                        <option value="SK">Slovakia</option>
                                                        <option value="SI">Slovenia</option>
                                                        <option value="SB">Solomon Islands</option>
                                                        <option value="SO">Somalia</option>
                                                        <option value="ZA">South Africa</option>
                                                        <option value="GS">
                                                            South Georgia and the South Sandwich Islands
                                                        </option>
                                                        <option value="KR">South Korea</option>
                                                        <option value="SS">South Sudan</option>
                                                        <option value="ES">Spain</option>
                                                        <option value="LK">Sri Lanka</option>
                                                        <option value="KN">
                                                            St. Christopher (St. Kitts) Nevis
                                                        </option>
                                                        <option value="LC">St. Lucia</option>
                                                        <option value="PM">St. Pierre and Miquelon</option>
                                                        <option value="VC">St. Vincent and The Grenadines</option>
                                                        <option value="SD">Sudan</option>
                                                        <option value="SR">Suriname</option>
                                                        <option value="SJ">Svalbard and Jan Mayen</option>
                                                        <option value="SE">Sweden</option>
                                                        <option value="CH">Switzerland</option>
                                                        <option value="SY">Syrian Arab Republic</option>
                                                        <option value="TW">Taiwan</option>
                                                        <option value="TJ">Tajikistan</option>
                                                        <option value="TZ">Tanzania</option>
                                                        <option value="TH">Thailand</option>
                                                        <option value="TG">Togo</option>
                                                        <option value="TK">Tokelau</option>
                                                        <option value="TO">Tonga</option>
                                                        <option value="TT">Trinidad and Tobago</option>
                                                        <option value="TN">Tunisia</option>
                                                        <option value="TR">Turkey</option>
                                                        <option value="TM">Turkmenistan</option>
                                                        <option value="TC">Turks and Caicos Islands</option>
                                                        <option value="TV">Tuvalu</option>
                                                        <option value="UG">Uganda</option>
                                                        <option value="UA">Ukraine</option>
                                                        <option value="AE">United Arab Emirates</option>
                                                        <option value="GB">United Kingdom</option>
                                                        <option value="US">United States</option>
                                                        <option value="UM">
                                                            United States Minor Outlying Islands (the)
                                                        </option>
                                                        <option value="UY">Uruguay</option>
                                                        <option value="VI">US Virgin Islands</option>
                                                        <option value="UZ">Uzbekistan</option>
                                                        <option value="VU">Vanuatu</option>
                                                        <option value="VA">Vatican</option>
                                                        <option value="VE">Venezuela</option>
                                                        <option value="VN">Vietnam</option>
                                                        <option value="EH">Western Sahara</option>
                                                        <option value="YE">Yemen</option>
                                                        <option value="ZM">Zambia</option>
                                                        <option value="ZW">Zimbabwe</option>
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
                                        type="button"
                                        className="btn button grayBtn"
                                        data-bs-dismiss="modal"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        id="addbtn"
                                        style={{ display: "none" }}
                                        className="btn button"
                                        onclick="submitPassenger_details()"
                                    >
                                        Save{" "}
                                        <span className="button_loding_div" style={{ display: "none" }}>
                                            <i className="button_loader blnk" />
                                        </span>
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
                    {/* delete tooltip start here*/}
                    <div className="modal" id="delModal">
                        <div className="modal-dialog">
                            <div className="modal-content formBox">
                                <button
                                    type="button"
                                    className="btn-close close"
                                    data-bs-dismiss="modal"
                                />
                                {/* Modal body */}
                                <div className="modal-body">
                                    <div className="delete_record">
                                        <img src="/assets/us/profile/profile/images/cross.png" alt="" />
                                        <h3>Are you sure?</h3>
                                        <p>Do you really want to delete these records?</p>
                                    </div>
                                </div>
                                {/* Modal footer */}
                                <div className="modal-footer mx-auto no-border-top">
                                    <button
                                        type="button"
                                        className="btn button grayBtn"
                                        data-bs-dismiss="modal"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="btn button delete"
                                        onclick="DeletePassenger_details()"
                                    >
                                        Delete{" "}
                                        <span className="button_loding_div" style={{ display: "none" }}>
                                            <i className="button_loader blnk" />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="moreinfodiv"></div>
                    <link
                        href="/assets/us/profile/profile/css/payment-style.css"
                        rel="stylesheet"
                    />
                </main>
            </div>

            {/* Footer */}
            <footer>
                <div className="footer-component">
                    <div className="copyright-block">
                        <div className="container">
                            <div _ngcontent-crx-c2="">
                                <b _ngcontent-crx-c2="">Disclaimer:</b>
                                <div className="discalimer">
                                    JetQuinsTravels is an independent travel portal. Its parent company is A
                                    Red Diamond Affair LLC. The information that's displayed on this
                                    website, www.lookbyfare.com, is for general purposes. All the
                                    necessary steps have been taken to ensure that the information
                                    displayed in the website is accurate and up- to-date. However, under
                                    no circumstance, We do not provide any warranty or representation,
                                    whether implied or expressed, when it comes to the accuracy,
                                    completeness or reliability of the information displayed on the
                                    website. If you need to have any queries answered, you can write to
                                    us at{" "}
                                    <a href="mailto:support@lookbyfare.com">support@lookbyfare.com</a>
                                </div>
                            </div>
                            <div className="copyright">
                                {" "}
                                Copyright © 2019-2024 • A Red Diamond Affair LLC, 1 Meadowlands Plaza
                                Suite 200, East Rutherford, NJ 07073{" "}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>


        </>

    )

}

export default MyBooking;