app
.config(function($locationProvider) {
  $locationProvider.hashPrefix('!');
})
.config(function($routeProvider) {
  console.log("routeProvider");
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
     when('/terms', {
      templateUrl: "views/terms.html"
    }).
    when('/changepassword', {
      templateUrl: "views/changepassword.html"
    }).
    otherwise('welcome')});

