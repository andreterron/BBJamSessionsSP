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
			title: p.title
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

function getNewsMap(nid) {
	$.jStorage.set("selectedNews", nid);
	window.location.replace("map.html");
}

function setPos(lat, lng) {
	//var latlonpos = new google.maps.LatLng(lat, lng);
	//userMarker.setPosition(latlonpos);
	setUserPos(lat, lon);
}

function createData() {
	var defstr;
	defstr += "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in consequat massa. In sed enim sem. Mauris scelerisque euismod posuere. Phasellus non libero nec nisl pellentesque gravida eget non magna. Proin sed dui quis lacus aliquet laoreet. Maecenas nec elit mauris, ac dignissim felis. Proin mollis iaculis commodo. Praesent vestibulum lobortis massa at rhoncus. Vivamus feugiat enim eu felis faucibus ullamcorper. Etiam euismod pretium venenatis. Phasellus iaculis vestibulum nibh ac interdum. Praesent quis tellus ut sapien ornare congue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin justo iaculis sapien aliquam vulputate. Aenean diam nisi, cursus ac ullamcorper eget, pellentesque et ipsum.";
	defstr += "Sed non odio nibh, eget adipiscing dolor. Nunc venenatis felis vitae arcu imperdiet laoreet. Maecenas vulputate mauris sed velit vulputate sed molestie mauris malesuada. Curabitur eu neque id neque interdum molestie. Praesent porta justo ut quam consectetur ut tempor magna mattis. Donec eget lorem quis dui accumsan faucibus quis eu nibh. Mauris felis nunc, rhoncus sit amet eleifend consectetur, bibendum ac nunc. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque aliquet pretium nibh, nec congue lacus tincidunt a. Nullam eu orci id tellus consequat feugiat egestas pellentesque sem.";
	defstr += "Mauris tempus nulla sit amet sapien tristique consequat. Etiam tempor gravida arcu, sed eleifend mauris auctor vitae. Phasellus vel sapien quis lectus rhoncus tincidunt. Praesent et magna sit amet erat consequat porttitor. Aenean felis ante, egestas et porttitor vitae, vehicula semper tortor. Suspendisse molestie, nisi accumsan euismod tincidunt, dui leo ullamcorper magna, pellentesque sagittis nunc lorem ut turpis. Sed facilisis auctor placerat. Nulla tincidunt massa at orci vestibulum sagittis. Sed orci enim, lobortis eget sollicitudin blandit, auctor consectetur magna. Aenean interdum, orci eu auctor lobortis, lectus lacus adipiscing metus, tincidunt congue nibh neque vel magna. Fusce arcu ligula, fringilla varius euismod vel, ornare accumsan ipsum. Quisque lectus nunc, gravida sit amet tincidunt vel, tempus quis risus. Sed viverra cursus congue. Maecenas sit amet turpis et nibh auctor malesuada at eu nibh. Nam metus tellus, blandit id iaculis vel, interdum sed elit. Curabitur a nibh et sem aliquam imperdiet vitae facilisis elit.";
	var s;
	var fd = [
		{
			'title': 'BB Jam Sessions',
			'lat': -23.605876773233792,
			'lng': -46.69672250747681
		},
		{
			'title': 'Tomando um Red Bull',
			'lat': -23.6044217675578,
			'lng': -46.69457674026489
		},
		{
			'title': '3 pessoas sobrevivem acidentes',
			'lat': -23.608393501687186,
			'lng': -46.69989824295044
		},
		{
			'title': 'Promoção de Red Bull!',
			'lat': -23.6085901190629,
			'lng': -46.69221639633179
		},
		{
			'title': '50% de deconto na Pizza',
			'lat': -23.611008488662403,
			'lng': -46.69571399688721
		},
		{
			'title': 'Evento no parque ibirapuera',
			'lat': -23.595384640928152,
			'lng': -46.66571617126465
		},
		{
			'title': 'Restaurante de má qualidade',
			'lat': -23.589967834236496,
			'lng': -46.73601150512695
		}
	];
	var f;
	//ts = (new Date().getTime() - ld.length * 3600000);
	for (i in fd) {
		f = fd[i];
		s = (f.hasOwnProperty('str') ? f.str : defstr);
		postNews(f.title, s, f.lat, f.lng);
	}
}

$(document).ready(function () {
	getPosition('', getPosSuccess, getPosFake);
});