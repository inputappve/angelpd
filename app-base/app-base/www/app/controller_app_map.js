app.mapSrv = function(ctl,NgMap, NavigatorGeolocation, fine,tipo){
	ctl.mbu = function(userId,marker) {
  firebase.database().ref('Venezia/' + userId).set({
     lat:marker.lat,
     lng:marker.lng,
     icon: marker.icona,
     dateStart:marker.inizio,
     dateFinish:marker.fine
  });
}
	ctl.loadMap = function(){
		return firebase.database().ref('/Venezia/').once('value').then(function(snapshot) {
  		var username = snapshot.val().username;
  		var lat = snapshot.val().lat,
    	var lng = snapshot.val().lng,
   		var icona  = snapshot.val().icon,
    	var inizio = snapshot.val().dateStart,
  		var fine =snapshot.val().dateFinish
		});
	}

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
  	ctl.mbu(firebase.auth().currentUser.uid,x);
    console.log("Ho aggiunto marker "+tipo);
    console.log(ctl.mapSrv.markers[ctl.mapSrv.markers.length-1]);
  });
  }
}