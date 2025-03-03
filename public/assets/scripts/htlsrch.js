var vrfyfrmsel = "";
var numberofMonthCal = 2;
var formData = "";
Rooms = [];
$(document).mouseup(function (e) {
    var roomdetails = $(".room-details");
    if (!roomdetails.is(e.target) && roomdetails.has(e.target).length === 0) {
        roomdetails.hide();
    }
});
$(document).ready(function () {
    var isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    if ($(window).width() <= 767) {
        numberofMonthCal = 1;
    }
    $("#htlsearch").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/us/hotelautocomplete",
                type: "POST",
                dataType: "json",
                data: { term: request.term },
                success: function (res) {
                    if (res == '' || res == '[]') {
                        var result = [
                            {
                                label: 'No match found',
                                value: 'No match found',
                                LocationType: '',
                            }
                        ];
                        response(result);
                    }
                    else {
                        var list = JSON.parse(res);
                        var result = list.CityLocation;
                        response($.map(result, function (data, id) {
                            return {
                                label: data.DisplayName,
                                value: data.ID,
                                LocationType: data.LocationType,
                            }
                        }));
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
                $('#LocationID').val(ui.item.value);
                $("#sameSearchhotel").text('');
            }
            return false;
        },
        position: {
            my: "left top-1",
            at: "left bottom",
            collision: "none"
        }
    }).autocomplete("instance")._renderItem = function (ul, item) {
        return $("<li>")
            .append("<div>" + item.label + "<i class='fa fa-" + item.LocationType + "'></i></div>")
            .appendTo(ul);
    };
    $("#fromhotelDateDisplay").datepicker({
        minDate: '+0',
        maxDate: '+11M',
        numberOfMonths: numberofMonthCal,
        dateFormat: 'M dd, yy',//'D mm/dd',
        altField: "#checkin",
        altFormat: "yy-mm-dd",
        changeMonth: false,
        changeYear: false,
        onClose: sethtlretval,
        onSelect: function (dateText, inst) {
            vrfyfrmsel = dateText;
            $("#fromDateIn").val(inst.selectedYear);//new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay, 0, 0, 0, 0)
        },
        beforeShowDay: function (date) {
            var startDate = $('#fromhotelDateDisplay').datepicker("getDate");
            var endDate = $('#tohotelDateDisplay').datepicker("getDate");
            var selClass = "";
            if (startDate && (date.getTime() == startDate.getTime())) {
                selClass = "start-date"
            } else if (endDate && (date.getTime() == endDate.getTime())) {
                selClass = "end-date";
            } else if ((startDate && endDate) && (startDate < date && date < endDate)) {
                selClass = "between-date";
            }
            return [true, selClass];
        },
        beforeShow: function (input, inst) {
            document.getElementById('selectpax').style.display = 'none';
            vrfyfrmsel = "";
            var calendar = inst.dpDiv;
            var setorgin = "htlsearch";
            if (isMobile) {
                setorgin = "fromhotelDateDisplay";
            }
            setTimeout(function () {
                calendar.position({
                    my: isMobile ? 'left top+5' : 'left top+15',
                    at: 'left bottom',
                    collision: 'none',
                    // of: "#" + setorgin
                });
            }, 1);
        }
    });
    $("#tohotelDateDisplay").datepicker({
        minDate: '+0',
        maxDate: '+11M',
        numberOfMonths: numberofMonthCal,
        dateFormat: 'M dd, yy',
        changeMonth: false,
        changeYear: false,
        altField: "#checkout",
        altFormat: "yy-mm-dd",
        onSelect: function (dateText, inst) {
            $("#toDateIn").val(inst.selectedYear);
        },
        beforeShowDay: function (date) {
            var startDate = $('#fromhotelDateDisplay').datepicker("getDate");
            var endDate = new Date($('#checkout').val());
            var selClass = "";
            if (startDate && (date.getTime() == startDate.getTime())) {
                selClass = "start-date"
            } else if (endDate && (date.getTime() == endDate.getTime())) {
                selClass = "end-date";
            } else if ((startDate && endDate) && (startDate < date && date < endDate)) {
                selClass = "between-date";
            }
            return [true, selClass];
        },
        beforeShow: function (input, inst) {
            document.getElementById('selectpax').style.display = 'none';
            vrfyfrmsel = "";
            var calendar = inst.dpDiv;
            var setorgin = "htlsearch";
            if (isMobile) {
                setorgin = "fromhotelDateDisplay";
            }
            setTimeout(function () {
                calendar.position({
                    my: isMobile ? 'left top+5' : 'left top+15',
                    at: 'left bottom',
                    collision: 'none',
                    // of: "#" + setorgin
                });
            }, 1);
            var b = new Date();
            var c = new Date(b.getFullYear(), b.getMonth(), b.getDate());
            if ($('#fromhotelDateDisplay').datepicker('getDate') != null) {
                c = $('#fromhotelDateDisplay').datepicker('getDate');
            }
            var d = new Date(c);
            d.setDate(d.getDate() + 30);

            return {
                minDate: c = new Date(c.getFullYear(), c.getMonth(), (c.getDate() + 1)),
                maxDate: d = new Date(d.getFullYear(), d.getMonth(), d.getDate())
            }
        },
        onClose: chkoutch
    });
    $("#fromhotelDateDisplay,#tohotelDateDisplay").datepicker("option", "position",
        { of: "#fromhotelDateDisplay", my: "right top+62", at: "right top" });
    $("#htlsearch").focus(function (f) { document.getElementById('selectpax').style.display = 'none'; });
});

