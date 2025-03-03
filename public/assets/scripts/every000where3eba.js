var countryLists;function CountryListFunction(){$.ajax({type:"GET",traditional:true,async:false,cache:false,url:'/us/home/getcoutrylist',success:function(result){countryLists=result.CountryList;try{if(result.DefaultCountry!=""){setTimeout(function(){var textcount=$("#countryList>li>span."+result.DefaultCountry).get(0).nextSibling.textContent;$(".trip").html("<span class='flag "+result.DefaultCountry+"'></span>"+textcount);},1500);}}catch(ex){}},error:function(xhr){}});}
$(document).ready(function(){$(".subscribehomeBtn").click(function(e){$('html,body').animate({scrollTop:$("#NewsletterSubscribe").offset().top});});$(".subscribe-submit").bind("click",function(){ValidateEmail($('#subscriptionuser').val().trim());});$("#subscriptionuser").bind("focus",function(){$('#subscriptionuser').removeClass("error-input");$('#message').hide();$('#message').html("");});$('.validateinput').bind("cut copy paste",function(e){e.preventDefault();});$(document).click(function(){try{if($('#navbar').hasClass('in')){$('#navbar').removeClass('in')}}catch(e){}});try{if(document.referrer.ToLower().indexOf("social")>-1){sessionStorage.setItem('_smp',1);}
else if(document.referrer.ToLower().indexOf("pinterest")>-1){sessionStorage.setItem('_smp',1);}}catch(ex){}});function ValidateEmail(inputText){if($("#subscribename").val().trim()==""){$("#subscribename").addClass("error-input");$('#message').show();$('#message').html("Please enter name");$('#message').delay(3000).hide(0);return false;}
else if(inputText.trim()!=""){var expr=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;if(!expr.test(inputText)){$('#message').show();$('#message').html("Please enter valid email address");$('#message').delay(3000).hide(0);return false;}
else if($("#mobile-num").val().trim()==""){$('#message').show();$('#message').html("Please enter valid mobile number");$("#mobile-num").addClass("error-input");$('#message').delay(3000).hide(0);return false;}
else{$('#subscribeme').attr('disabled',true);$('#subscribeme').html('Please wait..');$('#message').hide();$('#subscriptionuser,#subscribename,#mobile-num').removeClass("error-input");$.ajax({type:"POST",dataType:'json',url:"/us/subscribemenew",data:{"emailId":inputText,"country":$(".country-list>.country.active").attr("data-country-code"),"phonecode":$("#mobile-number").val(),"FullName":$("#subscribename").val(),"phonenumber":$("#mobile-num").val()},success:function(response){if(response.IsScucess){$('.subscribe').css('display','none');$("#email2").text(inputText);$('.sucessfullMsg').css('display','block');setTimeout(function(){$('.subscribe').css('display','block');$('.sucessfullMsg').css('display','none');},5000);}else{$('#message').show();$('#message').html(response.Message);$('#message').delay(3000).hide(0);}
$('#subscriptionuser,#subscribename,#mobile-num').val("");},error:function(error){$('#message').show();$('#subscriptionuser,#subscribename,#mobile-num').val("");$('#message').delay(3000).hide(0);}});}}
else{$('#message').show();$('#message').html("Please enter valid email address");$('#message').delay(3000).hide(0);$('#subscribeme').attr('disabled',false);$('#subscribeme').html('Subscribe');return false;}}
function isdecimal(evt){var regex=/(?:\d*\.\d{1,2}|\d+)$/;if(!regex.test(event.key)){return false;}
else{return true;}}
$('.alphanumeric').on('input',function(event){this.value=this.value.replace(/[^a-zA-Z\s]+/g,'');});$('.numeric').on('input',function(event){this.value=this.value.replace(/[^0-9]/g,'');});$('.numericwithspace').on('input',function(event){this.value=this.value.replace(/[^0-9\s]+/g,'');});$('.alphanumericboth').on('input',function(event){this.value=this.value.replace(/[^0-9a-zA-Z\s]+/g,'');});$('.alphanumericbothwithoutspace').on('input',function(event){this.value=this.value.replace(/[^0-9a-zA-Z]+/g,'');});$('.pincodeval').on('input',function(event){if($('#flightBookingRequest_Payment_Country, #flightBookingRequest.Payment.Country').val()=='US'){this.value=this.value.replace(/[^0-9]/g,'')}
else{this.value=this.value.replace(/[^0-9a-zA-Z\s]+/g,'');}});function isCharOnly(n){var regex=/^[a-zA-Z\s]+$/;if(!regex.test(event.key)){return false;}
else{return true;}}
function isNumeric(evt){evt=(evt)?evt:window.event;var charCode=(evt.which)?evt.which:evt.keyCode;if(charCode>31&&(charCode<48||charCode>57)){return false;}
return true;}
function isNumber(id){var x=$(id).val();var isNum=/^\d+$/.test(x);if(!/^\d+$/.test(x)){$(id).addClass("error-input");return false;}
else{$(id).removeClass("error-input");}
return true;}
function readCookie(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0){console.log(c.substring(nameEQ.length,c.length));return c.substring(nameEQ.length,c.length)};}
return null;}
function getContactNumber(utmcookie,contactNoGoogle,contactNoBing,_contactNo){if(utmcookie!=null){if(utmcookie=='google'){_contactNo=contactNoGoogle;}
else if(utmcookie=='bing'){_contactNo=contactNoBing;}}
console.log(_contactNo);return _contactNo;}
function getContactNumber(contactNos,flowtype){if(contactNos!=null&&contactNos!=''&&contactNos.length>0){var cnNoarry=contactNos.split(',');if(flowtype=='ucb'&&cnNoarry.length>1){console.log(cnNoarry[1]);return cnNoarry[1];}
else{console.log(cnNoarry[0]);return cnNoarry[0];}}
else{console.log(contactNos);return contactNos;}}
function formatDate(dt){var formattedDate=new Date(dt);var month_names=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];var d=formattedDate.getDate();var m=formattedDate.getMonth();var y=formattedDate.getFullYear();var ddt=month_names[m]+" "+d+", "+y;return ddt;}
Date.prototype.toShortFormat=function(){let monthNames=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];let day=this.getDate();let monthIndex=this.getMonth();let monthName=monthNames[monthIndex];let year=this.getFullYear();return(monthName+' '+day+', '+year);}
function limit(element,max_chars){if(element.value.length>max_chars){element.value=element.value.substr(0,max_chars);}}
function ordinal_suffix_of(i){var j=i%10,k=i%100;if(j==1&&k!=11){return "st";}
if(j==2&&k!=12){return "nd";}
if(j==3&&k!=13){return "rd";}
return "th";}
function getUnique(array){var uniqueArray=[];if(array!=null&&array!=undefined&&array.length>0){for(var i=0;i<array.length;i++){if(uniqueArray.indexOf(array[i])==-1){uniqueArray.push(array[i]);}}}
return uniqueArray;}
function submitSearchFlight(from,to,depdate,retdate,journy,CabinType,airline,pageType,pageID){var request={CabinType:CabinType,origin:from,destination:to,fromDateDisplay:depdate,toDateDisplay:retdate,specificairlinecode:airline,isFromAirline:airline==""?false:true,SearchReturnFlight:journy.toLowerCase()=="oneway"?false:true,pageID:pageID,pageType:pageType};var deepurl="";try{if(pageID===undefined||pageID===null){pageID="home";}
if(pageType===undefined||pageType===null){pageType="home";}
var triptype=journy.toLowerCase()=="oneway"?1:2;var departdate=parsestringJsonDate(depdate);if(CabinType=="Premium"){CabinType="PremiumEconomy";}
deepurl="https://www.packedbag.com/compare/sites?origin="+from+"&destination="+to+"&triptype="+triptype+"&adults=1&children=0&infant=0&infantws=0&cabintype="+CabinType;deepurl=deepurl+"&departdate="+departdate;if(triptype=="2"){deepurl=deepurl+"&returndate="+parsestringJsonDate(retdate);}else{deepurl=deepurl+"&returndate="+departdate;}
deepurl=deepurl+"&site=160&utmsource=LBYF_"+(readCookie('utm_source')==null?'online':readCookie('utm_source'))+"_"+pageID+"_"+pageType;}catch(ex){}
var _smpfound='0';try{_smpfound=sessionStorage.getItem("_smp");}catch(e){}
try{var framefound=parent.window.iframe;}catch(e){deepurl="";}
$.ajax({url:commonSetting.dealsearch,data:JSON.stringify(request),type:'POST',contentType:"application/json; charset=utf-8",success:function(response){if(navigator.userAgent.includes('Firefox')){deepurl="";}
else if(navigator.userAgent.includes('CPU iPhone OS 17_')){deepurl="";}
else if(navigator.userAgent.includes('FxiOS')){deepurl="";}
else if(window.location.href.includes('social')){deepurl="";}
else if(_smpfound=='1'){deepurl="";}
if(deepurl==""){window.location=commonSetting.deallocation+"/"+response;}
else{$('#fltdetailspackdeal').attr('action',commonSetting.deallocation+"/"+response);$('#fltdetailspackdeal').submit();setTimeout(function(){window.location.href=deepurl.replaceAll('&amp;','&');},1000);}}});}
function activityTracker(TFNumber,sid,pg){var request={TFNumber:TFNumber+' '+pg,UserSession:sid};$.ajax({url:commonSetting.activityTracker,data:JSON.stringify(request),type:'POST',contentType:"application/json; charset=utf-8",success:function(response){}});}
function setsuperpropery(o_city,d_city,d_date,cabin,t_type,p_airline,direct_flight,user_ip,affiliate){mixpanel.register({"Origin City":o_city,"Destination City":d_city,"Departure Date":d_date,"Cabin":cabin,"Trip Type":t_type,"Preferred Airline":p_airline,"Direct Flight Only":direct_flight,"User IP":user_ip,"Affiliate":affiliate});}
$('#close_ucb,#reopen_ucb').click(function(){});$('#ucb_contactNo1').click(function(){});$('.affirm-block').click(function(){});function mix_search_click(){mixpanel.track("search_click");}
function mix_booknow_click(airline,f_family){if(f_family!=undefined&&f_family!=null&&f_family!=''){}
else if(airline!=undefined&&airline!=null&&airline!=''){}}
function mix_upgrade_notvisible(airline,f_family){}
$('.flight-upgraded').click(function(){});$('.noflight-upgraded').click(function(){});$('.flight-upgradeclose').click(function(){});$('.upgrade-flights-yes').click(function(){});function mix_booknow(airline,upgrade_option){if(airline!=undefined&&airline!=null&&airline.val()!=undefined&&airline.val()!=null&&airline.val()!=''&&upgrade_option!=undefined&&upgrade_option!=null&&upgrade_option.val()!=undefined&&upgrade_option.val()!=null&&upgrade_option.val()!=''&&upgrade_option.val()=='1'){}}
function mix_bookingdata(flt_city,flt_country,flt_email,flt_phone_number,flt_region,flt_zip,flt_age,flt_Airline,flt_BookingDate,flt_bookingid,flt_bookingstatus,flt_cabinclass,flt_CouponAmount,flt_CouponCode,flt_dateofbirth,flt_DepDate,flt_destination,flt_first_name,flt_gender,flt_GrossAmount,flt_isinsuranceapplied,flt_istcpapplied,flt_last_name,flt_NoOfPax,flt_origin,flt_pnr,flt_RetDate,flt_Site,flt_TripType){}
function mix_paymentpg(time_diff){}
$(document).on("click",".manymore",function(){var txt=$(this).text();if(txt=="And Many More..."){$(this).text("Hide");$('.moreList').show();}
else if(txt=="Hide"){$(this).text("And Many More...");$('.moreList').hide();}});try{if($("#origin").val()==""){if(aidata!=null&&aidata.length>0){var orgdefault="";var orc=true;$.each(aidata,function(key,value){if(orc==true){orgdefault=value.AirportCode+" - "+value.AirportName+","+value.CityName+","+(value.StateName==""?"":(value.StateName+","))+value.Country;orc=false;$("#clrOrigin").show();}});$("#origin").val(orgdefault);}}}catch(ex){}
function parsestringJsonDate(dt){date=new Date(dt)
return(date.getMonth()+1)+"-"+date.getDate()+"-"+date.getFullYear();}