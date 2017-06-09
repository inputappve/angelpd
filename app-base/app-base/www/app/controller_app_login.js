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

    promise.then(function(result){
          console.log(txtEmail,txtPassword)
          console.log("ci sei ma forse non sei autentificato");
          const user = firebase.auth().currentUser;
          if(user.emailVerified){
            console.log("entri pure");
          window.location.href = 'http://localhost:8000/index_ng.html#!/page_list';
        }else{
          window.location.href = "http://localhost:8000/index_ng.html#!/controllo.html?user=";
          user.sendEmailVerification().then(function(result){
                console.log("mail mandata");
                console.log(result)
             }).catch(function(error) {
                console.log(error.code)
                console.log(error.message)
             });
        }
       }).catch(function(error) {
          console.log(error.code)
          console.log(error.message)
       });
  };
  ctl.return = function(){
    console.log('verificato?');
    window.location.href = 'http://localhost:8000/index_ng.html#!/welcome';
  }
  ctl.SingIn = function(){
    const txtEmail = document.getElementById('txtEmail').value;
    const txtPassword = document.getElementById('txtPassword').value;
    const promise = auth.createUserWithEmailAndPassword(txtEmail,txtPassword);
    promise.then(function(result){
          console.log(result.user)
          console.log("riscrivi tutto e logga");
       }).catch(function(error) {
          console.log(error.code)
          console.log(error.message)
       });
  };

  ctl.passwordForgot = function(){
    var emailAddress = document.getElementById('txtEmail').value;
    auth.sendPasswordResetEmail(emailAddress).then(function() {
     console.log("Mail mandata a" , emailAddress);
    }, function(error) {
      console.log(error.code);
      console.log(error.message);
    });
    }
};
