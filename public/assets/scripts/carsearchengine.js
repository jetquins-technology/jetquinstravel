var vrfyfrmsel = "";
var numberofMonthCal = 2;
var formData = "";



$(document).ready(function () {
    var isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    $("#pickUpCityDisplay,#dropOffCityDisplay").focus(function () {
        $(this).select();
    });
    if ($(window).width() < 1200) {
        numberofMonthCal = 2;
    }
    if ($(window).width() <= 767) {
        numberofMonthCal = 1;
    }
    $('#fromcarDateDisplay, #tocarDateDisplay').click(function () {
        if (isMobile == false) {
            $('html, body').animate({
                scrollTop: $(".engine-label").offset().top
            }, 500);
        }
    });
    $(".checkeddiv").click(function () {

        $(".driver-age-list").show();
        $(".checkeddiv").prop("checked", false);

    });
    $(document).mouseup(function (e) {
        if (!$(".driver-age-list").is(e.target) && $(".driver-age-list").has(e.target).length === 0) {
            $(".driver-age-list").hide();
            $(".checkeddiv").prop("checked", true);
        }
    });
    $(".widgetdrop-off").click(function () {
        $(this).hide();
        $(".widgetdrop-off_close").show();
        $("#drop_off_radio").prop("checked", true);
        $("#isSameDropOff").val(false);
        $("#dropOffCityDisplay").focus();
    });
    $(".widgetdrop-off_close").click(function () {
        $(this).hide();
        $(".widgetdrop-off").show();
        $("#sameSearchcarDrop").text('');
        $("#dropOffCityDisplay").removeClass('input-validation-error');
        //$("#myCheck").prop("checked", false);
        $("#drop_off_radio").prop("checked", false);
        $("#sameDrop").prop("checked", true);
        $("#isSameDropOff").val(true);
    });
    $("#drop_off_radio").click(function () {
        $(".widgetdrop-off").hide();
        $(".widgetdrop-off_close").show();
        $("#isSameDropOff").val(false);
    });
    $("#sameDrop").click(function () {
        $(".widgetdrop-off").show();
        $(".widgetdrop-off_close").hide();
        //$("#myCheck").prop("checked", false);
        $("#sameSearchcarDrop").text('');
        $("#dropOffCityDisplay").removeClass('input-validation-error');
        $("#isSameDropOff").val(true);
    });
    $("#age30").click(function () {
        $("#agetxt").text("Below 30");
        $(".driver-age-list").hide();
        $("#DriverAge").val('24');
        $(".checkeddiv").prop("checked", true);
    });
    $("#age65").click(function () {
        $("#agetxt").text("Above 65");
        $(".driver-age-list").hide();
        $("#DriverAge").val('70');
        $(".checkeddiv").prop("checked", true);
    });
    $("#age3065").click(function () {
        $("#agetxt").text("Between (30-65)");
        $(".driver-age-list").hide();
        $("#DriverAge").val('35');
        $(".checkeddiv").prop("checked", true);
    });

    var autocompleteUrl = commonSetting.searchcarSuggest;
    $("#pickUpCityDisplay").autocomplete({
        source: function (request, response) {
            $.ajax({
                //url: '@Url.Action("searchopt")',
                url: autocompleteUrl,
                type: "POST",
                dataType: "json",
                data: { term: request.term },
                success: function (res) {
                    if (res == '' || res == '[]') {
                        if ($('#pickUpCityDisplay').val().length < 20) {
                            var result = [
                                {
                                    label: 'No location found',
                                    value: 'No location found',
                                    code: "No location found",
                                    desc: "No location found",
                                    key: "No location found",
                                }
                            ];
                            response(result);
                        }
                    }
                    else {
                        var list = JSON.parse(res);
                        var autoRes = list.CityLocation;
                        if (autoRes.length == 0) {
                            if ($('#pickUpCityDisplay').val().length < 20) {
                                response([
                                    {
                                        label: 'No location found',
                                        value: 'No location found',
                                        code: "No location found",
                                        desc: "No location found",
                                        key: "No location found",
                                    }
                                ]);
                            }
                        }
                        else {
                            response($.map(autoRes, function (data, id) {
                                return {
                                    label: data.DisplayName,
                                    value: data.ID,
                                    code: data.Code,
                                    desc: data.LocationType,
                                    key: request.term,
                                };
                            }));
                        }
                    }
                }
            })
        },
        minLength: 3,
        autoFocus: true,
        maxShowItems: 6,
        change: function (event, ui) {
            if (!ui.item) {
                $(this).val("");
            }
        },
        focus: function (event, ui) {
            event.preventDefault(); // or return false;
        },
        select: function (event, ui) {
            if (ui.item.label == 'No location found') {
                $(this).val('');
            }
            else {
                $(this).val(ui.item.label);
                $("#PickUpLocationID").val(ui.item.value);
                $("#PickUpCity").val(ui.item.code);
                $("#sameSearchcar").text('');
                $("#pickUpCityDisplay").removeClass('input-validation-error');
                //$("#DropOffCity").val(ui.item.label);
                //$("#DropOffLocationID").val(ui.item.value);
                setTimeout(function () {
                    if ($('#drop_off_radio').is(":checked") == true) {
                        $("#dropOffCityDisplay").focus();
                    }
                    else {
                        $("#fromcarDateDisplay").focus();
                    }
                }, 100);
            }
            return false;
        },
        position: {
            my: isMobile ? "left top-1" : "left top-1",
            at: "left bottom",
            collision: "none"
        }
    }).autocomplete("instance")._renderItem = function (ul, item) {
        if (item.desc == "C") {
            return displayAutoSuggest(item, ul, 'fa-L', '');
        }
        else if (item.desc == "A") {
            return displayAutoSuggest(item, ul, 'fa-A', '');
        }
        else if (item.desc == "L") {
            return displayAutoSuggest(item, ul, 'fa-L', '');
        }
        else {
            return displayAutoSuggest(item, ul, '', '');
        }
    };
    $("#dropOffCityDisplay").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: autocompleteUrl,
                type: "POST",
                dataType: "json",
                data: { term: request.term },
                success: function (res) {
                    if (res == '' || res == '[]') {
                        if ($('#dropOffCityDisplay').val().length < 20) {
                            var result = [
                                {
                                    label: 'No location found',
                                    value: 'No location found',
                                    code: "No location found",
                                    desc: "No location found",
                                    key: "No location found",
                                }
                            ];
                            response(result);
                        }
                    }
                    else {
                        var list = JSON.parse(res);
                        var autoRes = list.CityLocation;
                        if (autoRes.length == 0) {
                            if ($('#dropOffCityDisplay').val().length < 20) {
                                response([
                                    {
                                        label: 'No location found',
                                        value: 'No location found',
                                        code: "No location found",
                                        desc: "No location found",
                                        key: "No location found",
                                    }
                                ]);
                            }
                        }
                        else {

                            response($.map(autoRes, function (data, id) {
                                return {
                                    label: data.DisplayName,
                                    value: data.ID,
                                    code: data.Code,
                                    desc: data.LocationType,
                                    key: request.term,
                                };
                            }));
                        }
                    }
                }
            })
        },
        minLength: 3,
        autoFocus: true,
        maxShowItems: 6,
        change: function (event, ui) {
            if (!ui.item) {
                $(this).val("");
            }
        },
        focus: function (event, ui) {
            event.preventDefault(); // or return false;
        },
        select: function (event, ui) {
            if (ui.item.label == 'No location found') {
                $(this).val('');
            }
            else {
                $(this).val(ui.item.label);
                $("#DropOffLocationID").val(ui.item.value);
                $("#DropOffCity").val(ui.item.code);
                $("#sameSearchcarDrop").text('');
                $("#dropOffCityDisplay").removeClass('input-validation-error');
                setTimeout(function () {
                    $("#fromcarDateDisplay").focus();
                }, 100);
            }
            return false;
        }, position: {
            // of: isMobile && numberofMonthCal < 2 ? "#dropOffCityDisplay" : "#pickUpCityDisplay",
            my: isMobile ? "left top-1" : "left top-1",
            at: "left bottom",
            collision: "none"
        },
    }).autocomplete("instance")._renderItem = function (ul, item) {
        if (item.desc == "C") {
            return displayAutoSuggest(item, ul, 'fa-L', '');
        }
        else if (item.desc == "A") {
            return displayAutoSuggest(item, ul, 'fa-A', '');
        }
        else if (item.desc == "L") {
            return displayAutoSuggest(item, ul, 'fa-L', '');
        }
        else {
            return displayAutoSuggest(item, ul, '', '');
        }
    };

    function displayAutoSuggest(item, ul, cls, desc) {
        var regEx = new RegExp(item.key.toLowerCase(), "ig");
        var replaceMask = '';
        if (cls != '') {
            replaceMask = '<strong>' + item.key.toUpperCase() + '</strong>';
        }
        else {
            replaceMask = item.key;
        }
        var finalMask = item.label.replace(regEx, replaceMask)
        var listItem = $("<li><i class='" + cls + "'></i></li>")
            .data("item.autocomplete", item)
            .append(finalMask)
            .appendTo(ul);
        return listItem;
    }

    $("#fromcarDateDisplay").datepicker({
        minDate: '+0',
        maxDate: '+11M',
        numberOfMonths: numberofMonthCal,
        dateFormat: 'M dd, yy',//'D mm/dd',
        altField: "#PickUpDate",
        altFormat: "yy-mm-dd",
        changeMonth: false,
        changeYear: false,
        onClose: setcarretval,
        onSelect: function (dateText, inst) {
            vrfyfrmsel = dateText;
            $("#fromDateCarIn").val(inst.selectedYear);//new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay, 0, 0, 0, 0)
            setTimeDropBox($('#fromcarDateDisplay').datepicker("getDate"), "PickUpHour");
        },
        beforeShowDay: function (date) {
            var startDate = $('#fromcarDateDisplay').datepicker("getDate");
            var endDate = $('#tocarDateDisplay').datepicker("getDate");
            var selClass = "";
            //if ($("#TripType").val() == 2) {
            if (startDate && (date.getTime() == startDate.getTime())) {
                selClass = "start-date"
            } else if (endDate && (date.getTime() == endDate.getTime())) {
                selClass = "end-date";
            } else if ((startDate && endDate) && (startDate < date && date < endDate)) {
                selClass = "between-date";
            }
            //}
            return [true, selClass];
        },
        beforeShow: function (input, inst) {
            vrfyfrmsel = "";
            var calendar = inst.dpDiv;
            var setorgin = "fromcarDateDisplay";
            if (isMobile) {
                setorgin = "fromcarDateDisplay";
            }
            setTimeout(function () {
                calendar.position({
                    my: isMobile ? 'left top-1' : 'left top-1',
                    at: 'left bottom',
                    collision: 'none',
                    of: "#" + setorgin
                });
            }, 1);
        }
    });
    $("#tocarDateDisplay").datepicker({
        minDate: '+10',
        maxDate: '+11M',
        numberOfMonths: numberofMonthCal,
        dateFormat: 'M dd, yy',
        changeMonth: false,
        changeYear: false,
        altField: "#DropOffDate",
        altFormat: "yy-mm-dd",
        onSelect: function (dateText, inst) {
            $("#toDateCarIn").val(inst.selectedYear);
            setTimeDropBox($('#tocarDateDisplay').datepicker("getDate"), "DropOffHour");
        },
        beforeShowDay: function (date) {
            var startDate = $('#fromcarDateDisplay').datepicker("getDate");
            var endDate = new Date($('#DropOffDate').val());
            var selClass = "";
            //if ($("#TripType").val() == 2) {
            if (startDate && (date.getTime() == startDate.getTime())) {
                selClass = "start-date"
            } else if (endDate && (date.getTime() == endDate.getTime())) {
                selClass = "end-date";
            } else if ((startDate && endDate) && (startDate < date && date < endDate)) {
                selClass = "between-date";
            }
            //}
            return [true, selClass];
        },
        beforeShow: function (input, inst) {
            var calendar = inst.dpDiv;
            var setorgin = "fromcarDateDisplay";
            if (isMobile && numberofMonthCal < 2) {//mobile-not ipad
                setorgin = "tocarDateDisplay";
            }

            setTimeout(function () {
                calendar.position({
                    my: isMobile ? 'left top-11' : 'left top-1',
                    at: 'left bottom',
                    collision: 'none',
                    of: "#" + setorgin
                });
            }, 1);
            var b = new Date();
            var c = new Date(b.getFullYear(), b.getMonth(), b.getDate());
            if ($('#fromcarDateDisplay').datepicker('getDate') != null) {
                c = $('#fromcarDateDisplay').datepicker('getDate');
            }
            var d = new Date(c);
            d.setDate(d.getDate() + 30);

            return { minDate: c = new Date(c.getFullYear(), c.getMonth(), c.getDate()), maxDate: d = new Date(d.getFullYear(), d.getMonth(), d.getDate()) }
        },
        onClose: chkoutcarch
    });
    $("#fromcarDateDisplay,#tocarDateDisplay").datepicker("option", "position",
        { my: "right top+62", at: "right top" });//of: "#fromcarDateDisplay",

    setTimeDropBox($('#fromcarDateDisplay').datepicker("getDate"), "PickUpHour");
    setTimeDropBox($('#tocarDateDisplay').datepicker("getDate"), "DropOffHour");
    formData = $('#CarForm').serialize();
});

