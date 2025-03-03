var user_Email = '';
var user_Token = '';
var Usekey = '';
var UserID = '';
var AddressId = '';
var AddressId_Bill = '';
var bill_tab = 0;
var Fname = '';
var Lname = '';
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthNames_sort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var SID = $("#SID").val();
var GID = $("#GID").val();
var FbID = $("#FbID").val();
var local = $("#local").val();
var sessiondate;
var ipuser = "";
var websiteurl = "";
var devicename = "D";

$(document).ready(function() {

    if ($("#loginpg").val() == "2") {

        $("#dobdiv").click(function() {
            $("#user_dobid").datepicker("show");
        });

        $(".removeAll").removeClass("active");
        if ($('#pageurl').val() == "NA") {
            logout();
        } else if ($("#pageurl").val() == "mytrip") {
            $(".mytrip").addClass('active');
            $("#mytrip").show();
        } else if ($("#pageurl").val() == "myinformation") {
            $(".myinformation").addClass('active');
            $("#myinformation").show();
        } else if ($("#pageurl").val() == "offers") {
            $(".offers").addClass('active');
            $("#offers").show();
        } else if ($("#pageurl").val() == "settings") {
            $(".settings").addClass('active');
            $("#settings").show();
        } else if ($("#pageurl").val() == "writeus") {
            $(".writeus").addClass('active');
            $("#writeus").show();
        }

        $(".textOnly").keyup(function() {
            if (this.value != this.value.replace(/[^a-zA-Z ]+/g, "")) {
                this.value = this.value.replace(/[^a-zA-Z ]+/g, "");
            }
        });

        $(".numbersOnly").keyup(function() {
            if (this.value != this.value.replace(/[^0-9\.]/g, "")) {
                this.value = this.value.replace(/[^0-9\.]/g, "");
            }
        });

        $("#user_firstname,#user_lastname,#user_dobirth, #user_genderid, #user_billcountry, #user_country").focusout(function() {

            var input = $(this);
            var is_name = input.val();
            var error_element = $("div", input.parent());
            if (is_name && is_name.trim().length > 0) {
                input.removeClass("invalid").addClass("valid");
                error_element.removeClass("error").addClass("error_text");
            } else {
                input.removeClass("valid").addClass("invalid");
                error_element.removeClass("error_text").addClass("error");
            }
        });


        $("#user_oldpin,#user_newpin,#user_confirmpin").focusout(function() {
            var input = $(this);
            var is_name = input.val();
            var error_element = $("div", input.parent());
            if (is_name && is_name.trim().length > 0) {
                input.removeClass("invalid").addClass("valid");
                error_element.removeClass("error").addClass("error_text");

                if (is_name.length < 4) {
                    input.removeClass("valid").addClass("invalid");
                    error_element.removeClass("error_text").addClass("error");
                    error_element.html("Minimum 4 length required")
                }
            } else {
                input.removeClass("valid").addClass("invalid");
                error_element.removeClass("error_text").addClass("error");
            }


        });

        $("#user_fname,#user_Laname,#user_dobid").focusout(function() {
            var input = $(this);

            var is_name = input.val();
            var error_element = $("div", input.parent());
            if (is_name && is_name.trim().length > 0) {
                input.removeClass("invalid").addClass("valid");
                error_element.removeClass("error").addClass("error_text");
            } else {
                input.removeClass("valid").addClass("invalid");
                error_element.removeClass("error_text").addClass("error");
            }

        });
        $("#user_nationality,#user_genderpopup").on('change', function() {
            var input = $(this);
            var is_name = input.val();
            var error_element = $("div", input.parent());
            if (is_name && is_name.trim().length > 0) {
                input.removeClass("invalid").addClass("valid");
                error_element.removeClass("error").addClass("error_text");
            } else {
                input.removeClass("valid").addClass("invalid");
                error_element.removeClass("error_text").addClass("error");
            }

        });

        $("#user_category,#user_feedback").focusout(function() {
            var input = $(this);
            var is_name = input.val();
            var error_element = $("div", input.parent());
            if (is_name && is_name.trim().length > 0) {
                input.removeClass("invalid").addClass("valid");
                error_element.removeClass("error").addClass("error_text");
            } else {
                input.removeClass("valid").addClass("invalid");
                error_element.removeClass("error_text").addClass("error");
            }
        });
        $(".signpg").hide();
        $(".loginpg").show();

        $(".signout").click(function() {
            logout();
        });

        chk_exst_login();
        $('.tabContent').hide();
        $('.tabContent:first').show();
        $('#tabs li a').click(function() {
            var tid = $(this).attr('id');
            if (tid == "tab2") {

                GetbillingDetails(user_Token, Usekey);

            }

            if (tid == "tab1") {

                Getuserprofile(user_Token, Usekey);
                Getusercontact_details(user_Token, Usekey);


            }

            if (tid == "tab4") {

                GetTraveler(user_Token, Usekey);

            }
            $('.tabContent').hide();
            $('#' + tid + 'C').fadeIn('slow');
            $('.myinfo').removeClass('active');
            $(this).addClass('active');
        });


        $(".login").click(function(event) {
            event.stopPropagation();
            $(".loginMenu").toggle();
        });
        $(document).on("click", function() {
            $(".loginMenu").hide();
        });

        $("#user_category").change(function() {
            var value = $("#user_category").val().toLowerCase();
            if (value == "feedback") {
                $(".experience").show();
            } else {
                $(".experience").hide();

            }

        });

        $("#contactadd").click(function(event) {

            GetbillingDetails_conatct(user_Token, Usekey);

        });

        $("#newadd").click(function(event) {

            $("#user_billcountry").val("");
            $("#user_billaddressline1").val("");
            $("#billaddressline2").val("");
            $("#user_billcity").val("");
            $("#billstate").val("");
            $("#statecode_bill").val("");
            $("#billzip").val("");
            $("#user_billphone").val("");


        });
        $("#user_country").change(function() {
            var value = $("#user_country").val();
            if (value == "US") {


                $("#state").hide();
                $(".statedrop").show();

            } else {
                $("#state").show();
                $(".statedrop").hide();
            }

        });



        $("#user_billcountry").change(function() {
            var value = $("#user_billcountry").val();
            if (value == "US") {


                $("#billstate").hide();
                $(".statedrop_bill").show();

            } else {
                $("#billstate").show();
                $(".statedrop_bill").hide();
            }

        });



        autocompleteFun();

        datepickerFun();
    }

    GetuserIp();

});



