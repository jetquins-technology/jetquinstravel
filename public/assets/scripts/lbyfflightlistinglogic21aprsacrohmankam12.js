var pagnumber = 1;
var IsScrollEventFire = false;
//initSessionMonitor();
var matrixRQ = null;
var filtersApplied = [];
var isUCReadytoOpen = 1;
var _depTimes = [];
var _retTimes = [];
var globalfltid = "";
var issearchagain = 0;
var lastAction = false;
var filtersflag = false;
var isMobile = false;
var W = window;
var H = history;
window.onload = function (e) {
    try {
        showhideloader(0, "");
        if (commonSetting.local_storage == 1) {
            localStorage.setItem('sessionSlide', 'isStarted');
            //TFNumber: localStorage.getItem("searchID"),
            if (sessionStorage.getItem("paymentvisited") != null && sessionStorage.getItem("paymentvisited") == "y") {
                Filter.setFlightFilters(sessionStorage.getItem('fltfltr'));
            } else if (localStorage.getItem('uc_closed' + sid) == 'true') {
                Filter.setFlightFilters(localStorage.getItem('fltfltr' + sid));
                try { localStorage.removeItem('fltfltr' + sid); } catch (ex) { }
            }
        }
    } catch (e) {

    }
    $("#tab_matrix").addClass("active");
}
function showhideloader(ishow, message) {
    if (ishow == 1) {
        $('#div_gotopayment').show();
        if (message == "") {
            $('#loadermsg').hide();
            $('#loadermsg').html("");
        }
        else {
            $('#loadermsg').html(message);
            $('#loadermsg').show();

        }
    }
    else {
        $('#div_gotopayment').hide();
        $('#loadermsg').hide();
        $('#loadermsg').html("");
    }
}
$(document).ready(function () {
    isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    if (isMobile || window.location !== window.parent.location) {
        $("#marixOption").removeClass('visible-xs');
    }
    else {
        $("#marixOption").addClass('visible-xs');
        $("#showMatrixInMobile").addClass('visible-xs');
    }
    $(document).on("click", ".showMore", function () {
        var txt = $(this).text();
        if (txt == "Show") {
            $(this).text("Hide");
            $('span#covidAirlinemsg').show();
            $(this).next().removeClass("fa fa-angle-down").addClass("fa fa-angle-up");
        }
        else if (txt == "Hide") {
            $(this).text("Show");
            $('span#covidAirlinemsg').hide();
            $(this).next().removeClass("fa fa-angle-up").addClass("fa fa-angle-down");
        }
    });
    if ($('#TripType').val() == 1) { $('#1').trigger('click'); }
    $(".edit-listing-search, .edit-listing-searchdetails").on("click", function () {
        $(".edit-listing-searchdetails").hide();
        //$(".expend_search").show();
        $(".expend_search").show("slide", { direction: "up" }, 300);
    });
    $(".close-listing-search").on("click", function () {
        $(".expend_search").hide("slide", { direction: "up" }, 300, function () { $(".edit-listing-searchdetails").show(); });

    });
    $("._deptimecontainer .deptimefilter").on("click", function () {
        if ($(this).attr('class').indexOf("selected") >= 0) {
            $(this).removeClass("selected");
            $("#mg" + $(this).attr("filtervalue")).attr('src', "../images/listing/" + $(this).attr("filtervalue") + '.png');
        }
        else {
            $(this).addClass("selected");
            $("#mg" + $(this).attr("filtervalue")).attr('src', "../images/listing/" + $(this).attr("filtervalue") + '2.png');
        }
        Filter.applyFilter(false);
    });
    $("._rettimecontainer .deptimefilter").on("click", function () {
        if ($(this).attr('class').indexOf("selected") >= 0) {
            $(this).removeClass("selected");
            $("#rmg" + $(this).attr("filtervalue")).attr('src', "../images/listing/" + $(this).attr("filtervalue") + '.png');
        }
        else {
            $(this).addClass("selected");
            $("#rmg" + $(this).attr("filtervalue")).attr('src', "../images/listing/" + $(this).attr("filtervalue") + '2.png');
        }
        Filter.applyFilter(false);
    });
    $('[data-toggle="popover"]').popover();
    //var noresult_contact = getContactNumber(readCookie('contactnos'), 'noresult');
    //$('#noresult_contact').attr('href', 'tel:' + noresult_contact);
    //$("#noresult_contact").text(noresult_contact);
    if ($("#isMixAvailable").val() != undefined && $("#isMixAvailable").val().toLowerCase() == 'true') {
        $(".multi-airline-icon").show();
    }



});
function dismissit(dismissitnow) {
    $("#" + dismissitnow).hide('fade', { direction: 'left' }, 500);
}