function setTimeDropBox(dat, ddl) {
    var isValueSelected = false;
    var selectedValue = $("#" + ddl).val();
    $("#" + ddl + " option").prop("disabled", false);
    var crntDate = new Date($("#hdn_currentDate").val());
    var crntDatePart = new Date(crntDate.getFullYear(), crntDate.getMonth(), crntDate.getDate());
    if (crntDate.getDate() == dat.getDate() && crntDate.getMonth() == dat.getMonth() && crntDate.getFullYear() == dat.getFullYear()) {
        $("#" + ddl + " option").each(function (i, obj) {
            var strtDt = new Date(new Date(crntDatePart.getFullYear(), crntDatePart.getMonth(), crntDatePart.getDate()).setSeconds(($(this).val().split(/:/)[0]) * 3600 + (($(this).val()).split(/:/)[1]) * 60));
            if (strtDt.getTime() < crntDate.getTime()) {
                $('#' + ddl + ' option[value="' + $(this).val() + '"]').prop("disabled", true);
            }
            else if (isValueSelected == false) {
                selectedValue = $(this).val();
                isValueSelected = true;
            }
        });
        $('#' + ddl).val(selectedValue);
    }
}

function setcarretval(a) {
    var b = new Date();
    var c = new Date(b.getFullYear(), b.getMonth(), b.getDate());
    if ($('#fromcarDateDisplay').datepicker('getDate') != null) {
        c = $('#fromcarDateDisplay').datepicker('getDate');
        $('#PickUpDate').val(c.getFullYear() + "-" + (c.getMonth() + 1) + "-" + c.getDate());
    }

    if ($('#tocarDateDisplay').datepicker('getDate') < $('#fromcarDateDisplay').datepicker('getDate')) {
        c = new Date(c.getFullYear(), c.getMonth(), c.getDate() + 3);
        $('#tocarDateDisplay').datepicker("setDate", new Date(c));
        $('#DropOffDate').val(c.getFullYear() + "-" + (c.getMonth() + 1) + "-" + c.getDate());
    }
    if (vrfyfrmsel != "") {
        $("#tocarDateDisplay").datepicker("show");
    }
}