function sethtlretval(a) {
    var b = new Date();
    var c = new Date(b.getFullYear(), b.getMonth(), b.getDate());
    if ($('#fromhotelDateDisplay').datepicker('getDate') != null) {
        c = $('#fromhotelDateDisplay').datepicker('getDate');
        $('#checkin').val(c.getFullYear() + "-" + (c.getMonth() + 1) + "-" + c.getDate());
    }
    if ($('#tohotelDateDisplay').datepicker('getDate') < $('#fromhotelDateDisplay').datepicker('getDate')) {
        c = new Date(c.getFullYear(), c.getMonth(), c.getDate() + 3);
        $('#tohotelDateDisplay').datepicker("setDate", new Date(c));
        $('#checkout').val(c.getFullYear() + "-" + (c.getMonth() + 1) + "-" + c.getDate());
    }
    if (vrfyfrmsel != "") {
        $("#tohotelDateDisplay").datepicker("show");
    }
}
function setretmin(a) {
    var b = new Date();
    var c = new Date(b.getFullYear(), b.getMonth(), b.getDate());
    if (a.id == 'tohotelDateDisplay') {
        if ($('#fromhotelDateDisplay').datepicker('getDate') != null) {
            c = $('#fromhotelDateDisplay').datepicker('getDate');
        }
    }
    return { minDate: c = new Date(c.getFullYear(), c.getMonth(), c.getDate() + 1) }
}
function chkin(a) {
    var b = new Date();
    var c = new Date(b.getFullYear(), b.getMonth(), b.getDate());
    if ($('#fromhotelDateDisplay').datepicker('getDate') != null) {
        var c = $('#fromhotelDateDisplay').datepicker('getDate');
        $('#checkin').val(c.getFullYear() + "-" + (c.getMonth() + 1) + "-" + c.getDate());
    }
    if ($('#tohotelDateDisplay').datepicker('getDate') < $('#fromhotelDateDisplay').datepicker('getDate')) {
        c = new Date(c.getFullYear(), c.getMonth(), c.getDate() + 3);
        $('#tohotelDateDisplay').datepicker("setDate", new Date(c));
        $('#checkout').val(c.getFullYear() + "-" + (c.getMonth() + 1) + "-" + c.getDate());
    }
}
function chkout(a) {
    var b = new Date();
    var c = new Date(b.getFullYear(), b.getMonth(), b.getDate());
    if (a.id == 'tohotelDateDisplay') {
        if ($('#fromhotelDateDisplay').datepicker('getDate') != null) {
            c = $('#fromhotelDateDisplay').datepicker('getDate');
        }
    }
    return { minDate: c = new Date(c.getFullYear(), c.getMonth(), c.getDate() + 1) }
}
function chkoutch(a) {
    c = $('#tohotelDateDisplay').datepicker('getDate');
    $('#tohotelDateDisplay').datepicker("setDate", new Date(c));
    $('#checkout').val(c.getFullYear() + "-" + (c.getMonth() + 1) + "-" + c.getDate());
}