Filter = {
    applyFilter: function (isScroll, sliderValues, slider, matrix) {
        if (isScroll == false) {
            pagnumber = 1;
            matrixRQ = matrix;
            if ((/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()))) {
                $("#scrollBottomtop").trigger("click");
            }
        }
        if (matrixRQ == undefined) {

            $('.matrix-data').removeClass('active');
            $('.matrix-cell').removeClass('active');
            $("#tab_matrix").addClass("active");
            $('#resetMatrix').hide();
        }
        else {
            $('#resetMatrix').show();
        }
        var _allFilterOptions = this.getFlightFilters(sliderValues, slider, matrixRQ);
        var str = JSON.stringify(_allFilterOptions);

        if (_allFilterOptions.Airline != null || _allFilterOptions.cabin != null
            || _allFilterOptions.stops != null || _allFilterOptions.DepTimes.length > 0
            || _allFilterOptions.RetTimes.length > 0 || _allFilterOptions.Pricefilter != null
            || _allFilterOptions.DepartAirports != null || _allFilterOptions.ArrivalAirports != null
            || (matrixRQ != undefined)
        ) {

            $(".clear-all-filters, .clear-all-filters-header, .listappliedfiltr").show();
            if (commonSetting.local_storage == 1) {
                sessionStorage.setItem("paymentvisited", "n")
            }
        }
        else {
            $(".clear-all-filters, .clear-all-filters-header, .listappliedfiltr").hide();
        }
        if (pagnumber > 1) {
            showhideloader(1, "");
        }
        else {
            showhideloader(1, "Applying filters");
        }
        // $('#div_gotopayment').show();
        $(".load-more").show();
        //$("#containerListing").css("opacity", 1);
        //$(".shorting-tab").css("opacity", 1);
        // $(".shorting-tab").css("pointer-events", "none");
        $.ajax({
            url: commonSetting.fltrsearch,
            data: str,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                showhideloader(0, "");
                // $('#div_gotopayment').hide();
                if (response.trim().length > 0) {
                    if (response.indexOf('<title>Error404</title>') == -1) {
                        if (response.indexOf('oops!</div>') >= 0) {
                            $(".load-more").hide();
                        }
                        if (isScroll != null && isScroll == true) {
                            $("#containerListing").append(response);
                        }
                        else {
                            $("#containerListing").html(response);
                        }
                    }
                    else {
                        document.location.href = "/us";
                    }
                }
                else {
                    $(".load-more").hide();
                }


            },
            complete: function (data) {
                var cut = parseInt($("#Pcount").val());
                if (cut <= (pagnumber * 10)) {
                    $(".load-more").hide();
                }
                $("#totalResults").html($("#Pcount").val());
                IsScrollEventFire = false;
                showhideloader(0, "");
                $("#containerListing").css("opacity", 1);
                $(".shorting-tab").css("opacity", 1);
                $(".shorting-tab").css("pointer-events", "");
                if ($('#sort_all_amt') != null && $('#sort_all_amt') != undefined && $('#sort_nearby_amt') != null && $('#sort_nearby_amt') != undefined && $('#sort_flexible_amt') != null && $('#sort_flexible_amt') != undefined && $('#sort_shortest_amt') != null && $('#sort_shortest_amt') != undefined) {
                    var sort_all_amt = parseFloat($("#sort_all_amt").val());
                    var sort_nearby_amt = parseFloat($("#sort_nearby_amt").val());
                    var sort_flexible_amt = parseFloat($("#sort_flexible_amt").val());
                    var sort_shortest_amt = parseFloat($("#sort_shortest_amt").val());

                    if (sort_all_amt > 0) {
                        $('.shorting-tab').removeClass('hide');
                        $('#spn_all_amount').text('$' + sort_all_amt.toFixed(2));
                    }
                    else $('.shorting-tab').addClass('hide');
                    if (sort_nearby_amt > 0) {
                        $('#nearby').removeClass('hide');
                        $('#spn_nearby_amount').text('$' + sort_nearby_amt.toFixed(2));
                    }
                    else {
                        $('#nearby').addClass('hide');
                        if ($("#tabvalue").val() == 'nearby') {
                            $("#tabvalue").val('all'); $("#all").addClass('active');
                        }
                    }
                    if (sort_flexible_amt > 0) {
                        $('#flexible').removeClass('hide');
                        $('#spn_flexible_amount').text('$' + sort_flexible_amt.toFixed(2));
                    }
                    else {
                        $('#flexible').addClass('hide');
                        $("#flexible").removeClass('active');
                        if ($("#tabvalue").val() == 'flexible') {
                            $("#tabvalue").val('all'); $("#all").addClass('active');
                        }
                    }
                    if (sort_shortest_amt > 0) {

                        $('#shortest').removeClass('hide');
                        $('#spn_shortest_amount').text('$' + sort_shortest_amt.toFixed(2));
                    }
                    else {
                        $('#shortest').addClass('hide');
                        $("#shortest").removeClass('active');
                        if ($("#tabvalue").val() == 'shortest') {
                            $("#tabvalue").val('all'); $("#all").addClass('active');
                        }
                    }
                }
            }
            , error: function (n) {
                showhideloader(0, "");
            }
        })
    },
    getFlightFilters: function (sliderValues, slider, matrix) {
        var request = {
            searchId: $("#userSearchId").val(),
            pagnumber: pagnumber,
            Airline: this.getAirlines(),
            cabin: this.getCabins(),
            stops: this.getStops(),
            DepTimes: this.getDepTimes(),
            //DepartureTimes: this.getDepartureTimes(),
            //ReturnsTimes: this.getReturnsTimes(),
            // DepartureTimes: this.getDepatureTimeSliderValue(sliderValues, slider),
            RetTimes: this.getRetTimes(),
            // ReturnsTimes: this.getReturnTimeSliderValue(sliderValues, slider),
            Pricefilter: this.getPriceSliderValue(sliderValues, slider),
            DepartAirports: this.getDepartureAirports(),
            ArrivalAirports: this.getArrivelAirports(),
            Matrix: matrix,
            tabvalue: $("#tabvalue").val()
        };
        if (commonSetting.local_storage == 1) {
            sessionStorage.setItem('fltfltr', JSON.stringify(request));
            try {
                localStorage.setItem('fltfltr' + sid, JSON.stringify(request));
            } catch (ex) { }
        }
        return request;
    },
    setFlightFilters: function (request) {
        if (request != null && request != undefined && request != '') {
            var filterRQ = $.parseJSON(request);
            if (filterRQ != undefined && filterRQ != null) {
                if (filterRQ.stops != null) {
                    $("input:checkbox[name=stops]").each(function () {
                        if (filterRQ.stops.indexOf($(this).val()) > -1) $("input:checkbox[value='" + $(this).val() + "']").prop('checked', true);
                    });
                }
                if (filterRQ.Airline != null) {
                    $("input:checkbox[name=airline]").each(function () {
                        if (filterRQ.Airline.indexOf($(this).val()) > -1) $("input:checkbox[value='" + $(this).val() + "']").prop('checked', true);
                    });
                }
                if (filterRQ.DepartAirports != null) {
                    $("input:checkbox[name=departureairports]").each(function () {
                        if (filterRQ.DepartAirports.indexOf($(this).val()) > -1) $("input:checkbox[value='" + $(this).val() + "']").prop('checked', true);
                    });
                }
                if (filterRQ.ArrivalAirports != null) {
                    $("input:checkbox[name=arrivalsairports]").each(function () {
                        if (filterRQ.ArrivalAirports.indexOf($(this).val()) > -1) $("input:checkbox[value='" + $(this).val() + "']").prop('checked', true);
                    });
                }
                if (filterRQ.cabin != null) {
                    $("input:checkbox[name=cabin]").each(function () {
                        if (filterRQ.cabin.indexOf($(this).val()) > -1) $("input:checkbox[value='" + $(this).val() + "']").prop('checked', true);
                    });
                }

                if (filterRQ.DepTimes.length > 0) {
                    for (ifd = 0; ifd < filterRQ.DepTimes.length; ifd++) {
                        var _cmpValue = filterRQ.DepTimes[ifd];
                        var listItems = $("._deptimecontainer li");
                        listItems.each(function (idx, li) {
                            var product = $(li);
                            if ($(li).attr('filtervalue') == _cmpValue) {
                                _depTimes.push(_cmpValue)
                                $(this).addClass("selected");
                            }
                        });
                    }
                }

                if (filterRQ.RetTimes.length > 0) {
                    for (ifd = 0; ifd < filterRQ.RetTimes.length; ifd++) {
                        var _cmpValue = filterRQ.RetTimes[ifd];
                        var listItems = $("._rettimecontainer li");
                        listItems.each(function (idx, li) {
                            var product = $(li);
                            if ($(li).attr('filtervalue') == _cmpValue) {
                                _depTimes.push(_cmpValue)
                                $(this).addClass("selected");
                            }
                        });
                    }
                }



                //if (filterRQ.DepartureTimes != null && filterRQ.DepartureTimes.length > 1) {
                //    this.SetTimeSliderHTML({ values: filterRQ.DepartureTimes }, 'dep');
                //    $(".departure-slider-range").slider('values', 0, filterRQ.DepartureTimes[0]);
                //    $(".departure-slider-range").slider('values', 1, filterRQ.DepartureTimes[1]);
                //}
                //if (filterRQ.ReturnsTimes != null && filterRQ.ReturnsTimes.length > 1) {
                //    this.SetTimeSliderHTML({ values: filterRQ.ReturnsTimes }, 'return');
                //    $(".return-slider-range").slider('values', 0, filterRQ.ReturnsTimes[0]);
                //    $(".return-slider-range").slider('values', 1, filterRQ.ReturnsTimes[1]);
                //}
                if (filterRQ.Pricefilter != null && filterRQ.Pricefilter.length > 1) {
                    $(".slider-range").html('$' + filterRQ.Pricefilter[0]);
                    $(".slider-range2").html('$' + filterRQ.Pricefilter[1]);
                    $(".price-slider-range").slider('values', 0, filterRQ.Pricefilter[0]);
                    $(".price-slider-range").slider('values', 1, filterRQ.Pricefilter[1]);
                }
                if (filterRQ.Matrix != null && filterRQ.Matrix.matcol != null && filterRQ.Matrix.matrow != null) {
                    this.matrixFilter(filterRQ.Matrix.price, filterRQ.Matrix.airlinecode, filterRQ.Matrix.stops, filterRQ.Matrix.ismix, filterRQ.Matrix.matcol, filterRQ.Matrix.matrow);
                }
                else {
                    this.applyFilter(false);
                }
            }
            else {
                this.resetAll('load');
            }
        }
        else {
            this.resetAll('load');
        }
    },
    getAirlines: function () {
        var airlinesArr = [];
        $("#listappliedfiltrairline").remove();
        var stopfilterstr = "";
        $('.matrix_mobile').removeClass('active');
        $("input:checkbox[name=airline]:checked").each(function () {
            if (stopfilterstr == "") {
                stopfilterstr = "Airline: " + $(this).attr("airname");
            }
            else {
                stopfilterstr += ", " + $(this).attr("airname");
            }
            airlinesArr.push($(this).val());
            var aircode_mix = $(this).val() + '_False';
            if ($(this).val().indexOf('_') > 0) aircode_mix = $(this).val().split('_')[0] + '_True';
            $('#martix_mobile_head_' + aircode_mix).addClass('active');
        });

        if (stopfilterstr != "") {
            stopfilterstr = "<li id=\"listappliedfiltrairline\">" + stopfilterstr + "<span onclick=\"Filter.restFilter('airline')\">X</span></li>";
            $(".listappliedfiltr ul").append(stopfilterstr);
        }
        if (airlinesArr.length == 0) {
            airlinesArr = null;
            $(".headairline").hide();
            $('#filter_strip_mobile_airlines').removeClass('active');
            if (filtersApplied.length > 0 && filtersApplied.indexOf('airlines') > -1) {
                filtersApplied.splice(filtersApplied.indexOf('airlines'), 1);
            }
        }
        else {
            $(".mstop1, .mstop0").css("background", "#ffffff");
            if (airlinesArr.length == 1) {
                $("input:checkbox[name=stops]:checked").each(function () {
                    if ($(this).val() == 0) {
                        $(".stop0" + airlinesArr[0]).addClass("active");
                    }
                    else {
                        $(".stop1" + airlinesArr[0]).addClass("active");
                    }
                });

            }

            $(".headairline").show();
            $('#filter_strip_mobile_airlines').addClass('active');
            if (filtersApplied.length == 0 || filtersApplied.indexOf('airlines') == -1) {
                filtersApplied.push('airlines');
            }
        }
        return airlinesArr;
    },
    getCabins: function () {
        var cabinArr = [];
        var stopfilterstr = "";
        $("#listappliedfiltrcabin").remove();
        $("input:checkbox[name=cabin]:checked").each(function () {
            cabinArr.push($(this).val());
            if (stopfilterstr == "") {
                stopfilterstr = "Cabin: " + $(this).val();
            }
            else {
                stopfilterstr += ", " + $(this).val();
            }
        });
        if (stopfilterstr != "") {
            stopfilterstr = "<li id=\"listappliedfiltrcabin\">" + stopfilterstr + "<span onclick=\"Filter.restFilter('cabin')\">X</span></li>";
            $(".listappliedfiltr ul").append(stopfilterstr);
        }
        if (cabinArr.length == 0) {
            cabinArr = null;
            $(".headcabin").hide();
            $('#filter_strip_mobile_cabin').removeClass('active');
            if (filtersApplied.length > 0 && filtersApplied.indexOf('cabin') > -1) {
                filtersApplied.splice(filtersApplied.indexOf('cabin'), 1);
            }
        }
        else {
            $(".headcabin").show();
            $('#filter_strip_mobile_cabin').addClass('active');
            if (filtersApplied.length == 0 || filtersApplied.indexOf('cabin') == -1) {
                filtersApplied.push('cabin');
            }
        }
        return cabinArr;
    },
    getStops: function () {
        var stopsArr = [];
        var howmanystops = "";
        var stopfilterstr = "";
        $("#listappliedfiltrstop").remove();
        $(".mstop1, .mstop0").css("background", "#ffffff");
        $(".matrix_mobile").removeClass("highlight");
        $("input:checkbox[name=stops]:checked").each(function () {
            if (stopfilterstr == "") {
                if ($(this).val() == 0) {
                    stopfilterstr = "Stop: Non-stop";
                }
                else {
                    stopfilterstr = "Stop: " + $(this).val() + " stop";
                }

            }
            else {
                stopfilterstr += ", " + $(this).val() + " stop";
            }
            stopsArr.push($(this).val());
            howmanystops += $(this).val();
            $("#mobilematrix_" + $(this).val()).addClass("highlight");
        });
        if (stopfilterstr != "") {
            stopfilterstr = "<li id=\"listappliedfiltrstop\">" + stopfilterstr + "<span onclick=\"Filter.restFilter('stops')\">X</span></li>";
            $(".listappliedfiltr ul").append(stopfilterstr);
        }
        if (stopsArr.length == 0) {
            stopsArr = null;
            $(".mstop1, .mstop0").css("background", "#ffffff");
            $(".headstop").hide();
            $(".responsiveReset_btn").hide();
            $('#filter_strip_mobile_stops').removeClass('active');
            if (filtersApplied.length > 0 && filtersApplied.indexOf('stops') > -1) {
                filtersApplied.splice(filtersApplied.indexOf('stops'), 1);
            }
        }
        else {
            var airforstopfilter = [];
            $("input:checkbox[name=airline]:checked").each(function () {
                airforstopfilter.push($(this).val());
            });
            if (airforstopfilter.length == 0) {
                if (howmanystops == "0") {
                    $(".mstop0").css("background", "#e6f1fc");
                }
                else if (howmanystops == "12" || howmanystops == "1" || howmanystops == "2") {
                    $(".mstop1").css("background", "#e6f1fc");
                }
            }
            else if (airforstopfilter.length == 1) {
                if (howmanystops == "0") {
                    $(".stop0" + airforstopfilter[0]).addClass("active");
                }
                else if (howmanystops == "12" || howmanystops == "1" || howmanystops == "2") {
                    $(".stop1" + airforstopfilter[0]).addClass("active");
                }
            }

            $(".headstop").show();
            //$(".responsiveReset_btn").show();
            $('#filter_strip_mobile_stops').addClass('active');
            if (filtersApplied.length == 0 || filtersApplied.indexOf('stops') == -1) {
                filtersApplied.push('stops');
            }
        }
        return stopsArr;
    },
    getDepTimes: function () {
        _depTimes = [];
        $("#listappliedfiltrdeptime").remove();
        var stopfilterstr = "";
        var listItems = $("._deptimecontainer li");
        listItems.each(function (idx, li) {
            var product = $(li);
            if ($(li).attr('class').indexOf("selected") >= 0) {
                _depTimes.push($(li).attr('filtervalue'))
                if (stopfilterstr == "") {
                    stopfilterstr = "Departure Time: " + gettimelabel($(li).attr('filtervalue'));
                }
                else {
                    stopfilterstr += ", " + gettimelabel($(li).attr('filtervalue'));
                }
            }
        });
        if (stopfilterstr != "") {
            stopfilterstr = "<li id=\"listappliedfiltrdeptime\">" + stopfilterstr + "<span onclick=\"Filter.restdepfilter('deptime')\">X</span></li>";
            $(".listappliedfiltr ul").append(stopfilterstr);
        }
        if (_depTimes.length == 0) {
            $(".headdeptime").hide();
            //  $(".responsiveReset_btn").hide();
            if (_retTimes.length == 0) {
                if (filtersApplied.length == 0 || filtersApplied.indexOf('time') == -1) {
                    filtersApplied.push('time');
                }
                // $(".headdeptime").show();
            }
            else {
                $('#filter_strip_mobile_time').removeClass('active');
                if (filtersApplied.length > 0 && filtersApplied.indexOf('time') > -1) {
                    filtersApplied.splice(filtersApplied.indexOf('time'), 1);
                }
            }
        }
        else {
            $('#filter_strip_mobile_time').addClass('active');
            if (filtersApplied.length == 0 || filtersApplied.indexOf('time') == -1) {
                filtersApplied.push('time');
            }
            $(".headdeptime").show();
        }
        return _depTimes;
    },
    getRetTimes: function () {
        _retTimes = [];
        $("#listappliedfiltrrettime").remove();
        var stopfilterstr = "";
        var listItems = $("._rettimecontainer li");
        listItems.each(function (idx, li) {
            var product = $(li);
            if ($(li).attr('class').indexOf("selected") >= 0) {
                _retTimes.push($(li).attr('filtervalue'))

                if (stopfilterstr == "") {
                    stopfilterstr = "Return Time: " + gettimelabel($(li).attr('filtervalue'));
                }
                else {
                    stopfilterstr += ", " + gettimelabel($(li).attr('filtervalue'));
                }
            }
        });
        if (stopfilterstr != "") {
            stopfilterstr = "<li id=\"listappliedfiltrrettime\">" + stopfilterstr + "<span onclick=\"Filter.restretfilter('rettime')\">X</span></li>";
            $(".listappliedfiltr ul").append(stopfilterstr);
        }
        if (_retTimes.length == 0) {
            $(".headrettime").hide();
            if (_depTimes.length == 0) {
                $('#filter_strip_mobile_time').removeClass('active');
                if (filtersApplied.length > 0 && filtersApplied.indexOf('time') > -1) {
                    filtersApplied.splice(filtersApplied.indexOf('time'), 1);
                }
            }
            else {
                $('#filter_strip_mobile_time').addClass('active');
                if (filtersApplied.length == 0 || filtersApplied.indexOf('time') == -1) {
                    filtersApplied.push('time');
                }
            }

        }
        else {
            $(".headrettime").show();
            $('#filter_strip_mobile_time').addClass('active');
            if (filtersApplied.length == 0 || filtersApplied.indexOf('time') == -1) {
                filtersApplied.push('time');
            }
        }

        return _retTimes;
    },
    matrixFilter: function (price, airlineCode, stops, isMix, MatrixCol, MatrixRow) {
        $('.matrix-data').removeClass('active');
        $('.matrix-cell').removeClass('active');
        $(".mstop1, .mstop0").css("background", "#ffffff");
        var isAirlineExist = 0;
        Filter.resetAll('matrix');
        if (MatrixRow != undefined && MatrixRow > 0) {
            $("#" + MatrixCol + MatrixRow.toString()).addClass("active");
            $("input:checkbox[name=airline]").each(function () {
                var airidvar = airlineCode;
                if (isMix == "True") {
                    airidvar = airidvar + "_M";
                }
                if ($(this).val() == airidvar) {
                    $(this).prop("checked", true);
                    isAirlineExist = 1;
                }
                else {
                    $(this).prop("checked", false);
                }
            });

            $("input:checkbox[name=stops]").each(function () {
                if (stops == 0) {
                    if ($(this).val() == stops) {
                        $(this).prop("checked", true);
                    }
                }
                else {
                    if ($(this).val() != 0) {
                        $(this).prop("checked", true);
                    }
                }
            });

        }
        else {
            $("#" + MatrixCol).addClass("active");
            $("input:checkbox[name=airline]").each(function () {
                var airidvar = airlineCode;
                if (isMix == "True") {
                    airidvar = airidvar + "_M";
                }
                if ($(this).val() == airidvar) {
                    $(this).prop("checked", true);
                    isAirlineExist = 1;
                }
                else {
                    $(this).prop("checked", false);
                }
            });
        }
        if (isAirlineExist == 0) {
            airlineCode = "";
        }
        var request = {
            price: price,
            airlinecode: airlineCode,
            stops: stops,
            ismix: isMix,
            matcol: MatrixCol,
            matrow: MatrixRow
        };

        this.applyFilter(false, undefined, undefined, request);
    },
    matrixFilter_mobile: function (price, airlineCode, stops, isMix, MatrixCol, MatrixRow) {
        var request = {
            price: price,
            airlinecode: airlineCode,
            stops: stops,
            ismix: isMix
        };
        if ($('#martix_mobile_head_' + airlineCode + '_' + isMix).hasClass('active')) {
            //if (isMix != null && isMix.toLowerCase() == 'false') {
            $('input[name="airline"]').each(function () {
                if (this.value == (airlineCode + (isMix != null && isMix.toLowerCase() == 'false' ? '' : '_M'))) this.checked = false;
            });
            //}
            this.applyFilter(false);
            $('#martix_mobile_head_' + airlineCode + '_' + isMix).removeClass('active');
            if (!$('.matrix_mobile').hasClass('active')) $('#filter_strip_mobile_airlines').removeClass('active');
        }
        else {
            $('.matrix_mobile').removeClass('active');
            $('#martix_mobile_head_' + airlineCode + '_' + isMix).addClass('active');
            //if (isMix != null && isMix.toLowerCase() == 'false') {
            $('input[name="airline"]').each(function () {
                if (this.value != (airlineCode + (isMix != null && isMix.toLowerCase() == 'false' ? '' : '_M'))) this.checked = false;
                else this.checked = true;
            });
            //}
            this.applyFilter(false, undefined, undefined, request);
            $('#filter_strip_mobile_airlines').addClass('active');
        }
    },
    restFilter: function (type) {
        if (type == 'airports') {
            var newtype = 'departure' + type;
            $('input[name="' + newtype + '"]').each(function () {
                this.checked = false;
            });
            newtype = 'arrivals' + type;
            $('input[name="' + newtype + '"]').each(function () {
                this.checked = false;
            });
        }
        else {
            $('input[name="' + type + '"]').each(function () {
                this.checked = false;
            });
        }
        this.applyFilter(false);
    },
    resetAll: function (aa) {
        $(".mstop1, .mstop0").css("background", "#ffffff");
        $(".responsiveReset_btn").hide();
        $(".matrix_mobile").removeClass("highlight");
        $("ul li").removeClass("active");
        $("#all").addClass("active");
        $('.matrix_mobile').removeClass('active');
        $('#tabvalue').val('all');
        $('input:checkbox').each(function () {
            this.checked = false;
        });
        if ($('#isDirectFlight').val() == 'true') {
            $('#SearchDirectFlight').prop('checked', true);
            if ($('input:checkbox[value="0"]').length > 0 && aa != undefined && aa == 'load') {
                $('input:checkbox[value="0"]').prop('checked', true);
                aa = undefined;
                $('#filter_strip_mobile_stops').addClass('active');
                if (filtersApplied.length == 0 || filtersApplied.indexOf('stops') == -1) {
                    filtersApplied.push('stops');
                }
            }
        }
        filtersApplied = [];
        this.restpricefilter('all');
        this.restdepfilter('all');
        this.restretfilter('all');
        //this.applyFilter(false);
        if (aa == undefined) {
            $('.slick-slider').slick('slickGoTo', 0);
            this.applyFilter(false);
        }
        $("ul.adults li:eq(" + (parseInt($("#Adults").val()) - 1) + ")").addClass('active');
        $("ul.childs li:eq(" + $("#Children").val() + ")").addClass('active');
        $("ul.infonlap li:eq(" + $("#Infants").val() + ")").addClass('active');
        $("ul.infonseat li:eq(" + $("#InfantWs").val() + ")").addClass('active');

    },
    resetMatrix: function () {
        matrixRQ = null;
        $('.matrix-data').removeClass('active');
        $('.matrix-cell').removeClass('active');
        $('.slick-slider').slick('slickGoTo', 0);
        this.applyFilter(false);
    },
    showMairline: function () {
        $(".moreairline").toggle();
        if ($(".moreairline").is(":visible")) {
            $("#moreair").html("Hide Airlines");
        }
        else {
            $("#moreair").html("More Airlines");
        }
    },
    submitbut: function (id, section) {

        $('#btnSelect_' + id + ',.close-btn').prop('disabled', true).css('opacity', 0.4);
        $('#btnSelect_' + id + ',.close-btn').css('cursor', 'none');
        if (isMob == 1) {
            try {
                lastAction = false;
                if (W.location.hash.indexOf("#") >= 0) {
                    H.back();
                }
                W.removeEventListener("hashchange", handleHashChangedtl);
            } catch (e) {

            }
        }
        var actionhref = (commonSetting.fltpurchase + "/" + sid + "/" + id);
        if (section == 1) {
            actionhref = (commonSetting.fltpurchase + "/" + sid + "/y2hrznjh" + id);
        }

        if (IsMobileDevice == "True" && isIphone == "1") {
            $('.' + id).removeClass("selected");
            $('#overlay_detail').hide();
            $('.results-page').css('overflow', 'visible');
            $('#_flight-details').hide('slide', { direction: 'right' }, 500);
            window.location.href = actionhref;
            setTimeout(function () {
                showhideloader(0, "");
            }, 5000);
        }
        else {
            window.location.href = actionhref;
        }
    },
    seemore: function () {
        IsScrollEventFire = true;

        pagnumber = pagnumber + 1;

        if (pagnumber == parseInt($("#totalpage").val())) {
            $(".load-more").hide();
        }
        else { $(".load-more").show(); }
        this.applyFilter(true);
    },

    restmobdepretfilter: function (type) {
        var listItems = $("._deptimecontainer li");
        listItems.each(function (idx, li) {
            $(li).removeClass("selected");
            $("#mg" + $(this).attr("filtervalue")).attr('src', "../images/listing/" + $(this).attr("filtervalue") + '.png');
        });

        $(".headdeptime").hide();
        var listItemsRet = $("._rettimecontainer li");
        listItemsRet.each(function (idx, li) {
            $(li).removeClass("selected");
            $("#rmg" + $(this).attr("filtervalue")).attr('src', "../images/listing/" + $(this).attr("filtervalue") + '.png');
        });
        $(".headrettime").hide();
        if (type != 'all') {
            this.applyFilter(false);
        }
    },

    restdepfilter: function (type) {
        var listItems = $("._deptimecontainer li");
        listItems.each(function (idx, li) {
            $(li).removeClass("selected");
            $("#mg" + $(this).attr("filtervalue")).attr('src', "../images/listing/" + $(this).attr("filtervalue") + '.png');
        });

        $(".headdeptime").hide();


        if (type != 'all') {
            this.applyFilter(false);
        }
    },
    restretfilter: function (type) {

        var listItemsRet = $("._rettimecontainer li");
        listItemsRet.each(function (idx, li) {
            $(li).removeClass("selected");
            $("#rmg" + $(this).attr("filtervalue")).attr('src', "../images/listing/" + $(this).attr("filtervalue") + '.png');
        });
        $(".headrettime").hide();


        if (type != 'all') {
            this.applyFilter(false);
        }
    },
    restpricefilter: function (type) {
        var pricemin = $(".price-slider-range").slider("option", "min");
        var pricemax = $(".price-slider-range").slider("option", "max");
        $(".price-slider-range").slider("values", 0, pricemin);
        $(".price-slider-range").slider("values", 1, pricemax);
        $('.slider-range').html("$" + pricemin);
        $('.slider-range2').html("$" + pricemax);
        $('#filter_strip_mobile_price').removeClass('active');
        if (filtersApplied.length > 0 && filtersApplied.indexOf('price') > -1) {
            filtersApplied.splice(filtersApplied.indexOf('price'), 1);
            $(".headprice").hide();
        }
        if (type != 'all') {
            this.applyFilter(false);
        }
    },
    getDepartureAirports: function () {
        var departureairportsArr = [];
        $("#listappliedfiltrdepret").remove();
        var stopfilterstr = "";
        $("input:checkbox[name=departureairports]:checked").each(function () {
            departureairportsArr.push($(this).val());
            if (stopfilterstr == "") {
                stopfilterstr = "Departure from: " + $(this).val();
            }
            else {
                stopfilterstr += ", " + $(this).val();
            }
        });
        var arrivalsairports = [];
        var onlyone = 0;
        $("input:checkbox[name=arrivalsairports]:checked").each(function () {
            arrivalsairports.push($(this).val());
            if (stopfilterstr == "" || onlyone == 0) {
                if (stopfilterstr == "") {
                    stopfilterstr = "Return from: " + $(this).val();
                }
                else {
                    stopfilterstr += ", Return from: " + $(this).val();
                }

            }
            else {
                stopfilterstr += ", " + $(this).val();
            }
            onlyone = 1;
        });
        if (stopfilterstr != "") {
            stopfilterstr = "<li id=\"listappliedfiltrdepret\">" + stopfilterstr + "<span onclick=\"Filter.restFilter('airports')\">X</span></li>";
            $(".listappliedfiltr ul").append(stopfilterstr);
        }

        if (departureairportsArr.length == 0 && arrivalsairports.length == 0) {
            departureairportsArr = null;
            $(".headairport").hide();
            $('#filter_strip_mobile_airports').removeClass('active');
            if (filtersApplied.length > 0 && filtersApplied.indexOf('airports') > -1) {
                filtersApplied.splice(filtersApplied.indexOf('airports'), 1);
            }
        }
        else {
            $(".headairport").show();
            $('#filter_strip_mobile_airports').addClass('active');
            if (filtersApplied.length == 0 || filtersApplied.indexOf('airports') == -1) {
                filtersApplied.push('airports');
            }
        }
        return departureairportsArr;
    },
    getArrivelAirports: function () {
        var departureairportsArr = [];
        $("input:checkbox[name=departureairports]:checked").each(function () {
            departureairportsArr.push($(this).val());
        });
        var arrivalsairports = [];
        $("input:checkbox[name=arrivalsairports]:checked").each(function () {
            arrivalsairports.push($(this).val());
        });
        if (departureairportsArr.length == 0 && arrivalsairports.length == 0) {
            arrivalsairports = null;
            $(".headairport").hide();
            $('#filter_strip_mobile_airports').removeClass('active');
            if (filtersApplied.length > 0 && filtersApplied.indexOf('airports') > -1) {
                filtersApplied.splice(filtersApplied.indexOf('airports'), 1);
            }
        }
        else {
            $(".headairport").show();
            $('#filter_strip_mobile_airports').addClass('active');
            if (filtersApplied.length == 0 || filtersApplied.indexOf('airports') == -1) {
                filtersApplied.push('airports');
            }
        }
        return arrivalsairports;
    },
    getPriceSliderValue: function (sliderValues, slider) {
        $("#listappliedfiltrprice").remove();
        var stopfilterstr = "";
        var price = [];
        var ticks1 = 0;
        var ticks2 = 0;
        //if ($(".price-slider-range").is(':visible')) {
        if (slider == 3) {
            ticks1 = sliderValues.values[0];
            ticks2 = sliderValues.values[1];

        }
        else {
            ticks1 = ($(".price-slider-range").slider("values", 0));
            ticks2 = ($(".price-slider-range").slider("values", 1));
        }
        if (ticks1 > 0 && ticks2 > 0) {
            price.push(ticks1);
            price.push(ticks2);
        }
        else {
            price = null;
        }

        if (price == null || price.length == 0 || (price[0] == $(".price-slider-range").slider("option", "min") && price[1] == $(".price-slider-range").slider("option", "max"))) {
            price = null;
            $(".headprice").hide();
            $('#filter_strip_mobile_price').removeClass('active');
            if (filtersApplied.length > 0 && filtersApplied.indexOf('price') > -1) {
                filtersApplied.splice(filtersApplied.indexOf('price'), 1);
            }
        }
        else {

            stopfilterstr = "Price range: $" + price[0] + " - $" + price[1];
            if (stopfilterstr != "") {
                stopfilterstr = "<li id=\"listappliedfiltrprice\">" + stopfilterstr + "<span onclick=\"Filter.restpricefilter('price')\">X</span></li>";
                $(".listappliedfiltr ul").append(stopfilterstr);
            }
            $(".headprice").show();
            $('#filter_strip_mobile_price').addClass('active');
            if (filtersApplied.length == 0 || filtersApplied.indexOf('price') == -1) {
                filtersApplied.push('price');
            }
        }
        //}
        //else {
        //    price = null;
        //}
        return price;

    },
    getDateFormat: function (inputDate) {
        inputDate = new Date(inputDate.toUTCString().substr(0, 25));
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var hours = inputDate.getHours();
        var minutes = inputDate.getMinutes();
        var dayName = days[inputDate.getDay()];
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        hours = hours < 10 ? '0' + hours : hours;
        var strTime = dayName + ' ' + hours + ':' + minutes + ' ' + ampm;
        return strTime;
    },
    showtab: function (tab) {
        $(".shorting-tab ul li").removeClass("active");
        $("#" + tab).addClass("active");
        $('#tabvalue').val(tab);
        this.applyFilter(false);
    },
    setmatrixstop: function (stopvalue) {
        $("input:checkbox[name=stops]").each(function () {
            if (stopvalue == 0) {
                if ($(this).val() == stopvalue) {
                    $(this).prop("checked", true);
                }
                else {
                    $(this).prop("checked", false);
                }
            }
            else {
                if ($(this).val() != 0) {
                    $(this).prop("checked", true);
                }
                else {
                    $(this).prop("checked", false);
                }
            }
        });
        if (stopvalue == 0) {
            $(".mstop0").css("background", "#e6f1fc");
            $(".mstop1").css("background", "#ffffff");
        }
        else {
            $(".mstop0").css("background", "#ffffff");
            $(".mstop1").css("background", "#e6f1fc");
        }
        $("input:checkbox[name=airline]:checked").each(function () {
            $(this).prop("checked", false);
        });
        this.applyFilter(false);
    },
    getflightdetails: function (flightid, rKey, isMjAir) {
        try {
            ga('send', {
                hitType: 'pageview',
                page: '/us/flights/getflightdetails',
                hitCallback: function () {
                    console.log("ga-submitted");
                }
            });

        } catch (e) {
            console.log("error" + e);
        }
        if (isMob == 1) {
            lastAction = true;
            try {
                W.location.hash = "#flightdetails";
                W.addEventListener("hashchange", handleHashChangedtl);
            } catch (e) {
            }
        }
        //  $("#fltdetails").trigger("click");
        $('.' + flightid).addClass("selected");
        globalfltid = flightid;
        $('#overlay_detail').show();
        // $('#div_gotopayment').show();
        showhideloader(1, "Getting flight details");
        $('.results-page').css('overflow', 'hidden');
        $.ajax({
            //url: "/flights/getflightdetails",
            url: commonSetting.fltdeturl,
            type: "POST",
            data: JSON.stringify({
                flightid: flightid,
                searchId: $("#userSearchId").val(),
                frompage: 'listing'
            }),
            dataType: "json",
            cache: !1,
            contentType: "application/json; charset=utf-8",
            success: function (n) {

                if (n.IsContractExist == true) {
                    $("#_flight-details").html(n.response)
                    //if ($("#_flight-details").is(':hidden'))
                    //{
                    $("#_flight-details").show('slide', { direction: 'right' }, 250);
                    $('#launcher').css('z-index', 9991);
                    //}
                    if (commonSetting.local_storage == 1) {
                        if (sessionStorage.getItem($("#userSearchId").val()) != null && sessionStorage.getItem($("#userSearchId").val()) == "2") {
                            isUCReadytoOpen = 2;
                        }
                    }
                    if (isUCReadytoOpen == 1) {
                        isUCReadytoOpen = 0;
                    }
                }
                else {
                    $("#_flight-details").hide('slide', { direction: 'right' }, 250);
                    $('#overlay_detail').hide();
                    $("#session-expire-warning-modal").modal('show');
                }
                moreinfo(rKey, isMjAir);
                showhideloader(0, "");
            },
            error: function (n) {
                $("#_flight-details").hide('slide', { direction: 'right' }, 250);
                $('#overlay_detail').hide();
                showhideloader(0, "");
                alert(n);
            }
        })

    },
    getflightbaggage: function (airline) {
        $.ajax({
            //url: "/flights/getflightdetails",
            type: "POST",
            dataType: "json",
            url: fltbgg,
            data: { "airline": airline },
            success: function (n) {
                $("#fltbaggage").html(n.response)
            },
            error: function (n) {
                //alert(n.statusText)
            }
        })
    },
    SetTimeSliderHTML: function (time, triptype) {
        var r = Math.floor(time.values[0] / 60), u = time.values[0] - r * 60, i, f;
        r.length == 1 && (r = "0" + r);
        u.length == 1 && (u = "0" + u);
        u == 0 && (u = "00");
        r >= 12 ? r == 12 ? (r = r,
            u = u + " PM") : (r = r - 12,
                u = u + " PM") : (r = r,
                    u = u + " AM");
        r == 0 && (r = 12,
            u = u);
        i = Math.floor(time.values[1] / 60);
        f = time.values[1] - i * 60;
        i.length == 1 && (i = "0" + i);
        f.length == 1 && (f = "0" + f);
        f == 0 && (f = "00");
        i >= 12 ? i == 12 ? (i = i,
            f = f + " PM") : i == 24 ? (i = 11,
                f = "59 PM") : (i = i - 12,
                    f = f + " PM") : (i = i,
                        f = f + " AM");
        if (triptype == "return") {
            $('.return-slider-time').html((r.toString().length == 1 ? "0" + r.toString() : r) + ":" + (u.toString().length <= 4 ? "0" + u.toString() : u));
            $('.return-slider-time2').html((i.toString().length == 1 ? "0" + i.toString() : i) + ":" + (f.toString().length <= 4 ? "0" + f.toString() : f));
        }
        else {
            $('.slider-time').html((r.toString().length == 1 ? "0" + r.toString() : r) + ":" + (u.toString().length <= 4 ? "0" + u.toString() : u));
            $('.slider-time2').html((i.toString().length == 1 ? "0" + i.toString() : i) + ":" + (f.toString().length <= 4 ? "0" + f.toString() : f));
        }
    },
    GetTimeSliderHTML: function (time) {
        var r = Math.floor(time / 60), u = time - r * 60, i, f;
        r.length == 1 && (r = "0" + r);
        u.length == 1 && (u = "0" + u);
        u == 0 && (u = "00");
        r >= 12 ? r == 12 ? (r = r,
            u = u + " PM") : (r = r - 12,
                u = u + " PM") : (r = r,
                    u = u + " AM");
        r == 0 && (r = 12,
            u = u);
        return ((r.toString().length == 1 ? "0" + r.toString() : r) + ":" + (u.toString().length <= 4 ? "0" + u.toString() : u));
    },
    filtertabactive: function (tab_no, id_name) {
        $(".show-component-mobile ul li").removeClass("active");
        $(".tab-pane").removeClass("active");
        //$('[href*="' + tab_no + '"]').addClass('active');
        $('#filterTabs_' + tab_no).addClass('active');
        $('#' + tab_no).addClass('active');
        //$('#filter_strip_mobile_' + id_name).removeClass("active");
        if (filtersApplied != null && filtersApplied.length > 0) {
            filtersApplied = getUnique(filtersApplied)
            $(".filter_strip_mobile ul li").removeClass("active");
            filtersApplied.forEach(function (flt) {
                if (flt == 'timedpt' || flt == 'timertn') flt = 'time';
                $('#filter_strip_mobile_' + flt).addClass('active');
            });

        }
    }
};
function moreinfo(rkey, imjairline) {
}
function moreinfo2(rkey, imjairline) {
    $.ajax({
        url: commonSetting.moreinfo,
        type: "POST",
        data: JSON.stringify({
            rKey: rkey,
            isMjAir: imjairline,
        }),
        dataType: "json",
        cache: !1,
        contentType: "application/json; charset=utf-8",
        success: function (dataResponse) {
            var allRkey = rkey.split('.');
            for (i = 0; i <= allRkey.length - 1; i++) {
                if (allRkey[i] != "") {
                    var _moreInfolist = [];
                    $.each(dataResponse, function (index, element) {
                        if (allRkey[i] + "." == element.SegmentRouteKey) {
                            _moreInfolist.push(element);
                        }
                    });
                    if (_moreInfolist.length > 0) {
                        var maindiv = "";
                        maindiv += "    <div class=\"seat-graphic\">";
                        maindiv += "        <img src =\"" + _moreInfolist[0].Images[0].Thumbnail + "\" />";
                        maindiv += "    </div>";
                        if (_moreInfolist.length >= 2) {
                            maindiv += "    <div class=\"seat-graphic1\">";
                            maindiv += "        <img src =\"" + (_moreInfolist[1].Images[0].Thumbnail) + "\" />";
                            maindiv += "            <span class=\"more\">+" + (_moreInfolist.length) + "</span> ";
                            maindiv += "        </div>";
                        }
                        maindiv += "<div class=\"seat-info\">";
                        maindiv += "    <b>" + toTitleCase(_moreInfolist[0].AirlineName) + " - " + _moreInfolist[0].Airline + " " + _moreInfolist[0].FlightNo + "</b>";
                        maindiv += "    </div>";
                        $("#" + allRkey[i]).html(maindiv);
                        $("#" + allRkey[i]).show();
                    }
                }
            }
            var mainslide = "";
            $.each(dataResponse, function (index, element) {
                if (element.Images.length > 0) {
                    mainslide += "<div class=\"item_block\">";
                    mainslide += "<div class=\"row\">";
                    mainslide += "<div class=\"col-sm-6 col-xs-12\" style=\"float:left;\">";
                    mainslide += "<img src=\"" + (element.Images[0].Medium) + "\" style=\"max-width:320px;border-radius:10px;\" />";
                    mainslide += "</div>";
                    mainslide += "<div class=\"col-sm-6 col-xs-12\" style=\"float:left;\">";
                    mainslide += "<div class=\"deal-content\">";
                    mainslide += "<h5>" + element.Heading + "</h5>";
                    mainslide += "<p>" + element.Description + "</p>";
                    mainslide += "</div>";
                    mainslide += "</div>";
                    mainslide += "</div>";
                    mainslide += "</div>";
                }
            });
            $("#atpcoslider").html(mainslide);
            $(".slider-3").slick({ infinite: !0, slidesToShow: 1, slidesToScroll: 1, arrows: !0, autoplay: !1, prevArrow: '<button class="slick-prev atpcolistleftscroll" aria-label="Previous" type="button">Previous</button>', nextArrow: '<button class="slick-next atpcolistrightscroll" aria-label="Next" type="button">Next</button>', autoplaySpeed: 3e3, responsive: [{ breakpoint: 980, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: !1, dots: !1 } }, { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: !0, dots: !1 } }] }), $(".more, .seat-graphic, .seat-graphic").click(function () { $(".overlay").show(100), $(".slider-3").not(".slick-initialized").slick(), $(".slider-3").slick("refresh") }), $(".close-seat").click(function () { $(".overlay").hide(100) });

        },
        error: function (n) {

        }
    })
}
function toTitleCase(str) {
    try {
        var lcStr = str.toLowerCase();
        return lcStr.replace(/(?:^|\s)\w/g, function (match) {
            return match.toUpperCase();
        });
    } catch (e) {
        return str;
    }
}
function showPriceDetails(id) {
    $('#farebreakup_' + id).toggle();
}
function hidePriceDetails(id) {
    $('#farebreakup_' + id).toggle();
}
function handleHashChangedtl() {
    if (isMob == 1) {
        if ("" === W.location.hash.replace("#", "")) {
            if (!lastAction)
                return;
            hideFlightDetail()
        }
    }
}
function hideFlightDetail() {
    $('.' + globalfltid).removeClass("selected");
    lastAction = false;
    $('#overlay_detail').hide();
    $('.results-page').css('overflow', 'visible');
    $('#_flight-details').hide('slide', { direction: 'right' }, 500);
    if (isUCReadytoOpen == 0) {
        isUCReadytoOpen = 1;
        try {
            ucBannerDisplay();
        } catch (e) {

        }
    }
    if (isMob == 1) {
        try {
            if (W.location.hash.indexOf("#") >= 0) {
                H.back();
            }
            W.removeEventListener("hashchange", handleHashChangedtl);
        } catch (e) {

        }
    }
}



