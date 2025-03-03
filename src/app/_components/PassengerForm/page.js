import React, { useState } from 'react';

const PassengerForm = ({
    index,
    lastName,
    dobMonth,
    dobDate,
    dobYear,
    handleInputChanges,
}) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1913 }, (_, i) => currentYear - i);

    return (
        <div className="row">
            <div className="col-sm-5 col-xs-12">
                <label className="label_hide_mobile">
                    Last Name<span className="required">*</span>
                </label>
                <input
                    className="Traveler esname alphanumeric"
                    name="lastName" // Use a simpler name that matches your state
                    value={lastName}
                    onChange={(e) => handleInputChanges(index, e)}
                    placeholder="Last Name"
                    type="text"
                />
                <span
                    className="field-validation-valid"
                    data-valmsg-for="flightBookingRequest.PassengerList[0].LastName"
                    data-valmsg-replace="true"
                />
                <span className="required_mobile">*</span>
            </div>

            <div className="col-sm-7 col-xs-12">
                <div className="row">
                    <div className="col-xs-12">
                        <label>
                            Date of Birth <small>(above 18)</small>
                            <span className="required">*</span>
                        </label>
                    </div>

                    {/* Date of Birth Month */}
                    <div className="col-sm-4 col-xs-4 month">
                        <div className="form-righterrow">
                            <select
                                className="Traveler"
                                name="dobMonth" // Use a consistent name for DOB fields
                                value={dobMonth}
                                onChange={(e) => handleInputChanges(index, e)}
                            >
                                <option value="">Month</option>
                                {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {new Date(0, i).toLocaleString('default', { month: 'short' })}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Date of Birth Day */}
                    <div className="col-sm-4 col-xs-4 day">
                        <div className="form-righterrow">
                            <select
                                className="Traveler"
                                name="dobDate" // Use a consistent name for DOB fields
                                value={dobDate}
                                onChange={(e) => handleInputChanges(index, e)}
                            >
                                <option value="">Day</option>
                                {Array.from({ length: 31 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Date of Birth Year */}
                    <div className="col-sm-4 col-xs-4 year">
                        <div className="form-righterrow">
                            <select
                                className="Traveler"
                                name="dobYear" // Use a consistent name for DOB fields
                                value={dobYear}
                                onChange={(e) => handleInputChanges(index, e)}
                            >
                                <option value="">Year</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PassengerForm;
