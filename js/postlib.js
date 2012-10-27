var posts = [];
function readStoredPosts() {
	var np = $.jStorage.get('posts', []);
	var i, p;
	for (i in np) {
		p = JSON.parse(np[i]);
		posts.push(new Post(p.timestamp, p.txt, p.lat, p.lng));
	}
}
readStoredPosts();

function Post (txt, timestamp, pos, lng) {
	this.txt = txt;
	this.timestamp = timestamp;
	if (typeof pos === 'number') {
		this.pos = new google.maps.LatLng(pos, lng);
	} else if (typeof pos === 'object') {
		this.pos = pos;
	} else {
		this.pos = new google.maps.LatLng(0, 0);
	}
	this.lat = function() {return this.pos.lat();};
	this.lng = function() {return this.pos.lng();};
	this.toJSON = function () {
		return JSON.stringify({
			txt: this.txt,
			lat: this.lat(),
			lng: this.lng()
		});
	}
	this.getPos = function() {
		new google.maps.LatLng(lat, lng);
	}
}


function postNews (str, lat, lng) {
	//var g = findGrid(lat, lng);
	var ts = new Date().getTime();
	posts.push(new Post(ts, str, lat, lng));
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
		d = getDist(lat, lng, p.lat(), p.lng());
		if (d <= limit || limit === undefined) {
			result.push(p);
		}
	}
	return result;
}