var getToThisPoint = [[32.798370, 34.973407]];
var pointNum = 0;
var latDistance = 0;
var lngDistance = 0;

function gid(id) {
    return document.getElementById(id);
}

function onLoad() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, cantLoad);
        window.addEventListener('deviceorientation', handleOrientation, true);
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
    latDistance = lat1 - lat2;
    lngDistance = lng1 - lng2;
    var distance = Math.sqrt(latDistance*latDistance + lngDistance*lngDistance)*100000;
    distance = Math.round(distance);
    return distance;
}

function handleOrientation(event) {
  const alpha = event.alpha;
  gid('orientation').innerHTML = Math.round(alpha);
  var beta = Math.atan2(latDistance, lngDistance);
  var degBeta = beta*(180/Math.PI);
  gid('arrow').style.rotate = (alpha - (90 - degBeta) - 90) + 'deg';
}
