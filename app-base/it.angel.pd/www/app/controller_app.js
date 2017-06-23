angular.module('app').controller("MainCtrl", function($scope,$timeout,$routeParams,
  NgMap,$translate,cordovaReady,$cordovaGeolocation,
  $mdDialog,$mdSidenav) {
  var ctl = this;
    var config = {
    apiKey: "AIzaSyDn-zApl0whHDB_kLTlh5_fvqWH5WVW3T8",
    authDomain: "angel-6902f.firebaseapp.com",
    databaseURL: "https://angel-6902f.firebaseio.com",
    projectId: "angel-6902f",
    storageBucket: "angel-6902f.appspot.com",
    messagingSenderId: "306707852817"
  };
  firebase.initializeApp(config);
  const passwordcurrent = ' ';
  window.fbAsyncInit = function() {
        FB.init({
           appId      : '427469474303607', 
           xfbml      : true,
           version    : 'v2.6'
        });
     };
  ctl.htmlpage = 'index.html#!';
  ctl.posVe =  {lat: 45.4217, lng: 12.3356};
  app.app_login(ctl,passwordcurrent);
  app.mapSrv(ctl, NgMap,$cordovaGeolocation, Date.now(), new Date(Date.now+100000),$scope);
  /*modifiche login via app*/
  navigator.__defineGetter__('userAgent', function () {
    return "Mozilla/5.0 (Windows NT 6.2; WOW64; rv:28.0) Gecko/20100101 Firefox/28.0)";
  });
  location.__defineGetter__("protocol",function(){return "https:";});
  document.__defineGetter__('domain', function () {
    return "angel-6902f.firebaseapp.com";
  });
 // alert(navigator.userAgent);

//funzioni per i sidenav
  $scope.toggleLeft = buildToggler('left');
  $scope.toggleRight = buildToggler('right');
  $scope.title1 = 'Home';
  $scope.title2 = 'Settings';
  $scope.title3 = 'About';
  ctl.showDialog = function(id){
      $(id).show();
    };

  ctl.hideDialog = function(id){
     $(id).hide();
   };

  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
    }
  };

  $scope.showConfirm = function(ev, titolo,tipo) {
    var messaggio=null;
    for(var i=0; i < ctl.msg.length; i++) {
      if(ctl.msg[i].titolo == titolo){          
        messaggio=ctl.msg[i].msg;
        break;
      }
    }
   
    //Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title(titolo)
          .textContent(messaggio)
          .ariaLabel("dialogo generico")
          .targetEvent(ev)
          .ok('OK')
          .cancel('Annulla');

    $mdDialog.show(confirm).then(function() {
    //  $scope.status="";
      ctl.mapSrv.addMarker(Date.now()+60000*30,tipo,app.ctl.icons,firebase.auth().currentUser);
      //$scope.toggleRight();
    }, function() {
    //  $scope.status = "";
    });
  };
  ctl.msg=[];
  ctl.msg.push({
          titolo: "Pericolo generico",
          msg: "Vuoi segnalare un pericolo generico?",
          icona: "Signal/garbage.png"
           });
  ctl.msg.push({
          titolo: "Pericolo Incendio",
          msg: "Vuoi segnalare un pericolo di incendio?",
          icona: "Signal/burn.png"
           });
  ctl.msg.push({
          titolo: "Presenza Spazzatura",
          msg: "Vuoi segnalare la presenza di spazzatura fuori dal cestino?",
          icona: "Signal/garbage.png"
           });
  ctl.msg.push({
          titolo: "Presenza Rapinatori",
          msg: "Vuoi segnalare la presenza di rapinatori nell'area?",
          icona: "Signal/garbage.png"
           });
  ctl.msg.push({
         titolo: "Presenza Spacciatori",
         msg: "Vuoi segnalare la presenza di spacciatori nell'area?",
         icona: "Signal/garbage.png"
          });
  ctl.msg.push({
          titolo: "Blackout",
          msg: "Vuoi segnalare la presenza di un blackout nell'area circostante?",
          icona: "Signal/garbage.png"
           });
  ctl.msg.push({
          titolo: "Vortice",
          msg: "Vuoi segnalare la presenza di trombe d'aria?",
          icona: "Signal/garbage.png"
           });
  ctl.msg.push({
          titolo: "Incidente",
          msg: "Vuoi segnalare la presenza di incidenti stradali?",
          icona: "Signal/garbage.png"
           });
  ctl.msg.push({
          titolo: "Allagamento",
          msg: "Vuoi segnalare la presenza di zone allagate?",
          icona: "Signal/garbage.png"
           });
  ctl.msg.push({
          titolo: "Folla",
          msg: "Vuoi segnalare un affollamento di persone?",
          icona: "Signal/garbage.png"
           });
  ctl.msg.push({
          titolo: "Rissa",
          msg: "Vuoi segnalare una rissa?",
          icona: "Signal/garbage.png"
           });
  ctl.msg.push({
          titolo: "Lavori in corso",
          msg: "Vuoi segnalare la presenza di lavori in corso?",
          icona: "Signal/garbage.png"
           });
  ctl.msg.push({
          titolo: "Esalazioni Tossiche",
          msg: "Vuoi segnalare la presenza di sostanze tossiche/nocive?",
          icona: "Signal/garbage.png"
           });
  ctl.msg.push({
          titolo: "Terremoto",
          msg: "Vuoi segnalare la presenza di un terremoto nell'area circostante?",
          icona: "Signal/garbage.png"
           });
 


