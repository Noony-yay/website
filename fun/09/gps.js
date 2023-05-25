var getToThisPoint = [[32.798370, 34.973407]];
var pointNum = 0;

function gid(id) {
    return document.getElementById(id);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, cantLoad);
    }
    else {
        cantLoad();
    }
}

function cantLoad() {
    gid('parameter-container').style.display = 'none';
    gid('cant').style.display = 'block';
}

function showPosition(position) {
    gid('latitude').innerHTML = position.coords.latitude;
    gid('longitude').innerHTML = position.coords.longitude;
    gid('accuracy').innerHTML = position.coords.accuracy;
    gid('distance').innerHTML = getDistance(position);
}

function getDistance(position) {
    var lat1 = position.coords.latitude;
    var lng1 = position.coords.longitude;
    var lat2 = getToThisPoint[pointNum][0];
    var lng2 = getToThisPoint[pointNum][1];
    var latDistance = lat1 - lat2;
    var lngDistance = lng1 - lng2;
    var distance = Math.sqrt(latDistance*latDistance + lngDistance*lngDistance)*100000;
    distance = Math.round(distance);
    return distance;
}