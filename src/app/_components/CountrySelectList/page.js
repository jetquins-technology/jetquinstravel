import { useEffect, useState } from 'react';

const CountrySelect = ({ countryCodeArr }) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        setCountries(countryCodeArr);
    }, [countryCodeArr]);

    return (
        <div className="col-sm-6 col-xs-12">
            <input type="hidden" id="istf" name="istf" defaultValue={0} />
            <label className="label_hide_mobile">
                Select Country<span className="required">*</span>
            </label>
            <div className="form-righterrow">
                <select
                    className="Payment"
                    data-val="true"
                    data-val-required="The Country field is required."
                    id="flightBookingRequest_Payment_Country"
                    name="flightBookingRequest.Payment.Country"
                >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>
            <span className="required_mobile">*</span>
        </div>
    );
};

export default CountrySelect;
