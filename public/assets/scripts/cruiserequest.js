
$(document).ready(function () {

    $("#txtCruiseGuestPhCode").intlTelInput();      // $("#mobile-number2").intlTelInput();
    try {
        $("#txtCruiseGuestPhCode").val("+1");
        $(".selected-flag > div").removeClass();
        $(".selected-flag > div").addClass('flag us');
    }
    catch (ex) { }

    $('#txtCruiseDest, #txtCruiseLine, #txtCruiseLength, #txtCruiseGuestName, #txtCruiseGuestEmail, #txtCruiseGuestPhoneNo').on("cut copy paste", function (e) {      // Prevent Copy Paste
        e.preventDefault();
    });


    $("#txtCruiseDest, #txtCruiseLine").keypress(function (e) {
        try {
            var charCode = e.which ? e.which : event.keyCode;
            if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode == 32 || charCode == 38) {
                return true;
            } else {
                return false;
            }
        }
        catch (ex) {
            console.log(ex.stack);
        }
    });


    $("#txtCruiseGuestName").keypress(function (e) {
        try {
            var charCode = e.which ? e.which : event.keyCode;
            if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode == 32) {
                return true;
            } else {
                return false;
            }
        }
        catch (ex) {
            console.log(ex.stack);
        }
    });

    $("#txtCruiseLength, #txtCruiseGuestPhoneNo").keypress(function (e) {
        try {
            var charCode = e.which ? e.which : event.keyCode;
            if (charCode >= 48 && charCode <= 57) {
                return true;
            } else {
                return false;
            }
        }
        catch (ex) {
            console.log(ex.stack);
        }
    });


    $("#btnClsCruiseCallRQSuccessPopup").click(function () {
        try {
            cruise.resetAfterSubmitReqACruiseCallRQData();
        }
        catch (ex) {
            console.log(ex.stack);
        }
    });


    //cruise.hideCruiseCallRQSuccessPopupByClickingOutside();








    //#region call emailDomainSuggester

    emailDomainSuggester();

    //#endregion

});




