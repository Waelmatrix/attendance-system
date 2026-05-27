function sendLocation(){

let type =
document.getElementById("attendanceType").value;

document.getElementById("status").innerHTML =
"جارى تحديد الموقع...";

/* =========================
   إجازة / مأمورية / بدل راحة
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
   المواقع المسموح بها
========================= */

let locations = [

{
    name: "السنترال الرئيسي",
    lat: 25.447794,
    lng: 30.544412
},

{
    name: "سنترال باريس",
    lat: 24.674591,
    lng: 30.605435
},

{
    name: "سنترال المنيرة",
    lat: 25.617703,
    lng: 30.645818
},

{
    name: "موقع wael",
    lat: 25.457426,
    lng: 30.536133
}

];

/* =========================
   GPS
========================= */

navigator.geolocation.getCurrentPosition(

function(position){

let lat = position.coords.latitude;
let lng = position.coords.longitude;

let allowed = false;

/* =========================
   فحص المواقع (Stable Logic)
========================= */

for(let i = 0; i < locations.length; i++){

let distance = getDistanceFromLatLonInM(
lat,
lng,
locations[i].lat,
locations[i].lng
);

/* هامش أمان 300 متر بدل 200 */
if(distance <= 300){
    allowed = true;
    break;
}

}

/* =========================
   خارج النطاق
========================= */

if(!allowed){

document.getElementById("status").innerHTML =
"أنت خارج نطاق مواقع العمل";

return;

}

/* =========================
   نجاح
========================= */

document.getElementById("status").innerHTML =
"تم تسجيل الحضور بنجاح";

/* فتح الفورم */
let formURL =
"https://docs.google.com/forms/d/e/1FAIpQLSd5YCyFwOdjrJUIGWk7JsCTzV8lIhqvulKGR21ehL-p2IzQ6w/viewform";

setTimeout(()=>{
window.location.href = formURL;
}, 800);

},

function(error){

if(error.code === 1){
document.getElementById("status").innerHTML =
"يجب السماح بالموقع GPS";
}else{
document.getElementById("status").innerHTML =
"حدث خطأ فى تحديد الموقع";
}

}

);

}

/* =========================
   حساب المسافة
========================= */

function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2){

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

return R * c * 1000;

}

function deg2rad(deg){
return deg * (Math.PI/180);
}
