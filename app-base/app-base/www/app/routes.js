app
.config(function($locationProvider) {
  $locationProvider.hashPrefix('!');
})
.config(function($routeProvider) {
  console.log("QUI");
  $routeProvider.
    when('/welcome', {
      templateUrl: "views/welcome.html"
    }).
    when('/map', {
      templateUrl: "views/map.html"
    }).
    when('/controllo', {
      templateUrl: "views/controllo.html"
    }).

    when('/settings', {
      templateUrl: "views/settings.html"
    }).
    when('/about', {
      templateUrl: "views/about.html"
    }).
<<<<<<< HEAD
     when('/terms', {
=======

     when('/terms.html', {
>>>>>>> 40b11f3380febe5edc7d08e599295c57694b99c2
      templateUrl: "views/terms.html"

    }).
    when('/changepassword', {
      templateUrl: "views/changepassword.html"
    }).
    otherwise('welcome')});

