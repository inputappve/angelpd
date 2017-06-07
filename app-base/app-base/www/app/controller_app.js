angular.module('app').controller('MainCtrl', function($scope, $routeParams, $translate, appSrv, $timeout) {
  console.log("QUI");
  var ctl = this;

  app.app_helper(ctl);

  ctl.appSrv = appSrv;

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
});
