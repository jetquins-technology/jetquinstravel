'use client';

const Settings = () => {

    return (
        <>
            <div className="rightCntr" id="settings" style={{ display: "block" }}>
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
                            Enter the email you use for jetquins travelss and we'll send your
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
        </>
    )

}

export default Settings;