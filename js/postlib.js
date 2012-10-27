var posts = [];
function readStoredPosts() {
	var np = $.jStorage.get('posts', []);
	var i, p, id;
	for (i in np) {
		p = JSON.parse(np[i]);
		id = p.id;
		posts[id] = new Post(p.id, p.title, p.txt, p.timestamp, p.lat, p.lng);
	}
}
readStoredPosts();

function Post (id, title, txt, timestamp, lat, lng) {
	this.id = id;
	this.title = title;
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
			"id": this.id,
			"title": this.title,
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


function postNews (t, str, lat, lng, ts) {
	//var g = findGrid(lat, lng);
	if (typeof ts !== 'number') ts = new Date().getTime();
	var i = posts.length;
	posts[i] = new Post(i, t, str, ts, lat, lng);
	$.jStorage.set('posts', posts);
	return i;
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