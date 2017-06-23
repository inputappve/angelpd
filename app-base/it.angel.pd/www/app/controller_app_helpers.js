app.app_helper = function(ctl){
  ctl.spinnerShow = function(msg){
    $('#appSpinner').show();
  };
  ctl.spinnerHide = function(){
    $('#appSpinner').hide()
  };
};