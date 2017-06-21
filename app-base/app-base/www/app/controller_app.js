angular.module('app')
.controller('MainCtrl', function($scope, $routeParams, $translate,
  $timeout,$mdSidenav,$mdDialog, NgMap, NavigatorGeolocation) {
  console.log("QUI");
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

     (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s) [0];
        if (d.getElementById(id) ) {return;}
        js = d.createElement(s) ; js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs) ;
     }(document, 'script', 'facebook-jssdk') );

  var ctl = this;

  
  ctl.posVe =  {lat: 45.4217, lng: 12.3356};
  ctl.htmlpage = 'index.html#!';

  app.app_helper(ctl);
  app.app_login(ctl,passwordcurrent);
  app.mapSrv(ctl, NgMap,NavigatorGeolocation, Date.now(), new Date(Date.now+100000));

  ctl.showDialog = function(id){
      $(id).show();
    };

   ctl.hideDialog = $(function(id){
     $(id).hide();
   });

  ctl.elementLoad = function(){
    ctl.spinnerShow();
    console.log("Visualizzo singolo elemento", $routeParams);
    $timeout(function(){
      ctl.current_element_id = $routeParams.item_id;
      ctl.current_element = ctl.appSrv.list[ctl.current_element_id];
      ctl.spinnerHide();
    }, 1500);
  }
  ctl.spinnerHide();

  //funzioni
  $scope.toggleLeft = buildToggler('left');
  $scope.toggleRight = buildToggler('right');
  $scope.title1 = 'Home';
  $scope.title2 = 'Settings';
  $scope.title3 = 'About';
  ctl.msg=[];
  ctl.msg.push({
          titolo: "Pericolo generico",
          msg: "Vuoi segnalare un pericolo generico?"
           });
  ctl.msg.push({
          titolo: "Pericolo Incendio",
          msg: "Vuoi segnalare un pericolo di incendio?"
           });
  ctl.msg.push({
          titolo: "Presenza Spazzatura",
          msg: "Vuoi segnalare la presenza di spazzatura fuori dal cestino?"
           });
  ctl.msg.push({
          titolo: "Presenza Rapinatori",
          msg: "Vuoi segnalare la presenza di rapinatori nell'area?"
           });
  ctl.msg.push({
         titolo: "Presenza Spacciatori",
         msg: "Vuoi segnalare la presenza di spacciatori nell'area?"
          });
  ctl.msg.push({
          titolo: "Blackout",
          msg: "Vuoi segnalare la presenza di un blackout nell'area circostante?"
           });
  ctl.msg.push({
          titolo: "Vortice",
          msg: "Vuoi segnalare la presenza di trombe d'aria?"
           });
  ctl.msg.push({
          titolo: "Incidente",
          msg: "Vuoi segnalare la presenza di incidenti stradali?"
           });
  ctl.msg.push({
          titolo: "Allagamento",
          msg: "Vuoi segnalare la presenza di zone allagate?"
           });
  ctl.msg.push({
          titolo: "Folla",
          msg: "Vuoi segnalare un affollamento di persone?"
           });
  ctl.msg.push({
          titolo: "Rissa",
          msg: "Vuoi segnalare una rissa?"
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
  botte:"Signal/boxing.png"
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
          //.ariaLabel()
          .targetEvent(ev)
          .ok('OK')
          .cancel('Annulla');

    $mdDialog.show(confirm).then(function() {
    //  $scope.status="";
      ctl.mapSrv.addMarker(Date.now()+60000*30,tipo,app.ctl.icons);
    }, function() {
    //  $scope.status = "";
    });
  };
  //

  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
    };
  }
  
  //DA ELIMINARE ASSOLUTAMENTE QUANDO COMPILATE L'APK
  app.ctl = ctl;

});
