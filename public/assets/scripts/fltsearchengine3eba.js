var vrfyfrmsel = ""; var numberofMonthCal = 2; var formData = ""; var isWrongSearch_O = ''; var isWrongSearch_D = ''; var issearchagain = 0; $(function () { $("#origin, #destination").keypress(function (e) { var k = e.keyCode || e.which; return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || k == 39 || k == 45 || k == 46 || k == 44 || k == 190 || k == 188); }); }); $(document).mouseup(function (e) { var traveldetails = $(".traveler-fees-slide"); if (!traveldetails.is(e.target) && traveldetails.has(e.target).length === 0) { traveldetails.hide(); } }); function blink_error() { $('#petErrorMessage').fadeOut(1000); $('#petErrorMessage').fadeIn(1000); setInterval(blink_error, 1000); }
$.extend($.ui.autocomplete.prototype.options, { open: function (event, ui) { } }); $(document).ready(function () {
    var terms = []; var isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())); $("#origin,#destination,#airlinecode").focus(function () { $(this).select(); }); if ($(window).width() < 1200) { numberofMonthCal = 2; }
    if ($(window).width() <= 767) { numberofMonthCal = 1; }
    $('#fromDateDisplay, #toDateDisplay, #travelerOpen').click(function () { if (document.location.href.indexOf("/us/reviews") < 0) { if (isMobile == false) { try { $('html, body').animate({ scrollTop: $(".engine-tabs").offset().top - 50 }, 1000); } catch (e) { } } } }); $('.popup-close').click(function () { $(".traveler-fees-slide").slideUp(); $(this).find(".fa-angle-double-up").removeClass("fa-angle-double-up").addClass("fa-angle-double-down"); }); $(".swap_button").click(function () { $(this).toggleClass("active"); }); window.onresize = function () { if (window.innerWidth >= 768 && $(".modify-engine-wrapper").hasClass("open")) { $('.modify-engine-wrapper').removeClass('open'); $('.results-page').css('overflow', 'visible'); } }
    $("#add_return").click(function () { $(this).hide(); $("#TripType").val('2'); $("#SearchReturnFlight").val(true); $("#remove_return").show(); $("#toDateDisplay").datepicker("show"); }); $("#remove_return").click(function () { $("#add_return").show(); $("#TripType").val('1'); $("#SearchReturnFlight").val(false); }); var autocompleteUrl = commonSetting.searchSuggest; var mindata = 3; try { if (aidata.length > 0) { mindata = 0; } } catch (ex) { }
    $("#origin").autocomplete({
        source: function (request, response) {
            if (request.term.length < 3) { var autoRes = aidata; response($.map(autoRes, function (data, id) { return { label: data.AirportName == 'Do you mean?' || data.AirportName == 'Matching location with your searched input!' ? data.AirportName : (data.AirportName == 'Did you mean' ? data.AirportName + " " + data.AirportCode : (data.AirportCode + " - " + data.AirportName + "," + data.CityName + "," + (data.StateName == "" ? "" : (data.StateName + ",")) + data.Country)), value: data.AirportName == 'Do you mean?' || data.AirportName == 'Matching location with your searched input!' ? data.AirportName : (data.AirportName == 'Did you mean' ? data.AirportName + " " + data.AirportCode : (data.AirportCode + " - " + data.AirportName + "," + data.CityName + "," + (data.StateName == "" ? "" : (data.StateName + ",")) + data.Country)), code: data.AirportCode, key: request.term, s_code: data.StateCode, }; })); }
            else {
                $.ajax({
                    url: autocompleteUrl, type: "POST", dataType: "json", data: { term: request.term.trim() }, success: function (res) {
                        if (res == '' || res == '[]') { if ($('#origin').val().length < 20) { var result = [{ label: 'No location found', value: 'No location found', type: '', code: "No location found", key: "No location found", s_code: "No location found", }]; response(result); } }
                        else {
                            var autoRes = JSON.parse(res); if (autoRes != undefined && (autoRes.AirLocation != null || autoRes.AnotherLocation != null || autoRes.possibleLocations != null) && (autoRes.AirLocation.length > 0 || autoRes.AnotherLocation.length > 0 || autoRes.possibleLocations.length > 0)) {
                                autoRes.PossibleLocations = []; terms = []; if (autoRes.AnotherLocation != null && autoRes.AnotherLocation.length > 0) { autoRes.AnotherLocation.unshift({ AirportCode: "", AirportName: "Matching location with your searched input!", CityCode: "", CityName: "", Continent: "", Country: "", CountryName: "", StateCode: "", StateName: "", isMain: "false", LocType: "Matching location with your searched input!" }); terms.push("Matching location with your searched input!"); }
                                if (autoRes.possibleLocations != null && autoRes.possibleLocations.length > 0) {
                                    for (var ss = 0; ss < autoRes.possibleLocations.length; ss++) { var o = { AirportCode: autoRes.possibleLocations[ss].key, AirportName: "Did you mean", CityCode: "", CityName: "", Continent: "", Country: "", CountryName: "", StateCode: "", StateName: "", isMain: "false", LocType: "Did you mean" }; autoRes.PossibleLocations.push(o); for (var vv = 0; vv < autoRes.possibleLocations[ss].NearByLst.length; vv++) { var p = { AirportCode: autoRes.possibleLocations[ss].NearByLst[vv].AirportCode, AirportName: autoRes.possibleLocations[ss].NearByLst[vv].AirportName, CityCode: autoRes.possibleLocations[ss].NearByLst[vv].CityCode, CityName: autoRes.possibleLocations[ss].NearByLst[vv].CityName, Continent: autoRes.possibleLocations[ss].NearByLst[vv].Continent, Country: autoRes.possibleLocations[ss].NearByLst[vv].Country, CountryName: autoRes.possibleLocations[ss].NearByLst[vv].CountryName, StateCode: autoRes.possibleLocations[ss].NearByLst[vv].StateCode, StateName: autoRes.possibleLocations[ss].NearByLst[vv].StateName, isMain: autoRes.possibleLocations[ss].NearByLst[vv].isMain, LocType: "Did you mean" }; autoRes.PossibleLocations.push(p); } }
                                    terms.push("Did you mean");
                                }
                                var autoResponseTemp = $.merge(autoRes.AirLocation, (autoRes.isPossbileOnTop == true ? autoRes.PossibleLocations : autoRes.AnotherLocation)); var autoResponse = $.merge(autoResponseTemp, (autoRes.isPossbileOnTop == true ? autoRes.AnotherLocation : autoRes.PossibleLocations)); response($.map(autoResponse, function (data, id) { return { label: data.AirportName == 'Do you mean?' || data.AirportName == 'Matching location with your searched input!' ? data.AirportName : (data.AirportName == 'Did you mean' ? data.AirportName + " " + data.AirportCode : (data.AirportCode + " - " + data.AirportName + "," + data.CityName + "," + (data.StateName == "" ? "" : (data.StateName + ",")) + data.Country)), value: data.AirportName == 'Do you mean?' || data.AirportName == 'Matching location with your searched input!' ? data.AirportName : (data.AirportName == 'Did you mean' ? data.AirportName + " " + data.AirportCode : (data.AirportCode + " - " + data.AirportName + "," + data.CityName + "," + (data.StateName == "" ? "" : (data.StateName + ",")) + data.Country)), type: data.isMain, code: data.AirportCode, key: request.term, s_code: data.LocType, }; }));
                            }
                            else { var result = [{ label: 'No location found', value: 'No location found', type: '', code: 'No location found', key: 'No location found', s_code: "No location found", }]; response(result); }
                        }
                    }
                })
            }
        }, minLength: mindata, autoFocus: true, maxShowItems: 6, change: function (event, ui) { if (!ui.item) { $(this).val(""); } }, select: function (event, ui) {
            if (ui.item.label == 'No location found' || ui.item.label == 'Do you mean?' || ui.item.label == 'Matching location with your searched input!' || ui.item.label.indexOf('Did you mean') > -1) { $(this).val(''); }
            else {
                isWrongSearch_O = ""; if (ui.item.s_code != undefined && ui.item.s_code.indexOf('Did you mean') > -1) { isWrongSearch_O = ui.item.key; }
                $(this).val(ui.item.label); $('#OriginAirport_AirportCode').val(ui.item.code); $("#clrOrigin").show(); $("#sameSearch").text(''); setTimeout(function () { $("#destination").focus(); }, 100);
            }
            return false;
        }, position: { my: isMobile ? "left top-1" : "left top-1", at: "left bottom", collision: "none" }
    }).focus(function () { if ($(this).val() == "") { $(this).autocomplete("search", ""); } }).autocomplete("instance")._renderItem = function (ul, item) { return displayAutoSuggest(item, ul, 'fa-A', ''); }; $("#destination").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: autocompleteUrl, type: "POST", dataType: "json", data: { term: request.term.trim() }, success: function (res) {
                    if (res == '' || res == '[]') { if ($('#destination').val().length < 20) { var result = [{ label: 'No location found', value: 'No location found', code: 'No location found', key: 'No location found', s_code: "No location found", }]; response(result); } }
                    else {
                        var autoRes = JSON.parse(res); if (autoRes != undefined && (autoRes.AirLocation != null || autoRes.AnotherLocation != null || autoRes.possibleLocations != null) && (autoRes.AirLocation.length > 0 || autoRes.AnotherLocation.length > 0 || autoRes.possibleLocations.length > 0)) {
                            autoRes.PossibleLocations = []; terms = []; if (autoRes.AnotherLocation != null && autoRes.AnotherLocation.length > 0) { autoRes.AnotherLocation.unshift({ AirportCode: "", AirportName: "Matching location with your searched input!", CityCode: "", CityName: "", Continent: "", Country: "", CountryName: "", StateCode: "", StateName: "", LocType: "Matching location with your searched input!" }); terms.push("Matching location with your searched input!"); }
                            if (autoRes.possibleLocations != null && autoRes.possibleLocations.length > 0) {
                                for (var ss = 0; ss < autoRes.possibleLocations.length; ss++) { var o = { AirportCode: autoRes.possibleLocations[ss].key, AirportName: "Did you mean", CityCode: "", CityName: "", Continent: "", Country: "", CountryName: "", StateCode: "", StateName: "", LocType: "Did you mean" }; autoRes.PossibleLocations.push(o); for (var vv = 0; vv < autoRes.possibleLocations[ss].NearByLst.length; vv++) { var p = { AirportCode: autoRes.possibleLocations[ss].NearByLst[vv].AirportCode, AirportName: autoRes.possibleLocations[ss].NearByLst[vv].AirportName, CityCode: autoRes.possibleLocations[ss].NearByLst[vv].CityCode, CityName: autoRes.possibleLocations[ss].NearByLst[vv].CityName, Continent: autoRes.possibleLocations[ss].NearByLst[vv].Continent, Country: autoRes.possibleLocations[ss].NearByLst[vv].Country, CountryName: autoRes.possibleLocations[ss].NearByLst[vv].CountryName, StateCode: autoRes.possibleLocations[ss].NearByLst[vv].StateCode, StateName: autoRes.possibleLocations[ss].NearByLst[vv].StateName, LocType: "Did you mean" }; autoRes.PossibleLocations.push(p); } }
                                terms.push("Did you mean");
                            }
                            var autoResponseTemp = $.merge(autoRes.AirLocation, (autoRes.isPossbileOnTop == true ? autoRes.PossibleLocations : autoRes.AnotherLocation)); var autoResponse = $.merge(autoResponseTemp, (autoRes.isPossbileOnTop == true ? autoRes.AnotherLocation : autoRes.PossibleLocations)); response($.map(autoResponse, function (data, id) { return { label: data.AirportName == 'Do you mean?' || data.AirportName == 'Matching location with your searched input!' ? data.AirportName : (data.AirportName == 'Did you mean' ? data.AirportName + " " + data.AirportCode : (data.AirportCode + " - " + data.AirportName + "," + data.CityName + "," + (data.StateName == "" ? "" : (data.StateName + ",")) + data.Country)), value: data.AirportName == 'Do you mean?' || data.AirportName == 'Matching location with your searched input!' ? data.AirportName : (data.AirportName == 'Did you mean' ? data.AirportName + " " + data.AirportCode : (data.AirportCode + " - " + data.AirportName + "," + data.CityName + "," + (data.StateName == "" ? "" : (data.StateName + ",")) + data.Country)), code: data.AirportCode, key: request.term, s_code: data.LocType, }; }));
                        }
                        else { var result = [{ label: 'No location found', value: 'No location found', type: '', code: 'No location found', key: 'No location found', s_code: "No location found", }]; response(result); }
                    }
                }
            })
        }, minLength: 3, autoFocus: true, maxShowItems: 6, change: function (event, ui) { if (!ui.item) { $(this).val(""); } }, focus: function (event, ui) { event.preventDefault(); }, select: function (event, ui) {
            if (ui.item.label == 'No location found' || ui.item.label == 'Do you mean?' || ui.item.label == 'Matching location with your searched input!' || ui.item.label.indexOf('Did you mean') > -1) { $(this).val(''); }
            else {
                isWrongSearch_D = ''; if (ui.item.s_code != undefined && ui.item.s_code.indexOf('Did you mean') > -1) { isWrongSearch_D = ui.item.key; }
                $(this).val(ui.item.label); $('#DestinationAirport_AirportCode').val(ui.item.code); $("#clrDestination").show(); $("#sameSearchDest").text(''); setTimeout(function () { $("#fromDateDisplay").focus(); }, 100);
            }
            return false;
        }, position: { my: isMobile ? "left top-1" : "left top-1", at: "left bottom", collision: "none" },
    }).autocomplete("instance")._renderItem = function (ul, item) { return displayAutoSuggest(item, ul, 'fa-A', ''); }
    $("#airlinecode").autocomplete({ source: function (request, response) { $.ajax({ url: commonSetting.searchAirline, type: "POST", dataType: "json", data: { term: request.term }, success: function (res) { var autoRes = JSON.parse(res); response($.map(autoRes, function (data, id) { return { label: data.Name + " - " + data.Code, value: data.Code, }; })); } }) }, minLength: 2, autoFocus: true, maxShowItems: 6, change: function (event, ui) { if (!ui.item) { $(this).val(""); } }, focus: function (event, ui) { event.preventDefault(); }, select: function (event, ui) { $(this).val(ui.item.label); $("#clrAirline").show(); return false; }, position: { of: "#airlinecode", my: "left top+15", at: "left bottom", collision: "none" }, }); function displayAutoSuggest(item, ul, cls, desc) {
        if (item.key.toLowerCase() != 'no location found') {
            var regEx = new RegExp(item.key.toLowerCase(), "ig"); var replaceMask = '<strong>' + item.key.toUpperCase() + '</strong>'; var finalMask = item.label.replace(regEx, replaceMask)
            var listItem = $("<li><i class='" + cls + "'></i></li>").data("item.autocomplete", item).append(finalMask).appendTo(ul); for (var iterms = 0; iterms < terms.length; iterms++) { if (item.label.indexOf(terms[iterms]) > -1) { listItem.addClass("match-autosugguest"); listItem.children().removeClass(cls); } }
            return listItem;
        }
        else {
            var regEx = new RegExp(item.key.toLowerCase(), "ig"); var replaceMask = item.key; var finalMask = item.label.replace(regEx, replaceMask)
            var listItem = $("<li><i></i></li>").data("item.autocomplete", item).append(finalMask).appendTo(ul); return listItem;
        }
    }
    $("#fromDateDisplay").datepicker({
        minDate: '+0', maxDate: '+11M', numberOfMonths: numberofMonthCal, dateFormat: 'M dd, yy', altField: "#TravelDate", altFormat: "yy-mm-dd", changeMonth: false, changeYear: false, onClose: setretval, orientation: "bottom auto", onSelect: function (dateText, inst) { vrfyfrmsel = dateText; $("#fromDateIn").val(inst.selectedYear); }, beforeShowDay: function (date) {
            var startDate = $('#fromDateDisplay').datepicker("getDate"); var endDate = $('#toDateDisplay').datepicker("getDate"); var selClass = ""; if ($("#TripType").val() == 2) { if (startDate && (date.getTime() == startDate.getTime())) { selClass = "start-date" } else if (endDate && (date.getTime() == endDate.getTime())) { selClass = "end-date"; } else if ((startDate && endDate) && (startDate < date && date < endDate)) { selClass = "between-date"; } }
            return [true, selClass];
        }, beforeShow: function (input, inst) { vrfyfrmsel = ""; var calendar = inst.dpDiv; var setorgin = "fromDateDisplay"; setTimeout(function () { calendar.position({ my: isMobile ? 'left top+2' : 'left top+2', at: 'left bottom', collision: 'none', of: "#" + setorgin }); }, 1); }
    }); $("#toDateDisplay").datepicker({
        minDate: '+0', maxDate: '+11M', numberOfMonths: numberofMonthCal, dateFormat: 'M dd, yy', changeMonth: false, changeYear: false, altField: "#ReturnDate", altFormat: "yy-mm-dd", onClose: chkoutch, onSelect: function (dateText, inst) { $("#toDateIn").val(inst.selectedYear); }, beforeShowDay: function (date) {
            var startDate = $('#fromDateDisplay').datepicker("getDate"); var endDate = new Date($('#ReturnDate').val()); var selClass = ""; if ($("#TripType").val() == 2) { if (startDate && (date.getTime() == startDate.getTime())) { selClass = "start-date" } else if (endDate && (date.getTime() == endDate.getTime())) { selClass = "end-date"; } else if ((startDate && endDate) && (startDate < date && date < endDate)) { selClass = "between-date"; } }
            return [true, selClass];
        }, beforeShow: function (input, inst) {
            var calendar = inst.dpDiv; var setorgin = "fromDateDisplay"; if (isMobile && numberofMonthCal < 2) { setorgin = "fromDateDisplay"; }
            else if (isMobile && $("#hmpage").val() == undefined) { setorgin = "fromDateDisplay"; }
            setTimeout(function () { calendar.position({ my: isMobile ? 'left top+2' : 'left top+2', at: 'left bottom', collision: 'none', of: "#" + setorgin }); }, 1); var b = new Date(); var c = new Date(b.getFullYear(), b.getMonth(), b.getDate()); if ($('#fromDateDisplay').datepicker('getDate') != null) { c = $('#fromDateDisplay').datepicker('getDate'); }
            return { minDate: c = new Date(c.getFullYear(), c.getMonth(), c.getDate()) }
        }
    });
}); function showpaxpopup() {
    $("#ermsg").text(''); if (document.getElementById('selectpax').style.display == 'block') { document.getElementById('selectpax').style.display = 'none'; }
    else { document.getElementById('selectpax').style.display = 'block'; }
}
function setretval(a) {
    var b = new Date(); var c = new Date(b.getFullYear(), b.getMonth(), b.getDate()); if ($('#fromDateDisplay').datepicker('getDate') != null) { c = $('#fromDateDisplay').datepicker('getDate'); $('#TravelDate').val(c.getFullYear() + "-" + ("0" + (c.getMonth() + 1)).slice(-2) + "-" + ("0" + c.getDate()).slice(-2)); }
    if ($('#toDateDisplay').datepicker('getDate') < $('#fromDateDisplay').datepicker('getDate')) { c = new Date(c.getFullYear(), c.getMonth(), c.getDate() + 3); $('#toDateDisplay').datepicker("setDate", new Date(c)); $('#ReturnDate').val(c.getFullYear() + "-" + ("0" + (c.getMonth() + 1)).slice(-2) + "-" + ("0" + c.getDate()).slice(-2)); }
    if ($("#TripType").val() == 2 && vrfyfrmsel != "") { $("#toDateDisplay").datepicker("show"); }
}
function setretmin(a) {
    var b = new Date(); var c = new Date(b.getFullYear(), b.getMonth(), b.getDate()); if (a.id == 'toDateDisplay') { if ($('#fromDateDisplay').datepicker('getDate') != null) { c = $('#fromDateDisplay').datepicker('getDate'); } }
    return { minDate: c = new Date(c.getFullYear(), c.getMonth(), c.getDate() + 1) }
}
function chkin(a) {
    var b = new Date(); var c = new Date(b.getFullYear(), b.getMonth(), b.getDate()); if ($('#fromDateDisplay').datepicker('getDate') != null) { var c = $('#fromDateDisplay').datepicker('getDate'); $('#TravelDate').val(c.getFullYear() + "-" + (c.getMonth() + 1) + "-" + c.getDate()); }
    if ($('#toDateDisplay').datepicker('getDate') < $('#fromDateDisplay').datepicker('getDate')) { c = new Date(c.getFullYear(), c.getMonth(), c.getDate() + 3); $('#toDateDisplay').datepicker("setDate", new Date(c)); $('#ReturnDate').val(c.getFullYear() + "-" + (c.getMonth() + 1) + "-" + c.getDate()); }
}
function chkout(a) {
    var b = new Date(); var c = new Date(b.getFullYear(), b.getMonth(), b.getDate()); if (a.id == 'toDateDisplay') { if ($('#fromDateDisplay').datepicker('getDate') != null) { c = $('#fromDateDisplay').datepicker('getDate'); } }
    return { minDate: c = new Date(c.getFullYear(), c.getMonth(), c.getDate() + 1) }
}
function chkoutch(a) { c = $('#toDateDisplay').datepicker('getDate'); $('#toDateDisplay').datepicker("setDate", new Date(c)); $('#ReturnDate').val(c.getFullYear() + "-" + ("0" + (c.getMonth() + 1)).slice(-2) + "-" + ("0" + c.getDate()).slice(-2)); }
var tpx = 1; var trvl = "Traveler"; $(document).ready(function () {
    $('ul.adults li').click(function (e) {
        if (parseInt($('ul.infonlap>li.active').text()) > parseInt($(this).text())) { $('ul.infonlap>li.active').removeClass('active'); $('ul.infonlap>li').eq((parseInt($(this).text()))).addClass('active'); }
        if (parseInt($('ul.infonseat>li.active').text()) > parseInt($(this).text())) { $('ul.infonseat>li.active').removeClass('active'); $('ul.infonseat>li').eq((parseInt($(this).text()))).addClass('active'); }
        if (chktl(parseInt($(this).text()), parseInt($('ul.childs>li.active').text()), parseInt($('ul.infonlap>li.active').text()), parseInt($('ul.infonseat>li.active').text()))) { $('ul.adults li').removeClass('active'); $(this).addClass('active'); $("#Adults").val($(this).text()); $("#travelerOpen").val(tpx + " " + trvl + ", " + $("#CabinType").val()) }
    }); $('ul.childs li').click(function (e) { if (chktl(parseInt($('ul.adults>li.active').text()), parseInt($(this).text()), parseInt($('ul.infonlap>li.active').text()), parseInt($('ul.infonseat>li.active').text()))) { $('ul.childs li').removeClass('active'); $(this).addClass('active'); $("#Children").val($(this).text()); $("#travelerOpen").val(tpx + " " + trvl + ", " + $("#CabinType").val()) } }); $('ul.infonlap li').click(function (e) {
        if (chktl(parseInt($('ul.adults>li.active').text()), parseInt($('ul.childs>li.active').text()), parseInt($(this).text()), parseInt($('ul.infonseat>li.active').text()))) {
            if (parseInt($('ul.adults>li.active').text()) >= parseInt($(this).text())) { $('ul.infonlap li').removeClass('active'); $(this).addClass('active'); $("#Infants").val($(this).text()); $("#travelerOpen").val(tpx + " " + trvl + ", " + $("#CabinType").val()) }
            else { $("#ermsg").text("Number of Infant (on lap) can not exceed number of Adult selected"); }
        }
    }); $('ul.infonseat li').click(function (e) {
        if (chktl(parseInt($('ul.adults>li.active').text()), parseInt($('ul.childs>li.active').text()), parseInt($('ul.infonlap>li.active').text()), parseInt($(this).text()))) {
            if (parseInt($('ul.adults>li.active').text()) >= parseInt($(this).text())) { $('ul.infonseat li').removeClass('active'); $(this).addClass('active'); $("#InfantWs").val($(this).text()); $("#travelerOpen").val(tpx + " " + trvl + ", " + $("#CabinType").val()) }
            else { $("#ermsg").text("Number of Infant (on Seat) can not exceed number of Adult selected"); }
        }
    });
}); function chktl(adt, chd, inl, ins) {
    tpx = 1; trvl = "Traveler"; tpx = adt + chd + inl + ins; if (tpx > 9) { $("#ermsg").text("Total number of passengers cannot be more than 9"); return false; } else {
        if (tpx > 1) { trvl = "Travelers"; }
        $("#ermsg").text(''); return true;
    }
}
$("#CabinType").on('change', function () { tpx = parseInt($('ul.adults>li.active').text()) + parseInt($('ul.childs>li.active').text()) + parseInt($('ul.infonseat>li.active').text()) + parseInt($('ul.infonlap>li.active').text()); $("#travelerOpen").val(tpx + " " + trvl + ", " + $("#CabinType").val()) });
$(".done_button").click(function () { $("#ermsg").text(''); $("#selectpax").css('display', 'none'); }); function journeyChange(TripType) {
    $("#TripType").val(TripType); if (TripType == "1") { $("#SearchReturnFlight").val(false); $('#toDate,#toDateDisplay').hide(); $('.retcal').hide(); }
    else { $("#SearchReturnFlight").val(true); $('#toDate,#toDateDisplay').show(); $('.retcal').show(); }
}
function conceal() {
    $("#petErrorMessage").text(""); if (document.getElementById('selectPet').style.display == 'block' && TotalPet != 0) { document.getElementById('selectPet').style.display = 'none'; }
    else if (TotalPet == 0) { $("#petErrorMessage").text("Please select a pet type"); }
}
function show() {
    $(".traveler-fees-slide").slideUp(); $('.pet-information-detail').hide(); $(this).find(".fa-angle-double-up").removeClass("fa-angle-double-up").addClass("fa-angle-double-down"); if (document.getElementById('selectPet').style.display == 'none') { document.getElementById('selectPet').style.display = 'block'; $('.drop-errow').addClass('open'); }
    else {
        if (TotalPet == 0) { $("#petErrorMessage").text("Please select a pet type"); }
        else { document.getElementById('selectPet').style.display = 'none'; }
    }
}
function selectSearchAirline() { }
function clrlocation(loc) {
    if (loc != null) {
        if (loc == 'o') { $("#origin").val(''); $("#clrOrigin").hide(); $("#origin").focus(); }
        else if (loc == 'd') { $("#destination").val(''); $("#clrDestination").hide(); $("#destination").focus(); }
        else if (loc == 'a') { $("#airlinecode").val(''); $("#clrAirline").hide(); $("#airlinecode").focus(); }
    }
}
function swapDepRet() {
    var a = $("#origin").val(); var b = $("#destination").val(); if (a != null && b != null) {
        if (a.length > 1 && b.length > 1) {
            var t = a; a = b; b = t; $("#origin").parent().addClass("goToRight"); $("#destination").parent().addClass("goToLeft")
            $(".swap_button").addClass("rotateMe")
            window.setTimeout(function () { $("#origin").val(a); $("#destination").val(b); var o_aircode = $('#OriginAirport_AirportCode').val(); var o_statecode = $('#OriginAirport_StateCode').val(); var d_aircode = $('#DestinationAirport_AirportCode').val(); var d_statecode = $('#DestinationAirport_StateCode').val(); $('#OriginAirport_AirportCode').val(d_aircode); $('#OriginAirport_StateCode').val(d_statecode); $('#DestinationAirport_AirportCode').val(o_aircode); $('#DestinationAirport_StateCode').val(o_statecode); $(".swap_button").removeClass("rotateMe"); }, 500), window.setTimeout(function () { $("#origin").parent().removeClass("goToRight"), $("#destination").parent().removeClass("goToLeft"); }, 700);
        }
    }
}
function valid(isFromAirline) {
    if (isFromAirline != undefined && isFromAirline != null && isFromAirline != 'false') { $('#isFromAirline').val(isFromAirline); }
    $("#sameSearch").text(''); $("#sameSearchDest").text(''); $("#sameSearchdup").text(''); if (issearchagain == 0 && formData != null && formData != undefined && formData.toLowerCase() == $('#FlightForm').serialize().toLowerCase()) { $("#sameSearch").text("Please change your search criteria !"); $("#sameSearch").show(); return false; }
    else if ($('#origin').val() != "" && $('#destination').val() != "" && $('#origin').val() == $('#destination').val()) { $("#origin").addClass('input-validation-error'); $("#destination").addClass('input-validation-error'); $("#sameSearchdup").text("Please enter a different Origin and Destination city/airport !"); $("#sameSearchdup").show(); return false; }
    else if (($('#origin').val() == null || $('#origin').val() == "") && ($('#destination').val() == null || $('#destination').val() == "")) { $("#sameSearch").text("Please enter origin"); $("#origin").addClass('input-validation-error'); $("#destination").addClass('input-validation-error'); $("#sameSearchDest").text("Please enter destination"); $("#sameSearch").show(); $("#sameSearchDest").show(); }
    else if ($('#origin').val() == null || $('#origin').val() == "") { $("#origin").addClass('input-validation-error'); $("#sameSearch").text("Please enter origin"); $("#sameSearch").show(); return false; }
    else if ($('#destination').val() == null || $('#destination').val() == "") { $("#destination").addClass('input-validation-error'); $("#sameSearchDest").text("Please enter destination"); $("#sameSearchDest").show(); return false; }
    else {
        try { if ($('#origin').val() != "" && $('#destination').val() != "") { var org = $('#origin').val().split("-"); var des = $('#destination').val().split("-"); if (org[0] == des[0]) { $("#origin").addClass('input-validation-error'); $("#destination").addClass('input-validation-error'); $("#sameSearchdup").text("Please enter a different Origin and Destination city/airport !"); $("#sameSearchdup").show(); return false; } } } catch (ex) { }
        var pgtype = $('#pagetype').val(); if (pgtype != null) { $('#AirlinePage').val(pgtype); }
        document.cookie = "lastopend=flightTab;expires=" + (new Date((new Date()).getTime() + 30 * 24 * 60 * 60 * 1000)) + "; path=/;"; if (commonSetting.local_storage == 1) { localStorage.setItem("fll", 'false'); sessionStorage.removeItem('fltfltr'); }
        if ((isWrongSearch_D != '' && isWrongSearch_D.length > 0) || (isWrongSearch_O != '' && isWrongSearch_O.length > 0)) { }
        if (location.href.indexOf('/us/flight-search/') >= 0 || location.href.indexOf('/us/listing/') >= 0) { $('#pageType').val("Modify-Search"); }
        try { if (isMob == 1) { if (window.location.hash.indexOf("#") >= 0) { history.back(); } } } catch (e) { }
        try {
            var isframefound = 0; var _smpfound = '0'; try { var framefound = parent.window.iframe; } catch (e) { isframefound = 1; }
            try { var co = readCookie('metaredirectoff'); if (co == "1") { isframefound = 1 } } catch (ex) { }
            try { _smpfound = sessionStorage.getItem("_smp"); } catch (e) { }
            try { debugger; if ($("#sourceMedia").val().toLowerCase() == "kayakads") { _smpfound = 1 } } catch (e) { }
            if (isframefound == 1 || _smpfound == '1') { $('form#FlightForm').removeAttr("target"); }
            else {
                var triptype = $("#TripType").val(); var departdate = $("#TravelDate").val(); var returndate = $("#ReturnDate").val(); var deepurl = "https://www.packedbag.com/compare/sites?origin=" + $("#origin").val().split('-')[0].trim() + "&destination=" + $("#destination").val().split('-')[0].trim() + "&triptype=" + triptype; deepurl = deepurl + "&adults=" + $("#Adults").val() + "&children=" + $("#Children").val() + "&infant=" + $("#Infants").val(); deepurl = deepurl + "&infantws=" + $("#InfantWs").val() + "&cabintype=" + $("#CabinType").val() + "&departdate=" + parseJsonDate(departdate); if (triptype == "2") { deepurl = deepurl + "&returndate=" + parseJsonDate(returndate); } else { deepurl = deepurl + "&returndate=" + parseJsonDate(departdate); }
                deepurl = deepurl + "&site=160&utmsource=lbyf_" + (readCookie('utm_source') == null ? 'online' : readCookie('utm_source')); setTimeout(function () {
                    window.location.href = deepurl; var clicktripzid = "101748d3-0bc4-428e-9811-d36e3b9eecb1"; if (isMobile == false) { clicktripzid = "fdcd45ce-719a-43f4-a366-6c2c2ef84ca5"; }
                    var isOneWay = "True"
                    if (triptype == "2") { isOneWay = "False"; }
                }, 1000);
            }
        } catch (ex) { }
        return true;
    }
}
function tbscroll(id, id1) { try { $('html,body').animate({ scrollTop: $("#" + id).offset().top - 50 }, 'slow'); } catch (e) { } }
$('input[type="text"]').keydown(function () { $('.bottom-call-bar').css('bottom', '-70px'); }); function gettimelabel(seltime) {
    var returnTimeLabel = ""; if (seltime == "em") { returnTimeLabel = "Before 6am"; }
    else if (seltime == "m") { returnTimeLabel = "6am - 12pm"; }
    else if (seltime == "a") { returnTimeLabel = "12pm - 6pm"; }
    else if (seltime == "e") { returnTimeLabel = "After 6pm"; }
    return returnTimeLabel;
}
function parseJsonDate(jsonDateString) {
    try {
        sp = jsonDateString.split('-'); spcolan = jsonDateString.split(':'); if (sp.length >= 2) { return (sp[1]) + "-" + sp[2] + "-" + sp[0]; }
        else if (spcolan.length >= 2) { spcolan = jsonDateString.split('/'); return (spcolan[0]) + "-" + spcolan[1] + "-" + spcolan[2].split(' ')[0]; }
        else { date = new Date(parseInt(jsonDateString.replace('/Date(', ''))); return (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear(); }
    } catch (ex) {
        date = new Date()
        return (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear();
    }
}
function parseJsonDate_clickTripz(jsonDateString) {
    try {
        sp = jsonDateString.split('-'); spcolan = jsonDateString.split(':'); if (sp.length >= 2) { return (sp[1]) + "/" + sp[2] + "/" + sp[0]; }
        else if (spcolan.length >= 2) { spcolan = jsonDateString.split('/'); return (spcolan[0]) + "/" + spcolan[1] + "/" + spcolan[2].split(' ')[0]; }
        else { date = new Date(parseInt(jsonDateString.replace('/Date(', ''))); return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear(); }
    } catch (ex) {
        date = new Date()
        return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
    }
}