function setretmin(a) {
    var b = new Date();
    var c = new Date(b.getFullYear(), b.getMonth(), b.getDate());
    if (a.id == 'tocarDateDisplay') {
        if ($('#fromcarDateDisplay').datepicker('getDate') != null) {
            c = $('#fromcarDateDisplay').datepicker('getDate');
        }
    }
    return { minDate: c = new Date(c.getFullYear(), c.getMonth(), c.getDate() + 1) }
}
function chkin(a) {
    var b = new Date();
    var c = new Date(b.getFullYear(), b.getMonth(), b.getDate());
    if ($('#fromcarDateDisplay').datepicker('getDate') != null) {
        var c = $('#fromcarDateDisplay').datepicker('getDate');
        $('#PickUpDate').val(c.getFullYear() + "-" + (c.getMonth() + 1) + "-" + c.getDate());
    }

    if ($('#tocarDateDisplay').datepicker('getDate') < $('#fromcarDateDisplay').datepicker('getDate')) {
        c = new Date(c.getFullYear(), c.getMonth(), c.getDate() + 3);
        $('#tocarDateDisplay').datepicker("setDate", new Date(c));
        $('#DropOffDate').val(c.getFullYear() + "-" + (c.getMonth() + 1) + "-" + c.getDate());
    }


}

