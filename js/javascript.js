var map;
var userMarker;

function initialize() {
	//alert("FUUUU");
  var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(-46.6967345, -23.6069944),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map_canvas'),
      mapOptions);

  userMarker = new google.maps.Marker({
    position: map.getCenter(),
    map: map,
    title: 'Click to zoom'
  });

  google.maps.event.addListener(map, 'center_changed', function() {
    // 3 seconds after the center of the map has changed, pan back to the
    // userMarker.
    /*window.setTimeout(function() {
      map.panTo(userMarker.getPosition());
    }, 3000);*/
  });

  google.maps.event.addListener(userMarker, 'click', function() {
    map.setZoom(16);
    map.setCenter(userMarker.getPosition());
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

function getPosSuccess (position) {
	var coordinates, gpsTime;
	// The Position object contains the following parameters:
	//	coords - geographic information such as GPS coordinates, accuracy, and optional attributes (altitude and speed).
	//  timestamp - 
	coordinates = position.coords;
	gpsTime = position.timestamp;
		
	var lat, lon, alt, acc, altAcc, head, speed, sb;
	
	lat = coordinates.latitude;
	lon = coordinates.longitude;
	alt = coordinates.altitude;
	acc = coordinates.accuracy;
	altAcc = coordinates.altitudeAccuracy;
	head = coordinates.heading;
	speed = coordinates.speed;
	//alert('lat:' + lat + "\nlon:" + lon);
	
	var latlonpos = new google.maps.LatLng(lat, lon);
	userMarker.setPosition(latlonpos);
	map.setZoom(16);
    map.setCenter(latlonpos);
}

function getPosFake (posError) {
	getPosSuccess(
	{
		"timestamp":1351340814725,
		"coords":{
			"speed":null,
			"heading":null,
			"altitudeAccuracy":null,
			"accuracy":30,
			"altitude":null,
			"longitude":-46.6967345,
			"latitude":-23.6069944
		}
	});
}

$(document).ready(function () {
	//getPosition('', getPosSuccess, getPosFake);
});