app.app_login = function(ctl,auth){
  ctl.facebookLogin = function(){
    const prov = new firebase.auth.FacebookAuthProvider();
      auth.signInWithPopup(prov).then(function(result) {
          console.log(result.user)
          window.location.href = 'http://localhost:8000/index_ng.html#!/page_list';
       }).catch(function(error) {
          console.log(error.code)
          console.log(error.message)
       });
     };

  ctl.googleLogin = function(){
    var providerG = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(providerG).then(function(result) {
        console.log(result.user)
        window.location.href = 'http://localhost:8000/index_ng.html#!/page_list';
     }).catch(function(error) {
        console.log(error.code)
        console.log(error.message)
     });
  };

  ctl.Login = function(){
    const txtEmail = document.getElementById('txtEmail').value;
    const txtPassword = document.getElementById('txtPassword').value;
    const promise = auth.signInWithEmailAndPassword(txtEmail,txtPassword);
    promise.then(function(){
      console.log(txtEmail,txtPassword);
      window.location.href = 'http://localhost:8000/index_ng.html#!/page_list';
    });
  };

  ctl.SingIn = function(){
    const txtEmail = document.getElementById('txtEmail').value;
    const txtPassword = document.getElementById('txtPassword').value;
    const promise = auth.createUserWithEmailAndPassword(txtEmail,txtPassword);
    promise.then(then(function() {e => console.log(e.message);
      console.log("Riscrivi mail e pass per entrare");
    })
  );
  };
};
