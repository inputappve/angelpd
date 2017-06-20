app.mapSrv = function(ctl,NgMap, NavigatorGeolocation, fine,tipo){
  ctl.mapSrv = {};
	ctl.mapSrv = NgMap.getMap();
  console.log("ho recuperato la mappa -> ", ctl.mapSrv);
  ctl.mapSrv.markers = [];

  ctl.mapSrv.addMarker = function(fine,tipo,iconsSet){
  	var latlng = null;
  	NavigatorGeolocation.getCurrentPosition().then(function(position) {
    	latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
 
  	var x = 
  	{
      lat: latlng.lat, 
      lng: latlng.lng,
      icona: iconsSet[tipo],
      inizio : Date.now(),
      fine: new Date(fine)
  	};
  	ctl.mapSrv.markers.push(x);
    console.log("Ho aggiunto marker "+tipo);
    console.log(ctl.mapSrv.markers[ctl.mapSrv.markers.length-1]);
  });
  }
}