function bkhideFlightDetail() {
    $('.' + globalfltid).removeClass("selected");
    $('#overlay_detail').hide();
    $('.results-page').css('overflow', 'visible');
    $('#_flight-details').hide('slide', { direction: 'right' }, 500);
    if (isUCReadytoOpen == 0) {
        isUCReadytoOpen = 1;
        try {
            ucBannerDisplay();
        } catch (e) {

        }
    }
}


function flightdetailAction(depret) {
    if (depret == 0) {
        $("#deptab").show();
        $("#rettab").hide();
        $("#pricetab").hide();
        $(".deptab").addClass("active");
        $(".rettab").removeClass("active");
        $(".pricetab").removeClass("active");
    }
    else if (depret == 1) {
        $("#deptab").hide();
        $("#rettab").show();
        $("#pricetab").hide();
        $(".rettab").addClass("active");
        $(".deptab").removeClass("active");
        $(".pricetab").removeClass("active");
    }
    else {
        $("#deptab").hide();
        $("#rettab").hide();
        $("#pricetab").show();
        $(".rettab").removeClass("active");
        $(".deptab").removeClass("active");
        $(".pricetab").addClass("active");

    }
}
function matrixOpen() {
    if ($("#isMixAvailable").val() != undefined && $("#isMixAvailable").val().toLowerCase() == 'true') {
        if ($(".multi-airline-icon").is(":visible")) {
            $(".multi-airline-icon").hide();
        }
        else {
            $(".multi-airline-icon").show();
        }
    }
    $("#airlineMatrix").slideToggle();
}

