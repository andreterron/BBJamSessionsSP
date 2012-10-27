$(document).ready(function () {
	getPosition('', function(pos) {
		var lat, lon, alt, acc, altAcc, head, speed, sb;
		
		lat = coordinates.latitude;
		lon = coordinates.longitude;
		alt = coordinates.altitude;
		acc = coordinates.accuracy;
		altAcc = coordinates.altitudeAccuracy;
		head = coordinates.heading;
		speed = coordinates.speed;
		alert('lat:' + lat + "\nlon:" + lon);
	});
});