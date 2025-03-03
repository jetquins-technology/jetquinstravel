const CountactUs = () => {
    return <div className="body-content">
        <div className="content-header-Block">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <h2>Contact Us</h2>
                    </div>
                </div>
            </div>
        </div>
        <div className="contact-wrapper">
            <div className="container">
                <div className="col-md-5 col-sm-12">
                    <h2>USA Office</h2>
                    <div className="contact-block">
                        <div className="row">
                            <div className="col-xs-12">
                                <address>
                                    <i className="fa fa-map-marker" />
                                    JetQuins Travel
                                    <br />2140 Hall Johnson
                                    <br />
                                    Rd Ste 102-171 Grapevine, TX 76051
                                </address>
                            </div>
                            <div className="col-xs-12">
                                <i className="fa fa-phone" />{" "}
                                <a href="tel:+1(888) 267-5955">+1(888) 267-5955</a>
                            </div>
                            <div className="col-xs-12">
                                <i className="fa fa-envelope-o" />
                                <a href="/cdn-cgi/l/email-protection#83f0f6f3f3ecf1f7c3efecece8e1fae5e2f1e6ade0ecee">
                                    <span
                                        className="__cf_email__"
                                        data-cfemail="82f1f7f2f2edf0f6c2eeedede9e0fbe4e3f0e7ace1edef"
                                    >
                                        support@JetQuinsTravel.com
                                    </span>
                                </a>
                            </div>
                            <div className="col-xs-12">
                                <a href="javascript:$zopim.livechat.window.show();">
                                    <i className="fa fa-comment-o" aria-hidden="true" /> Live Chat
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-7 col-sm-12">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3019.9863431896606!2d-74.08046497056765!3d40.80629389405512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2562ae7c33801%3A0x30dc5518963b1543!2s1%20Meadowlands%20Plaza%20Suit%20200%2C%20East%20Rutherford%2C%20NJ%2007073%2C%20USA!5e0!3m2!1sen!2sin!4v1693558997529!5m2!1sen!2sin"
                        style={{ border: "1px solid #ccc" }}
                        width="100%"
                        height={400}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </div>
    </div>

}


export default CountactUs;