'use client';

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { fireStore } from "@/app/_components/firebase/config";
import { toast } from "react-toastify";

const Footer = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async () => {
        // Trim and validate form data
        const trimmedData = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
        };

        // Log form data
        console.log("Form Data being submitted:", trimmedData);

        // Check for empty fields
        if (!trimmedData.name || !trimmedData.email || !trimmedData.phone) {
            setMessage("All fields are required.");
            alert("All fields are required");
            return;
        }

        try {
            // Add subscription to Firestore
            await addDoc(collection(fireStore, "subscriptions"), trimmedData);

            // Clear message and set success state
            setMessage("");
            setSuccess(true);
            toast.success("Your email ID has been added successfully.");

            // Reset form data
            setFormData({ name: "", email: "", phone: "" });
        } catch (error) {
            console.error("Error saving subscription: ", error);
            toast.error("An error occurred while saving your subscription.");
            setMessage("An error occurred. Please try again later.");
        }
    };


    const closePopup = () => {
        setSuccess(false);
    };



    return <>
        <footer style={{ backgroundColor: "#1f525e" }} className="footer_block">
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="footer__link">
                                <div className="holder">
                                    <div className="column">
                                        <h4>Quick Links</h4>
                                        <ul>
                                            <li><a href="/about-us" title="About us">About Us</a></li>
                                            <li><a href="/contact-us" title="Contact us">Contact Us</a></li>
                                            <li><a href="/cancellation-policy" title="Cancelation Policy">Cancelation
                                                Policy</a></li>
                                            <li><a href="/privacy-policy" title="Privacy Policy">Privacy Policy</a>
                                            </li>
                                            <li><a href="/california-privacy-notice" title="Your California Privacy" >Your California Privacy
                                                Rights</a></li>
                                            <li><a href="/taxes-fee#post-ticketing" title="Post-Ticketing Fees">Post-Ticketing Fees</a></li>
                                            <li><a href="/taxes-fee" title="Taxes &amp; Fees">Taxes &amp; Fees</a>
                                            </li>
                                            <li><a href="/baggage-fees" title="Baggage Fees">Baggage Fees</a></li>
                                            <li><a href="/web-checkin" title="web-checkin">Online Check-In</a>
                                            </li>
                                            <li><a href="/terms-conditions" title="Terms and Conditions">Terms and
                                                Conditions</a></li>
                                            <li><a href="/blogs" title="Travel Blog">Travel Blogs</a></li>
                                            {/* <li><a href="/assets/site-map.html" title="Sitemap">Sitemap</a></li> */}
                                        </ul>
                                    </div>
                                    <div className="column">
                                        <h4>Top Airlines</h4>
                                        <ul>
                                            <li><a href="/home/american-airlines"
                                                title="American Airlines">American Airlines</a></li>
                                            <li><a href="/home/united-airlines"
                                                title="United Airlines">United Airlines</a></li>
                                            <li><a href="/home/spirit-airline"
                                                title="Spirit Airlines">Spirit Airlines</a></li>
                                            <li><a href="/home/frontier-airlines"
                                                title="Frontier Airlines">Frontier Airlines </a></li>
                                            <li><a href="/home/aeromexico-airlines"
                                                title="Aeroméxico Airlines">Aeroméxico Airlines</a></li>
                                            <li><a href="/home/suncountry-airlines"
                                                title="Sun Country Airlines">Sun Country Airlines</a></li>
                                            <li><a href="/home/allegiant-airlines"
                                                title="Allegiant Air ">Allegiant Air </a></li>
                                            <li><a href="/home/alaska-airlines"
                                                title="Alaska Airlines">Alaska Airlines</a></li>
                                            <li><a href="/home/delta-airlines"
                                                title="Alaska Airlines">Delta Airlines</a></li>
                                            <li><a href="/home/JetBlue-Airways"
                                                title="Alaska Airlines">JetBlue Airlines</a></li>
                                            <li><a href="/home/JetBlue-Airways"
                                                title="Alaska Airlines">Qatar Airlines</a></li>
                                            <li><a href="/home/turkish"
                                                title="Alaska Airlines">Turkish Airlines</a></li>
                                            <li><a href="/home/etihads"
                                                title="Alaska Airlines">Etihads Airlines</a></li>
                                            <li><a href="/home/emeritus"
                                                title="Alaska Airlines">Emeritus Airlines</a></li>
                                            <li><a href="/home/lufthansa"
                                                title="Alaska Airlines">Lufhansa Airlines</a></li>
                                            <li><a href="/home/singapore"
                                                title="Alaska Airlines">Singapore Airlines</a></li>
                                        </ul>
                                    </div>
                                    <div className="clearfix visible-xs"></div>

                                    <div className="column">
                                        <h4>Top Flight Destinations</h4>
                                        <ul>
                                            <li><a href="/home/las-vegas"
                                                title="Las Vegas">Las Vegas</a></li>
                                            <li><a href="/home/atlanta"
                                                title="Atlanta">Atlanta</a></li>
                                            <li><a href="/home/new-york"
                                                title="New York">New York</a></li>
                                            <li><a href="/home/for-lauderdale"
                                                title="Fort Lauderdale">Fort Lauderdale</a></li>
                                            <li><a href="/home/washington"
                                                title="Washington DC">Washington DC</a></li>
                                            <li><a href="/home/denver"
                                                title="Denver">Denver</a></li>
                                            <li><a href="/home/tel-aviv"
                                                title="Tel Aviv">Tel Aviv</a></li>
                                        </ul>
                                    </div>
                                    <div className="clearfix visible-xs"></div>
                                    <div className="subscribeBox" id="NewsletterSubscribe">
                                        <h4>Subscribe to our Newsletter</h4>
                                        <div className="subscribe_div">
                                            <div className="subscribe">
                                                <div className="row">
                                                    <div className="col-xs-12">
                                                        <div className="form_row">
                                                            <input
                                                                type="text"
                                                                placeholder="Name"
                                                                id="subscribename"
                                                                className="subscribe-input alphanumeric"
                                                                autoComplete="off"
                                                                name="name"
                                                                value={formData.name}
                                                                onChange={handleChange}
                                                            />
                                                            <i className="icon fa fa-user-o"></i>
                                                        </div>
                                                    </div>
                                                    <div className="col-xs-12">
                                                        <div className="form_row">
                                                            <input
                                                                type="email"
                                                                placeholder="E-mail address"
                                                                className="subscribe-input"
                                                                id="subscriptionuser"
                                                                autoComplete="off"
                                                                name="email"
                                                                value={formData.email}
                                                                onChange={handleChange}
                                                            />
                                                            <i className="icon fa fa-envelope-o"></i>
                                                        </div>
                                                    </div>
                                                    <div className="col-xs-12">
                                                        <div className="form_row newcountrylist">
                                                            <input
                                                                type="tel"
                                                                id="mobile-number"
                                                                className="inputform"
                                                                readOnly="readonly"
                                                                value="+1"
                                                            />
                                                            <input
                                                                type="tel"
                                                                id="mobile-num"
                                                                placeholder="Mobile number"
                                                                maxLength="12"
                                                                minLength="10"
                                                                className="inputform phone_number numeric"
                                                                autoComplete="off"
                                                                name="phone"
                                                                value={formData.phone}
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        
                                                    </div>
                                                    <div className="col-xs-12 terms inputSet">
                                                        <div className="terms">
                                                            I would like to receive SMS and email from jetquinstravels.com with the latest offers and promotions. I have read and agree to the{" "}
                                                            <a target="_blank" href="/terms-conditions">Terms and Conditions</a> and{" "}
                                                            <a href="/privacy-policy" target="_blank">
                                                                privacy policy
                                                            </a>.
                                                        </div>
                                                    </div>
                                                    <div className="col-xs-12">
                                                        <button type="button" className="subscribe-submit" onClick={handleSubmit}>
                                                            SUBSCRIBE
                                                        </button>
                                                        <span id="message" style={{ color: "red" }}>
                                                            {message}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>
                                            {/* Success Popup Message */}
                                            {success && (
                                                <div
                                                    style={{
                                                        position: "fixed",
                                                        top: 0,
                                                        left: 0,
                                                        width: "100%",
                                                        height: "100%",
                                                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        zIndex: 1000,
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            background: "white",
                                                            padding: "20px",
                                                            borderRadius: "8px",
                                                            width: "90%",
                                                            maxWidth: "400px",
                                                            textAlign: "center",
                                                            position: "relative",
                                                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                                                        }}
                                                    >
                                                        {/* Close Button */}
                                                        <span
                                                            style={{
                                                                position: "absolute",
                                                                top: "10px",
                                                                right: "10px",
                                                                fontSize: "20px",
                                                                cursor: "pointer",
                                                                color: "#aaa",
                                                            }}
                                                            onClick={closePopup}
                                                        >
                                                            &times;
                                                        </span>

                                                        {/* Success Message */}
                                                        <div className="thanks">
                                                            <img
                                                                src="/assets/images/sucess-full-image.svg"
                                                                alt="Success"
                                                                className="pull-left"
                                                            />
                                                            Thanks
                                                        </div>
                                                        <div className="msg">
                                                            Your email ID <br /> <span id="email2">{formData.email}</span> <br />
                                                            <span id="submitSuccess2"> has been added successfully</span>
                                                        </div>
                                                        <small className="text">
                                                            We will notify you for our Best Deals and offers.
                                                        </small>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* <script src="/assets/scripts/countrycode-list.js"></script> */}
                                    {/* <Script dangerouslySetInnerHTML={` $("#mobile-number").intlTelInput();`} /> */}
                                </div>
                            </div>
                            <form id="fltdetailspackdeal" name="fltdetailspackdeal" method="get" target="_blank">
                            </form>

                            {/* <Script dangerouslySetInnerHTML={`
                                $(document).ready(function () {
                                    $('.change_country').click(function (event) {
                                        event.stopPropagation();
                                        $('.subscribe_dropdown').slideToggle();
                                    });

                                $(document).on("click", function () {
                                    $(".subscribe_dropdown").hide();
                                });

                                $(".subscribe_dropdown li").click(function () {
                                    var label = $(this).text();
                                $(this).parent().parent().parent().children("span.trip").html($(this).html());
                                $('.subscribe_dropdown').slideToggle();
                                });
                            });
                            `} /> */}

                        </div>
                    </div>
                </div>
            </div>

            <div className="footer__bottom">
                <div className="container">
                    <div className="top_row">
                        <p className="copyright">
                            <img src="/assets/images/footer/footer-icon.png" className="footer_icon" alt="footer-icon" /> Copyright ©
                            2025 • Jetquins Travels Pvt. Ltd.
                        </p>
                        <ul className="social">
                            <li><a href="#" target="_blank" title="Facebook"><i
                                className="fa fa-facebook" aria-hidden="true"></i></a></li>
                            <li><a href="#" target="_blank" title="twitter"><svg width="16"
                                height="16" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16"
                                style={{ paddingTop: "2px" }}>
                                <path
                                    d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z">
                                </path>
                            </svg></a></li>
                            <li><a href="#" target="_blank" title="instagram"><i
                                className="fa fa-instagram" aria-hidden="true"></i></a></li>
                        </ul>
                    </div>
                    <div className="clearfix"></div>

                    <div className="visible-xs">
                        <div className="bottom-call-bar" style={{ bottom: "0px" }}>
                            <div className="close_call_banner hand" style={{ float: "right", color: "#fff", padding: "0 5px" }}>X</div>
                            <a id="a_contactNo" className="tele" href="tel:+1(888) 267-5955">
                                <span className="call_btndiv"><img src="/assets/images/uc/newcall202c.gif?123" alt="call"
                                    className="footer_call_icon" />
                                    <span className="call-text">Call &amp; Get Unpublished Flight Deals!</span>
                                    <span id="div_contactNo" className="phone">+1(888) 267-5955</span>
                                </span>
                            </a>
                        </div>
                    </div>


                    {/* <div className="secure__logo">
                        <ul>
                            <li><img src="/assets/images/footer/asta-logo.png" alt="asta-logo" /></li>
                            <li><img src="/assets/images/footer/newlogo.png" alt="kogo" /></li>
                            <li><img src="/assets/images/footer/godaddy-ssl.png" alt="godaddy ssl" /></li>
                            <li><img src="/assets/images/footer/cloudfare.png" alt="cloudfare" /></li>
                            <li><img src="/assets/images/footer/mac2.png" alt="mc2" /></li>
                            <li><a href="#" target="_blank"><img
                                src="/assets/images/footer/trustpilot-logo.png" alt="trustpilot-logo" /></a></li>
                            <li className="digicert-logo">
                                <div id="DigiCertClickID_7dlUvcGZ"></div>
                                <Script
                                    dangerouslySetInnerHTML={`     var __dcid = __dcid || []; __dcid.push({"cid": "DigiCertClickID_7dlUvcGZ", "tag": "7dlUvcGZ", "seal_format": "dynamic" }); (function () { var cid = document.createElement("script"); cid.async = true; cid.src = "../seal.digicert.com/seals/cascade/seal.min.js"; var s = document.getElementsByTagName("script"); var ls = s[(s.length - 1)]; ls.parentNode.insertBefore(cid, ls.nextSibling); }());`} />
                            </li>
                            <li><a onclick="window.open('us/security-metrices-certificate4b6d.pdf?v5', 'info', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=900,height=600, screenX=100,screenY=50')"
                                href="#"><img src="/assets/images/footer/security-metrices-white.svg"
                                    alt="Security Metrices Certificate" /></a>
                            </li>
                        </ul>
                    </div> */}

                    <div className="discription__block">
                        <p>Disclaimer- Jetquins Travels is an independent travel portal. Its parent company is Jetquins Travels The information that's displayed on this website, www.jetquinstravels.com, is for general
                            purposes. All the necessary steps have been taken to ensure that the information displayed in
                            the website is accurate and up-to-date. However, under no circumstance, We do not provide any
                            warranty or representation, whether implied or expressed, when it comes to the accuracy,
                            completeness or reliability of the information displayed on the website. If you need to have any
                            queries answered, you can write to us at <a
                                href="mailto:contact@Jetquins Travels.com"><span
                                    className="__cf_email__"
                                    data-cfemail="ddaea8adadb2afa99db1b2b2b6bfa4bbbcafb8f3beb2b0"><b>contact@jetquinstravels.com</b></span></a>
                        </p>
                    </div>
                </div>
            </div>

        </footer>
    </>
}

export default Footer;

