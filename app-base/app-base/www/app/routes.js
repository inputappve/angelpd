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
    when('/page_list', {
      templateUrl: "views/page_list.html"
    }).
    when('/page_detail/:item_id', {
      templateUrl: "views/page_detail.html"
    }).
    when('/controllo.html', {
      templateUrl: "views/controllo.html"
    }).
    when('/settings', {
      templateUrl: "views/settings.html"
    }).
    when('/about', {
      templateUrl: "views/about.html"
    }).
     when('/terms.html', {
      templateUrl: "views/terms.html"
    }).
    when('/changepassword.html', {
      templateUrl: "views/changepassword.html"
    }).
    otherwise('welcome')});

