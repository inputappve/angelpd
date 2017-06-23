app.mapSrv = function(ctl,NgMap, NavigatorGeolocation, fine,tipo,$scope){
  
  ctl.mbu = function(userId,marker) {
    firebase.database().ref('Venezia/' + userId.uid).set({
          lat: marker.lat, 
          lng: marker.lng,
          position : [marker.lat,marker.lng],
          icona: marker.icona,
          inizio : marker.inizio,
          user: marker.user,
          id: _ctl.mapSrv.markers.length
       //dateFinish:marker.fine
    });
  }


  var _ctl = ctl;

  NgMap.getMap().then(function(map){

    _ctl.loadMap = function(){
      var markers = firebase.database().ref("Venezia/");
      markers.on("child_added", function(data, prevChildKey) {
        var Marker = data.val();
        console.log(Marker);
        _ctl.mapSrv.showMarker(Marker.dateStart,Marker.dateFinish,Marker.icon,Marker.lat,Marker.lng,firebase.auth().currentUser);
        console.log("Ho aggiunto marker "+Marker.icon);
        console.log(_ctl.mapSrv.markers[ctl.mapSrv.markers.length-1]);
        google.maps.event.trigger(map,'resize');
        
      });
    }


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
      $scope.$apply();
    };

    _ctl.mapSrv.addMarker = function(fine,tipo,iconsSet,user){
      console.log("Dentro Marker");
      var latlng = null;
      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      NavigatorGeolocation.getCurrentPosition().then(function(position) {
        latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
        var x = 
        {
          lat: latlng.lat, 
          lng: latlng.lng,
          position : [latlng.lat,latlng.lng],
          icona: iconsSet[tipo],
          inizio : Date.now(),
          user: user.email,
          id: _ctl.mapSrv.markers.length
        };
        _ctl.mapSrv.markers.push(x);
        _ctl.mbu(firebase.auth().currentUser,x);
        console.log("Ho aggiunto marker "+tipo);
        console.log(ctl.mapSrv.markers[ctl.mapSrv.markers.length-1])
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
      _ctl.selectedMarker = marker;
      _ctl.selectedMarker.messaggio = messaggio;

      _ctl.mapSrv.showInfoWindow('foo-iw', this);
    }

    _ctl.hideDetail = function() {
      _ctl.mapSrv.hideInfoWindow('foo-iw');
    }

    _ctl.loadMap();

  });
}