function getAge(DOB) {
    var today = new Date();
    var birthDate = new Date(DOB);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function showdiv(id, id1) {
    if (id == "billing_infoform") {

        if ($("#billdtl").val() == "false") {
            $("#newadd").prop("checked", true);
            $("#contactadd").prop("checked", false);
            $(".radiobtn").show();
        }



    }
    $("#" + id).slideDown('slow'); //fadein
    $("#" + id1).slideUp('slow'); //fadeout
    $("." + id).hide();
}

function hidediv(id, id2) {

    $("#" + id).slideUp('slow'); //fadeout
    $("#" + id2).slideDown('slow'); //fadein
    $("." + id).show();
}

function Getuserprofile(token, _userkey) {

    var _request = "";
    _request = {
        Token: token,
        UserKey: _userkey
    };
    let encoded = window.btoa(JSON.stringify(_request));

    $.ajax({
        type: "POST",
        url: "" + local + "/profile/personalinfo",
        data: {
            customerID: encoded
        },
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function(data) {
            try {

                var data_ = atob(data);
                var obj = JSON.parse(data_);

                if (obj.Error == null) {

                    if (obj.UserID) {
                        UserID = obj.UserID;
                    }

                    if (obj.UserKey) {
                        Usekey = obj.UserKey;
                    }
                    if (obj.Gender == "1") {
                        $("#gen").html("Male");
                    } else if (obj.Gender == "2") {
                        $("#gen").html("Female");
                    } else {
                        $("#gen").html("-");
                    }

                    if (obj.HomeAirport) {
                        $("#airp").html(obj.HomeAirport);
                    } else {
                        $("#airp").html("-");
                    }
                    if (obj.TSARedress) {
                        $("#tsa").html(obj.TSARedress);
                    } else {
                        $("#tsa").html("-");
                    }

                    $("#user_firstname").val(obj.FirstName);
                    $("#middlename").val(obj.MiddleName);
                    $("#user_lastname").val(obj.LastName);
                    if (obj.Gender) {

                        $(".displayusername_2").html(touperfirstletter(obj.FirstName) + " " + touperfirstletter(obj.LastName));
                        $(".displayusername").html("Welcome " + touperfirstletter(obj.FirstName));
                        $("#user_name").html(touperfirstletter(obj.FirstName) + " " + touperfirstletter(obj.LastName));

                        if (obj.DateOfBirth) {
                            var dob = new Date(obj.DateOfBirth);
                            $("#dob").html(monthNames[dob.getMonth()] + " " + dob.getDate() + ", " + +dob.getFullYear());
                            $("#user_dobirth").val(monthNames[dob.getMonth()] + " " + dob.getDate() + ", " + +dob.getFullYear());
                        } else {
                            $("#dob").html("-");
                        }

                    }
                    $("#user_genderid").val(obj.Gender);
                    $("#airport_name").val(obj.HomeAirport);
                    $("#tsa_name").val(obj.TSARedress);

                } else {
                    sign_out_data();
                }

            } catch (err) {


                sign_out_data();
                console.log("Something went wrong" + err.message);
            }


        },
        error: function(jqXHR, textStatus, errorThrown) {
            sign_out_data();
        },
    });
}

function Getusercontact_details(token, userkey) {

    var _request = "";
    _request = {
        Token: token,
        UserKey: userkey
    };
    let encoded = window.btoa(JSON.stringify(_request));
    $.ajax({
        type: "POST",
        url: "" + local + "/profile/conatctinfo",
        data: {
            customerID: encoded
        },
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function(data) {
            try {

                var data_ = atob(data);
                var obj = JSON.parse(data_);
                if (obj.UserKey != "") {
                    if (obj.AddressId) {
                        AddressId = obj.AddressId;
                    }


                    if (obj.Address1) {
                        $("#add1").html(obj.Address1);
                        $("#user_addressline1").val(obj.Address1);

                    } else {
                        $("#add1").html("-");
                    }

                    if (obj.Address2) {
                        $("#add2").html(obj.Address2);
                        $("#addressline2").val(obj.Address2);
                    } else {
                        $("#add2").html("-");
                    }

                    if (obj.CityName) {
                        $("#user_city").val(obj.CityName);
                        $("#ct").html(obj.CityName);
                    } else {
                        $("#ct").html("-");
                    }
                    if (obj.StateCode) {

                        $("#statecode").val(obj.StateCode);
                        $(".statedrop").show();
                        $("#state").hide();
                    }


                    if (obj.StateName) {

                        $("#state").val(obj.StateName);
                        $("#st").html(obj.StateName);
                    } else {
                        $("#st").html("-");
                    }
                    if (obj.ZipCode) {
                        $("#user_zip").val(obj.ZipCode);
                        $("#czip").html(obj.ZipCode);
                    } else {
                        $("#czip").html("-");
                    }

                    if (obj.CountryName) {
                        $("#user_country").val(obj.CountryCode);

                        if (obj.CountryCode == "US") {
                            $(".statedrop").show();
                            $("#state").hide();
                        }

                        $("#cntry").html(obj.CountryName);
                    }

                    if (obj.Phone) {
                        $("#user_phone").val(obj.Phone);
                        $("#ccontact").html(obj.Phone);
                    } else {
                        $("#ccontact").html("-");
                    }
                    if (obj.Mobile) {
                        $("#mobile").val(obj.Mobile);
                        $("#cmobile").html(obj.Mobile);
                    } else {
                        $("#cmobile").html("-");
                    }
                } else {

                }



            } catch (err) {

                console.log("Something went wrong" + err.message);
                sign_out_data();
            }


        },
        error: function(jqXHR, textStatus, errorThrown) {

        },
    });
}

function GetbillingDetails(token, userkey) {

    var _request = "";
    _request = {
        Token: token,
        UserKey: userkey
    };
    let encoded = window.btoa(JSON.stringify(_request));

    $.ajax({
        type: "POST",
        url: "" + local + "/profile/getbilling_info",
        data: {
            customerID: encoded
        },
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function(data) {
            try {

                var data_ = atob(data);
                var obj = JSON.parse(data_);

                if (obj.Error == null && obj.BillingAddress != null) {
                    $("#billdtl").val("true");
                    AddressId_Bill = obj.BillingAddress[0].AddressId;


                    if (obj.BillingAddress[0].Address1) {
                        $("#bill_add1").html(obj.BillingAddress[0].Address1);
                        $("#user_billaddressline1").val(obj.BillingAddress[0].Address1);

                    } else {
                        $("#bill_add1").html("-");
                    }

                    if (obj.BillingAddress[0].Address2) {
                        $("#bill_add2").html(obj.BillingAddress[0].Address2);
                        $("#billaddressline2").val(obj.BillingAddress[0].Address2);
                    } else {
                        $("#bill_add2").html("-");
                    }

                    if (obj.BillingAddress[0].CityName) {
                        $("#user_billcity").val(obj.BillingAddress[0].CityName);
                        $("#bill_ct").html(obj.BillingAddress[0].CityName);
                    } else {
                        $("#user_billcity").html("-");
                    }

                    if (obj.BillingAddress[0].StateCode) {

                        $("#statecode_bill").val(obj.BillingAddress[0].StateCode);
                        $(".statedrop_bill").show();
                        $("#billstate").hide();
                    }


                    if (obj.BillingAddress[0].StateName) {
                        $("#billstate").val(obj.BillingAddress[0].StateName);
                        $("#bill_st").html(obj.BillingAddress[0].StateName);
                    } else {
                        $("#bill_st").html("-");
                    }


                    if (obj.BillingAddress[0].ZipCode) {
                        $("#user_billzip").val(obj.BillingAddress[0].ZipCode);
                        $("#bill_czip").html(obj.BillingAddress[0].ZipCode);
                    } else {
                        $("#bill_czip").html("-");
                    }

                    if (obj.BillingAddress[0].CountryName) {


                        if (obj.BillingAddress[0].CountryCode == "US") {
                            $(".statedrop_bill").show();
                            $("#billstate").hide();
                        }
                        $("#user_billcountry").val(obj.BillingAddress[0].CountryCode);
                        $("#bill_cntry").html(obj.BillingAddress[0].CountryName);
                    }

                    if (obj.BillingAddress[0].Phone) {
                        $("#user_billphone").val(obj.BillingAddress[0].Phone);
                        $("#bill_ccontact").html(obj.BillingAddress[0].Phone);
                    } else {
                        $("#bill_ccontact").html("-");
                    }

                } else {

                }



            } catch (err) {
                console.log("Something went wrong" + err.message);
                sign_out_data();
            }


        },
        error: function(jqXHR, textStatus, errorThrown) {

        },
    });
}

function GetbillingDetails_conatct(token, userkey) {

    var _request = "";
    _request = {
        Token: token,
        UserKey: userkey
    };
    let encoded = window.btoa(JSON.stringify(_request));
    $.ajax({
        type: "POST",
        url: "" + local + "/profile/conatctinfo",
        data: {
            customerID: encoded
        },
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function(data) {
            try {

                var data_ = atob(data);
                var obj = JSON.parse(data_);
                if (obj.UserKey != "") {

                    if (obj.Address1) {
                        $("#user_billaddressline1").val(obj.Address1);
                    }

                    if (obj.Address2) {

                        $("#billaddressline2").val(obj.Address2);
                    }


                    if (obj.CityName) {
                        $("#user_billcity").val(obj.CityName);

                    }

                    if (obj.StateCode) {

                        $("#statecode_bill").val(obj.StateCode);
                        $(".statedrop_bill").show();
                        $("#billstate").hide();
                    }


                    if (obj.StateName) {

                        $("#billstate").val(obj.StateName);

                    }

                    if (obj.ZipCode) {
                        $("#user_billzip").val(obj.ZipCode);

                    }

                    if (obj.CountryName) {
                        $("#user_billcountry").val(obj.CountryCode);
                        if (obj.CountryCode == "US") {
                            $(".statedrop_bill").show();
                            $("#billstate").hide();
                        }

                    }

                    if (obj.Phone) {
                        $("#user_billphone").val(obj.Phone);

                    }


                } else {

                }



            } catch (err) {


                console.log("Something went wrong" + err.message);
                sign_out_data();
            }


        },
        error: function(jqXHR, textStatus, errorThrown) {

        },
    });
}

function GetTraveler(token, userkey) {

    var _request = "";
    _request = {
        Token: token,
        UserKey: userkey
    };
    var encoded = window.btoa(JSON.stringify(_request));
    var divhtml = "";

    $.ajax({
        type: "POST",
        url: "" + local + "/profile/gettravelerlist",
        data: {
            customerID: encoded
        },
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function(dta) {
            try {

                var data_ = atob(dta);
                var obj = JSON.parse(data_);

                if (obj.Error == null && obj.TravellerInfo != null) {
                    var k = 0;

                    $.each(obj.TravellerInfo, function(i) {
                        k++;
                        var dob = new Date(obj.TravellerInfo[i].DateOfBirth);

                        divhtml += '<div class="col-sm-6">';
                        divhtml += '<div class="traveller_block">';
                        divhtml += '<p>';
                        divhtml += '<input type="hidden" id="paxIndex' + k + '" value=' + obj.TravellerInfo[i].TravellerIndex + ' >';
                        divhtml += '<input type="hidden" id="fname' + k + '" value=' + obj.TravellerInfo[i].FirstName + ' >';
                        divhtml += '<input type="hidden" id="mname' + k + '" value=' + obj.TravellerInfo[i].MiddleName + ' >';
                        divhtml += '<input type="hidden" id="lname' + k + '" value=' + obj.TravellerInfo[i].LastName + ' >';
                        divhtml += '<input type="hidden" id="gender' + k + '" value=' + obj.TravellerInfo[i].Gender + ' >';
                        divhtml += '<input type="hidden" id="dob' + k + '" value="' + monthNames[dob.getMonth()] + " " + dob.getDate() + ", " + +dob.getFullYear() + '" >';
                        divhtml += '<input type="hidden" id="nalt' + k + '" value=' + obj.TravellerInfo[i].Nationality + ' >';
                        if (obj.TravellerInfo[i].MiddleName) {
                            divhtml += '<strong>' + touperfirstletter(obj.TravellerInfo[i].FirstName) + " " + touperfirstletter(obj.TravellerInfo[i].MiddleName) + " " + touperfirstletter(obj.TravellerInfo[i].LastName) + '</strong></p>';
                        } else {
                            divhtml += '<strong>' + touperfirstletter(obj.TravellerInfo[i].FirstName) + " " + touperfirstletter(obj.TravellerInfo[i].LastName) + '</strong></p>';
                        }
                        divhtml += '<ul class="content_detail">';

                        var Gender = "";



                        if (obj.TravellerInfo[i].Gender == 1) {
                            Gender = "Male";
                        } else if (obj.TravellerInfo[i].Gender == 2) {
                            Gender = "Female";
                        }
                        divhtml += '<li><span class="label">Gender :</span>' + Gender + '</li>';

                        divhtml += '<li><span class="label">Date Of Birth :</span>' + monthNames[dob.getMonth()] + " " + dob.getDate() + ", " + +dob.getFullYear() + '</li>';
                        divhtml += '<li><span class="label">Nationality :</span>' + obj.TravellerInfo[i].Nationality + '</li>';
                        divhtml += '</ul>';
                        divhtml += '<div class="actionBtn"><a onclick="openmodel(' + k + ')">Edit</a><span class="sep">|</span><a class="delete" onclick="openmodel_del(' + k + ')">Delete</a></div>';
                        divhtml += ' </div>';
                        divhtml += '</div>';


                    });

                    $("#traveler_htm").html(divhtml);



                } else {
                    $("#traveler_htm").html(divhtml);
                }



            } catch (err) {
                console.log("Something went wrong" + err.message);
                sign_out_data();
            }


        },
        error: function(jqXHR, textStatus, errorThrown) {

        },
    });
}

function chk_exst_login() {
    if (typeof Storage != "undefined") {
        try {
            if (localStorage.getItem("currentUser") != null) {
                var user_data = null;
                try {
                    user_data = localStorage.getItem("currentUser");
                } catch (e) {

                }
                var obj_session = JSON.parse(user_data);
                if (obj_session != null && obj_session.user.ProfileInfo != null) {

                    var d = new Date();
                    sessiondate = obj_session.user.ExpiryDate;
                    var totaltime = diff_minutes(obj_session.user.ExpiryDate, d);
                    if (totaltime > 1) {

                        ////sign_in_data();
                        $("#goo_signin").val("Yes");
                        //user_Email = obj_session.user.ProfileInfo.Email;
                        var ts = new Date(obj_session.user.ProfileInfo.LastLoginDate);
                        var times = monthNames_sort[ts.getMonth()] + " " + ts.getDate() + ", " + +ts.getFullYear() + ", " + ts.toLocaleTimeString();
                        $(".LastLoginDate").html(times);
                        $(".changeColor").html(obj_session.user.ProfileInfo.FirstName.charAt(0).toUpperCase() + "" + obj_session.user.ProfileInfo.LastName.charAt(0).toUpperCase());

                        $(".displayusername_2").html(touperfirstletter(obj_session.user.ProfileInfo.FirstName) + " " + touperfirstletter(obj_session.user.ProfileInfo.LastName));
                        $(".displayusername").html("Welcome " + touperfirstletter(obj_session.user.ProfileInfo.FirstName));
                        $("#user_name").html(touperfirstletter(obj_session.user.ProfileInfo.FirstName) + " " + touperfirstletter(obj_session.user.ProfileInfo.LastName));
                        user_Email = obj_session.user.ProfileInfo.Email;
                        user_Token = obj_session.token;
                        Usekey = obj_session.user.ProfileInfo.UserKey;
                        $("#cemail").html(user_Email);

                        if (obj_session.user.ProfileInfo.socailmedia == true) {
                            $("a.setting").parent().hide();
                        } else {
                            $("a.setting").parent().show();
                        }
                        if ($("#pageurl").val() == "mytrip") {
                            bookinghistory(obj_session.user.ProfileInfo.Email, 1, obj_session.token)
                        } else if ($("#pageurl").val() == "myinformation") {
                            Getuserprofile(obj_session.token, obj_session.user.ProfileInfo.UserKey);
                            Getusercontact_details(obj_session.token, obj_session.user.ProfileInfo.UserKey);
                        }


                    } else {
                        sign_out_data();

                    }

                } else {


                    sign_out_data();
                    $("#goo_signin").val("No");
                }
            } else {

                sign_out_data();
            }
        } catch (err) {
            console.log("Something went wrong" + err.message);
            $("#goo_signin").val("No");
            sign_out_data();
        }
    } else {
        sign_out_data();
        console.log("Sorry, your browser is outdated");
    }
}

function sign_out_data() {

    $(".displayusername").html("");
    if (typeof(Storage) != "undefined") {
        localStorage.removeItem('currentUser');
    }
    try {
        logout();
    } catch (e) {}

    /* window.location = "/profile";*/


}

function diff_minutes(dt2, dt1) {

    var diff = (new Date(dt2).getTime() - dt1.getTime()) / 60000;
    // diff = diff - 290;
    return diff;
}

/*logout*/
function logout() {
    try {
        var dats = JSON.parse(localStorage.getItem("currentUser"));

        if (dats != null) {
            request = {
                UserKey: dats.ProfileInfo.UserKey,
                Token: dats.Token
            };
            let encoded = window.btoa(JSON.stringify(request));
            try {
                $.ajax({
                    type: "POST",
                    url: "" + local + "/profile/updatelastlogin",
                    data: {
                        customerID: encoded
                    },
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',

                    success: function(data) {},
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown);
                    },
                });
            } catch (err) {}
        }
    } catch (e) {}

    try {
        localStorage.removeItem("currentUser");
        $(".displayusername").html("");

    } catch (e) {}

    try {
        facebookLogout();

    } catch (e) {}
    try {
        signOut();
    } catch (e) {}
    sessionStorage.removeItem("myUserEntity");



    if (SID == 6) {
        window.location = "/profile/sign-in";
    } else {
        window.location = "" + local + "/sign-in";
    }

}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        sessionStorage.removeItem("myUserEntity");
        auth2.disconnect();
    });
}

