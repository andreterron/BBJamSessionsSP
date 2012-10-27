var map = null;
var userMarker;
var userPos = {
	"lat": 0,
	"lng": 0
}

function setUserPos(lat, lng) {
	if (map) {
		var latlonpos = new google.maps.LatLng(lat, lng);
		userMarker.setPosition(latlonpos);
	}
	userPos.lat = lat;
	userPos.lng = lng;
}

function getUserPos() {
	return userPos;
	if (map) {
		return new google.maps.LatLng(userPos.lat, userPos.lng);
	} else {
		return userPos;
	}
}

function getPosSuccess (position) {
	var coordinates, gpsTime;
	// The Position object contains the following parameters:
	//	coords - geographic information such as GPS coordinates, accuracy, and optional attributes (altitude and speed).
	//  timestamp - 
	coordinates = position.coords;
	gpsTime = position.timestamp;
		
	var lat, lng, alt, acc, altAcc, head, speed, sb;
	
	lat = coordinates.latitude;
	lng = coordinates.longitude;
	alt = coordinates.altitude;
	acc = coordinates.accuracy;
	altAcc = coordinates.altitudeAccuracy;
	head = coordinates.heading;
	speed = coordinates.speed;
	//alert('lat:' + lat + "\nlon:" + lng);
	setUserPos(lat, lng);
	if (map) {
		map.setZoom(16);
		map.setCenter(new google.maps.LatLng(lat, lng));
		getNearbyNews();
	}
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
		north:	-23.6044218, -46.6945767
	*/
	
}

var newsMarkers = [];

function getNearbyNews() {
	//var mpos = userMarker.getPosition();
	var mpos = getUserPos();
	var np = getNews(mpos.lat, mpos.lng);
	var i, j, p, m;
	newsMarkers = [];
	for (i in np) {
		p = np[i];
		//alert(i + ": " + p.txt);
		m = new google.maps.Marker({
			position: p.getPos(),
			map: map,
			title: p.txt
		  });
		google.maps.event.addListener(m, 'click', function() {
			baloon.close();
			baloon.setContent(p.title);
			baloon.setAnchor(m);
			baloon.setMap(map);
			//baloon.open(m);
			map.setCenter(m.getPosition());
		  });
			
		
		newsMarkers.push(m);

	}
	if (typeof $.jStorage.get('selectedNews', null) === 'number') {
		j = $.jStorage.get('selectedNews', null);
		google.maps.event.trigger(newsMarkers[j], 'click');
		$.jStorage.set('selectedNews', null)
		//newsMarkers[i].click();
	}
	
}

function setPos(lat, lng) {
	//var latlonpos = new google.maps.LatLng(lat, lng);
	//userMarker.setPosition(latlonpos);
	setUserPos(lat, lon);
}

$(document).ready(function () {
	getPosition('', getPosSuccess, getPosFake);
	var i;
});