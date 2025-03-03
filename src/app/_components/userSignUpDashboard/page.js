'use client'
import { useState, useRef } from "react";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { doc, setDoc } from "firebase/firestore";
import { auth, googleAuth, fireStore } from "../firebase/config";
import { signInWithPopup, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";

const userSignUp = ({ onSignInClick }) => {

    const firstNameRef = useRef("");
    const lastNameRef = useRef("");
    const emailRef = useRef("");
    const phoneNumber = useRef("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            console.log("Passwords do not match");
            toast.error("Passwords do not match")
            return;
        }

        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(emailRef.current.value, password);
            const user = userCredential.user;

            //setting display name
            await updateProfile(user, {
                displayName: `${firstNameRef.current.value} ${lastNameRef.current.value}`
            });
            // Store additional user information in Firestore
            await setDoc(doc(fireStore, 'users', user.uid), {
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                email: user.email,
                phone: phoneNumber.current.value,
                createdAt: new Date(),
            });
         
            sessionStorage.setItem('user', true);

            // Optionally, you can add a success message or redirect
            toast.success("Sign-up successful! Welcome to the JetQuins Travel!");
            // setSuccess(true);

        } catch (e) {
            console.log(e);
            toast.error("Sign-up failed! Please try again.");
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleAuth);
            const user = result.user;
            console.log("Google sign-in successful", user);
            toast.success("Google sign-in successful")
            sessionStorage.setItem('user', JSON.stringify({ uid: user.uid, email: user.email }));
        
        } catch (error) {
            console.error("Google sign-in error", error);
            toast.error("Google sign-in error")
        }
    };

    return (
        <>
            <div className="login_popup" id="singUp" >
                <div className="inner">
                    <div className="loginBox">
                        <div className="left">
                            <div className="title">Sign up and stay one step ahead.</div>
                            <ul>
                                <li>Avail discounts exclusive to our registered users.</li>
                                <li>Your saved information means faster booking.</li>
                                <li>Stay updated on our latest offers.</li>
                            </ul>
                        </div>
                        <div className="right" bis_skin_checked={1}>
                            <div
                                id="Message"
                                style={{ display: "none" }}
                                className="alert alert-danger"
                                bis_skin_checked={1}
                            />
                            <h3>Sign up</h3>
                            {/* <a
                                        onclick="facebookLogin();"
                                        style={{ cursor: "pointer" }}
                                        className="facebook"
                                    >
                                        Facebook
                                    </a> */}
                            <a className="google_login" id="gsigup" onClick={handleGoogleSignIn}>
                                Google
                            </a>

                            <div className="form-row" bis_skin_checked={1}>
                                <input
                                    type="text"
                                    id="FirstName"
                                    name="FirstName"
                                    className="textbox"
                                    placeholder="First name"
                                    autoComplete="off"
                                    ref={firstNameRef}
                                />
                                <i className="fa fa-user-o icon" />
                                <div
                                    className="error_text"
                                    bis_skin_checked={1}
                                    style={{ display: "none" }}
                                >
                                    First Name is required
                                </div>
                            </div>
                            <div className="form-row" bis_skin_checked={1}>
                                <input
                                    type="text"
                                    className="textbox"
                                    id="LastName"
                                    name="LastName"
                                    placeholder="Last name"
                                    autoComplete="off"
                                    ref={lastNameRef}
                                />
                                <i className="fa fa-user-o icon" />
                                <div
                                    className="error_text"
                                    bis_skin_checked={1}
                                    style={{ display: "none" }}
                                >
                                    Last Name is required
                                </div>
                            </div>
                            <div className="form-row" bis_skin_checked={1}>
                                <input
                                    type="text"
                                    className="textbox"
                                    id="UserName"
                                    name="UserName"
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
                            </div>
                            <div className="form-row" bis_skin_checked={1}>
                                <input
                                    type="tel"
                                    className="textbox"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    placeholder="Phone Number"
                                    autoComplete="off"
                                    ref={phoneNumber}
                                />
                                <i className="fa-solid fa-phone icon" />
                                <div
                                    className="error_text"
                                    bis_skin_checked={1}
                                    style={{ display: "none" }}
                                >
                                    Email is required
                                </div>
                            </div>
                            <div className="form-row" bis_skin_checked={1}>
                                <input
                                    type="password"
                                    className="textbox"
                                    id="Password"
                                    name="Password"
                                    autoComplete="off"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <i className="fa fa-lock icon" />
                                <div
                                    className="error_text"
                                    bis_skin_checked={1}
                                    style={{ display: "none" }}
                                >
                                    pin is required
                                </div>
                            </div>
                            <div className="form-row" bis_skin_checked={1}>

                                <span className="pin-text">
                                    Enter your 4 digit numeric pin
                                </span>
                            </div>
                            <div className="form-row" bis_skin_checked={1}>
                                <input
                                    type="password"
                                    className="textbox"
                                    id="ConfirmPassword"
                                    name="ConfirmPassword"
                                    autoComplete="off"
                                    placeholder="Confirm Password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <i className="fa fa-lock icon" />
                                <div
                                    className="error_text"
                                    bis_skin_checked={1}
                                    style={{ display: "none" }}
                                >
                                    Confirm pin is required
                                </div>
                            </div>
                            <div className="form-row" bis_skin_checked={1}>
                                <div className="terms" bis_skin_checked={1}>
                                    By signing up, I agree to JetQuinsTravels General
                                    <a
                                        href="/us/terms-conditions"
                                        target="_blank"
                                        className="text-green"
                                        bis_skin_checked={1}
                                    >
                                        Terms and Conditions
                                    </a>
                                    and
                                    <a
                                        className="text-green"
                                        href="/us/privacy-policy"
                                        target="_blank"
                                        bis_skin_checked={1}
                                    >
                                        Privacy Policy
                                    </a>
                                    .
                                </div>
                            </div>
                            <div className="form-row" bis_skin_checked={1}>
                                <button
                                    type="submit"
                                    className="button pfsignup"
                                    onClick={handleSubmit}
                                >
                                    Sign UP
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
                                    onClick={onSignInClick}
                                >
                                    Back
                                </button>
                                <span style={{ margin: 15, color: "red" }} id="Message" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default userSignUp;