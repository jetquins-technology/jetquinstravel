'use client';

import React, { useRef } from 'react';
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, googleAuth } from "../firebase/config";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";

const userDashboard = ({ onSignUpClick, onLoginSuccess }) => {

    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!email || !password) {
            toast.error("Please enter both email and password.");
            return;
        }
        try {
            const res = await signInWithEmailAndPassword(email, password);
            console.log(res, "ROLE BASED");

            if (res?.user) {
                console.log(res, "ROLE BASED");
                sessionStorage.setItem('user', true);
                sessionStorage.setItem('UserAuthentication', JSON.stringify(res));
                const isSuccessful = true; // Replace with actual success condition
                if (isSuccessful) {
                    onLoginSuccess(); // Notify parent component of successful login
                }
                toast.success("Successfully logged in!");
            } else {
                // Handle unexpected response from the server
                throw new Error("Unexpected server response.");
            }

        } catch (err) {
            console.error(err);
            toast.error("Login failed! Please check your credentials.");
        }
        console.log({ email, password });
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleAuth);
            console.log(result, "ROLE BASED");
            const user = result.user;
            console.log("Google sign-in successful", user);
            sessionStorage.setItem('user', true);
            localStorage.setItem('current-user', JSON.stringify(user));
            const isSuccessful = true; // Replace with actual success condition
            if (isSuccessful) {
                onLoginSuccess(); // Notify parent component of successful login
            }
            toast.success("Google sign-in successful");
        } catch (error) {
            console.error("Google sign-in error", error);
            toast.error("Google sign-in error");
        }
    };

    const handleLogin = async () => {
        // Your existing login logic
        const isSuccessful = true; // Replace with actual success condition
        if (isSuccessful) {
            onLoginSuccess(); // Notify parent component of successful login
        }
    };
    return (
        <>
            <div className="container">
                <main role="main" className="pb-3">
                    <div id="someDivId">
                        {/* header end */}
                        {/* footer start */}
                        <input type="hidden" id="loginpg" defaultValue={0} />
                        <footer className="footer"> </footer>
                        {/* footer end */}
                        {/* login popup start */}
                        <div className="login_popup" id="signIn">
                            <div className="inner">
                                <div className="loginBox">
                                    <div className="left">
                                        <div className="title">Sign in and stay one step ahead.</div>
                                        <ul>
                                            <li>Avail discounts exclusive to our registered users.</li>
                                            <li>Your saved information means faster booking.</li>
                                            <li>Stay updated on our latest offers.</li>
                                        </ul>
                                    </div>
                                    <div className="right">
                                        <div
                                            id="Messagelogin"
                                            style={{ display: "none" }}
                                            className="alert alert-danger"
                                        >
                                            Invalid credentials provided.Please try again.
                                        </div>
                                        <h3>Sign in</h3>
                                        <p>Use your social media information to connect with us</p>
                                        {/* <a onclick="facebookLogin()" className="facebook" style={{}}>
                                            Facebook
                                        </a> */}
                                        <a className="google_login" id="gsign" onClick={handleGoogleSignIn}>
                                            Google
                                        </a>
                                        <span className="text">Or Sign in with</span>
                                        <form
                                            name="signInReq"
                                            id="signInReq"
                                            data-gtm-form-interact-id={0}
                                        >
                                            <div className="form-row">
                                                <input
                                                    id="user_uid"
                                                    name="uid"
                                                    type="text"
                                                    className="textbox valid"
                                                    placeholder="Email"
                                                    autoComplete="off"
                                                    data-gtm-form-interact-field-id={0}
                                                    ref={emailRef}
                                                />
                                                <i className="fa fa-envelope-o icon" />
                                                <div className="error_text">Email is required</div>
                                            </div>
                                            <div className="form-row">
                                                <input
                                                    id="user_pin"
                                                    name="pin"
                                                    type="password"
                                                    maxLength={4}
                                                    minLength={4}
                                                    className="textbox numbersOnly valid"
                                                    onkeypress="return EnterEvent_btn(event)"
                                                    placeholder="Pin"
                                                    autoComplete="off"
                                                    data-gtm-form-interact-field-id={1}
                                                    ref={passwordRef}
                                                />
                                                <i className="fa fa-lock icon" />
                                                <div className="error_text">Pin is required</div>
                                            </div>
                                            {/*<div class="form-row checkbox">
                      <label><input type="checkbox" name="" /><span>Remember Me</span></label>
                  </div>*/}
                                            <div className="form-row">
                                                <button
                                                    onClick={handleSubmit}
                                                    type="button"
                                                    id="SignInbtn"
                                                    className="button"
                                                >
                                                    Sign in{" "}
                                                    <span
                                                        className="button_loding_div"
                                                        style={{ display: "none" }}
                                                    >
                                                        <i className="button_loader blnk" />
                                                    </span>
                                                </button>
                                                <a
                                                    href="javascript:void(0);"
                                                    onclick="profileModel_user('forgot_popup','signIn')"
                                                    className="forgot pull-right"
                                                >
                                                    Forgot Pin?
                                                </a>
                                            </div>
                                        </form>
                                        <div className="form-row">
                                            <p className="register">
                                                <a
                                                    className="text-green"
                                                    href="javascript:void(0);"
                                                    onClick={onSignUpClick}
                                                >
                                                    New here? Sign up
                                                </a>{" "}
                                                (it's easy){" "}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*login popup end */}
                        {/* Reset password popup start */}
                        <div
                            className="login_popup"
                            id="forgot_popup"
                            style={{ display: "none" }}
                        >
                            <div className="inner">
                                <div className="loginBox">
                                    <div className="left reset_bg">
                                        <div className="title">Forgot Pin </div>
                                    </div>
                                    <div className="right">
                                        <h3>
                                            Forgot Pin <span className="tagline">It won't take long</span>
                                        </h3>
                                        <div
                                            id="Messageloginfpass"
                                            style={{ display: "none" }}
                                            className="alert alert-danger"
                                        >
                                            Invalid credentials provided.Please try again.
                                        </div>
                                        <form name="forgetPinReq" id="forgetPinReq">
                                            <div className="reset-screen1" id="firstScreen">
                                                <p className="form-row" style={{ marginTop: 0 }}>
                                                    Please enter your registered email address. You will receive
                                                    a Reset Pin url in your mail box.
                                                </p>
                                                <div className="form-row">
                                                    <input
                                                        id="user_forgetid"
                                                        name="forgetid"
                                                        type="text"
                                                        className="textbox"
                                                        placeholder="Email"
                                                    />
                                                    <i className="fa fa-envelope-o icon" />
                                                    <div className="error_text">
                                                        Please enter your email address
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <button
                                                        onclick="forgetPin()"
                                                        type="button"
                                                        className="button"
                                                    >
                                                        Submit{" "}
                                                        <span
                                                            className="button_loding_div"
                                                            style={{ display: "none" }}
                                                        >
                                                            <i className="button_loader blnk" />
                                                        </span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="button grayBtn"
                                                        onclick="profileModel_user('signIn','forgot_popup')"
                                                    >
                                                        Back
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*Reset password popup end */}
                    </div>
                </main>
            </div>

        </>
    )
}

export default userDashboard;