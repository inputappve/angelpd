app.mapSrv = function(ctl,NgMap, NavigatorGeolocation, fine,tipo){
	ctl.mbu = function(userId,marker) {
  firebase.database().ref('Venezia/' + userId).set({
     lat:marker.lat,
     lng:marker.lng,
     icon: marker.icona,
     dateStart:marker.inizio,
     //dateFinish:marker.fine
  });
}

  ctl.mapSrv = {};
  ctl.mapSrv = NgMap.getMap();
  console.log("ho recuperato la mappa -> ", ctl.mapSrv);
  ctl.mapSrv.markers = [];
  //MOSTRA I MARKER CREATI
  ctl.mapSrv.showMarker = function(dateInizio,dataFine,icona,Lat,Lng){
  var x = 
  	{
      lat: Lat, 
      lng: Lng,
      icona: icona,
      inizio : dateInizio,
     // fine: dataFine
  	};
  	console.log("Marker");
  	ctl.mapSrv.markers.push(x);
  }

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
  	ctl.mbu(firebase.auth().currentUser.uid,x);
    console.log("Ho aggiunto marker "+tipo);
    console.log(ctl.mapSrv.markers[ctl.mapSrv.markers.length-1]);
  });
  }
}