function sendLocation(){

let type =
document.getElementById("attendanceType").value;

document.getElementById("status").innerHTML =
"جارى التنفيذ...";

/* =========================
   لو إجازة أو مأمورية
========================= */

if(
type === "leave" ||
type === "rest" ||
type === "mission"
){

let formURL =
"https://docs.google.com/forms/d/e/1FAIpQLSd5YCyFwOdjrJUIGWk7JsCTzV8lIhqvulKGR21ehL-p2IzQ6w/viewform";

window.location.href = formURL;

return;
}

/* =========================
   حضور = لازم GPS
========================= */

navigator.geolocation.getCurrentPosition(

function(position){

let lat = position.coords.latitude;
let lng = position.coords.longitude;

/* موقع الشركة */

let companyLat = 25.457426;
let companyLng = 30.536133;

/* حساب المسافة */

let distance = getDistanceFromLatLonInM(
lat,
lng,
companyLat,
companyLng
);

/* السماح داخل 200 متر */

if(distance > 200){

document.getElementById("status").innerHTML =
"أنت خارج نطاق الشركة";

return;

}

/* رابط الفورم */

let formURL =
"https://docs.google.com/forms/d/e/1FAIpQLSd5YCyFwOdjrJUIGWk7JsCTzV8lIhqvulKGR21ehL-p2IzQ6w/viewform";

window.location.href = formURL;

},

function(error){

if(error.code === 1){

document.getElementById("status").innerHTML =
"يجب السماح بالموقع GPS";

}
else{

document.getElementById("status").innerHTML =
"حدث خطأ فى تحديد الموقع";

}

}

);

}

/* =========================
   حساب المسافة
========================= */

function getDistanceFromLatLonInM(
lat1,
lon1,
lat2,
lon2
){

let R = 6371;

let dLat = deg2rad(lat2-lat1);

let dLon = deg2rad(lon2-lon1);

let a =
Math.sin(dLat/2) * Math.sin(dLat/2) +
Math.cos(deg2rad(lat1)) *
Math.cos(deg2rad(lat2)) *
Math.sin(dLon/2) *
Math.sin(dLon/2);

let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

let d = R * c;

return d * 1000;

}

function deg2rad(deg){

return deg * (Math.PI/180);

}
