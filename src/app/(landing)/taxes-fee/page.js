const PostTicketing = () => {
    return <div className="body-content" bis_skin_checked={1}>
        <div className="content-header-Block" bis_skin_checked={1}>
            <div className="container" bis_skin_checked={1}>
                <div className="row" bis_skin_checked={1}>
                    <div className="col-sm-12 text-center" bis_skin_checked={1}>
                        <h2>Taxes &amp; Fees</h2>
                    </div>
                </div>
            </div>
        </div>
        <div className="pet-policy-Block" bis_skin_checked={1}>
            <div className="container" bis_skin_checked={1}>
                <div className="row" bis_skin_checked={1}>
                    <div className="col-sm-12" bis_skin_checked={1}>
                        <div id="tax" className="table_data" bis_skin_checked={1}>
                            <table width="100%" cellSpacing={0} cellPadding={0} border={0}>
                                <tbody>
                                    <tr>
                                        <th>Description of Fees &amp; Taxes</th>
                                        <th>Applicable to</th>
                                        <th>Code</th>
                                        <th>Price</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>Travel Facilities Tax</b>
                                            <p>
                                                This tax is applicable to specific flights routed to or
                                                from Alaska or Hawaii.
                                            </p>
                                        </td>
                                        <td>U.S. Domestic and International</td>
                                        <td>US</td>
                                        <td>
                                            <strong>$9.90</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>U.S. Federal Segment Fee</b>
                                            <p>
                                                This tax is applicable to flights per segment routed
                                                within the United States.
                                            </p>
                                        </td>
                                        <td>U.S. Domestic and International</td>
                                        <td>ZP</td>
                                        <td>
                                            <strong>$4.50</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>U.S. Excise Tax </b>
                                            <p>
                                                This tax is a small percentage of flights that is
                                                applicable to all flights routed within the United States.
                                                Also applicable to flights within the Canada/Mexico
                                                225-mile buffer zones.
                                            </p>
                                        </td>
                                        <td>U.S. Domestic and International</td>
                                        <td>US</td>
                                        <td>
                                            <strong>7.50%</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>Passenger Facility Charge (PFC)</b>
                                            <p>
                                                This facility charge is a variable fee applicable on per
                                                itinerary for improvement of passenger facility at the
                                                airport.
                                            </p>
                                        </td>
                                        <td>U.S. Domestic and International</td>
                                        <td>XF</td>
                                        <td>
                                            <strong>up to $18</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>U.S. Passenger Civil Aviation Security Fee</b>
                                            <p>
                                                This is a security fee about $5.60 per one way based on
                                                the total number of passengers boarding the flight.
                                            </p>
                                        </td>
                                        <td>U.S. Domestic and International</td>
                                        <td>AY</td>
                                        <td>
                                            <strong>$11.20</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>U.S. International Transportation Tax</b>
                                            <p>
                                                This tax is applicable to all flights routed to and from
                                                the United States, U.S Virgin Islands or Puerto Rico.
                                            </p>
                                        </td>
                                        <td>International</td>
                                        <td>US</td>
                                        <td>
                                            <strong>$19.70</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>U.S. Animal and Plant Health Inspection Service Fee</b>
                                            <p>
                                                Applies to all flights originating abroad, except Canada,
                                                and landing in the United States, Puerto Rico, or the U.S.
                                                Virgin Islands.
                                            </p>
                                        </td>
                                        <td>International</td>
                                        <td>XA</td>
                                        <td>
                                            <strong>$3.83</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>U.S. Immigration and Naturalization Fee</b>
                                        </td>
                                        <td>International</td>
                                        <td>XY</td>
                                        <td>
                                            <strong>$7.00</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p>
                                                Applies to international arrivals to the United States,
                                                Puerto Rico, or the U.S. Virgin Islands.
                                            </p>
                                        </td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>U.S. Customs User Fee</b>
                                            <p>
                                                This fee is applicable to all international flights routed
                                                outside the customs territory.
                                            </p>
                                        </td>
                                        <td>International</td>
                                        <td>YC</td>
                                        <td>
                                            <strong>$6.52</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>
                                                International Taxes and Government or Airport-imposed fees
                                            </b>
                                            <p id="serviceFeesc">
                                                This fee is applicable to cover the cost of inspection
                                                fees, security fees and various other taxes levied
                                                according to international norms.
                                            </p>
                                        </td>
                                        <td>International</td>
                                        <td>Varies</td>
                                        <td>
                                            <strong>up to $349*</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>Our Service Fees ‡</b>
                                            <p>
                                                Online Air Transaction Services Fees
                                                <br />
                                                Depending on the cabin type, trip type and certain other
                                                factors, a service fee of up to $100 is charged per person
                                                for all passenger types**
                                            </p>
                                        </td>
                                        <td>
                                            <p>U.S. Domestic and International</p>
                                        </td>
                                        <td>
                                            <p>Fees</p>
                                        </td>
                                        <td>
                                            <p>
                                                <strong>$0.00 to $100.00*</strong>
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>
                            <b>Disclaimers</b>
                            <br />
                            *Approximate amount ** Passenger types = Adult, child, senior,
                            infant, student, military.
                            <br />
                            ‡ All transaction services fees are non-refundable and are subject
                            to change without notice.
                            <br />
                            Goverment imposed taxes and fees are subject to change without prior
                            notice.
                            <br />
                            Services fees will be converted into your local currency.
                            <br />
                            Trips where you visit multiple cities and return home/city of origin
                            from the city you visited last - Up to $100 chargeable per passenger
                            as service fee irrespective of the passenger type ticket. <br />
                            Multi airline trips / Cities with staggering rate of frauds - Up to
                            $50 chargeable per passenger as service fee irrespective of the
                            passenger type ticket. <br />
                            For certain airlines, a service fee of up to $40 per passenger can
                            be charged.
                            <br />
                            Nearby Airport &amp; Alternative Date - Up to $50 chargeable per
                            passenger as service fee. <br />
                            Fusion Fares - Up to $100 chargeable per passenger as service fee.
                            <br />
                            Service fees on bookings made through customer care center - For
                            bookings made through customer care center including round-the-world
                            as well as complex multi-stop itineraries, the service fee
                            chargeable may be higher than the one applicable when the bookings
                            are made online. This service fee is between $10 and $200. Senior
                            citizens are charged up to only $100. Premium package benefits are
                            included in Contact Center bookings.
                        </p>
                        <p>
                            <b>NOTE</b> All services fees are subject to change without notice.
                            YOU WILL BE CHARGED THE FINAL TOTAL PRICE AS QUOTED REGARDLESS OF
                            ANY CHANGES OR VARIANCE IN THE FEES. Kindly review the total final
                            price carefully.
                        </p>
                        <div
                            id="post-ticketing"
                            style={{ height: 50, clear: "both" }}
                            bis_skin_checked={1}
                        />
                        <div className="component-city-content" bis_skin_checked={1}>
                            <div className="table_data table_data2" bis_skin_checked={1}>
                                <table cellSpacing={0} cellPadding={0}>
                                    <tbody>
                                        <tr height={27}>
                                            <th
                                                colSpan={10}
                                                rowSpan={2}
                                                style={{ background: "#fff", color: "#333" }}
                                            >
                                                <h3>
                                                    <b>Post-Ticketing Service Fees ‡‡</b>
                                                </h3>
                                            </th>
                                        </tr>
                                        <tr height={20}> </tr>
                                        <tr height={20}>
                                            <th colSpan={3} height={20}>
                                                Applies To
                                            </th>
                                            <th colSpan={3}>For</th>
                                            <th colSpan={4}>Cancelation &amp; Refund (Within 4 hrs)</th>
                                        </tr>
                                        <tr height={20}>
                                            <td colSpan={3} rowSpan={4} height={80}>
                                                Agent Assisted Cancelation(1)
                                            </td>
                                            <td colSpan={3} rowSpan={4} width={198}>
                                                Cancelation &amp; Refund requested within 4 hours of
                                                booking
                                            </td>
                                            <td colSpan={4} rowSpan={4} width={388}>
                                                Flat $25{" "}
                                            </td>
                                        </tr>
                                        <tr height={20}> </tr>
                                        <tr height={20}> </tr>
                                        <tr height={20}> </tr>
                                        <tr height={20}>
                                            <th colSpan={3} height={20}>
                                                Applies To
                                            </th>
                                            <th colSpan={3}>For</th>
                                            <th colSpan={4}>
                                                Cancelation &amp; Refund (Within 4-24 hrs)
                                            </th>
                                        </tr>
                                        <tr height={20}>
                                            <td colSpan={3} rowSpan={4} height={80}>
                                                Agent Assisted Cancellation(1)
                                            </td>
                                            <td colSpan={3} rowSpan={4} width={198}>
                                                Cancelation &amp; Refund requested within 4-24 hours of
                                                booking
                                            </td>
                                            <td colSpan={4} rowSpan={4} width={388}>
                                                Ticket Cost $300: $25
                                                <br />
                                                Ticket Cost $301 - $400: $35
                                                <br />
                                                Ticket Cost $401 - $500: $50
                                                <br />
                                                Ticket Cost $501 - $750: $75
                                                <br />
                                                Ticket Cost above $750: 10% of Gross Ticket Amount
                                            </td>
                                        </tr>
                                        <tr height={20}> </tr>
                                        <tr height={20}> </tr>
                                        <tr height={20}> </tr>
                                        <tr height={20}>
                                            <th colSpan={3} height={20}>
                                                Applies To
                                            </th>
                                            <th colSpan={3}>For</th>
                                            <th colSpan={4}>Cancelation (beyond 24 hrs)</th>
                                        </tr>
                                        <tr height={20}>
                                            <td colSpan={3} rowSpan={4} height={80} width={199}>
                                                Agent Assisted Cancelation w/Future Credit(1)
                                            </td>
                                            <td colSpan={3} rowSpan={4} width={198}>
                                                Cancelation &amp; Refunds (beyond 24 hrs)
                                            </td>
                                            <td colSpan={2}>Air - Economy</td>
                                            <td colSpan={2}>Air - Business/First</td>
                                        </tr>
                                        <tr height={20}>
                                            <td height={20}>Domestic</td>
                                            <td>International</td>
                                            <td>Domestic</td>
                                            <td>International</td>
                                        </tr>
                                        <tr height={20}>
                                            <td rowSpan={2} height={40}>
                                                $30&nbsp;
                                            </td>
                                            <td rowSpan={2}>$30&nbsp;</td>
                                            <td rowSpan={2}>$50&nbsp;</td>
                                            <td rowSpan={2}>$50&nbsp;</td>
                                        </tr>
                                        <tr height={20}> </tr>
                                        <tr height={20}>
                                            <th colSpan={3} height={20}>
                                                Applies To
                                            </th>
                                            <th colSpan={3}>For </th>
                                            <th colSpan={4}>Refund (beyond 24 hrs)</th>
                                        </tr>
                                        <tr height={20}>
                                            <td colSpan={3} rowSpan={4} height={80} width={199}>
                                                Agent Assisted Cancelation w/Refund(2)
                                            </td>
                                            <td colSpan={3} rowSpan={4} width={198}>
                                                Cancelation &amp; Refunds (beyond 24 hrs)
                                            </td>
                                            <td colSpan={2}>Air - Economy</td>
                                            <td colSpan={2}>Air - Business/First</td>
                                        </tr>
                                        <tr height={20}>
                                            <td height={20}>Domestic</td>
                                            <td>International</td>
                                            <td>Domestic</td>
                                            <td>International</td>
                                        </tr>
                                        <tr height={20}>
                                            <td rowSpan={2} height={40}>
                                                $75{" "}
                                            </td>
                                            <td rowSpan={2}>$100 </td>
                                            <td rowSpan={2}>$125 </td>
                                            <td rowSpan={2}>$125 </td>
                                        </tr>
                                        <tr height={20}> </tr>
                                        <tr height={20}>
                                            <th colSpan={10} rowSpan={3}>
                                                <h3 style={{ margin: 0, color: "#fff" }}>
                                                    Changes to Existing Tickets (exchange)
                                                </h3>
                                            </th>
                                        </tr>
                                        <tr height={20}> </tr>
                                        <tr height={20}> </tr>
                                        <tr height={20}>
                                            <td colSpan={6} rowSpan={2} height={40}>
                                                Agent Assisted Changes
                                            </td>
                                            <td colSpan={2}>Air - Economy</td>
                                            <td colSpan={2}>Air - Business/First</td>
                                        </tr>
                                        <tr height={20}>
                                            <td height={20}>Domestic</td>
                                            <td>International</td>
                                            <td>Domestic</td>
                                            <td>International</td>
                                        </tr>
                                        <tr height={20}>
                                            <td colSpan={6} rowSpan={2} height={40}>
                                                Within 10 days of new travel date(1)
                                            </td>
                                            <td rowSpan={2}>$75 </td>
                                            <td rowSpan={2}>$75 </td>
                                            <td rowSpan={2}>$100 </td>
                                            <td rowSpan={2}>$100 </td>
                                        </tr>
                                        <tr height={20}> </tr>
                                        <tr height={20}>
                                            <td colSpan={6} rowSpan={2} height={40}>
                                                Beyond 10 days of new travel date(2)
                                            </td>
                                            <td rowSpan={2}>$75 </td>
                                            <td rowSpan={2}>$75 </td>
                                            <td rowSpan={2}>$100 </td>
                                            <td rowSpan={2}>$100 </td>
                                        </tr>
                                        <tr height={20}> </tr>
                                        <tr height={20}>
                                            <th colSpan={10} rowSpan={3}>
                                                <h3 style={{ margin: 0, color: "#fff" }}>
                                                    Special Services
                                                </h3>
                                            </th>
                                        </tr>
                                        <tr height={20}> </tr>
                                        <tr height={20}> </tr>
                                        <tr height={20}>
                                            <td colSpan={6} rowSpan={4} height={80}>
                                                Agent Assisted Waivers
                                            </td>
                                            <td colSpan={2}>Air - Economy</td>
                                            <td colSpan={2}>Air - Business/First</td>
                                        </tr>
                                        <tr height={20}>
                                            <td height={20}>Domestic</td>
                                            <td>International</td>
                                            <td>Domestic</td>
                                            <td>International</td>
                                        </tr>
                                        <tr height={20}>
                                            <td rowSpan={2} height={40}>
                                                $50{" "}
                                            </td>
                                            <td rowSpan={2}>$75 </td>
                                            <td rowSpan={2}>$100 </td>
                                            <td rowSpan={2}>$150 </td>
                                        </tr>
                                        <tr height={20}> </tr>
                                        <tr height={20}>
                                            <td colSpan={10} rowSpan={2} height={40}>
                                                <strong>
                                                    Fees for Agent Assistance Seeking Refund or Future
                                                    Airline Credit for Listed Reasons
                                                </strong>
                                            </td>
                                        </tr>
                                        <tr height={20}> </tr>
                                        <tr height={20}>
                                            <td colSpan={3} height={20}>
                                                Death/Bereavement&nbsp;
                                            </td>
                                            <td colSpan={3}>Duplicate booking</td>
                                            <td colSpan={3}>Medical</td>
                                            <td>Name Change</td>
                                        </tr>
                                        <tr height={20}>
                                            <td colSpan={3} height={20}>
                                                Name Correction
                                            </td>
                                            <td colSpan={3}>No Show</td>
                                            <td colSpan={3}>Routing Changes</td>
                                            <td>UNMR</td>
                                        </tr>
                                        <tr height={20}>
                                            <td colSpan={3} height={20}>
                                                Visa Issues
                                            </td>
                                            <td colSpan={3}>Denied Boarding</td>
                                            <td />
                                            <td />
                                            <td />
                                            <td>&nbsp;</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <h3>Other Terms &amp; Conditions</h3>
                        <div style={{ textAlign: "justify" }} bis_skin_checked={1}>
                            <p>
                                All Airline Refunds/Future Credits are subject to each airline
                                fare rules, policies and procedures Service fees on all changes,
                                refunds, cancelations and future credits will be charged on a per
                                passenger, per ticket basis.
                                <br /> <br />
                                ‡ All our post-ticketing service fees are non-refundable and are
                                subject to change without notice. Our fees are in addition to any
                                airline and/or other supplier imposed fees and charges.
                                <br /> <br />
                                ‡ Government imposed taxes and fees are subject to change. You
                                will only be charged the final total amount displayed or quoted by
                                our agent.
                                <br /> <br />
                                (1) - Most of our airline tickets are non-refundable. Only
                                available if our Travel Suppliers' fare rules allow cancelation
                                and refunds, and we have accepted your request for a refund, you
                                are not a "no show" (most "no show" bookings are in-eligible for
                                any waiver from suppliers for refund processing), and if we are
                                able to secure waivers from suppliers to process this requested
                                cancelation and refund.
                                <br /> <br />
                                (2) - Most of our airline tickets are non-refundable. Airline
                                Refunds/Future credits are subject to airline fare rules, policies
                                and procedures.
                                <br /> <br />
                                Special Services - All Special Services are on a request basis
                                ONLY and are subject to each airline's review and approval process
                                along with their fare rules, policies and procedures. Special
                                Service Fees will be charged upon the provision of the service(s)
                                and will only be refunded if the request is denied by the airline.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

}



export default PostTicketing;