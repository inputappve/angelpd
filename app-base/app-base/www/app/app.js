var app = angular.module('app', [
  'ngRoute',
  'pascalprecht.translate',
  'ngMaterial',
  'ngMap',
  'ngMdIcons',
  'firebase'
  // PER LE MAPPE 'ngMap'
]);

app
.filter('to_trusted', function($sce){
  return function(text){ return $sce.trustAsHtml(text); };
})
;
