'use client';
import React, { useEffect, useState } from "react";

const WriteToUs = () => {
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [currentUser, setCurrentUser] = useState(null);


    const [formData, setFormData] = useState({
        category: "",
        experience: "",
        feedback: "",
        userEmail: "",
    });
    
    // changes new things

    //changed

    // Load the current user from localStorage
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("current-user"));
        console.log(user.email, "UserEmail for AUthentication");

        if (user) {
            setCurrentUser(user);
            setFormData((prev) => ({ ...prev, userEmail: user.email })); // Update formData with user's email
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const { category, feedback } = formData;

        if (!category || !feedback) {
            setError("Please fill out all required fields.");
            return;
        }

        setError("");
        try {
            const response = await fetch("/api/sendFeedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccessMessage("Your feedback has been submitted successfully.");
                setFormData({ category: "", experience: "", feedback: "", userEmail: "",});
            } else {
                const data = await response.json();
                setError(data.error || "Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("Error submitting feedback. Please try again later.");
            console.error(err);
        }
    };

    return (
        <>
            <div className="rightCntr" id="writeus" style={{ display: "block" }}>
                {error && <div
                    id="Messageloginsup_writeus"
                    className="alert alert-danger"
                >
                    {error}
                </div>}
                {successMessage && <div
                    id="MessageSuccess_writeus"
                    className="alert alert-success"
                >
                    {successMessage}
                </div>}
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
                                                <select id="user_category" name="category" value={formData.category} onChange={handleChange}>
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
                                                    checked={formData.experience === "Excellent"}
                                                    onChange={handleChange}
                                                />
                                                <span>Excellent</span>
                                            </label>
                                            <label>
                                                <input
                                                    name="Experience"
                                                    type="radio"
                                                    defaultValue="Great"
                                                    checked={formData.experience === "Great"}
                                                    onChange={handleChange}
                                                />
                                                <span>Great</span>
                                            </label>
                                            <label>
                                                <input
                                                    name="Experience"
                                                    type="radio"
                                                    defaultValue="Average"
                                                    checked={formData.experience === "Average"}
                                                    onChange={handleChange}
                                                />
                                                <span>Average</span>
                                            </label>
                                            <label>
                                                <input
                                                    name="Experience"
                                                    type="radio"
                                                    defaultValue="Poor"
                                                    checked={formData.experience === "Poor"}
                                                    onChange={handleChange}
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
                                                value={formData.feedback}
                                                onChange={handleChange}
                                            />
                                            <div className="error_text">feedback is required</div>
                                        </div>
                                    </div>
                                    <button
                                        className="button mt_mob"
                                        onClick={handleSubmit}
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
                                                        2140 Hall Johnson Rd Ste 102-171 Grapevine, TX 76051

                                                    </span>
                                                </address>
                                            </div>
                                            <div className="col-sm-12">
                                                <i className="fa fa-phone" />
                                                <a href="tel:+1-888-267-5955">+1-888-267-5955</a>
                                            </div>
                                            <div className="col-sm-12">
                                                <i className="fa fa-envelope-o" />
                                                <a href="mailto:contact@Jetquins Travels.com">
                                                    contact@Jetquins Travels.com
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
        </>
    )

}

export default WriteToUs;