function openmodel(h) {

    if (h == "0") {
        $("#addbtn").show();
        $("#editbtn").hide();
        $("#user_fname").val("");
        $("#mname").val("");
        $("#user_Laname").val("");
        $("#user_dobid").val("");
        $("#user_genderpopup").val("");
        $("#user_nationality").val("");



        var input = $("#user_fname");
        var error_element = $("div", input.parent());
        input.removeClass("invalid").addClass("valid");
        error_element.removeClass("error").addClass("error_text");

        input = $("#user_Laname");
        error_element = $("div", input.parent());
        input.removeClass("invalid").addClass("valid");
        error_element.removeClass("error").addClass("error_text");

        input = $("#user_dobid");
        error_element = $("div", input.parent());
        input.removeClass("invalid").addClass("valid");
        error_element.removeClass("error").addClass("error_text");

        input = $("#user_genderpopup");
        error_element = $("div", input.parent());
        input.removeClass("invalid").addClass("valid");
        error_element.removeClass("error").addClass("error_text");
        input = $("#user_nationality");
        error_element = $("div", input.parent());
        input.removeClass("invalid").addClass("valid");
        error_element.removeClass("error").addClass("error_text");


        $("#paxindex_hidden").val("0");

    } else {
        $("#addbtn").hide();
        $("#editbtn").show();
        $("#user_fname").val($("#fname" + h).val());
        $("#mname").val($("#mname" + h).val());
        $("#user_Laname").val($("#lname" + h).val());
        $("#user_dobid").val($("#dob" + h).val());
        $("#user_genderpopup").val($("#gender" + h).val());
        $("#user_nationality").val($("#nalt" + h).val());
        $("#paxindex_hidden").val($("#paxIndex" + h).val());

    }
    $("#addModal").modal('show');

}

