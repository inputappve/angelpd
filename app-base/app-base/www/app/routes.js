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
    when('/Terms.html', {
      templateUrl: "views/Terms.html"
    }).
    otherwise('welcome');
})
;
