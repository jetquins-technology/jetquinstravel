"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../_components/firebase/config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import UserSignInComponent from "@/app/_components/userLoginDashboard/page";
import UserSignUpComponent from "@/app/_components/userSignUpDashboard/page";
import Loadings from "../Loadings";

export default function ClientLayout({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("mytrip");
    const [currentUser, setCurrentUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpens, setDropdownOpens] = useState(false);
    const [lastLoginTme, setIsLoginTime] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const showSignUp = () => {
        setIsSignUp(true);
    };

    const showSignIn = () => {
        setIsSignUp(false);
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true); // Update state to hide login page
    };

    useEffect(() => {
        // Retrieve the user authentication data from sessionStorage
        if (typeof window !== "undefined") {
            const currentUser = localStorage.getItem('current-user');
            if (currentUser) {
                const user = JSON.parse(currentUser);
                setCurrentUser(user);
                setIsLoggedIn(true);
                setIsLoginTime(user.lastLoginAt);
                setUsername(user.displayName); // Set the username once on mount
            } else {
                setIsLoggedIn(false);
            }
        }
    }, [])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, update the state and local storage
                const userData = {
                    uid: user.uid,
                    displayName: user.displayName || "User",
                    email: user.email,
                };
                setUser(userData);
                setCurrentUser(userData);
                setUsername(user.displayName || "User");
                setTimeout(() => {
                    setLoading(false);
                    setIsLoggedIn(true);
                }, 1000);
                localStorage.setItem("current-user", JSON.stringify(userData));
            } else {
                // User is signed out
                setUser(null);
                setCurrentUser(null);
                setUsername("");
                setIsLoggedIn(false);
                localStorage.removeItem("current-user");
            }
        });

        return () => unsubscribe();
    }, []);

    // Menu items array
    const menuItems = [
        { id: "mytrip", label: "My Booking", href: "/mybooking/akjsdjkn", className: "mytrip" },
        { id: "myinformation", label: "My Information", href: "/myinformation/slkdjlik", className: "myinformation" },
        { id: "offers", label: "Latest Offers", href: "/latestoffer/slkdjlika", className: "reward offers" },
        { id: "settings", label: "Settings", href: "/settings/slkdjliak", className: "setting settings" },
        { id: "writeus", label: "Write To Us", href: "/writetous/slkdajlik", className: "deal writeus" },
        { id: "signout", label: "Sign Out", href: "#", className: "signout" },
    ];

    // Handle click and navigation
    const handleTabClick = (id, href) => {
        if (id === "signout") {
            handleSignOut();
        } else {
            setActiveTab(id); // Update active tab
            router.push(href); // Navigate to the corresponding page
        }
    };

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                // Remove user session info from sessionStorage
                sessionStorage.removeItem("user");
                setIsLoggedIn(false);
                setUsername('');
                localStorage.removeItem("current-user");
                toast.success("You have successfully signed out.");
            })
            .catch((error) => {
                // Show error message if sign-out fails
                console.error("Sign-out error: ", error);
                toast.error("An error occurred while signing out. Please try again.");
            });
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleDropdowns = () => {
        console.log("hiiiiii");
        setDropdownOpens(!dropdownOpens);
    };

    const handleNavigation = (route) => {
        // router.push(path);
        router.push(`/${route}`);
        setDropdownOpen(false);
    };

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
                                    {isLoggedIn ? (
                                        <li className={`dropdown loginDropdown loginpg ${dropdownOpens ? "open" : ""}`}>
                                            <a
                                                className="login"
                                                data-toggle="dropdown"
                                                href="javascript:void(0);"
                                                // aria-expanded="true"
                                                aria-expanded={dropdownOpens}
                                                onClick={toggleDropdowns}
                                            >
                                                <span className="displayusername">Welcome {username}</span>{" "}
                                                <span className="fa fa-angle-down support-icon" />
                                            </a>
                                            <ul
                                                className={`loginMenu ${dropdownOpens ? 'show' : ''}`} style={{ display: dropdownOpens ? 'block' : 'none' }} // Toggle visibility based on state
                                            >
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        onClick={() => handleNavigation(`mybooking/${currentUser.uid}`)}
                                                    >
                                                        My Booking
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="javascript:void(0);"
                                                        onClick={() => handleNavigation(`myinformation/${currentUser.uid}`)}
                                                    >
                                                        My Information
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0);"
                                                        onClick={() => handleNavigation(`latestoffer/${currentUser.uid}`)}>
                                                        Latest Offer
                                                    </a>
                                                </li>
                                                <li id="profile_setting" style={{ display: 'block' }}>
                                                    <a href="javascript:void(0);"
                                                        onClick={() => handleNavigation(`settings/${currentUser.uid}`)}>
                                                        Settings
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0);"
                                                        onClick={() => handleNavigation(`writetous/${currentUser.uid}`)}>
                                                        Write To Us
                                                    </a>
                                                </li>
                                                <li>
                                                    <a onClick={handleSignOut} className="login">
                                                        &nbsp; <span className="hidden-xs">Sign out</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    ) : (
                                        <li className={`dropdown loginDropdown signpg ${dropdownOpen ? "open" : ""}`}>
                                            <a
                                                className="login"
                                                data-toggle="dropdown"
                                                href="javascript:void(0);"
                                                aria-expanded={dropdownOpen} // Dynamically set ARIA attribute
                                                onClick={toggleDropdown} // Toggle dropdown visibility
                                            >
                                                Account <span className="fa fa-angle-down support-icon" />
                                            </a>
                                            <ul className={`dropdown-menu withoutlogin ${dropdownOpen ? 'show' : ''}`}>
                                                <li>
                                                    <a href="#" onClick={showSignIn}>Sign in</a>
                                                </li>
                                                <li>
                                                    <a href="#" onClick={showSignUp} >Create an Account</a>
                                                </li>
                                            </ul>
                                        </li>
                                    )}
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
                            <a className="logo" href="/">
                                <img
                                    src="/assets/jetquins1.png"
                                    alt="https://www.JetQuinsTravel.com/"
                                    style={{ width: 200, marginTop: 10 }}
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
            {loading ? (
                <Loadings />
            ) : isLoggedIn ? (
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
                                                    <span className="displayusername_2">{username}</span>
                                                    <div className="small">
                                                        Last login: <br className="d-none d-xl-block" />
                                                        <span className="LastLoginDate">
                                                            {lastLoginTme}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="leftMenu">
                                            <ul>
                                                {menuItems.map((item) => (
                                                    <li key={item.id}>
                                                        <a
                                                            href="#"
                                                            className={`${item.className} removeAll ${activeTab === item.id ? "active" : ""}`}
                                                            onClick={(e) => {
                                                                e.preventDefault(); // Prevent default link behavior
                                                                handleTabClick(item.id, item.href);
                                                            }}
                                                        >
                                                            {item.label}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>{" "}



                                    {/* RIGHT CENTER SPACE */}

                                    {children}


                                </div>
                            </div>
                        </div>
                        {/*  \ Profile container / */}

                    </main>
                </div>
            ) : (
                <>
                    {isSignUp ? (
                        <UserSignUpComponent onSignInClick={showSignIn} />
                    ) : (
                        <UserSignInComponent onSignUpClick={showSignUp} onLoginSuccess={handleLoginSuccess} />
                    )}
                </>
            )}

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
                                    website, www.JetQuinsTravel.com, is for general purposes. All the
                                    necessary steps have been taken to ensure that the information
                                    displayed in the website is accurate and up- to-date. However, under
                                    no circumstance, We do not provide any warranty or representation,
                                    whether implied or expressed, when it comes to the accuracy,
                                    completeness or reliability of the information displayed on the
                                    website. If you need to have any queries answered, you can write to
                                    us at{" "}
                                    <a href="mailto:contact@JetQuinsTravel.com">contact@JetQuinsTravel.com</a>
                                </div>
                            </div>
                            <div className="copyright">
                                {" "}
                                Copyright © 2019-2024 • JetQuins Travel 2140 Hall Johnson Rd Ste 102-171 Grapevine, TX 76051
                                {" "}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    );
}
