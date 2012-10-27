var map;
var userMarker;

function initialize() {
	//alert("FUUUU");
  var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(-23.6069944, -46.6967345),
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
	var ts = new Date().getTime();
	getPosSuccess(
	{
		"timestamp": ts,
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
	/* Other places: 
		here:	-23.6069944, -46.6967345
		south:	-23.6095929, -46.6976452
	*/
	
}

var newsMarkers = [];

function getNearbyNews() {
	var mpos = userMarker.getPosition();
	var np = getNews(mpos.lat(), mpos.lng());
	var i, p;
	newsMarkers = [];
	for (i in np) {
		p = np[i];
		alert(i + ": " + p.txt);
		newsMarkers.push(new google.maps.Marker({
			position: p.pos,
			map: map,
			title: p.txt
		  })
			
		);
	}
	
}

$(document).ready(function () {
	getPosition('', getPosSuccess, getPosFake);
});