function chkout(a) {
    var b = new Date();
    var c = new Date(b.getFullYear(), b.getMonth(), b.getDate());
    if (a.id == 'tocarDateDisplay') {
        if ($('#fromcarDateDisplay').datepicker('getDate') != null) {
            c = $('#fromcarDateDisplay').datepicker('getDate');
        }
    }
    return { minDate: c = new Date(c.getFullYear(), c.getMonth(), c.getDate() + 1) }
}
function chkoutcarch(a) {
    c = $('#tocarDateDisplay').datepicker('getDate');
    $('#tocarDateDisplay').datepicker("setDate", new Date(c));
    $('#DropOffDate').val(c.getFullYear() + "-" + (c.getMonth() + 1) + "-" + c.getDate());
}


function advaOptionsShow() {
    $("#advaOptionsDiv").slideToggle();
}


function validcar() {
    $("#sameSearchcar").text('');
    $("#sameSearchcarDrop").text('');
    $("#pickUpCityDisplay").removeClass('input-validation-error');
    $("#dropOffCityDisplay").removeClass('input-validation-error');
    if (($("#pickUpCityDisplay").val() == undefined || $("#pickUpCityDisplay").val() == "" || $("#PickUpLocationID").val() == undefined || $("#PickUpLocationID").val() == "") && ($("#isSameDropOff").val() == "false" && ($("#dropOffCityDisplay").val() == undefined || $("#dropOffCityDisplay").val() == "" || $("#DropOffLocationID").val() == undefined || $("#DropOffLocationID").val() == ""))) {
        $("#sameSearchcar").text("Please enter pick up location.");
        $("#sameSearchcarDrop").text("Please enter drop off location.");
        $("#pickUpCityDisplay").addClass('input-validation-error');
        $("#dropOffCityDisplay").addClass('input-validation-error');
        return false;
    }
    else if ($("#pickUpCityDisplay").val() == undefined || $("#pickUpCityDisplay").val() == "" || $("#PickUpLocationID").val() == undefined || $("#PickUpLocationID").val() == "") {
        $("#sameSearchcar").text("Please enter pick up location.");
        $("#pickUpCityDisplay").addClass('input-validation-error');
        return false;
    }
    else if ($("#isSameDropOff").val() == "false" && ($("#dropOffCityDisplay").val() == undefined || $("#dropOffCityDisplay").val() == "" || $("#DropOffLocationID").val() == undefined || $("#DropOffLocationID").val() == "")) {
        $("#sameSearchcarDrop").text("Please enter drop off location.");
        $("#dropOffCityDisplay").addClass('input-validation-error');
        return false;
    }
    else if (new Date($('#PickUpDate').val() + ' ' + $('#PickUpHour').val()) >= new Date($('#DropOffDate').val() + ' ' + $('#DropOffHour').val())) {
        $("#sameSearchcar").text("Drop off date time should be greater than pick date time.");
        return false;
    }
    else if (new Date((new Date($("#hdn_currentDate").val())).setHours((new Date($("#hdn_currentDate").val())).getHours() + 4)) > new Date($('#PickUpDate').val() + ' ' + $('#PickUpHour').val())) {
        $("#sameSearchcar").text("Pick-up time must be at least 4 Hours in the future.");
        return false;
    }
    else if (formData == $('#CarForm').serialize()) {
        $("#sameSearchcar").text("Please change your search criteria.");
        return false;
    }
    else {
        var o = { PickUpCity: $("#PickUpCity").val(), pickUpCityDisplay: $("#pickUpCityDisplay").val(), PickUpLocationID: $("#PickUpLocationID").val(), PickUpDate: $("#PickUpDate").val(), fromcarDateDisplay: $("#fromcarDateDisplay").val(), PickUpHour: $("#PickUpHour").val(), DropOffCity: $("#DropOffCity").val(), dropOffCityDisplay: $("#dropOffCityDisplay").val(), DropOffLocationID: $("#DropOffLocationID").val(), DropOffDate: $("#DropOffDate").val(), tocarDateDisplay: $("#tocarDateDisplay").val(), DropOffHour: $("#DropOffHour").val(), DriverAge: $("#DriverAge").val(), VendorCode: $("#VendorCode").val(), VehicleType: $("#VehicleType").val(), isSameDropOff: $("#isSameDropOff").val(), sourceMedia: readCookie('utm_source') == null && searchcarObj != null ? searchcarObj.sourceMedia : readCookie('utm_source') };
        $.post(commonSetting.carsearchAction, { str: JSON.stringify(o) }, function (data) {
            window.location = data.url.replace('smedia', 'utm_source');
        });
        return true;
    }
}