ctl.icons = {
  garbage : "Signal/garbage.png",
  incendio : "Signal/burn.png",
  pericolo: "Signal/exclamation.png",
  rapina: "Signal/gun.png",
  droga:"Signal/droga.png",
  blackout: "Signal/bolt.png",
  tornado: "Signal/tornado.png",
  Incidente: "Signal/incidente.png",
  Acqua: "Signal/drop.png",
  gente: "Signal/team.png",
  botte:"Signal/boxing.png",
  lavori: "Signal/badile.png",
  tossico: "Signal/poison.png",
  terremoto:"Signal/earthquake.png"
}; 

ctl.type_from_icons = {
  "Signal/garbage.png"     : "Spazzatura", 
  "Signal/burn.png"        : "Incendio", 
  "Signal/exclamation.png" : "Pericolo Generico",
  "Signal/gun.png"         : "Rapina",
  "Signal/droga.png"       : "Spaccio di droga",
  "Signal/bolt.png"        : "Blackout",
  "Signal/tornado.png"     : "Tornado",
  "Signal/incidente.png"   : "Incidente",
  "Signal/drop.png"        : "Acqua",
  "Signal/team.png"        : "Affollamento",
  "Signal/boxing.png"      : "Rissa",
  "Signal/badile.png"      : "Lavori in corso",
  "Signal/poison.png"      : "Esalazioni tossiche",
  "Signal/earthquake.png"  : "Terremoto" 
};

ctl.messaggi_pericolo = {
  "Signal/garbage.png"     : "Presenza di spazzatura nella strada", 
  "Signal/burn.png"        : "Presenza di un incendio nelle vicinanze", 
  "Signal/exclamation.png" : "C'è la presenza di un pericolo generico, prestare attenzione",
  "Signal/gun.png"         : "é in corso una rapina!",
  "Signal/droga.png"       : "Degli spacciatori stanno spacciando droga",
  "Signal/bolt.png"        : "C'è un Blackout",
  "Signal/tornado.png"     : "C'è un tornado/tromba d'aria nelle vicinanze",
  "Signal/incidente.png"   : "C'è stato un icidente lungo la strada",
  "Signal/drop.png"        : "C'è stato un allagamento",
  "Signal/team.png"        : "In questo luogo c'è un affolamento di persone",
  "Signal/boxing.png"      : "é in corso una rissa",
  "Signal/badile.png"      : "Ci sono dei lavori in corso",
  "Signal/poison.png"      : "Esalazioni tossiche, restare distanti",
  "Signal/earthquake.png"  : "C'è stato un terremoto, prestare soccorso" 
};


    ctl.display_alert  = function(ev,notworking,ok,titolo) {
      console.log("questo parametro non va ",notworking);
      console.log("ok-> ",ok);
      console.log("obj-> ",ctl.type_from_icons[titolo]);
      console.log("obj-> ",ctl.messaggi_pericolo[titolo]);
      $mdDialog.show(
          $mdDialog.alert()
             .clickOutsideToClose(true)
             .title(ctl.type_from_icons[titolo])
             .ariaLabel("Info pericolo")
             .textContent(ctl.messaggi_pericolo[titolo])
             .ok(ok)
             .targetEvent(ev)
      );
    }; 


});



app.factory('cordovaReady', function() {
  return function (fn) {

    var queue = [];

    var impl = function () {
      queue.push(Array.prototype.slice.call(arguments));
    };

    document.addEventListener('deviceready', function () {
      queue.forEach(function (args) {
        fn.apply(this, args);
      });
      impl = fn;
    }, false);

    return function () {
      return impl.apply(this, arguments);
    };
  };
});
