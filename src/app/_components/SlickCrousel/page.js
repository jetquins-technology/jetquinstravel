"use client"
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const FilterCarousel = () => {

    const airlineMatrixSetting = {
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        autoplay: false,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
        ],
    };
    return <>
        <Slider {...airlineMatrixSetting} className="airline-matrix" >
            <div className="matrix-data" id="1-NK">
                <ul>
                    <li
                        className="head"
                    // onClick={() => Filter.matrixFilter(0, 'NK', 0, 'False', '1-NK', 0)}
                    >
                        <img src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/nk.png" />
                        <div className="name">Spirit Airlines</div>
                    </li>
                    <li
                        className="matrix-cell mstop0 stop0NK"
                        id={11}
                    // onClick={() => Filter.matrixFilter(138.99, 'NK', 0, 'False', '1', '1')}
                    >
                        <i className="fa" />
                        $138.99
                    </li>
                    <li
                        className="matrix-cell mstop1 stop1NK"
                        id={12}
                    // onClick={() => Filter.matrixFilter(101.48, 'NK', 1, 'False', '1', '2')}
                    >
                        <i className="fa" />
                        $101.48
                    </li>
                </ul>
            </div>
            <div className="matrix-data" id="2-DL">
                <ul>
                    <li
                        className="head"
                    // onClick={() => Filter.matrixFilter(0, 'DL', 0, 'False', '2-DL', 0)}
                    >
                        <img src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/dl.png" />
                        <div className="name">Delta Airlines</div>
                    </li>
                    <li
                        className="matrix-cell mstop0 stop0DL"
                        id={21}
                    // onClick={() => Filter.matrixFilter(286.47, 'DL', 0, 'False', '2', '1')}
                    >
                        <i className="fa" />
                        $286.47
                    </li>
                    <li
                        className="matrix-cell mstop1 stop1DL"
                        id={22}
                    // onClick={() => Filter.matrixFilter(208.97, 'DL', 1, 'False', '2', '2')}
                    >
                        <i className="fa" />
                        $208.97
                    </li>
                </ul>
            </div>
            <div className="matrix-data" id="3-UA">
                <ul>
                    <li
                        className="head"
                    // onClick={() => Filter.matrixFilter(0, 'UA', 0, 'False', '3-UA', 0)}
                    >
                        <img src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/ua.png" />
                        <div className="name">United Airlines</div>
                    </li>
                    <li
                        className="matrix-cell mstop0 stop0UA"
                        id={31}
                    // onClick={() => Filter.matrixFilter(286.47, 'UA', 0, 'False', '3', '1')}
                    >
                        <i className="fa" />
                        $286.47
                    </li>
                    <li
                        className="matrix-cell mstop1 stop1UA"
                        id={32}
                    // onClick={() => Filter.matrixFilter(240.84, 'UA', 1, 'False', '3', '2')}
                    >
                        <i className="fa" />
                        $240.84
                    </li>
                </ul>
            </div>
            <div className="matrix-data" id="4-WN">
                <ul>
                    <li
                        className="head"
                    // onClick={() => Filter.matrixFilter(0, 'WN', 0, 'False', '4-WN', 0)}
                    >
                        <img src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/wn.png" />
                        <div className="name">Southwest Airlines</div>
                    </li>
                    <li
                        className="mstop0 stop0WN"
                        style={{ cursor: "default" }}
                    >
                        <i className="fa" />-
                    </li>
                    <li
                        className="matrix-cell mstop1 stop1WN"
                        id={42}
                    // onClick={() => Filter.matrixFilter(246.03, 'WN', 1, 'False', '4', '2')}
                    >
                        <i className="fa" />
                        $246.03
                    </li>
                </ul>
            </div>
            <div className="matrix-data" id="5-SY">
                <ul>
                    <li
                        className="head"
                    // onClick={() => Filter.matrixFilter(0, 'SY', 0, 'False', '5-SY', 0)}
                    >
                        <img src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/sy.png" />
                        <div className="name">Sun Country</div>
                    </li>
                    <li
                        className="mstop0 stop0SY"
                        style={{ cursor: "default" }}
                    >
                        <i className="fa" />-
                    </li>
                    <li
                        className="matrix-cell mstop1 stop1SY"
                        id={52}
                    // onClick={() => Filter.matrixFilter(281.63, 'SY', 1, 'False', '5', '2')}
                    >
                        <i className="fa" />
                        $281.63
                    </li>
                </ul>
            </div>
            <div className="matrix-data" id="6-B6">
                <ul>
                    <li
                        className="head"
                    // onClick={() => Filter.matrixFilter(0, 'B6', 0, 'False', '6-B6', 0)}
                    >
                        <img src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/b6.png" />
                        <div className="name">Jetblue</div>
                    </li>
                    <li
                        className="matrix-cell mstop0 stop0B6"
                        id={61}
                    // onClick={() => Filter.matrixFilter(286.1, 'B6', 0, 'False', '6', '1')}
                    >
                        <i className="fa" />
                        $286.10
                    </li>
                    <li
                        className="matrix-cell mstop1 stop1B6"
                        id={62}
                    // onClick={() => Filter.matrixFilter(295.61, 'B6', 1, 'False', '6', '2')}
                    >
                        <i className="fa" />
                        $295.61
                    </li>
                </ul>
            </div>
            <div className="matrix-data" id="7-AA">
                <ul>
                    <li
                        className="head"
                    // onClick={() => Filter.matrixFilter(0, 'AA', 0, 'False', '7-AA', 0)}
                    >
                        <img src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/aa.png" />
                        <div className="name">American Airlines</div>
                    </li>
                    <li
                        className="matrix-cell mstop0 stop0AA"
                        id={71}
                    // onClick={() => Filter.matrixFilter(286.47, 'AA', 0, 'False', '7', '1')}
                    >
                        <i className="fa" />
                        $286.47
                    </li>
                    <li
                        className="matrix-cell mstop1 stop1AA"
                        id={72}
                    // onClick={() => Filter.matrixFilter(295.97, 'AA', 1, 'False', '7', '2')}
                    >
                        <i className="fa" />
                        $295.97
                    </li>
                </ul>
            </div>
            <div className="matrix-data" id="8-AS">
                <ul>
                    <li
                        className="head"
                    // onClick={() => Filter.matrixFilter(0, 'AS', 0, 'False', '8-AS', 0)}
                    >
                        <img src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/as.png" />
                        <div className="name">Alaska Airlines</div>
                    </li>
                    <li
                        className="mstop0 stop0AS"
                        style={{ cursor: "default" }}
                    >
                        <i className="fa" />-
                    </li>
                    <li
                        className="matrix-cell mstop1 stop1AS"
                        id={82}
                    // onClick={() => Filter.matrixFilter(295.6, 'AS', 1, 'False', '8', '2')}
                    >
                        <i className="fa" />
                        $295.60
                    </li>
                </ul>
            </div>
            <div className="matrix-data" id="9-DL">
                <ul>
                    <li
                        className="head"
                    // onClick={() => Filter.matrixFilter(0, 'DL', 0, 'True', '9-DL', 0)}
                    >
                        <span
                            className="tooltip-custom"
                            style={{ left: "20%", position: "absolute" }}
                        >
                            <img
                                src="/assets/images/listing/mal-blue.png"
                                className="mix-air"
                            />
                            <div className="promo-detail">
                                <p className="mb5px">
                                    Indicate Multiple Airline
                                </p>
                            </div>
                        </span>
                        <img src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/dl.png" />
                        <div className="name">Delta Airlines</div>
                    </li>
                    <li
                        className="mstop0 stop0DL_M"
                        style={{ cursor: "default" }}
                    >
                        <i className="fa" />-
                    </li>
                    <li
                        className="matrix-cell mstop1 stop1DL_M"
                        id={92}
                    // onClick={() => Filter.matrixFilter(613.98, 'DL', 1, 'True', '9', '2')}
                    >
                        <i className="fa" />
                        $613.98
                    </li>
                </ul>
            </div>
            <div className="matrix-data" id="10-AS">
                <ul>
                    <li
                        className="head"
                    // onClick={() => Filter.matrixFilter(0, 'AS', 0, 'True', '10-AS', 0)}
                    >
                        <span
                            className="tooltip-custom"
                            style={{ left: "20%", position: "absolute" }}
                        >
                            <img
                                src="/assets/images/listing/mal-blue.png"
                                className="mix-air"
                            />
                            <div className="promo-detail">
                                <p className="mb5px">
                                    Indicate Multiple Airline
                                </p>
                            </div>
                        </span>
                        <img src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/as.png" />
                        <div className="name">Alaska Airlines</div>
                    </li>
                    <li
                        className="mstop0 stop0AS_M"
                        style={{ cursor: "default" }}
                    >
                        <i className="fa" />-
                    </li>
                    <li
                        className="matrix-cell mstop1 stop1AS_M"
                        id={102}
                    // onClick={() => Filter.matrixFilter(613.98, 'AS', 1, 'True', '10', '2')}
                    >
                        <i className="fa" />
                        $613.98
                    </li>
                </ul>
            </div>
            <div className="matrix-data" id="11-UA">
                <ul>
                    <li
                        className="head"
                    // onClick={() => Filter.matrixFilter(0, 'UA', 0, 'True', '11-UA', 0)}
                    >
                        <span
                            className="tooltip-custom"
                            style={{ left: "20%", position: "absolute" }}
                        >
                            <img
                                src="/assets/images/listing/mal-blue.png"
                                className="mix-air"
                            />
                            <div className="promo-detail">
                                <p className="mb5px">
                                    Indicate Multiple Airline
                                </p>
                            </div>
                        </span>
                        <img src="https://cmsrepository.com/static/flights/flight/airlinelogo-png/ua.png" />
                        <div className="name">United Airlines</div>
                    </li>
                    <li
                        className="mstop0 stop0UA_M"
                        style={{ cursor: "default" }}
                    >
                        <i className="fa" />-
                    </li>
                    <li
                        className="matrix-cell mstop1 stop1UA_M"
                        id={112}
                    // onClick={() => Filter.matrixFilter(661.98, 'UA', 1, 'True', '11', '2')}
                    >
                        <i className="fa" />
                        $661.98
                    </li>
                </ul>
            </div>

        </Slider>
    </>
}

export default FilterCarousel;