function activityTracker() {
    if (commonSetting.local_storage == 1) {
        var request = {
            TFNumber: localStorage.getItem("searchID"),
            UserSession: sid
        };
        $.ajax({
            url: commonSetting.activityTracker,
            data: JSON.stringify(request),
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            success: function (response) {

            }
        })
    }
}

var currentDt = new Date();
currentDt.setMinutes(currentDt.getMinutes() + 24);
var countDownDateSession = currentDt.getTime();
var isSessionAlertClose = false;
// Update the count down every 1 second
var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();
    // Find the distance between now and the count down date
    var distance = countDownDateSession - now;
    if (distance < 0) {
        clearInterval(x);
        $("#session-expire-warning-modal").modal('show');
        $('#btnLogoutNow, #btnHomeFlight, #sess_startagain').click(function () {
            //var url = $(this).attr('data-item');
            window.location.href = commonSetting.homepageurl;
            /// location.replace(commonSetting.homepageurl)
        });
    }
}, 1000);

function mobileStopFilter(stopCount) {
    //$(".matrix_mobile").removeClass("highlight");
    //$("#mobilematrix_" + stopCount).addClass("highlight");
    $("input:checkbox[name=stops]").prop('checked', false);
    $("input[value='" + stopCount + "']").prop('checked', true);
    $(".responsiveReset_btn").show();
    Filter.applyFilter(false);
}

