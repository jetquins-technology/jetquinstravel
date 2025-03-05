"use client"
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SignInComponent from "../SignIn/page";
import SignUpComponent from "../SignUp/page";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const [mobMenuOpen, setMobMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loginPopupVisible, setLoginPopupVisible] = useState(false);
    const [signUpVisible, setSignUpVisible] = useState(false);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [dropdownOpens, setDropdownOpens] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const router = useRouter();

    // Function to toggle the dropdown visibility
    const toggleDropdown = () => {
        setDropdownOpens(!dropdownOpens);
    };

    // Handle sign out
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                // Remove user session info from sessionStorage
                sessionStorage.removeItem("user");
                setIsLoggedIn(false);
                setUsername('');
                localStorage.removeItem("current-user");

                // Show success toast message
                toast.success("You have successfully signed out.");
            })
            .catch((error) => {
                // Show error message if sign-out fails
                console.error("Sign-out error: ", error);
                toast.error("An error occurred while signing out. Please try again.");
            });
    };

    const handleNavigation = (route) => {
        router.push(`/${route}`);
        // router.push(path);
        setDropdownOpens(false);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const currentUser = localStorage.getItem('current-user');
            if (currentUser) {
                const user = JSON.parse(currentUser);
                setCurrentUser(user);
                setUsername(user.displayName);
            }
        }
    }, [])


    const hideLoginPopup = () => {
        setLoginPopupVisible(false);
    }

    const hideSignUp = () => {
        setSignUpVisible(false);
    }

    const showSignUp = () => {
        setSignUpVisible(true);
        setLoginPopupVisible(false);
    }

    const showSignIn = () => {
        setLoginPopupVisible(true);
        setSignUpVisible(false);
    }

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
                setIsLoggedIn(true);
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

    useEffect(() => {
        if (document) {
            let customScript = document.createElement("script");
            customScript.innerHTML = `
          $(window).resize(function () {
 if ($(window).width() <= 768) {
               $('.submenuLsit').hide();
            } else {
				$('.mobile-overlay').hide();
            }
			});
	$(document).ready(function() {
	
		$(".dealClick").click(function() {
			$(".submenuLsit").slideToggle();
			$(".nav.navbar-nav.navbar-right .dropdown").removeClass("open");
		});

		$('.submenuLsit a').click(function(event) {
			$('.submenuLsit').hide();
		});

		$('body').click(function(event) {
			$('.submenuLsit').hide();
		});

		$('.dealClick').click(function(event) {
			event.stopPropagation();
		});

		//Mobile Realted Deal 
			$(".dealClickMobile").click(function() {
			$(".submenuMobileLsit").slideToggle();
			$(this).toggleClass('active')
		});
		$(".submenuMobileLsit h4").click(function() {
			$(".submenuMobileLsit ul").slideUp('slow');
			$('.submenuMobileLsit h4').removeClass('active_lavel2');
			if (($(this).next(".submenuMobileLsit ul").css("display")) == "none") {
				$(this).next(".submenuMobileLsit ul").slideDown('slow');
				$(this).addClass('active_lavel2')
			}

		});
		//End
		
		//mobile menu
		//  $('.navbar-toggle').click(function(){
		// 	$(this).toggleClass('active')
		// 	$('.main_navigation').toggleClass('mainMenuopen')
		// 	$('.mobile-overlay').show();
		// 	$('.mobileMenuClose').addClass('active')
		// 	$('body').addClass('open-model')
		// });
		// $('.mobileMenuClose').click(function(){
		// 	$('.navbar-toggle').removeClass('active');
		// 	$('.main_navigation').removeClass('mainMenuopen')
		// 	$('.mobile-overlay').hide();
		// 	$('body').removeClass('open-model')
		// });
		

	});`;

            const gtag = document.createElement("script");
            gtag.src = "https://www.googletagmanager.com/gtag/js?id=AW-16665917801";

            const inlineScript = document.createElement('script');
            inlineScript.innerHTML = `
     window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'AW-16665917801');`

            //talk With Live Chat Code
            const tawktoScript = document.createElement("script");
            tawktoScript.type = "text/javascript";
            tawktoScript.innerHTML = `(function(){
      var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
      s1.async=true;
      s1.src='https://embed.tawk.to/66bce0ce146b7af4a43a7218/1i58ssag4';
      s1.charset='UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
    })();`;

            const clarityScript = document.createElement("script");
            clarityScript.innerHTML = `
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "nrs7azjqz2");`;


            document.body.appendChild(tawktoScript);
            document.body.appendChild(clarityScript);
            document.head.appendChild(customScript);
            document.head.appendChild(gtag);
            document.head.appendChild(inlineScript);
            document.head.appendChild(clarityScript)
            document.head.appendChild(tawktoScript)
            return (() => {
                document.head.removeChild(customScript);
                document.head.removeChild(gtag);
                document.head.removeChild(inlineScript);
                document.head.removeChild(clarityScript);
                document.head.removeChild(tawktoScript);
            })

        }
    }, [])

    // Function for live chat
    const showLiveChat = () => {
        if (window.Tawk_API && window.Tawk_API.showWidget) {
            window.Tawk_API.showWidget();
            window.Tawk_API.maximize();
        }
    };

    const closeMenu = () => {
        setMobMenuOpen(false);
    };

    const toggleMenu = () => {
        setMobMenuOpen(prev => !prev);
    };

    const isHomePage = router.pathname === "/";

    return <>
        <div className="header-call-strip">
            <a id="hdr_contactNo" href="tel:+1(888) 267-5955">
                <img src="/assets/images/uc/animation-call-white-icon.gif" width="22" height="22" /> Call Now:
                <span id="hdr_span">+1(888) 267-5955</span>
            </a>
        </div>
        <header className="navigation_block ">

            {/* <div className="header-call-strip">
                <a id="hdr_contactNo" href="tel:+1(888) 267-5955">
                    <img src="/assets/images/uc/animation-call-white-icon.gif" width="22" height="22" /> Call Now:
                    <span id="hdr_span">+1(888) 267-5955</span>
                </a>
            </div> */}

            <nav className="navbar-default navbar-static-top menuBox">
                <div className="container">

                    <div className="navbar-header">
                        <a href="#" className="chat-iconss visible-xs" style={{
                            position: "absolute",
                            right: "78px",
                            top: "-1px",
                            fontSize: "27px",
                            fontWeight: 700,
                            color: "#ff7f00"
                        }}></a>

                        <button onClick={toggleMenu} type="button" className="navbar-toggle">
                            <span className="sr-only">Toggle navigation</span>
                            {mobMenuOpen ? (
                                <span>
                                    {/* <a href="#" className="mobileMenuClose" onClick={closeMenu}>X</a> */}
                                </span>
                            ) : (
                                <>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </>
                            )}
                        </button>

                        {/* <a className="navbar-brand" href="/">
                            <div
                                style={{
                                    width: 218,
                                    height: 40,
                                    overflow: "hidden",
                                 
                                    alignItems: "center",

                                }}
                            >
                                <img
                                    src="/assets/jetquinsLogos.png"
                                    alt="Travel Logo"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain"
                                    }}
                                />
                            </div>
                        </a> */}

                        <a className="navbar-brand" href="/"><img src="/assets/jetquinsLogos.png" alt="/" /></a>

                    </div>

                    <div id="navbar" className={`navbar-collapse main_navigation ${mobMenuOpen ? 'mainMenuopen' : 'mainMenuClosed'}`}>
                        <a href="#" className="mobileMenuClose active" onClick={closeMenu}>
                            X
                        </a>
                        <div className="pull-right phone-number">
                            <div className="call_27">Call 24/7 for our best deals</div>
                            <a className="phoneNumber" id="nav_contactNo" href="tel:+1(888) 267-5955">
                                <img src="/assets/images/uc/newcall3a02.gif?1222" className="call-icon" alt="" />
                                +1(888) 267-5955
                            </a>
                        </div>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="/"> Flights</a></li>
                            {/* <li className="hidden-md hidden-sm hidden-xs"><a className="all-in-menu dealClick"
                                href="#" > Deals <span
                                    className="fa fa-angle-down support-icon"></span></a></li> */}
                            <li className="dropdown">
                                <a onClick={() => setDropdownOpen(prev => !prev)} className="dropdown-toggle" data-toggle="dropdown"
                                    role="button" aria-haspopup="true" aria-expanded="false">Support {dropdownOpen ? <span
                                        className="fa fa-angle-up support-icon"></span> : <span
                                            className="fa fa-angle-down support-icon"></span>}</a>
                                {dropdownOpen && <ul className="dropdown-menu">
                                    <li><a href="/contact-us" target="_blank"><i className="fa fa-address-book-o"
                                        aria-hidden="true"></i> Contact Us</a></li>
                                    <li role="separator" className="divider"></li>

                                    {/* For Live Chat  */}
                                    <a href="#" id="liveChatBtn" onClick={showLiveChat}>
                                        <i className="fa fa-comment-o" aria-hidden="true"></i> Live Chat
                                    </a>
                                </ul>}
                            </li>
                        </ul>
                    </div>

                    {/* Profile menu*/}
                    <ul className="profile_menu">
                        <li>
                            <div className="topmenuBox">

                                {!user || !sessionStorage.getItem('user') ? (
                                    <ul id="divlogin">
                                        <li className="dropdown loginDropdown">
                                            <a
                                                href="javascript:void(0);"
                                                onClick={() => setLoginPopupVisible(true)}
                                                className="login"
                                            >
                                                &nbsp;<span className="hidden-xs">Sign in</span>
                                            </a>
                                        </li>
                                    </ul>
                                ) : (

                                    <ul id="divwelcome">
                                        <li className="dropdown loginDropdown">
                                            <a href="javascript:void(0);" onClick={toggleDropdown} className="login">
                                                <span
                                                    id="displayusername_mob"
                                                    className="visible-xs short_name"
                                                >
                                                    {username.slice(0, 2)}
                                                </span>
                                                <span className="displayusername hidden-xs">
                                                    <span>Welcome</span>  {username}
                                                </span>
                                                &nbsp;
                                                <span className="fa fa-angle-down support-icon hidden-xs" />
                                            </a>

                                            {/* Dropdown Menu */}
                                            <ul
                                                className={`loginMenu ${dropdownOpens ? 'show' : ''}`} // Toggle visibility based on state
                                            >
                                                <li>
                                                    <a
                                                        tihref="javascript:void(0);"
                                                        onClick={() => handleNavigation(`mybooking/${currentUser.uid}`)}
                                                    >
                                                        My Booking
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        tihref="javascript:void(0);"
                                                        onClick={() => handleNavigation(`myinformation/${currentUser.uid}`)}
                                                    >
                                                        My Information
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0);"
                                                        onClick={() => handleNavigation(`latestoffer/${currentUser.uid}`)}
                                                    >
                                                        Latest Offer
                                                    </a>
                                                </li>
                                                <li id="profile_setting" style={{ display: 'block' }}>
                                                    <a href="javascript:void(0);"
                                                        onClick={() => handleNavigation(`settings/${currentUser.uid}`)}
                                                    >
                                                        Settings
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0);"
                                                        onClick={() => handleNavigation(`writetous/${currentUser.uid}`)}
                                                    >
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
                                    </ul>
                                )}
                            </div>
                        </li>
                    </ul>
                    {/* End profile menu*/}
                </div>
            </nav>

        </header>
        {loginPopupVisible && !signUpVisible && <SignInComponent hideLoginPopup={hideLoginPopup} showSignUp={showSignUp} />}
        {signUpVisible && !loginPopupVisible && <SignUpComponent hideSignUp={hideSignUp} showSignIn={showSignIn} />}
    </>
}

export default Navbar;