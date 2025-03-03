'use client'
import { useRef } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, googleAuth } from "../firebase/config";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";

const SignInComponent = ({ hideLoginPopup, showSignUp }) => {
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
                localStorage.setItem('current-user', JSON.stringify(res.user));
                hideLoginPopup();
                // toast.success("Successfully logged in!");
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
        console.log("Called handleGoogleSignIN");
        try {
            const result = await signInWithPopup(auth, googleAuth);
            console.log(result, "ROLE BASED");
            const user = result.user;
            console.log("Google sign-in successful", user);
            sessionStorage.setItem('user', true);
            localStorage.setItem('current-user', JSON.stringify(result.user));
            hideLoginPopup();
            toast.success("Google sign-in successful");
        } catch (error) {
            console.error("Google sign-in error", error);
            toast.error("Google sign-in error");
        }
    };

    return <div id="someDivId" bis_skin_checked={1}>
        {/* login popup start */}
        <div className="login_popup" id="signIn" style={{}} bis_skin_checked={1}>
            <div className="popup_Box" bis_skin_checked={1}>
                <div className="center-block" bis_skin_checked={1}>
                    <div className="outer" bis_skin_checked={1}>
                        <div className="inner" bis_skin_checked={1}>
                            <div className="loginBox" bis_skin_checked={1}>
                                <a
                                    className="close"
                                    onClick={hideLoginPopup}
                                    bis_skin_checked={1}
                                >
                                    <i className="fa fa-times" aria-hidden="true" />
                                </a>
                                <div className="left" bis_skin_checked={1}>
                                    <div className="title" bis_skin_checked={1}>
                                        Sign in and <br />
                                        stay one step ahead.
                                    </div>
                                    <ul>
                                        <li>Avail discounts exclusive to our registered users.</li>
                                        <li>Your saved information means faster booking.</li>
                                        <li>Stay updated on our latest offers.</li>
                                    </ul>
                                </div>
                                <div className="right" bis_skin_checked={1}>
                                    <div
                                        id="Messagelogin"
                                        style={{ display: "none" }}
                                        className="alert alert-danger"
                                        bis_skin_checked={1}
                                    >
                                        You may have entered an unknown email address or an incorrect
                                        password
                                    </div>
                                    <h3>Sign in</h3>
                                    {/* <a
                                        onclick="facebookLogin();"
                                        style={{ cursor: "pointer" }}
                                        className="facebook"
                                    >
                                        Facebook
                                    </a> */}
                                    <div onClick={handleGoogleSignIn} className="g-signin2" id="gsign" bis_skin_checked={1}>
                                        Google
                                    </div>
                                    <span className="text">Or Sign in with</span>
                                    <div className="form-row" bis_skin_checked={1}>
                                        <input
                                            type="text"
                                            className="textbox"
                                            name="Email"
                                            id="loginUsername"
                                            placeholder="Email"
                                            autoComplete="off"
                                            ref={emailRef}
                                        />
                                        <i className="fa fa-envelope-o icon" />
                                        <div
                                            className="error_text"
                                            bis_skin_checked={1}
                                            style={{ display: "none" }}
                                        >
                                            Email is required
                                        </div>
                                        {/*<div class="error_text">Please provide a valid email address.</div>*/}
                                    </div>
                                    <div className="form-row" bis_skin_checked={1}>
                                        <input
                                            type="password"
                                            className="textbox"
                                            name="loginPassword"
                                            id="loginPassword"
                                            autoComplete="off"
                                            ref={passwordRef}
                                            placeholder="Password"
                                        />
                                        <i className="fa fa-lock icon" />
                                        <div
                                            className="error_text"
                                            bis_skin_checked={1}
                                            style={{ display: "none" }}
                                        >
                                            Password is required
                                        </div>
                                    </div>
                                    <div className="form-row" bis_skin_checked={1}>

                                        <span className="pin-text">
                                            Enter your 4 digit numeric pin
                                        </span>
                                    </div>
                                    <div className="form-row" bis_skin_checked={1}>
                                        {/*<button type="submit" class="button">Sign in</button>*/}
                                        <button
                                            type="submit"
                                            className="button pfsignin"
                                            onClick={handleSubmit}
                                        >
                                            Sign in
                                            <span
                                                className="button_loding_div"
                                                style={{ display: "none" }}
                                            >
                                                <i className="button_loader" />
                                                processing
                                            </span>
                                        </button>
                                        <a
                                            href="javascript:void(0);"
                                            onclick="showModalprofile('forgot_popup', 'signIn', 'firstScreen')"
                                            className="forgot pull-right"
                                            bis_skin_checked={1}
                                        >
                                            Forgot Pin?
                                        </a>
                                    </div>
                                    <div className="form-row" bis_skin_checked={1}>
                                        <p className="register">

                                            <a
                                                onClick={showSignUp}
                                                className="text-green"
                                                bis_skin_checked={1}
                                            >
                                                New here? Sign up
                                            </a>
                                            (it’s easy)
                                        </p>
                                    </div>
                                </div>
                            </div>
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
            bis_skin_checked={1}
        >
            <div className="popup_Box" bis_skin_checked={1}>
                <div className="center-block" bis_skin_checked={1}>
                    <div className="outer" bis_skin_checked={1}>
                        <div className="inner" bis_skin_checked={1}>
                            <div className="loginBox" bis_skin_checked={1}>
                                <a
                                    href="javascript:void(0);"
                                    className="close"
                                    onclick="hideModal('forgot_popup')"
                                    bis_skin_checked={1}
                                >
                                    <i className="fa fa-times" aria-hidden="true" />
                                </a>
                                <div className="left reset_bg" bis_skin_checked={1}>
                                    <div className="title" bis_skin_checked={1}>
                                        Forgot Pin
                                    </div>
                                </div>
                                <div className="right" bis_skin_checked={1}>
                                    <div
                                        id="MessageForgot"
                                        style={{ display: "none" }}
                                        className="alert alert-danger"
                                        bis_skin_checked={1}
                                    />
                                    <h3>Forgot Pin </h3>
                                    <div
                                        className="reset-screen1"
                                        id="firstScreen"
                                        bis_skin_checked={1}
                                    >
                                        <div className="form-row" bis_skin_checked={1}>
                                            <input
                                                type="text"
                                                className="textbox"
                                                id="forgotEmail"
                                                name="forgotEmail"
                                                autoComplete="off"
                                                placeholder="Email"
                                                onkeydown="removeloginvalid(this.id);"
                                            />
                                            <i className="fa fa-envelope-o icon" />
                                            <div
                                                className="error_text"
                                                bis_skin_checked={1}
                                                style={{ display: "none" }}
                                            >
                                                Please enter your email address.
                                            </div>
                                            {/*<div class="error_text">Please provide a valid email address.</div>*/}
                                        </div>
                                        <div className="form-row" bis_skin_checked={1}>
                                            <button
                                                type="submit"
                                                className="button"
                                                onclick="return Forgort()"
                                            >
                                                Submit
                                                <span
                                                    className="button_loding_div"
                                                    style={{ display: "none" }}
                                                >
                                                    <i className="button_loader" />
                                                    processing
                                                </span>
                                            </button>
                                            <button
                                                type="button"
                                                className="button grayBtn"
                                                onclick="showModalprofile('signIn', 'forgot_popup', 'firstScreen')"
                                            >
                                                Back
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        className="reset-screen2"
                                        id="secondScreen"
                                        style={{ display: "none" }}
                                        bis_skin_checked={1}
                                    >
                                        <div className="form-row" bis_skin_checked={1}>
                                            <input
                                                type="password"
                                                className="textbox"
                                                onkeydown="removeloginvalid(this.id);"
                                                autoComplete="off"
                                                onkeypress="return isNumeric(event);"
                                                maxLength={4}
                                                placeholder="New Pin"
                                            />
                                            <i className="fa fa-lock icon" />
                                            <div
                                                className="error_text"
                                                bis_skin_checked={1}
                                                style={{ display: "none" }}
                                            >
                                                Please enter your new pin.
                                            </div>
                                        </div>
                                        <div className="form-row" bis_skin_checked={1}>

                                            <span className="pin-text">
                                                Set your new 4 digit numeric pin
                                            </span>
                                        </div>
                                        <div className="form-row" bis_skin_checked={1}>
                                            <input
                                                type="password"
                                                className="textbox"
                                                onkeydown="removeloginvalid(this.id);"
                                                autoComplete="off"
                                                onkeypress="return isNumeric(event);"
                                                maxLength={4}
                                                placeholder="Confirm Pin"
                                            />
                                            <i className="fa fa-lock icon" />
                                            <div
                                                className="error_text"
                                                bis_skin_checked={1}
                                                style={{ display: "none" }}
                                            >
                                                Please enter your confirm pin.
                                            </div>
                                        </div>
                                        <div className="form-row" bis_skin_checked={1}>
                                            <button
                                                type="button"
                                                className="button"
                                                onclick="showScreen('thirdScreen','secondScreen')"
                                            >
                                                Reset
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        className="reset-screen3"
                                        id="thirdScreen"
                                        style={{ display: "none" }}
                                        bis_skin_checked={1}
                                    >
                                        <div className="msgSucessfull" bis_skin_checked={1}>
                                            Your Pin has been
                                            <br />
                                            successfully changed !!
                                            <br />
                                            <button
                                                type="submit"
                                                className="button"
                                                onclick="showModalprofile('signIn', 'forgot_popup')"
                                            >
                                                Sign IN Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/*Reset password popup end */}
        {/* Sign Up popup start */}

        {/* Sign Up popup end */}
        {/*sucessfull_message start here*/}
        <div
            className="sucessfull_message"
            style={{ display: "none" }}
            bis_skin_checked={1}
        >
            <i className="fa fa-check" aria-hidden="true" /> <span id="poupupMessage" />
        </div>
        {/*sucessfull_message end here*/}
        <style
            dangerouslySetInnerHTML={{
                __html: "\n    .error_text {\n        display: none;\n    }\n"
            }}
        />;
    </div>

}


export default SignInComponent;