//listing
$('.responsiveFilter_btn, .filter_strip_mobile li a').click(function () {
    $('.show-component-mobile').addClass('open')
    $('.results-page').addClass('push')
    $('.page-overlay').show();
    $('.mobile-button').show();
    if (!$('.filterTabs li').hasClass('active')) {
        $('#filterTabs_tab-1').addClass('active');
        $('#tab-1').addClass('active');
    }
    if (isMob == 1) {
        filtersflag = true;
        try {
            W.location.hash = "#filter";
            W.addEventListener("hashchange", handleHashChange);
        } catch (e) {

        }
    }
});
$('.close-sidebar, .page-overlay, .apply-filters').click(function () {
    handleToggleFilters();
});
$('.modifySearchMobile').click(function () {
    $('.results-page .modify-engine-wrapper').addClass('open');
    $(".edit-listing-searchdetails").hide();
    $(".expend_search").show();
    $('.results-page').addClass('push')

    try {
        if (isMob == 1) {
            filtersflag = true;
            W.location.hash = "#modify";
            W.addEventListener("hashchange", handleHashChange)
        }

    } catch (e) {
    }
});
function handleHashChange() {
    try {
        if (isMob == 1) {
            if ("" === W.location.hash.replace("#", "")) {
                if (!filtersflag)
                    return;
                handleToggleFilters()
            }
        }
    } catch (e) {
    }
}

function handleToggleFilters() {
    filtersflag = false;
    $('.show-component-mobile').removeClass('open')
    $('.results-page .modify-engine-wrapper').removeClass('open');
    $('.page-overlay').hide();
    $('.mobile-button').hide();
    $('.results-page').removeClass('push');
    if (isMob == 1) {
        try {
            if (W.location.hash.indexOf("#") >= 0) {
                history.back();
            }
            W.removeEventListener("hashchange", handleHashChange);
        } catch (e) {

        }
        if ($('#ui-datepicker-div').css('display') == 'block') { $('#ui-datepicker-div').hide(); }
    }

}

$(window).scroll(function () {
    if ($(document).scrollTop() > 73) {
        $('.mobile-header-fixed').addClass('fixed');
    } else {
        $('.mobile-header-fixed').removeClass('fixed');
    }
});
//endlisting

