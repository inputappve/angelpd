app.mapSrv = function(ctl,NgMap, NavigatorGeolocation, fine,tipo){
  ctl.mapSrv = {};
	ctl.mapSrv = NgMap.getMap();
  console.log("ho recuperato la mappa -> ", ctl.mapSrv);
  ctl.mapSrv.markers = [];

  ctl.mapSrv.addMarker = function(fine,tipo){
  	var latlng = null;
  	NavigatorGeolocation.getCurrentPosition().then(function(position) {
    	latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
 
  	var x = 
  	{lat: latlng.lat, 
  	 lng: latlng.lng,
  	 tipo: tipo,
  	 inizio : Date.now(),
  	 fine: new Date(fine)
  	}
  	ctl.mapSrv.markers.push(x);
  });
  }
}