function addChildage(roomVal, childVal) {
    var innerTable = "<span class='age drop-errow open' id='room" + roomVal + "child" + childVal + "'><label>Child " + childVal + " age</label>"
        + "<select id='rooms" + roomVal + "-children" + childVal + "-age' onchange='countGuest();'>"
        + "<option value='1'>1</option><option value='2'>2</option><option value='3'>3</option>"
        + "<option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option>"
        + "<option value='8'>8</option><option value='9'>9</option><option value='10'>10</option><option value='11'>11</option>"
        + "<option value='12'>12</option><option value='13'>13</option><option value='14'>14</option><option value='15'>15</option>"
        + "<option value='16'>16</option><option value='17'>17</option></select></span>";
    return innerTable;
}
function addroom() {
    var room = $('#roomCount').val();
    if (parseInt(room) < 5) {
        room = parseInt(room) + 1
        $('#roomCount').val(room);
        $('.removerroom').show();
        room == 5 ? $('.another-btn').hide() : $('.another-btn').show();
        var innerRoomHtml = " <div class='row' id='rmhtml" + room + "'>" +
            "<div class='col-sm-4'>" +
            "<div class='roomadd'>" +
            " <div class='room-name'>Room " + room + "</div>" +
            " <div class='add-guest'>" +
            "      <span>" +
            " <a href='javascript:void(0);'  id='subadultCount" + room + "' onclick='removeadultpax(" + room + ");'><i class='fa fa-minus'></i></a>" +
            "  <b class='value' id='adultCount" + room + "'> 1 </b>" +
            " <a href='javascript:void(0);' id='addadultCount" + room + "' onclick='addadultpax(" + room + ");'><i class='fa fa-plus'></i></a>" +
            "      </span>" +
            "      Adult" +
            "  </div>" +
            "  <div class='add-guest'>" +
            "      <span>" +
            "  <a href='javascript:void(0);' id='subChildCount" + room + "' onclick='removeaChildPax(" + room + ");'><i class='fa fa-minus'></i></a>" +
            "                               <b class='value' id='ChildCount" + room + "'>0</b>" +
            "                               <a href='javascript:void(0);'  id='addChildCount" + room + "' onclick='addChildpax(" + room + ");'><i class='fa fa-plus'></i></a>" +

            "      </span>" +
            "      Child <small>(0-17)</small>" +
            "  </div>" +
            " </div>" +
            "</div> " +
            " <div class='col-sm-8'>" +
            "<div class='select-age'>" +
            " <div class='childdiv_" + room + "'> " +
            "</div>" +
            " </div>" +
            " </div>" +
            " <div class='sec-devider'></div>" +
            "</div>";
        $("#nextdiv").append(innerRoomHtml);
        countGuest();
    }
    else { $('.another-btn').hide() }
}
function removeroom() {
    var room = $('#roomCount').val();
    if (parseInt(room) > 1) {
        var removeRoom = "rmhtml" + room;
        $("#nextdiv").find("#" + removeRoom).remove();
        room = parseInt(room) - 1
        $('#roomCount').val(room);
        $('.another-btn').show();
        countGuest();
    }
    if (parseInt(room) == 1) {
        $('.removerroom').hide();
    }
}
function incementpax(n, idp) {
    rmtotal = parseInt($("#" + idp + n).text());
    if (rmtotal < 5) {
        rmtotal = rmtotal + 1;
        $("#" + idp + n).text(rmtotal);
        countGuest();
    }
}
function addadultpax(id) {
    rmtotal = parseInt($("#adultCount" + id).text());
    var chd = parseInt($("#ChildCount" + id).text());
    if ((rmtotal + chd) < 7) {
        if (rmtotal < 5) {
            rmtotal = rmtotal + 1;
            $("#adultCount" + id).text(rmtotal);
            countGuest();
        }
    }

}
function removeadultpax(id) {
    rmtotal = parseInt($("#adultCount" + id).text());
    if (rmtotal > 1) {
        rmtotal = rmtotal - 1;
        $("#adultCount" + id).text(rmtotal);
        countGuest();
    }
}
function addChildpax(id) {
    var adt = parseInt($("#adultCount" + id).text());
    rmtotal = parseInt($("#ChildCount" + id).text());
    if ((rmtotal + adt) < 7) {
        if (rmtotal < 3) {
            rmtotal = rmtotal + 1;
            $("#ChildCount" + id).text(rmtotal);
            $(".childdiv_" + id).append(addChildage(id, rmtotal));
            countGuest();
        }
    }
}
function removeaChildPax(id) {
    rmtotal = parseInt($("#ChildCount" + id).text());
    if (rmtotal > 0) {
        $(".childdiv_" + id).find("#room" + id + "child" + rmtotal).remove();
        rmtotal = rmtotal - 1;
        $("#ChildCount" + id).text(rmtotal);
        countGuest();
    }
}
function countGuest() {
    var room = $('#roomCount').val();
    var adultVal = 0;
    var childVal = 0;
    Rooms = [];
    for (var int = 1; int <= room; int++) {
        adultVal = Number(adultVal) + Number($("#adultCount" + int + "").text().trim());
        childVal = Number(childVal) + Number($("#ChildCount" + int + "").text().trim());
        srr = [];
        for (var j = 1; j <= parseInt($("#ChildCount" + int + "").text()); j++) {
            srr.push(parseInt($("#rooms" + int + "-children" + j + "-age").val()));
        }
        Rooms.push({
            Adults: parseInt($("#adultCount" + int + "").text()),
            Children: srr == null ? [] : srr,
        });
    }
    var displayTex = '';
    if (room == 1) {
        displayText = room + " Room, ";
    }
    else { displayText = room + " Rooms, "; }
    if (adultVal == 1) { displayText = displayText + adultVal + " Adult "; }
    else { displayText = displayText + adultVal + " Adults "; }

    if (childVal == 0) {
        //displayText = room + " Room(s) " + adultVal + " Adult(s) ";
    }
    else {
        if (childVal == 1) {
            displayText = displayText + ", " + childVal + " Child";
        }
        else {
            displayText = displayText + ", " + childVal + " Childs";
        }
    }
    $("#roomGuest").val(displayText);
    $("#roomData").val(JSON.stringify(Rooms));
}
function Doneroom() {
    document.getElementsByClassName('room-details')[0].style.display = 'none';
}
function checkurlhtl() {
    if ($("#htlsearch").val() == undefined || $("#htlsearch").val() == "" || $("#htlsearch").val() == undefined || $("#htlsearch").val() == "") {
        $("#sameSearchhotel").text('');
        $("#sameSearchhotel").text("Please Enter Destination City.");
        $("#htlsearch").addClass('input-validation-error');
        return false;
    }
    return true;
}
function showhtladvance() {
    $(".lessoptions").slideToggle();
}
function showhtlmoreRoom() {
    if ($('#htlselectpax').css('display') == 'block') {
        $('#htlselectpax').css('display', 'none');
    }
    else {
        $('#htlselectpax').css('display', 'block');
    }
}








