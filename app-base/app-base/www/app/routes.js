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
<<<<<<< HEAD
    when('/settings', {

    templateUrl: "views/settings.html"

    }).

    .otherwise('welcome');
=======
     when('/terms.html', {
      templateUrl: "views/terms.html"
    }).
    otherwise('welcome');
>>>>>>> a9b7d7f372b101a96c4f8d814f18ec037aa91c8c
})
;