function openmodel_del(h) {
    $("#paxindex_hidden").val($("#paxIndex" + h).val());
    $("#delModal").modal('show');
}

function submitPersonal_details() {
    var form_data = $("#personal_Req").serializeArray();
    var error_free = true;

    for (var input in form_data) {

        if (input == 1 || input == 5 || input == 6) {

        } else {
            var element = $("#user_" + form_data[input]["name"]);

            var valid = element.hasClass("valid");
            var error_element = $("div", element.parent());

            if (element.val().trim().length == 0) {

                error_element.removeClass("error_text").addClass("error");
                error_free = false;
            } else {
                error_element.removeClass("error").addClass("error_text");
            }
        }
    }

    if (error_free) {
        var element = $("#user_dobirth");
        var error_element = $("div", element.parent());
        var enteredAge = getAge(element.val());
        if (enteredAge >= 12) {} else {
            error_free = false;
            error_element.removeClass("error_text").addClass("error").html("minimum age 12 year required for primary passenger.");
        }
    }
    if (!error_free) {
        event.preventDefault();
    } else {
        $(".button_loding_div").show();
        var oForm = document.forms["personal_Req"];

        var signupRequest = {
            FirstName: oForm.elements["firstname"].value,
            MiddleName: oForm.elements["middlename"].value,
            LastName: oForm.elements["lastname"].value,
            DateOfBirth: oForm.elements["dobirth"].value,
            Gender: $("#user_genderid option:selected").val(),
            HomeAirport: oForm.elements["airport_name"].value,
            TSARedress: oForm.elements["tsa_name"].value,
            Token: user_Token,
            UserKey: Usekey,
            UserID: UserID,
        };




        $.ajax({
            type: "POST",
            url: "" + local + "/profile/editpersonal",
            data: signupRequest,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function(data) {
                $(".button_loding_div").hide();

                try {
                    var obj = JSON.parse(data);
                    if (obj.Error == null) {
                        $("#dob").html(oForm.elements["dobirth"].value);
                        if ($("#user_genderid option:selected").val() == "1") {
                            $("#gen").html("Male");
                        } else if ($("#user_genderid option:selected").val() == "2") {
                            $("#gen").html("Female");
                        }
                        $("#airp").html(oForm.elements["airport_name"].value);
                        $("#tsa").html(oForm.elements["tsa_name"].value);

                        Getuserprofile(user_Token, Usekey);
                        hidediv('personal_infoform', 'personal_infoDetail')
                    } else {
                        $("#button_loding_div").hide();

                    }
                } catch (err) {
                    console.log("Something went wrong" + err.message);
                    sign_out_data();
                }

            },
            error: function(jqXHR, textStatus, errorThrown) {
                $(".button_loding_div").hide();

            },
        });
    }
}

