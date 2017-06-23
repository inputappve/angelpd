/*var app = angular.module('app', [
  'pascalprecht.translate',
  'ngMaterial',
  'ngMdIcons'
  // PER LE MngappE 'ngMap'
]);

app
.filter('to_trusted', function($sce){
  return function(text){ return $sce.trustAsHtml(text); };
})
;*/
var app = angular.module("app", ['ngRoute','ngMap','pascalprecht.translate','ngCordova','ngMaterial','ngMdIcons']);

/*'ngRoute','ngMap','pascalprecht.translate','ngCordova'*/