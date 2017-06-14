angular.module('app')
.controller('MainCtrl', function($scope, $routeParams, $translate,
  appSrv, $timeout,$mdSidenav,$mdDialog) {
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
  const auth = firebase.auth();
  ctl.htmlpage = 'index.html#!';
  app.app_helper(ctl);
  const usercurrent = firebase.auth().currentUser;
  const passwordcurrent = ' ';
  app.app_login(ctl,auth,usercurrent,passwordcurrent);
  ctl.appSrv = appSrv;

  ctl.showDialog = function(id){
      $(id).show();
    };

   ctl.hideDialog = $(function(id){
     $(id).hide();
   });
  ctl.welcomeLoad = function(){
    alert('OK');
  };

  ctl.elementLoad = function(){
    ctl.spinnerShow();
    console.log("Visualizzo singolo elemento", $routeParams);
    // ctl.current_element_id = $routeParams.item_id;
    // ctl.current_element = ctl.appSrv.list[ctl.current_element_id];
    $timeout(function(){
    // setTimeout(function(){
    //   // console.log("Visualizzo singolo elemento", $routeParams);
      ctl.current_element_id = $routeParams.item_id;
      ctl.current_element = ctl.appSrv.list[ctl.current_element_id];
      // $scope.$apply();
    //   // -> https://docs.angularjs.org/api/ng/service/$timeout
    //
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


  msg=[];
  msg.push({
          titolo: "Pericolo generico",
          msg: "Vuoi segnalare un pericolo generico?"
           });
   msg.push({
          titolo: "Pericolo Incendio",
          msg: "Vuoi segnalare un pericolo di incendio?"
           });
   msg.push({
          titolo: "Presenza Cinese",
          msg: "Vuoi segnalare una presenza cinese?"
           });
   msg.push({
          titolo: "Presenza Spazzatura",
          msg: "Vuoi segnalare la presenza di spazzatura fuori dal cestino?"
           });





  $scope.showConfirm = function(ev, titolo) {
    // Appending dialog to document.body to cover sidenav in docs app
    var messaggio = null;
    for(var i=0; i< msg.length; i++){
      if(msg[i].titolo==titolo){
        messaggio=msg[i].msg;
      }
    }
    var confirm = $mdDialog.confirm()
          .title(titolo)
          .textContent(messaggio)
          .targetEvent(ev)
          .cancel('chiudi')
          .ok('ok');
         

    $mdDialog.show(confirm).then(function() {
      $scope.status = 'Grazie mille della segnalazione';
    }, function() {
      $scope.status = 'Grazie mille della segnalazione';
    });
  }

  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
    };
  }


})
