"use client";
import blogThumbs from "@/assets/scraped_thumbs.json";
import { useRouter } from 'next/navigation';

const blogs = () => {
    const router = useRouter();

    const handleReadMoreClick = (e) => {
        e.preventDefault();
        router.push("/blogData/djsdsd");
    }
    return (
        <>
            <section className="section bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="bg-light shadow-md rounded p-3">
                                <h1>How to Communicate with Lufthansa?</h1>
                                <p>
                                    Reaching out to Lufthansa for support is straightforward with
                                    various communication options at your disposal. Whether you prefer
                                    talking to a representative directly, using the live chat feature,
                                    or even sending an email, Lufthansa provides multiple channels to
                                    address your needs. Explore the best ways to connect as explained by
                                    FlyoStudio and get the assistance you require efficiently.
                                </p>
                                <h2>How to Contact Lufthansa Customer Service Team?</h2>
                                <p>
                                    When it comes to reaching Lufthansa Airlines customer service, there
                                    are several convenient options to ensure you get the assistance you
                                    need. If you prefer speaking directly to a representative, you can
                                    dial the Lufthansa customer service number, +1-800-645-3880 or
                                    +1-844-414-9223. This allows for immediate, personalized support.
                                </p>
                                <p>
                                    For those who enjoy digital communication, the Lufthansa website
                                    features a live chat function. Their virtual assistant, Elisa, is
                                    available around the clock to assist with flight inquiries,
                                    rebooking, and refunds.
                                </p>
                                <p>
                                    Emailing Lufthansa’s customer service department is another
                                    straightforward way to address your concerns.
                                </p>
                                <p>
                                    If you’re already in the air and need help, Lufthansa offers a free
                                    messaging service through FlyNet. Simply access the FlyNet portal on
                                    your mobile device, log in with your Travel ID, and select "Free
                                    Messaging" to get support while you travel.
                                </p>
                                <p>
                                    For formal complaints, Lufthansa provides an online complaint form.
                                    They commit to responding to submissions within 30 days. Each of
                                    these channels ensures you can stay connected and resolve any issues
                                    efficiently.
                                </p>
                                <h3>
                                    What are some tips for effective communication with Lufthansa?
                                </h3>
                                <ul>
                                    <li>
                                        Be Clear and Specific: Provide detailed information about your
                                        issue.
                                    </li>
                                    <li>
                                        Use Proper Channels: Choose the most suitable contact method.
                                    </li>
                                    <li>
                                        Keep Records: Document all interactions for future reference.
                                    </li>
                                    <li>
                                        Stay Polite: Approach representatives with courtesy for better
                                        assistance.
                                    </li>
                                    <li>
                                        Prepare Your Details: Have your Travel ID and booking info handy.
                                    </li>
                                    <li>Be Concise: Get to the point to save time.</li>
                                    <li>Follow Up: Check in if you haven’t heard back.</li>
                                    <li>Use the Chat Feature: For quick and real-time help.</li>
                                    <li>
                                        Leverage Free Messaging: Reach out during your flight via FlyNet.
                                    </li>
                                    <li>
                                        Submit Complaints Thoughtfully: Fill out the form thoroughly and
                                        accurately.
                                    </li>
                                </ul>
                                <p>
                                    These are some tips for effective communication with Lufthansa which
                                    you can adapt for a more convenient trip.
                                </p>
                                <p>
                                    For efficient communication with Lufthansa, choose the method that
                                    suits your needs best. From phone calls to live chat and email, each
                                    option is designed to provide prompt support. Utilizing these
                                    channels effectively ensures that your queries are addressed
                                    swiftly, whether you’re resolving issues or seeking information.
                                    Stay connected and enjoy a smoother experience with Lufthansa’s
                                    diverse communication tools. Call FlyoStudio at +1-800-645-3880 or
                                    +1-844-414-9223 to know more about Lufthansa policies &amp; more.
                                </p>
                            </div>
                            <div className="mt-4">
                                <div id="ContentPlaceHolder1_UPnlPkg">
                                    <div className="leave-coment mb-4" style={{ paddingTop: 0 }}>
                                        <div className="c-comment">Leave Comments</div>
                                        <div className="row">
                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                <div id="ContentPlaceHolder1_Rating1">
                                                    <input
                                                        type="hidden"
                                                        name="ctl00$ContentPlaceHolder1$Rating1_RatingExtender_ClientState"
                                                        id="ContentPlaceHolder1_Rating1_RatingExtender_ClientState"
                                                        defaultValue={3}
                                                    />
                                                    <a
                                                        href="javascript:void(0)"
                                                        id="ContentPlaceHolder1_Rating1_A"
                                                        title={3}
                                                        style={{ textDecoration: "none" }}
                                                    >
                                                        <span
                                                            id="ContentPlaceHolder1_Rating1_Star_1"
                                                            className="shiningstar"
                                                            style={{ float: "left" }}
                                                        >
                                                            &nbsp;
                                                        </span>
                                                        <span
                                                            id="ContentPlaceHolder1_Rating1_Star_2"
                                                            className="shiningstar"
                                                            style={{ float: "left" }}
                                                        >
                                                            &nbsp;
                                                        </span>
                                                        <span
                                                            id="ContentPlaceHolder1_Rating1_Star_3"
                                                            className="shiningstar"
                                                            style={{ float: "left" }}
                                                        >
                                                            &nbsp;
                                                        </span>
                                                        <span
                                                            id="ContentPlaceHolder1_Rating1_Star_4"
                                                            className="blankstar blankstar"
                                                            style={{ float: "left" }}
                                                        >
                                                            &nbsp;
                                                        </span>
                                                        <span
                                                            id="ContentPlaceHolder1_Rating1_Star_5"
                                                            className="blankstar blankstar"
                                                            style={{ float: "left" }}
                                                        >
                                                            &nbsp;
                                                        </span>
                                                    </a>
                                                </div>
                                                <br />
                                                <span id="ContentPlaceHolder1_lblRatingStatus" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                <div className="b-form form-group">
                                                    <input
                                                        name="ctl00$ContentPlaceHolder1$txtName"
                                                        type="text"
                                                        id="ContentPlaceHolder1_txtName"
                                                        className="form-control form-m"
                                                        placeholder="Name"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                <div className="b-form form-group">
                                                    <input
                                                        name="ctl00$ContentPlaceHolder1$txtEmail"
                                                        type="text"
                                                        id="ContentPlaceHolder1_txtEmail"
                                                        className="form-control form-m"
                                                        placeholder="Email"
                                                    />
                                                </div>
                                            </div>
                                            <div style={{ clear: "both" }} />
                                            <div className="col-md-12">
                                                <div className="b-form form-group">
                                                    <textarea
                                                        name="ctl00$ContentPlaceHolder1$txtMessage"
                                                        rows={2}
                                                        cols={20}
                                                        id="ContentPlaceHolder1_txtMessage"
                                                        className="form-control form-m"
                                                        placeholder="Comment"
                                                        style={{ height: 120 }}
                                                        defaultValue={""}
                                                    />
                                                    <br />
                                                </div>
                                            </div>
                                            <div className="col-md-12 col-sm-6 col-xs-12">
                                                <div className="b-form form-group text-center">
                                                    <input
                                                        type="submit"
                                                        name="ctl00$ContentPlaceHolder1$btnSubmit"
                                                        defaultValue="Submit"
                                                        onclick=" return validate();"
                                                        id="ContentPlaceHolder1_btnSubmit"
                                                        className="btn btn-primary"
                                                    />
                                                    <br />
                                                    <span
                                                        id="ContentPlaceHolder1_lblMsg"
                                                        style={{ color: "Green" }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        id="ContentPlaceHolder1_UpdateProgress3"
                                        style={{ display: "none" }}
                                        role="status"
                                        aria-hidden="true"
                                    >
                                        <div id="loading">
                                            <img
                                                id="loading-image"
                                                src="admin/images/loader.gif"
                                                alt="Loading..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="leave-coment">
                                <div className="c-comment">Customer Reviews</div>
                                <ul className="comment-list mt-30  mt-sm-20"></ul>
                            </div>
                        </div>
                        <div className="col-lg-4 mt-4 mt-lg-0">
                                    <div className="shadow-md" style={{ padding: 20 }}>
                                        <h1 className="text-6">Recent Blog</h1>
                                        <div className="sidebar-contant pt-3">
                                            <div className="thumb-box">
                                                <figure>
                                                    <figcaption>
                                                        {blogThumbs.map((thumbs, index) => (
                                                            <div className="thumb-detail-info">
                                                                <a
                                                                    href={thumbs.url}
                                                                    title="how do i talk to a live person at aa"
                                                                    onClick={(e) => handleReadMoreClick(e)}
                                                                >
                                                                    {thumbs.title}
                                                                </a>
                                                                <div className="post-info">{thumbs.post_date}</div>
                                                            </div>
                                                        ))}
                        
                                                    </figcaption>
                                                </figure>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default blogs;