cruise = {


    isValidEmail: function (email) {
        var isValid = false;
        try {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            //var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            isValid = regex.test(email);
        }
        catch (ex) {
            isValid = false;
            console.log(ex.stack);
        }
        return isValid;
    },


    isValidPhoneNo: function (phonenumber) {
        var isValid = false;
        try {
            if (phonenumber == "") {
                isValid = false;
            }
            else if (phonenumber.length < 10) {
                isValid = false;
            }
            else {
                isValid = true;
            }

            if (phonenumber <= 0) {
                isValid = false;
            }

            //if (isValid) {
            //    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            //    if (phonenumber.value.match(phoneno)) {
            //        isValid = true;
            //    }
            //    else {                   
            //        isValid = false;
            //    }
            //}
        }
        catch (ex) {
            isValid = false;
            console.log(ex.stack);
        }
        return isValid;
    },


    isValidCruiseData: function () {

        var isValid = true;

        try {

            var cruiseDest = $('#txtCruiseDest').val().trim();
            var cruiseLine = $('#txtCruiseLine').val().trim();
            var cruiseLength = $('#txtCruiseLength').val().trim();
            var cruiseGuestName = $('#txtCruiseGuestName').val().trim();
            var cruiseGuestEmail = $('#txtCruiseGuestEmail').val().trim();
            var cruiseGuestPhCode = $('#txtCruiseGuestPhCode').val().trim();
            var cruiseGuestPhoneNo = $('#txtCruiseGuestPhoneNo').val().trim();

            if (cruiseDest == null || cruiseDest == "" || cruiseDest == 'undefined') {
                isValid = false;
                $('#txtCruiseDest').focus();
                $("#cruiseDestErrMsg").show();
                $("#cruiseDestErrMsg").html("Please provide Destination.");
                $("#txtCruiseDest").addClass('input-validation-error');
            }
            else {
                $("#cruiseDestErrMsg").hide();
                $("#cruiseDestErrMsg").html("");
                $("#txtCruiseDest").removeClass('input-validation-error');
            }

            if (cruiseLine == null || cruiseLine == "" || cruiseLine == 'undefined') {
                isValid = false;
                $('#txtCruiseLine').focus();
                $("#cruiseLineErrMsg").show();
                $("#cruiseLineErrMsg").html("Please provide Cruise Line.");
                $("#txtCruiseLine").addClass('input-validation-error');
            }
            else {
                $("#cruiseLineErrMsg").hide();
                $("#cruiseLineErrMsg").html("");
                $("#txtCruiseLine").removeClass('input-validation-error');
            }

            if (cruiseLength == null || cruiseLength == "" || cruiseLength == 'undefined') {
                isValid = false;
                $('#txtCruiseLength').focus();
                $("#cruiseLengthErrMsg").show();
                $("#cruiseLengthErrMsg").html("Please provide Cruise Length.");
                $("#txtCruiseLength").addClass('input-validation-error');
            }
            else {
                $("#cruiseLengthErrMsg").hide();
                $("#cruiseLengthErrMsg").html("");
                $("#txtCruiseLength").removeClass('input-validation-error');
            }

            if (cruiseGuestName == null || cruiseGuestName == "" || cruiseGuestName == 'undefined') {
                isValid = false;
                $('#txtCruiseGuestName').focus();
                $("#cruiseGuestNameErrMsg").show();
                $("#cruiseGuestNameErrMsg").html("Please provide Name.");
                $("#txtCruiseGuestName").addClass('input-validation-error');
            }
            else {
                $("#cruiseGuestNameErrMsg").hide();
                $("#cruiseGuestNameErrMsg").html("");
                $("#txtCruiseGuestName").removeClass('input-validation-error');
            }

            if (cruiseGuestEmail == null || cruiseGuestEmail == "" || cruiseGuestEmail == 'undefined') {
                isValid = false;
                $('#txtCruiseGuestEmail').focus();
                $("#cruiseGuestEmailErrMsg").show();
                $("#cruiseGuestEmailErrMsg").html("Please provide Email.");
                $("#txtCruiseGuestEmail").addClass('input-validation-error');
            }
            else {
                $("#cruiseGuestEmailErrMsg").hide();
                $("#cruiseGuestEmailErrMsg").html("");
                $("#txtCruiseGuestEmail").removeClass('input-validation-error');
            }

            if (cruiseGuestPhCode == null || cruiseGuestPhCode == "" || cruiseGuestPhCode == 'undefined') {
                isValid = false;
                $('#txtCruiseGuestPhCode').focus();
                $("#cruiseGuestPhoneNoErrMsg").show();
                $("#cruiseGuestPhoneNoErrMsg").html("Please provide Phone Code.");
                $("#txtCruiseGuestPhCode").addClass('input-validation-error');
            }
            else {
                $("#cruiseGuestPhoneNoErrMsg").hide();
                $("#cruiseGuestPhoneNoErrMsg").html("");
                $("#txtCruiseGuestPhCode").removeClass('input-validation-error');
            }

            if (cruiseGuestPhoneNo == null || cruiseGuestPhoneNo == "" || cruiseGuestPhoneNo == 'undefined') {
                isValid = false;
                $('#txtCruiseGuestPhoneNo').focus();
                $("#cruiseGuestPhoneNoErrMsg").show();
                $("#cruiseGuestPhoneNoErrMsg").html("Please provide Phone Number.");
                $("#txtCruiseGuestPhoneNo").addClass('input-validation-error');
            }
            else {
                $("#cruiseGuestPhoneNoErrMsg").hide();
                $("#cruiseGuestPhoneNoErrMsg").html("");
                $("#txtCruiseGuestPhoneNo").removeClass('input-validation-error');
            }


            if (!cruise.isValidEmail(cruiseGuestEmail)) {
                isValid = false;
                $('#txtCruiseGuestEmail').focus();
                $("#cruiseGuestEmailErrMsg").show();
                $("#cruiseGuestEmailErrMsg").html("Please provide valid Email.");
                $("#txtCruiseGuestEmail").addClass('input-validation-error');
            }
            else {
                $("#cruiseGuestEmailErrMsg").hide();
                $("#cruiseGuestEmailErrMsg").html("");
                $("#txtCruiseGuestEmail").removeClass('input-validation-error');
            }

            if (!cruise.isValidPhoneNo(cruiseGuestPhoneNo)) {
                isValid = false;
                $('#txtCruiseGuestPhoneNo').focus();
                $("#cruiseGuestPhoneNoErrMsg").show();
                $("#cruiseGuestPhoneNoErrMsg").html("Please provide valid Phone Number.");
                $("#txtCruiseGuestPhoneNo").addClass('input-validation-error');
            }
            else {
                $("#cruiseGuestPhoneNoErrMsg").hide();
                $("#cruiseGuestPhoneNoErrMsg").html("");
                $("#txtCruiseGuestPhoneNo").removeClass('input-validation-error');
            }
        }
        catch (ex) {
            isValid = false;
            console.log(ex.stack);
        }

        //if (isValid) { $("#dvReqACruiseCall").css('display', 'none'); }
        //else { $("#dvReqACruiseCall").css('display', 'block'); }

        return isValid;
    },


    prepareReqACruiseCallData: function () {
        var cruiseCallRQ = {};
        try {

            cruiseCallRQ.CruiseDest = $('#txtCruiseDest').val().trim();
            cruiseCallRQ.CruiseLine = $('#txtCruiseLine').val().trim();
            cruiseCallRQ.CruiseLength = $('#txtCruiseLength').val().trim();
            cruiseCallRQ.GuestName = $('#txtCruiseGuestName').val().trim();
            cruiseCallRQ.GuestEmail = $('#txtCruiseGuestEmail').val().trim();
            cruiseCallRQ.GuestPhCode = $('#txtCruiseGuestPhCode').val().trim();
            cruiseCallRQ.GuestPhoneNo = $('#txtCruiseGuestPhoneNo').val().trim();

            cruiseCallRQ.CruiseCallRQId = "";
            cruiseCallRQ.CruiseTFNNumber = "";
        }
        catch (ex) {
            console.log(ex.stack);
        }
        return cruiseCallRQ;
    },


    submitReqACruiseCallRQData: function () {

        try {

            var isValidRQ = cruise.isValidCruiseData();

            if (isValidRQ) {

                var cruiseCallRQData = cruise.prepareReqACruiseCallData();

                $.ajax({
                    url: "/us/home/submit-request-cruise-call-data",
                    type: "POST",
                    dataType: "json",
                    data: { model: cruiseCallRQData },
                    beforeSend: function () {
                        $('#dvCruiseAjaxLoader').show();    // show loader
                    },
                    success: function (response) {
                        if (response.isSuccess) {
                            $("#dvReqACruiseCall").css('display', 'none');
                            $("#spnCruiseCallRQId").text(response.requestId);
                            $("#dvCruiseCallRQSuccessPopup").css('display', 'block');

                            //setTimeout(function () {

                            //    cruise.resetAfterSubmitReqACruiseCallRQData();

                            //}, 60000);
                        }
                        else {
                            console.log(response.succMessage);
                        }

                        $('#dvCruiseAjaxLoader').hide();    // hide loader
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown);
                        $('#dvCruiseAjaxLoader').hide();    // hide loader
                    }
                })
            }
        }
        catch (ex) {
            console.log(ex.stack);
        }
    },

    resetAfterSubmitReqACruiseCallRQData: function () {
        try {

            if ($('#dvCruiseCallRQSuccessPopup').is(':visible')) { $("#dvCruiseCallRQSuccessPopup").css('display', 'none'); }

            $('#txtCruiseDest').val("");
            $('#txtCruiseLine').val("");
            $('#txtCruiseLength').val("");
            $('#txtCruiseGuestName').val("");
            $('#txtCruiseGuestEmail').val("");
            $('#txtCruiseGuestPhCode').val("+1");
            $('#txtCruiseGuestPhoneNo').val("");
            $("#dvReqACruiseCall").css('display', 'block');

            try {
                $(".selected-flag > div").removeClass();
                $(".selected-flag > div").addClass('flag us');
            }
            catch (ex) { }

            var isReqCaptcha = $('#hdIsReqCaptcha').val().trim();
            if (isReqCaptcha != null && isReqCaptcha != "" && isReqCaptcha != "undefined" && isReqCaptcha.toLowerCase() == "true") {
                grecaptcha.reset();
            }

            document.cookie = "lastopend=" + 'cruiseTab' + ";expires=" + (new Date((new Date()).getTime() + 30 * 24 * 60 * 60 * 1000)) + "; path=/;";
        }
        catch (ex) { }
    },


    hideCruiseCallRQSuccessPopupByClickingOutside: function () {
        try {
            window.addEventListener('click', function (e) {
                var cruiseCallRQSuccessPopup = document.getElementById('dvCruiseCallRQSuccessPopup');
                if (cruiseCallRQSuccessPopup.style.display == 'block' && !cruiseCallRQSuccessPopup.contains(e.target)) {
                    //$("#dvCruiseCallRQSuccessPopup").fadeOut('slow');
                    document.getElementById('dvCruiseCallRQSuccessPopup').style.display = 'none';
                }
            });
        }
        catch (ex) { }
    },

}








