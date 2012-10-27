var baloon = new google.maps.InfoWindow();

function initialize() {
	//alert("FUUUU");
	var el = document.getElementById('map_canvas');
	if (el) {
		var mapOptions = {
			zoom: 16,
			center: new google.maps.LatLng(-23.6069944, -46.6967345),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		map = new google.maps.Map(el,mapOptions);

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
}

google.maps.event.addDomListener(window, 'load', initialize);