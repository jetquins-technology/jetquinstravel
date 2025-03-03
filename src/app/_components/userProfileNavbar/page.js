import "./usernav.module.css"

const userNav = () => {
    return <>
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
                                                className="mytrip removeAll"
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
                                                className="setting settings removeAll active"
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

        <header className="header">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <a className="logo" href="https://www.lookbyfare.com/us/">
                            <img
                                src="/us/profile/profile/lbyf/images/logo.png"
                                alt="logo"
                                style={{ width: 160, marginTop: 10 }}
                            />
                        </a>
                        <div className="topmenuBox">
                            <ul>
                                <li>
                                    <a href="https://www.lookbyfare.com/us/flight">Flights</a>
                                </li>
                                <li>
                                    <a href="https://www.lookbyfare.com/us/hotel/">Hotels</a>
                                </li>
                                <li>
                                    <a href="https://www.lookbyfare.com/us/car/">Cars</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>


    </>
}
export default userNav;