//#region emailDomainSuggester


function emailDomainSuggester() {
    try {
        $("#txtCruiseGuestEmail").autocomplete({
            source: function (request, response) {
                var guestEmail = $("#txtCruiseGuestEmail").val().trim();
                if (guestEmail != null && guestEmail != "" && guestEmail != "undefined" && guestEmail.indexOf('@') > -1) {

                    $.ajax({
                        //url: commonSetting.emailDomainSuggest,
                        url: "/us/home/email-domain-suggester",
                        type: "POST",
                        dataType: "json",
                        data: { term: request.term },
                        success: function (res) {

                            if (res == '' || res == '[]') {
                                //var result = [
                                //    {
                                //        label: 'No location found',
                                //        value: 'No location found',
                                //    }
                                //];
                                //response(result);


                                var result = [{ EmailWithDomain: '', DomainName: '' }];
                                terms = [];
                                response($.map(result, function (data, id) {
                                    return {
                                        label: data.EmailWithDomain,
                                        value: data.DomainName,
                                    };
                                }));
                            }
                            else {
                                var autoRes = JSON.parse(res);
                                if (autoRes != null && autoRes != undefined) {
                                    terms = [];
                                    response($.map(autoRes, function (data, id) {
                                        return {
                                            label: data.EmailWithDomain,
                                            value: data.DomainName,
                                        };
                                    }));
                                }
                            }
                        }
                    })

                }
            },
            minLength: 2,
            autoFocus: true,
            maxShowItems: 6,
            change: function (event, ui) {
                //if (!ui.item) {
                //    $(this).val("");
                //}
            },
            focus: function (event, ui) {
                event.preventDefault(); // or return false;
            },
            select: function (event, ui) {
                /*if (ui.item.label == 'No location found' || ui.item.label == 'Do you mean?' || ui.item.label == 'Matching location with your searched input!' || ui.item.label.indexOf('Did you mean') > -1) {*/
                if (ui.item.label == '') {
                    // $(this).val('');
                    $(this).val($("#txtCruiseGuestEmail").val().trim());
                }
                else {
                    //    isWrongSearch_O = "";
                    //    if (ui.item.s_code != undefined && ui.item.s_code.indexOf('Did you mean') > -1) {
                    //        isWrongSearch_O = ui.item.key;
                    //    }
                    $(this).val(ui.item.label);
                }
                return false;
            },
            position: {
                my: isMobile ? "left top-1" : "left top-1",
                at: "left bottom",
                collision: "none"
            }
        }).autocomplete("instance")._renderItem = function (ul, item) {
            return displayEmailDomainSuggest(item, ul, '');
        };
    }
    catch (ex) { }
}


function displayEmailDomainSuggest(item, ul, cls) {

    var listItem = "";

    try {

        var finalMask = item.label;

        listItem = $("<li><i class='" + '' + "'></i></li>")
            .data("item.autocomplete", item)
            .append(finalMask)
            .appendTo(ul);

        for (var iterms = 0; iterms < terms.length; iterms++) {
            if (item.label.indexOf(terms[iterms]) > -1) {
                listItem.addClass("match-autosugguest");
                listItem.children().removeClass(cls);
            }
        }

        return listItem;
    }
    catch (ex) { }
}


//#endregion













