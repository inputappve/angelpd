app.mapSrv = function(ctl,NgMap, NavigatorGeolocation, fine,tipo){

	ctl.mbu = function(userId,marker) {
    firebase.database().ref('Venezia/' + userId.uid).set({
       lat:marker.lat,
       lng:marker.lng,
       position : [marker.lat,marker.lng],
       icon: marker.icona,
       dateStart:marker.inizio,
       user:userId.email,
       id: marker.id
       //dateFinish:marker.fine
    });
  }
  
  var _ctl = ctl;

  NgMap.getMap().then(function(map){

    console.log("prima volta mappa",map);
    _ctl.mapSrv = map;

    console.log("ho recuperato la mappa -> ", _ctl.mapSrv==map);
    _ctl.mapSrv.markers = [];
    //MOSTRA I MARKER CREATI

    _ctl.mapSrv.showMarker = function(dateInizio,dataFine,icona,Lat,Lng,user){
    var x = 
      {
        lat: Lat, 
        lng: Lng,
        position : [Lat,Lng],
        icona: icona,
        inizio : dateInizio,
        user: user.email,
        id: ctl.mapSrv.markers.length
       // fine: dataFine
      };
      console.log("Marker");
      //dialogo
      _ctl.mapSrv.markers.push(x);
    };

    _ctl.mapSrv.addMarker = function(fine,tipo,iconsSet,user){
      var latlng = null;
      NavigatorGeolocation.getCurrentPosition().then(function(position) {
        latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
        var x = 
        {
          lat: latlng.lat, 
          lng: latlng.lng,
          position : [latlng.lat,latlng.lng+Math.random()],
          icona: iconsSet[tipo],
          inizio : Date.now(),
          user: user.email,
          id: _ctl.mapSrv.markers.length
        };
        _ctl.mapSrv.markers.push(x);
        _ctl.mbu(firebase.auth().currentUser,x);
        console.log("Ho aggiunto marker "+tipo);
        console.log(ctl.mapSrv.markers[ctl.mapSrv.markers.length-1]);
      });
    }


    _ctl.showDetail = function(event ,marker) {
      console.log("mi hanno dato questo evento",event);
      console.log("mi hanno dato questo marker",marker);
      console.log(marker.id);
      var messaggio;
      for(var i=0; i < ctl.msg.length; i++) {
        if(ctl.msg[i].icona== marker.icon){          
          messaggio=ctl.msg[i].msg;
          break;
        }
      }
      _ctl.mapSrv.showInfoWindow(event, 'foo-iw_'+marker.id,  "marker_"+marker.id);
    }

    _ctl.hideDetail = function() {
      _ctl.mapSrv.hideInfoWindow('foo-iw');
    }

  });
}

