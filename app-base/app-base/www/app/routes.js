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
    when('/page_detail/:item_id', {
      templateUrl: "views/page_detail.html"
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

