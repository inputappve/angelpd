app.factory('appSrv', function() {
  var appSrv = {};

  appSrv.list = [
    'UNO',
    'DUE',
    'TRE'
  ];
  appSrv.list_lat_lng = [
    {lat: 40.74, lng: -74.18},
    {lat: 40, lng: 15},
    {lat: 51, lng: 23}
  ];
  // appSrv.list = [];
  appSrv.selected = undefined;
  appSrv.selectedValue = function(){
    return appSrv.list[appSrv.selected];
  };

  return appSrv;
});
