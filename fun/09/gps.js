function gid(id) {
    return document.getElementById(id);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        gid('parameter-container').style.display = 'none';
        gid('cant').style.display = 'block';
    }
}

function showPosition(position) {
    gid('latitude').innerHTML = position.coords.latitude;
    gid('longitude').innerHTML = position.coords.longitude;
    gid('accuracy').innerHTML = position.coords.accuracy;
}