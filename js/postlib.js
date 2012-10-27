var posts = [];
function readStoredPosts() {
	var np = $.jStorage.get('posts', []);
	var i, p;
	for (i in np) {
		p = JSON.parse(np[i]);
		posts.push(new Post(p.txt, p.timestamp, p.lat, p.lng));
	}
}
readStoredPosts();

function Post (txt, timestamp, lat, lng) {
	this.txt = txt;
	this.timestamp = timestamp;
	if (typeof lat === 'number') {
		this.lat = lat;
		this.lng = lng;
	} else if (typeof lat === 'object') {
		//this.pos = new google.maps.LatLng(lat, lng);
		this.lat = lat.lat();
		this.lng = lat.lng();
	} else {
		this.lat = 0;
		this.lng = 0;
	}
	this.toJSON = function () {
		return JSON.stringify({
			"txt": this.txt,
			"timestamp": this.timestamp,
			"lat": this.lat,
			"lng": this.lng
		});
	}
	this.getPos = function() {
		return new google.maps.LatLng(this.lat, this.lng);
	}
}


function postNews (str, lat, lng) {
	//var g = findGrid(lat, lng);
	var ts = new Date().getTime();
	posts.push(new Post(str, ts, lat, lng));
	$.jStorage.set('posts', posts);
}

function getDist (lat1, lng1, lat2, lng2) {
	return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lat1 - lat2, 2));
}

function getNews (lat, lng, limit) {
	if (typeof lat !== 'number' || typeof lng !== 'number') return [];
	var i, p, d, result = [];
	for (i in posts) {
		p = posts[i];
		d = getDist(lat, lng, p.lat, p.lng);
		if (d <= limit || limit === undefined) {
			result.push(p);
		}
	}
	return result;
}