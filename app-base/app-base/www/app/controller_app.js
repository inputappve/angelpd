angular.module('app')
.controller('MainCtrl', function($scope, $routeParams, $translate,
  appSrv, $timeout,$mdSidenav,$mdDialog, NgMap, NavigatorGeolocation) {
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

  const auth = firebase.auth();
  const database = firebase.database();
  const usercurrent = firebase.auth().currentUser;
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
  ctl.appSrv = appSrv;

  app.app_helper(ctl);
  app.app_login(ctl,auth,usercurrent,passwordcurrent);
  app.app_map(ctl);

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
  $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Would you like to delete your debt?')
          .textContent('All of the banks have agreed to forgive you your debts.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Please do it!')
          .cancel('Sounds like a scam');

    $mdDialog.show(confirm).then(function() {
      $scope.status = 'You decided to get rid of your debt.';
    }, function() {
      $scope.status = 'You decided to keep your debt.';
    });
  };
  //

  function buildToggler(componentId) {
    return function() {
      $mdSidenav(componentId).toggle();
    };
  }



  //IINIZIO CREAZIONE DINAMICA MARKER
  ctl.my_map = NgMap.getMap();
  console.log(ctl.my_map);
  ctl.my_map.markers = [];
  var latlng;

  //fai la funzione che all'onclick metta in ctl.my_map.markers la posizione corrente 
  // forse alla fine di quella funzione dovrai chiamare $scope.apply();

  NavigatorGeolocation.getCurrentPosition()
   .then(function(position) {
     latlng = {lat: position.coords.latitude, lng: position.coords.longitude, inizio: 241132432, fine: 242332425};
   });

   ctl.my_map.markers.push(latlng);
 
  //ctl.my_map.markers.push(latlng);
  console.log("mappa: ", ctl.my_map);


});