function submitContact_details() {
    var form_data = $("#contactform_Req").serializeArray();
    var error_free = true;

    for (var input in form_data) {

        if (input == 1 || input == 5 || input == 6 || input == 8) {

        } else {
            var element = $("#user_" + form_data[input]["name"]);
            var valid = element.hasClass("valid");
            var error_element = $("div", element.parent());
            if (element.val().trim().length == 0) {

                error_element.removeClass("error_text").addClass("error");
                error_free = false;
            } else {
                error_element.removeClass("error").addClass("error_text");
            }
        }
    }

    if (!error_free) {
        event.preventDefault();
    } else {
        $(".button_loding_div").show();
        var oForm = document.forms["contactform_Req"];
        var StateName = "";

        if ($('.statedrop').is(":visible")) {

            StateName = $("#statecode option:selected").text();
            statecode = $("#statecode option:selected").val();
        } else {
            statecode = "";
            StateName = oForm.elements["state"].value;
        }
        if (StateName == "Select State") {
            StateName = "";
        }
        var contatRequest = {

            Address1: oForm.elements["addressline1"].value,
            Address2: oForm.elements["addressline2"].value,
            CityName: oForm.elements["city"].value,
            StateName: StateName,
            StateCode: statecode,
            CountryName: $("#user_country option:selected").text(),
            CountryCode: $("#user_country option:selected").val(),
            ZipCode: oForm.elements["zip"].value,
            Phone: oForm.elements["phone"].value,
            Mobile: oForm.elements["mobile"].value,
            UserKey: Usekey,
            AddressId: AddressId,
            Token: user_Token,
        };

        $.ajax({
            type: "POST",
            url: "" + local + "/profile/editcontact",
            data: contatRequest,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function(data) {
                $(".button_loding_div").hide();

                try {
                    var obj = JSON.parse(data);
                    if (obj.Error == null) {


                        Getusercontact_details(user_Token, Usekey);
                        hidediv('contact_infoform', 'contact_infoDetail')
                    } else {
                        $("#button_loding_div").hide();

                    }
                } catch (err) {
                    console.log("Something went wrong" + err.message);
                    sign_out_data();
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $(".button_loding_div").hide();

            },
        });
    }
}

function submitbilling_details() {

    var form_data = $("#billingform_Req").serializeArray();
    var error_free = true;

    for (var input in form_data) {

        if (input == 2 || input == 4 || input == 5) {

        } else {
            var element = $("#user_" + form_data[input]["name"]);
            var valid = element.hasClass("valid");
            var error_element = $("div", element.parent());
            if (element.val().length == 0) {

                error_element.removeClass("error_text").addClass("error");
                error_free = false;
            } else {
                error_element.removeClass("error").addClass("error_text");
            }
        }
    }

    if (!error_free) {
        event.preventDefault();
    } else {
        $(".button_loding_div").show();
        var oForm = document.forms["billingform_Req"];

        if ($('.statedrop_bill').is(":visible")) {

            StateName = $("#statecode_bill option:selected").text();
            statecode = $("#statecode_bill option:selected").val();
        } else {
            statecode = "";
            StateName = oForm.elements["billstate"].value;
        }
        if (StateName == "Select State") {
            StateName = "";
        }

        var contatRequest = {
            Address1: oForm.elements["billaddressline1"].value,
            Address2: oForm.elements["billaddressline2"].value,
            CityName: oForm.elements["billcity"].value,
            StateName: StateName,
            StateCode: statecode,
            CountryName: $("#user_billcountry option:selected").text(),
            CountryCode: $("#user_billcountry option:selected").val(),
            ZipCode: oForm.elements["billzip"].value,
            Phone: oForm.elements["billphone"].value,
            UserKey: Usekey,
            AddressId: AddressId_Bill,
            Token: user_Token,
        };

        $.ajax({
            type: "POST",
            url: "" + local + "/profile/editbilling",
            data: contatRequest,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function(data) {
                $(".button_loding_div").hide();

                try {
                    var obj = JSON.parse(data);
                    if (obj.Error == null) {

                        GetbillingDetails(user_Token, Usekey)
                        hidediv('billing_infoform', 'billing_infoDetail')
                    } else {
                        $("#button_loding_div").hide();

                    }
                } catch (err) {
                    console.log("Something went wrong" + err.message);
                    sign_out_data();
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $(".button_loding_div").hide();

            },
        });
    }
}

function submitPassenger_details() {
    var form_data = $("#addpax_Req").serializeArray();
    var error_free = true;

    for (var input in form_data) {

        if (input == 1) {

        } else {
            var element = $("#user_" + form_data[input]["name"]);
            var valid = element.hasClass("valid");
            var error_element = $("div", element.parent());
            if (element.val().length == 0) {

                error_element.removeClass("error_text").addClass("error");
                error_free = false;
            } else {
                error_element.removeClass("error").addClass("error_text");
            }
        }
    }


    var element = $("#user_Laname");
    var valid = element.hasClass("valid");
    var error_element = $("div", element.parent());
    if (element.val().length == 0) {

        error_element.removeClass("error_text").addClass("error");
        error_free = false;
    } else {
        error_element.removeClass("error").addClass("error_text");
    }

    if (!error_free) {
        event.preventDefault();
    } else {
        $(".button_loding_div").show();
        var oForm = document.forms["addpax_Req"];


        var contatRequest = {
            FirstName: oForm.elements["fname"].value,
            LastName: oForm.elements["Laname"].value,
            MiddleName: oForm.elements["mname"].value,
            Gender: $("#user_genderpopup option:selected").val(),
            DateOfBirth: $("#user_dobid").val(),
            Nationality: $("#user_nationality option:selected").val(),
            TravellerIndex: parseInt($("#paxindex_hidden").val()),
            UserKey: Usekey,
            Token: user_Token,
        };

        $.ajax({
            type: "POST",
            url: "" + local + "/profile/addtravellers",
            data: contatRequest,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function(data) {
                $(".button_loding_div").hide();

                try {
                    var obj = JSON.parse(data);
                    if (obj.Error == null) {

                        GetTraveler(user_Token, Usekey)
                        $("#addModal").modal('hide');

                    } else {
                        $("#button_loding_div").hide();

                    }
                } catch (err) {
                    console.log("Something went wrong" + err.message);
                    sign_out_data();
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $(".button_loding_div").hide();

            },
        });
    }
}

function DeletePassenger_details() {

    var error_free = true;
    if (!error_free) {
        event.preventDefault();
    }

    $(".button_loding_div").show();

    var contatRequest = {

        TravellerIndex: parseInt($("#paxindex_hidden").val()),
        Token: user_Token,
    };

    $.ajax({
        type: "POST",
        url: "" + local + "/profile/deltetravellers",
        data: contatRequest,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function(data) {
            $(".button_loding_div").hide();

            try {
                var obj = JSON.parse(data);
                if (obj.Error == null) {
                    GetTraveler(user_Token, Usekey)
                    $("#delModal").modal('hide');
                } else {
                    $("#button_loding_div").hide();

                }
            } catch (err) {
                console.log("Something went wrong" + err.message);
                sign_out_data();
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $(".button_loding_div").hide();

        },
    });

}

function booking_details(booktype) {
    $("#mybooking").html("");
    $(".ac").removeClass("active");
    if (booktype == "1") {

        $(".ac1").addClass("active");

        bookinghistory(user_Email, 1, user_Token);
    }
    if (booktype == "2") {
        $(".ac2").addClass("active");
        bookinghistory(user_Email, 2, user_Token);
    }
    if (booktype == "3") {
        $(".ac3").addClass("active");
        bookinghistory(user_Email, 3, user_Token);
    }
}

function profileModel(id, id1) {
    $("#" + id).fadeIn('slow');
    $("#" + id1).fadeOut('slow');
    $("body").addClass('model-open');
    if ($("#user_uid").val() != null) {
        $("#user_forgetid").val($("#user_uid").val());
        $("#user_forgetid").focus();
    }
}

function bookinghistory(email, booktype, token) {

    try {
        checktime();
        $('#loadingimg').show();
        var _request = "";
        _request = {
            Email: email,
            BookingType: booktype,
            Token: token
        };
        let encoded = window.btoa(JSON.stringify(_request));
        $.ajax({
            type: "POST",
            url: "" + local + "/profile/bookinghistory",
            data: {
                customerID: encoded
            },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            dataType: "html",
            success: function(data) {
                $('#loadingimg').hide();
                $('#mybooking').html(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $('#loadingimg').hide();
                sign_out_data();
            },
        });
    } catch (ex) {
        $('#loadingimg').hide();
    }

}

function submitReset() {
    $("#Messageloginsup_settings").hide();
    var form_data = $("#reset_Req").serializeArray();
    var error_free = true;
    for (var input in form_data) {
        var element = $("#user_" + form_data[input]["name"]);
        var valid = element.hasClass("valid");
        var error_element = $("div", element.parent());
        if (!valid || element.val().trim().length == 0) {
            error_element.removeClass("error_text").addClass("error");
            error_free = false;
        } else {
            error_element.removeClass("error").addClass("error_text");
        }
    }
    if (error_free) {
        var newpin = $("#user_newpin").val();
        var confirmpin = $("#user_confirmpin").val();
        var user_oldpin = $("#user_oldpin").val();


        if (newpin != confirmpin) {
            error_free = false;

            $("#Messageloginsup_settings").html("New Pin & Confirm Pin should Same");
            $("#Messageloginsup_settings").show();
            setTimeout(function() {
                $("#Messageloginsup_settings").css("display", "none");
            }, 10000);
            $("#user_oldpin").val("");
            $("#user_newpin").val("");
            $("#user_confirmpin").val("");

        } else if (newpin == $("#user_oldpin").val()) {
            error_free = false;

            $("#Messageloginsup_settings").html("Old Pin & New Pin should not be Same");
            $("#Messageloginsup_settings").show();
            setTimeout(function() {
                $("#Messageloginsup_settings").css("display", "none");
            }, 10000);
            $("#user_oldpin").val("");
            $("#user_newpin").val("");
            $("#user_confirmpin").val("");

        }
    }
    if (!error_free) {
        event.preventDefault();
    } else {
        $(".button_loding_div").show();
        var oForm = document.forms["reset_Req"];

        var signupRequest = {
            OldPin: oForm.elements["oldpin"].value,
            NewPin: oForm.elements["newpin"].value,
            ConfirmPin: oForm.elements["confirmpin"].value,
            Token: user_Token,
            UserKey: Usekey,
        };
        let encoded = window.btoa(JSON.stringify(signupRequest));
        $.ajax({
            type: "POST",
            url: "" + local + "/profile/resetpassword",
            data: {
                customerID: encoded
            },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function(data) {
                $(".button_loding_div").hide();

                try {
                    var obj = JSON.parse(data);
                    if (obj.Error == null) {
                        $("#user_oldpin").val("");
                        $("#user_newpin").val("");
                        $("#user_confirmpin").val("");
                        $("#MessageSuccess_settings").show();
                        setTimeout(function() {
                            $("#MessageSuccess_settings").css("display", "none");

                        }, 10000);

                    } else {
                        $("#user_oldpin").val("");
                        $("#user_newpin").val("");
                        $("#user_confirmpin").val("");
                        $("#Messageloginsup_settings").show();
                        var errormsg = "Invalid credentials provided.Please try again.";
                        try {
                            var checkmsg = obj.Error.ErrorDetail;
                            if (checkmsg.length > 0) {
                                $("#Messageloginsup_settings").html(checkmsg);
                            } else {
                                $("#Messageloginsup_settings").html(errormsg);
                            }
                        } catch (e) {
                            $("#Messageloginsup_settings").html(errormsg);
                        }
                        setTimeout(function() {
                            $("#Messageloginsup_settings").css("display", "none");
                        }, 10000);

                    }
                } catch (err) {
                    console.log("Something went wrong" + err.message);
                    sign_out_data();
                }

            },
            error: function(jqXHR, textStatus, errorThrown) {
                $("#user_oldpin").val("");
                $("#user_newpin").val("");
                $("#user_confirmpin").val("");
                $(".button_loding_div").hide();
                $("#Messageloginsup_settings").show();
                $("#Messageloginsup_settings").html("Invalid credentials provided.Please try again.");
                setTimeout(function() {
                    $("#Messageloginsup_settings").css("display", "none");
                }, 10000);

            },
        });
    }
}

function submitfeedback() {
    $("#Messageloginsup_writeus").hide();
    var form_data = $("#writeus_Reqform").serializeArray();
    var error_free = true;
    var element = $("#user_category");
    var valid = element.hasClass("valid");
    var error_element = $("div", element.parent());
    if (!valid || element.val().length == 0) {
        error_element.removeClass("error_text").addClass("error");
        error_free = false;
    } else {
        error_element.removeClass("error").addClass("error_text");
    }

    element = $("#user_feedback");
    valid = element.hasClass("valid");
    error_element = $("div", element.parent());
    if (!valid || element.val().length == 0) {
        error_element.removeClass("error_text").addClass("error");
        error_free = false;
    } else {
        error_element.removeClass("error").addClass("error_text");
    }

    if (!error_free) {
        event.preventDefault();
    } else {
        $(".button_loding_div").show();
        var rating = "";

        if ($("#user_category option:selected").val() == "Feedback") {
            rating = $("input[name='Experience']:checked").val();

        }
        var signupRequest = {
            FirstName: Fname,
            LastName: Lname,
            EmailAddress: user_Email,
            Categary: $("#user_category option:selected").val(),
            Message: $("#user_feedback").val(),
            Token: user_Token,
            Experience: rating,
            /*  UserKey: Usekey,*/
        };
        $.ajax({
            type: "POST",
            url: "" + local + "/profile/addfeedback",
            data: signupRequest,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function(data) {
                $("#Messageloginsup_writeus").hide();
                $("#Messageloginsup_writeus").html("");
                $(".button_loding_div").hide();
                $("#user_feedback").val("");

                try {
                    var obj = JSON.parse(data);
                    if (obj.Error == null) {
                        $("#MessageSuccess_writeus").show();
                        setTimeout(function() {
                            $("#MessageSuccess_writeus").css("display", "none");
                        }, 6000);
                    } else {

                        $("#Messageloginsup_writeus").show();
                        var errormsg = "Invalid credentials provided.Please try again.";
                        try {
                            var checkmsg = obj.Error.ErrorDetail;
                            if (checkmsg.length > 0) {
                                $("#Messageloginsup_writeus").html(checkmsg);
                            } else {
                                $("#Messageloginsup_writeus").html(errormsg);
                            }
                        } catch (e) {
                            $("#Messageloginsup_writeus").html(errormsg);
                        }
                        setTimeout(function() {
                            $("#Messageloginsup_writeus").css("display", "none");
                        }, 6000);


                    }
                } catch (err) {
                    console.log("Something went wrong" + err.message);
                    sign_out_data();

                }
            },
            error: function(jqXHR, textStatus, errorThrown) {

                $(".button_loding_div").hide();
                $("#Messageloginsup_writeus").show();
                $("#Messageloginsup_writeus").html("Invalid credentials provided.Please try again.");
                setTimeout(function() {
                    $("#Messageloginsup_writeus").css("display", "none");
                }, 6000);

            },
        });
    }
}

function touperfirstletter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function redirectURl(str) {
    checktime();
    let stateObj = {
        id: "100"
    };
    window.history.replaceState(stateObj,
        "profile", str);
    $('.rightCntr').hide();
    $('.removeAll').removeClass('active');
    if (str == "mytrip") {
        $(".ac").removeClass("active");
        $(".mytrip").addClass('active');
        $("#mybooking").html("");
        $(".ac1").addClass("active");
        bookinghistory(user_Email, 1, user_Token);
    } else if (str == "myinformation") {

        $(".myinformation").addClass('active');
        Getuserprofile(user_Token, Usekey);
        Getusercontact_details(user_Token, Usekey);
    } else if (str == "offers") {

        $(".offers").addClass('active');

    } else if (str == "settings") {
        $(".settings").addClass('active');

    } else if (str == "writeus") {
        $(".writeus").addClass('active');

    }
    $("#" + str).show();



}

function checktime() {
    var d = new Date();
    var totaltime = diff_minutes(sessiondate, d);
    if (totaltime > 1) {} else {

        sign_out_data();
    }
}

function showhide(vid) {


    //$(".showt" + vid).show();
    $(".bg_change").removeClass("active")

    if ($(".showt" + vid).css('display') == 'none') {
        $(".bg_chg" + vid).addClass("active")

        $(".addition_infoDetail").hide();
        $(".aclick").html("<i class='fa fa-plus-circle' aria-hidden='true'></i> Check Status");
        $(".showt" + vid).show();
        $(".addclick" + vid).html("<i class='fa fa-minus-circle' aria-hidden='true'></i> Check Status");

    } else {
        $(".addition_infoDetail").hide();
        $(".aclick").html("<i class='fa fa-plus-circle' aria-hidden='true'></i> Check Status");
        $(".showt" + vid).hide();
        $(".addclick" + vid).html("<i class='fa fa-plus-circle' aria-hidden='true'></i> Check Status");
    }






}

function addtransfer() {
    mixpanel.track('Profile_AllWebsites', {
        'Profile_Website': $('#websitename').val().toUpperCase(),
        'Profile_RefNo': "",
        'Profile_Menu': $('#pageurl').val(),
        'Profile_UserIp': ipuser,
        'Profile_EmailAddress': user_Email,
        'Profile_AddTransfer': true,
        'Profile_Device': devicename
    });

}

function addinsurance(RefNo) {

    mixpanel.track('Profile_AllWebsites', {
        'Profile_Website': $('#websitename').val().toUpperCase(),
        'Profile_RefNo': RefNo,
        'Profile_Menu': $('#pageurl').val(),
        'Profile_UserIp': ipuser,
        'Profile_EmailAddress': user_Email,
        'Profile_AddInsuranace': true,
        'Profile_Device': devicename
    });

}


function addbaggage(RefNo) {
    mixpanel.track('Profile_AllWebsites', {
        'Profile_Website': $('#websitename').val().toUpperCase(),
        'Profile_RefNo': RefNo,
        'Profile_Menu': $('#pageurl').val(),
        'Profile_UserIp': ipuser,
        'Profile_EmailAddress': user_Email,
        'Profile_AddBaggage': true,
        'Profile_Device': devicename
    });
}


function addtcp(RefNo) {
    mixpanel.track('Profile_AllWebsites', {
        'Profile_Website': $('#websitename').val().toUpperCase(),
        'Profile_RefNo': RefNo,
        'Profile_Menu': $('#pageurl').val(),
        'Profile_UserIp': ipuser,
        'Profile_EmailAddress': user_Email,
        'Profile_AddTCP': true,
        'Profile_Device': devicename
    });
}


function addwebcheckin(RefNo) {

    mixpanel.track('Profile_AllWebsites', {
        'Profile_Website': $('#websitename').val().toUpperCase(),
        'Profile_RefNo': RefNo,
        'Profile_Menu': $('#pageurl').val(),
        'Profile_UserIp': ipuser,
        'Profile_EmailAddress': user_Email,
        'Profile_AddWebCheckIn': true,
        'Profile_Device': devicename
    });
}


function insurance_hide() {

    $("#moreinfodiv").html("");
    $(".moreinfo_popup").hide();
}

function moreinfo_insurance(valtype) {

    $("#moreinfodiv").html("");

    try {

        $.ajax({
            type: "POST",
            url: "" + local + "/profile/moreinfo",
            data: {
                infotype: valtype
            },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            dataType: "html",
            success: function(data) {

                $('#moreinfodiv').html(data);
                $(".moreinfo_popup").show();
                if (valtype == "_InsuranceInfo" && SID == "160") {
                    $("#telsite").html("+1-248-274-7239")
                } else if (valtype == "_InsuranceInfo" && SID == "34") {
                    $("#telsite").html("+1-254-638-0057")
                } else if (valtype == "_InsuranceInfo" && SID == "6") {
                    $("#telsite").html("+1-216-302-2732")
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {},
        });
    } catch (ex) {

    }

}



function fmyFunction() {


    var btnText = $("#fBtn");
    if (btnText.html() == "<strong>See More</strong>") {
        document.getElementById("fBtn").innerHTML = "<strong>See Less</strong>";
        $(".fmores").show();
    } else {
        document.getElementById("fBtn").innerHTML = "<strong>See More</strong>";
        $(".fmores").hide();
    }

}


function datepickerFun() {
    $("#user_dobirth").datepicker({

        dateFormat: 'MM dd, yy',
        changeMonth: true,
        changeYear: true,
        yearRange: "-100:+0",
        maxDate: '-1D',
        onSelect: function(date) {
            if (date != "") {
                var enteredAge = getAge(date);
                var element = $("#user_dobirth");
                var valid = element.hasClass("valid");
                var error_element = $("div", element.parent());
                if (!valid || element.val().trim().length == 0) {
                    error_element.removeClass("error_text").addClass("error");
                    error_free = false;
                } else {
                    error_element.removeClass("error").addClass("error_text");
                }

                error_element.removeClass("error").addClass("error_text");

                if (enteredAge >= 12) {} else {
                    error_free = false;
                    error_element.removeClass("error_text").addClass("error").html("minimum age 12 year required for primary passenger.");
                }
            }
        }


    });

    $("#user_dobid").datepicker({

        dateFormat: 'MM dd, yy',
        changeMonth: true,
        changeYear: true,
        yearRange: "-100:+0",
        maxDate: '-1D',
        onSelect: function(date) {
            if (date != "") {

                var element = $("#user_dobid");
                var valid = element.hasClass("valid");
                var error_element = $("div", element.parent());
                if (!valid || element.val().trim().length == 0) {
                    error_element.removeClass("error_text").addClass("error");
                    error_free = false;
                } else {
                    error_element.removeClass("error").addClass("error_text");
                }
                error_element.removeClass("error").addClass("error_text");
            }
        }
    });

}

function GetuserIp() {

    try {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            if (/iPad/i.test(navigator.userAgent)) {
                devicename = "iPad";

            } else if (/iPod/i.test(navigator.userAgent)) {
                devicename = "iPod";

            } else {
                devicename = "M";
            }

        }

        $.getJSON('https://api.db-ip.com/v2/free/self', function(data_ip) {
            ipuser = JSON.parse(JSON.stringify(data_ip, null, 2)).ipAddress;

        });

    } catch (ex) {

    }
}

function autocompleteFun() {

    var isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    var autocompleteUrl = commonSetting.searchSuggest;
    $("#airport_name").autocomplete({
        source: function(request, response) {
            $.ajax({
                //url: '@Url.Action("searchopt")',
                url: autocompleteUrl,
                type: "POST",
                dataType: "json",
                data: {
                    term: request.term,
                    token: user_Token
                },
                success: function(res) {
                    if (res == '' || res == '[]') {
                        var result = [{
                            label: 'No location found',
                            value: 'No location found',
                            code: "No location found",
                            desc: "No location found",
                            key: "No location found",
                        }];
                        response(result);
                    } else {
                        var list = JSON.parse(res);
                        var autoRes = list;
                        if (autoRes.length == 0) {
                            response([{
                                label: 'No location found',
                                value: 'No location found',
                                code: "No location found",
                                desc: "No location found",
                                key: "No location found",
                            }]);
                        } else {
                            response($.map(autoRes, function(data, id) {
                                return {
                                    label: data.AirportCode + " - " + data.AirportName + ", " + data.CityName + ", " + data.Country,
                                    value: data.CityCode,
                                    code: data.AirportCode,
                                    desc: data.AirportCode,
                                    key: data.AirportCode,
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
        change: function(event, ui) {
            if (!ui.item) {
                $(this).val("");
            }
        },
        focus: function(event, ui) {
            event.preventDefault(); // or return false;
        },
        select: function(event, ui) {
            if (ui.item.label == 'No location found') {
                $(this).val('');
            } else {
                $(this).val(ui.item.label);

            }
            return false;
        },
        position: {
            my: isMobile ? "left top+5" : "left top+15",
            at: "left bottom",
            collision: "none"
        }
    }).autocomplete("instance")._renderItem = function(ul, item) {


        return displayAutoSuggest(item, ul, 'fa fa-A', '');

    };
}

function displayAutoSuggest(item, ul, cls, desc) {
    var regEx = new RegExp(item.key.toLowerCase(), "ig");
    var replaceMask = '';
    if (cls != '') {
        replaceMask = '<strong>' + item.key.toUpperCase() + '</strong>';
    } else {
        replaceMask = item.key;
    }
    var finalMask = item.label.replace(regEx, replaceMask)
    var listItem = $("<li><i class='" + cls + "'></i></li>")
        .data("item.autocomplete", item)
        .append(finalMask)
        .appendTo(ul);
    return listItem;
}